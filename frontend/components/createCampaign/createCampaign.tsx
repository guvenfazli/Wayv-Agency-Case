"use client"
import { useState } from "react"

export default function CreateCampaign() {



  async function createCampaign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = e.target as HTMLFormElement
    const fd = new FormData(formData)

    try {
      const response = await fetch('http://localhost:8080/createCampaign', {
        method: "POST",
        credentials: "include",
        body: fd
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error()
        error.message = resData.message
        throw error
      }
    } catch (err) {
      console.log(err)
    }


  }

  return (
    <form onSubmit={(e) => createCampaign(e)} className="flex flex-col w-full justify-center items-center gap-3 bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 shadow-md">
      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="title" className="text-sm font-medium text-gray-300">Title</label>
        <input name="title" type="text" placeholder="Enter campaign title" className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="brand" className="text-sm font-medium text-gray-300">Brand</label>
        <input
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
            name="startDate"
            type="date"
            className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="endDate" className="text-sm font-medium text-gray-300">End Date</label>
          <input
            name="endDate"
            type="date"
            className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="budget" className="text-sm font-medium text-gray-300">Budget $</label>
        <input
          name="budget"
          type="number"
          className="bg-[#0e0e0e] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="campaignBanner" className="text-sm font-medium text-gray-300">Campaign Banner</label>
        <input
          type="file"
          name="campaignBanner"
          className="text-gray-300 file:bg-gray-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
          accept="image/jpg, image/jpeg, image/png"
        />
      </div>

      <div className="flex flex-col gap-1 w-1/3">
        <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
        <textarea name="description" rows={4} className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write campaign description..." />
      </div>

      <button className="w-1/3 bg-blue-600 mt-4 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-md cursor-pointer">Create Campaign</button>
    </form>
  )
}