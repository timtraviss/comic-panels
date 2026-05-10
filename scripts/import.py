#!/usr/bin/env python3
"""
Convert Comic Database.xlsx + Comics/ images → prisma/seed.ts
Run from panels/: python3 scripts/import.py
"""
import re, os, sys, shutil, json, uuid
from datetime import datetime
from pathlib import Path
from collections import defaultdict
import openpyxl

SCRIPT_DIR = Path(__file__).parent
ROOT = SCRIPT_DIR.parent
COMIC_DB_DIR = ROOT.parent

XLSX = COMIC_DB_DIR / "Comic Database.xlsx"
COMICS_DIR = COMIC_DB_DIR / "Comics"
PUBLIC_COVERS = ROOT / "public" / "covers"
SEED_OUT = ROOT / "prisma" / "seed.ts"

PUBLISHER_SLUG_MAP = {
    "Marvel": "marvel", "DC": "dc", "Image": "image", "IDW": "idw",
    "Vertigo": "vertigo", "Avatar": "avatar", "Gold Key": "gold-key",
    "Epic": "epic", "Fleetway Quality": "fleetway-quality",
    "Disney": "disney", "Star Comics": "star-comics",
}
PUBLISHER_COLORS = {
    "marvel": "#E8243C", "dc": "#4DA3FF", "image": "#22c55e", "idw": "#a78bfa",
    "vertigo": "#C084FC", "avatar": "#F87171", "gold-key": "#FCD34D",
    "epic": "#34D399", "fleetway-quality": "#FB923C", "disney": "#38BDF8",
    "star-comics": "#F472B6",
}

def normalise(s: str) -> str:
    return re.sub(r'[^a-z0-9]', '', str(s).lower())

def title_to_slug(title: str) -> str:
    s = str(title).lower()
    s = s.replace("’", "").replace("‘", "").replace("'", "")
    s = re.sub(r'(?<=[a-z])\.(?=[a-z](?:\.|(?![a-z])))', '', s)
    s = re.sub(r'[^a-z0-9\s-]', ' ', s)
    return re.sub(r'[\s-]+', '-', s.strip()).strip('-')

def make_series_id(pub_slug: str, series_name: str) -> str:
    return f"{pub_slug}-{title_to_slug(str(series_name))}"

def make_issue_id(series_id: str, number) -> str:
    if number is None:
        return f"{series_id}-unknown-{str(uuid.uuid4())[:8]}"
    return f"{series_id}-{int(number)}"

def parse_price(val) -> str:
    if not val:
        return "null"
    try:
        cleaned = re.sub(r'[^0-9.]', '', str(val))
        if not cleaned:
            return "null"
        return str(round(float(cleaned), 2))
    except Exception:
        return "null"

def extract_issue_number(filename: str):
    m = re.search(r'#\s*(\d+)', filename)
    return int(m.group(1)) if m else None

def match_cover(series_name: str, issue_num, cover_files: list) -> str | None:
    if issue_num is None:
        return None
    norm_series = normalise(series_name)
    for fname in cover_files:
        if extract_issue_number(fname) != int(issue_num):
            continue
        base = re.sub(r'#\s*\d+', '', os.path.splitext(fname)[0])
        base = re.sub(r'\[IMG_\d+\.jpeg\]', '', base)
        norm_fname = normalise(base)
        if norm_series in norm_fname:
            return fname
    return None

def ts_str(val) -> str:
    if val is None:
        return "null"
    if isinstance(val, datetime):
        return f'new Date("{val.strftime("%Y-%m-%d")}")'
    return "null"

def escape(s) -> str:
    if s is None:
        return "null"
    return json.dumps(str(s))

def darken_hex(hex_color: str) -> str:
    h = hex_color.lstrip('#')
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    r, g, b = int(r * 0.15), int(g * 0.15), int(b * 0.15)
    return f'#{r:02x}{g:02x}{b:02x}'

