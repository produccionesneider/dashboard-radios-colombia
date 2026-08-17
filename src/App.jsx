import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
import DashboardLayout from './DashboardLayout'
import { Radio } from 'lucide-react'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    }).catch(() => setLoading(false))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-gray-400 text-xs font-medium gap-3 select-none">
        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue animate-pulse">
          <Radio size={22} />
        </div>
        <span>Cargando Panel Radios Colombia...</span>
      </div>
    )
  }

  if (!session) {
    return <Login onLogin={setSession} />
  }

  return <DashboardLayout />
}