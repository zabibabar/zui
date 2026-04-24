import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Sidebar,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection,
  SidebarSectionTitle,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  toast,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
} from '@zui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const componentCoverage = [
  'Accordion',
  'Alert',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Checkbox',
  'Command',
  'ContextMenu',
  'DatePicker',
  'Dialog',
  'Drawer',
  'DropdownMenu',
  'Form',
  'Input',
  'Label',
  'Menubar',
  'Pagination',
  'Popover',
  'Progress',
  'RadioGroup',
  'ScrollArea',
  'Select',
  'Separator',
  'Sidebar',
  'Skeleton',
  'Slider',
  'Sonner',
  'Spinner',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toggle',
  'ToggleGroup',
  'Toolbar',
  'Tooltip',
  'Typography',
] as const

const healthMetrics = [
  { label: 'Revenue', value: '$128.4K', change: '+18.2%', color: 'success' },
  { label: 'Active teams', value: '1,248', change: '+7.4%', color: 'info' },
  { label: 'Queue risk', value: '14', change: '-3 alerts', color: 'warning' },
] as const

const deployments = [
  { name: 'Atlas CRM', owner: 'AM', status: 'Healthy', spend: '$24,900', stage: 'Production' },
  { name: 'Beacon Data', owner: 'BD', status: 'Watching', spend: '$13,240', stage: 'Canary' },
  { name: 'Cipher Desk', owner: 'CD', status: 'Blocked', spend: '$8,520', stage: 'Review' },
  { name: 'Delta Ops', owner: 'DO', status: 'Healthy', spend: '$31,120', stage: 'Production' },
] as const

const events = [
  'Billing export completed',
  'Feature flag promoted',
  'A/B experiment reached sample size',
  'Security review requested',
  'Workspace theme synced',
  'Data retention policy updated',
] as const

interface BriefFormValues {
  project: string
  owner: string
}

