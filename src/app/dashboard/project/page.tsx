import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Projects</CardTitle>
          <Button size="sm">New Project</Button>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Project Alpha</span>
            <span className="text-muted-foreground">Created today</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Project Beta</span>
            <span className="text-muted-foreground">2 days ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
