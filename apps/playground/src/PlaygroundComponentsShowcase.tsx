import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
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
  ScrollArea,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  toast,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Typography,
} from '@zui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro']

export function PlaygroundComponentsShowcase() {
  const [progress] = useState(62)
  const [sliderVal, setSliderVal] = useState([42])
  const [comboOpen, setComboOpen] = useState(false)
  const [framework, setFramework] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [pressed, setPressed] = useState(false)

  const form = useForm<{ username: string }>({
    defaultValues: { username: '' },
    mode: 'onChange',
  })

  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <Typography variant="h2">Component library</Typography>
        <Typography variant="body2" tone="muted">
          New primitives and patterns—same theme tokens as the mock layouts.
        </Typography>
      </header>

      <div className="rounded-lg border border-border bg-card p-2">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New tab</MenubarItem>
              <MenubarItem>New window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Quit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo
                <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo
                <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Billing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Feedback & loading</CardTitle>
            <CardDescription>Toasts, progress, skeleton, spinner.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={() => toast.success('Theme saved')}>
                Toast success
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                color="neutral"
                onClick={() =>
                  toast.message('Heads up', { description: 'You can stack multiple toasts.' })
                }
              >
                Toast default
              </Button>
            </div>
            <div className="space-y-2">
              <Typography variant="caption" tone="muted">
                Progress
              </Typography>
              <Progress value={progress} />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
              <div className="grow space-y-2">
                <Skeleton className="h-4 w-3/4 max-w-[200px]" />
                <Skeleton className="h-3 w-1/2 max-w-[140px]" />
              </div>
              <Spinner size="lg" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form field</CardTitle>
            <CardDescription>react-hook-form + FormField + FormLabel.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(() => toast.success('Submitted'))}
              >
                <FormField
                  control={form.control}
                  name="username"
                  rules={{
                    required: 'Username is required',
                    minLength: { value: 2, message: 'Min 2 characters' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="jane.doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="sm">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs & toggles</CardTitle>
            <CardDescription>Slider, toggle, segmented control.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Typography variant="caption" tone="muted">
                Volume
              </Typography>
              <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Toggle pressed={pressed} onPressedChange={setPressed} size="sm">
                {pressed ? 'On' : 'Off'}
              </Toggle>
              <ToggleGroup type="single" defaultValue="center" aria-label="Text align">
                <ToggleGroupItem value="left" aria-label="Left">
                  L
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Center">
                  C
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Right">
                  R
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Typography variant="caption" tone="muted">
                Combobox
              </Typography>
              <Popover open={comboOpen} onOpenChange={setComboOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    color="neutral"
                    className="w-full max-w-xs justify-between font-normal"
                  >
                    {framework || 'Pick a framework…'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] max-w-xs p-0"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Search…" />
                    <CommandList>
                      <CommandEmpty>No results.</CommandEmpty>
                      <CommandGroup heading="Suggested">
                        {frameworks.map((f) => (
                          <CommandItem
                            key={f}
                            value={f}
                            onSelect={(currentValue) => {
                              const picked =
                                frameworks.find(
                                  (fw) => fw.toLowerCase() === currentValue.toLowerCase(),
                                ) ?? currentValue
                              setFramework(picked === framework ? '' : picked)
                              setComboOpen(false)
                            }}
                          >
                            {f}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Typography variant="caption" tone="muted">
                Date
              </Typography>
              <DatePicker date={date} onDateChange={setDate} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & menus</CardTitle>
            <CardDescription>Avatars, scroll, context menu, pagination.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Avatar size="sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="md">
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>ZU</AvatarFallback>
              </Avatar>
            </div>
            <ScrollArea className="h-28 rounded-md border border-border">
              <div className="p-3 text-sm text-muted-foreground">
                {Array.from({ length: 12 }, (_, i) => (
                  <p key={i} className="py-1">
                    Scrollable row {i + 1} — uses ScrollArea for consistent overflow.
                  </p>
                ))}
              </div>
            </ScrollArea>
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <button
                  type="button"
                  className="flex w-full max-w-md items-center justify-center rounded-md border border-dashed border-border bg-muted/20 px-4 py-8 text-sm text-muted-foreground"
                >
                  Right-click here
                </button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Duplicate</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-2">
              <Typography variant="caption" tone="muted">
                Pagination
              </Typography>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />
      <Typography variant="caption" tone="muted">
        Tip: resize the window or switch light/dark to see tokens on these primitives.
      </Typography>
    </div>
  )
}
