"use client"
import { useEffect, useState } from "react"
import Loading from "../loading"
import CampaignCard from "./campaignCard"
import checkError from "../utils/checkError"
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

  const [data, setData] = useState<CampaignData[]>([]) // Data State
  const [isLoading, setIsLoading] = useState<boolean>(false) // Controlling the component for request progress.
  const [isError, setIsError] = useState<false | string>(false) // Controlling the component for request progress.

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/campaigns', {
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
    fetchCampaigns()
  }, [])


  return (
    <div className="space-y-6">
      <p className="text-3xl font-bold tracking-tight">Campaign Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((data: CampaignData) => <CampaignCard key={data.id} data={data} />)}
        {data.length === 0 && <p>There is no active campaign at the moment!</p>}
        {isLoading && <Loading />}
        {isError && <p>{isError}</p>}
      </div>
    </div>
  )
}