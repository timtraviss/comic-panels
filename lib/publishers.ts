export const PUBLISHER_COLORS: Record<string, string> = {
  marvel: '#E8243C',
  dc: '#4DA3FF',
  image: '#22c55e',
  idw: '#a78bfa',
  vertigo: '#C084FC',
  avatar: '#F87171',
  'gold-key': '#FCD34D',
  epic: '#34D399',
  'fleetway-quality': '#FB923C',
  disney: '#38BDF8',
  'star-comics': '#F472B6',
}

export const PUBLISHER_SLUG_MAP: Record<string, string> = {
  'Marvel': 'marvel',
  'DC': 'dc',
  'Image': 'image',
  'IDW': 'idw',
  'Vertigo': 'vertigo',
  'Avatar': 'avatar',
  'Gold Key': 'gold-key',
  'Epic': 'epic',
  'Fleetway Quality': 'fleetway-quality',
  'Disney': 'disney',
  'Star Comics': 'star-comics',
}

export const PUBLISHER_META: Record<string, { name: string; hq: string; bio: string }> = {
  marvel: { name: 'Marvel', hq: 'New York, USA', bio: 'Home of Spider-Man, the X-Men, and a sprawling shared universe of heroes and villains.' },
  dc: { name: 'DC', hq: 'Burbank, USA', bio: 'The original modern superhero publisher. Batman, Superman, Wonder Woman, the Justice League.' },
  image: { name: 'Image', hq: 'Portland, USA', bio: 'Creator-owned indie powerhouse founded in 1992 by artists escaping work-for-hire.' },
  idw: { name: 'IDW', hq: 'San Diego, USA', bio: 'Licensed mastery — G.I. Joe, Transformers, TMNT, Locke & Key.' },
  vertigo: { name: 'Vertigo', hq: 'New York, USA', bio: "DC's mature-readers imprint. The Losers, Preacher, Sandman, Y: The Last Man." },
  avatar: { name: 'Avatar Press', hq: 'Rantoul, USA', bio: 'Independent publisher known for Garth Ennis titles and mature horror comics.' },
  'gold-key': { name: 'Gold Key', hq: 'New York, USA', bio: 'Classic American comics publisher active from the 1960s through the 1980s.' },
  epic: { name: 'Epic Comics', hq: 'New York, USA', bio: "Marvel's creator-owned imprint from the 1980s and 1990s." },
  'fleetway-quality': { name: 'Fleetway Quality', hq: 'London, UK', bio: 'British comics publisher responsible for Judge Dredd and 2000 AD reprints for the US market.' },
  disney: { name: 'Disney', hq: 'Burbank, USA', bio: 'Licensed Disney comics including Roger Rabbit and classic character titles.' },
  'star-comics': { name: 'Star Comics', hq: 'New York, USA', bio: "Marvel's all-ages imprint from the 1980s, home to Thundercats and other licensed titles." },
}
