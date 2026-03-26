import {getTranslations} from "next-intl/server";
import {RegistrationForm} from "@/components/forms/registration"

export default async function RegistrationPage() {
    const t = await getTranslations("registration.page");

    return (
        <section className="mx-auto w-full max-w-3xl space-y-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
                <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>
            <RegistrationForm/>
        </section>
    );
}
