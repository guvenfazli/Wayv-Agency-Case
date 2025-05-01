"use client"
import { useEffect, useState } from "react"
import Loading from "../loading"
import CampaignCard from "./campaignCard"

type CampaignData = {
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

export default function Dashboard() {

  const [data, setData] = useState<CampaignData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<false | string>(false)

  useEffect(() => {

    async function fetchCampaigns() {

      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/campaigns', {
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

    fetchCampaigns()

  }, [])


  return (
    <div className="space-y-6">
      <p className="text-3xl font-bold tracking-tight">Campaign Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((data: CampaignData) => <CampaignCard key={data.id} data={data} />)}
        {isLoading && <Loading />}
        {isError && <p>{isError}</p>}
      </div>
    </div>
  )
}