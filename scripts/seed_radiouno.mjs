// Script para poblar Radio Uno en Supabase
const SUPABASE_URL = 'https://pqfjwjrfoxzxybuzwior.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZmp3anJmb3h6eHlidXp3aW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTA1NzksImV4cCI6MjEwMTA4NjU3OX0.__6kHP3m1dQeykzYVQN7JCvGP105f8AFqTWV97fwfuQ'

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
}

const logoUrl = 'https://pqfjwjrfoxzxybuzwior.supabase.co/storage/v1/object/public/logos_emisoras/1789051602153_rccoj5a.png'
const colorFondo = '#0066d6'

const estaciones = [
  { nombre: 'Radio Uno Bogotá',        departamento: 'Bogotá D.C.',        ciudad: 'Bogotá D.C.',   frecuencia: '88.9 FM'  },
  { nombre: 'Radio Uno Medellín',      departamento: 'Antioquia',          ciudad: 'Medellín',      frecuencia: '93.9 FM'  },
  { nombre: 'Radio Uno Cali',          departamento: 'Valle del Cauca',    ciudad: 'Cali',          frecuencia: '100.5 FM' },
  { nombre: 'Radio Uno Barranquilla',  departamento: 'Atlántico',          ciudad: 'Barranquilla',  frecuencia: '95.6 FM'  },
  { nombre: 'Radio Uno Bucaramanga',   departamento: 'Santander',          ciudad: 'Bucaramanga',   frecuencia: '98.7 FM'  },
  { nombre: 'Radio Uno Cúcuta',        departamento: 'Norte de Santander', ciudad: 'Cúcuta',        frecuencia: '91.7 FM'  },
  { nombre: 'Radio Uno Manizales',     departamento: 'Caldas',             ciudad: 'Manizales',     frecuencia: '95.7 FM'  },
  { nombre: 'Radio Uno Pereira',       departamento: 'Risaralda',          ciudad: 'Pereira',       frecuencia: '94.7 FM'  },
  { nombre: 'Radio Uno Neiva',         departamento: 'Huila',              ciudad: 'Neiva',         frecuencia: '90.3 FM'  },
  { nombre: 'Radio Uno Pasto',         departamento: 'Nariño',             ciudad: 'Pasto',         frecuencia: '94.1 FM'  },
  { nombre: 'Radio Uno Ibagué',        departamento: 'Tolima',             ciudad: 'Ibagué',        frecuencia: '88.3 FM'  },
  { nombre: 'Radio Uno Villavicencio', departamento: 'Meta',               ciudad: 'Villavicencio', frecuencia: '98.3 FM'  },
  { nombre: 'Radio Uno Popayán',       departamento: 'Cauca',              ciudad: 'Popayán',       frecuencia: '100.1 FM' },
  { nombre: 'Radio Uno Tunja',         departamento: 'Boyacá',             ciudad: 'Tunja',         frecuencia: '102.1 FM' },
  { nombre: 'Radio Uno Armenia',       departamento: 'Quindío',            ciudad: 'Armenia',       frecuencia: '107.7 FM' }
]

const registros = estaciones.map(e => ({
  ...e,
  logo_url: logoUrl,
  color_fondo: colorFondo,
  descripcion: 'Radio Uno ' + e.ciudad + ' — La de uno. Música popular, vallenato y tropical.',
  genero: 'Popular / Despecho',
  stream_url: '', // El stream_url cambia con un ID específico de cada ciudad en mdstrm (RCN)
  sitio_web: 'https://www.rcnradio.com/radios/radio-uno-' + e.ciudad.toLowerCase().replace(/[^a-z0-9]/g, ''),
  whatsapp: '', // Pendiente por llenar
  facebook: 'https://www.facebook.com/RadioUnoColombia',
  instagram: 'https://www.instagram.com/radiounocolombia',
  twitter: '',
  tiktok: '',
  youtube: '',
  activa: false,
}))

async function seed() {
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/emisoras`, {
    method: 'POST',
    headers,
    body: JSON.stringify(registros)
  })
  
  if (!insertRes.ok) {
    console.error('Error insertando Radio Uno:', await insertRes.text())
  } else {
    const result = await insertRes.json()
    console.log(`✅ Se insertaron ${result.length} estaciones de Radio Uno`)
  }
}
seed()
