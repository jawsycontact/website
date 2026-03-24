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
    "input-7ba": z.string({ error: "This field is required" }),
    "input-e1e": z.email({ error: "Please enter a valid email" }),
    "input-772": z.coerce
        .number({ error: "Please enter a valid number" })
        .optional(),
    "input-49b": z.string({ error: "This field is required" }).optional(),
    "multiselect-208": z
        .array(z.string(), { error: "Please select at least one item" })
        .min(1, "Please select at least one item"),
    "select-6fd": z.string().min(1, "Please select an item").optional(),
    "textarea-a1a": z.string({ error: "This field is required" }).optional(),
    "checkbox-451": z.boolean().default(false),
    "checkbox-40b": z.boolean().default(false),
    "checkbox-07a": z.boolean().default(false),
    "checkbox-204": z.boolean().default(false),
    "checkbox-8ee": z.boolean().default(false),
    "input-eb8": z.string({ error: "This field is required" }).optional(),
    "switch-a5d": z.literal(true, { error: "This field is required" }),
    "textarea-d7e": z.string({ error: "This field is required" }).optional(),
});