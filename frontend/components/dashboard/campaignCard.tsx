import { useRouter } from "next/navigation"

interface CampaignData {
  brand: string,
  budget: number,
  createdAt: string,
  description: string,
  end_date: number,
  id: string,
  image_url: string,
  start_date: number,
  title: string
}

interface ComponentProps {
  data: CampaignData
}

export default function CampaignCard({ data }: ComponentProps) {

  const router = useRouter()
  function redirectToCampaignPage(id: string) {
    router.push(`/campaigns/${id}`)
  }

  return (
    <div onClick={() => redirectToCampaignPage(data.id)} className="p-6 bg-[#1a1a1a] rounded-xl shadow-md border border-gray-700 hover:bg-[#1a1a1a]/50 duration-100 ease-in-out cursor-pointer">
      <p className="text-lg font-semibold">{data.title}</p>
      <p className="text-sm text-gray-400">Brand: {data.brand}</p>
    </div>
  )
}