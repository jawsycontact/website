import * as z from "zod";

export interface ActionResponse<T = never> {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof T]?: string[];
    };
    inputs?: T;
}
export const registrationFormSchema = z.object({
    fullName: z.string({ error: "This field is required" }),
    email: z.email({ error: "Please enter a valid email" }),
    age: z.coerce
        .number({ error: "Please enter a valid number" })
        .optional(),
    cityOrDistrict: z.string({ error: "This field is required" }).optional(),
    languagePreferences: z
        .array(z.string(), { error: "Please select at least one item" })
        .min(1, "Please select at least one item"),
    gender: z.string().min(1, "Please select an item").optional(),
    joinReason: z.string({ error: "This field is required" }).optional(),
    themeIdentityBelonging: z.boolean().default(false),
    themePossibilitiesPressure: z.boolean().default(false),
    themeFriendshipConnections: z.boolean().default(false),
    themeSoloSelfLove: z.boolean().default(false),
    themeAdulthoodScam: z.boolean().default(false),
    instagramHandle: z.string({ error: "This field is required" }).optional(),
    cameraConsent: z.literal(true, { error: "This field is required" }),
    additionalNotes: z.string({ error: "This field is required" }).optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
