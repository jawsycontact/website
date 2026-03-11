"use client"

import * as React from "react"
import {Button} from "@/components/ui/button"
import {FR, GB} from "country-flag-icons/react/3x2"
import {useLocale, useTranslations} from "next-intl"
import {usePathname, useRouter} from "@/i18n/navigation"

export function LanguageToggleButton() {
    const locale = useLocale()
    const t = useTranslations("languageToggle")
    const pathname = usePathname()
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()

    React.useEffect(() => {
        const nextLocale = locale === "en" ? "fr" : "en"
        router.prefetch(pathname, {locale: nextLocale})
    }, [locale, pathname, router])

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "fr" : "en"
        startTransition(() => {
            const hash = typeof window !== "undefined" ? window.location.hash : ""
            router.replace(`${pathname}${hash}`, {locale: nextLocale, scroll: false})
        })
    }

    const iconBase = "h-[1em] w-[1em] transition-all"
    const isEnglish = locale === "en"

    return (
        <Button
            aria-label={t("label")}
            size="icon"
            onClick={toggleLanguage}
            disabled={isPending}
        >
            <GB className={`${iconBase} ${isEnglish ? "" : "scale-0 opacity-0"}`}/>
            <FR
                className={`${iconBase} absolute scale-0 opacity-0 ${
                    isEnglish ? "" : "scale-100 opacity-100"
                }`}
            />
        </Button>
    )
}
