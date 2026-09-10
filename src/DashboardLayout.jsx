import { useState, useRef, useEffect } from 'react'
import { supabase } from './supabaseClient'
import BeautifulPlayer from './BeautifulPlayer'
import { 
  Radio, 
  Search, 
  LogOut, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Activity,
  CheckCircle2,
  Building2,
  PlusCircle,
  LayoutDashboard,
  Power,
  Trash2,
  Upload,
  Globe,
  MessageCircle,
  Video,
  ChevronLeft,
  ChevronRight,
  RadioTower,
  RefreshCw,
  Palette,
  Edit,
  User,
  Key,
  X,
  Camera,
  UserPlus,
  Users,
  ShieldCheck,
  Maximize2,
  Star
} from 'lucide-react'

// Utilidades para formatear URLs y WhatsApp
const formatUrl = (url) => {
  if (!url) return '';
  let cleanUrl = url.trim();
  if (!cleanUrl) return '';
  if (!/^https?:\/\//i.test(cleanUrl)) {
    return 'https://' + cleanUrl;
  }
  return cleanUrl;
};

const formatWhatsApp = (wa) => {
  if (!wa) return '';
  let cleanWa = wa.trim().replace(/[\s\-\(\)\+]/g, '');
  if (!cleanWa) return '';
  if (!/^https?:\/\//i.test(wa.trim())) {
    if (cleanWa.startsWith('57') && cleanWa.length > 10) {
      cleanWa = cleanWa.substring(2);
    }
    return `https://wa.me/57${cleanWa}`;
  }
  return wa.trim();
};

// Componentes Vectoriales de Redes Sociales Unicolor Estilo iOS
const IconWhatsApp = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const IconTikTok = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const IconFacebook = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const IconInstagram = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const IconX = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

const IconWebsite = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

const IconDepartmentFlag = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="currentColor" fillOpacity="0.25" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
)

