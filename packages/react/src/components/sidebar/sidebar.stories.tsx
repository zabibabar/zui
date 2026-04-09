import type { Meta, StoryObj } from '@storybook/react'
import {
  Sidebar,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection,
  SidebarSectionTitle,
} from './sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-80 rounded-lg border border-border">
      <Sidebar className="h-full rounded-lg">
        <SidebarHeader>
          <div className="text-sm font-semibold">App</div>
        </SidebarHeader>
        <SidebarSection>
          <SidebarSectionTitle>Nav</SidebarSectionTitle>
          <SidebarNavItem active>Dashboard</SidebarNavItem>
          <SidebarNavItem>Settings</SidebarNavItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
}
