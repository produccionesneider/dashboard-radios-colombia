// Script usando fetch nativo (sin dependencias de WebSocket)
// Conecta directo a la REST API de Supabase

const SUPABASE_URL = 'https://pqfjwjrfoxzxybuzwior.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZmp3anJmb3h6eHlidXp3aW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTA1NzksImV4cCI6MjEwMTA4NjU3OX0.__6kHP3m1dQeykzYVQN7JCvGP105f8AFqTWV97fwfuQ'

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
}

// ─── PASO 1: Verificar conexión ────────────────────────────
console.log('\n🔍 Verificando conexión con Supabase...')
const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/emisoras?limit=1`, { headers })
console.log('Status:', checkRes.status, checkRes.statusText)

if (!checkRes.ok) {
  const err = await checkRes.text()
  console.error('❌ Error:', err)
  process.exit(1)
}

const existing = await checkRes.json()
console.log(`✅ Conexión OK. Registros actuales: ${existing.length}`)

// ─── PASO 2: Datos de Olímpica Stereo ──────────────────────
const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ol%C3%ADmpica_Stereo.svg/1200px-Ol%C3%ADmpica_Stereo.svg.png'

const estaciones = [
  { nombre: 'Olímpica Stereo Barranquilla',  departamento: 'Atlántico',          ciudad: 'Barranquilla',  frecuencia: '90.5 FM'  },
  { nombre: 'Olímpica Stereo Bogotá',        departamento: 'Bogotá D.C.',        ciudad: 'Bogotá D.C.',   frecuencia: '96.9 FM'  },
  { nombre: 'Olímpica Stereo Medellín',      departamento: 'Antioquia',          ciudad: 'Medellín',      frecuencia: '102.9 FM' },
  { nombre: 'Olímpica Stereo Cali',          departamento: 'Valle del Cauca',    ciudad: 'Cali',          frecuencia: '91.5 FM'  },
  { nombre: 'Olímpica Stereo Cartagena',     departamento: 'Bolívar',            ciudad: 'Cartagena',     frecuencia: '98.9 FM'  },
  { nombre: 'Olímpica Stereo Bucaramanga',   departamento: 'Santander',          ciudad: 'Bucaramanga',   frecuencia: '88.5 FM'  },
  { nombre: 'Olímpica Stereo Santa Marta',   departamento: 'Magdalena',          ciudad: 'Santa Marta',   frecuencia: '104.5 FM' },
  { nombre: 'Olímpica Stereo Pereira',       departamento: 'Risaralda',          ciudad: 'Pereira',       frecuencia: '90.9 FM'  },
  { nombre: 'Olímpica Stereo Manizales',     departamento: 'Caldas',             ciudad: 'Manizales',     frecuencia: '102.9 FM' },
  { nombre: 'Olímpica Stereo Cúcuta',        departamento: 'Norte de Santander', ciudad: 'Cúcuta',        frecuencia: '90.3 FM'  },
  { nombre: 'Olímpica Stereo Montería',      departamento: 'Córdoba',            ciudad: 'Montería',      frecuencia: '95.3 FM'  },
  { nombre: 'Olímpica Stereo Valledupar',    departamento: 'Cesar',              ciudad: 'Valledupar',    frecuencia: '99.9 FM'  },
  { nombre: 'Olímpica Stereo Villavicencio', departamento: 'Meta',               ciudad: 'Villavicencio', frecuencia: '93.3 FM'  },
  { nombre: 'Olímpica Stereo Ibagué',        departamento: 'Tolima',             ciudad: 'Ibagué',        frecuencia: '97.3 FM'  },
  { nombre: 'Olímpica Stereo Armenia',       departamento: 'Quindío',            ciudad: 'Armenia',       frecuencia: '91.9 FM'  },
  { nombre: 'Olímpica Stereo Neiva',         departamento: 'Huila',              ciudad: 'Neiva',         frecuencia: '99.3 FM'  },
  { nombre: 'Olímpica Stereo Pasto',         departamento: 'Nariño',             ciudad: 'Pasto',         frecuencia: '91.3 FM'  },
  { nombre: 'Olímpica Stereo Sincelejo',     departamento: 'Sucre',              ciudad: 'Sincelejo',     frecuencia: '100.3 FM' },
  { nombre: 'Olímpica Stereo Popayán',       departamento: 'Cauca',              ciudad: 'Popayán',       frecuencia: '104.9 FM' },
  { nombre: 'Olímpica Stereo Riohacha',      departamento: 'La Guajira',         ciudad: 'Riohacha',      frecuencia: '96.9 FM'  },
]

const registros = estaciones.map(e => ({
  ...e,
  logo_url: logoUrl,
  color_fondo: '#E8000E',
  descripcion: `Olímpica Stereo ${e.ciudad} — La cadena radial más grande de Colombia. Música tropical, vallenato y las mejores canciones del momento.`,
  genero: 'Tropical / Vallenato',
  stream_url: 'https://stream.zeno.fm/54c8fe3syd0uv',
  sitio_web: 'https://olimpicastereo.com.co',
  whatsapp: '',
  facebook: 'https://facebook.com/olimpicastereo',
  instagram: 'https://instagram.com/olimpicastereo',
  twitter: '',
  tiktok: '',
  youtube: '',
  activa: true,
}))

// ─── PASO 3: Insertar ──────────────────────────────────────
console.log(`\n📡 Insertando ${registros.length} estaciones de Olímpica Stereo...`)

const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/emisoras`, {
  method: 'POST',
  headers,
  body: JSON.stringify(registros)
})

console.log('Status insert:', insertRes.status, insertRes.statusText)
const result = await insertRes.json()

if (!insertRes.ok) {
  console.error('\n❌ ERROR al insertar:')
  console.error(JSON.stringify(result, null, 2))
} else {
  console.log(`\n✅ ¡ÉXITO! Se insertaron ${result.length} estaciones de Olímpica Stereo.`)
  result.forEach(e => console.log(`  ✔ ${e.nombre} — ${e.departamento} — ${e.frecuencia}`))
}
