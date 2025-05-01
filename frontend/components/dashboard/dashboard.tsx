import CampaignCard from "./campaignCard"
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="text-3xl font-bold tracking-tight">Campaign Dashboard</header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </div>
  )
}