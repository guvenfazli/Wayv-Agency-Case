import dayjs from "dayjs"
import EditCampaign from "./editCampaign"
import { useRouter } from "next/navigation"
import checkError from "../utils/checkError"
import { useState } from "react"
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

  const router = useRouter()
  const [isError, setIsError] = useState<boolean | string>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<false | string>(false)


  async function deleteCampaign() {
    try {
      setIsLoading(true)
      setIsError(false)
      setIsSuccess(false)
      const response = await fetch(`http://localhost:8080/deleteCampaign/${data?.id}/${data?.image_url}`, { // Sending Delete Request for campaign deleting.
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorCheck = await checkError(response)
        throw errorCheck
      }
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setIsError(err.message)
      }
    }
  }


  return (
    <div className="space-y-8">
      <div className="border-b border-gray-700 pb-6">
        <p className="text-3xl font-bold max-[425px]:text-xl">{data?.title}</p>
        <p className="text-gray-400 text-sm mt-1 max-[425px]:text-xs">
          Brand: <span className="text-white">{data?.brand}</span>
        </p>
        <p className="text-gray-500 text-sm max-[425px]:text-xs">{dayjs.unix(data!.start_date).format('DD/MM/YY')} - {dayjs.unix(data!.end_date).format('DD/MM/YY')}</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-gray-700 shadow-md relative">
        <img
          src={`https://dycdmuuvemuzhhoalnun.supabase.co/storage/v1/object/public/campaign-banner//${data?.image_url}`}
          alt="Campaign Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="border border-gray-700 rounded-xl p-6 bg-[#1a1a1a] shadow-sm max-[425px]:p-3">
        <p className="text-xl font-semibold mb-3 max-[425px]:text-base">Description</p>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line max-[425px]:text-sm">{data?.description}</p>
      </div>

      <div className="border border-gray-700 rounded-xl p-6 bg-[#1a1a1a] max-[425px]:p-3">
        <h2 className="text-xl font-semibold mb-3 max-[425px]:text-base">Budget</h2>
        <p className="text-green-400 font-mono text-lg max-[425px]:text-sm">$ {data?.budget}</p>
      </div>

      <div className="flex gap-4 pt-4">

        <EditCampaign data={data} />

        <div className="flex">
          <button disabled={isLoading} onClick={deleteCampaign} className={`px-4 py-2 bg-red-600 hover:bg-red-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer ${isLoading && 'bg-red-600/30'}`}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>

          {isError &&
            <div className="flex w-full justify-center items-center max-lg:w-1/2 max-md:w-full">
              <p className="text-lg text-red-700">{isError}</p>
            </div>
          }

          {isSuccess &&
            <div className="flex w-full justify-center items-center max-lg:w-1/2 max-md:w-full">
              <p className="text-lg text-green-700">{isError}</p>
            </div>
          }


        </div>
      </div>
    </div>
  )
}