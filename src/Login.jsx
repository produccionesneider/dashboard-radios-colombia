import { useState } from 'react'
import { supabase } from './supabaseClient'
import { Radio, Mail, Lock, Eye, EyeOff, LogIn, KeyRound } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [logoError, setLogoError] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      if (data?.session) {
        onLogin(data.session)
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error durante la autenticación')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMsg('Por favor ingresa tu correo electrónico primero para enviarte el enlace de recuperación.')
      return
    }
    setResetLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      })
      if (error) throw error
      setSuccessMsg('Te hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.')
    } catch (err) {
      setErrorMsg(err.message || 'Error al enviar el correo de recuperación')
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col justify-between p-6 select-none relative">
      
      {/* Contenedor central de Login */}
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-dark-card border border-gray-800 rounded-2xl p-8 shadow-xl">
          
          {/* Logo y Encabezado de Radios Colombia */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              {!logoError ? (
                <img
                  src="/logo-light.png"
                  alt="Logo Radios Colombia"
                  onError={(e) => {
                    if (e.target.src.endsWith('/logo-light.png')) {
                      e.target.src = '/logo.png'
                    } else {
                      setLogoError(true)
                    }
                  }}
                  className="max-h-24 max-w-full object-contain drop-shadow-md"
                />
              ) : (
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 text-brand-blue">
                  <Radio size={34} />
                </div>
              )}
            </div>

            <h1 className="text-xl font-bold tracking-tight text-white">
              Panel de Administración Radios Colombia
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Ingresa tus credenciales autorizadas
            </p>
          </div>

          {/* Mensajes de Alerta */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-lg bg-brand-red/10 border border-brand-red/30 text-red-400 text-xs flex items-start gap-2">
              <span className="leading-none">⚠️</span>
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-5 p-3.5 rounded-lg bg-brand-emerald/10 border border-brand-emerald/30 text-emerald-400 text-xs flex items-start gap-2">
              <span className="leading-none">✅</span>
              <span className="leading-snug">{successMsg}</span>
            </div>
          )}

          {/* Formulario de Login */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@tucorreo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-bg border border-gray-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-white text-sm placeholder-gray-500 transition-colors outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                  className="text-xs text-brand-blue hover:underline transition-colors flex items-center gap-1"
                >
                  <KeyRound size={12} />
                  <span>{resetLoading ? 'Enviando...' : '¿Olvidaste tu contraseña?'}</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-dark-bg border border-gray-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-white text-sm placeholder-gray-500 transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-blue hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Iniciando sesión...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* Footer de Esquinas Inferiores Invertido */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800/60 gap-2">
        <div>
          © 2026 Radios Colombia. Todos los derechos reservados.
        </div>
        <div>
          Realizado por <span className="text-gray-300 font-medium">Producciones Neider</span>
        </div>
      </footer>

    </div>
  )
}