def fix_numeric_title(title, publisher: str) -> str:
    """
    The xlsx has 5 Avatar rows where the 'Title' cell contains bare integers
    (303, 304, 305, 306, 307) — these are all issues of the series '303'.
    The cover files are named '303 #N.jpeg', so we normalise all of them to '303'.
    More generally: if the title is a plain integer and there's a cover file
    whose base name matches that integer, collapse to the smallest integer seen
    in the group.  For safety we only collapse when publisher == 'Avatar'.
    """
    if isinstance(title, (int, float)) and publisher == 'Avatar':
        return '303'
    return str(title) if title is not None else 'Unknown'

def main():
    PUBLIC_COVERS.mkdir(parents=True, exist_ok=True)

    wb = openpyxl.load_workbook(XLSX)
    ws = wb['Comic Database']
    rows = list(ws.iter_rows(min_row=2, values_only=True))

    cover_files = [f for f in os.listdir(COMICS_DIR)
                   if f.lower().endswith(('.jpeg', '.jpg', '.webp'))
                   and not f.startswith('.')]

    # Group by (publisher, title) — normalise numeric Avatar titles
    series_map = defaultdict(list)
    for row in rows:
        _, title, publisher, issue_num, pub_date, writer, pencils, typ, fmt, price, _ = row
        if not publisher:
            continue
        fixed_title = fix_numeric_title(title, str(publisher))
        key = (str(publisher), fixed_title)
        series_map[key].append(row)

    publishers_seen = {}
    series_seen = {}
    creator_records = {}
    copied_covers = set()
    unmatched = []

    # Track issue IDs already written to handle duplicates (same seriesId+number)
    issues_written = set()  # set of issue_id strings

    pub_block = []
    ser_block = []
    iss_block = []
    cre_block = []
    cred_block = []

    for (pub_name, series_name), issue_rows in series_map.items():
        pub_slug = PUBLISHER_SLUG_MAP.get(pub_name, title_to_slug(pub_name))
        color = PUBLISHER_COLORS.get(pub_slug, '#888888')

        if pub_slug not in publishers_seen:
            publishers_seen[pub_slug] = True
            pub_block.append(f"""  await prisma.publisher.upsert({{
    where: {{ id: {escape(pub_slug)} }},
    update: {{}},
    create: {{
      id: {escape(pub_slug)},
      name: {escape(pub_name)},
      color: {escape(color)},
    }},
  }});""")

        series_id = make_series_id(pub_slug, series_name)
        palette_bg = darken_hex(color)

        first_type = issue_rows[0][7] if issue_rows else None
        if first_type and 'mini' in str(first_type).lower():
            status = 'COMPLETED'
        else:
            status = 'ONGOING'

        dates = [r[4] for r in issue_rows if r[4] and isinstance(r[4], datetime)]
        start_year = min(d.year for d in dates) if dates else None

        if series_id not in series_seen:
            series_seen[series_id] = True
            ser_block.append(f"""  await prisma.series.upsert({{
    where: {{ id: {escape(series_id)} }},
    update: {{}},
    create: {{
      id: {escape(series_id)},
      name: {escape(str(series_name))},
      publisherId: {escape(pub_slug)},
      startYear: {start_year if start_year else 'null'},
      status: '{status}',
      paletteBg: {escape(palette_bg)},
      paletteAccent: {escape(color)},
      paletteInk: '#F5E8D0',
    }},
  }});""")

        for row in issue_rows:
            _, title, publisher, issue_num, pub_date, writer, pencils, typ, fmt, price_str, _ = row
            issue_id = make_issue_id(series_id, issue_num)

            # Skip duplicates — same seriesId+number already written
            # (the @@unique([seriesId, number]) constraint would reject a second row)
            if issue_id in issues_written:
                continue
            issues_written.add(issue_id)

            matched_file = match_cover(str(series_name), issue_num, cover_files)
            if matched_file:
                dest_name = re.sub(r'[^a-z0-9.-]', '-', matched_file.lower()).strip('-')
                if matched_file not in copied_covers:
                    shutil.copy2(COMICS_DIR / matched_file, PUBLIC_COVERS / dest_name)
                    copied_covers.add(matched_file)
                cover_path = dest_name
            else:
                cover_path = None
                if issue_num:
                    unmatched.append(f"{series_name} #{issue_num}")

            iss_block.append(f"""  await prisma.issue.upsert({{
    where: {{ id: {escape(issue_id)} }},
    update: {{}},
    create: {{
      id: {escape(issue_id)},
      seriesId: {escape(series_id)},
      number: {int(issue_num) if issue_num else 'null'},
      coverDate: {ts_str(pub_date)},
      price: {parse_price(price_str)},
      coverImage: {escape(cover_path)},
    }},
  }});""")

            for person, role in [(writer, 'WRITER'), (pencils, 'ARTIST')]:
                if not person:
                    continue
                creator_slug = title_to_slug(str(person))
                if creator_slug not in creator_records:
                    creator_records[creator_slug] = person
                    cre_block.append(f"""  await prisma.creator.upsert({{
    where: {{ id: {escape(creator_slug)} }},
    update: {{}},
    create: {{ id: {escape(creator_slug)}, name: {escape(str(person))} }},
  }});""")
                credit_id = f"{issue_id}-{creator_slug}-{role.lower()}"
                cred_block.append(f"""  await prisma.issueCredit.upsert({{
    where: {{ id: {escape(credit_id)} }},
    update: {{}},
    create: {{
      id: {escape(credit_id)},
      issueId: {escape(issue_id)},
      creatorId: {escape(creator_slug)},
      role: '{role}',
    }},
  }});""")

    seed_ts = f"""import {{ PrismaClient }} from '@prisma/client'
import {{ Pool }} from 'pg'
import {{ PrismaPg }} from '@prisma/adapter-pg'
import * as path from 'path'
import * as fs from 'fs'

// Load .env.local manually for ts-node (Next.js loadEnvConfig isn't available here)
const envPath = path.resolve(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {{
  const raw = fs.readFileSync(envPath, 'utf-8')
  for (const line of raw.split('\\n')) {{
    const m = line.match(/^([^#=]+)=["']?(.+?)["']?$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }}
}}

const directUrl = (process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '')
  .replace(':6543/', ':5432/')
  .replace('?pgbouncer=true&', '?')
  .replace('&pgbouncer=true', '')
  .replace('?pgbouncer=true', '')

const pool = new Pool({{ connectionString: directUrl }})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({{ adapter }})

async function main() {{
  // Publishers
{chr(10).join(pub_block)}

  // Series
{chr(10).join(ser_block)}

  // Issues
{chr(10).join(iss_block)}

  // Creators
{chr(10).join(cre_block)}

  // Credits
{chr(10).join(cred_block)}
}}

main()
  .then(() => {{ console.log('Seed complete'); }})
  .catch((e) => {{ console.error(e); process.exit(1); }})
  .finally(async () => {{ await prisma.$disconnect(); await pool.end(); process.exit(0); }})
"""

    SEED_OUT.write_text(seed_ts)
    print(f"Wrote {SEED_OUT}")
    print(f"Publishers: {len(publishers_seen)}")
    print(f"Series: {len(series_seen)}")
    print(f"Issues: {len(issues_written)}")
    print(f"Creators: {len(creator_records)}")
    print(f"Copied {len(copied_covers)} cover images to public/covers/")
    if unmatched:
        print(f"Unmatched ({len(unmatched)}):")
        for u in unmatched[:20]:
            print(f"  {u}")
        if len(unmatched) > 20:
            print(f"  ... and {len(unmatched) - 20} more")

if __name__ == '__main__':
    main()
