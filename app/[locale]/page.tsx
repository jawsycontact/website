import {getTranslations} from "next-intl/server";

export default async function HomePage() {
    const t = await getTranslations("home");

    return (
        <section className="mx-auto w-full max-w-2xl space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">
                {t("description")}
            </p>
        </section>
    );
}
