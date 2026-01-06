import ClassDistributionChart from "@/components/class-distribution-chart"
import DetectionExamples from "@/components/detection-examples"
import PolicySummary from "@/components/policy-summary"
import StatCards from "@/components/stat-cards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { initialMockData } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatCards />

      <section className="grid gap-6 lg:grid-cols-2">
        <ClassDistributionChart />
        <PolicySummary />
      </section>

      <Separator className="opacity-60" />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="card-surface">
          <CardHeader>
            <CardTitle>시스템 소개</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {initialMockData.systemIntro.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <DetectionExamples />
      </section>
    </div>
  )
}
