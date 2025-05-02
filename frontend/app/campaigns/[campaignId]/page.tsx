"use client"
import { useState, useEffect } from "react"
import SingleCampaign from "@/components/singleCampaign/singleCampaign"
import { useParams } from "next/navigation"
import Loading from "@/components/loading"
import checkError from "@/components/utils/checkError"
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

  const { campaignId } = useParams() // Getting the ID
  const [data, setData] = useState<CampaignData | null>(null) // Setting Data
  const [isLoading, setIsLoading] = useState<boolean>(true) // Controlling the request process
  const [isError, setIsError] = useState<string | false>(false) // Controlling the request process

  useEffect(() => {
    async function fetchSingleCampaign() {

      try {
        const response = await fetch(`http://localhost:8080/campaigns/${campaignId}`, {
          credentials: "include"
        })

        if (!response.ok) {
          const errorCheck = await checkError(response)
          throw errorCheck
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
      {isLoading && <Loading />}{/* Controlling the component Reder */}
      {isError && <p>{isError}</p>}{/* Controlling the component Reder */}
      {(!isLoading && !isError) && <SingleCampaign data={data} />}{/* Controlling the component Reder */}
    </div>
  )
}