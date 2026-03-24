import {getTranslations} from "next-intl/server";
import {RegistrationForm} from "@/components/forms/registration"

export default async function ContactPage() {
    const t = await getTranslations("contact");

    return (
        <RegistrationForm/>
    );
}
