"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { 
  BookOpen, 
  Monitor, 
  Flask, 
  Bath, 
  Building2, 
  ShieldCheck 
} from "lucide-react"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex w-full items-center justify-between rounded-lg bg-gray-50 p-2 text-muted-foreground",
            "border border-gray-100 shadow-sm",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            // Base styles
            "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5",
            "text-sm font-medium transition-all duration-200",
            
            // Default state
            "bg-transparent text-gray-600",
            
            // Hover state
            "hover:bg-gray-100 hover:text-gray-900",
            
            // Active state
            "data-[state=active]:bg-white data-[state=active]:text-primary",
            "data-[state=active]:shadow-sm data-[state=active]:ring-1",
            "data-[state=active]:ring-gray-200",
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            className
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent } 