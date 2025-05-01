import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useRef } from "react"


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


export default function EditCampaign({ data }: ComponentProps) {

  const [editValue, setEditValue] = useState({
    title: data?.title,
    brand: data?.brand,
    start_date: data?.start_date,
    end_date: data?.end_date,
    budget: data?.budget,
    description: data?.description
  })

  function gatherValue(field: string, input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEditValue((prev) => ({
      ...prev,
      [field]: input.target.value
    }))
  }

  console.log(editValue)

  return (
    <div className="flex gap-4 pt-4">
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-blue-600 hover:bg-blue-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer">Edit</DialogTrigger>
        <DialogContent className="bg-[#1a1a1a] text-white border border-gray-700 shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Edit Form</DialogTitle>
          </DialogHeader>

          <form className="space-y-4 mt-4">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="title" className="text-sm font-medium text-gray-300">Title</label>
              <input onChange={(e) => gatherValue('title', e)} defaultValue={editValue.title} name="title" type="text" placeholder="Enter campaign title" className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="brand" className="text-sm font-medium text-gray-300">Brand</label>
              <input
                onChange={(e) => gatherValue('brand', e)}
                defaultValue={editValue.brand}
                name="brand"
                type="text"
                className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="startDate" className="text-sm font-medium text-gray-300">Start Date</label>
                <input
                  onChange={(e) => gatherValue('start_date', e)}
                  defaultValue={editValue.start_date}
                  name="startDate"
                  type="date"
                  className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="endDate" className="text-sm font-medium text-gray-300">End Date</label>
                <input
                  onChange={(e) => gatherValue('end_date', e)}
                  defaultValue={editValue.end_date}
                  name="endDate"
                  type="date"
                  className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="budget" className="text-sm font-medium text-gray-300">Budget $</label>
              <input
                onChange={(e) => gatherValue('budget', e)}
                defaultValue={editValue.budget}
                name="budget"
                type="number"
                className="bg-[#0e0e0e] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="campaignBanner" className="text-sm font-medium text-gray-300">Campaign Banner</label>
              <input
                type="file"
                name="campaignBanner"
                className="text-gray-300 file:bg-gray-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
                accept="image/jpg, image/jpeg, image/png"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
              <textarea onChange={(e) => gatherValue('description', e)} defaultValue={editValue.description} name="description" rows={4} className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write campaign description..." />
            </div>

            <button className="w-full bg-blue-600 mt-4 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer">Create Campaign</button>

          </form>
        </DialogContent>
      </Dialog>

      <button className="px-4 py-2 bg-red-600 hover:bg-red-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer">
        Delete
      </button>
    </div>
  )
}