export function ShowcaseApp() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(() => new Date(2026, 3, 24))
  const [date, setDate] = useState<Date | undefined>(() => new Date(2026, 3, 29))
  const [confidence, setConfidence] = useState([72])
  const [compressed, setCompressed] = useState(true)
  const [activeFilter, setActiveFilter] = useState('growth')
  const [pinned, setPinned] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const form = useForm<BriefFormValues>({
    defaultValues: {
      project: 'Northstar launch',
      owner: 'Ari Morgan',
    },
    mode: 'onChange',
  })

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <Sidebar className="hidden min-h-screen rounded-none border-r border-border lg:flex">
            <SidebarHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  Z
                </div>
                <div>
                  <Typography variant="subtitle1" weight="semibold">
                    ZUI Command
                  </Typography>
                  <Typography variant="caption" tone="muted">
                    Component showcase
                  </Typography>
                </div>
              </div>
            </SidebarHeader>
            <SidebarSection>
              <SidebarSectionTitle>Workspace</SidebarSectionTitle>
              <SidebarNavItem active>Overview</SidebarNavItem>
              <SidebarNavItem>Signals</SidebarNavItem>
              <SidebarNavItem>Automations</SidebarNavItem>
              <SidebarNavItem>Design audit</SidebarNavItem>
            </SidebarSection>
            <SidebarSection>
              <SidebarSectionTitle>Component groups</SidebarSectionTitle>
              <SidebarNavItem>Navigation</SidebarNavItem>
              <SidebarNavItem>Forms</SidebarNavItem>
              <SidebarNavItem>Overlays</SidebarNavItem>
            </SidebarSection>
          </Sidebar>

          <main className="min-w-0">
            <section className="border-b border-border bg-card/70 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-3">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Apps</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Showcase</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard view</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <div>
                    <Typography variant="h1">ZUI dashboard showcase</Typography>
                    <Typography variant="body2" tone="muted">
                      A static product command center that puts every React component into a
                      believable dashboard surface.
                    </Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>Workspace</MenubarTrigger>
                      <MenubarContent>
                        <MenubarLabel>Reports</MenubarLabel>
                        <MenubarGroup>
                          <MenubarItem>New report</MenubarItem>
                          <MenubarItem>Import view</MenubarItem>
                        </MenubarGroup>
                        <MenubarSeparator />
                        <MenubarItem>
                          Command palette
                          <MenubarShortcut>Ctrl K</MenubarShortcut>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>View</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Density compact</MenubarItem>
                        <MenubarItem>Show alerts</MenubarItem>
                        <MenubarSub>
                          <MenubarSubTrigger>Panels</MenubarSubTrigger>
                          <MenubarSubContent>
                            <MenubarItem>Metrics</MenubarItem>
                            <MenubarItem>Timeline</MenubarItem>
                          </MenubarSubContent>
                        </MenubarSub>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                  <Toolbar>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          color="neutral"
                          onClick={() => toast.success('Snapshot queued')}
                        >
                          Snapshot
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Uses Sonner toast feedback</TooltipContent>
                    </Tooltip>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button type="button" size="sm">
                          Brief
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Executive brief</DialogTitle>
                          <DialogDescription>
                            This modal previews the same launch metrics from the dashboard.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {healthMetrics.map((metric) => (
                            <Card key={metric.label}>
                              <CardHeader className="space-y-1">
                                <CardDescription>{metric.label}</CardDescription>
                                <CardTitle>{metric.value}</CardTitle>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                        <DialogClose asChild>
                          <Button type="button" size="sm" variant="outline" color="neutral">
                            Dismiss
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button type="button" size="sm" variant="outline" color="neutral">
                          Inspect
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent side="right">
                        <DrawerHeader>
                          <DrawerTitle>Inspector drawer</DrawerTitle>
                          <DrawerDescription>
                            A side panel for the selected customer segment and checks.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="space-y-4">
                          <Alert intent="info">
                            <AlertTitle>Drawer context</AlertTitle>
                            <AlertDescription>
                              Use drawers for dense side tasks without leaving the dashboard.
                            </AlertDescription>
                          </Alert>
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => toast.message('Inspector action clicked')}
                          >
                            Run inspection
                          </Button>
                        </div>
                        <DrawerClose asChild>
                          <Button className="mt-auto w-full" variant="outline" color="neutral">
                            Close
                          </Button>
                        </DrawerClose>
                      </DrawerContent>
                    </Drawer>
                  </Toolbar>
                </div>
              </div>
            </section>

            <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
              <Alert intent="success">
                <AlertTitle>All component areas are represented</AlertTitle>
                <AlertDescription>
                  This view covers navigation, inputs, overlays, feedback, data display, and layout
                  components using dashboard-shaped examples.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 md:grid-cols-3">
                {healthMetrics.map((metric) => (
                  <Card key={metric.label}>
                    <CardHeader className="flex-row items-start justify-between space-y-0">
                      <div>
                        <CardDescription>{metric.label}</CardDescription>
                        <CardTitle>{metric.value}</CardTitle>
                      </div>
                      <Badge color={metric.color}>{metric.change}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Progress value={metric.label === 'Queue risk' ? 38 : 76} />
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-3 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Spinner size="sm" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(360px,0.85fr)]">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <CardTitle>Deployment control room</CardTitle>
                        <CardDescription>
                          Tables, menus, avatars, context actions, and pagination in one data panel.
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button type="button" size="sm" variant="outline" color="neutral">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Bulk action</DropdownMenuLabel>
                            <DropdownMenuItem>Export selected</DropdownMenuItem>
                            <DropdownMenuItem>Assign owner</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Archive stale rows</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button type="button" size="sm" variant="outline" color="neutral">
                              Command
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0">
                            <Command>
                              <CommandInput placeholder="Search automations..." />
                              <CommandList>
                                <CommandEmpty>No automation found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                  <CommandItem>
                                    Summarize risk
                                    <CommandShortcut>SR</CommandShortcut>
                                  </CommandItem>
                                  <CommandItem>
                                    Invite reviewer
                                    <CommandShortcut>IR</CommandShortcut>
                                  </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Views">
                                  <CommandItem>Open finance board</CommandItem>
                                  <CommandItem>Open incidents</CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ContextMenu>
                      <ContextMenuTrigger asChild>
                        <div className="rounded-lg border border-border">
                          <Table>
                            <TableCaption>
                              Right-click the table region for context actions.
                            </TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Stage</TableHead>
                                <TableHead className="text-right">Spend</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {deployments.map((deployment) => (
                                <TableRow key={deployment.name}>
                                  <TableCell className="font-medium">{deployment.name}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="size-7">
                                        <AvatarImage
                                          src={`https://api.dicebear.com/9.x/initials/svg?seed=${deployment.owner}`}
                                          alt=""
                                        />
                                        <AvatarFallback>{deployment.owner}</AvatarFallback>
                                      </Avatar>
                                      {deployment.owner}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      color={
                                        deployment.status === 'Blocked'
                                          ? 'danger'
                                          : deployment.status === 'Watching'
                                            ? 'warning'
                                            : 'success'
                                      }
                                      variant="soft"
                                    >
                                      {deployment.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{deployment.stage}</TableCell>
                                  <TableCell className="text-right">{deployment.spend}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuLabel>Table actions</ContextMenuLabel>
                        <ContextMenuGroup>
                          <ContextMenuItem>
                            Open row
                            <ContextMenuShortcut>O</ContextMenuShortcut>
                          </ContextMenuItem>
                          <ContextMenuItem>Copy customer URL</ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                        <ContextMenuSub>
                          <ContextMenuSubTrigger>Assign owner</ContextMenuSubTrigger>
                          <ContextMenuSubContent>
                            <ContextMenuItem>Ari Morgan</ContextMenuItem>
                            <ContextMenuItem>Blake Diaz</ContextMenuItem>
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuItem>Escalate risk</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </CardContent>
                  <CardFooter>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Filter studio</CardTitle>
                    <CardDescription>
                      Form primitives, date controls, selectors, and toggles arranged like a
                      dashboard filter drawer.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Form {...form}>
                      <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(() => toast.success('Brief staged'))}
                      >
                        <FormField
                          control={form.control}
                          name="project"
                          rules={{ required: 'Project is required' }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project</FormLabel>
                              <FormControl>
                                <Input placeholder="Launch name" {...field} />
                              </FormControl>
                              <FormDescription>Shown in report headers.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="owner"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Owner</FormLabel>
                              <FormControl>
                                <Input placeholder="Owner name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea id="notes" placeholder="Add dashboard context..." />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Segment</Label>
                            <Select defaultValue="enterprise">
                              <SelectTrigger>
                                <SelectValue placeholder="Select segment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Segments</SelectLabel>
                                  <SelectItem value="enterprise">Enterprise</SelectItem>
                                  <SelectItem value="midmarket">Mid-market</SelectItem>
                                  <SelectItem value="startup">Startup</SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Internal</SelectLabel>
                                  <SelectItem value="sandbox">Sandbox</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Launch date</Label>
                            <DatePicker date={date} onDateChange={setDate} />
                          </div>
                        </div>
                        <div className="space-y-3 rounded-lg border border-border p-3">
                          <Label>Plan</Label>
                          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                            {['starter', 'pro', 'enterprise'].map((plan) => (
                              <label
                                key={plan}
                                className="flex items-center gap-2 text-sm capitalize"
                              >
                                <RadioGroupItem value={plan} />
                                {plan}
                              </label>
                            ))}
                          </RadioGroup>
                          <label className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={notifications}
                              onCheckedChange={(value) => setNotifications(value === true)}
                            />
                            Notify channel
                          </label>
                          <div className="flex items-center justify-between gap-3">
                            <Label htmlFor="automation-switch">Automation</Label>
                            <Switch
                              id="automation-switch"
                              checked={notifications}
                              onCheckedChange={setNotifications}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Confidence</Label>
                            <Typography variant="caption" tone="muted">
                              {confidence[0]}%
                            </Typography>
                          </div>
                          <Slider
                            value={confidence}
                            onValueChange={setConfidence}
                            max={100}
                            step={1}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Stage brief
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.1fr)]">
                <Card>
                  <CardHeader>
                    <CardTitle>Signals timeline</CardTitle>
                    <CardDescription>
                      Scroll area, calendar, accordion, and typography in a supporting panel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Calendar mode="single" selected={calendarDate} onSelect={setCalendarDate} />
                    <Separator />
                    <ScrollArea className="h-52 rounded-lg border border-border p-3">
                      <div className="space-y-3">
                        {events.map((event, index) => (
                          <div key={event} className="flex gap-3">
                            <Badge variant="outline" color="neutral">
                              {index + 1}
                            </Badge>
                            <div>
                              <Typography variant="body2" weight="medium">
                                {event}
                              </Typography>
                              <Typography variant="caption" tone="muted">
                                Synced {index + 2} minutes ago
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="coverage">
                        <AccordionTrigger>What is included?</AccordionTrigger>
                        <AccordionContent>
                          All exported React component areas are placed into the page, from app
                          shell navigation through overlays and feedback.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="purpose">
                        <AccordionTrigger>Is this app functional?</AccordionTrigger>
                        <AccordionContent>
                          Only enough state is wired to make controlled primitives render naturally.
                          The dashboard itself is intentionally static.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <CardTitle>Experience lab</CardTitle>
                        <CardDescription>
                          Tabs, toggle controls, alerts, and button variants for dense dashboard
                          workflows.
                        </CardDescription>
                      </div>
                      <Toggle
                        pressed={pinned}
                        onPressedChange={setPinned}
                        aria-label="Pin experience lab"
                      >
                        {pinned ? 'Pinned' : 'Pin'}
                      </Toggle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview">
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="controls">Controls</TabsTrigger>
                        <TabsTrigger value="states">States</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                          {(['solid', 'outline', 'ghost'] as const).map((variant) => (
                            <Button key={variant} variant={variant} color="primary">
                              {variant}
                            </Button>
                          ))}
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Alert intent="warning">
                            <AlertTitle>Forecast drift</AlertTitle>
                            <AlertDescription>
                              One metric moved outside the expected range.
                            </AlertDescription>
                          </Alert>
                          <Alert intent="danger">
                            <AlertTitle>Budget guardrail</AlertTitle>
                            <AlertDescription>
                              The blocked customer requires a review.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </TabsContent>
                      <TabsContent value="controls" className="space-y-4">
                        <ToggleGroup
                          type="single"
                          value={activeFilter}
                          onValueChange={(value) => {
                            if (value) {
                              setActiveFilter(value)
                            }
                          }}
                          aria-label="Dashboard filter"
                        >
                          <ToggleGroupItem value="growth">Growth</ToggleGroupItem>
                          <ToggleGroupItem value="risk">Risk</ToggleGroupItem>
                          <ToggleGroupItem value="cost">Cost</ToggleGroupItem>
                        </ToggleGroup>
                        <ToggleGroup type="multiple" defaultValue={['email']} aria-label="Channels">
                          <ToggleGroupItem value="email">Email</ToggleGroupItem>
                          <ToggleGroupItem value="slack">Slack</ToggleGroupItem>
                          <ToggleGroupItem value="web">Web</ToggleGroupItem>
                        </ToggleGroup>
                        <div className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div>
                            <Typography variant="subtitle2">Compressed mode</Typography>
                            <Typography variant="caption" tone="muted">
                              Demonstrates controlled switch state.
                            </Typography>
                          </div>
                          <Switch checked={compressed} onCheckedChange={setCompressed} />
                        </div>
                      </TabsContent>
                      <TabsContent value="states">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardDescription>Loading state</CardDescription>
                              <CardTitle>Skeleton preview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <Skeleton className="h-4 w-2/3" />
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-20 w-full rounded-lg" />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardDescription>Live job</CardDescription>
                              <CardTitle>Spinner preview</CardTitle>
                            </CardHeader>
                            <CardContent className="flex min-h-32 items-center justify-center">
                              <Spinner size="lg" />
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Coverage board</CardTitle>
                  <CardDescription>
                    Every exported component area from the React barrel is accounted for in this
                    dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {componentCoverage.map((component) => (
                      <Badge key={component} variant="outline" color="neutral">
                        {component}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
        <Toaster richColors />
      </div>
    </TooltipProvider>
  )
}