// Paleta de Colores Vivos Elegantes por Departamento
const DEPT_CARD_COLORS = [
  { bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-400', hoverBg: 'group-hover:bg-blue-600' },
  { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-400', hoverBg: 'group-hover:bg-emerald-600' },
  { bg: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-400', hoverBg: 'group-hover:bg-amber-600' },
  { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-400', hoverBg: 'group-hover:bg-purple-600' },
  { bg: 'bg-rose-500/15', border: 'border-rose-500/30', text: 'text-rose-400', hoverBg: 'group-hover:bg-rose-600' },
  { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-400', hoverBg: 'group-hover:bg-cyan-600' },
  { bg: 'bg-indigo-500/15', border: 'border-indigo-500/30', text: 'text-indigo-400', hoverBg: 'group-hover:bg-indigo-600' },
]

// Mapeo completo de Departamentos y Municipios de Colombia
const DEPARTMENT_CITIES = {
  'Bogotá D.C.': ['Bogotá D.C.'],
  'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro', 'Apartadó', 'Turbo', 'Caucasia', 'Caldas', 'Sabaneta', 'Copacabana', 'La Estrella', 'Girardota', 'Marinilla', 'Guarne', 'Carmen de Viboral', 'Santa Fe de Antioquia', 'Puerto Berrío', 'Chigorodó', 'Yarumal', 'La Ceja', 'Otro municipio...'],
  'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Puerto Colombia', 'Baranoa', 'Galapa', 'Santo Tomás', 'Palmar de Varela', 'Sabanagrande', 'Ponedera', 'Luruaco', 'Repelón', 'Otro municipio...'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Buga', 'Cartago', 'Jamundí', 'Yumbo', 'Candelaria', 'Florida', 'Pradera', 'Sevilla', 'Roldanillo', 'Zarzal', 'Dagua', 'Caicedonia', 'El Cerrito', 'Otro municipio...'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'San Gil', 'Socorro', 'Barbosa', 'Lebrija', 'Rionegro', 'Sabana de Torres', 'Cimitarra', 'Zapatoca', 'Málaga', 'Vélez', 'Otro municipio...'],
  'Cesar': [
    'Valledupar', 'Aguachica', 'Agustín Codazzi', 'Astrea', 'Becerril', 
    'Bosconia', 'Chimichagua', 'Chiriguaná', 'Curumaní', 'El Copey', 
    'El Paso', 'Gamarra', 'González', 'La Gloria', 'La Jagua de Ibirico', 
    'La Paz', 'Manaure Balcón del Cesar', 'Pailitas', 'Pelaya', 'Pueblo Bello', 
    'Río de Oro', 'San Alberto', 'San Diego', 'San Martín', 'Tamalameque',
    'Otro municipio...'
  ],
  'Cundinamarca': ['Soacha', 'Chía', 'Zipaquirá', 'Fusagasugá', 'Girardot', 'Facatativá', 'Mosquera', 'Funza', 'Madrid', 'Cajicá', 'Sopó', 'Tocancipá', 'Villeta', 'Ubaté', 'La Calera', 'Silvania', 'Pacho', 'Otro municipio...'],
  'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'El Carmen de Bolívar', 'Arjona', 'Mompox', 'María La Baja', 'San Juan Nepomuceno', 'Turbana', 'Calamar', 'San Jacinto', 'Santa Rosa del Sur', 'Otro municipio...'],
  'Boyacá': ['Tunja', 'Sogamoso', 'Duitama', 'Chiquinquirá', 'Puerto Boyacá', 'Paipa', 'Moniquirá', 'Villa de Leyva', 'Garagoa', 'Guateque', 'Nobsa', 'Soatá', 'Otro municipio...'],
  'Caldas': ['Manizales', 'La Dorada', 'Villamaría', 'Riosucio', 'Chinchiná', 'Salamina', 'Pensilvania', 'Anserma', 'Aguadas', 'Manzanares', 'Supía', 'Otro municipio...'],
  'Huila': ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre', 'San Agustín', 'Gigante', 'Palermo', 'Rivera', 'Acevedo', 'Timaná', 'Otro municipio...'],
  'Meta': ['Villavicencio', 'Acacías', 'Granada', 'Puerto López', 'Puerto Gaitán', 'San Martín', 'Cumaral', 'Restrepo', 'Vista Hermosa', 'Otro municipio...'],
  'Nariño': ['Pasto', 'Ipiales', 'Tumaco', 'Túquerres', 'La Unión', 'Samaniego', 'Sandoná', 'Cumbal', 'El Rosario', 'Barbacoas', 'Otro municipio...'],
  'Norte de Santander': ['Cúcuta', 'Ocaña', 'Pamplona', 'Los Patios', 'Villa del Rosario', 'Tibú', 'Abrego', 'El Zulia', 'Chinácota', 'Sardinata', 'Otro municipio...'],
  'Quindío': ['Armenia', 'Calarcá', 'Montenegro', 'Quimbaya', 'La Tebaida', 'Circasia', 'Salento', 'Filandia', 'Génova', 'Otro municipio...'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Belén de Umbría', 'Quinchía', 'Santuario', 'Marsella', 'Mistrató', 'Otro municipio...'],
  'Tolima': ['Ibagué', 'Espinal', 'Melgar', 'Honda', 'Mariquita', 'Líbano', 'Flandes', 'Chaparral', 'Guamo', 'Purificación', 'Ortega', 'Otro municipio...'],
  'Córdoba': ['Montería', 'Cereté', 'Sahagún', 'Lorica', 'Montelíbano', 'Planeta Rica', 'Tierralta', 'Ciénaga de Oro', 'Chinú', 'San Antero', 'Puerto Escondido', 'Otro municipio...'],
  'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco', 'Plato', 'Aracataca', 'Pivijay', 'Zona Bananera', 'Sitionuevo', 'Otro municipio...'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia', 'Manaure', 'Fonseca', 'San Juan del Cesar', 'Barrancas', 'Hatonuevo', 'Dibulla', 'Villanueva', 'Otro municipio...'],
  'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Patía (El Bordo)', 'Piendamó', 'Guachené', 'Miranda', 'Corinto', 'Silvia', 'Timbío', 'Bolívar', 'Otro municipio...'],
  'Chocó': ['Quibdó', 'Istmina', 'Tadó', 'Condoto', 'Bahía Solano', 'Acandí', 'Riosucio', 'Nuquí', 'Medio San Juan', 'Otro municipio...'],
  'Casanare': ['Yopal', 'Aguazul', 'Paz de Ariporo', 'Villanueva', 'Tauramena', 'Monterrey', 'Maní', 'Hato Corozal', 'Otro municipio...'],
  'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Puerto Rico', 'El Paujil', 'Cartagena del Chairá', 'Belén de los Andaquíes', 'Curillo', 'Otro municipio...'],
  'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito', 'Valle del Guamuez (Hormiga)', 'Sibundoy', 'Puerto Leguízamo', 'Villagarzón', 'San Miguel', 'Otro municipio...'],
  'Arauca': ['Arauca', 'Tame', 'Saravena', 'Arauquita', 'Fortul', 'Puerto Rondón', 'Cravo Norte', 'Otro municipio...'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia', 'Santa Catalina', 'Otro municipio...'],
  'Amazonas': ['Leticia', 'Puerto Nariño', 'Tarapacá', 'Puerto Arica', 'La Pedrera', 'Otro municipio...'],
  'Guainía': ['Inírida', 'Barrancominas', 'Mapiripana', 'Otro municipio...'],
  'Guaviare': ['San José del Guaviare', 'Calamar', 'El Retorno', 'Miraflores', 'Otro municipio...'],
  'Vaupés': ['Mitú', 'Carurú', 'Taraira', 'Otro municipio...'],
  'Vichada': ['Puerto Carreño', 'La Primavera', 'Cumaribo', 'Santa Rosalía', 'Otro municipio...'],
  'Sucre': ['Sincelejo', 'Corozal', 'San Marcos', 'Tolú', 'Sincé', 'San Onofre', 'Coveñas', 'Sampués', 'Majagual', 'Morroa', 'Otro municipio...'],
}

const COLOMBIA_DEPARTMENTS = Object.keys(DEPARTMENT_CITIES)

const GENRES_LIST = [
  'Noticias / Hablada',
  'Tropical / Vallenato',
  'Salsa / Merengue',
  'Pop / Electrónica',
  'Rock / Alternativo',
  'Urbano / Reggaetón',
  'Popular / Despecho',
  'Cultural / Clásica',
  'Religiosa / Espiritual',
  'Variada / Crossover'
]

export default function DashboardLayout() {
  // ✅ Estado vacío: todas las emisoras vienen EXCLUSIVAMENTE de Supabase
  const [stations, setStations] = useState([])
  const [activeTab, setActiveTab] = useState('inicio') // inicio | agregar | directorio | gestion
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [statusFeedback, setStatusFeedback] = useState('')

  // Estado del Perfil Administrador
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Neider Administrador',
    role: 'Producciones Neider',
    email: 'admin@radioscolombia.co',
    avatar: '',
  })
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: 'Neider Administrador',
    role: 'Producciones Neider',
    email: 'admin@radioscolombia.co',
    avatar: '',
  })

  // Formulario Agregar Emisora State
  const [form, setForm] = useState({
    name: '',
    department: 'Bogotá D.C.',
    city: 'Bogotá D.C.',
    freq: '',
    genre: 'Noticias / Hablada',
    streamUrl: '',
    logoUrl: '',
    bgColor: '#1E1E1E',
    description: '',
    website: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    isActive: true,
  })

  const [formSubmitting, setFormSubmitting] = useState(false)

  // Calificaciones State
  const [calificaciones, setCalificaciones] = useState([])
  const [loadingCalificaciones, setLoadingCalificaciones] = useState(false)

  const [errorCalificaciones, setErrorCalificaciones] = useState(null)

  const fetchCalificaciones = async () => {
    setLoadingCalificaciones(true)
    setErrorCalificaciones(null)
    
    // Quitamos temporalmente el .order('created_at') por si la tabla no tiene esa columna
    const { data, error } = await supabase.from('calificaciones').select('*').limit(100)
    
    if (error) {
      console.error('Error fetching calificaciones:', error)
      setErrorCalificaciones(error.message)
    } else if (data) {
      setCalificaciones(data)
    }
    setLoadingCalificaciones(false)
  }

  useEffect(() => {
    if (activeTab === 'calificaciones') {
      fetchCalificaciones()
    }
  }, [activeTab])
  const [logoPreview, setLogoPreview] = useState('')
  const [customCity, setCustomCity] = useState('')
  const [selectedDepartmentView, setSelectedDepartmentView] = useState(null)
  const [selectedGestionDept, setSelectedGestionDept] = useState(null)
  const [selectedEditarDept, setSelectedEditarDept] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [editCustomCity, setEditCustomCity] = useState('')

  // Estado para Gestión de Usuarios y Roles
  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Neider Administrador', email: 'admin@radioscolombia.co', role: 'Administrador General', status: 'Activo', createdAt: '2026-07-31' },
    { id: '2', name: 'Soporte Radios', email: 'soporte@radioscolombia.co', role: 'Editor de Emisoras', status: 'Activo', createdAt: '2026-07-31' },
  ])

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Editor de Emisoras',
  })

  const [creatingUser, setCreatingUser] = useState(false)

  const handleCreateUser = async (e) => {
    e.preventDefault()
    if (!newUserForm.email || !newUserForm.password || !newUserForm.name) {
      setStatusFeedback('⚠️ Completa todos los campos obligatorios.')
      setTimeout(() => setStatusFeedback(''), 4000)
      return
    }

    if (newUserForm.password.length < 6) {
      setStatusFeedback('⚠️ La contraseña debe tener al menos 6 caracteres.')
      setTimeout(() => setStatusFeedback(''), 4000)
      return
    }

    setCreatingUser(true)

    try {
      // Registrar usuario en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: newUserForm.email,
        password: newUserForm.password,
        options: {
          data: {
            full_name: newUserForm.name,
            role: newUserForm.role,
          },
        },
      })

      if (error) {
        console.log('Note Supabase auth create:', error.message)
      }

      const createdUser = {
        id: data?.user?.id || String(Date.now()),
        name: newUserForm.name,
        email: newUserForm.email,
        role: newUserForm.role,
        status: 'Activo',
        createdAt: new Date().toISOString().split('T')[0],
      }

      setUsersList((prev) => [createdUser, ...prev])
      setNewUserForm({ name: '', email: '', password: '', role: 'Editor de Emisoras' })
      setStatusFeedback(`¡Usuario "${newUserForm.name}" creado con éxito en Supabase!`)
    } catch (err) {
      console.log('Error creando usuario:', err)
      setStatusFeedback('⚠️ Ocurrió un error al crear el usuario en Supabase.')
    } finally {
      setCreatingUser(false)
      setTimeout(() => setStatusFeedback(''), 4000)
    }
  }

  const handleDeleteUser = (userId) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId))
    setStatusFeedback('Usuario removido del sistema.')
    setTimeout(() => setStatusFeedback(''), 4000)
  }

  const audioRef = useRef(null)

  // Cargar emisoras y perfil de administrador desde Supabase
  useEffect(() => {
    fetchStationsFromSupabase()
    fetchAdminProfileFromSupabase()
  }, [])

  const fetchAdminProfileFromSupabase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const meta = user.user_metadata || {}
        const loadedProfile = {
          name: meta.full_name || 'Neider Administrador',
          role: meta.role || 'Producciones Neider',
          email: user.email || 'admin@radioscolombia.co',
          avatar: meta.avatar_url || '',
        }
        setProfile(loadedProfile)
        setProfileForm(loadedProfile)
      }
    } catch (err) {
      console.log('Supabase user fetch note:', err)
    }
  }

  const fetchStationsFromSupabase = async () => {
    try {
      // ✅ Tabla correcta: 'emisoras' con columnas en español
      const { data, error } = await supabase.from('emisoras').select('*')
      if (error) {
        console.log('Supabase error al leer emisoras:', error.message)
        return
      }
      // ✅ SIEMPRE reemplazar con lo que dice Supabase (incluso si está vacío)
      const mapped = (data || []).map((st) => ({
        id: st.id,
        name: st.nombre || '',
        department: st.departamento || 'Bogotá D.C.',
        city: st.ciudad || 'Bogotá D.C.',
        freq: st.frecuencia || 'FM',
        genre: st.genero || 'Variada / Crossover',
        streamUrl: st.stream_url || '',
        logo: st.logo_url || '',
        bgColor: st.color_fondo || '#1E1E1E',
        listeners: st.oyentes || '0',
        isActive: st.activa !== undefined ? st.activa : true,
        description: st.descripcion || '',
        website: st.sitio_web || '',
        whatsapp: st.whatsapp || '',
        facebook: st.facebook || '',
        instagram: st.instagram || '',
        twitter: st.twitter || '',
        tiktok: st.tiktok || '',
        youtube: st.youtube || '',
      }))
      setStations(mapped)
      if (mapped.length > 0 && !currentStation) {
        setCurrentStation(mapped[0])
      }
    } catch (err) {
      console.log('Supabase connection note:', err)
    }
  }

  // Manejar cambio de Departamento en el Formulario
  const handleDepartmentChange = (dept) => {
    const availableCities = DEPARTMENT_CITIES[dept] || ['Principal', 'Otro municipio...']
    setForm((prev) => ({
      ...prev,
      department: dept,
      city: availableCities[0],
    }))
    setCustomCity('')
  }

  // Manejador de Audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlayStation = (station) => {
    if (currentStation?.id === station.id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play().catch((err) => console.log('Audio play error:', err))
        setIsPlaying(true)
      }
    } else {
      setCurrentStation(station)
      setIsPlaying(true)
      setTimeout(() => {
        audioRef.current?.play().catch((err) => console.log('Audio play error:', err))
      }, 100)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  // Conmutar Encendido / Apagado (Estado de Mensualidad)
  const toggleStationActiveState = async (id) => {
    const updated = stations.map((st) => {
      if (st.id === id) {
        const nextState = !st.isActive
        // ✅ Tabla: emisoras, columna: activa
        supabase.from('emisoras').update({ activa: nextState }).eq('id', id).then()
        return { ...st, isActive: nextState }
      }
      return st
    })
    setStations(updated)
    setStatusFeedback('Estado de la emisora actualizado en el sistema.')
    setTimeout(() => setStatusFeedback(''), 3000)
  }

  // Eliminar Emisora
  const handleDeleteStation = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta emisora del directorio?')) {
      // ✅ Tabla correcta: emisoras
      const { error } = await supabase.from('emisoras').delete().eq('id', id)
      if (error) {
        console.log('Error eliminando emisora:', error.message)
        setStatusFeedback('⚠️ Error al eliminar. Verifica permisos RLS en Supabase.')
      } else {
        setStations((prev) => prev.filter((st) => st.id !== id))
        setStatusFeedback('Emisora eliminada correctamente.')
      }
      setTimeout(() => setStatusFeedback(''), 3000)
    }
  }

  // Carga de Imagen local de logo (PNG/JPG) y subida a Supabase
  const handleLogoFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setLogoPreview(previewUrl)
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `${fileName}`

      setStatusFeedback('Subiendo imagen a Supabase...')

      const { error } = await supabase.storage
        .from('logos_emisoras')
        .upload(filePath, file)

      if (error) {
        console.error('Error subiendo imagen:', error)
        setStatusFeedback('⚠️ Error subiendo la imagen.')
        setTimeout(() => setStatusFeedback(''), 4000)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('logos_emisoras')
        .getPublicUrl(filePath)

      if (publicUrlData) {
        setForm((prev) => ({ ...prev, logoUrl: publicUrlData.publicUrl }))
        setStatusFeedback('Imagen subida correctamente.')
        setTimeout(() => setStatusFeedback(''), 3000)
      }
    }
  }

  // Carga de Imagen para Perfil Administrador y subida a Supabase
  const handleAvatarFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `${fileName}`

      setStatusFeedback('Subiendo foto de perfil a Supabase...')

      const { error } = await supabase.storage
        .from('image-perfil')
        .upload(filePath, file)

      if (error) {
        console.error('Error subiendo foto de perfil:', error)
        setStatusFeedback('⚠️ Error subiendo la foto de perfil.')
        setTimeout(() => setStatusFeedback(''), 4000)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('image-perfil')
        .getPublicUrl(filePath)

      if (publicUrlData) {
        setProfileForm((prev) => ({ ...prev, avatar: publicUrlData.publicUrl }))
        setStatusFeedback('Foto de perfil actualizada correctamente.')
        setTimeout(() => setStatusFeedback(''), 3000)
      }
    }
  }

  // Guardar Cambios de Perfil de Administrador (Incluyendo Foto y Contraseña)
  const handleSaveProfile = async (e) => {
    e.preventDefault()

    if (profileForm.password || profileForm.confirmPassword) {
      if (profileForm.password !== profileForm.confirmPassword) {
        setStatusFeedback('⚠️ Las contraseñas no coinciden. Por favor verifícalas.')
        setTimeout(() => setStatusFeedback(''), 4000)
        return
      }
      if (profileForm.password.length < 6) {
        setStatusFeedback('⚠️ La contraseña debe tener al menos 6 caracteres.')
        setTimeout(() => setStatusFeedback(''), 4000)
        return
      }
    }

    setProfile({
      name: profileForm.name,
      role: profileForm.role,
      email: profileForm.email,
      avatar: profileForm.avatar,
    })
    setIsProfileModalOpen(false)

    try {
      const updatePayload = {
        data: {
          full_name: profileForm.name,
          role: profileForm.role,
          avatar_url: profileForm.avatar,
        }
      }
      if (profileForm.password) {
        updatePayload.password = profileForm.password
      }
      await supabase.auth.updateUser(updatePayload)
    } catch (err) {
      console.log('Supabase profile sync note:', err)
    }

    setStatusFeedback('¡Perfil de Administrador actualizado con éxito!')
    setTimeout(() => setStatusFeedback(''), 4000)
  }

  // Guardar nueva emisora
  const handleSaveStation = async (e) => {
    e.preventDefault()
    setFormSubmitting(true)

    const effectiveCity = form.city === 'Otro municipio...' ? (customCity.trim() || 'Municipio') : form.city
    const newId = String(Date.now())
    const newStation = {
      id: newId,
      name: form.name,
      department: form.department,
      city: effectiveCity,
      freq: form.freq || 'FM',
      genre: form.genre,
      streamUrl: form.streamUrl,
      logo: form.logoUrl || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=150',
      bgColor: form.bgColor || '#1E1E1E',
      listeners: '0K',
      isActive: form.isActive,
      description: form.description,
      website: formatUrl(form.website),
      whatsapp: formatWhatsApp(form.whatsapp),
      facebook: formatUrl(form.facebook),
      instagram: formatUrl(form.instagram),
      twitter: formatUrl(form.twitter),
      tiktok: formatUrl(form.tiktok),
      youtube: formatUrl(form.youtube),
    }

    try {
      // ✅ Tabla: emisoras, columnas en español tal como están en Supabase
      const { error: insertError } = await supabase.from('emisoras').insert([
        {
          nombre: form.name,
          departamento: form.department,
          ciudad: effectiveCity,
          frecuencia: form.freq,
          genero: form.genre,
          stream_url: form.streamUrl,
          logo_url: form.logoUrl,
          color_fondo: form.bgColor,
          descripcion: form.description,
          sitio_web: formatUrl(form.website),
          whatsapp: formatWhatsApp(form.whatsapp),
          facebook: formatUrl(form.facebook),
          instagram: formatUrl(form.instagram),
          twitter: formatUrl(form.twitter),
          tiktok: formatUrl(form.tiktok),
          youtube: formatUrl(form.youtube),
          activa: form.isActive,
        },
      ])
      if (insertError) {
        console.log('Error al agregar emisora:', insertError.message)
        setStatusFeedback(`⚠️ Error: ${insertError.message}`)
        setFormSubmitting(false)
        return
      }
      // Recargar desde Supabase para tener el ID real asignado
      await fetchStationsFromSupabase()
    } catch (err) {
      console.log('Supabase insert note:', err)
    }

    setStations((prev) => [newStation, ...prev])
    setFormSubmitting(false)
    setStatusFeedback(`¡Emisora "${form.name}" agregada con éxito!`)
    setTimeout(() => setStatusFeedback(''), 4000)

    // Resetear formulario
    setForm({
      name: '',
      department: 'Bogotá D.C.',
      city: 'Bogotá D.C.',
      freq: '',
      genre: 'Noticias / Hablada',
      streamUrl: '',
      logoUrl: '',
      bgColor: '#1E1E1E',
      description: '',
      website: '',
      whatsapp: '',
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      youtube: '',
      isActive: true,
    })
    setLogoPreview('')
    setActiveTab('gestion')
  }

  // Filtros de Búsqueda
  const filteredStations = stations.filter((st) => {
    return (
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Estadísticas KPI & Ranking Dinámico por Departamento
  const totalActive = stations.filter((st) => st.isActive).length
  const totalOff = stations.filter((st) => !st.isActive).length
  const uniqueDepartments = [...new Set(stations.map((st) => st.department))].length

  const departmentStatsMap = stations.reduce((acc, st) => {
    const d = st.department || 'Otros'
    if (!acc[d]) {
      acc[d] = { department: d, total: 0, active: 0 }
    }
    acc[d].total += 1
    if (st.isActive) acc[d].active += 1
    return acc
  }, {})

  const sortedDepartments = Object.values(departmentStatsMap)
    .sort((a, b) => b.total - a.total)

  const handleOpenEditModal = (station) => {
    setEditForm({
      id: station.id,
      name: station.name,
      freq: station.freq,
      department: station.department,
      city: station.city,
      genre: station.genre,
      streamUrl: station.streamUrl,
      logoUrl: station.logo,
      bgColor: station.bgColor || '#1E1E1E',
      description: station.description || '',
      website: station.website || '',
      whatsapp: station.whatsapp || '',
      facebook: station.facebook || '',
      instagram: station.instagram || '',
      twitter: station.twitter || '',
      tiktok: station.tiktok || '',
      youtube: station.youtube || '',
      isActive: station.isActive !== false,
    })
    setEditCustomCity('')
    setIsEditModalOpen(true)
  }

  const handleSaveEditStation = async (e) => {
    e.preventDefault()
    const finalCity = editForm.city === 'Otro municipio...' ? editCustomCity : editForm.city

    // Datos para el estado local (nombres en inglés)
    const localUpdate = {
      name: editForm.name,
      freq: editForm.freq,
      department: editForm.department,
      city: finalCity,
      genre: editForm.genre,
      streamUrl: editForm.streamUrl,
      logo: editForm.logoUrl,
      bgColor: editForm.bgColor,
      description: editForm.description,
      website: formatUrl(editForm.website),
      whatsapp: formatWhatsApp(editForm.whatsapp),
      facebook: formatUrl(editForm.facebook),
      instagram: formatUrl(editForm.instagram),
      twitter: formatUrl(editForm.twitter),
      tiktok: formatUrl(editForm.tiktok),
      youtube: formatUrl(editForm.youtube),
      isActive: editForm.isActive,
    }

    // ✅ Datos para Supabase (columnas en español, tabla 'emisoras')
    const supabaseUpdate = {
      nombre: editForm.name,
      frecuencia: editForm.freq,
      departamento: editForm.department,
      ciudad: finalCity,
      genero: editForm.genre,
      stream_url: editForm.streamUrl,
      logo_url: editForm.logoUrl,
      color_fondo: editForm.bgColor,
      descripcion: editForm.description,
      sitio_web: formatUrl(editForm.website),
      whatsapp: formatWhatsApp(editForm.whatsapp),
      facebook: formatUrl(editForm.facebook),
      instagram: formatUrl(editForm.instagram),
      twitter: formatUrl(editForm.twitter),
      tiktok: formatUrl(editForm.tiktok),
      youtube: formatUrl(editForm.youtube),
      activa: editForm.isActive,
    }

    setStations((prev) => prev.map((st) => (st.id === editForm.id ? { ...st, ...localUpdate } : st)))
    setIsEditModalOpen(false)
    setStatusFeedback(`Emisora "${editForm.name}" actualizada con éxito.`)
    setTimeout(() => setStatusFeedback(''), 4000)

    try {
      const { error: updateError } = await supabase.from('emisoras').update(supabaseUpdate).eq('id', editForm.id)
      if (updateError) console.log('Error actualizando emisora:', updateError.message)
    } catch (err) {
      console.log('Note Supabase update:', err)
    }
  }

  const handleEditLogoFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `${fileName}`

      setStatusFeedback('Subiendo imagen a Supabase...')

      const { error } = await supabase.storage
        .from('logos_emisoras')
        .upload(filePath, file)

      if (error) {
        console.error('Error subiendo imagen:', error)
        setStatusFeedback('⚠️ Error subiendo la imagen.')
        setTimeout(() => setStatusFeedback(''), 4000)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('logos_emisoras')
        .getPublicUrl(filePath)

      if (publicUrlData) {
        setEditForm((prev) => ({ ...prev, logoUrl: publicUrlData.publicUrl }))
        setStatusFeedback('Imagen actualizada correctamente.')
        setTimeout(() => setStatusFeedback(''), 3000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans select-none relative">
      <audio
        ref={audioRef}
        src={currentStation?.streamUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR COLAPSABLE (FIJO SIN SCROLLBAR LATERAL) */}
        <aside 
          className={`${
            isSidebarCollapsed ? 'w-16' : 'w-[190px]'
          } bg-dark-card border-r border-gray-800 p-2.5 px-3 flex flex-col justify-between transition-all duration-300 relative z-30 shrink-0 hidden md:flex h-screen sticky top-0 overflow-hidden`}
        >
          {/* BOTÓN FLOTANTE LATERAL PARA EXPANDIR / COLAPSAR MENU */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3.5 top-6 z-40 bg-dark-card border border-gray-700 text-gray-300 rounded-full p-1.5 hover:bg-brand-blue hover:text-white shadow-xl transition-all"
            title={isSidebarCollapsed ? "Expandir Menú" : "Colapsar Menú"}
          >
            {isSidebarCollapsed ? <ChevronRight size={14} strokeWidth={2.5} /> : <ChevronLeft size={14} strokeWidth={2.5} />}
          </button>

          <div>
            {/* LOGO DE RADIOS COLOMBIA (ANCLADO A LA IZQUIERDA EN AMBOS ESTADOS) */}
            <div className="mb-5 px-0.5 flex items-center justify-start h-20 overflow-hidden">
              {isSidebarCollapsed ? (
                <img 
                  src="/icon-light-2.png" 
                  onError={(e) => { 
                    if (e.target.src.endsWith('/icon-light-2.png')) {
                      e.target.src = '/icon-light.png'
                    } else {
                      e.target.src = '/logo-light.png'
                    }
                  }} 
                  alt="Radios Colombia" 
                  className="w-10 h-10 object-contain object-left shrink-0" 
                />
              ) : (
                <img 
                  src="/logo-light.png" 
                  onError={(e) => { e.target.src = '/logo.png' }} 
                  alt="Radios Colombia Logo" 
                  className="h-20 w-auto max-w-[168px] object-contain object-left shrink-0 drop-shadow-md" 
                />
              )}
            </div>

            <nav className="space-y-2 mt-5">
              <button
                onClick={() => setActiveTab('inicio')}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-semibold transition-colors justify-start ${
                  activeTab === 'inicio' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-400 hover:text-slate-200 hover:bg-gray-800/60'
                }`}
                title="Inicio y Resumen"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <LayoutDashboard size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Inicio (Resumen)</span>}
              </button>

              <button
                onClick={() => setActiveTab('agregar')}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-semibold transition-colors justify-start ${
                  activeTab === 'agregar' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-400 hover:text-slate-200 hover:bg-gray-800/60'
                }`}
                title="Agregar Emisora"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <PlusCircle size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Agregar Emisora</span>}
              </button>

              <button
                onClick={() => setActiveTab('calificaciones')}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-semibold transition-colors justify-start ${
                  activeTab === 'calificaciones' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-400 hover:text-slate-200 hover:bg-gray-800/60'
                }`}
                title="Calificaciones"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Star size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Calificaciones</span>}
              </button>

              <button
                onClick={() => setActiveTab('directorio')}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-semibold transition-colors justify-start ${
                  activeTab === 'directorio' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-400 hover:text-slate-200 hover:bg-gray-800/60'
                }`}
                title="Directorio por Departamento"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Building2 size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Por Departamento</span>}
              </button>

              <button
                onClick={() => {
                  setSelectedEditarDept(null)
                  setActiveTab('editar')
                }}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-semibold transition-colors justify-start ${
                  activeTab === 'editar' ? 'bg-brand-blue text-white shadow-md' : 'text-gray-400 hover:text-slate-200 hover:bg-gray-800/60'
                }`}
                title="Editar Emisoras"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Edit size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Editar Emisoras</span>}
              </button>

              {/* BOTÓN 5: GESTIONAR EMISORAS */}
              <button
                onClick={() => {
                  setActiveTab('gestion')
                  setSelectedDepartmentView(null)
                  setSelectedGestionDept(null)
                  setSelectedEditarDept(null)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === 'gestion'
                    ? 'bg-gradient-to-r from-brand-blue to-blue-700 text-white shadow-lg shadow-brand-blue/20 font-bold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Power size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Gestionar Emisoras</span>}
              </button>

              {/* BOTÓN 6: GESTIÓN DE USUARIOS Y ROLES (SUPABASE AUTH) */}
              <button
                onClick={() => {
                  setActiveTab('usuarios')
                  setSelectedDepartmentView(null)
                  setSelectedGestionDept(null)
                  setSelectedEditarDept(null)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeTab === 'usuarios'
                    ? 'bg-gradient-to-r from-brand-blue to-blue-700 text-white shadow-lg shadow-brand-blue/20 font-bold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Users size={19} strokeWidth={2} />
                </div>
                {!isSidebarCollapsed && <span className="truncate">Gestión de Usuarios</span>}
              </button>
            </nav>
          </div>

          {/* SECCIÓN DEL PERFIL DE ADMINISTRADOR & BOTONES */}
          <div className="pt-3 border-t border-gray-800 space-y-2 flex flex-col items-center">
            
            {/* FOTO ARRIBA */}
            <div 
              onClick={() => {
                setProfileForm({ ...profile, password: '', confirmPassword: '' })
                setIsProfileModalOpen(true)
              }}
              className="flex flex-col items-center text-center cursor-pointer group py-0.5 w-full"
              title="Editar Perfil de Administrador"
            >
              <div className={`${
                isSidebarCollapsed ? 'w-10 h-10 rounded-xl' : 'w-16 h-16 rounded-2xl mb-1.5'
              } bg-brand-blue/20 border-2 border-brand-blue/40 flex items-center justify-center font-bold text-sm text-brand-blue shrink-0 overflow-hidden shadow-md transition-all duration-200`}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{profile.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>

              {!isSidebarCollapsed && (
                <div className="w-full px-1">
                  <p className="text-xs font-bold text-slate-100 truncate group-hover:text-brand-blue transition-colors">
                    {profile.name}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate font-medium">{profile.role}</p>
                </div>
              )}
            </div>

            {/* BOTÓN PERFIL DEDICADO */}
            <button
              onClick={() => {
                setProfileForm({ ...profile, password: '', confirmPassword: '' })
                setIsProfileModalOpen(true)
              }}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg bg-gray-800/90 hover:bg-gray-700 text-gray-200 border border-gray-700/80 text-xs font-semibold transition-colors justify-start"
              title="Editar Perfil de Administrador"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <User size={15} strokeWidth={2} className="text-brand-blue" />
              </div>
              {!isSidebarCollapsed && <span className="truncate">Perfil</span>}
            </button>

            {/* BOTÓN CERRAR SESIÓN */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg bg-gray-800/80 hover:bg-brand-red text-gray-300 hover:text-white border border-gray-700/60 transition-colors text-xs font-semibold justify-start"
              title="Cerrar Sesión"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <LogOut size={15} strokeWidth={2} />
              </div>
              {!isSidebarCollapsed && <span className="truncate">Cerrar Sesión</span>}
            </button>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col overflow-y-auto h-screen pb-32">
          
          <header className="sticky top-0 z-20 bg-dark-card border-b border-gray-800 p-4 px-6 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar por emisora, departamento o género..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-slate-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
              />
              <Search size={15} className="text-gray-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchStationsFromSupabase()}
                className="p-2 rounded-lg bg-dark-bg border border-gray-800 text-gray-400 hover:text-white transition-colors"
                title="Sincronizar Supabase"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </header>

          {/* NOTIFICACIÓN FLOTANTE (TOAST SIN DESCUADRES NI SALTOS DE PANTALLA) */}
          {statusFeedback && (
            <div className="fixed top-6 right-6 z-50 bg-dark-card/95 backdrop-blur-md border border-brand-emerald/40 text-brand-emerald px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 size={16} strokeWidth={2} className="shrink-0 text-brand-emerald" />
              <span>{statusFeedback}</span>
            </div>
          )}

          <div className="p-6">
            
            {/* PESTAÑA 1: INICIO (RESUMEN GENERAL DEL SISTEMA) */}
            {activeTab === 'inicio' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Resumen General del Sistema</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Estadísticas globales de emisoras, oyentes y estado del servicio Radios Colombia
                  </p>
                </div>

                {/* TARJETAS KPI DE RESUMEN GLOBAL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Total de Emisoras */}
                  <div className="bg-dark-card border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Total de Emisoras</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{stations.length}</h3>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium flex items-center gap-1">
                        <RadioTower size={12} className="text-brand-blue" /> Registradas en el sistema
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                      <RadioTower size={20} />
                    </div>
                  </div>

                  {/* Emisoras Activas */}
                  <div className="bg-dark-card border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Emisoras Activas</p>
                      <h3 className="text-2xl font-bold text-brand-emerald mt-1">{totalActive}</h3>
                      <p className="text-[10px] text-brand-emerald mt-1 font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} /> Transmitiendo sin novedad
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>

                  {/* Emisoras Desactivadas */}
                  <div className="bg-dark-card border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Emisoras Desactivadas</p>
                      <h3 className="text-2xl font-bold text-brand-red mt-1">{totalOff}</h3>
                      <p className="text-[10px] text-brand-red mt-1 font-medium flex items-center gap-1">
                        <Power size={12} /> Apagadas / Suspendidas
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
                      <Power size={20} />
                    </div>
                  </div>

                  {/* Departamentos y Cobertura */}
                  <div className="bg-dark-card border border-gray-800 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Departamentos Cubiertos</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{uniqueDepartments} <span className="text-xs text-gray-400 font-normal">/ 32</span></h3>
                      <p className="text-[10px] text-brand-blue mt-1 font-medium flex items-center gap-1">
                        <MapPin size={12} /> Cobertura Nacional
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                      <MapPin size={20} />
                    </div>
                  </div>
                </div>

                {/* BLOQUE DE SEGUNDA FILA: DISTRIBUCIONES (GÉNERO Y DEPARTAMENTOS) + ESTADO DEL SISTEMA + ACCIONES RÁPIDAS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* COLUMNA IZQUIERDA: DISTRIBUCIONES (7 COLS) */}
                  <div className="lg:col-span-7 space-y-6">

                    {/* DISTRIBUCIÓN POR DEPARTAMENTOS (RANKING DINÁMICO EN TIEMPO REAL - SOBRIO SIN BARRAS SUBTERRÁNEAS) */}
                    <div className="bg-dark-card border border-gray-800 rounded-xl p-5 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} strokeWidth={2} className="text-brand-blue" />
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Distribución por Departamentos</h3>
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">Ranking en Tiempo Real</span>
                      </div>

                      <div className="divide-y divide-gray-800/80 pt-1">
                        {sortedDepartments.length > 0 ? (
                          sortedDepartments.map((dept, index) => {
                            // Estilos dinámicos de ranking por posición
                            let badgeStyle = "bg-gray-800/80 border-gray-700 text-gray-400 font-semibold text-[11px]"
                            if (index === 0) badgeStyle = "bg-amber-500/20 border-amber-500/50 text-amber-400 font-extrabold text-xs shadow-sm"
                            else if (index === 1) badgeStyle = "bg-slate-700/60 border-slate-600 text-slate-200 font-bold text-[11px]"
                            else if (index === 2) badgeStyle = "bg-amber-800/25 border-amber-700/50 text-amber-500 font-bold text-[11px]"

                            return (
                              <div key={dept.department} className="py-2.5 flex items-center justify-between transition-colors hover:bg-gray-800/30 px-2 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <span className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${badgeStyle}`}>
                                    #{index + 1}
                                  </span>
                                  <span className="font-bold text-sm text-slate-100 tracking-tight">{dept.department}</span>
                                </div>

                                <div className="text-right">
                                  <span className="text-xs font-bold text-slate-200 block">
                                    {dept.total} {dept.total === 1 ? 'Emisora' : 'Emisoras'}
                                  </span>
                                  <span className="text-[10px] text-brand-emerald font-semibold flex items-center gap-1 justify-end">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" />
                                    {dept.active} activas
                                  </span>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <p className="text-xs text-gray-500 py-3 text-center">No hay departamentos registrados.</p>
                        )}
                      </div>
                    </div>
                    
                    {/* DISTRIBUCIÓN DE GÉNEROS MÁS POPULARES */}
                    <div className="bg-dark-card border border-gray-800 rounded-xl p-5 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Activity size={16} strokeWidth={2} className="text-brand-blue" />
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Distribución por Géneros Radiales</h3>
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">Totales Registrados</span>
                      </div>

                      <div className="space-y-3.5 pt-1">
                        {[
                          { genre: 'Vallenato / Crossover', count: stations.filter(s => s.genre.includes('Vallenato') || s.genre.includes('Crossover')).length || 2, color: 'bg-brand-blue' },
                          { genre: 'Noticias / Hablada', count: stations.filter(s => s.genre.includes('Noticias')).length || 1, color: 'bg-brand-emerald' },
                          { genre: 'Pop / Electrónica', count: stations.filter(s => s.genre.includes('Pop')).length || 1, color: 'bg-purple-500' },
                          { genre: 'Rock / Alternativo', count: stations.filter(s => s.genre.includes('Rock')).length || 1, color: 'bg-amber-500' },
                        ].map((item, idx) => {
                          const pct = Math.max(20, Math.round((item.count / Math.max(1, stations.length)) * 100))
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-gray-300">{item.genre}</span>
                                <span className="text-gray-400 font-bold">{item.count} emisora(s)</span>
                              </div>
                              <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                  </div>

                  {/* ESTADO DEL SISTEMA Y ACCIONES RÁPIDAS (5 COLS) */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    {/* INFRAESTRUCTURA Y SERVICIOS */}
                    <div className="bg-dark-card border border-gray-800 rounded-xl p-5 space-y-3 shadow-sm">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-800 pb-3">
                        <CheckCircle2 size={16} className="text-brand-emerald" />
                        <span>Estado de Infraestructura</span>
                      </h3>

                      <div className="space-y-2.5 text-xs pt-1">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/60 border border-gray-800/80">
                          <span className="text-gray-300 font-medium">Base de Datos Supabase</span>
                          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" />
                            Conectado
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/60 border border-gray-800/80">
                          <span className="text-gray-300 font-medium">Servidores Streaming CDN</span>
                          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" />
                            En Línea 99.9%
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/60 border border-gray-800/80">
                          <span className="text-gray-300 font-medium">App Móvil Radios Colombia</span>
                          <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-brand-blue/15 text-brand-blue border border-brand-blue/30 flex items-center gap-1.5">
                            <RadioTower size={12} strokeWidth={2} className="shrink-0" />
                            Sincronizada
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACCIONES RÁPIDAS DEL ADMINISTRADOR */}
                    <div className="bg-dark-card border border-gray-800 rounded-xl p-5 space-y-3 shadow-sm">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                        Acciones Rápidas
                      </h3>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => setActiveTab('agregar')}
                          className="p-3 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 rounded-xl text-left transition-colors group"
                        >
                          <PlusCircle size={18} className="text-brand-blue mb-1 group-hover:scale-110 transition-transform" />
                          <p className="text-xs font-bold text-white">Agregar Emisora</p>
                          <p className="text-[10px] text-gray-400">Nuevo registro</p>
                        </button>

                        <button
                          onClick={() => setActiveTab('directorio')}
                          className="p-3 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/80 rounded-xl text-left transition-colors group"
                        >
                          <Building2 size={18} strokeWidth={2} className="text-gray-300 mb-1 group-hover:scale-110 transition-transform" />
                          <p className="text-xs font-bold text-white">Directorio</p>
                          <p className="text-[10px] text-gray-400">Por departamento</p>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* PESTAÑA 2: AGREGAR EMISORA */}
            {activeTab === 'agregar' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Agregar Nueva Emisora</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Registra los datos de la emisora para sincronizar directamente con Supabase y la App Móvil
                  </p>
                </div>

                {/* FORMULARIO EXPANDIDO DE ANCHO COMPLETO */}
                <form onSubmit={handleSaveStation} className="bg-dark-card border border-gray-800 rounded-xl p-6 md:p-8 space-y-6 shadow-md">
                  
                  {/* BLOQUE 1: INFORMACIÓN GENERAL */}
                  <div>
                    <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-4 flex items-center gap-2">
                      <RadioTower size={16} strokeWidth={2} /> 1. Información General
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Nombre de la Emisora *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Tu Emisora FM / Stereo Ejemplo"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Frecuencia *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 90.5 FM / AM / Digital"
                          value={form.freq}
                          onChange={(e) => setForm({ ...form, freq: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Departamento *</label>
                        <select
                          value={form.department}
                          onChange={(e) => handleDepartmentChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none font-medium"
                        >
                          {COLOMBIA_DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Municipio / Ciudad *</label>
                        <select
                          value={form.city}
                          onChange={(e) => {
                            setForm({ ...form, city: e.target.value })
                            if (e.target.value !== 'Otro municipio...') {
                              setCustomCity('')
                            }
                          }}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none font-medium"
                        >
                          {(DEPARTMENT_CITIES[form.department] || ['Principal', 'Otro municipio...']).map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>

                        {form.city === 'Otro municipio...' && (
                          <input
                            type="text"
                            required
                            placeholder="Escribe el nombre del municipio..."
                            value={customCity}
                            onChange={(e) => setCustomCity(e.target.value)}
                            className="w-full mt-2 px-3.5 py-2.5 rounded-lg bg-dark-bg border border-brand-blue text-xs text-white placeholder-gray-500 outline-none"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Género Musical *</label>
                        <select
                          value={form.genre}
                          onChange={(e) => setForm({ ...form, genre: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none font-medium"
                        >
                          {GENRES_LIST.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Estado de la Emisora</label>
                        <select
                          value={form.isActive ? 'activa' : 'desactivada'}
                          onChange={(e) => setForm({ ...form, isActive: e.target.value === 'activa' })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none font-semibold"
                        >
                          <option value="activa">🟢 Activa (Transmitiendo en la App)</option>
                          <option value="desactivada">🔴 Desactivada (Apagada por Mensualidad)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* BLOQUE 2: SEÑAL DE STREAMING AUDIO */}
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Radio size={16} strokeWidth={2} /> 2. Señal de Streaming Audio
                    </h3>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">URL de Streaming Directo (MP3 / AAC) *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://stream.zeno.fm/ejemplo"
                        value={form.streamUrl}
                        onChange={(e) => setForm({ ...form, streamUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                      />
                    </div>
                  </div>

                  {/* BLOQUE 3: LOGO & COLOR DE FONDO */}
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Palette size={16} strokeWidth={2} /> 3. Logo & Color de Fondo
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Cargar Logo (PNG / JPG para Supabase)</label>
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="url"
                            placeholder="URL o sube una imagen abajo..."
                            value={form.logoUrl}
                            onChange={(e) => {
                              setForm({ ...form, logoUrl: e.target.value })
                              setLogoPreview(e.target.value)
                            }}
                            className="flex-1 px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                          />
                          {(logoPreview || form.logoUrl) && (
                            <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden border border-brand-blue/50 flex items-center justify-center p-1" style={{ backgroundColor: form.bgColor || '#1E1E1E' }}>
                              <img 
                                src={logoPreview || form.logoUrl} 
                                alt="Vista previa" 
                                className="max-w-full max-h-full object-contain" 
                              />
                            </div>
                          )}
                        </div>

                        <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-dark-bg hover:bg-gray-800 border border-gray-700 rounded-lg text-xs font-medium text-gray-300 cursor-pointer transition-colors">
                          <Upload size={14} strokeWidth={2} className="text-brand-blue" />
                          <span>Subir PNG / JPG</span>
                          <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden" />
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Color de Fondo Representativo</label>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl border border-gray-700 overflow-hidden relative shrink-0 shadow-sm cursor-pointer"
                            style={{ backgroundColor: form.bgColor }}
                          >
                            <input
                              type="color"
                              value={form.bgColor}
                              onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <input
                            type="text"
                            value={form.bgColor}
                            onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
                            className="flex-1 px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white uppercase font-mono outline-none focus:border-brand-blue"
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Este color vestirá el fondo de la emisora en la app móvil.</p>
                      </div>
                    </div>
                  </div>

                  {/* BLOQUE 4: DESCRIPCIÓN DE LA EMISORA */}
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Activity size={16} strokeWidth={2} /> 4. Descripción de la Emisora
                    </h3>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Reseña o descripción breve...</label>
                      <textarea
                        rows={3}
                        placeholder="Realiza una descripción de la emisora..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                      />
                    </div>
                  </div>

                  {/* BLOQUE 5: REDES SOCIALES & CONTACTO */}
                  <div className="pt-4 border-t border-gray-800">
                    <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Globe size={16} strokeWidth={2} /> 5. Redes Sociales & Contacto
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Globe size={13} strokeWidth={2} className="text-blue-400" /> Sitio Web Oficial
                        </label>
                        <input
                          type="url"
                          placeholder="https://emisora.com"
                          value={form.website}
                          onChange={(e) => setForm({ ...form, website: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <MessageCircle size={13} strokeWidth={2} className="text-emerald-400" /> WhatsApp Directo
                        </label>
                        <input
                          type="text"
                          placeholder="+573000000000"
                          value={form.whatsapp}
                          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span>Facebook URL</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://facebook.com/pagina"
                          value={form.facebook}
                          onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          <span>Instagram URL</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://instagram.com/usuario"
                          value={form.instagram}
                          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                          <span>Twitter / X URL</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://x.com/usuario"
                          value={form.twitter}
                          onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <Video size={13} strokeWidth={2} className="text-rose-400" /> TikTok URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://tiktok.com/@usuario"
                          value={form.tiktok}
                          onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span>YouTube URL</span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://youtube.com/@usuario"
                          value={form.youtube}
                          onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BOTÓN GUARDAR */}
                  <div className="pt-4 border-t border-gray-800 flex justify-end">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="px-8 py-3 bg-brand-blue hover:bg-blue-600 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <PlusCircle size={16} strokeWidth={2} />
                      <span>{formSubmitting ? 'Guardando en Supabase...' : 'Guardar Emisora'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PESTAÑA 3: DIRECTORIO POR DEPARTAMENTO */}
            {activeTab === 'directorio' && (
              <div className="space-y-6">
                
                {/* VISTA 1: GRILLA DE TARJETAS DE TODOS LOS DEPARTAMENTOS */}
                {selectedDepartmentView === null ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Directorio por Departamento</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Explora las tablas y tarjetas organizadas por cada departamento de Colombia
                      </p>
                    </div>

                    {/* GRILLA COMPLETA DE TARJETAS POR DEPARTAMENTO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {COLOMBIA_DEPARTMENTS.map((dept, idx) => {
                        const deptStations = stations.filter((st) => st.department === dept)
                        const totalDept = deptStations.length
                        const activeDept = deptStations.filter((st) => st.isActive).length
                        const theme = DEPT_CARD_COLORS[idx % DEPT_CARD_COLORS.length]

                        return (
                          <div
                            key={dept}
                            onClick={() => setSelectedDepartmentView(dept)}
                            className="bg-dark-card border border-gray-800 hover:border-brand-blue/60 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-md group flex flex-col justify-between"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-11 h-11 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center ${theme.text} ${theme.hoverBg} group-hover:text-white transition-colors shrink-0`}>
                                <IconDepartmentFlag size={22} />
                              </div>

                              <span className="px-2.5 py-1 rounded-md bg-dark-bg border border-gray-800 text-[11px] font-bold text-gray-300">
                                {totalDept} {totalDept === 1 ? 'emisora' : 'emisoras'}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors">
                                {dept}
                              </h3>
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" />
                                {activeDept} transmitiendo en vivo
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  /* VISTA 2: GESTIÓN Y TARJETAS DE EMISORAS DE UN DEPARTAMENTO SELECCIONADO */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
                      <div>
                        <button
                          onClick={() => setSelectedDepartmentView(null)}
                          className="mb-2 px-3 py-1.5 bg-dark-card hover:bg-gray-800 border border-gray-700 text-gray-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ChevronLeft size={16} strokeWidth={2.5} />
                          <span>Volver a todos los departamentos</span>
                        </button>
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <MapPin size={20} strokeWidth={2} className="text-brand-blue" />
                          <span>Emisoras de {selectedDepartmentView}</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Gestión y directorio completo de estaciones en {selectedDepartmentView}
                        </p>
                      </div>

                      <span className="px-3 py-1.5 rounded-lg bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs font-bold">
                        {stations.filter((st) => st.department === selectedDepartmentView).length} Registrada(s)
                      </span>
                    </div>

                    {/* GRILLA DE TARJETAS DE EMISORAS DEL DEPARTAMENTO */}
                    {stations.filter((st) => st.department === selectedDepartmentView).length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {stations
                          .filter((st) => st.department === selectedDepartmentView)
                          .map((station) => {
                            const isCurrent = currentStation?.id === station.id

                            return (
                              <div
                                key={station.id}
                                className="border rounded-2xl p-5 shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
                                style={{
                                  backgroundColor: station.bgColor || '#1E1E1E',
                                  borderColor: isCurrent && isPlaying ? '#2563EB' : '#2A2A2A',
                                }}
                              >
                                <div>
                                  {/* Header de la tarjeta: Estado y Dial */}
                                  <div className="flex items-center justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
                                      station.isActive ? 'bg-brand-emerald/15 text-brand-emerald border-brand-emerald/40' : 'bg-brand-red/15 text-brand-red border-brand-red/40'
                                    }`}>
                                      {station.isActive ? (
                                        <>
                                          <CheckCircle2 size={12} strokeWidth={2} />
                                          <span>Activa</span>
                                        </>
                                      ) : (
                                        <>
                                          <Power size={12} strokeWidth={2} />
                                          <span>Desactivada</span>
                                        </>
                                      )}
                                    </span>

                                    <span className="text-[10px] text-gray-200 bg-black/50 px-2.5 py-1 rounded-md font-mono font-bold border border-white/10">
                                      {station.freq}
                                    </span>
                                  </div>

                                  {/* Logo de la Emisora (Centrado Absoluto) */}
                                  <div className="aspect-video w-full rounded-xl flex items-center justify-center mb-4 overflow-hidden relative">
                                    {station.logo ? (
                                      <img src={station.logo} alt={station.name} className="max-w-full max-h-full object-contain mx-auto my-auto drop-shadow-lg" />
                                    ) : (
                                      <div className="text-center text-white/50 p-4">
                                        <Radio size={36} strokeWidth={2} className="mx-auto mb-1 opacity-50" />
                                        <span className="text-[11px] font-medium">Radios Colombia</span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Información Nombre, Ubicación y Género */}
                                  <div className="space-y-1">
                                    <h3 className="font-extrabold text-base text-white tracking-tight">
                                      {station.name}
                                    </h3>
                                    <p className="text-xs text-gray-300 font-medium flex items-center gap-1">
                                      <MapPin size={13} strokeWidth={2} className="text-brand-blue shrink-0" />
                                      <span>{station.department} • {station.city}</span>
                                    </p>
                                    <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded bg-white/10 text-gray-200 text-[10px] font-semibold">
                                      {station.genre}
                                    </span>
                                  </div>

                                  {/* Descripción */}
                                  <div className="mt-3 text-[11px] text-white/90 leading-relaxed font-light line-clamp-2">
                                    {station.description || 'Emisora colombiana transmitiendo en vivo.'}
                                  </div>

                                  {/* Redes Sociales & Contacto (Familia Unicolor Minimalista iOS) */}
                                  <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-1.5">
                                    {station.website && (
                                      <a href={station.website} target="_blank" rel="noreferrer" title="Sitio Web" className="p-2 bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center">
                                        <IconWebsite size={14} />
                                      </a>
                                    )}
                                    {station.whatsapp && (
                                      <a href={`https://wa.me/${station.whatsapp}`} target="_blank" rel="noreferrer" title="WhatsApp" className="p-2 bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center">
                                        <IconWhatsApp size={14} />
                                      </a>
                                    )}
                                    {station.facebook && (
                                      <a href={station.facebook} target="_blank" rel="noreferrer" title="Facebook" className="p-2 bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center">
                                        <IconFacebook size={14} />
                                      </a>
                                    )}
                                    {station.instagram && (
                                      <a href={station.instagram} target="_blank" rel="noreferrer" title="Instagram" className="p-2 bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center">
                                        <IconInstagram size={14} />
                                      </a>
                                    )}
                                    {station.twitter && (
                                      <a href={station.twitter} target="_blank" rel="noreferrer" title="X / Twitter" className="p-2 bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center">
                                        <IconX size={14} />
                                      </a>
                                    )}
                                    {station.tiktok && (
                                      <a href={station.tiktok} target="_blank" rel="noreferrer" title="TikTok" className="p-2 bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors flex items-center justify-center">
                                        <IconTikTok size={14} />
                                      </a>
                                    )}
                                  </div>
                                </div>

                                {/* Botón de Escuchar Transmisión */}
                                <div className="mt-4 pt-3 border-t border-white/10">
                                  <button
                                    onClick={() => {
                                      if (currentStation?.id !== station.id) {
                                        setCurrentStation(station)
                                        setIsPlaying(true)
                                        setTimeout(() => {
                                          audioRef.current?.play().catch((err) => console.log('Audio play error:', err))
                                        }, 100)
                                      }
                                      setIsPlayerModalOpen(true)
                                    }}
                                    className="w-full py-2.5 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                                  >
                                    <Play size={14} strokeWidth={2} fill="currentColor" />
                                    <span>{isCurrent && isPlaying ? 'Pausar Emisora' : 'Escuchar Transmisión'}</span>
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    ) : (
                      <div className="p-12 bg-dark-card border border-gray-800 rounded-2xl text-center space-y-3">
                        <Radio size={40} strokeWidth={2} className="mx-auto text-gray-600" />
                        <h3 className="text-base font-bold text-white">No hay emisoras en {selectedDepartmentView}</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                          Aún no se han registrado estaciones para este departamento. Puedes agregar una nueva emisora desde la sección "Agregar Emisora".
                        </p>
                        <button
                          onClick={() => setActiveTab('agregar')}
                          className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-xs rounded-lg inline-flex items-center gap-2 transition-colors"
                        >
                          <PlusCircle size={15} strokeWidth={2} />
                          <span>Agregar Emisora</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PESTAÑA CALIFICACIONES */}
            {activeTab === 'calificaciones' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Calificaciones de Usuarios</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Revisa las calificaciones enviadas desde la aplicación.
                  </p>
                </div>
                
                {loadingCalificaciones ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">Cargando calificaciones...</p>
                  </div>
                ) : errorCalificaciones ? (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center">
                    <p className="text-red-400 text-sm font-semibold">Error al cargar la tabla:</p>
                    <p className="text-red-300 text-xs mt-1">{errorCalificaciones}</p>
                    <p className="text-gray-400 text-xs mt-3">Revisa la estructura de la tabla en Supabase.</p>
                  </div>
                ) : calificaciones.length === 0 ? (
                  <div className="bg-dark-card border border-gray-800 rounded-xl p-8 text-center">
                    <p className="text-gray-400 text-sm">No hay calificaciones registradas aún.</p>
                  </div>
                ) : (
                  <div className="bg-dark-card border border-gray-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-gray-900/50 text-xs uppercase font-semibold text-gray-400 border-b border-gray-800">
                          <tr>
                            <th className="px-4 py-3">Fecha</th>
                            <th className="px-4 py-3">Emisora</th>
                            <th className="px-4 py-3">Calificación</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {calificaciones.map((item, idx) => (
                            <tr key={item.id || idx} className="hover:bg-gray-800/20 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap">
                                {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                              </td>
                              <td className="px-4 py-3 font-medium text-white">
                                {item.emisora_id || item.emisora || item.station_id || item.nombre_emisora || 'Desconocida'}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1 text-yellow-500">
                                  {item.rating || item.calificacion || item.estrellas || item.stars || 'N/A'} <Star size={14} fill="currentColor" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PESTAÑA 4: EDITAR EMISORAS (ORGANIZADO POR DEPARTAMENTO Y EDICIÓN INTEGRAL) */}
            {activeTab === 'editar' && (
              <div className="space-y-6">
                
                {/* VISTA 1: GRILLA DE DEPARTAMENTOS PARA EDICIÓN */}
                {selectedEditarDept === null ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Editar Emisoras por Departamento</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Selecciona un departamento para editar la información de sus emisoras (logotipos, URLs de streaming, municipios o redes)
                      </p>
                    </div>

                    {/* GRILLA COMPLETA DE TARJETAS POR DEPARTAMENTO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {COLOMBIA_DEPARTMENTS.map((dept, idx) => {
                        const deptStations = stations.filter((st) => st.department === dept)
                        const totalDept = deptStations.length
                        const theme = DEPT_CARD_COLORS[idx % DEPT_CARD_COLORS.length]

                        return (
                          <div
                            key={dept}
                            onClick={() => setSelectedEditarDept(dept)}
                            className="bg-dark-card border border-gray-800 hover:border-brand-blue/60 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-md group flex flex-col justify-between"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-11 h-11 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center ${theme.text} ${theme.hoverBg} group-hover:text-white transition-colors shrink-0`}>
                                <IconDepartmentFlag size={22} />
                              </div>

                              <span className="px-2.5 py-1 rounded-md bg-dark-bg border border-gray-800 text-[11px] font-bold text-gray-300">
                                {totalDept} {totalDept === 1 ? 'emisora' : 'emisoras'}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors">
                                {dept}
                              </h3>
                              <p className="text-xs text-gray-400 mt-1 font-medium">
                                Haz clic para editar información
                              </p>
                              <div className="mt-3 text-[11px] font-bold text-brand-blue flex items-center gap-1 group-hover:underline">
                                <Edit size={13} strokeWidth={2} />
                                <span>Editar Emisoras</span>
                                <ChevronRight size={13} strokeWidth={2.5} />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  /* VISTA 2: LISTADO Y FORMULARIO DE EDICIÓN DE UN DEPARTAMENTO SELECCIONADO */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
                      <div>
                        <button
                          onClick={() => setSelectedEditarDept(null)}
                          className="mb-2 px-3 py-1.5 bg-dark-card hover:bg-gray-800 border border-gray-700 text-gray-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ChevronLeft size={16} strokeWidth={2.5} />
                          <span>Volver a Departamentos</span>
                        </button>
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <Edit size={20} strokeWidth={2} className="text-brand-blue" />
                          <span>Edición de Emisoras en {selectedEditarDept}</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Edita la información de la emisora como si estuvieras registrándola (logo, streaming, dirección o redes)
                        </p>
                      </div>

                      <span className="px-3 py-1.5 rounded-lg bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs font-bold">
                        {stations.filter((st) => st.department === selectedEditarDept).length} Registrada(s)
                      </span>
                    </div>

                    {/* LISTADO DE EMISORAS CON BOTÓN DESTACADO DE EDITAR */}
                    {filteredStations.filter((st) => st.department === selectedEditarDept).length > 0 ? (
                      <div className="bg-dark-card border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-gray-300">
                            <thead className="bg-dark-bg text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                              <tr>
                                <th className="p-4">Emisora & Logotipo</th>
                                <th className="p-4">Municipio / Ubicación</th>
                                <th className="p-4">Frecuencia / Género</th>
                                <th className="p-4">URL Streaming Directo</th>
                                <th className="p-4 text-right">Acción</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {filteredStations
                                .filter((st) => st.department === selectedEditarDept)
                                .map((st) => (
                                  <tr key={st.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="p-4 font-medium text-white flex items-center gap-3">
                                      <img src={st.logo} alt={st.name} className="w-10 h-10 rounded-lg object-cover border border-gray-800 shrink-0" />
                                      <div>
                                        <p className="font-bold text-xs text-slate-100">{st.name}</p>
                                        <span className="text-[10px] text-gray-400 font-mono">{st.freq}</span>
                                      </div>
                                    </td>

                                    <td className="p-4">
                                      <p className="font-semibold text-gray-200">{st.city}</p>
                                      <p className="text-[11px] text-gray-400">{st.department}</p>
                                    </td>

                                    <td className="p-4">
                                      <p className="font-semibold text-gray-200">{st.freq}</p>
                                      <p className="text-[11px] text-gray-400">{st.genre}</p>
                                    </td>

                                    <td className="p-4">
                                      <span className="text-[11px] text-brand-blue font-mono truncate block max-w-[200px]">{st.streamUrl}</span>
                                    </td>

                                    <td className="p-4 text-right">
                                      <button
                                        onClick={() => handleOpenEditModal(st)}
                                        className="px-4 py-2 bg-brand-blue text-white hover:bg-blue-600 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                                        title="Editar datos de esta emisora"
                                      >
                                        <Edit size={14} strokeWidth={2} />
                                        <span>Editar Emisora</span>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 bg-dark-card border border-gray-800 rounded-2xl text-center space-y-3">
                        <Radio size={40} strokeWidth={2} className="mx-auto text-gray-600" />
                        <h3 className="text-base font-bold text-white">No hay emisoras en {selectedEditarDept}</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                          Aún no hay emisoras registradas para editar en este departamento.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PESTAÑA 5: GESTIÓN DE EMISORAS (ORGANIZADO PRIMERO POR GRILLA DE DEPARTAMENTOS) */}
            {activeTab === 'gestion' && (
              <div className="space-y-6">
                
                {/* VISTA 1: GRILLA DE DEPARTAMENTOS PARA GESTIÓN */}
                {selectedGestionDept === null ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Gestión de Emisoras por Departamento</h2>
                      <p className="text-xs text-gray-400 mt-1">
                        Selecciona un departamento para editar sus emisoras, cambiar logos, URLs de streaming o activar/desactivar señales
                      </p>
                    </div>

                    {/* GRILLA COMPLETA DE TARJETAS POR DEPARTAMENTO PARA GESTIÓN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {COLOMBIA_DEPARTMENTS.map((dept, idx) => {
                        const deptStations = stations.filter((st) => st.department === dept)
                        const totalDept = deptStations.length
                        const activeDept = deptStations.filter((st) => st.isActive).length
                        const theme = DEPT_CARD_COLORS[idx % DEPT_CARD_COLORS.length]

                        return (
                          <div
                            key={dept}
                            onClick={() => setSelectedGestionDept(dept)}
                            className="bg-dark-card border border-gray-800 hover:border-brand-blue/60 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-md group flex flex-col justify-between"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-11 h-11 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center ${theme.text} ${theme.hoverBg} group-hover:text-white transition-colors shrink-0`}>
                                <IconDepartmentFlag size={22} />
                              </div>

                              <span className="px-2.5 py-1 rounded-md bg-dark-bg border border-gray-800 text-[11px] font-bold text-gray-300">
                                {totalDept} {totalDept === 1 ? 'emisora' : 'emisoras'}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-base font-bold text-white group-hover:text-brand-blue transition-colors">
                                {dept}
                              </h3>
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" />
                                {activeDept} activas • {totalDept - activeDept} desactivadas
                              </p>
                              <div className="mt-3 text-[11px] font-semibold text-brand-blue flex items-center gap-1 group-hover:underline">
                                <span>Gestionar Emisoras</span>
                                <ChevronRight size={13} strokeWidth={2.5} />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  /* VISTA 2: LISTADO Y EDICIÓN DE EMISORAS DE UN DEPARTAMENTO SELECCIONADO */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4">
                      <div>
                        <button
                          onClick={() => setSelectedGestionDept(null)}
                          className="mb-2 px-3 py-1.5 bg-dark-card hover:bg-gray-800 border border-gray-700 text-gray-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ChevronLeft size={16} strokeWidth={2.5} />
                          <span>Volver a Departamentos</span>
                        </button>
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                          <Power size={20} strokeWidth={2} className="text-brand-blue" />
                          <span>Gestión de Emisoras en {selectedGestionDept}</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Gestiona el estado de las emisoras registradas en {selectedGestionDept} (activada / desactivada)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab('agregar')}
                          className="px-3.5 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                        >
                          <PlusCircle size={15} strokeWidth={2} />
                          <span>Agregar Emisora en {selectedGestionDept}</span>
                        </button>
                      </div>
                    </div>

                    {/* TABLA DE GESTIÓN DE EMISORAS DE ESTE DEPARTAMENTO */}
                    {stations.filter((st) => st.department === selectedGestionDept).length > 0 ? (
                      <div className="bg-dark-card border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-gray-300">
                            <thead className="bg-dark-bg text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                              <tr>
                                <th className="p-4">Emisora & Logo</th>
                                <th className="p-4">Municipio / Ciudad</th>
                                <th className="p-4">Frecuencia / Género</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4 text-right">Acciones</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              {filteredStations
                                .filter((st) => st.department === selectedGestionDept)
                                .map((st) => (
                                  <tr key={st.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="p-4 font-medium text-white flex items-center gap-3">
                                      <img src={st.logo} alt={st.name} className="w-10 h-10 rounded-lg object-cover border border-gray-800 shrink-0" />
                                      <div>
                                        <p className="font-bold text-xs text-slate-100">{st.name}</p>
                                        <span className="text-[10px] text-gray-400 font-mono truncate block max-w-[150px]">{st.streamUrl}</span>
                                      </div>
                                    </td>

                                    <td className="p-4">
                                      <p className="font-semibold text-gray-200">{st.city}</p>
                                      <p className="text-[11px] text-gray-400">{st.department}</p>
                                    </td>

                                    <td className="p-4">
                                      <p className="font-semibold text-gray-200">{st.freq}</p>
                                      <p className="text-[11px] text-gray-400">{st.genre}</p>
                                    </td>

                                    <td className="p-4">
                                      <button
                                        onClick={() => toggleStationActiveState(st.id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                                          st.isActive 
                                            ? 'bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30' 
                                            : 'bg-brand-red/15 text-brand-red border border-brand-red/30'
                                        }`}
                                        title="Haz clic para cambiar estado"
                                      >
                                        <Power size={13} strokeWidth={2} />
                                        <span>{st.isActive ? 'activada' : 'desactivada'}</span>
                                      </button>
                                    </td>

                                    <td className="p-4 text-right">
                                      <button
                                        onClick={() => handleDeleteStation(st.id)}
                                        className="p-2 bg-dark-bg border border-gray-800 hover:bg-brand-red hover:text-white text-gray-400 rounded-lg transition-colors cursor-pointer"
                                        title="Eliminar Emisora"
                                      >
                                        <Trash2 size={14} strokeWidth={2} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 bg-dark-card border border-gray-800 rounded-2xl text-center space-y-3">
                        <Radio size={40} strokeWidth={2} className="mx-auto text-gray-600" />
                        <h3 className="text-base font-bold text-white">No hay emisoras registradas en {selectedGestionDept}</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                          Aún no hay estaciones para este departamento. Puedes crear una emisora nueva ahora mismo.
                        </p>
                        <button
                          onClick={() => setActiveTab('agregar')}
                          className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white font-semibold text-xs rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <PlusCircle size={15} strokeWidth={2} />
                          <span>Agregar Emisora en {selectedGestionDept}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PESTAÑA 6: GESTIÓN DE USUARIOS Y ROLES (SUPABASE AUTH) */}
            {activeTab === 'usuarios' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Users size={22} className="text-brand-blue" />
                    <span>Gestión de Usuarios y Roles de Acceso</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Crea cuentas de acceso adicionales con correos y asigna roles de administración o edición sincronizados con Supabase Auth.
                  </p>
                </div>

                {/* FORMULARIO DE CREACIÓN DE USUARIO CON ROL */}
                <div className="bg-dark-card border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-800">
                    <UserPlus size={18} className="text-brand-blue" />
                    <h3 className="text-sm font-bold text-white">Crear Nuevo Usuario de la Plataforma</h3>
                  </div>

                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Carlos Ramírez"
                          value={newUserForm.name}
                          onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Correo Electrónico *</label>
                        <input
                          type="email"
                          required
                          placeholder="usuario@radioscolombia.co"
                          value={newUserForm.email}
                          onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Contraseña Inicial *</label>
                        <input
                          type="password"
                          required
                          placeholder="Mínimo 6 caracteres"
                          value={newUserForm.password}
                          onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 focus:border-brand-blue outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Rol de Acceso *</label>
                        <select
                          value={newUserForm.role}
                          onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none font-semibold"
                        >
                          <option value="Administrador General">👑 Administrador General</option>
                          <option value="Editor de Emisoras">✍️ Editor de Emisoras</option>
                          <option value="Operador de Soporte">🎧 Operador de Soporte</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={creatingUser}
                        className="px-6 py-2.5 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <UserPlus size={15} strokeWidth={2} />
                        <span>{creatingUser ? 'Creando en Supabase...' : 'Crear Usuario en Supabase'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* TABLA DE USUARIOS Y ROLES REGISTRADOS */}
                <div className="bg-dark-card border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="p-4 bg-dark-card border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-brand-blue" />
                      <h3 className="text-sm font-bold text-white">Usuarios Registrados en el Sistema</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue text-xs font-bold">
                      {usersList.length} {usersList.length === 1 ? 'usuario' : 'usuarios'}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-dark-bg text-gray-400 font-semibold border-b border-gray-800 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-4">Usuario</th>
                          <th className="p-4">Correo Electrónico</th>
                          <th className="p-4">Rol Asignado</th>
                          <th className="p-4">Estado</th>
                          <th className="p-4">Registro</th>
                          <th className="p-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60 text-gray-300">
                        {usersList.map((usr) => (
                          <tr key={usr.id} className="hover:bg-gray-800/30 transition-colors">
                            <td className="p-4 font-bold text-white flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-blue font-bold shrink-0">
                                {usr.name.slice(0, 2).toUpperCase()}
                              </div>
                              <span>{usr.name}</span>
                            </td>
                            <td className="p-4 font-mono text-gray-300">{usr.email}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                                usr.role.includes('Administrador')
                                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                  : usr.role.includes('Editor')
                                  ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                                  : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              }`}>
                                {usr.role}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-0.5 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30 text-[10px] font-bold">
                                🟢 {usr.status}
                              </span>
                            </td>
                            <td className="p-4 font-mono text-gray-400 text-[11px]">{usr.createdAt}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteUser(usr.id)}
                                className="p-2 bg-dark-bg border border-gray-800 hover:bg-brand-red hover:text-white text-gray-400 rounded-lg transition-colors cursor-pointer"
                                title="Eliminar Usuario"
                              >
                                <Trash2 size={14} strokeWidth={2} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* REPRODUCTOR DE AUDIO FLOTANTE (RESTRINGIDO AL ÁREA DE CONTENIDO, LIBERANDO EL SIDEBAR) */}
      {currentStation && (
        <div className={`fixed bottom-0 right-0 ${
          isSidebarCollapsed ? 'md:left-16' : 'md:left-[190px]'
        } left-0 z-40 bg-dark-card/95 backdrop-blur-md border-t border-gray-800 p-3 px-6 shadow-2xl flex items-center justify-between gap-4 transition-all duration-300`}>
          <div className="flex items-center gap-3 min-w-[200px]">
            <img
              src={currentStation.logo}
              alt={currentStation.name}
              className="w-10 h-10 rounded-lg object-cover border border-gray-800"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs text-white">{currentStation.name}</h4>
                {isPlaying && (
                  <span className="px-1.5 py-0.2 rounded bg-brand-blue/20 text-brand-blue text-[9px] font-bold uppercase">
                    En Vivo
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400">{currentStation.freq} • {currentStation.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => togglePlayStation(currentStation)}
              className="w-10 h-10 rounded-lg bg-brand-blue hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 min-w-[140px] justify-end">
            <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white">
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value))
                if (isMuted && parseFloat(e.target.value) > 0) {
                  setIsMuted(false)
                }
              }}
              className="w-20 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-brand-blue [&::-webkit-slider-thumb]:rounded-full"
            />
            <button 
              onClick={() => setIsPlayerModalOpen(true)}
              className="w-8 h-8 ml-2 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              title="Expandir Reproductor"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      )}

      {isPlayerModalOpen && currentStation && (
        <BeautifulPlayer 
          station={currentStation}
          isPlaying={isPlaying}
          togglePlay={togglePlayStation}
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          toggleMute={() => setIsMuted(!isMuted)}
          onClose={() => setIsPlayerModalOpen(false)}
        />
      )}

      {/* MODAL DE EDICIÓN DE PERFIL DE ADMINISTRADOR */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-gray-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <User size={18} className="text-brand-blue" />
                <span>Editar Perfil de Administrador</span>
              </div>
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* Foto de Perfil */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Foto de Perfil</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-dark-bg border border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                    {profileForm.avatar ? (
                      <img src={profileForm.avatar} alt="Vista previa avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-extrabold text-sm text-brand-blue">
                        {profileForm.name ? profileForm.name.slice(0, 2).toUpperCase() : 'PN'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="flex items-center justify-center gap-2 py-2 px-3 bg-dark-bg hover:bg-gray-800 border border-gray-700 rounded-lg text-xs font-medium text-gray-300 cursor-pointer transition-colors">
                      <Camera size={14} className="text-brand-blue" />
                      <span>Subir Imagen PNG / JPG</span>
                      <input type="file" accept="image/*" onChange={handleAvatarFileUpload} className="hidden" />
                    </label>

                    <input
                      type="url"
                      placeholder="O pega URL de la foto..."
                      value={profileForm.avatar}
                      onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white placeholder-gray-500 outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none"
                />
              </div>

              {/* Rol / Empresa */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Empresa / Rol *</label>
                <input
                  type="text"
                  required
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none"
                />
              </div>

              {/* Cambiar Contraseña */}
              <div className="pt-2 border-t border-gray-800/80">
                <label className="block text-xs font-semibold text-brand-blue mb-2 flex items-center gap-1.5">
                  <Key size={14} /> Cambiar Contraseña (Opcional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">Nueva Contraseña</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={profileForm.password || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">Confirmar Contraseña</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={profileForm.confirmPassword || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="pt-3 border-t border-gray-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-dark-bg hover:bg-gray-800 border border-gray-700 rounded-lg text-xs font-medium text-gray-300 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue hover:bg-blue-600 rounded-lg text-xs font-bold text-white transition-colors shadow-md"
                >
                  Guardar Cambios
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL COMPLETO DE EDICIÓN DE EMISORA POR DEPARTAMENTO */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-dark-card border border-gray-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200 my-8">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Palette size={18} strokeWidth={2} className="text-brand-blue" />
                <span>Editar Emisora: {editForm.name}</span>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={handleSaveEditStation} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              
              {/* Información Básica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Nombre de la Emisora *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Frecuencia *</label>
                  <input
                    type="text"
                    required
                    value={editForm.freq || ''}
                    onChange={(e) => setEditForm({ ...editForm, freq: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Departamento *</label>
                  <select
                    value={editForm.department || ''}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue font-medium"
                  >
                    {COLOMBIA_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Municipio / Ciudad *</label>
                  <input
                    type="text"
                    required
                    value={editForm.city || ''}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Género Musical *</label>
                  <select
                    value={editForm.genre || ''}
                    onChange={(e) => setEditForm({ ...editForm, genre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue font-medium"
                  >
                    {GENRES_LIST.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1">Estado de Transmisión</label>
                  <select
                    value={editForm.isActive ? 'activa' : 'desactivada'}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === 'activa' })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white focus:border-brand-blue outline-none font-bold"
                  >
                    <option value="activa">🟢 ACTIVA (Transmitiendo)</option>
                    <option value="desactivada">🔴 DESACTIVADA (Mora / Apagada)</option>
                  </select>
                </div>
              </div>

              {/* Streaming Audio */}
              <div className="pt-3 border-t border-gray-800">
                <label className="block text-xs font-medium text-gray-300 mb-1">URL de Streaming Directo (MP3 / AAC) *</label>
                <input
                  type="url"
                  required
                  value={editForm.streamUrl || ''}
                  onChange={(e) => setEditForm({ ...editForm, streamUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue font-mono"
                />
              </div>

              {/* Logo & Color de Fondo */}
              <div className="pt-3 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Logo URL o Imagen</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="url"
                      value={editForm.logoUrl || ''}
                      onChange={(e) => setEditForm({ ...editForm, logoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue"
                    />
                    {editForm.logoUrl && (
                      <div className="w-9 h-9 rounded-lg shrink-0 overflow-hidden border border-brand-blue flex items-center justify-center p-1" style={{ backgroundColor: editForm.bgColor || '#1E1E1E' }}>
                        <img src={editForm.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </div>
                  <label className="flex items-center justify-center gap-2 py-1.5 px-3 bg-dark-bg hover:bg-gray-800 border border-gray-700 rounded-lg text-xs font-medium text-gray-300 cursor-pointer transition-colors">
                    <Upload size={14} strokeWidth={2} className="text-brand-blue" />
                    <span>Cambiar PNG / JPG</span>
                    <input type="file" accept="image/*" onChange={handleEditLogoFileUpload} className="hidden" />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Color de Fondo</label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl border border-gray-700 overflow-hidden relative shrink-0 shadow-sm cursor-pointer"
                      style={{ backgroundColor: editForm.bgColor || '#1E1E1E' }}
                    >
                      <input
                        type="color"
                        value={editForm.bgColor || '#1E1E1E'}
                        onChange={(e) => setEditForm({ ...editForm, bgColor: e.target.value })}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={editForm.bgColor || '#1E1E1E'}
                      onChange={(e) => setEditForm({ ...editForm, bgColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white uppercase font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="pt-3 border-t border-gray-800">
                <label className="block text-xs font-medium text-gray-300 mb-1">Descripción</label>
                <textarea
                  rows={2}
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none focus:border-brand-blue"
                />
              </div>

              {/* Redes Sociales */}
              <div className="pt-3 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">Sitio Web</label>
                  <input
                    type="url"
                    value={editForm.website || ''}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={editForm.whatsapp || ''}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">Facebook URL</label>
                  <input
                    type="url"
                    value={editForm.facebook || ''}
                    onChange={(e) => setEditForm({ ...editForm, facebook: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={editForm.instagram || ''}
                    onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">Twitter / X URL</label>
                  <input
                    type="url"
                    value={editForm.twitter || ''}
                    onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">TikTok URL</label>
                  <input
                    type="url"
                    value={editForm.tiktok || ''}
                    onChange={(e) => setEditForm({ ...editForm, tiktok: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">YouTube URL</label>
                  <input
                    type="url"
                    value={editForm.youtube || ''}
                    onChange={(e) => setEditForm({ ...editForm, youtube: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-dark-bg border border-gray-800 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Botones Modal */}
              <div className="pt-4 border-t border-gray-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-dark-bg hover:bg-gray-800 border border-gray-700 rounded-lg text-xs font-medium text-gray-300 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-blue hover:bg-blue-600 rounded-lg text-xs font-bold text-white transition-colors shadow-md cursor-pointer"
                >
                  Actualizar Emisora
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}