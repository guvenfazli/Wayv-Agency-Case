import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useRef, useEffect } from "react"

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

  const imagePicker = useRef<HTMLInputElement>(null)
  const [editValue, setEditValue] = useState({
    title: data?.title,
    brand: data?.brand,
    start_date: data?.start_date,
    end_date: data?.end_date,
    budget: data?.budget,
    description: data?.description,
    image_url: data?.image_url
  })
  const [isError, setIsError] = useState<string | false>(false)
  const [isSuccess, setIsSucces] = useState<string | false>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function gatherValue(field: string, input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (field === "image_url") {
      const file = imagePicker.current?.files?.[0];
      if (file) {
        setEditValue((prev) => ({
          ...prev,
          image_url: Date.now() + '-' + file.name,
        }));
      }
      return;
    } else {
      setEditValue((prev) => ({
        ...prev,
        [field]: input.target.value
      }))
    }
  }

  async function submitEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsLoading(true)
      setIsError(false)

      const response = await fetch(`http://localhost:8080/editCampaign/${data?.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(editValue),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error()
        error.message = resData.message
        throw error
      }

      const resData = await response.json()

      setIsSucces(resData.message)
      setIsLoading(false)

    } catch (err) {
      if (err instanceof Error) {
        setIsError(err.message)
        setIsLoading(false)
        setIsSucces(false)
      }
    }
  }

  useEffect(() => {

    if (isError || isSuccess) {
      const timer = setTimeout(() => {
        setIsError(false)
        setIsSucces(false)
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
    }

  }, [isError, isSuccess])

  return (
    <div className="flex gap-4 pt-4">
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-blue-600 hover:bg-blue-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer">Edit</DialogTrigger>
        <DialogContent className="bg-[#1a1a1a] text-white border border-gray-700 shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Edit Form</DialogTitle>
          </DialogHeader>

          <form onSubmit={(e) => submitEdit(e)} className="space-y-4 mt-4">
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
                ref={imagePicker}
                onChange={(e) => gatherValue('image_url', e)}
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

            <button
              disabled={isLoading}
              className={`w-full bg-blue-600 mt-4 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer ${isLoading && 'bg-blue-600/60'}`}
            >
              {isLoading ? 'Creating...' : 'Create Campaign'}
            </button>

            {isError &&
              <div className="flex w-full justify-center items-center">
                <p className="text-lg text-red-700">{isError}</p>
              </div>
            }

            {isSuccess &&
              <div className="flex w-full justify-center items-center">
                <p className="text-lg text-green-700">{isSuccess}</p>
              </div>
            }
          </form>
        </DialogContent>
      </Dialog>

      <button className="px-4 py-2 bg-red-600 hover:bg-red-900 rounded-md font-medium duration-100 ease-in-out cursor-pointer">
        Delete
      </button>
    </div>
  )
}