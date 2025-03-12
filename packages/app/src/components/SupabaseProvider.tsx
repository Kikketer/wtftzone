import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  useEffect,
} from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { closeBrowser } from '../nativeBrowser'

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const SupabaseContext = createContext<{ supabase: SupabaseClient } | null>(null)

interface SupabaseProviderProps {
  children: ReactNode
}

export const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  const [supabase] = useState<SupabaseClient>(() =>
    createClient(supabaseUrl, supabaseKey),
  )

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          closeBrowser().catch(() => {
            // nom nom nom
          })
        }
      },
    )

    // Cleanup the listener on unmount
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === null) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}
