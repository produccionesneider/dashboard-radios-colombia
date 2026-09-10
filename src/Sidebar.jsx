import { 
  LayoutDashboard, 
  Radio, 
  PlusCircle, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  LogOut,
  Star
} from 'lucide-react'
import { supabase } from './supabaseClient'

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'directorio', label: 'Directorio', icon: Radio },
    { id: 'agregar', label: 'Agregar Emisora', icon: PlusCircle },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { id: 'calificaciones', label: 'Calificaciones', icon: Star },
    { id: 'logs', label: 'Registro Errores', icon: AlertTriangle },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-dark-card h-screen fixed left-0 top-0 border-r border-gray-800 flex flex-col">
      {/* Logotipo / Branding */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white tracking-wide">Radios Colombia</h2>
        <p className="text-xs text-brand-orange mt-1 font-semibold">Producciones Neider</p>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Botón de Cerrar Sesión */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => supabase.auth.signOut()}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-brand-red transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}