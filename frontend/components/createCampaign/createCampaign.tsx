"use client"
import { supabase } from "@/lib/supabase"
import { useRef, useState } from "react"
import checkError from "../utils/checkError"
interface CampaignData {
  title: string,
  brand: string,
  start_date: string,
  end_date: string,
  budget: string,
  image_url: string,
  description: string
}

export default function CreateCampaign() {

  const imagePicker = useRef<HTMLInputElement>(null) // Controlling the request process
  const [isError, setIsError] = useState<string | false>(false) // Controlling the request process
  const [campaignData, setCampaignData] = useState<CampaignData>({ // Collecting the data and controlling component.
    title: "",
    brand: "",
    start_date: "",
    end_date: "",
    budget: "",
    image_url: "",
    description: ""
  })

  function getCampaignData(field: string, input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (field === "image_url") {
      const file = imagePicker.current?.files?.[0];
      if (file) {
        setCampaignData((prev) => ({
          ...prev,
          image_url: Date.now() + '-' + file.name, // Creating unique name, just for the case i'm using Date.now function, normally i would use UUID libraries.
        }));
      }
      return;
    } else {
      setCampaignData((prev) => ({
        ...prev,
        [field]: input.target.value
      }))
    }
  }

  async function createCampaign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const file = imagePicker.current?.files?.[0];
      if (!file) {
        throw new Error("Please select a campaign banner image.");
      }

      const response = await fetch('http://localhost:8080/createCampaign', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(campaignData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorCheck = await checkError(response)
        throw errorCheck
      }

      const { data, error } = await supabase.storage.from('campaign-banner').upload(campaignData.image_url, file)
    } catch (err) {
      if (err instanceof Error) {
        setIsError(err.message)
      }
    }
  }



  return (
    <form onSubmit={(e) => createCampaign(e)} className="flex flex-col w-full justify-center items-center gap-3 bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 shadow-md">
      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="title" className="text-sm font-medium text-gray-300">Title</label>
        <input onChange={(e) => getCampaignData('title', e)} name="title" type="text" placeholder="Enter campaign title" className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="brand" className="text-sm font-medium text-gray-300">Brand</label>
        <input
          onChange={(e) => getCampaignData('brand', e)}
          name="brand"
          type="text"
          className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter brand name"
        />
      </div>

      <div className="flex gap-4 w-1/3">
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="startDate" className="text-sm font-medium text-gray-300">Start Date</label>
          <input
            onChange={(e) => getCampaignData('start_date', e)}
            name="startDate"
            type="date"
            className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="endDate" className="text-sm font-medium text-gray-300">End Date</label>
          <input
            onChange={(e) => getCampaignData('end_date', e)}
            name="endDate"
            type="date"
            className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="budget" className="text-sm font-medium text-gray-300">Budget $</label>
        <input
          onChange={(e) => getCampaignData('budget', e)}
          name="budget"
          type="number"
          className="bg-[#0e0e0e] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="campaignBanner" className="text-sm font-medium text-gray-300">Campaign Banner</label>
        <input
          ref={imagePicker}
          onChange={(e) => getCampaignData('image_url', e)}
          type="file"
          name="campaignBanner"
          className="text-gray-300 file:bg-gray-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
          accept="image/jpg, image/jpeg, image/png"
        />
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
        <textarea onChange={(e) => getCampaignData('description', e)} name="description" rows={4} className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write campaign description..." />
      </div>

      <button className="w-1/3 bg-blue-600 mt-4 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer">Create Campaign</button>

      {isError &&
        <div className="flex w-full justify-center items-center">
          <p className="text-lg text-red-700">{isError}</p>
        </div>
      }

    </form>
  )
}