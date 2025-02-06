'use client'

import { FlameIcon, HomeIcon, PlaySquareIcon } from 'lucide-react'
import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: 'Subscribed',
    url: '/feed/subscribed',
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: 'Trending',
    url: '/feed/trending',
    icon: FlameIcon,
  },
]

export const MainSection = () => {
  // TODO: Implement clerk isSignedIn

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                // TODO: isActive onClick
                isActive={false}
                onClick={() => {}}
              >
                <Link href={item.url} className='flex items-center gap-4'>
                  <item.icon />
                  <span className='text-sm'>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
