// components/site-footer.tsx
import * as React from "react"
import packageJson from "@/package.json"

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="container">
                <p className="text-xs sm:text-sm text-muted-foreground text-center whitespace-nowrap">
                    © {new Date().getFullYear()} Pierre Lapolla • v{packageJson.version}
                </p>
            </div>
        </footer>
    )
}
