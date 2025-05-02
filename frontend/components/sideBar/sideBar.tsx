"use client"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js" // Supabase user type
import checkError from "../utils/checkError"

export default function SideBar() {

  const [isLoggedIn, setIsLoggedIn] = useState<false | null | User>(false)
  const router = useRouter()

  useEffect(() => { // Supabase checks and validate if there is any update with session. Updates the UI according to the session.

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(data.user)

    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(session?.user ?? false)
    })

    if (!isLoggedIn) router.push('/login')

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function logout() {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
        credentials: "include",
        method: "POST"
      })

      if (!response.ok) {
        const errorCheck = await checkError(response)
        throw errorCheck
      }

      await supabase.auth.signOut()
      router.push('/login')
    } catch (err) {
      if (err instanceof Error) {
        console.log(err)
      }
    }

  }

  if (isLoggedIn) {
    return (
      <div className="flex flex-col h-auto bg-[#1e1e1e] text-white p-4 border-r border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold mb-8 tracking-wide max-sm:text-center">🎵 Music Admin</h2>
        <nav className="flex flex-col gap-3 max-sm:flex-row">
          <Link href={'/'} className="text-left px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Dashboard
          </Link>
          <Link href={'/createCampaign'} className="text-left px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Create Campaign
          </Link>
        </nav>

        <div className="mt-auto max-sm:flex max-sm:justify-center max-sm:items-center">
          <button onClick={logout} className="text-left px-4 py-2 w-full rounded-md hover:bg-red-800 transition cursor-pointer max-sm:text-center">
            Log Out
          </button>
        </div>
      </div>
    )
  }
}