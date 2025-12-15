import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface RecentSale {
  initials: string
  name: string
  email: string
  amount: string
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  description: string
}

const MetricCard = ({ title, value, change, description }: MetricCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardDescription>{title}</CardDescription>
      <CardTitle className="text-4xl">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-xs text-muted-foreground">
        {change} {description}
      </div>
    </CardContent>
  </Card>
)

const RecentSaleItem = ({ sale }: { sale: RecentSale }) => (
  <div className="flex items-center gap-4">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
      <span className="text-sm font-medium">{sale.initials}</span>
    </div>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">{sale.name}</p>
      <p className="text-sm text-muted-foreground">{sale.email}</p>
    </div>
    <div className="ml-auto font-medium">{sale.amount}</div>
  </div>
)

export function DashboardUser() {
  const recentSales: RecentSale[] = [
    {
      initials: "OM",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00"
    },
    {
      initials: "JL",
      name: "Jackson Lee",
      email: "jackson.lee@gmail.com",
      amount: "+$39.00"
    },
    {
      initials: "IN",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@gmail.com",
      amount: "+$299.00"
    },
    {
      initials: "WK",
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00"
    },
    {
      initials: "SD",
      name: "Sofia Davis",
      email: "sofia.davis@gmail.com",
      amount: "+$39.00"
    }
  ]

  const monthlyData = [6000, 4500, 3000, 1500, 0]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            description="from last month"
          />
          <MetricCard
            title="Subscriptions"
            value="+2350"
            change="+180.1%"
            description="from last month"
          />
          <MetricCard
            title="Sales"
            value="+12,234"
            change="+19%"
            description="from last month"
          />
          <MetricCard
            title="Active Now"
            value="+573"
            change="+201"
            description="since last hour"
          />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="flex h-80 flex-col justify-end">
                <div className="flex items-end gap-2">
                  {monthlyData.map((value, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-lg bg-primary"
                        style={{ height: `${(value / 6000) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {months[index]}
                      </span>
                    </div>
                  ))}
                  {months.slice(monthlyData.length).map((month, index) => (
                    <div key={index + monthlyData.length} className="flex flex-1 flex-col items-center gap-2">
                      <div className="w-full rounded-t-lg bg-muted" style={{ height: "0%" }} />
                      <span className="text-xs text-muted-foreground">{month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentSales.map((sale, index) => (
                  <RecentSaleItem key={index} sale={sale} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}