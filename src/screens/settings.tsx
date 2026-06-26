import { Upload } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

export const title = 'Settings'

const NOTIFICATIONS = [
  {
    id: 'product',
    label: 'Product updates',
    desc: 'News about features and improvements.',
    on: true,
  },
  {
    id: 'security',
    label: 'Security alerts',
    desc: 'Important notices about your account.',
    on: true,
  },
  {
    id: 'marketing',
    label: 'Marketing emails',
    desc: 'Tips, offers, and the occasional newsletter.',
    on: false,
  },
]

export default function Settings() {
  return (
    <div className="bg-background">
      <main className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-8">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your profile, notifications, and preferences.
          </p>
        </header>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  This information is visible to your teammates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarImage
                      src="https://i.pravatar.cc/128?img=47"
                      alt="Mara Lin"
                    />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload /> Change photo
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" defaultValue="Mara Lin" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="mara@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    defaultValue="Product designer. I like clean type and warm color."
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile. Max 160 characters.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose what you want to hear about.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={n.id}>
                    {i > 0 && <Separator />}
                    <div className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <Label htmlFor={n.id} className="text-sm font-medium">
                          {n.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{n.desc}</p>
                      </div>
                      <Switch id={n.id} defaultChecked={n.on} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Tune how Canvas feels to use.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="density">Density</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger id="density" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lang">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="lang" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor="reduce" className="text-sm font-medium">
                      Reduce motion
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations across the app.
                    </p>
                  </div>
                  <Switch id="reduce" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
