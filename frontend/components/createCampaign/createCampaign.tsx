export default function CreateCampaign() {
  return (
    <form className="flex flex-col w-full justify-center items-center gap-3 bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 shadow-md">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Title</label>
        <input type="text" placeholder="Enter campaign title" className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Brand</label>
        <input
          type="text"
          className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter brand name"
        />
      </div>
      <label>Start Date</label>
      <label>End Date</label>
      <label>Budget</label>
      <input></input>
      <label>Campaign Banner</label>
      <input></input>
      <label>Description</label>
      <textarea />

    </form>
  )
}