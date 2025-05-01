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

      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-sm font-medium text-gray-300">Start Date</label>
          <input
            type="date"
            className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 w-1/2">
          <label className="text-sm font-medium text-gray-300">End Date</label>
          <input
            type="date"
            className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Budget $</label>
        <input
          type="number"
          className="bg-[#0e0e0e] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">Campaign Banner</label>
        <input
          type="file"
          className="text-gray-300 file:bg-gray-800 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
        />
      </div>

      <input></input>
      <label>Description</label>
      <textarea />

    </form>
  )
}