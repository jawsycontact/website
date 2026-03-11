import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

export default getRequestConfig(async ({requestLocale}) => {
    const locale = await requestLocale;

    const typedLocale = routing.locales.find((value) => value === locale);

    if (!typedLocale) {
        notFound();
    }

    return {
        locale: typedLocale,
        messages: (await import(`../messages/${typedLocale}.json`)).default,
    };
});
