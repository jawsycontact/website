import * as z from "zod";

export interface ActionResponse<T = never> {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof T]?: string[];
    };
    inputs?: T;
}
type Translate = (key: string) => string;

const fallbackMessages: Record<string, string> = {
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidNumber: "Please enter a valid number",
    selectAtLeastOne: "Please select at least one item",
    selectOne: "Please select an item",
};

function fallbackT(key: string) {
    return fallbackMessages[key] ?? key;
}

export function createRegistrationFormSchema(t: Translate) {
    return z.object({
        fullName: z.string({ error: t("required") }),
        email: z.email({ error: t("invalidEmail") }),
        age: z.coerce
            .number({ error: t("invalidNumber") })
            .optional(),
        cityOrDistrict: z.string({ error: t("required") }).optional(),
        languagePreferences: z
            .array(z.string(), { error: t("selectAtLeastOne") })
            .min(1, t("selectAtLeastOne")),
        gender: z.string().min(1, t("selectOne")).optional(),
        joinReason: z.string({ error: t("required") }).optional(),
        themeIdentityBelonging: z.boolean().default(false),
        themePossibilitiesPressure: z.boolean().default(false),
        themeFriendshipConnections: z.boolean().default(false),
        themeSoloSelfLove: z.boolean().default(false),
        themeAdulthoodScam: z.boolean().default(false),
        instagramHandle: z.string({ error: t("required") }).optional(),
        cameraConsent: z
            .boolean()
            .refine((value) => value === true, { error: t("required") }),
        additionalNotes: z.string({ error: t("required") }).optional(),
    });
}

export const registrationFormSchema = createRegistrationFormSchema(fallbackT);

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
