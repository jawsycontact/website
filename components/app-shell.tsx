// app-shell.tsx

import * as React from "react"
import {ThemeProvider} from "@/components/theme-provider"
import {SiteHeader} from "@/components/site-header"
import {SiteFooter} from "@/components/site-footer"
import {Analytics} from '@vercel/analytics/next'

export function AppShell({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <div className="min-h-screen flex flex-col">
                <Analytics/>
                <SiteHeader/>
                <main className="flex-1 container py-8">{children}</main>
                <SiteFooter/>
            </div>
        </ThemeProvider>
    )
}
