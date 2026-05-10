import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as path from 'path'
import * as fs from 'fs'

// Load .env.local manually for ts-node (Next.js loadEnvConfig isn't available here)
const envPath = path.resolve(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf-8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^([^#=]+)=["']?(.+?)["']?$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }
}

const directUrl = (process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '')
  .replace(':6543/', ':5432/')
  .replace('?pgbouncer=true&', '?')
  .replace('&pgbouncer=true', '')
  .replace('?pgbouncer=true', '')

const pool = new Pool({ connectionString: directUrl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Publishers
  await prisma.publisher.upsert({
    where: { id: "avatar" },
    update: {},
    create: {
      id: "avatar",
      name: "Avatar",
      color: "#F87171",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "dc" },
    update: {},
    create: {
      id: "dc",
      name: "DC",
      color: "#4DA3FF",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "image" },
    update: {},
    create: {
      id: "image",
      name: "Image",
      color: "#22c55e",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "marvel" },
    update: {},
    create: {
      id: "marvel",
      name: "Marvel",
      color: "#E8243C",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "idw" },
    update: {},
    create: {
      id: "idw",
      name: "IDW",
      color: "#a78bfa",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "fleetway-quality" },
    update: {},
    create: {
      id: "fleetway-quality",
      name: "Fleetway Quality",
      color: "#FB923C",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "vertigo" },
    update: {},
    create: {
      id: "vertigo",
      name: "Vertigo",
      color: "#C084FC",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "disney" },
    update: {},
    create: {
      id: "disney",
      name: "Disney",
      color: "#38BDF8",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "epic" },
    update: {},
    create: {
      id: "epic",
      name: "Epic",
      color: "#34D399",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "gold-key" },
    update: {},
    create: {
      id: "gold-key",
      name: "Gold Key",
      color: "#FCD34D",
    },
  });
  await prisma.publisher.upsert({
    where: { id: "star-comics" },
    update: {},
    create: {
      id: "star-comics",
      name: "Star Comics",
      color: "#F472B6",
    },
  });

  // Series
  await prisma.series.upsert({
    where: { id: "avatar-303" },
    update: {},
    create: {
      id: "avatar-303",
      name: "303",
      publisherId: "avatar",
      startYear: 2004,
      status: 'COMPLETED',
      paletteBg: "#251010",
      paletteAccent: "#F87171",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-batman" },
    update: {},
    create: {
      id: "dc-batman",
      name: "Batman",
      publisherId: "dc",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-batman-a-death-in-the-family" },
    update: {},
    create: {
      id: "dc-batman-a-death-in-the-family",
      name: "Batman a Death in the Family",
      publisherId: "dc",
      startYear: 1989,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-batman-and-robin" },
    update: {},
    create: {
      id: "dc-batman-and-robin",
      name: "Batman and Robin",
      publisherId: "dc",
      startYear: 2009,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-batman-annual" },
    update: {},
    create: {
      id: "dc-batman-annual",
      name: "Batman Annual",
      publisherId: "dc",
      startYear: 1991,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "image-black-ops" },
    update: {},
    create: {
      id: "image-black-ops",
      name: "Black Ops",
      publisherId: "image",
      startYear: 1995,
      status: 'ONGOING',
      paletteBg: "#051d0e",
      paletteAccent: "#22c55e",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-blackhawk" },
    update: {},
    create: {
      id: "dc-blackhawk",
      name: "Blackhawk",
      publisherId: "dc",
      startYear: 1982,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-captain-america" },
    update: {},
    create: {
      id: "marvel-captain-america",
      name: "Captain America",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "image-danger-girl" },
    update: {},
    create: {
      id: "image-danger-girl",
      name: "Danger Girl",
      publisherId: "image",
      startYear: null,
      status: 'COMPLETED',
      paletteBg: "#051d0e",
      paletteAccent: "#22c55e",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-daredevil" },
    update: {},
    create: {
      id: "marvel-daredevil",
      name: "Daredevil",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-deathlok" },
    update: {},
    create: {
      id: "marvel-deathlok",
      name: "Deathlok",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-gi-joe" },
    update: {},
    create: {
      id: "marvel-gi-joe",
      name: "G.I.JOE",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "idw-gi-joe" },
    update: {},
    create: {
      id: "idw-gi-joe",
      name: "G.I.JOE",
      publisherId: "idw",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#191425",
      paletteAccent: "#a78bfa",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "idw-gi-joe-hearts-minds" },
    update: {},
    create: {
      id: "idw-gi-joe-hearts-minds",
      name: "G.I.JOE Hearts & Minds",
      publisherId: "idw",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#191425",
      paletteAccent: "#a78bfa",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "idw-gi-joe-origins" },
    update: {},
    create: {
      id: "idw-gi-joe-origins",
      name: "G.I.JOE Origins",
      publisherId: "idw",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#191425",
      paletteAccent: "#a78bfa",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-gi-joe-special-missions" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions",
      name: "G.I.JOE Special Missions",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-groo-the-wanderer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer",
      name: "Groo the Wanderer",
      publisherId: "marvel",
      startYear: 1986,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "fleetway-quality-judge-dredd" },
    update: {},
    create: {
      id: "fleetway-quality-judge-dredd",
      name: "Judge Dredd",
      publisherId: "fleetway-quality",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#251509",
      paletteAccent: "#FB923C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "vertigo-losers" },
    update: {},
    create: {
      id: "vertigo-losers",
      name: "Losers",
      publisherId: "vertigo",
      startYear: 2003,
      status: 'ONGOING',
      paletteBg: "#1c1325",
      paletteAccent: "#C084FC",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-marvel-comics-present-wolverine" },
    update: {},
    create: {
      id: "marvel-marvel-comics-present-wolverine",
      name: "Marvel Comics Present Wolverine",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-marvel-knights-spiderman-wolverine" },
    update: {},
    create: {
      id: "marvel-marvel-knights-spiderman-wolverine",
      name: "Marvel Knights Spiderman Wolverine",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-marvel-team-up" },
    update: {},
    create: {
      id: "marvel-marvel-team-up",
      name: "Marvel Team Up",
      publisherId: "marvel",
      startYear: 1980,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-merc" },
    update: {},
    create: {
      id: "marvel-merc",
      name: "Merc",
      publisherId: "marvel",
      startYear: 1986,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja",
      name: "Nth Man the Ultimate Ninja",
      publisherId: "marvel",
      startYear: 1989,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "image-powers" },
    update: {},
    create: {
      id: "image-powers",
      name: "Powers",
      publisherId: "image",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#051d0e",
      paletteAccent: "#22c55e",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-robocop" },
    update: {},
    create: {
      id: "marvel-robocop",
      name: "Robocop",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "disney-roger-rabbit" },
    update: {},
    create: {
      id: "disney-roger-rabbit",
      name: "Roger Rabbit",
      publisherId: "disney",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#081c25",
      paletteAccent: "#38BDF8",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-secrets-of-haunted-house" },
    update: {},
    create: {
      id: "dc-secrets-of-haunted-house",
      name: "Secrets of Haunted House",
      publisherId: "dc",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-silver-surfer" },
    update: {},
    create: {
      id: "marvel-silver-surfer",
      name: "Silver Surfer",
      publisherId: "marvel",
      startYear: 1988,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-sledge-hammer" },
    update: {},
    create: {
      id: "marvel-sledge-hammer",
      name: "Sledge Hammer",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-spiderman" },
    update: {},
    create: {
      id: "marvel-spiderman",
      name: "Spiderman",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-spidey-super-stories" },
    update: {},
    create: {
      id: "marvel-spidey-super-stories",
      name: "Spidey Super Stories",
      publisherId: "marvel",
      startYear: 1980,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-star-wars" },
    update: {},
    create: {
      id: "marvel-star-wars",
      name: "Star Wars",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-strange-tales" },
    update: {},
    create: {
      id: "marvel-strange-tales",
      name: "Strange Tales",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-superman-tarzan-sons-of-the-jungle" },
    update: {},
    create: {
      id: "dc-superman-tarzan-sons-of-the-jungle",
      name: "Superman Tarzan Sons of the Jungle",
      publisherId: "dc",
      startYear: null,
      status: 'COMPLETED',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "image-tenth" },
    update: {},
    create: {
      id: "image-tenth",
      name: "Tenth",
      publisherId: "image",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#051d0e",
      paletteAccent: "#22c55e",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "image-the-darkness" },
    update: {},
    create: {
      id: "image-the-darkness",
      name: "The Darkness",
      publisherId: "image",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#051d0e",
      paletteAccent: "#22c55e",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "epic-the-groo-chronicles" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles",
      name: "The Groo Chronicles",
      publisherId: "epic",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#071f16",
      paletteAccent: "#34D399",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-incredible-hulk" },
    update: {},
    create: {
      id: "marvel-the-incredible-hulk",
      name: "The Incredible Hulk",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-nam" },
    update: {},
    create: {
      id: "marvel-the-nam",
      name: "The Nam",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "gold-key-the-pink-panther" },
    update: {},
    create: {
      id: "gold-key-the-pink-panther",
      name: "The Pink Panther",
      publisherId: "gold-key",
      startYear: 1978,
      status: 'ONGOING',
      paletteBg: "#251f0b",
      paletteAccent: "#FCD34D",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-punisher" },
    update: {},
    create: {
      id: "marvel-the-punisher",
      name: "The Punisher",
      publisherId: "marvel",
      startYear: 1990,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-punisher-war-journal" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal",
      name: "The Punisher War Journal",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-spider-woman" },
    update: {},
    create: {
      id: "marvel-the-spider-woman",
      name: "The Spider Woman",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-transformers" },
    update: {},
    create: {
      id: "marvel-the-transformers",
      name: "The Transformers",
      publisherId: "marvel",
      startYear: 1985,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-transformers-head-masters" },
    update: {},
    create: {
      id: "marvel-the-transformers-head-masters",
      name: "The Transformers Head Masters",
      publisherId: "marvel",
      startYear: 1987,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "star-comics-thundercats" },
    update: {},
    create: {
      id: "star-comics-thundercats",
      name: "Thundercats",
      publisherId: "star-comics",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#24111b",
      paletteAccent: "#F472B6",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-transformers-universe" },
    update: {},
    create: {
      id: "marvel-transformers-universe",
      name: "Transformers Universe",
      publisherId: "marvel",
      startYear: 1987,
      status: 'COMPLETED',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "image-wanted" },
    update: {},
    create: {
      id: "image-wanted",
      name: "Wanted",
      publisherId: "image",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#051d0e",
      paletteAccent: "#22c55e",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-wolverine" },
    update: {},
    create: {
      id: "marvel-wolverine",
      name: "Wolverine",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "dc-worlds-finest-comics" },
    update: {},
    create: {
      id: "dc-worlds-finest-comics",
      name: "World\u2019s Finest Comics",
      publisherId: "dc",
      startYear: 1984,
      status: 'ONGOING',
      paletteBg: "#0b1826",
      paletteAccent: "#4DA3FF",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-x-factor" },
    update: {},
    create: {
      id: "marvel-x-factor",
      name: "X Factor",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-x-men" },
    update: {},
    create: {
      id: "marvel-x-men",
      name: "X-Men",
      publisherId: "marvel",
      startYear: null,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-gi-joe-comics-magazine" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine",
      name: "G.I.JOE Comics Magazine",
      publisherId: "marvel",
      startYear: 1986,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });
  await prisma.series.upsert({
    where: { id: "marvel-the-transformers-comics-magazine" },
    update: {},
    create: {
      id: "marvel-the-transformers-comics-magazine",
      name: "The Transformers Comics Magazine",
      publisherId: "marvel",
      startYear: 1987,
      status: 'ONGOING',
      paletteBg: "#220509",
      paletteAccent: "#E8243C",
      paletteInk: '#F5E8D0',
    },
  });

  // Issues
  await prisma.issue.upsert({
    where: { id: "avatar-303-1" },
    update: {},
    create: {
      id: "avatar-303-1",
      seriesId: "avatar-303",
      number: 1,
      coverDate: new Date("2004-11-01"),
      price: 3.99,
      coverImage: "303--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "avatar-303-2" },
    update: {},
    create: {
      id: "avatar-303-2",
      seriesId: "avatar-303",
      number: 2,
      coverDate: new Date("2004-12-01"),
      price: 3.99,
      coverImage: "303--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "avatar-303-3" },
    update: {},
    create: {
      id: "avatar-303-3",
      seriesId: "avatar-303",
      number: 3,
      coverDate: new Date("2005-01-01"),
      price: 3.99,
      coverImage: "303--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "avatar-303-4" },
    update: {},
    create: {
      id: "avatar-303-4",
      seriesId: "avatar-303",
      number: 4,
      coverDate: new Date("2005-02-01"),
      price: 3.99,
      coverImage: "303--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "avatar-303-5" },
    update: {},
    create: {
      id: "avatar-303-5",
      seriesId: "avatar-303",
      number: 5,
      coverDate: new Date("2005-03-01"),
      price: 3.99,
      coverImage: "303--5.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-batman-358" },
    update: {},
    create: {
      id: "dc-batman-358",
      seriesId: "dc-batman",
      number: 358,
      coverDate: null,
      price: 0.6,
      coverImage: "batman--358.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-batman-427" },
    update: {},
    create: {
      id: "dc-batman-427",
      seriesId: "dc-batman",
      number: 427,
      coverDate: null,
      price: null,
      coverImage: "batman--427.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-batman-a-death-in-the-family-unknown-322c614f" },
    update: {},
    create: {
      id: "dc-batman-a-death-in-the-family-unknown-322c614f",
      seriesId: "dc-batman-a-death-in-the-family",
      number: null,
      coverDate: new Date("1989-01-01"),
      price: 3.95,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-batman-and-robin-1" },
    update: {},
    create: {
      id: "dc-batman-and-robin-1",
      seriesId: "dc-batman-and-robin",
      number: 1,
      coverDate: new Date("2009-08-01"),
      price: 2.99,
      coverImage: "batman-and-robin--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-batman-and-robin-2" },
    update: {},
    create: {
      id: "dc-batman-and-robin-2",
      seriesId: "dc-batman-and-robin",
      number: 2,
      coverDate: new Date("2009-09-01"),
      price: 2.99,
      coverImage: "batman-and-robin--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-batman-annual-15" },
    update: {},
    create: {
      id: "dc-batman-annual-15",
      seriesId: "dc-batman-annual",
      number: 15,
      coverDate: new Date("1991-01-01"),
      price: 2.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-black-ops-3" },
    update: {},
    create: {
      id: "image-black-ops-3",
      seriesId: "image-black-ops",
      number: 3,
      coverDate: new Date("1995-03-01"),
      price: 2.5,
      coverImage: "black-ops--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-253" },
    update: {},
    create: {
      id: "dc-blackhawk-253",
      seriesId: "dc-blackhawk",
      number: 253,
      coverDate: new Date("1982-12-01"),
      price: 0.6,
      coverImage: "blackhawk--253.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-255" },
    update: {},
    create: {
      id: "dc-blackhawk-255",
      seriesId: "dc-blackhawk",
      number: 255,
      coverDate: new Date("1983-02-01"),
      price: 0.6,
      coverImage: "blackhawk--255--img-5628.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-259" },
    update: {},
    create: {
      id: "dc-blackhawk-259",
      seriesId: "dc-blackhawk",
      number: 259,
      coverDate: new Date("1983-06-01"),
      price: 0.6,
      coverImage: "blackhawk--259.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-262" },
    update: {},
    create: {
      id: "dc-blackhawk-262",
      seriesId: "dc-blackhawk",
      number: 262,
      coverDate: new Date("1983-09-01"),
      price: 0.6,
      coverImage: "blackhawk--262.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-263" },
    update: {},
    create: {
      id: "dc-blackhawk-263",
      seriesId: "dc-blackhawk",
      number: 263,
      coverDate: new Date("1983-10-01"),
      price: 0.6,
      coverImage: "blackhawk--263.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-265" },
    update: {},
    create: {
      id: "dc-blackhawk-265",
      seriesId: "dc-blackhawk",
      number: 265,
      coverDate: new Date("1983-12-01"),
      price: 0.75,
      coverImage: "blackhawk--265.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-266" },
    update: {},
    create: {
      id: "dc-blackhawk-266",
      seriesId: "dc-blackhawk",
      number: 266,
      coverDate: new Date("1984-01-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-267" },
    update: {},
    create: {
      id: "dc-blackhawk-267",
      seriesId: "dc-blackhawk",
      number: 267,
      coverDate: new Date("1984-02-01"),
      price: 0.75,
      coverImage: "blackhawk--267.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-268" },
    update: {},
    create: {
      id: "dc-blackhawk-268",
      seriesId: "dc-blackhawk",
      number: 268,
      coverDate: new Date("1984-03-01"),
      price: 0.75,
      coverImage: "blackhawk--268.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-269" },
    update: {},
    create: {
      id: "dc-blackhawk-269",
      seriesId: "dc-blackhawk",
      number: 269,
      coverDate: new Date("1984-04-01"),
      price: 0.75,
      coverImage: "blackhawk--269.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-270" },
    update: {},
    create: {
      id: "dc-blackhawk-270",
      seriesId: "dc-blackhawk",
      number: 270,
      coverDate: new Date("1984-05-01"),
      price: 0.75,
      coverImage: "blackhawk--270.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-271" },
    update: {},
    create: {
      id: "dc-blackhawk-271",
      seriesId: "dc-blackhawk",
      number: 271,
      coverDate: new Date("1984-07-01"),
      price: 0.75,
      coverImage: "blackhawk--271.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-blackhawk-272" },
    update: {},
    create: {
      id: "dc-blackhawk-272",
      seriesId: "dc-blackhawk",
      number: 272,
      coverDate: new Date("1984-09-01"),
      price: 0.75,
      coverImage: "blackhawk--272.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-captain-america-325" },
    update: {},
    create: {
      id: "marvel-captain-america-325",
      seriesId: "marvel-captain-america",
      number: 325,
      coverDate: null,
      price: 0.75,
      coverImage: "captain-america--325.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-0" },
    update: {},
    create: {
      id: "image-danger-girl-0",
      seriesId: "image-danger-girl",
      number: null,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-1" },
    update: {},
    create: {
      id: "image-danger-girl-1",
      seriesId: "image-danger-girl",
      number: 1,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-2" },
    update: {},
    create: {
      id: "image-danger-girl-2",
      seriesId: "image-danger-girl",
      number: 2,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-3" },
    update: {},
    create: {
      id: "image-danger-girl-3",
      seriesId: "image-danger-girl",
      number: 3,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-4" },
    update: {},
    create: {
      id: "image-danger-girl-4",
      seriesId: "image-danger-girl",
      number: 4,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-5" },
    update: {},
    create: {
      id: "image-danger-girl-5",
      seriesId: "image-danger-girl",
      number: 5,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-6" },
    update: {},
    create: {
      id: "image-danger-girl-6",
      seriesId: "image-danger-girl",
      number: 6,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-danger-girl-7" },
    update: {},
    create: {
      id: "image-danger-girl-7",
      seriesId: "image-danger-girl",
      number: 7,
      coverDate: null,
      price: 2.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-daredevil-234" },
    update: {},
    create: {
      id: "marvel-daredevil-234",
      seriesId: "marvel-daredevil",
      number: 234,
      coverDate: null,
      price: 0.75,
      coverImage: "daredevil--234.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-daredevil-235" },
    update: {},
    create: {
      id: "marvel-daredevil-235",
      seriesId: "marvel-daredevil",
      number: 235,
      coverDate: null,
      price: 0.75,
      coverImage: "daredevil--235.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-deathlok-1" },
    update: {},
    create: {
      id: "marvel-deathlok-1",
      seriesId: "marvel-deathlok",
      number: 1,
      coverDate: null,
      price: 2.0,
      coverImage: "deathlok-special--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-deathlok-2" },
    update: {},
    create: {
      id: "marvel-deathlok-2",
      seriesId: "marvel-deathlok",
      number: 2,
      coverDate: null,
      price: 2.0,
      coverImage: "deathlok-special--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-deathlok-3" },
    update: {},
    create: {
      id: "marvel-deathlok-3",
      seriesId: "marvel-deathlok",
      number: 3,
      coverDate: null,
      price: 2.0,
      coverImage: "deathlok-special--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-137" },
    update: {},
    create: {
      id: "marvel-gi-joe-137",
      seriesId: "marvel-gi-joe",
      number: 137,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-starring-snake-eyes-and-ninja-force--137.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-100" },
    update: {},
    create: {
      id: "marvel-gi-joe-100",
      seriesId: "marvel-gi-joe",
      number: 100,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--100.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-101" },
    update: {},
    create: {
      id: "marvel-gi-joe-101",
      seriesId: "marvel-gi-joe",
      number: 101,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--101.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-102" },
    update: {},
    create: {
      id: "marvel-gi-joe-102",
      seriesId: "marvel-gi-joe",
      number: 102,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-103" },
    update: {},
    create: {
      id: "marvel-gi-joe-103",
      seriesId: "marvel-gi-joe",
      number: 103,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--103.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-104" },
    update: {},
    create: {
      id: "marvel-gi-joe-104",
      seriesId: "marvel-gi-joe",
      number: 104,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--104.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-105" },
    update: {},
    create: {
      id: "marvel-gi-joe-105",
      seriesId: "marvel-gi-joe",
      number: 105,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--105.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-106" },
    update: {},
    create: {
      id: "marvel-gi-joe-106",
      seriesId: "marvel-gi-joe",
      number: 106,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-107" },
    update: {},
    create: {
      id: "marvel-gi-joe-107",
      seriesId: "marvel-gi-joe",
      number: 107,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-108" },
    update: {},
    create: {
      id: "marvel-gi-joe-108",
      seriesId: "marvel-gi-joe",
      number: 108,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--108.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-109" },
    update: {},
    create: {
      id: "marvel-gi-joe-109",
      seriesId: "marvel-gi-joe",
      number: 109,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-110" },
    update: {},
    create: {
      id: "marvel-gi-joe-110",
      seriesId: "marvel-gi-joe",
      number: 110,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--110.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-112" },
    update: {},
    create: {
      id: "marvel-gi-joe-112",
      seriesId: "marvel-gi-joe",
      number: 112,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-114" },
    update: {},
    create: {
      id: "marvel-gi-joe-114",
      seriesId: "marvel-gi-joe",
      number: 114,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--114.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-115" },
    update: {},
    create: {
      id: "marvel-gi-joe-115",
      seriesId: "marvel-gi-joe",
      number: 115,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--115.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-116" },
    update: {},
    create: {
      id: "marvel-gi-joe-116",
      seriesId: "marvel-gi-joe",
      number: 116,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-117" },
    update: {},
    create: {
      id: "marvel-gi-joe-117",
      seriesId: "marvel-gi-joe",
      number: 117,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-118" },
    update: {},
    create: {
      id: "marvel-gi-joe-118",
      seriesId: "marvel-gi-joe",
      number: 118,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-119" },
    update: {},
    create: {
      id: "marvel-gi-joe-119",
      seriesId: "marvel-gi-joe",
      number: 119,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-120" },
    update: {},
    create: {
      id: "marvel-gi-joe-120",
      seriesId: "marvel-gi-joe",
      number: 120,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--120.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-121" },
    update: {},
    create: {
      id: "marvel-gi-joe-121",
      seriesId: "marvel-gi-joe",
      number: 121,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-122" },
    update: {},
    create: {
      id: "marvel-gi-joe-122",
      seriesId: "marvel-gi-joe",
      number: 122,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-123" },
    update: {},
    create: {
      id: "marvel-gi-joe-123",
      seriesId: "marvel-gi-joe",
      number: 123,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-124" },
    update: {},
    create: {
      id: "marvel-gi-joe-124",
      seriesId: "marvel-gi-joe",
      number: 124,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--124.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-125" },
    update: {},
    create: {
      id: "marvel-gi-joe-125",
      seriesId: "marvel-gi-joe",
      number: 125,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--125.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-126" },
    update: {},
    create: {
      id: "marvel-gi-joe-126",
      seriesId: "marvel-gi-joe",
      number: 126,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--126.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-127" },
    update: {},
    create: {
      id: "marvel-gi-joe-127",
      seriesId: "marvel-gi-joe",
      number: 127,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--127.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-128" },
    update: {},
    create: {
      id: "marvel-gi-joe-128",
      seriesId: "marvel-gi-joe",
      number: 128,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--128.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-129" },
    update: {},
    create: {
      id: "marvel-gi-joe-129",
      seriesId: "marvel-gi-joe",
      number: 129,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-130" },
    update: {},
    create: {
      id: "marvel-gi-joe-130",
      seriesId: "marvel-gi-joe",
      number: 130,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--130--img-5202.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-131" },
    update: {},
    create: {
      id: "marvel-gi-joe-131",
      seriesId: "marvel-gi-joe",
      number: 131,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--131--img-5203.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-132" },
    update: {},
    create: {
      id: "marvel-gi-joe-132",
      seriesId: "marvel-gi-joe",
      number: 132,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-133" },
    update: {},
    create: {
      id: "marvel-gi-joe-133",
      seriesId: "marvel-gi-joe",
      number: 133,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--133.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-138" },
    update: {},
    create: {
      id: "marvel-gi-joe-138",
      seriesId: "marvel-gi-joe",
      number: 138,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-starring-snake-eyes-and-ninja-force--138.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-139" },
    update: {},
    create: {
      id: "marvel-gi-joe-139",
      seriesId: "marvel-gi-joe",
      number: 139,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--139.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-140" },
    update: {},
    create: {
      id: "marvel-gi-joe-140",
      seriesId: "marvel-gi-joe",
      number: 140,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-starring-snake-eyes-and-transformers-generation-2--140.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-141" },
    update: {},
    create: {
      id: "marvel-gi-joe-141",
      seriesId: "marvel-gi-joe",
      number: 141,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-starring-snake-eyes-and-transformers-generation-2--141.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-142" },
    update: {},
    create: {
      id: "marvel-gi-joe-142",
      seriesId: "marvel-gi-joe",
      number: 142,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-starring-snake-eyes--142.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-143" },
    update: {},
    create: {
      id: "marvel-gi-joe-143",
      seriesId: "marvel-gi-joe",
      number: 143,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-starring-snake-eyes--143.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-144" },
    update: {},
    create: {
      id: "marvel-gi-joe-144",
      seriesId: "marvel-gi-joe",
      number: 144,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-154" },
    update: {},
    create: {
      id: "marvel-gi-joe-154",
      seriesId: "marvel-gi-joe",
      number: 154,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-18" },
    update: {},
    create: {
      id: "marvel-gi-joe-18",
      seriesId: "marvel-gi-joe",
      number: 18,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe--18.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-2" },
    update: {},
    create: {
      id: "marvel-gi-joe-2",
      seriesId: "marvel-gi-joe",
      number: 2,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-20" },
    update: {},
    create: {
      id: "marvel-gi-joe-20",
      seriesId: "marvel-gi-joe",
      number: 20,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--20.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-21" },
    update: {},
    create: {
      id: "marvel-gi-joe-21",
      seriesId: "marvel-gi-joe",
      number: 21,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--21.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-26" },
    update: {},
    create: {
      id: "marvel-gi-joe-26",
      seriesId: "marvel-gi-joe",
      number: 26,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--26.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-27" },
    update: {},
    create: {
      id: "marvel-gi-joe-27",
      seriesId: "marvel-gi-joe",
      number: 27,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-32" },
    update: {},
    create: {
      id: "marvel-gi-joe-32",
      seriesId: "marvel-gi-joe",
      number: 32,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--32.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-38" },
    update: {},
    create: {
      id: "marvel-gi-joe-38",
      seriesId: "marvel-gi-joe",
      number: 38,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--38--img-5170.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-39" },
    update: {},
    create: {
      id: "marvel-gi-joe-39",
      seriesId: "marvel-gi-joe",
      number: 39,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--39--img-5173.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-40" },
    update: {},
    create: {
      id: "marvel-gi-joe-40",
      seriesId: "marvel-gi-joe",
      number: 40,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-41" },
    update: {},
    create: {
      id: "marvel-gi-joe-41",
      seriesId: "marvel-gi-joe",
      number: 41,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--41.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-42" },
    update: {},
    create: {
      id: "marvel-gi-joe-42",
      seriesId: "marvel-gi-joe",
      number: 42,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--42.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-43" },
    update: {},
    create: {
      id: "marvel-gi-joe-43",
      seriesId: "marvel-gi-joe",
      number: 43,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--43.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-45" },
    update: {},
    create: {
      id: "marvel-gi-joe-45",
      seriesId: "marvel-gi-joe",
      number: 45,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--45.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-46" },
    update: {},
    create: {
      id: "marvel-gi-joe-46",
      seriesId: "marvel-gi-joe",
      number: 46,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--46.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-48" },
    update: {},
    create: {
      id: "marvel-gi-joe-48",
      seriesId: "marvel-gi-joe",
      number: 48,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-49" },
    update: {},
    create: {
      id: "marvel-gi-joe-49",
      seriesId: "marvel-gi-joe",
      number: 49,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-50" },
    update: {},
    create: {
      id: "marvel-gi-joe-50",
      seriesId: "marvel-gi-joe",
      number: 50,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--50.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-51" },
    update: {},
    create: {
      id: "marvel-gi-joe-51",
      seriesId: "marvel-gi-joe",
      number: 51,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--51.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-52" },
    update: {},
    create: {
      id: "marvel-gi-joe-52",
      seriesId: "marvel-gi-joe",
      number: 52,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--52.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-53" },
    update: {},
    create: {
      id: "marvel-gi-joe-53",
      seriesId: "marvel-gi-joe",
      number: 53,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--53.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-54" },
    update: {},
    create: {
      id: "marvel-gi-joe-54",
      seriesId: "marvel-gi-joe",
      number: 54,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-55" },
    update: {},
    create: {
      id: "marvel-gi-joe-55",
      seriesId: "marvel-gi-joe",
      number: 55,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--55.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-56" },
    update: {},
    create: {
      id: "marvel-gi-joe-56",
      seriesId: "marvel-gi-joe",
      number: 56,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--56--img-5127.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-57" },
    update: {},
    create: {
      id: "marvel-gi-joe-57",
      seriesId: "marvel-gi-joe",
      number: 57,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--57.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-58" },
    update: {},
    create: {
      id: "marvel-gi-joe-58",
      seriesId: "marvel-gi-joe",
      number: 58,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--58.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-59" },
    update: {},
    create: {
      id: "marvel-gi-joe-59",
      seriesId: "marvel-gi-joe",
      number: 59,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--59.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-60" },
    update: {},
    create: {
      id: "marvel-gi-joe-60",
      seriesId: "marvel-gi-joe",
      number: 60,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--60--img-5133.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-61" },
    update: {},
    create: {
      id: "marvel-gi-joe-61",
      seriesId: "marvel-gi-joe",
      number: 61,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--61.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-62" },
    update: {},
    create: {
      id: "marvel-gi-joe-62",
      seriesId: "marvel-gi-joe",
      number: 62,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--62.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-63" },
    update: {},
    create: {
      id: "marvel-gi-joe-63",
      seriesId: "marvel-gi-joe",
      number: 63,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--63.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-64" },
    update: {},
    create: {
      id: "marvel-gi-joe-64",
      seriesId: "marvel-gi-joe",
      number: 64,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--64.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-65" },
    update: {},
    create: {
      id: "marvel-gi-joe-65",
      seriesId: "marvel-gi-joe",
      number: 65,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--65.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-66" },
    update: {},
    create: {
      id: "marvel-gi-joe-66",
      seriesId: "marvel-gi-joe",
      number: 66,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--66.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-67" },
    update: {},
    create: {
      id: "marvel-gi-joe-67",
      seriesId: "marvel-gi-joe",
      number: 67,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--67.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-68" },
    update: {},
    create: {
      id: "marvel-gi-joe-68",
      seriesId: "marvel-gi-joe",
      number: 68,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--68.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-69" },
    update: {},
    create: {
      id: "marvel-gi-joe-69",
      seriesId: "marvel-gi-joe",
      number: 69,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--69.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-70" },
    update: {},
    create: {
      id: "marvel-gi-joe-70",
      seriesId: "marvel-gi-joe",
      number: 70,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--70.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-71" },
    update: {},
    create: {
      id: "marvel-gi-joe-71",
      seriesId: "marvel-gi-joe",
      number: 71,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-72" },
    update: {},
    create: {
      id: "marvel-gi-joe-72",
      seriesId: "marvel-gi-joe",
      number: 72,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-73" },
    update: {},
    create: {
      id: "marvel-gi-joe-73",
      seriesId: "marvel-gi-joe",
      number: 73,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-74" },
    update: {},
    create: {
      id: "marvel-gi-joe-74",
      seriesId: "marvel-gi-joe",
      number: 74,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--74.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-75" },
    update: {},
    create: {
      id: "marvel-gi-joe-75",
      seriesId: "marvel-gi-joe",
      number: 75,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--75.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-76" },
    update: {},
    create: {
      id: "marvel-gi-joe-76",
      seriesId: "marvel-gi-joe",
      number: 76,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--76.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-77" },
    update: {},
    create: {
      id: "marvel-gi-joe-77",
      seriesId: "marvel-gi-joe",
      number: 77,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--77.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-78" },
    update: {},
    create: {
      id: "marvel-gi-joe-78",
      seriesId: "marvel-gi-joe",
      number: 78,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-79" },
    update: {},
    create: {
      id: "marvel-gi-joe-79",
      seriesId: "marvel-gi-joe",
      number: 79,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--79--img-5153.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-80" },
    update: {},
    create: {
      id: "marvel-gi-joe-80",
      seriesId: "marvel-gi-joe",
      number: 80,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--80.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-81" },
    update: {},
    create: {
      id: "marvel-gi-joe-81",
      seriesId: "marvel-gi-joe",
      number: 81,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-82" },
    update: {},
    create: {
      id: "marvel-gi-joe-82",
      seriesId: "marvel-gi-joe",
      number: 82,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-83" },
    update: {},
    create: {
      id: "marvel-gi-joe-83",
      seriesId: "marvel-gi-joe",
      number: 83,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--83--img-5157.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-84" },
    update: {},
    create: {
      id: "marvel-gi-joe-84",
      seriesId: "marvel-gi-joe",
      number: 84,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-85" },
    update: {},
    create: {
      id: "marvel-gi-joe-85",
      seriesId: "marvel-gi-joe",
      number: 85,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--85.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-86" },
    update: {},
    create: {
      id: "marvel-gi-joe-86",
      seriesId: "marvel-gi-joe",
      number: 86,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--86.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-87" },
    update: {},
    create: {
      id: "marvel-gi-joe-87",
      seriesId: "marvel-gi-joe",
      number: 87,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--87.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-88" },
    update: {},
    create: {
      id: "marvel-gi-joe-88",
      seriesId: "marvel-gi-joe",
      number: 88,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--88.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-89" },
    update: {},
    create: {
      id: "marvel-gi-joe-89",
      seriesId: "marvel-gi-joe",
      number: 89,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--89.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-90" },
    update: {},
    create: {
      id: "marvel-gi-joe-90",
      seriesId: "marvel-gi-joe",
      number: 90,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--90.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-91" },
    update: {},
    create: {
      id: "marvel-gi-joe-91",
      seriesId: "marvel-gi-joe",
      number: 91,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-92" },
    update: {},
    create: {
      id: "marvel-gi-joe-92",
      seriesId: "marvel-gi-joe",
      number: 92,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-93" },
    update: {},
    create: {
      id: "marvel-gi-joe-93",
      seriesId: "marvel-gi-joe",
      number: 93,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-94" },
    update: {},
    create: {
      id: "marvel-gi-joe-94",
      seriesId: "marvel-gi-joe",
      number: 94,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--94.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-95" },
    update: {},
    create: {
      id: "marvel-gi-joe-95",
      seriesId: "marvel-gi-joe",
      number: 95,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-96" },
    update: {},
    create: {
      id: "marvel-gi-joe-96",
      seriesId: "marvel-gi-joe",
      number: 96,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-97" },
    update: {},
    create: {
      id: "marvel-gi-joe-97",
      seriesId: "marvel-gi-joe",
      number: 97,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--97.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-98" },
    update: {},
    create: {
      id: "marvel-gi-joe-98",
      seriesId: "marvel-gi-joe",
      number: 98,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-99" },
    update: {},
    create: {
      id: "marvel-gi-joe-99",
      seriesId: "marvel-gi-joe",
      number: 99,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "idw-gi-joe-18" },
    update: {},
    create: {
      id: "idw-gi-joe-18",
      seriesId: "idw-gi-joe",
      number: 18,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe--18.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "idw-gi-joe-20" },
    update: {},
    create: {
      id: "idw-gi-joe-20",
      seriesId: "idw-gi-joe",
      number: 20,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-a-real-american-hero--20.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "idw-gi-joe-hearts-minds-1" },
    update: {},
    create: {
      id: "idw-gi-joe-hearts-minds-1",
      seriesId: "idw-gi-joe-hearts-minds",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "idw-gi-joe-hearts-minds-2" },
    update: {},
    create: {
      id: "idw-gi-joe-hearts-minds-2",
      seriesId: "idw-gi-joe-hearts-minds",
      number: 2,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "idw-gi-joe-origins-15" },
    update: {},
    create: {
      id: "idw-gi-joe-origins-15",
      seriesId: "idw-gi-joe-origins",
      number: 15,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "idw-gi-joe-origins-16" },
    update: {},
    create: {
      id: "idw-gi-joe-origins-16",
      seriesId: "idw-gi-joe-origins",
      number: 16,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-1" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-1",
      seriesId: "marvel-gi-joe-special-missions",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-10" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-10",
      seriesId: "marvel-gi-joe-special-missions",
      number: 10,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--10.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-11" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-11",
      seriesId: "marvel-gi-joe-special-missions",
      number: 11,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--11.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-12" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-12",
      seriesId: "marvel-gi-joe-special-missions",
      number: 12,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--12--img-5208.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-14" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-14",
      seriesId: "marvel-gi-joe-special-missions",
      number: 14,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--14.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-15" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-15",
      seriesId: "marvel-gi-joe-special-missions",
      number: 15,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--15.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-16" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-16",
      seriesId: "marvel-gi-joe-special-missions",
      number: 16,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--16.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-17" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-17",
      seriesId: "marvel-gi-joe-special-missions",
      number: 17,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-18" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-18",
      seriesId: "marvel-gi-joe-special-missions",
      number: 18,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--18.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-19" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-19",
      seriesId: "marvel-gi-joe-special-missions",
      number: 19,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--19.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-2" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-2",
      seriesId: "marvel-gi-joe-special-missions",
      number: 2,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-20" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-20",
      seriesId: "marvel-gi-joe-special-missions",
      number: 20,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--20.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-21" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-21",
      seriesId: "marvel-gi-joe-special-missions",
      number: 21,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--21.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-22" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-22",
      seriesId: "marvel-gi-joe-special-missions",
      number: 22,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--22.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-23" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-23",
      seriesId: "marvel-gi-joe-special-missions",
      number: 23,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--23--img-5216.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-24" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-24",
      seriesId: "marvel-gi-joe-special-missions",
      number: 24,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--24.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-25" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-25",
      seriesId: "marvel-gi-joe-special-missions",
      number: 25,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--25.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-26" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-26",
      seriesId: "marvel-gi-joe-special-missions",
      number: 26,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--26.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-28" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-28",
      seriesId: "marvel-gi-joe-special-missions",
      number: 28,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--28.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-3" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-3",
      seriesId: "marvel-gi-joe-special-missions",
      number: 3,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-4" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-4",
      seriesId: "marvel-gi-joe-special-missions",
      number: 4,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-5" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-5",
      seriesId: "marvel-gi-joe-special-missions",
      number: 5,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-6" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-6",
      seriesId: "marvel-gi-joe-special-missions",
      number: 6,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--6.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-7" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-7",
      seriesId: "marvel-gi-joe-special-missions",
      number: 7,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--7--img-5221.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-8" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-8",
      seriesId: "marvel-gi-joe-special-missions",
      number: 8,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--8.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-special-missions-9" },
    update: {},
    create: {
      id: "marvel-gi-joe-special-missions-9",
      seriesId: "marvel-gi-joe-special-missions",
      number: 9,
      coverDate: null,
      price: null,
      coverImage: "g.i.-joe-special-missions--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-18" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-18",
      seriesId: "marvel-groo-the-wanderer",
      number: 18,
      coverDate: new Date("1986-08-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-19" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-19",
      seriesId: "marvel-groo-the-wanderer",
      number: 19,
      coverDate: new Date("1986-09-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-21" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-21",
      seriesId: "marvel-groo-the-wanderer",
      number: 21,
      coverDate: new Date("1986-11-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-22" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-22",
      seriesId: "marvel-groo-the-wanderer",
      number: 22,
      coverDate: new Date("1986-12-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-23" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-23",
      seriesId: "marvel-groo-the-wanderer",
      number: 23,
      coverDate: new Date("1987-01-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-26" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-26",
      seriesId: "marvel-groo-the-wanderer",
      number: 26,
      coverDate: new Date("1987-04-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-27" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-27",
      seriesId: "marvel-groo-the-wanderer",
      number: 27,
      coverDate: new Date("1987-05-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-28" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-28",
      seriesId: "marvel-groo-the-wanderer",
      number: 28,
      coverDate: new Date("1987-06-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-29" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-29",
      seriesId: "marvel-groo-the-wanderer",
      number: 29,
      coverDate: new Date("1987-07-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-30" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-30",
      seriesId: "marvel-groo-the-wanderer",
      number: 30,
      coverDate: new Date("1987-08-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-31" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-31",
      seriesId: "marvel-groo-the-wanderer",
      number: 31,
      coverDate: new Date("1987-09-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-32" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-32",
      seriesId: "marvel-groo-the-wanderer",
      number: 32,
      coverDate: new Date("1987-10-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-33" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-33",
      seriesId: "marvel-groo-the-wanderer",
      number: 33,
      coverDate: new Date("1987-11-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-39" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-39",
      seriesId: "marvel-groo-the-wanderer",
      number: 39,
      coverDate: new Date("1988-05-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-40" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-40",
      seriesId: "marvel-groo-the-wanderer",
      number: 40,
      coverDate: new Date("1988-06-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-48" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-48",
      seriesId: "marvel-groo-the-wanderer",
      number: 48,
      coverDate: new Date("1989-02-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-50" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-50",
      seriesId: "marvel-groo-the-wanderer",
      number: 50,
      coverDate: new Date("1989-04-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-52" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-52",
      seriesId: "marvel-groo-the-wanderer",
      number: 52,
      coverDate: new Date("1989-06-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-53" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-53",
      seriesId: "marvel-groo-the-wanderer",
      number: 53,
      coverDate: new Date("1989-07-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-54" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-54",
      seriesId: "marvel-groo-the-wanderer",
      number: 54,
      coverDate: new Date("1989-08-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-55" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-55",
      seriesId: "marvel-groo-the-wanderer",
      number: 55,
      coverDate: new Date("1989-09-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-57" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-57",
      seriesId: "marvel-groo-the-wanderer",
      number: 57,
      coverDate: new Date("1989-11-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-58" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-58",
      seriesId: "marvel-groo-the-wanderer",
      number: 58,
      coverDate: new Date("1989-11-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-59" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-59",
      seriesId: "marvel-groo-the-wanderer",
      number: 59,
      coverDate: new Date("1989-12-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-60" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-60",
      seriesId: "marvel-groo-the-wanderer",
      number: 60,
      coverDate: new Date("1989-12-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-61" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-61",
      seriesId: "marvel-groo-the-wanderer",
      number: 61,
      coverDate: new Date("1990-01-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-62" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-62",
      seriesId: "marvel-groo-the-wanderer",
      number: 62,
      coverDate: new Date("1990-02-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-63" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-63",
      seriesId: "marvel-groo-the-wanderer",
      number: 63,
      coverDate: new Date("1990-03-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-64" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-64",
      seriesId: "marvel-groo-the-wanderer",
      number: 64,
      coverDate: new Date("1990-04-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-65" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-65",
      seriesId: "marvel-groo-the-wanderer",
      number: 65,
      coverDate: new Date("1990-05-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-66" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-66",
      seriesId: "marvel-groo-the-wanderer",
      number: 66,
      coverDate: new Date("1990-06-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-67" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-67",
      seriesId: "marvel-groo-the-wanderer",
      number: 67,
      coverDate: new Date("1990-07-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-68" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-68",
      seriesId: "marvel-groo-the-wanderer",
      number: 68,
      coverDate: new Date("1990-08-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-69" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-69",
      seriesId: "marvel-groo-the-wanderer",
      number: 69,
      coverDate: new Date("1990-09-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-70" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-70",
      seriesId: "marvel-groo-the-wanderer",
      number: 70,
      coverDate: new Date("1990-10-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-71" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-71",
      seriesId: "marvel-groo-the-wanderer",
      number: 71,
      coverDate: new Date("1990-11-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-groo-the-wanderer-72" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-72",
      seriesId: "marvel-groo-the-wanderer",
      number: 72,
      coverDate: new Date("1990-12-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "fleetway-quality-judge-dredd-46" },
    update: {},
    create: {
      id: "fleetway-quality-judge-dredd-46",
      seriesId: "fleetway-quality-judge-dredd",
      number: 46,
      coverDate: null,
      price: 1.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "fleetway-quality-judge-dredd-47" },
    update: {},
    create: {
      id: "fleetway-quality-judge-dredd-47",
      seriesId: "fleetway-quality-judge-dredd",
      number: 47,
      coverDate: null,
      price: 1.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-1" },
    update: {},
    create: {
      id: "vertigo-losers-1",
      seriesId: "vertigo-losers",
      number: 1,
      coverDate: new Date("2003-08-01"),
      price: 2.95,
      coverImage: "losers-1.webp",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-10" },
    update: {},
    create: {
      id: "vertigo-losers-10",
      seriesId: "vertigo-losers",
      number: 10,
      coverDate: new Date("2004-05-01"),
      price: 2.95,
      coverImage: "the-losers--10.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-11" },
    update: {},
    create: {
      id: "vertigo-losers-11",
      seriesId: "vertigo-losers",
      number: 11,
      coverDate: new Date("2004-06-01"),
      price: 2.95,
      coverImage: "the-losers--11.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-12" },
    update: {},
    create: {
      id: "vertigo-losers-12",
      seriesId: "vertigo-losers",
      number: 12,
      coverDate: new Date("2004-07-01"),
      price: 2.95,
      coverImage: "the-losers--12.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-13" },
    update: {},
    create: {
      id: "vertigo-losers-13",
      seriesId: "vertigo-losers",
      number: 13,
      coverDate: new Date("2004-08-01"),
      price: 2.95,
      coverImage: "the-losers--13.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-14" },
    update: {},
    create: {
      id: "vertigo-losers-14",
      seriesId: "vertigo-losers",
      number: 14,
      coverDate: new Date("2004-09-01"),
      price: 2.95,
      coverImage: "the-losers--14.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-15" },
    update: {},
    create: {
      id: "vertigo-losers-15",
      seriesId: "vertigo-losers",
      number: 15,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--15.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-16" },
    update: {},
    create: {
      id: "vertigo-losers-16",
      seriesId: "vertigo-losers",
      number: 16,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--16.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-17" },
    update: {},
    create: {
      id: "vertigo-losers-17",
      seriesId: "vertigo-losers",
      number: 17,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--17.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-18" },
    update: {},
    create: {
      id: "vertigo-losers-18",
      seriesId: "vertigo-losers",
      number: 18,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--18.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-19" },
    update: {},
    create: {
      id: "vertigo-losers-19",
      seriesId: "vertigo-losers",
      number: 19,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--19.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-2" },
    update: {},
    create: {
      id: "vertigo-losers-2",
      seriesId: "vertigo-losers",
      number: 2,
      coverDate: new Date("2003-09-01"),
      price: 2.95,
      coverImage: "the-losers--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-20" },
    update: {},
    create: {
      id: "vertigo-losers-20",
      seriesId: "vertigo-losers",
      number: 20,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--20.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-21" },
    update: {},
    create: {
      id: "vertigo-losers-21",
      seriesId: "vertigo-losers",
      number: 21,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--21.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-22" },
    update: {},
    create: {
      id: "vertigo-losers-22",
      seriesId: "vertigo-losers",
      number: 22,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--22.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-23" },
    update: {},
    create: {
      id: "vertigo-losers-23",
      seriesId: "vertigo-losers",
      number: 23,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--23.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-24" },
    update: {},
    create: {
      id: "vertigo-losers-24",
      seriesId: "vertigo-losers",
      number: 24,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--24.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-25" },
    update: {},
    create: {
      id: "vertigo-losers-25",
      seriesId: "vertigo-losers",
      number: 25,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--25.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-26" },
    update: {},
    create: {
      id: "vertigo-losers-26",
      seriesId: "vertigo-losers",
      number: 26,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--26.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-27" },
    update: {},
    create: {
      id: "vertigo-losers-27",
      seriesId: "vertigo-losers",
      number: 27,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--27.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-28" },
    update: {},
    create: {
      id: "vertigo-losers-28",
      seriesId: "vertigo-losers",
      number: 28,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--28.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-29" },
    update: {},
    create: {
      id: "vertigo-losers-29",
      seriesId: "vertigo-losers",
      number: 29,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--29.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-3" },
    update: {},
    create: {
      id: "vertigo-losers-3",
      seriesId: "vertigo-losers",
      number: 3,
      coverDate: new Date("2003-10-01"),
      price: 2.95,
      coverImage: "the-losers--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-30" },
    update: {},
    create: {
      id: "vertigo-losers-30",
      seriesId: "vertigo-losers",
      number: 30,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--30.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-31" },
    update: {},
    create: {
      id: "vertigo-losers-31",
      seriesId: "vertigo-losers",
      number: 31,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--31.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-32" },
    update: {},
    create: {
      id: "vertigo-losers-32",
      seriesId: "vertigo-losers",
      number: 32,
      coverDate: null,
      price: 2.95,
      coverImage: "the-losers--32.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-4" },
    update: {},
    create: {
      id: "vertigo-losers-4",
      seriesId: "vertigo-losers",
      number: 4,
      coverDate: new Date("2003-11-01"),
      price: 2.95,
      coverImage: "the-losers--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-5" },
    update: {},
    create: {
      id: "vertigo-losers-5",
      seriesId: "vertigo-losers",
      number: 5,
      coverDate: new Date("2003-12-01"),
      price: 2.95,
      coverImage: "the-losers--5.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-6" },
    update: {},
    create: {
      id: "vertigo-losers-6",
      seriesId: "vertigo-losers",
      number: 6,
      coverDate: new Date("2004-01-01"),
      price: 2.95,
      coverImage: "losers-6.webp",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-7" },
    update: {},
    create: {
      id: "vertigo-losers-7",
      seriesId: "vertigo-losers",
      number: 7,
      coverDate: new Date("2004-02-01"),
      price: 2.95,
      coverImage: "losers-7.webp",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-8" },
    update: {},
    create: {
      id: "vertigo-losers-8",
      seriesId: "vertigo-losers",
      number: 8,
      coverDate: new Date("2004-03-01"),
      price: 2.95,
      coverImage: "the-losers--8.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "vertigo-losers-9" },
    update: {},
    create: {
      id: "vertigo-losers-9",
      seriesId: "vertigo-losers",
      number: 9,
      coverDate: new Date("2004-04-01"),
      price: 2.95,
      coverImage: "the-losers--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-marvel-comics-present-wolverine-1" },
    update: {},
    create: {
      id: "marvel-marvel-comics-present-wolverine-1",
      seriesId: "marvel-marvel-comics-present-wolverine",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-marvel-knights-spiderman-wolverine-1" },
    update: {},
    create: {
      id: "marvel-marvel-knights-spiderman-wolverine-1",
      seriesId: "marvel-marvel-knights-spiderman-wolverine",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-marvel-team-up-96" },
    update: {},
    create: {
      id: "marvel-marvel-team-up-96",
      seriesId: "marvel-marvel-team-up",
      number: 96,
      coverDate: new Date("1980-08-01"),
      price: 0.4,
      coverImage: "marvel-team-up--96.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-merc-1" },
    update: {},
    create: {
      id: "marvel-merc-1",
      seriesId: "marvel-merc",
      number: 1,
      coverDate: new Date("1986-11-01"),
      price: 0.75,
      coverImage: "mark-hazzard-merc--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-merc-4" },
    update: {},
    create: {
      id: "marvel-merc-4",
      seriesId: "marvel-merc",
      number: 4,
      coverDate: new Date("1987-04-01"),
      price: 0.75,
      coverImage: "mark-hazzard-merc--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-1" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-1",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 1,
      coverDate: new Date("1989-08-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-10" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-10",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 10,
      coverDate: new Date("1990-03-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-11" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-11",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 11,
      coverDate: new Date("1990-04-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--11.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-12" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-12",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 12,
      coverDate: new Date("1990-05-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-13" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-13",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 13,
      coverDate: new Date("1990-06-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-14" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-14",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 14,
      coverDate: new Date("1990-07-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-15" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-15",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 15,
      coverDate: new Date("1990-08-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-16" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-16",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 16,
      coverDate: new Date("1990-09-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-2" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-2",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 2,
      coverDate: new Date("1989-09-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-3" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-3",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 3,
      coverDate: new Date("1989-10-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-4" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-4",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 4,
      coverDate: new Date("1989-11-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-5" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-5",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 5,
      coverDate: new Date("1989-11-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--5.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-6" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-6",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 6,
      coverDate: new Date("1989-12-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--6--img-5562.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-7" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-7",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 7,
      coverDate: new Date("1989-12-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--7--img-5563.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-8" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-8",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 8,
      coverDate: new Date("1990-01-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--8.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-9" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-9",
      seriesId: "marvel-nth-man-the-ultimate-ninja",
      number: 9,
      coverDate: new Date("1990-02-01"),
      price: 1.0,
      coverImage: "nth-man-the-ultimate-ninja--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-powers-19" },
    update: {},
    create: {
      id: "image-powers-19",
      seriesId: "image-powers",
      number: 19,
      coverDate: null,
      price: 2.95,
      coverImage: "powers--19.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-robocop-2" },
    update: {},
    create: {
      id: "marvel-robocop-2",
      seriesId: "marvel-robocop",
      number: 2,
      coverDate: null,
      price: 1.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "disney-roger-rabbit-1" },
    update: {},
    create: {
      id: "disney-roger-rabbit-1",
      seriesId: "disney-roger-rabbit",
      number: 1,
      coverDate: null,
      price: 1.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-secrets-of-haunted-house-42" },
    update: {},
    create: {
      id: "dc-secrets-of-haunted-house-42",
      seriesId: "dc-secrets-of-haunted-house",
      number: 42,
      coverDate: null,
      price: 0.6,
      coverImage: "secrets-of-haunted-house--42.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-silver-surfer-9" },
    update: {},
    create: {
      id: "marvel-silver-surfer-9",
      seriesId: "marvel-silver-surfer",
      number: 9,
      coverDate: new Date("1988-03-01"),
      price: 0.75,
      coverImage: "silver-surfer--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-sledge-hammer-2" },
    update: {},
    create: {
      id: "marvel-sledge-hammer-2",
      seriesId: "marvel-sledge-hammer",
      number: 2,
      coverDate: null,
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spiderman-11" },
    update: {},
    create: {
      id: "marvel-spiderman-11",
      seriesId: "marvel-spiderman",
      number: 11,
      coverDate: null,
      price: null,
      coverImage: "spider-man--11.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spiderman-4" },
    update: {},
    create: {
      id: "marvel-spiderman-4",
      seriesId: "marvel-spiderman",
      number: 4,
      coverDate: null,
      price: null,
      coverImage: "spider-man-wolverine--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spiderman-5" },
    update: {},
    create: {
      id: "marvel-spiderman-5",
      seriesId: "marvel-spiderman",
      number: 5,
      coverDate: null,
      price: null,
      coverImage: "spider-man--5.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spiderman-7" },
    update: {},
    create: {
      id: "marvel-spiderman-7",
      seriesId: "marvel-spiderman",
      number: 7,
      coverDate: null,
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spiderman-8" },
    update: {},
    create: {
      id: "marvel-spiderman-8",
      seriesId: "marvel-spiderman",
      number: 8,
      coverDate: null,
      price: null,
      coverImage: "spider-man--8.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spiderman-9" },
    update: {},
    create: {
      id: "marvel-spiderman-9",
      seriesId: "marvel-spiderman",
      number: 9,
      coverDate: null,
      price: null,
      coverImage: "spider-man--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-spidey-super-stories-44" },
    update: {},
    create: {
      id: "marvel-spidey-super-stories-44",
      seriesId: "marvel-spidey-super-stories",
      number: 44,
      coverDate: new Date("1980-01-01"),
      price: 0.4,
      coverImage: "spidey-super-stories--44.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-star-wars-100" },
    update: {},
    create: {
      id: "marvel-star-wars-100",
      seriesId: "marvel-star-wars",
      number: 100,
      coverDate: null,
      price: null,
      coverImage: "star-wars--100.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-star-wars-61" },
    update: {},
    create: {
      id: "marvel-star-wars-61",
      seriesId: "marvel-star-wars",
      number: 61,
      coverDate: null,
      price: null,
      coverImage: "star-wars--61.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-star-wars-78" },
    update: {},
    create: {
      id: "marvel-star-wars-78",
      seriesId: "marvel-star-wars",
      number: 78,
      coverDate: null,
      price: null,
      coverImage: "star-wars--78.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-star-wars-90" },
    update: {},
    create: {
      id: "marvel-star-wars-90",
      seriesId: "marvel-star-wars",
      number: 90,
      coverDate: null,
      price: null,
      coverImage: "star-wars--90.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-strange-tales-12" },
    update: {},
    create: {
      id: "marvel-strange-tales-12",
      seriesId: "marvel-strange-tales",
      number: 12,
      coverDate: null,
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-superman-tarzan-sons-of-the-jungle-1" },
    update: {},
    create: {
      id: "dc-superman-tarzan-sons-of-the-jungle-1",
      seriesId: "dc-superman-tarzan-sons-of-the-jungle",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: "superman-tarzan-sons-of-the-jungle--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-superman-tarzan-sons-of-the-jungle-2" },
    update: {},
    create: {
      id: "dc-superman-tarzan-sons-of-the-jungle-2",
      seriesId: "dc-superman-tarzan-sons-of-the-jungle",
      number: 2,
      coverDate: null,
      price: null,
      coverImage: "superman-tarzan-sons-of-the-jungle--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-superman-tarzan-sons-of-the-jungle-3" },
    update: {},
    create: {
      id: "dc-superman-tarzan-sons-of-the-jungle-3",
      seriesId: "dc-superman-tarzan-sons-of-the-jungle",
      number: 3,
      coverDate: null,
      price: null,
      coverImage: "supermantarzan-sons-of-the-jungle--3.webp",
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-tenth-1" },
    update: {},
    create: {
      id: "image-tenth-1",
      seriesId: "image-tenth",
      number: 1,
      coverDate: null,
      price: 2.5,
      coverImage: "the-tenth--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-the-darkness-17" },
    update: {},
    create: {
      id: "image-the-darkness-17",
      seriesId: "image-the-darkness",
      number: 17,
      coverDate: null,
      price: 2.5,
      coverImage: "the-darkness--17.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-the-darkness-6" },
    update: {},
    create: {
      id: "image-the-darkness-6",
      seriesId: "image-the-darkness",
      number: 6,
      coverDate: null,
      price: 2.5,
      coverImage: "the-darkness--6.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-the-darkness-7" },
    update: {},
    create: {
      id: "image-the-darkness-7",
      seriesId: "image-the-darkness",
      number: 7,
      coverDate: null,
      price: 2.5,
      coverImage: "the-darkness--7.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "epic-the-groo-chronicles-2" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles-2",
      seriesId: "epic-the-groo-chronicles",
      number: 2,
      coverDate: null,
      price: 3.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "epic-the-groo-chronicles-5" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles-5",
      seriesId: "epic-the-groo-chronicles",
      number: 5,
      coverDate: null,
      price: 3.5,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-incredible-hulk-353" },
    update: {},
    create: {
      id: "marvel-the-incredible-hulk-353",
      seriesId: "marvel-the-incredible-hulk",
      number: 353,
      coverDate: null,
      price: 0.75,
      coverImage: "the-incredible-hulk--353.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-1" },
    update: {},
    create: {
      id: "marvel-the-nam-1",
      seriesId: "marvel-the-nam",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: "the--nam--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-12" },
    update: {},
    create: {
      id: "marvel-the-nam-12",
      seriesId: "marvel-the-nam",
      number: 12,
      coverDate: null,
      price: null,
      coverImage: "the--nam--12.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-2" },
    update: {},
    create: {
      id: "marvel-the-nam-2",
      seriesId: "marvel-the-nam",
      number: 2,
      coverDate: null,
      price: null,
      coverImage: "the--nam--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-3" },
    update: {},
    create: {
      id: "marvel-the-nam-3",
      seriesId: "marvel-the-nam",
      number: 3,
      coverDate: null,
      price: null,
      coverImage: "the--nam--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-34" },
    update: {},
    create: {
      id: "marvel-the-nam-34",
      seriesId: "marvel-the-nam",
      number: 34,
      coverDate: null,
      price: null,
      coverImage: "the--nam--34.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-4" },
    update: {},
    create: {
      id: "marvel-the-nam-4",
      seriesId: "marvel-the-nam",
      number: 4,
      coverDate: null,
      price: null,
      coverImage: "the--nam--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-nam-7" },
    update: {},
    create: {
      id: "marvel-the-nam-7",
      seriesId: "marvel-the-nam",
      number: 7,
      coverDate: null,
      price: null,
      coverImage: "the--nam--7.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "gold-key-the-pink-panther-68" },
    update: {},
    create: {
      id: "gold-key-the-pink-panther-68",
      seriesId: "gold-key-the-pink-panther",
      number: 68,
      coverDate: new Date("1978-09-01"),
      price: 0.4,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-19" },
    update: {},
    create: {
      id: "marvel-the-punisher-19",
      seriesId: "marvel-the-punisher",
      number: 19,
      coverDate: null,
      price: 1.0,
      coverImage: "the-punisher--19.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-24" },
    update: {},
    create: {
      id: "marvel-the-punisher-24",
      seriesId: "marvel-the-punisher",
      number: 24,
      coverDate: null,
      price: null,
      coverImage: "the-punisher--24.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-30" },
    update: {},
    create: {
      id: "marvel-the-punisher-30",
      seriesId: "marvel-the-punisher",
      number: 30,
      coverDate: new Date("1990-02-01"),
      price: 1.0,
      coverImage: "the-punisher--30.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-31" },
    update: {},
    create: {
      id: "marvel-the-punisher-31",
      seriesId: "marvel-the-punisher",
      number: 31,
      coverDate: new Date("1990-03-01"),
      price: 1.0,
      coverImage: "the-punisher--31.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-32" },
    update: {},
    create: {
      id: "marvel-the-punisher-32",
      seriesId: "marvel-the-punisher",
      number: 32,
      coverDate: new Date("1990-04-01"),
      price: 1.0,
      coverImage: "the-punisher--32.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-33" },
    update: {},
    create: {
      id: "marvel-the-punisher-33",
      seriesId: "marvel-the-punisher",
      number: 33,
      coverDate: new Date("1990-05-01"),
      price: 1.0,
      coverImage: "the-punisher--33.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-34" },
    update: {},
    create: {
      id: "marvel-the-punisher-34",
      seriesId: "marvel-the-punisher",
      number: 34,
      coverDate: new Date("1990-06-01"),
      price: 1.0,
      coverImage: "the-punisher--34.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-35" },
    update: {},
    create: {
      id: "marvel-the-punisher-35",
      seriesId: "marvel-the-punisher",
      number: 35,
      coverDate: new Date("1990-07-01"),
      price: 1.0,
      coverImage: "the-punisher--35.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-36" },
    update: {},
    create: {
      id: "marvel-the-punisher-36",
      seriesId: "marvel-the-punisher",
      number: 36,
      coverDate: new Date("1990-08-01"),
      price: 1.0,
      coverImage: "the-punisher--36.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-37" },
    update: {},
    create: {
      id: "marvel-the-punisher-37",
      seriesId: "marvel-the-punisher",
      number: 37,
      coverDate: new Date("1990-08-01"),
      price: 1.0,
      coverImage: "the-punisher--37.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-38" },
    update: {},
    create: {
      id: "marvel-the-punisher-38",
      seriesId: "marvel-the-punisher",
      number: 38,
      coverDate: new Date("1990-09-01"),
      price: 1.0,
      coverImage: "the-punisher--38.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-39" },
    update: {},
    create: {
      id: "marvel-the-punisher-39",
      seriesId: "marvel-the-punisher",
      number: 39,
      coverDate: new Date("1990-09-01"),
      price: 1.0,
      coverImage: "the-punisher--39.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-40" },
    update: {},
    create: {
      id: "marvel-the-punisher-40",
      seriesId: "marvel-the-punisher",
      number: 40,
      coverDate: new Date("1990-10-01"),
      price: 1.0,
      coverImage: "the-punisher--40.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-41" },
    update: {},
    create: {
      id: "marvel-the-punisher-41",
      seriesId: "marvel-the-punisher",
      number: 41,
      coverDate: new Date("1990-10-01"),
      price: 1.0,
      coverImage: "the-punisher--41.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-42" },
    update: {},
    create: {
      id: "marvel-the-punisher-42",
      seriesId: "marvel-the-punisher",
      number: 42,
      coverDate: null,
      price: null,
      coverImage: "the-punisher--42.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-43" },
    update: {},
    create: {
      id: "marvel-the-punisher-43",
      seriesId: "marvel-the-punisher",
      number: 43,
      coverDate: new Date("1990-12-01"),
      price: 1.0,
      coverImage: "the-punisher--43.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-44" },
    update: {},
    create: {
      id: "marvel-the-punisher-44",
      seriesId: "marvel-the-punisher",
      number: 44,
      coverDate: new Date("1991-01-01"),
      price: 1.0,
      coverImage: "the-punisher--44.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-war-journal-11" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal-11",
      seriesId: "marvel-the-punisher-war-journal",
      number: 11,
      coverDate: null,
      price: null,
      coverImage: "the-punisher-war-journal--11.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-war-journal-4" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal-4",
      seriesId: "marvel-the-punisher-war-journal",
      number: 4,
      coverDate: null,
      price: null,
      coverImage: "the-punisher-war-journal--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-war-journal-5" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal-5",
      seriesId: "marvel-the-punisher-war-journal",
      number: 5,
      coverDate: null,
      price: null,
      coverImage: "the-punisher-war-journal--5.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-war-journal-7" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal-7",
      seriesId: "marvel-the-punisher-war-journal",
      number: 7,
      coverDate: null,
      price: null,
      coverImage: "the-punisher-war-journal--7.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-war-journal-8" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal-8",
      seriesId: "marvel-the-punisher-war-journal",
      number: 8,
      coverDate: null,
      price: null,
      coverImage: "the-punisher-war-journal--8.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-punisher-war-journal-9" },
    update: {},
    create: {
      id: "marvel-the-punisher-war-journal-9",
      seriesId: "marvel-the-punisher-war-journal",
      number: 9,
      coverDate: null,
      price: null,
      coverImage: "the-punisher-war-journal--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-spider-woman-6" },
    update: {},
    create: {
      id: "marvel-the-spider-woman-6",
      seriesId: "marvel-the-spider-woman",
      number: 6,
      coverDate: null,
      price: 0.12,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-10" },
    update: {},
    create: {
      id: "marvel-the-transformers-10",
      seriesId: "marvel-the-transformers",
      number: 10,
      coverDate: new Date("1985-11-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-11" },
    update: {},
    create: {
      id: "marvel-the-transformers-11",
      seriesId: "marvel-the-transformers",
      number: 11,
      coverDate: new Date("1985-12-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-12" },
    update: {},
    create: {
      id: "marvel-the-transformers-12",
      seriesId: "marvel-the-transformers",
      number: 12,
      coverDate: new Date("1986-01-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-20" },
    update: {},
    create: {
      id: "marvel-the-transformers-20",
      seriesId: "marvel-the-transformers",
      number: 20,
      coverDate: new Date("1986-09-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-21" },
    update: {},
    create: {
      id: "marvel-the-transformers-21",
      seriesId: "marvel-the-transformers",
      number: 21,
      coverDate: new Date("1986-10-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-22" },
    update: {},
    create: {
      id: "marvel-the-transformers-22",
      seriesId: "marvel-the-transformers",
      number: 22,
      coverDate: new Date("1986-11-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-23" },
    update: {},
    create: {
      id: "marvel-the-transformers-23",
      seriesId: "marvel-the-transformers",
      number: 23,
      coverDate: new Date("1986-12-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-24" },
    update: {},
    create: {
      id: "marvel-the-transformers-24",
      seriesId: "marvel-the-transformers",
      number: 24,
      coverDate: new Date("1987-01-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-25" },
    update: {},
    create: {
      id: "marvel-the-transformers-25",
      seriesId: "marvel-the-transformers",
      number: 25,
      coverDate: new Date("1987-02-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-26" },
    update: {},
    create: {
      id: "marvel-the-transformers-26",
      seriesId: "marvel-the-transformers",
      number: 26,
      coverDate: new Date("1987-03-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-27" },
    update: {},
    create: {
      id: "marvel-the-transformers-27",
      seriesId: "marvel-the-transformers",
      number: 27,
      coverDate: new Date("1987-04-01"),
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-28" },
    update: {},
    create: {
      id: "marvel-the-transformers-28",
      seriesId: "marvel-the-transformers",
      number: 28,
      coverDate: new Date("1987-05-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-29" },
    update: {},
    create: {
      id: "marvel-the-transformers-29",
      seriesId: "marvel-the-transformers",
      number: 29,
      coverDate: new Date("1987-06-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-head-masters-1" },
    update: {},
    create: {
      id: "marvel-the-transformers-head-masters-1",
      seriesId: "marvel-the-transformers-head-masters",
      number: 1,
      coverDate: new Date("1987-07-01"),
      price: 1.0,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "star-comics-thundercats-10" },
    update: {},
    create: {
      id: "star-comics-thundercats-10",
      seriesId: "star-comics-thundercats",
      number: 10,
      coverDate: null,
      price: 0.75,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-transformers-universe-2" },
    update: {},
    create: {
      id: "marvel-transformers-universe-2",
      seriesId: "marvel-transformers-universe",
      number: 2,
      coverDate: new Date("1987-01-01"),
      price: 1.25,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-transformers-universe-3" },
    update: {},
    create: {
      id: "marvel-transformers-universe-3",
      seriesId: "marvel-transformers-universe",
      number: 3,
      coverDate: new Date("1987-02-01"),
      price: 1.25,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-transformers-universe-4" },
    update: {},
    create: {
      id: "marvel-transformers-universe-4",
      seriesId: "marvel-transformers-universe",
      number: 4,
      coverDate: new Date("1987-03-01"),
      price: 1.25,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "image-wanted-1" },
    update: {},
    create: {
      id: "image-wanted-1",
      seriesId: "image-wanted",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: "wanted--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-1" },
    update: {},
    create: {
      id: "marvel-wolverine-1",
      seriesId: "marvel-wolverine",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: "spider-man-wolverine--1.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-50" },
    update: {},
    create: {
      id: "marvel-wolverine-50",
      seriesId: "marvel-wolverine",
      number: 50,
      coverDate: null,
      price: null,
      coverImage: "wolverine--50.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-52" },
    update: {},
    create: {
      id: "marvel-wolverine-52",
      seriesId: "marvel-wolverine",
      number: 52,
      coverDate: null,
      price: null,
      coverImage: "wolverine--52.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-53" },
    update: {},
    create: {
      id: "marvel-wolverine-53",
      seriesId: "marvel-wolverine",
      number: 53,
      coverDate: null,
      price: null,
      coverImage: "wolverine--53.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-54" },
    update: {},
    create: {
      id: "marvel-wolverine-54",
      seriesId: "marvel-wolverine",
      number: 54,
      coverDate: null,
      price: null,
      coverImage: "wolverine--54.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-55" },
    update: {},
    create: {
      id: "marvel-wolverine-55",
      seriesId: "marvel-wolverine",
      number: 55,
      coverDate: null,
      price: null,
      coverImage: "wolverine--55.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-56" },
    update: {},
    create: {
      id: "marvel-wolverine-56",
      seriesId: "marvel-wolverine",
      number: 56,
      coverDate: null,
      price: null,
      coverImage: "wolverine--56.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-57" },
    update: {},
    create: {
      id: "marvel-wolverine-57",
      seriesId: "marvel-wolverine",
      number: 57,
      coverDate: null,
      price: null,
      coverImage: "wolverine--57.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-58" },
    update: {},
    create: {
      id: "marvel-wolverine-58",
      seriesId: "marvel-wolverine",
      number: 58,
      coverDate: null,
      price: null,
      coverImage: "wolverine--58.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-59" },
    update: {},
    create: {
      id: "marvel-wolverine-59",
      seriesId: "marvel-wolverine",
      number: 59,
      coverDate: null,
      price: null,
      coverImage: "wolverine--59.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-60" },
    update: {},
    create: {
      id: "marvel-wolverine-60",
      seriesId: "marvel-wolverine",
      number: 60,
      coverDate: null,
      price: null,
      coverImage: "wolverine--60.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-61" },
    update: {},
    create: {
      id: "marvel-wolverine-61",
      seriesId: "marvel-wolverine",
      number: 61,
      coverDate: null,
      price: null,
      coverImage: "wolverine--61.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-62" },
    update: {},
    create: {
      id: "marvel-wolverine-62",
      seriesId: "marvel-wolverine",
      number: 62,
      coverDate: null,
      price: null,
      coverImage: "wolverine--62.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-63" },
    update: {},
    create: {
      id: "marvel-wolverine-63",
      seriesId: "marvel-wolverine",
      number: 63,
      coverDate: null,
      price: null,
      coverImage: "wolverine--63.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-64" },
    update: {},
    create: {
      id: "marvel-wolverine-64",
      seriesId: "marvel-wolverine",
      number: 64,
      coverDate: null,
      price: null,
      coverImage: "wolverine--64.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-76" },
    update: {},
    create: {
      id: "marvel-wolverine-76",
      seriesId: "marvel-wolverine",
      number: 76,
      coverDate: null,
      price: null,
      coverImage: "wolverine--76.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-wolverine-77" },
    update: {},
    create: {
      id: "marvel-wolverine-77",
      seriesId: "marvel-wolverine",
      number: 77,
      coverDate: null,
      price: null,
      coverImage: "wolverine--77.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "dc-worlds-finest-comics-303" },
    update: {},
    create: {
      id: "dc-worlds-finest-comics-303",
      seriesId: "dc-worlds-finest-comics",
      number: 303,
      coverDate: new Date("1984-05-01"),
      price: 0.75,
      coverImage: "world-s-finest-comics--303.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-factor-90" },
    update: {},
    create: {
      id: "marvel-x-factor-90",
      seriesId: "marvel-x-factor",
      number: 90,
      coverDate: null,
      price: 1.25,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-1" },
    update: {},
    create: {
      id: "marvel-x-men-1",
      seriesId: "marvel-x-men",
      number: 1,
      coverDate: null,
      price: null,
      coverImage: "x-men--1--img-5510.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-10" },
    update: {},
    create: {
      id: "marvel-x-men-10",
      seriesId: "marvel-x-men",
      number: 10,
      coverDate: null,
      price: null,
      coverImage: "x-men--10.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-11" },
    update: {},
    create: {
      id: "marvel-x-men-11",
      seriesId: "marvel-x-men",
      number: 11,
      coverDate: null,
      price: null,
      coverImage: "x-men--11.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-12" },
    update: {},
    create: {
      id: "marvel-x-men-12",
      seriesId: "marvel-x-men",
      number: 12,
      coverDate: null,
      price: null,
      coverImage: "x-men--12.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-13" },
    update: {},
    create: {
      id: "marvel-x-men-13",
      seriesId: "marvel-x-men",
      number: 13,
      coverDate: null,
      price: null,
      coverImage: "x-men--13.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-14" },
    update: {},
    create: {
      id: "marvel-x-men-14",
      seriesId: "marvel-x-men",
      number: 14,
      coverDate: null,
      price: null,
      coverImage: "x-men--14.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-15" },
    update: {},
    create: {
      id: "marvel-x-men-15",
      seriesId: "marvel-x-men",
      number: 15,
      coverDate: null,
      price: null,
      coverImage: "x-men--15.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-2" },
    update: {},
    create: {
      id: "marvel-x-men-2",
      seriesId: "marvel-x-men",
      number: 2,
      coverDate: null,
      price: null,
      coverImage: "x-men--2.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-25" },
    update: {},
    create: {
      id: "marvel-x-men-25",
      seriesId: "marvel-x-men",
      number: 25,
      coverDate: null,
      price: null,
      coverImage: "x-men--25.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-26" },
    update: {},
    create: {
      id: "marvel-x-men-26",
      seriesId: "marvel-x-men",
      number: 26,
      coverDate: null,
      price: null,
      coverImage: "x-men--26.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-27" },
    update: {},
    create: {
      id: "marvel-x-men-27",
      seriesId: "marvel-x-men",
      number: 27,
      coverDate: null,
      price: null,
      coverImage: "x-men--27.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-28" },
    update: {},
    create: {
      id: "marvel-x-men-28",
      seriesId: "marvel-x-men",
      number: 28,
      coverDate: null,
      price: null,
      coverImage: "x-men--28.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-3" },
    update: {},
    create: {
      id: "marvel-x-men-3",
      seriesId: "marvel-x-men",
      number: 3,
      coverDate: null,
      price: null,
      coverImage: "x-men--3.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-4" },
    update: {},
    create: {
      id: "marvel-x-men-4",
      seriesId: "marvel-x-men",
      number: 4,
      coverDate: null,
      price: null,
      coverImage: "x-men--4.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-5" },
    update: {},
    create: {
      id: "marvel-x-men-5",
      seriesId: "marvel-x-men",
      number: 5,
      coverDate: null,
      price: null,
      coverImage: "x-men--5--img-5516.jpeg-.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-6" },
    update: {},
    create: {
      id: "marvel-x-men-6",
      seriesId: "marvel-x-men",
      number: 6,
      coverDate: null,
      price: null,
      coverImage: "x-men--6.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-7" },
    update: {},
    create: {
      id: "marvel-x-men-7",
      seriesId: "marvel-x-men",
      number: 7,
      coverDate: null,
      price: null,
      coverImage: "x-men--7.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-8" },
    update: {},
    create: {
      id: "marvel-x-men-8",
      seriesId: "marvel-x-men",
      number: 8,
      coverDate: null,
      price: null,
      coverImage: "x-men--8.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-x-men-9" },
    update: {},
    create: {
      id: "marvel-x-men-9",
      seriesId: "marvel-x-men",
      number: 9,
      coverDate: null,
      price: null,
      coverImage: "x-men--9.jpeg",
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-1" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-1",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 1,
      coverDate: new Date("1986-12-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-2" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-2",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 2,
      coverDate: new Date("1987-02-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-3" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-3",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 3,
      coverDate: new Date("1987-04-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-4" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-4",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 4,
      coverDate: new Date("1987-06-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-5" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-5",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 5,
      coverDate: new Date("1987-08-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-6" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-6",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 6,
      coverDate: new Date("1987-10-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-9" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-9",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 9,
      coverDate: new Date("1988-04-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-10" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-10",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 10,
      coverDate: new Date("1988-06-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-11" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-11",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 11,
      coverDate: new Date("1988-08-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-gi-joe-comics-magazine-12" },
    update: {},
    create: {
      id: "marvel-gi-joe-comics-magazine-12",
      seriesId: "marvel-gi-joe-comics-magazine",
      number: 12,
      coverDate: new Date("1988-10-01"),
      price: null,
      coverImage: null,
    },
  });
  await prisma.issue.upsert({
    where: { id: "marvel-the-transformers-comics-magazine-1" },
    update: {},
    create: {
      id: "marvel-the-transformers-comics-magazine-1",
      seriesId: "marvel-the-transformers-comics-magazine",
      number: 1,
      coverDate: new Date("1987-01-01"),
      price: null,
      coverImage: null,
    },
  });

  // Creators
  await prisma.creator.upsert({
    where: { id: "garth-ennis" },
    update: {},
    create: { id: "garth-ennis", name: "Garth Ennis" },
  });
  await prisma.creator.upsert({
    where: { id: "jacen-burrows" },
    update: {},
    create: { id: "jacen-burrows", name: "Jacen Burrows" },
  });
  await prisma.creator.upsert({
    where: { id: "jim-starlin" },
    update: {},
    create: { id: "jim-starlin", name: "Jim Starlin" },
  });
  await prisma.creator.upsert({
    where: { id: "jim-aparo" },
    update: {},
    create: { id: "jim-aparo", name: "Jim Aparo" },
  });
  await prisma.creator.upsert({
    where: { id: "grant-morrison" },
    update: {},
    create: { id: "grant-morrison", name: "Grant Morrison" },
  });
  await prisma.creator.upsert({
    where: { id: "frank-quitely" },
    update: {},
    create: { id: "frank-quitely", name: "Frank Quitely" },
  });
  await prisma.creator.upsert({
    where: { id: "alan-grant" },
    update: {},
    create: { id: "alan-grant", name: "Alan Grant" },
  });
  await prisma.creator.upsert({
    where: { id: "jim-fern" },
    update: {},
    create: { id: "jim-fern", name: "Jim Fern" },
  });
  await prisma.creator.upsert({
    where: { id: "bury" },
    update: {},
    create: { id: "bury", name: "Bury" },
  });
  await prisma.creator.upsert({
    where: { id: "norton" },
    update: {},
    create: { id: "norton", name: "Norton" },
  });
  await prisma.creator.upsert({
    where: { id: "mark-evanier" },
    update: {},
    create: { id: "mark-evanier", name: "Mark Evanier" },
  });
  await prisma.creator.upsert({
    where: { id: "dan-spiegle" },
    update: {},
    create: { id: "dan-spiegle", name: "Dan Spiegle" },
  });
  await prisma.creator.upsert({
    where: { id: "j-scott-campbell" },
    update: {},
    create: { id: "j-scott-campbell", name: "J. Scott Campbell" },
  });
  await prisma.creator.upsert({
    where: { id: "sergio-aragones" },
    update: {},
    create: { id: "sergio-aragones", name: "Sergio Aragones" },
  });
  await prisma.creator.upsert({
    where: { id: "jock-any-dingle" },
    update: {},
    create: { id: "jock-any-dingle", name: "Jock & Any Dingle" },
  });
  await prisma.creator.upsert({
    where: { id: "clem-robins" },
    update: {},
    create: { id: "clem-robins", name: "Clem Robins" },
  });
  await prisma.creator.upsert({
    where: { id: "alan-kupperberg" },
    update: {},
    create: { id: "alan-kupperberg", name: "Alan Kupperberg" },
  });
  await prisma.creator.upsert({
    where: { id: "peter-david" },
    update: {},
    create: { id: "peter-david", name: "Peter David" },
  });
  await prisma.creator.upsert({
    where: { id: "gray-morrow" },
    update: {},
    create: { id: "gray-morrow", name: "Gray Morrow" },
  });
  await prisma.creator.upsert({
    where: { id: "larry-hama" },
    update: {},
    create: { id: "larry-hama", name: "Larry Hama" },
  });
  await prisma.creator.upsert({
    where: { id: "ron-wagner" },
    update: {},
    create: { id: "ron-wagner", name: "Ron Wagner" },
  });
  await prisma.creator.upsert({
    where: { id: "steve-englehart" },
    update: {},
    create: { id: "steve-englehart", name: "Steve Englehart" },
  });
  await prisma.creator.upsert({
    where: { id: "marshall-rogers" },
    update: {},
    create: { id: "marshall-rogers", name: "Marshall Rogers" },
  });
  await prisma.creator.upsert({
    where: { id: "winslow-mortimer" },
    update: {},
    create: { id: "winslow-mortimer", name: "Winslow Mortimer" },
  });
  await prisma.creator.upsert({
    where: { id: "depatie" },
    update: {},
    create: { id: "depatie", name: "Depatie" },
  });
  await prisma.creator.upsert({
    where: { id: "freleng" },
    update: {},
    create: { id: "freleng", name: "Freleng" },
  });
  await prisma.creator.upsert({
    where: { id: "mike-baron" },
    update: {},
    create: { id: "mike-baron", name: "Mike Baron" },
  });
  await prisma.creator.upsert({
    where: { id: "bill-reinhold" },
    update: {},
    create: { id: "bill-reinhold", name: "Bill Reinhold" },
  });
  await prisma.creator.upsert({
    where: { id: "bob-budiansky" },
    update: {},
    create: { id: "bob-budiansky", name: "Bob Budiansky" },
  });
  await prisma.creator.upsert({
    where: { id: "ricardo-villamonte" },
    update: {},
    create: { id: "ricardo-villamonte", name: "Ricardo Villamonte" },
  });
  await prisma.creator.upsert({
    where: { id: "herb-trimpe" },
    update: {},
    create: { id: "herb-trimpe", name: "Herb Trimpe" },
  });
  await prisma.creator.upsert({
    where: { id: "don-perlin" },
    update: {},
    create: { id: "don-perlin", name: "Don Perlin" },
  });
  await prisma.creator.upsert({
    where: { id: "frank-springer" },
    update: {},
    create: { id: "frank-springer", name: "Frank Springer" },
  });
  await prisma.creator.upsert({
    where: { id: "david-kraft" },
    update: {},
    create: { id: "david-kraft", name: "David Kraft" },
  });
  await prisma.creator.upsert({
    where: { id: "mike-chen" },
    update: {},
    create: { id: "mike-chen", name: "Mike Chen" },
  });

  // Credits
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-1-garth-ennis-writer" },
    update: {},
    create: {
      id: "avatar-303-1-garth-ennis-writer",
      issueId: "avatar-303-1",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-1-jacen-burrows-artist" },
    update: {},
    create: {
      id: "avatar-303-1-jacen-burrows-artist",
      issueId: "avatar-303-1",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-2-garth-ennis-writer" },
    update: {},
    create: {
      id: "avatar-303-2-garth-ennis-writer",
      issueId: "avatar-303-2",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-2-jacen-burrows-artist" },
    update: {},
    create: {
      id: "avatar-303-2-jacen-burrows-artist",
      issueId: "avatar-303-2",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-3-garth-ennis-writer" },
    update: {},
    create: {
      id: "avatar-303-3-garth-ennis-writer",
      issueId: "avatar-303-3",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-3-jacen-burrows-artist" },
    update: {},
    create: {
      id: "avatar-303-3-jacen-burrows-artist",
      issueId: "avatar-303-3",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-4-garth-ennis-writer" },
    update: {},
    create: {
      id: "avatar-303-4-garth-ennis-writer",
      issueId: "avatar-303-4",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-4-jacen-burrows-artist" },
    update: {},
    create: {
      id: "avatar-303-4-jacen-burrows-artist",
      issueId: "avatar-303-4",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-5-garth-ennis-writer" },
    update: {},
    create: {
      id: "avatar-303-5-garth-ennis-writer",
      issueId: "avatar-303-5",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "avatar-303-5-jacen-burrows-artist" },
    update: {},
    create: {
      id: "avatar-303-5-jacen-burrows-artist",
      issueId: "avatar-303-5",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-a-death-in-the-family-unknown-322c614f-jim-starlin-writer" },
    update: {},
    create: {
      id: "dc-batman-a-death-in-the-family-unknown-322c614f-jim-starlin-writer",
      issueId: "dc-batman-a-death-in-the-family-unknown-322c614f",
      creatorId: "jim-starlin",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-a-death-in-the-family-unknown-322c614f-jim-aparo-artist" },
    update: {},
    create: {
      id: "dc-batman-a-death-in-the-family-unknown-322c614f-jim-aparo-artist",
      issueId: "dc-batman-a-death-in-the-family-unknown-322c614f",
      creatorId: "jim-aparo",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-and-robin-1-grant-morrison-writer" },
    update: {},
    create: {
      id: "dc-batman-and-robin-1-grant-morrison-writer",
      issueId: "dc-batman-and-robin-1",
      creatorId: "grant-morrison",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-and-robin-1-frank-quitely-artist" },
    update: {},
    create: {
      id: "dc-batman-and-robin-1-frank-quitely-artist",
      issueId: "dc-batman-and-robin-1",
      creatorId: "frank-quitely",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-and-robin-2-grant-morrison-writer" },
    update: {},
    create: {
      id: "dc-batman-and-robin-2-grant-morrison-writer",
      issueId: "dc-batman-and-robin-2",
      creatorId: "grant-morrison",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-and-robin-2-frank-quitely-artist" },
    update: {},
    create: {
      id: "dc-batman-and-robin-2-frank-quitely-artist",
      issueId: "dc-batman-and-robin-2",
      creatorId: "frank-quitely",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-annual-15-alan-grant-writer" },
    update: {},
    create: {
      id: "dc-batman-annual-15-alan-grant-writer",
      issueId: "dc-batman-annual-15",
      creatorId: "alan-grant",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-batman-annual-15-jim-fern-artist" },
    update: {},
    create: {
      id: "dc-batman-annual-15-jim-fern-artist",
      issueId: "dc-batman-annual-15",
      creatorId: "jim-fern",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-black-ops-3-bury-writer" },
    update: {},
    create: {
      id: "image-black-ops-3-bury-writer",
      issueId: "image-black-ops-3",
      creatorId: "bury",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-black-ops-3-norton-artist" },
    update: {},
    create: {
      id: "image-black-ops-3-norton-artist",
      issueId: "image-black-ops-3",
      creatorId: "norton",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-253-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-253-mark-evanier-writer",
      issueId: "dc-blackhawk-253",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-253-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-253-dan-spiegle-artist",
      issueId: "dc-blackhawk-253",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-255-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-255-mark-evanier-writer",
      issueId: "dc-blackhawk-255",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-255-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-255-dan-spiegle-artist",
      issueId: "dc-blackhawk-255",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-259-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-259-mark-evanier-writer",
      issueId: "dc-blackhawk-259",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-259-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-259-dan-spiegle-artist",
      issueId: "dc-blackhawk-259",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-262-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-262-mark-evanier-writer",
      issueId: "dc-blackhawk-262",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-262-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-262-dan-spiegle-artist",
      issueId: "dc-blackhawk-262",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-263-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-263-mark-evanier-writer",
      issueId: "dc-blackhawk-263",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-263-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-263-dan-spiegle-artist",
      issueId: "dc-blackhawk-263",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-265-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-265-mark-evanier-writer",
      issueId: "dc-blackhawk-265",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-265-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-265-dan-spiegle-artist",
      issueId: "dc-blackhawk-265",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-266-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-266-mark-evanier-writer",
      issueId: "dc-blackhawk-266",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-266-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-266-dan-spiegle-artist",
      issueId: "dc-blackhawk-266",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-267-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-267-mark-evanier-writer",
      issueId: "dc-blackhawk-267",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-267-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-267-dan-spiegle-artist",
      issueId: "dc-blackhawk-267",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-268-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-268-mark-evanier-writer",
      issueId: "dc-blackhawk-268",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-268-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-268-dan-spiegle-artist",
      issueId: "dc-blackhawk-268",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-269-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-269-mark-evanier-writer",
      issueId: "dc-blackhawk-269",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-269-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-269-dan-spiegle-artist",
      issueId: "dc-blackhawk-269",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-270-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-270-mark-evanier-writer",
      issueId: "dc-blackhawk-270",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-270-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-270-dan-spiegle-artist",
      issueId: "dc-blackhawk-270",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-271-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-271-mark-evanier-writer",
      issueId: "dc-blackhawk-271",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-271-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-271-dan-spiegle-artist",
      issueId: "dc-blackhawk-271",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-272-mark-evanier-writer" },
    update: {},
    create: {
      id: "dc-blackhawk-272-mark-evanier-writer",
      issueId: "dc-blackhawk-272",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-blackhawk-272-dan-spiegle-artist" },
    update: {},
    create: {
      id: "dc-blackhawk-272-dan-spiegle-artist",
      issueId: "dc-blackhawk-272",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-0-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-0-j-scott-campbell-writer",
      issueId: "image-danger-girl-0",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-0-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-0-j-scott-campbell-artist",
      issueId: "image-danger-girl-0",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-1-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-1-j-scott-campbell-writer",
      issueId: "image-danger-girl-1",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-1-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-1-j-scott-campbell-artist",
      issueId: "image-danger-girl-1",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-2-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-2-j-scott-campbell-writer",
      issueId: "image-danger-girl-2",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-2-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-2-j-scott-campbell-artist",
      issueId: "image-danger-girl-2",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-3-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-3-j-scott-campbell-writer",
      issueId: "image-danger-girl-3",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-3-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-3-j-scott-campbell-artist",
      issueId: "image-danger-girl-3",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-4-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-4-j-scott-campbell-writer",
      issueId: "image-danger-girl-4",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-4-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-4-j-scott-campbell-artist",
      issueId: "image-danger-girl-4",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-5-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-5-j-scott-campbell-writer",
      issueId: "image-danger-girl-5",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-5-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-5-j-scott-campbell-artist",
      issueId: "image-danger-girl-5",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-6-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-6-j-scott-campbell-writer",
      issueId: "image-danger-girl-6",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-6-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-6-j-scott-campbell-artist",
      issueId: "image-danger-girl-6",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-7-j-scott-campbell-writer" },
    update: {},
    create: {
      id: "image-danger-girl-7-j-scott-campbell-writer",
      issueId: "image-danger-girl-7",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "image-danger-girl-7-j-scott-campbell-artist" },
    update: {},
    create: {
      id: "image-danger-girl-7-j-scott-campbell-artist",
      issueId: "image-danger-girl-7",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-18-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-18-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-18",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-18-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-18-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-18",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-19-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-19-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-19",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-19-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-19-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-19",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-21-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-21-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-21",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-21-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-21-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-21",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-22-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-22-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-22",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-22-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-22-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-22",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-23-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-23-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-23",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-23-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-23-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-23",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-26-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-26-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-26",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-26-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-26-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-26",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-27-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-27-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-27",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-27-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-27-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-27",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-28-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-28-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-28",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-28-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-28-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-28",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-29-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-29-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-29",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-29-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-29-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-29",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-30-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-30-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-30",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-30-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-30-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-30",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-31-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-31-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-31",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-31-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-31-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-31",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-32-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-32-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-32",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-32-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-32-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-32",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-33-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-33-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-33",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-33-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-33-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-33",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-39-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-39-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-39",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-39-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-39-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-39",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-40-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-40-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-40",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-40-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-40-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-40",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-48-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-48-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-48",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-48-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-48-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-48",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-50-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-50-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-50",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-50-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-50-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-50",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-52-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-52-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-52",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-52-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-52-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-52",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-53-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-53-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-53",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-53-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-53-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-53",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-54-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-54-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-54",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-54-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-54-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-54",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-55-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-55-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-55",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-55-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-55-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-55",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-57-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-57-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-57",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-57-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-57-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-57",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-58-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-58-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-58",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-58-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-58-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-58",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-59-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-59-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-59",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-59-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-59-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-59",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-60-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-60-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-60",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-60-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-60-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-60",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-61-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-61-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-61",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-61-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-61-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-61",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-62-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-62-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-62",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-62-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-62-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-62",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-63-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-63-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-63",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-63-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-63-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-63",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-64-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-64-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-64",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-64-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-64-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-64",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-65-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-65-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-65",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-65-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-65-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-65",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-66-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-66-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-66",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-66-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-66-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-66",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-67-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-67-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-67",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-67-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-67-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-67",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-68-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-68-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-68",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-68-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-68-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-68",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-69-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-69-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-69",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-69-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-69-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-69",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-70-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-70-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-70",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-70-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-70-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-70",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-71-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-71-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-71",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-71-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-71-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-71",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-72-sergio-aragones-writer" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-72-sergio-aragones-writer",
      issueId: "marvel-groo-the-wanderer-72",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-groo-the-wanderer-72-sergio-aragones-artist" },
    update: {},
    create: {
      id: "marvel-groo-the-wanderer-72-sergio-aragones-artist",
      issueId: "marvel-groo-the-wanderer-72",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-1-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-1-jock-any-dingle-writer",
      issueId: "vertigo-losers-1",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-1-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-1-clem-robins-artist",
      issueId: "vertigo-losers-1",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-10-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-10-jock-any-dingle-writer",
      issueId: "vertigo-losers-10",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-10-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-10-clem-robins-artist",
      issueId: "vertigo-losers-10",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-11-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-11-jock-any-dingle-writer",
      issueId: "vertigo-losers-11",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-11-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-11-clem-robins-artist",
      issueId: "vertigo-losers-11",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-12-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-12-jock-any-dingle-writer",
      issueId: "vertigo-losers-12",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-12-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-12-clem-robins-artist",
      issueId: "vertigo-losers-12",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-13-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-13-jock-any-dingle-writer",
      issueId: "vertigo-losers-13",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-13-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-13-clem-robins-artist",
      issueId: "vertigo-losers-13",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-14-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-14-jock-any-dingle-writer",
      issueId: "vertigo-losers-14",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-14-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-14-clem-robins-artist",
      issueId: "vertigo-losers-14",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-15-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-15-jock-any-dingle-writer",
      issueId: "vertigo-losers-15",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-15-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-15-clem-robins-artist",
      issueId: "vertigo-losers-15",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-16-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-16-jock-any-dingle-writer",
      issueId: "vertigo-losers-16",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-16-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-16-clem-robins-artist",
      issueId: "vertigo-losers-16",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-17-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-17-jock-any-dingle-writer",
      issueId: "vertigo-losers-17",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-17-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-17-clem-robins-artist",
      issueId: "vertigo-losers-17",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-18-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-18-jock-any-dingle-writer",
      issueId: "vertigo-losers-18",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-18-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-18-clem-robins-artist",
      issueId: "vertigo-losers-18",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-19-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-19-jock-any-dingle-writer",
      issueId: "vertigo-losers-19",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-19-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-19-clem-robins-artist",
      issueId: "vertigo-losers-19",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-2-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-2-jock-any-dingle-writer",
      issueId: "vertigo-losers-2",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-2-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-2-clem-robins-artist",
      issueId: "vertigo-losers-2",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-20-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-20-jock-any-dingle-writer",
      issueId: "vertigo-losers-20",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-20-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-20-clem-robins-artist",
      issueId: "vertigo-losers-20",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-21-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-21-jock-any-dingle-writer",
      issueId: "vertigo-losers-21",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-21-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-21-clem-robins-artist",
      issueId: "vertigo-losers-21",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-22-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-22-jock-any-dingle-writer",
      issueId: "vertigo-losers-22",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-22-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-22-clem-robins-artist",
      issueId: "vertigo-losers-22",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-23-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-23-jock-any-dingle-writer",
      issueId: "vertigo-losers-23",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-23-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-23-clem-robins-artist",
      issueId: "vertigo-losers-23",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-24-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-24-jock-any-dingle-writer",
      issueId: "vertigo-losers-24",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-24-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-24-clem-robins-artist",
      issueId: "vertigo-losers-24",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-25-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-25-jock-any-dingle-writer",
      issueId: "vertigo-losers-25",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-25-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-25-clem-robins-artist",
      issueId: "vertigo-losers-25",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-26-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-26-jock-any-dingle-writer",
      issueId: "vertigo-losers-26",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-26-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-26-clem-robins-artist",
      issueId: "vertigo-losers-26",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-27-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-27-jock-any-dingle-writer",
      issueId: "vertigo-losers-27",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-27-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-27-clem-robins-artist",
      issueId: "vertigo-losers-27",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-28-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-28-jock-any-dingle-writer",
      issueId: "vertigo-losers-28",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-28-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-28-clem-robins-artist",
      issueId: "vertigo-losers-28",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-29-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-29-jock-any-dingle-writer",
      issueId: "vertigo-losers-29",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-29-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-29-clem-robins-artist",
      issueId: "vertigo-losers-29",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-3-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-3-jock-any-dingle-writer",
      issueId: "vertigo-losers-3",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-3-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-3-clem-robins-artist",
      issueId: "vertigo-losers-3",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-30-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-30-jock-any-dingle-writer",
      issueId: "vertigo-losers-30",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-30-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-30-clem-robins-artist",
      issueId: "vertigo-losers-30",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-31-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-31-jock-any-dingle-writer",
      issueId: "vertigo-losers-31",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-31-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-31-clem-robins-artist",
      issueId: "vertigo-losers-31",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-32-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-32-jock-any-dingle-writer",
      issueId: "vertigo-losers-32",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-32-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-32-clem-robins-artist",
      issueId: "vertigo-losers-32",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-4-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-4-jock-any-dingle-writer",
      issueId: "vertigo-losers-4",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-4-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-4-clem-robins-artist",
      issueId: "vertigo-losers-4",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-5-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-5-jock-any-dingle-writer",
      issueId: "vertigo-losers-5",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-5-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-5-clem-robins-artist",
      issueId: "vertigo-losers-5",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-6-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-6-jock-any-dingle-writer",
      issueId: "vertigo-losers-6",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-6-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-6-clem-robins-artist",
      issueId: "vertigo-losers-6",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-7-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-7-jock-any-dingle-writer",
      issueId: "vertigo-losers-7",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-7-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-7-clem-robins-artist",
      issueId: "vertigo-losers-7",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-8-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-8-jock-any-dingle-writer",
      issueId: "vertigo-losers-8",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-8-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-8-clem-robins-artist",
      issueId: "vertigo-losers-8",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-9-jock-any-dingle-writer" },
    update: {},
    create: {
      id: "vertigo-losers-9-jock-any-dingle-writer",
      issueId: "vertigo-losers-9",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "vertigo-losers-9-clem-robins-artist" },
    update: {},
    create: {
      id: "vertigo-losers-9-clem-robins-artist",
      issueId: "vertigo-losers-9",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-marvel-team-up-96-alan-kupperberg-writer" },
    update: {},
    create: {
      id: "marvel-marvel-team-up-96-alan-kupperberg-writer",
      issueId: "marvel-marvel-team-up-96",
      creatorId: "alan-kupperberg",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-marvel-team-up-96-alan-kupperberg-artist" },
    update: {},
    create: {
      id: "marvel-marvel-team-up-96-alan-kupperberg-artist",
      issueId: "marvel-marvel-team-up-96",
      creatorId: "alan-kupperberg",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-merc-1-peter-david-writer" },
    update: {},
    create: {
      id: "marvel-merc-1-peter-david-writer",
      issueId: "marvel-merc-1",
      creatorId: "peter-david",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-merc-1-gray-morrow-artist" },
    update: {},
    create: {
      id: "marvel-merc-1-gray-morrow-artist",
      issueId: "marvel-merc-1",
      creatorId: "gray-morrow",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-merc-4-peter-david-writer" },
    update: {},
    create: {
      id: "marvel-merc-4-peter-david-writer",
      issueId: "marvel-merc-4",
      creatorId: "peter-david",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-merc-4-gray-morrow-artist" },
    update: {},
    create: {
      id: "marvel-merc-4-gray-morrow-artist",
      issueId: "marvel-merc-4",
      creatorId: "gray-morrow",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-1-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-1-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-1",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-1-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-1-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-1",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-10-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-10-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-10",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-10-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-10-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-10",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-11-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-11-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-11",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-11-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-11-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-11",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-12-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-12-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-12",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-12-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-12-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-12",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-13-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-13-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-13",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-13-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-13-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-13",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-14-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-14-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-14",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-14-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-14-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-14",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-15-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-15-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-15",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-15-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-15-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-15",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-16-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-16-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-16",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-16-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-16-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-16",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-2-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-2-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-2",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-2-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-2-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-2",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-3-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-3-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-3",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-3-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-3-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-3",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-4-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-4-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-4",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-4-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-4-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-4",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-5-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-5-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-5",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-5-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-5-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-5",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-6-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-6-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-6",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-6-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-6-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-6",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-7-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-7-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-7",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-7-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-7-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-7",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-8-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-8-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-8",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-8-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-8-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-8",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-9-larry-hama-writer" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-9-larry-hama-writer",
      issueId: "marvel-nth-man-the-ultimate-ninja-9",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-nth-man-the-ultimate-ninja-9-ron-wagner-artist" },
    update: {},
    create: {
      id: "marvel-nth-man-the-ultimate-ninja-9-ron-wagner-artist",
      issueId: "marvel-nth-man-the-ultimate-ninja-9",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-silver-surfer-9-steve-englehart-writer" },
    update: {},
    create: {
      id: "marvel-silver-surfer-9-steve-englehart-writer",
      issueId: "marvel-silver-surfer-9",
      creatorId: "steve-englehart",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-silver-surfer-9-marshall-rogers-artist" },
    update: {},
    create: {
      id: "marvel-silver-surfer-9-marshall-rogers-artist",
      issueId: "marvel-silver-surfer-9",
      creatorId: "marshall-rogers",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-spidey-super-stories-44-alan-kupperberg-writer" },
    update: {},
    create: {
      id: "marvel-spidey-super-stories-44-alan-kupperberg-writer",
      issueId: "marvel-spidey-super-stories-44",
      creatorId: "alan-kupperberg",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-spidey-super-stories-44-winslow-mortimer-artist" },
    update: {},
    create: {
      id: "marvel-spidey-super-stories-44-winslow-mortimer-artist",
      issueId: "marvel-spidey-super-stories-44",
      creatorId: "winslow-mortimer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "epic-the-groo-chronicles-2-sergio-aragones-writer" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles-2-sergio-aragones-writer",
      issueId: "epic-the-groo-chronicles-2",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "epic-the-groo-chronicles-2-sergio-aragones-artist" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles-2-sergio-aragones-artist",
      issueId: "epic-the-groo-chronicles-2",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "epic-the-groo-chronicles-5-sergio-aragones-writer" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles-5-sergio-aragones-writer",
      issueId: "epic-the-groo-chronicles-5",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "epic-the-groo-chronicles-5-sergio-aragones-artist" },
    update: {},
    create: {
      id: "epic-the-groo-chronicles-5-sergio-aragones-artist",
      issueId: "epic-the-groo-chronicles-5",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "gold-key-the-pink-panther-68-depatie-writer" },
    update: {},
    create: {
      id: "gold-key-the-pink-panther-68-depatie-writer",
      issueId: "gold-key-the-pink-panther-68",
      creatorId: "depatie",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "gold-key-the-pink-panther-68-freleng-artist" },
    update: {},
    create: {
      id: "gold-key-the-pink-panther-68-freleng-artist",
      issueId: "gold-key-the-pink-panther-68",
      creatorId: "freleng",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-30-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-30-mike-baron-writer",
      issueId: "marvel-the-punisher-30",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-30-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-30-bill-reinhold-artist",
      issueId: "marvel-the-punisher-30",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-31-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-31-mike-baron-writer",
      issueId: "marvel-the-punisher-31",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-31-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-31-bill-reinhold-artist",
      issueId: "marvel-the-punisher-31",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-32-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-32-mike-baron-writer",
      issueId: "marvel-the-punisher-32",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-32-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-32-bill-reinhold-artist",
      issueId: "marvel-the-punisher-32",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-33-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-33-mike-baron-writer",
      issueId: "marvel-the-punisher-33",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-33-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-33-bill-reinhold-artist",
      issueId: "marvel-the-punisher-33",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-34-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-34-mike-baron-writer",
      issueId: "marvel-the-punisher-34",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-34-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-34-bill-reinhold-artist",
      issueId: "marvel-the-punisher-34",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-35-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-35-mike-baron-writer",
      issueId: "marvel-the-punisher-35",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-35-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-35-bill-reinhold-artist",
      issueId: "marvel-the-punisher-35",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-36-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-36-mike-baron-writer",
      issueId: "marvel-the-punisher-36",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-36-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-36-bill-reinhold-artist",
      issueId: "marvel-the-punisher-36",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-37-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-37-mike-baron-writer",
      issueId: "marvel-the-punisher-37",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-37-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-37-bill-reinhold-artist",
      issueId: "marvel-the-punisher-37",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-38-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-38-mike-baron-writer",
      issueId: "marvel-the-punisher-38",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-38-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-38-bill-reinhold-artist",
      issueId: "marvel-the-punisher-38",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-39-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-39-mike-baron-writer",
      issueId: "marvel-the-punisher-39",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-39-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-39-bill-reinhold-artist",
      issueId: "marvel-the-punisher-39",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-40-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-40-mike-baron-writer",
      issueId: "marvel-the-punisher-40",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-40-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-40-bill-reinhold-artist",
      issueId: "marvel-the-punisher-40",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-41-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-41-mike-baron-writer",
      issueId: "marvel-the-punisher-41",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-41-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-41-bill-reinhold-artist",
      issueId: "marvel-the-punisher-41",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-43-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-43-mike-baron-writer",
      issueId: "marvel-the-punisher-43",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-43-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-43-bill-reinhold-artist",
      issueId: "marvel-the-punisher-43",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-44-mike-baron-writer" },
    update: {},
    create: {
      id: "marvel-the-punisher-44-mike-baron-writer",
      issueId: "marvel-the-punisher-44",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-punisher-44-bill-reinhold-artist" },
    update: {},
    create: {
      id: "marvel-the-punisher-44-bill-reinhold-artist",
      issueId: "marvel-the-punisher-44",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-10-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-10-bob-budiansky-writer",
      issueId: "marvel-the-transformers-10",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-10-ricardo-villamonte-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-10-ricardo-villamonte-artist",
      issueId: "marvel-the-transformers-10",
      creatorId: "ricardo-villamonte",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-11-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-11-bob-budiansky-writer",
      issueId: "marvel-the-transformers-11",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-11-ricardo-villamonte-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-11-ricardo-villamonte-artist",
      issueId: "marvel-the-transformers-11",
      creatorId: "ricardo-villamonte",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-12-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-12-bob-budiansky-writer",
      issueId: "marvel-the-transformers-12",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-12-ricardo-villamonte-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-12-ricardo-villamonte-artist",
      issueId: "marvel-the-transformers-12",
      creatorId: "ricardo-villamonte",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-20-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-20-bob-budiansky-writer",
      issueId: "marvel-the-transformers-20",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-20-herb-trimpe-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-20-herb-trimpe-artist",
      issueId: "marvel-the-transformers-20",
      creatorId: "herb-trimpe",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-21-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-21-bob-budiansky-writer",
      issueId: "marvel-the-transformers-21",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-21-herb-trimpe-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-21-herb-trimpe-artist",
      issueId: "marvel-the-transformers-21",
      creatorId: "herb-trimpe",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-22-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-22-bob-budiansky-writer",
      issueId: "marvel-the-transformers-22",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-22-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-22-don-perlin-artist",
      issueId: "marvel-the-transformers-22",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-23-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-23-bob-budiansky-writer",
      issueId: "marvel-the-transformers-23",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-23-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-23-don-perlin-artist",
      issueId: "marvel-the-transformers-23",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-24-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-24-bob-budiansky-writer",
      issueId: "marvel-the-transformers-24",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-24-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-24-don-perlin-artist",
      issueId: "marvel-the-transformers-24",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-25-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-25-bob-budiansky-writer",
      issueId: "marvel-the-transformers-25",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-25-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-25-don-perlin-artist",
      issueId: "marvel-the-transformers-25",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-26-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-26-bob-budiansky-writer",
      issueId: "marvel-the-transformers-26",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-26-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-26-don-perlin-artist",
      issueId: "marvel-the-transformers-26",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-27-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-27-bob-budiansky-writer",
      issueId: "marvel-the-transformers-27",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-27-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-27-don-perlin-artist",
      issueId: "marvel-the-transformers-27",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-28-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-28-bob-budiansky-writer",
      issueId: "marvel-the-transformers-28",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-28-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-28-don-perlin-artist",
      issueId: "marvel-the-transformers-28",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-29-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-29-bob-budiansky-writer",
      issueId: "marvel-the-transformers-29",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-29-don-perlin-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-29-don-perlin-artist",
      issueId: "marvel-the-transformers-29",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-head-masters-1-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-the-transformers-head-masters-1-bob-budiansky-writer",
      issueId: "marvel-the-transformers-head-masters-1",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-the-transformers-head-masters-1-frank-springer-artist" },
    update: {},
    create: {
      id: "marvel-the-transformers-head-masters-1-frank-springer-artist",
      issueId: "marvel-the-transformers-head-masters-1",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-transformers-universe-2-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-transformers-universe-2-bob-budiansky-writer",
      issueId: "marvel-transformers-universe-2",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-transformers-universe-2-frank-springer-artist" },
    update: {},
    create: {
      id: "marvel-transformers-universe-2-frank-springer-artist",
      issueId: "marvel-transformers-universe-2",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-transformers-universe-3-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-transformers-universe-3-bob-budiansky-writer",
      issueId: "marvel-transformers-universe-3",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-transformers-universe-3-frank-springer-artist" },
    update: {},
    create: {
      id: "marvel-transformers-universe-3-frank-springer-artist",
      issueId: "marvel-transformers-universe-3",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-transformers-universe-4-bob-budiansky-writer" },
    update: {},
    create: {
      id: "marvel-transformers-universe-4-bob-budiansky-writer",
      issueId: "marvel-transformers-universe-4",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "marvel-transformers-universe-4-frank-springer-artist" },
    update: {},
    create: {
      id: "marvel-transformers-universe-4-frank-springer-artist",
      issueId: "marvel-transformers-universe-4",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-worlds-finest-comics-303-david-kraft-writer" },
    update: {},
    create: {
      id: "dc-worlds-finest-comics-303-david-kraft-writer",
      issueId: "dc-worlds-finest-comics-303",
      creatorId: "david-kraft",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.upsert({
    where: { id: "dc-worlds-finest-comics-303-mike-chen-artist" },
    update: {},
    create: {
      id: "dc-worlds-finest-comics-303-mike-chen-artist",
      issueId: "dc-worlds-finest-comics-303",
      creatorId: "mike-chen",
      role: 'ARTIST',
    },
  });
}

main()
  .then(() => { console.log('Seed complete'); })
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); process.exit(0); })
