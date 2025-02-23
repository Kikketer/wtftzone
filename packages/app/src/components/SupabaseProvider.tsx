import { createContext, ReactNode, useContext, FC, useState } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const SupabaseContext = createContext<{ supabase: SupabaseClient } | null>(null)

interface SupabaseProviderProps {
  children: ReactNode
}

export const SupabaseProvider: FC<SupabaseProviderProps> = ({
  children,
}) => {
  const [supabase] = useState<SupabaseClient>(() =>
    createClient(supabaseUrl, supabaseKey),
  )

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
