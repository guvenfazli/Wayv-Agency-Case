"use client"
import { useState, useEffect } from "react"
import SingleCampaign from "@/components/singleCampaign/singleCampaign"
import { useParams } from "next/navigation"
import Loading from "@/components/loading"

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

export default function Campaign() {

  const { campaignId } = useParams()
  const [data, setData] = useState<CampaignData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<string | false>(false)

  useEffect(() => {
    async function fetchSingleCampaign() {

      try {
        const response = await fetch(`http://localhost:8080/campaigns/${campaignId}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const resData = await response.json()
          const error = new Error()
          error.message = resData.message
          throw error
        }

        const resData = await response.json()

        setData(resData.data)
        setIsLoading(false)


      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message)
          setIsLoading(false)

        }
      }
    }

    fetchSingleCampaign()
  }, [])


  return (
    <div className="bg-black text-white py-10 px-6">
      {isLoading && <Loading />}
      {isError && <p>{isError}</p>}
      {(!isLoading && !isError) && <SingleCampaign data={data} />}
    </div>
  )
}