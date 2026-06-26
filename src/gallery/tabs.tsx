import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-sm text-muted-foreground"
      >
        A quick summary of everything at a glance.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-sm text-muted-foreground"
      >
        Your recent activity shows up here.
      </TabsContent>
      <TabsContent
        value="settings"
        className="text-sm text-muted-foreground"
      >
        Tune preferences to taste.
      </TabsContent>
    </Tabs>
  )
}
