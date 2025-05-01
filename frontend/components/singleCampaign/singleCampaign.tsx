export default function SingleCampaign() {
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-700 pb-6">
        <p className="text-3xl font-bold">Campaign Title</p>
        <p className="text-gray-400 text-sm mt-1">
          Brand: <span className="text-white">Campaign Brand</span>
        </p>
        <p className="text-gray-500 text-sm">Start Date - End Date</p>
      </div>

      <div>
        <p>Will be image here</p>
      </div>

      <div className="border border-gray-700 rounded-xl p-6 bg-[#1a1a1a] shadow-sm">
        <p className="text-xl font-semibold mb-3">Description</p>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">Will be the description here</p>
      </div>

      <div className="border border-gray-700 rounded-xl p-6 bg-[#1a1a1a]">
        <h2 className="text-xl font-semibold mb-3">Budget</h2>
        <p className="text-green-400 font-mono text-lg">$ Campaign Budget</p>
      </div>

      <div className="flex gap-4 pt-4">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium">
          Edit
        </button>

        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium">
          Delete
        </button>
      </div>
    </div>
  )
}