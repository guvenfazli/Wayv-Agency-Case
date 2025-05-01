import dayjs from "dayjs"
import Image from "next/image"
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
  data: CampaignData | null
}

export default function SingleCampaign({ data }: ComponentProps) {
  
  

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-700 pb-6">
        <p className="text-3xl font-bold">{data?.title}</p>
        <p className="text-gray-400 text-sm mt-1">
          Brand: <span className="text-white">{data?.brand}</span>
        </p>
        <p className="text-gray-500 text-sm">{dayjs.unix(data!.start_date).format('DD/MM/YY')} - {dayjs.unix(data!.end_date).format('DD/MM/YY')}</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-700 shadow-md relative">
        <img
          src={`https://dycdmuuvemuzhhoalnun.supabase.co/storage/v1/object/public/campaign-banner//${data?.image_url}`}
          alt="Campaign Banner"
          className="w-full h-auto object-cover"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="border border-gray-700 rounded-xl p-6 bg-[#1a1a1a] shadow-sm">
        <p className="text-xl font-semibold mb-3">Description</p>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">{data?.description}</p>
      </div>

      <div className="border border-gray-700 rounded-xl p-6 bg-[#1a1a1a]">
        <h2 className="text-xl font-semibold mb-3">Budget</h2>
        <p className="text-green-400 font-mono text-lg">$ {data?.budget}</p>
      </div>

      <div className="flex gap-4 pt-4">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer">
          Edit
        </button>

        <button className="px-4 py-2 bg-red-600 hover:bg-red-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  )
}