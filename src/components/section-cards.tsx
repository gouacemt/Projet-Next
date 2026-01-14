import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">3</p>
          <p className="text-muted-foreground text-sm">
            Active projects
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">Free</p>
          <p className="text-muted-foreground text-sm">
            Current plan
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">Connected</p>
          <p className="text-muted-foreground text-sm">
            Your account is active
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
