"use client"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

export default function SideBar() {

  const [isLoggedIn, setIsLoggedIn] = useState<false | null | User>(false)
  const router = useRouter()

  useEffect(() => {

    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(session?.user ?? false)
    })

    if (!isLoggedIn) router.push('/login')

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoggedIn) {
    return (
      <div className="flex flex-col h-auto bg-[#1e1e1e] text-white p-4 border-r border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold mb-8 tracking-wide">🎵 Music Admin</h2>
        <nav className="flex flex-col gap-3">
          <Link href={'/'} className="text-left px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Dashboard
          </Link>
          <Link href={'/createCampaign'} className="text-left px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Create Campaign
          </Link>
        </nav>

        <div className="mt-auto">
          <button onClick={logout} className="text-left px-4 py-2 w-full rounded-md hover:bg-red-800 transition cursor-pointer">
            Log Out
          </button>
        </div>
      </div>
    )
  }
}