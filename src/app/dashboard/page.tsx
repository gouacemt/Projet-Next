import { SectionCards } from "@/components/section-cards"
import { DataTable } from "@/components/data-table"
import data from "./data.json"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionCards />
      <DataTable data={data} />
    </div>
  )
}
