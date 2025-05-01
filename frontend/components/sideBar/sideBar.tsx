import Link from "next/link"
export default function SideBar() {
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
        <button className="text-left px-4 py-2 w-full rounded-md hover:bg-red-800 transition">
          Log Out
        </button>
      </div>
    </div>
  )
}