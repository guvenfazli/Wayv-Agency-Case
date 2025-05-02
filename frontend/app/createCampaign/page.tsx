import CreateCampaign from "@/components/createCampaign/createCampaign"
export default function CreateCampaignPage() {
  return (
    <div className="flex flex-col p-5">
      <p className="text-3xl font-bold tracking-tight max-[500px]:text-xl">Create Campaign</p>
      <CreateCampaign />
    </div>
  )
}