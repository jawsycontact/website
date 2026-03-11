// components/site-header.tsx
import {Link} from "@/i18n/navigation";
import {ThemeToggleButton} from "@/components/buttons/theme-toggle-button";
import {ExternalLinkButton} from "@/components/buttons/external-link-button";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {LanguageToggleButton} from "@/components/buttons/language-toggle-button";
import {useTranslations} from "next-intl";


export function SiteHeader() {
    const t = useTranslations("header.nav");
    const nav = [
        {href: "/", label: t("home")},
        {href: "/events", label: t("events")},
        {href: "/contact", label: t("contact")},
    ];

    return (
        <header className="site-header">
            <div className="container site-header-inner">
                <Link href={"/"} className="logo">
                    Logo
                </Link>

                <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    {nav.map((item) => (
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
                    <ButtonGroup>
                        <ExternalLinkButton
                            href={"https://instagram.com"}
                            variant="outline"
                        />
                    </ButtonGroup>
                    <ButtonGroup>
                        <LanguageToggleButton/>
                        <ThemeToggleButton/>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
        </header>
    );
}
