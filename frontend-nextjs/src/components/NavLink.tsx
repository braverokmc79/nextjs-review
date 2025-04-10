"use client";
 
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'


interface NavLinkProps {
    children: React.ReactNode,
    href: string,
    prefetch?: boolean,
}


const NavLink:React.FC<NavLinkProps> = ({ children, href , prefetch}) => {
  const pathname = usePathname();
  const isActive = pathname === href

  return (
    <Link href={href} prefetch={prefetch}
    className={cn("block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground text-sm font-medium",
                    isActive && "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-foreground text-white")}
                  >
    {children}
    </Link>
  )
}

export default NavLink