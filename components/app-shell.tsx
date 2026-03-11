// app-shell.tsx
import React from "react"
import {SiteHeader} from "@/components/site-header"
import {SiteFooter} from "@/components/site-footer"

import {ThemeProvider as NextThemesProvider} from "next-themes"
import {Analytics} from "@vercel/analytics/next"

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

function ThemeProvider({children, ...props}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

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
