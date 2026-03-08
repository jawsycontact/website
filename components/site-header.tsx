// components/site-header.tsx
import Link from "next/link";
import {ThemeToggleButton} from "@/components/theme-toggle-button";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";


const NAV = [
    {href: "/", label: "Home"},
    {href: "/contact", label: "Contact"},
];

export function SiteHeader() {
    return (
        <header className="site-header">
            <div className="container site-header-inner">
                <Link href={"/"} className="logo">
                    Logo
                </Link>

                <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    {NAV.map((item) => (
                        <Button
                            key={item.href}
                            asChild
                            variant={"ghost"}
                        >
                            <Link
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <ButtonGroup>
                    <ThemeToggleButton/>
                </ButtonGroup>
            </div>
        </header>
    );
}
