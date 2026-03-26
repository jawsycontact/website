import { NextResponse } from "next/server";
import * as z from "zod";
import { createClient } from "@/lib/supabase/server";
import { registrationFormSchema } from "@/lib/forms/registration";
import packageJson from "@/package.json";

const requestSchema = z.object({
    locale: z.string().min(2).max(10).optional(),
    data: registrationFormSchema,
});

const THEME_FIELD_MAP = [
    ["themeIdentityBelonging", "identity-belonging"],
    ["themePossibilitiesPressure", "possibilities-pressure"],
    ["themeFriendshipConnections", "friendship-connections"],
    ["themeSoloSelfLove", "solo-self-love"],
    ["themeAdulthoodScam", "adulthood-scam"],
] as const;
const REGISTRATION_SOURCE = `${packageJson.name}@${packageJson.version}`;

function toNullable(value: string | undefined) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
}

export async function POST(request: Request) {
    let rawBody: unknown;
    try {
        rawBody = await request.json();
    } catch {
        return NextResponse.json(
            { message: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const parsed = requestSchema.safeParse(rawBody);
    if (!parsed.success) {
        const fieldErrors = z.flattenError(parsed.error).fieldErrors;
        return NextResponse.json(
            {
                message: "Validation failed.",
                errors: fieldErrors,
            },
            { status: 400 }
        );
    }

    const { data, locale } = parsed.data;

    const selectedThemes = THEME_FIELD_MAP.flatMap(([field, key]) =>
        data[field] ? [key] : []
    );

    const supabase = await createClient();
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || null;
    const userAgent = request.headers.get("user-agent");

    const { error } = await supabase.from("registration_submissions").insert({
        source: REGISTRATION_SOURCE,
        locale: locale ?? null,
        full_name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        age: data.age ?? null,
        city_or_district: toNullable(data.cityOrDistrict),
        language_preferences: data.languagePreferences,
        gender: toNullable(data.gender),
        join_reason: toNullable(data.joinReason),
        selected_themes: selectedThemes,
        instagram_handle: toNullable(data.instagramHandle),
        camera_consent: data.cameraConsent,
        additional_notes: toNullable(data.additionalNotes),
        form_payload: {
            themes: {
                themeIdentityBelonging: data.themeIdentityBelonging,
                themePossibilitiesPressure: data.themePossibilitiesPressure,
                themeFriendshipConnections: data.themeFriendshipConnections,
                themeSoloSelfLove: data.themeSoloSelfLove,
                themeAdulthoodScam: data.themeAdulthoodScam,
            },
            selectedThemes,
        },
        metadata: {
            userAgent,
            ipAddress,
        },
        schema_version: 1,
    });

    if (error) {
        return NextResponse.json(
            {
                message: "Unable to submit registration at this time.",
            },
            { status: 500 }
        );
    }

    return NextResponse.json(
        {
            message: "Registration submitted successfully.",
        },
        { status: 201 }
    );
}
