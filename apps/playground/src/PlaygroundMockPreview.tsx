import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
} from '@zui/react'
import { useState } from 'react'
import { PlaygroundComponentsShowcase } from './PlaygroundComponentsShowcase'

function ChartPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-border bg-muted/30 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklch, var(--primary) 55%, transparent) 0%, transparent 55%), linear-gradient(to top, color-mix(in oklch, var(--primary) 25%, var(--background)) 0%, transparent 70%)`,
        }}
      />
      <div className="relative flex h-[140px] items-end gap-0.5 px-2 pb-2 pt-8">
        {[
          { id: 's1', h: 40 },
          { id: 's2', h: 72 },
          { id: 's3', h: 55 },
          { id: 's4', h: 88 },
          { id: 's5', h: 62 },
          { id: 's6', h: 95 },
          { id: 's7', h: 78 },
          { id: 's8', h: 90 },
          { id: 's9', h: 68 },
          { id: 's10', h: 85 },
          { id: 's11', h: 92 },
          { id: 's12', h: 80 },
        ].map(({ id, h }) => (
          <div key={id} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
            <div>
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="text-2xl tabular-nums">$15,231.89</CardTitle>
            </div>
            <Badge color="success">+20.1%</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <Typography variant="caption" tone="muted">
              Vs last month
            </Typography>
            <ChartPlaceholder className="mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
            <div>
              <CardDescription>Subscriptions</CardDescription>
              <CardTitle className="text-2xl tabular-nums">+2,350</CardTitle>
            </div>
            <Badge color="info">+180</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <Typography variant="caption" tone="muted">
              New this quarter
            </Typography>
            <ChartPlaceholder className="mt-3" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
          <CardDescription>Status and totals from your billing pipeline.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV-2041</TableCell>
                <TableCell>
                  <Badge color="success" variant="soft">
                    Paid
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">$316.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV-2042</TableCell>
                <TableCell>
                  <Badge color="warning" variant="soft">
                    Pending
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">$842.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV-2043</TableCell>
                <TableCell>
                  <Badge color="danger" variant="soft">
                    Failed
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">$129.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function CardsView() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upgrade your subscription</CardTitle>
          <CardDescription>Unlock team seats, audit logs, and priority support.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Typography variant="body2" weight="medium">
              Workspace
            </Typography>
            <Input placeholder="Acme Inc." />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" color="neutral" size="sm">
              Not now
            </Button>
            <Button size="sm">Continue to checkout</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Use a provider or email and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" color="neutral" className="flex-1">
              GitHub
            </Button>
            <Button variant="outline" color="neutral" className="flex-1">
              Google
            </Button>
          </div>
          <Separator />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function FormsView() {
  const [plan, setPlan] = useState('starter')
  const [checked, setChecked] = useState(true)

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Team settings</CardTitle>
        <CardDescription>Invite collaborators and tune notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Typography variant="body2" weight="medium">
              Display name
            </Typography>
            <Input placeholder="Sofia Davis" />
          </div>
          <div className="space-y-2">
            <Typography variant="body2" weight="medium">
              Role
            </Typography>
            <Input placeholder="Designer" />
          </div>
        </div>

        <div className="space-y-2">
          <Typography variant="body2" weight="medium">
            Plan
          </Typography>
          <RadioGroup value={plan} onValueChange={setPlan} className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="starter" />
              Starter — lighter usage
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="pro" />
              Pro — shared tokens & reviews
            </label>
          </RadioGroup>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
          Send me a weekly summary
        </label>

        <div className="space-y-2">
          <Typography variant="body2" weight="medium">
            Notes
          </Typography>
          <Textarea placeholder="Anything we should know about rollout?" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" color="neutral" size="sm">
                  What gets shared?
                </Button>
              </TooltipTrigger>
              <TooltipContent>Theme tokens and component usage only — no PII.</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" color="neutral" size="sm">
                More actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Workspace</DropdownMenuLabel>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger asChild>
              <Button color="neutral" size="sm">
                Remove member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove member?</DialogTitle>
                <DialogDescription>
                  They will lose access immediately. This uses your destructive tone tokens.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <Button variant="outline" color="neutral" size="sm">
                  Cancel
                </Button>
                <Button color="danger" size="sm">
                  Remove
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export function PlaygroundMockPreview() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <Typography variant="h1">Preview</Typography>
        <Typography variant="body2" tone="muted">
          Mock layouts use your theme tokens in context—not an exhaustive component list.
        </Typography>
      </header>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <DashboardView />
        </TabsContent>
        <TabsContent value="cards" className="mt-6">
          <CardsView />
        </TabsContent>
        <TabsContent value="forms" className="mt-6">
          <FormsView />
        </TabsContent>
        <TabsContent value="library" className="mt-6">
          <PlaygroundComponentsShowcase />
        </TabsContent>
      </Tabs>
    </div>
  )
}
