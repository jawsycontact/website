import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default async function HomePage() {
    const t = await getTranslations("home");

    return (
        <section className="mx-auto w-full max-w-2xl space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">
                {t("description")}
            </p>
            <Card size="sm" className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
                <CardHeader className="gap-2">
                    <CardTitle>{t("registerCta.title")}</CardTitle>
                    <CardDescription>{t("registerCta.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/registration">{t("registerCta.button")}</Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
}
