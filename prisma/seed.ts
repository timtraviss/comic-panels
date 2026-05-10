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
    where: { id: "dc-batman-a-death-in-the-family-unknown-29db4e86" },
    update: {},
    create: {
      id: "dc-batman-a-death-in-the-family-unknown-29db4e86",
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
  await prisma.issueCredit.create({
    data: {
      id: "a6da9903-d793-4679-aa74-e25bd97a1887",
      issueId: "avatar-303-1",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "eb2bc6ad-2a11-4829-a1d9-95bc41c58da4",
      issueId: "avatar-303-1",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f4b82f68-d79b-4004-bdf9-3d99707c9226",
      issueId: "avatar-303-2",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5447aa48-798e-4a1e-81a9-74d5b1b800a2",
      issueId: "avatar-303-2",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f3c3889c-c307-476d-9167-55a071edbca0",
      issueId: "avatar-303-3",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "466108fa-d1a4-4b69-ba64-8a6af1c77256",
      issueId: "avatar-303-3",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a3b5aa1f-6770-4719-b034-c7cb3b9cd734",
      issueId: "avatar-303-4",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "19a7c046-927e-4fdf-a36b-0eaac1dd7088",
      issueId: "avatar-303-4",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "752b4caa-d168-4527-8b06-c23a3916fbef",
      issueId: "avatar-303-5",
      creatorId: "garth-ennis",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b83b720a-0632-4997-aa87-0bb539bfcbde",
      issueId: "avatar-303-5",
      creatorId: "jacen-burrows",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c20d70fb-0488-4220-84ff-47374531a7cf",
      issueId: "dc-batman-a-death-in-the-family-unknown-29db4e86",
      creatorId: "jim-starlin",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "03a10228-09aa-412e-8d8e-1a501e0120ab",
      issueId: "dc-batman-a-death-in-the-family-unknown-29db4e86",
      creatorId: "jim-aparo",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b841046a-ec8a-4dbb-9e1d-22cc2081db1f",
      issueId: "dc-batman-and-robin-1",
      creatorId: "grant-morrison",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c0b00efe-4400-46bb-b96d-8b9b4d4bf67a",
      issueId: "dc-batman-and-robin-1",
      creatorId: "frank-quitely",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8132b5ca-9245-4b96-85c6-04d72ad27541",
      issueId: "dc-batman-and-robin-2",
      creatorId: "grant-morrison",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3f507426-cd12-45cf-9c4f-edae22130b2e",
      issueId: "dc-batman-and-robin-2",
      creatorId: "frank-quitely",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "dc165b26-9c87-4454-9d3a-be19a9697be1",
      issueId: "dc-batman-annual-15",
      creatorId: "alan-grant",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4d2e5763-1ce0-43d1-b504-a4b55dda1c33",
      issueId: "dc-batman-annual-15",
      creatorId: "jim-fern",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "2305d07b-154b-405b-ae80-b4e78dde9160",
      issueId: "image-black-ops-3",
      creatorId: "bury",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b33caa93-0a7c-4688-aa98-0b28c9f2c317",
      issueId: "image-black-ops-3",
      creatorId: "norton",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "09d2e40d-1b7d-4224-a3e0-9434277d8cf3",
      issueId: "dc-blackhawk-253",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ab020ba7-4e5b-421f-9a7c-d1da65381097",
      issueId: "dc-blackhawk-253",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4bc0c214-f2c5-4d67-b0cc-0319c6fca113",
      issueId: "dc-blackhawk-255",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ecf9c999-6d29-4a98-8907-2010ddd2f4d1",
      issueId: "dc-blackhawk-255",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f0698275-96e3-44d9-a659-407a3f0bcb5a",
      issueId: "dc-blackhawk-259",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "73f6e152-8870-46dd-9334-6a54fef5918c",
      issueId: "dc-blackhawk-259",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b2795367-db97-4313-8c3b-01eea5633806",
      issueId: "dc-blackhawk-262",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c821592d-c68e-4f7f-b3b5-4f4704f6ab6c",
      issueId: "dc-blackhawk-262",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3f64ae89-d8c2-49b5-bb35-89d918615b3f",
      issueId: "dc-blackhawk-263",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "867df2a3-c27b-47c4-8019-f69e2c5787ea",
      issueId: "dc-blackhawk-263",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3a61acbc-6f45-4a5a-ac7e-52959defc962",
      issueId: "dc-blackhawk-265",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "09e039e3-aa1b-41e9-a7dc-3171305d0aae",
      issueId: "dc-blackhawk-265",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "703c35aa-cc23-49b6-872c-0f02daee459e",
      issueId: "dc-blackhawk-266",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "56d33803-c6c0-4e09-b881-ad5b34414943",
      issueId: "dc-blackhawk-266",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "cb47bdd1-ea1e-47e0-b2d6-76eab2e248b6",
      issueId: "dc-blackhawk-267",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7553b796-308c-43c7-a76d-1f508472860b",
      issueId: "dc-blackhawk-267",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e03b0322-1b42-4e0a-8592-0d65048a5033",
      issueId: "dc-blackhawk-268",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7be835c1-a226-43c8-ba9d-57d94323b613",
      issueId: "dc-blackhawk-268",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "237538e5-b48b-4f4a-99a1-cc5cb62badda",
      issueId: "dc-blackhawk-269",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "6a0393bf-fe0d-4115-a456-d90255aea495",
      issueId: "dc-blackhawk-269",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9d05220b-8a40-4dff-8a3c-46f2601b96f8",
      issueId: "dc-blackhawk-270",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ef35c77e-916a-42ab-a169-bf0933c26db2",
      issueId: "dc-blackhawk-270",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9438bd1e-9e47-491c-a67c-bd6b7ac9912f",
      issueId: "dc-blackhawk-271",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "fc192dd5-ae7d-40a0-ac5d-faf633679508",
      issueId: "dc-blackhawk-271",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7eebdc82-c79c-4800-8256-45e7d3e5216a",
      issueId: "dc-blackhawk-272",
      creatorId: "mark-evanier",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "53fa441a-6d13-4255-9311-985e11694a4b",
      issueId: "dc-blackhawk-272",
      creatorId: "dan-spiegle",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a0eec1ac-b3ae-44a2-987a-479defbe43a8",
      issueId: "image-danger-girl-0",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8ad1670e-2b19-4d80-922b-b72ccf706753",
      issueId: "image-danger-girl-0",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4da9d238-5a83-436a-957e-08f8a8e9159d",
      issueId: "image-danger-girl-1",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "436ee177-497a-4f9b-8f62-c5286e026d11",
      issueId: "image-danger-girl-1",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8663a5e4-b2bb-4a11-89b8-fa3637183165",
      issueId: "image-danger-girl-2",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0f20f3d4-47f6-46ad-b850-3b49279c05cc",
      issueId: "image-danger-girl-2",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "80c317a4-bcb0-41bb-96fc-7cc1bae153ab",
      issueId: "image-danger-girl-3",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "af166332-ad99-4eac-9e0d-cba0c077dde6",
      issueId: "image-danger-girl-3",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9b095792-a2cb-4c31-bb94-054c0fd5fe73",
      issueId: "image-danger-girl-4",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "cd332c66-746a-46f7-8ce4-518e187cfa66",
      issueId: "image-danger-girl-4",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5ca35e59-745a-4710-bc6c-dc26375a5c2c",
      issueId: "image-danger-girl-5",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e094bff7-1a0d-4b5c-89b5-701b28416899",
      issueId: "image-danger-girl-5",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1da9f5aa-37e9-4263-9f9f-42a73ebd100b",
      issueId: "image-danger-girl-6",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "796278cd-f70f-4b9b-b28a-b65748c24723",
      issueId: "image-danger-girl-6",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3134f3cf-62ac-465f-8911-8a34cd2d1cab",
      issueId: "image-danger-girl-7",
      creatorId: "j-scott-campbell",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "99f293e3-a016-4d6f-97d2-5f432832abac",
      issueId: "image-danger-girl-7",
      creatorId: "j-scott-campbell",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "784da81b-4b13-4dc5-bbc8-d9c7f2ffd26d",
      issueId: "marvel-groo-the-wanderer-18",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c79ab301-ed0b-44d6-b2eb-1e632e9c5ca5",
      issueId: "marvel-groo-the-wanderer-18",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "58f0087e-79a1-4707-9133-01516fd0a370",
      issueId: "marvel-groo-the-wanderer-19",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c7f329a1-145e-4475-9f3e-ef5f14d3db99",
      issueId: "marvel-groo-the-wanderer-19",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "2a903621-d7b1-40b9-bdbb-b1024d7de900",
      issueId: "marvel-groo-the-wanderer-21",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3e3001f2-38ac-47cd-99bc-bf66253f62b2",
      issueId: "marvel-groo-the-wanderer-21",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b7e209f0-8a10-4ae4-99b5-de332258e076",
      issueId: "marvel-groo-the-wanderer-22",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ab4511dd-2fd6-4fe1-82ab-b072c72b4a77",
      issueId: "marvel-groo-the-wanderer-22",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f1397fb6-fcb5-4545-b866-66d109d3f8c0",
      issueId: "marvel-groo-the-wanderer-23",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "157e23c6-8ea7-4a8f-b0d5-8ba3a9c13871",
      issueId: "marvel-groo-the-wanderer-23",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "bdb5cfdb-9efd-48e5-843d-56f8b1da30d4",
      issueId: "marvel-groo-the-wanderer-26",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "628262a4-e9ae-44f3-9bf4-788a5b4e8a88",
      issueId: "marvel-groo-the-wanderer-26",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c78d591a-d21b-4fe0-a612-212b057031c6",
      issueId: "marvel-groo-the-wanderer-27",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1d29195a-09fa-4726-a79b-36fc9f2bc15b",
      issueId: "marvel-groo-the-wanderer-27",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0116c3a2-bd5e-4340-b114-3189eb0048aa",
      issueId: "marvel-groo-the-wanderer-28",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c213c34f-8cb1-4f69-8fe0-ecbaaed0a9ab",
      issueId: "marvel-groo-the-wanderer-28",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9c93992e-dfaf-4b9f-8d74-0636456aa244",
      issueId: "marvel-groo-the-wanderer-29",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1aebd0e7-0028-4122-ad54-822fab43fc73",
      issueId: "marvel-groo-the-wanderer-29",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "704f1cc3-8716-4ca4-baf1-d776e3370d73",
      issueId: "marvel-groo-the-wanderer-30",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5dcb2f4d-bff0-40d1-b3c5-627744e7857f",
      issueId: "marvel-groo-the-wanderer-30",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9b882511-042f-432f-b164-09873143615f",
      issueId: "marvel-groo-the-wanderer-31",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c994a43b-a48e-4d14-96ce-249163524fde",
      issueId: "marvel-groo-the-wanderer-31",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "cc55bea9-c33f-433b-acaa-67be47bd182b",
      issueId: "marvel-groo-the-wanderer-32",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "35e29ba7-139b-40cf-bbfd-6ca96d68de4f",
      issueId: "marvel-groo-the-wanderer-32",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "63a9873c-c9ef-4f65-9d5b-f99252161abb",
      issueId: "marvel-groo-the-wanderer-33",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4646d8ed-1815-4670-b38b-1e9fc45af934",
      issueId: "marvel-groo-the-wanderer-33",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b11327fc-d36b-4c84-8c1d-e07ed593e56f",
      issueId: "marvel-groo-the-wanderer-39",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a8614b9e-26f7-4e21-93a2-cdec18775331",
      issueId: "marvel-groo-the-wanderer-39",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "eaf17f17-1e6d-4b0e-93ac-f6cf763b7515",
      issueId: "marvel-groo-the-wanderer-40",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "daf6a444-4455-437a-a6b2-263c31c3f28a",
      issueId: "marvel-groo-the-wanderer-40",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "868dba14-79f3-4e8b-a6cc-d150c62ec1a7",
      issueId: "marvel-groo-the-wanderer-48",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0624acb3-4774-4341-bd40-3a12d403d942",
      issueId: "marvel-groo-the-wanderer-48",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "dab7d2fc-3043-4bc3-9ef4-4be8bf3eef6d",
      issueId: "marvel-groo-the-wanderer-50",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ae812fa0-0836-4970-812b-1a9cc972eb87",
      issueId: "marvel-groo-the-wanderer-50",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d3fa2d5d-35c1-4060-834d-4a0e7e71efe0",
      issueId: "marvel-groo-the-wanderer-52",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "18a3e519-faf2-4206-936c-5915883587d6",
      issueId: "marvel-groo-the-wanderer-52",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9121379c-a6ed-4fd1-8098-b81562d99b16",
      issueId: "marvel-groo-the-wanderer-53",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c4029e09-4baa-4848-8cbb-4e16019528c6",
      issueId: "marvel-groo-the-wanderer-53",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b5bbb9cf-ca92-4ced-9114-06c6d97e02ed",
      issueId: "marvel-groo-the-wanderer-54",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "484a5eca-2343-42ad-ad54-616a2caba567",
      issueId: "marvel-groo-the-wanderer-54",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5b806b34-1602-4eae-aecb-c2cf9be7ae7c",
      issueId: "marvel-groo-the-wanderer-55",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7755378a-8f21-4b3a-ac2c-d7d50128e2ad",
      issueId: "marvel-groo-the-wanderer-55",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "368d0e65-fc16-4491-a7b2-08dc182ac3a7",
      issueId: "marvel-groo-the-wanderer-57",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "85dd2313-50f7-4b8b-8662-c859f9f3a25b",
      issueId: "marvel-groo-the-wanderer-57",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8245c874-13d7-49ce-93ed-7eab9777c543",
      issueId: "marvel-groo-the-wanderer-58",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1ae85480-ef04-454a-88ca-51cc016be44c",
      issueId: "marvel-groo-the-wanderer-58",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "81e779ac-b9ce-4b45-81d8-1806e7c717b2",
      issueId: "marvel-groo-the-wanderer-59",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c948fe27-4798-4bae-82a9-fc9d3959f824",
      issueId: "marvel-groo-the-wanderer-59",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "51782536-1e6f-47a8-9ac3-83c599429d7b",
      issueId: "marvel-groo-the-wanderer-60",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1ca00896-09ae-4ce0-ba81-0b5bb54add8d",
      issueId: "marvel-groo-the-wanderer-60",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "26e882fa-2005-499b-853d-8f71f51ad7c1",
      issueId: "marvel-groo-the-wanderer-61",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a15ff095-f86e-4f2e-9367-0a6caf422a3e",
      issueId: "marvel-groo-the-wanderer-61",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a9a667d0-2b4b-4c3b-a536-97499424ce06",
      issueId: "marvel-groo-the-wanderer-62",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "20751302-7e0f-415c-abc9-6e1d4b975c29",
      issueId: "marvel-groo-the-wanderer-62",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "45f1b15f-0cc6-45a9-8fb0-240f1e7766c9",
      issueId: "marvel-groo-the-wanderer-63",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9de95bbf-b7b3-49b1-b9ab-7027d925bd41",
      issueId: "marvel-groo-the-wanderer-63",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a3682b4a-6fd8-469e-a745-a804281dfc26",
      issueId: "marvel-groo-the-wanderer-64",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4691ec84-7620-476b-a05f-64106d969431",
      issueId: "marvel-groo-the-wanderer-64",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "db4e41a6-d4d0-48d8-a280-30728584a81b",
      issueId: "marvel-groo-the-wanderer-65",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "779c30d0-1bb1-4720-acf9-3d9afb19d6b8",
      issueId: "marvel-groo-the-wanderer-65",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a893f9c1-aa19-445a-9b22-984bb4a18cd3",
      issueId: "marvel-groo-the-wanderer-66",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "474d92d2-540a-4402-ba36-88dc0f46750f",
      issueId: "marvel-groo-the-wanderer-66",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1e202753-97b3-492f-a42c-0e6aa3ac42e0",
      issueId: "marvel-groo-the-wanderer-67",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9ca03feb-efd9-40cb-8fc1-0ed4dfb76d7a",
      issueId: "marvel-groo-the-wanderer-67",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9c6130cc-8e6e-42c2-ac62-250be5180e7c",
      issueId: "marvel-groo-the-wanderer-68",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8f86ff12-1253-42b8-9d5b-c69681c73951",
      issueId: "marvel-groo-the-wanderer-68",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "338a4077-5548-41a5-9604-55298e5237be",
      issueId: "marvel-groo-the-wanderer-69",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "21b78f76-e6f3-44b3-aed7-39abd4a553da",
      issueId: "marvel-groo-the-wanderer-69",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8ef9b641-f384-4be3-8d7c-1840f98a646e",
      issueId: "marvel-groo-the-wanderer-70",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c1f76c1e-cfd5-41db-a48f-a65e1d91bd63",
      issueId: "marvel-groo-the-wanderer-70",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a75df56d-857c-4757-8517-d94ea181120c",
      issueId: "marvel-groo-the-wanderer-71",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7666ccff-26fb-42d4-815f-a704b204686e",
      issueId: "marvel-groo-the-wanderer-71",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5e435647-bc08-40e4-8c31-58d6466fc987",
      issueId: "marvel-groo-the-wanderer-72",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f021800a-1c26-4096-b790-d9caec429abc",
      issueId: "marvel-groo-the-wanderer-72",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "77669379-7d1c-40f2-bc8a-ca2cfa233b01",
      issueId: "vertigo-losers-1",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c0e5c543-21a6-4354-92e7-89c25c95d00d",
      issueId: "vertigo-losers-1",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1fc1f532-5e92-4bbb-8947-ed7156237bc7",
      issueId: "vertigo-losers-10",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9d785a8b-3e0a-4d6f-b9b8-2cb751497273",
      issueId: "vertigo-losers-10",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1337db1f-39ea-4f90-bb4b-8f94962a16e4",
      issueId: "vertigo-losers-11",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "91fb9170-e452-4531-96ad-41d9609c8b2c",
      issueId: "vertigo-losers-11",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "78881664-907f-46ac-9075-42ac824c5107",
      issueId: "vertigo-losers-12",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "76cae761-eb98-4bc2-9dad-9f4c0e0055ee",
      issueId: "vertigo-losers-12",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c9a7c1a4-2914-4941-9623-075f862f6280",
      issueId: "vertigo-losers-13",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "02db54fe-c8cf-4c55-b3f3-2555d39af080",
      issueId: "vertigo-losers-13",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f9d045d1-0649-46ca-9287-d504c7b68682",
      issueId: "vertigo-losers-14",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "03f00294-f8c7-4650-8adb-af4e9639c096",
      issueId: "vertigo-losers-14",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "2a70fe9a-bdba-4739-9ac1-b393372d53a6",
      issueId: "vertigo-losers-15",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d3963d98-22d6-4f33-9633-9ca03962865a",
      issueId: "vertigo-losers-15",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "bb02f4a1-a1e4-49df-985a-cad900ad46b0",
      issueId: "vertigo-losers-16",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "19ef12cc-33e2-406e-b59e-c41ec5b98759",
      issueId: "vertigo-losers-16",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9d84ec1a-63f7-4d59-bcdd-c2b7ab5d4753",
      issueId: "vertigo-losers-17",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "82e2b102-dfe2-4665-8d73-90f79953796c",
      issueId: "vertigo-losers-17",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f79c1682-0fe1-4363-9349-a89983a5bde5",
      issueId: "vertigo-losers-18",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d07a3485-0149-4ca2-8e4b-7aa4484251b0",
      issueId: "vertigo-losers-18",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9c51c04b-6c4a-4045-ba8a-d3a7ff87178c",
      issueId: "vertigo-losers-19",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "74f0c640-6bb1-4f63-b247-e755edffaf06",
      issueId: "vertigo-losers-19",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "13e33096-6c41-4d10-85fa-15402cb9a50c",
      issueId: "vertigo-losers-2",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "bfe630d3-2ea5-4c96-9bd8-f3c8df617c6f",
      issueId: "vertigo-losers-2",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0a885d0b-141e-4a00-8465-0532e5a59410",
      issueId: "vertigo-losers-20",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1450123b-4c36-43ff-b5a8-af1d64891aeb",
      issueId: "vertigo-losers-20",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b3dbb369-23c5-48a3-b4b4-9abf08299f72",
      issueId: "vertigo-losers-21",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5001ed2c-c2e4-4a28-abde-82fd668f3f7a",
      issueId: "vertigo-losers-21",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b4943e82-1ed6-4c64-8b0d-a05e081f67ca",
      issueId: "vertigo-losers-22",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c781b31a-e811-40af-83eb-3ecceadaa095",
      issueId: "vertigo-losers-22",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "6ae2e60c-6b5b-4313-8bc2-54ba92533f70",
      issueId: "vertigo-losers-23",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "170c17ac-6698-41a4-94b6-1f4887847ef3",
      issueId: "vertigo-losers-23",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "2b827ad4-2e46-410c-bced-af1466b76c98",
      issueId: "vertigo-losers-24",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4c1a5fe5-fcde-481e-8118-c1bf2d97c8b1",
      issueId: "vertigo-losers-24",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "dd841a02-6df5-425b-910a-4b9e7a3b8959",
      issueId: "vertigo-losers-25",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "618c3867-59fb-49ba-b5da-2efe94cbeed7",
      issueId: "vertigo-losers-25",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3cd3888e-bcba-4150-b1f1-65f902a2f229",
      issueId: "vertigo-losers-26",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3da49ca3-ccbf-4c7a-baaa-86a8fc9942a3",
      issueId: "vertigo-losers-26",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9bb2e8fd-2168-4a4e-ad11-b9f49139848b",
      issueId: "vertigo-losers-27",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "053641ff-725a-490a-b607-932a2ebaa08c",
      issueId: "vertigo-losers-27",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0e2a03e8-064c-4670-af9c-6d7481dcd7c5",
      issueId: "vertigo-losers-28",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "6c108798-f321-4ce3-8dcc-8a0c2386c7ff",
      issueId: "vertigo-losers-28",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a31fa2b5-7059-4dde-8be3-db2078bdbebf",
      issueId: "vertigo-losers-29",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f928e894-8e37-40ff-801c-6963038fb95e",
      issueId: "vertigo-losers-29",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d72cfc2e-30c1-469a-b663-63dc43ac873e",
      issueId: "vertigo-losers-3",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "484735df-edb0-4869-837c-c517a4c023c5",
      issueId: "vertigo-losers-3",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e35034d1-6530-49ee-bce7-6864e5d193fe",
      issueId: "vertigo-losers-30",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c8c84f5a-a52a-4a39-ae63-dca43edda573",
      issueId: "vertigo-losers-30",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "82f7ec56-3a21-492c-87e8-384485c9f039",
      issueId: "vertigo-losers-31",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "2740a837-8c81-4157-b64c-ff7be263aaf0",
      issueId: "vertigo-losers-31",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8c7c281d-3984-416a-8b48-d86890d1e85c",
      issueId: "vertigo-losers-32",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0cdefb8b-9d72-4f6f-bb6c-8ef49c77ebbd",
      issueId: "vertigo-losers-32",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "37820d4d-7625-4a2f-a149-ed773179e117",
      issueId: "vertigo-losers-4",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b8d49051-5ffb-49a6-a7b2-73b88532a2ac",
      issueId: "vertigo-losers-4",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a4054957-8980-4bb2-ac0c-c065391495eb",
      issueId: "vertigo-losers-5",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "196da580-0d61-4e5c-8258-680633bf8e98",
      issueId: "vertigo-losers-5",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "1539731a-c5fc-4d70-93ee-fe1417d92ad1",
      issueId: "vertigo-losers-6",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8a32da8a-e8ba-44f5-8ee6-a857267c24e2",
      issueId: "vertigo-losers-6",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a4c4e78d-78cd-449d-a957-40dc74a29be9",
      issueId: "vertigo-losers-7",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "40ed78fd-0cf7-490f-adad-a70a50d68ca4",
      issueId: "vertigo-losers-7",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4974dd1c-21ad-48b8-a700-d96a2ba5c62b",
      issueId: "vertigo-losers-8",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d9097d57-30e4-4d1c-8bd8-fb2732be8d3c",
      issueId: "vertigo-losers-8",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d5d28120-1337-45a9-b355-434c21038056",
      issueId: "vertigo-losers-9",
      creatorId: "jock-any-dingle",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "21cb525c-6158-437c-97a8-afaecf363a0c",
      issueId: "vertigo-losers-9",
      creatorId: "clem-robins",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "993c0efb-74e2-4f15-b1a9-1d4d60c030dc",
      issueId: "marvel-marvel-team-up-96",
      creatorId: "alan-kupperberg",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "77c0455b-717a-423a-93bd-06dfbd1b3482",
      issueId: "marvel-marvel-team-up-96",
      creatorId: "alan-kupperberg",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "06c89a89-d6b3-46a9-88c2-f3bf043a5f81",
      issueId: "marvel-merc-1",
      creatorId: "peter-david",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "68ec3bfa-e8b1-443d-a4ea-655fb475c141",
      issueId: "marvel-merc-1",
      creatorId: "gray-morrow",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e4028661-08d5-44c6-8def-7cf63aec97d3",
      issueId: "marvel-merc-4",
      creatorId: "peter-david",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b7430e17-2e54-44ff-93e1-c7dda10c6b15",
      issueId: "marvel-merc-4",
      creatorId: "gray-morrow",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "477bd3c3-36d5-4d45-930d-73cd1693e07f",
      issueId: "marvel-nth-man-the-ultimate-ninja-1",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "62d71cb8-a671-47a2-8090-f6543de02143",
      issueId: "marvel-nth-man-the-ultimate-ninja-1",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "de696e41-363b-4f95-b8a2-aed6ccc413f4",
      issueId: "marvel-nth-man-the-ultimate-ninja-10",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "6278c56f-bfd9-45fa-957e-d230d835145d",
      issueId: "marvel-nth-man-the-ultimate-ninja-10",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "59cf3412-d791-42c0-b98b-52ee83766cb1",
      issueId: "marvel-nth-man-the-ultimate-ninja-11",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "74b3cf29-958e-443e-be33-e65b4dac013e",
      issueId: "marvel-nth-man-the-ultimate-ninja-11",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3bc5ac93-b36d-4e93-8a52-12e0a7f7eb80",
      issueId: "marvel-nth-man-the-ultimate-ninja-12",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a8c3d24a-b0ee-41e9-92d0-41eee3ea3cd0",
      issueId: "marvel-nth-man-the-ultimate-ninja-12",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "25fd2350-0143-47fb-b2f0-d97ba422cb3b",
      issueId: "marvel-nth-man-the-ultimate-ninja-13",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a605d787-a944-4d21-bca5-f8ad6cc5aef7",
      issueId: "marvel-nth-man-the-ultimate-ninja-13",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8b2784df-2b9b-4c5a-89dc-487af3da1ed4",
      issueId: "marvel-nth-man-the-ultimate-ninja-14",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "73bb5543-dbd5-4178-bf72-063533aace79",
      issueId: "marvel-nth-man-the-ultimate-ninja-14",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3f52167c-46d9-4a3a-b168-62c627065e7e",
      issueId: "marvel-nth-man-the-ultimate-ninja-15",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5ec70207-7970-4810-8d3f-9d4b298fde27",
      issueId: "marvel-nth-man-the-ultimate-ninja-15",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b22e4e2e-a3a7-4fe1-b5f7-ca75fa476e8a",
      issueId: "marvel-nth-man-the-ultimate-ninja-16",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "6adf6129-b857-4b6f-867a-a076a96bed18",
      issueId: "marvel-nth-man-the-ultimate-ninja-16",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e467c20a-9dba-497c-a5d2-f60f24c2ca2b",
      issueId: "marvel-nth-man-the-ultimate-ninja-2",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "6e787ca0-15ac-4d62-8fea-3b9cd6b8e761",
      issueId: "marvel-nth-man-the-ultimate-ninja-2",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "84f876b8-ca5d-4e27-bf9b-a909ce38dfa3",
      issueId: "marvel-nth-man-the-ultimate-ninja-3",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d1f70ab0-9371-4d0d-bf28-ac398052448a",
      issueId: "marvel-nth-man-the-ultimate-ninja-3",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "96a80c77-5c0b-4f2d-a9c0-1efb9178300b",
      issueId: "marvel-nth-man-the-ultimate-ninja-4",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "15a24e1f-e643-4320-8d8b-2200fcade2a5",
      issueId: "marvel-nth-man-the-ultimate-ninja-4",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8a25e7dd-1ccc-4440-bfd5-b1c699d91740",
      issueId: "marvel-nth-man-the-ultimate-ninja-5",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4fb0d51a-bcc0-4a07-bd15-03c3017d157b",
      issueId: "marvel-nth-man-the-ultimate-ninja-5",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e7caaa7d-e6e7-4ad6-b2e7-d05e5066e362",
      issueId: "marvel-nth-man-the-ultimate-ninja-6",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "16c132c2-aee7-4477-a4df-960cca788809",
      issueId: "marvel-nth-man-the-ultimate-ninja-6",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "620a76a4-35ab-49a8-b13f-f98f10ce56b0",
      issueId: "marvel-nth-man-the-ultimate-ninja-7",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "82c930a7-bb5a-4410-bdbe-2d44d734d14c",
      issueId: "marvel-nth-man-the-ultimate-ninja-7",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c21dd248-39f1-484b-89b8-7dd1b18a361d",
      issueId: "marvel-nth-man-the-ultimate-ninja-8",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5a408837-2c97-44e6-8fd9-a87cf8a24796",
      issueId: "marvel-nth-man-the-ultimate-ninja-8",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7470b10a-a3e6-4ee4-b23a-70e48984d004",
      issueId: "marvel-nth-man-the-ultimate-ninja-9",
      creatorId: "larry-hama",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "007d93b3-7198-42a8-af24-c3b8f921162f",
      issueId: "marvel-nth-man-the-ultimate-ninja-9",
      creatorId: "ron-wagner",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "be0770ef-7f04-4431-85e4-0b77d1105b73",
      issueId: "marvel-silver-surfer-9",
      creatorId: "steve-englehart",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5caf2479-e2c6-4e06-9b5c-589991da2bf0",
      issueId: "marvel-silver-surfer-9",
      creatorId: "marshall-rogers",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "37a7b35c-473d-40a9-a1d2-b28c36e6ff8d",
      issueId: "marvel-spidey-super-stories-44",
      creatorId: "alan-kupperberg",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9ee3cac0-b4ea-49e4-9bac-ed1d8e406c25",
      issueId: "marvel-spidey-super-stories-44",
      creatorId: "winslow-mortimer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "952603d4-3f23-4a33-b7de-a58b35998543",
      issueId: "epic-the-groo-chronicles-2",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c6e1df97-38c3-44ff-9ac8-403ff8e80668",
      issueId: "epic-the-groo-chronicles-2",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "402b2c7c-4ab0-4ae6-aca3-36f2a0af91a8",
      issueId: "epic-the-groo-chronicles-5",
      creatorId: "sergio-aragones",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "7a41267e-13e3-4ac7-a15c-4fcad69ff055",
      issueId: "epic-the-groo-chronicles-5",
      creatorId: "sergio-aragones",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "5b93b3a7-03fa-456b-925b-e827313c1e50",
      issueId: "gold-key-the-pink-panther-68",
      creatorId: "depatie",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4af8106d-480a-4ed0-93d4-9f89077ac36d",
      issueId: "gold-key-the-pink-panther-68",
      creatorId: "freleng",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "81d57c06-3a28-47fe-a8bf-bf477cd69f06",
      issueId: "marvel-the-punisher-30",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "595f150e-e449-47e2-b079-7593cd1f4852",
      issueId: "marvel-the-punisher-30",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "fe2b2943-0123-4113-bb96-febcd84ae08d",
      issueId: "marvel-the-punisher-31",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ac0d3611-d6e5-4060-9449-9f9e1208912d",
      issueId: "marvel-the-punisher-31",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8b8a047d-a7f0-4ba0-bd61-44db0074313b",
      issueId: "marvel-the-punisher-32",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "fd30d7d1-f9b4-4b40-8a49-8895292c8830",
      issueId: "marvel-the-punisher-32",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "95829c69-023d-45d4-afed-054baed6f957",
      issueId: "marvel-the-punisher-33",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b591eae3-aa50-4f9b-8cf4-4a565dc8933d",
      issueId: "marvel-the-punisher-33",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "58a0c5a6-4be9-4c7e-844d-2e211917939d",
      issueId: "marvel-the-punisher-34",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "a297a511-d3a6-4bd2-b9c9-d3399547503d",
      issueId: "marvel-the-punisher-34",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "30b9732c-2200-44bc-acb8-fc46ab631771",
      issueId: "marvel-the-punisher-35",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8bd9d99d-d09c-4de5-a092-5ddfeb06c3a8",
      issueId: "marvel-the-punisher-35",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "acc09e6c-cf40-4323-a708-28af40cf9668",
      issueId: "marvel-the-punisher-36",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d04cb64f-6055-4174-840a-adb2095e52ea",
      issueId: "marvel-the-punisher-36",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c4bdb8a1-4132-4ea1-a011-68a5e294d32e",
      issueId: "marvel-the-punisher-37",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "2d89a6bd-c8a3-49e0-8522-41410da237c4",
      issueId: "marvel-the-punisher-37",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0d08245a-2d7a-4c8d-8459-88676efb34aa",
      issueId: "marvel-the-punisher-38",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0adc9149-6791-4a9e-bcc6-655a006fcd65",
      issueId: "marvel-the-punisher-38",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "dfc832b9-2967-404c-a450-81d2920237e8",
      issueId: "marvel-the-punisher-39",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e51a86e1-28d0-4374-9372-892e2d28dfeb",
      issueId: "marvel-the-punisher-39",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "8b8052a5-cd97-49a3-b6eb-8d9e77c1a70f",
      issueId: "marvel-the-punisher-40",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c804d38d-843e-401c-8228-22f00f27ae1f",
      issueId: "marvel-the-punisher-40",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "83e8ed89-d1c2-4274-8eb3-1c54b00e7b02",
      issueId: "marvel-the-punisher-41",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c86024e9-e246-4cdc-aad3-aca64ae27a1b",
      issueId: "marvel-the-punisher-41",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "54e97d36-23a8-423a-bb08-be77c8e3d03a",
      issueId: "marvel-the-punisher-43",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3934f1c1-6eaa-412b-a8f2-1e3e050b716e",
      issueId: "marvel-the-punisher-43",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "fa2f9ab5-508f-45b1-b55b-9008c93cddf1",
      issueId: "marvel-the-punisher-44",
      creatorId: "mike-baron",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d48fca81-2351-4a00-84c4-7dc91d144816",
      issueId: "marvel-the-punisher-44",
      creatorId: "bill-reinhold",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9e1dc301-46b6-4cef-b117-34e8ac11f066",
      issueId: "marvel-the-transformers-10",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b2bb7617-57b1-4523-b3c7-6908443b2fb3",
      issueId: "marvel-the-transformers-10",
      creatorId: "ricardo-villamonte",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ddb3fd63-47cf-458c-a47c-ac7e2b12dc30",
      issueId: "marvel-the-transformers-11",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "85a9cbbe-385f-4e6f-8651-c77ec8605538",
      issueId: "marvel-the-transformers-11",
      creatorId: "ricardo-villamonte",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "45054568-14f8-40bb-8bac-c09c6195f231",
      issueId: "marvel-the-transformers-12",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f0c5ffd7-4ea3-40ba-ba07-56dfe1c908df",
      issueId: "marvel-the-transformers-12",
      creatorId: "ricardo-villamonte",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "3671320c-39df-451c-952a-469304c5f923",
      issueId: "marvel-the-transformers-20",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "374c2ba0-8996-41bf-a7e7-06347723223b",
      issueId: "marvel-the-transformers-20",
      creatorId: "herb-trimpe",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "681446cf-8580-42f4-ad73-e604b9424cc8",
      issueId: "marvel-the-transformers-21",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ffbc5d4f-7a24-4608-9811-fd2c0d377479",
      issueId: "marvel-the-transformers-21",
      creatorId: "herb-trimpe",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "24e629e7-1056-4ff1-92c8-42f97ae92573",
      issueId: "marvel-the-transformers-22",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "58eda14c-7c00-40dd-b085-d72f587f897f",
      issueId: "marvel-the-transformers-22",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "56a1dd6d-f91e-43cc-88c1-301d69412778",
      issueId: "marvel-the-transformers-23",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e19d27a4-2f99-4fd0-bff0-98889477f1e6",
      issueId: "marvel-the-transformers-23",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "ebd37999-3ebc-4129-925b-14690d4b9bcc",
      issueId: "marvel-the-transformers-24",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "0e014e2f-07d6-459f-a2d0-bcf191db02a7",
      issueId: "marvel-the-transformers-24",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b2a4f691-2dd1-4dd5-b5ae-1f598a6638be",
      issueId: "marvel-the-transformers-25",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "61558ed5-2a0f-4040-a606-f47107015e0f",
      issueId: "marvel-the-transformers-25",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "506f2269-db6c-4ad4-a2ef-b4366b4a5fc0",
      issueId: "marvel-the-transformers-26",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "f650eaf3-474c-4903-ad26-cd959296264c",
      issueId: "marvel-the-transformers-26",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "d08fcac1-fdf0-410e-b3fb-4e0c24c56c7f",
      issueId: "marvel-the-transformers-27",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c3ee3052-b43e-4e92-af8c-03e648d14110",
      issueId: "marvel-the-transformers-27",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "575e2c47-d61d-46e4-924d-a12742a14d62",
      issueId: "marvel-the-transformers-28",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "39434acb-173a-42fc-a853-80016980ce60",
      issueId: "marvel-the-transformers-28",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4fbb66e2-0dd4-47cb-85ba-df7d130c84b3",
      issueId: "marvel-the-transformers-29",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4f4ce299-c856-48ec-835d-58303af6e148",
      issueId: "marvel-the-transformers-29",
      creatorId: "don-perlin",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "4cc95ea3-55f5-432e-a221-303283515063",
      issueId: "marvel-the-transformers-head-masters-1",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "898ccb21-9751-4be4-8e06-f32c0e21d691",
      issueId: "marvel-the-transformers-head-masters-1",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "25ed4219-bc0c-42b6-8eff-5bcc56b07abe",
      issueId: "marvel-transformers-universe-2",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "40bdecd8-b14f-498c-bcfa-d911d109c806",
      issueId: "marvel-transformers-universe-2",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c522c7c7-be76-4ee1-b875-cc8da795658e",
      issueId: "marvel-transformers-universe-3",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "c520495a-f2c9-438f-b36a-4bbde7b969f8",
      issueId: "marvel-transformers-universe-3",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "b3f8a6f6-c014-450d-89dd-7b020a6020b8",
      issueId: "marvel-transformers-universe-4",
      creatorId: "bob-budiansky",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "e7477355-0b7f-4d96-a65a-003eae19bb3c",
      issueId: "marvel-transformers-universe-4",
      creatorId: "frank-springer",
      role: 'ARTIST',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "9389f5d3-1c99-440a-8a04-7fc60828dbac",
      issueId: "dc-worlds-finest-comics-303",
      creatorId: "david-kraft",
      role: 'WRITER',
    },
  });
  await prisma.issueCredit.create({
    data: {
      id: "315f839d-77a6-4af9-a82a-055641933910",
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
