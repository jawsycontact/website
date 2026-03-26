"use client";
import * as z from "zod";
import { createRegistrationFormSchema } from "@/lib/forms/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
    FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type Schema = z.infer<ReturnType<typeof createRegistrationFormSchema>>;

export function RegistrationForm() {
    const locale = useLocale();
    const t = useTranslations("registration.form");
    const tValidation = useTranslations("registration.validation");
    const registrationFormSchema = createRegistrationFormSchema((key) =>
        tValidation(key)
    );
    const form = useForm<Schema>({
        resolver: zodResolver(registrationFormSchema as never),
        defaultValues: {
            fullName: "",
            email: "",
            age: undefined,
            cityOrDistrict: "",
            languagePreferences: [],
            gender: undefined,
            joinReason: "",
            themeIdentityBelonging: false,
            themePossibilitiesPressure: false,
            themeFriendshipConnections: false,
            themeSoloSelfLove: false,
            themeAdulthoodScam: false,
            instagramHandle: "",
            cameraConsent: false,
            additionalNotes: "",
        },
    });
    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    const handleSubmit = form.handleSubmit(async (data: Schema) => {
        try {
            form.clearErrors("root");
            const response = await fetch("/api/registration-submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    locale,
                    data,
                }),
            });

            const result = (await response.json()) as {
                message: string;
                errors?: Partial<Record<keyof Schema, string[]>>;
            };

            if (!response.ok) {
                if (result.errors) {
                    for (const [fieldName, messages] of Object.entries(result.errors)) {
                        const message = messages?.[0];
                        if (!message) {
                            continue;
                        }

                        form.setError(fieldName as keyof Schema, {
                            message,
                        });
                    }
                } else {
                    form.setError("root", {
                        message: result.message || t("errors.submitFailed"),
                    });
                }
                return;
            }

            form.reset();
        } catch {
            form.setError("root", {
                message: t("errors.submitFailed"),
            });
        }
    });

    if (isSubmitSuccessful) {
        return (
            <div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
                    className="h-full py-6 px-3"
                >
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                        }}
                        className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
                    >
                        <Check className="size-8" />
                    </motion.div>
                    <h2 className="text-center text-2xl text-pretty font-bold mb-2">
                        {t("success.title")}
                    </h2>
                    <p className="text-center text-lg text-pretty text-muted-foreground">
                        {t("success.description")}
                    </p>
                </motion.div>
            </div>
        );
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border max-w-3xl mx-auto"
        >
            <FieldGroup className="grid md:grid-cols-6 gap-4 mb-6">
                <Controller
                    name="fullName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="fullName">{t("fields.fullName.label")}</FieldLabel>
                            <Input
                                {...field}
                                id="fullName"
                                type="text"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={t("fields.fullName.placeholder")}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="email">{t("fields.email.label")}</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="text"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={t("fields.email.placeholder")}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="age"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="age">{t("fields.age.label")}</FieldLabel>
                            <Input
                                {...field}
                                id="age"
                                type="number"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    field.onChange(
                                        e.target.value === ""
                                            ? undefined
                                            : e.target.valueAsNumber
                                    );
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={t("fields.age.placeholder")}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="cityOrDistrict"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="cityOrDistrict">
                                {t("fields.cityOrDistrict.label")}
                            </FieldLabel>
                            <Input
                                {...field}
                                id="cityOrDistrict"
                                type="text"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={t("fields.cityOrDistrict.placeholder")}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="languagePreferences"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        const options = [
                            { value: "french", label: t("fields.languagePreferences.options.french") },
                            { value: "anglais", label: t("fields.languagePreferences.options.anglais") },
                            {
                                value: "french but i want to speak en anglais",
                                label: t("fields.languagePreferences.options.frenchToEnglish"),
                            },
                            {
                                value: "english but i want to improve my french",
                                label: t("fields.languagePreferences.options.englishToFrench"),
                            },
                        ];
                        return (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 [&_p]:pb-1 col-span-full"
                            >
                                <FieldLabel htmlFor="languagePreferences">
                                    {t("fields.languagePreferences.label")}
                                </FieldLabel>

                                <MultiSelect
                                    values={field.value ?? []}
                                    onValuesChange={(value) => field.onChange(value ?? [])}
                                >
                                    <MultiSelectTrigger>
                                        <MultiSelectValue placeholder={t("fields.languagePreferences.placeholder")} />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent>
                                        {options.map(({ label, value }) => (
                                            <MultiSelectItem key={value} value={value}>
                                                {label}
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectContent>
                                </MultiSelect>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        );
                    }}
                />

                <Controller
                    name="gender"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        const options = [
                            { value: "female", label: t("fields.gender.options.female") },
                            { value: "male", label: t("fields.gender.options.male") },
                            { value: "other", label: t("fields.gender.options.other") },
                        ];
                        return (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="gender">{t("fields.gender.label")}</FieldLabel>

                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t("fields.gender.placeholder")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        );
                    }}
                />

                <Controller
                    name="joinReason"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="joinReason">
                                {t("fields.joinReason.label")}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="joinReason"
                                value={field.value ?? ""}
                                placeholder={t("fields.joinReason.placeholder")}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <FieldSeparator className="my-4" />
                <h1 className="mt-6 mb-1 font-extrabold text-3xl tracking-tight col-span-full">
                    {t("fields.themes.label")}
                </h1>
                <Controller
                    name="themeIdentityBelonging"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="themeIdentityBelonging"
                                    checked={Boolean(field.value)}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeIdentityBelonging">
                                    {t("fields.themes.options.identityBelonging")}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="themePossibilitiesPressure"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="themePossibilitiesPressure"
                                    checked={Boolean(field.value)}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themePossibilitiesPressure">
                                    {t("fields.themes.options.possibilitiesPressure")}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="themeFriendshipConnections"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="themeFriendshipConnections"
                                    checked={Boolean(field.value)}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeFriendshipConnections">
                                    {t("fields.themes.options.friendshipConnections")}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="themeSoloSelfLove"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="themeSoloSelfLove"
                                    checked={Boolean(field.value)}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeSoloSelfLove">
                                    {t("fields.themes.options.soloSelfLove")}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="themeAdulthoodScam"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="themeAdulthoodScam"
                                    checked={Boolean(field.value)}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeAdulthoodScam">
                                    {t("fields.themes.options.adulthoodScam")}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <FieldSeparator className="my-4" />

                <Controller
                    name="instagramHandle"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="instagramHandle">
                                {t("fields.instagramHandle.label")}
                            </FieldLabel>
                            <Input
                                {...field}
                                id="instagramHandle"
                                type="text"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={t("fields.instagramHandle.placeholder")}
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="additionalNotes"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="additionalNotes">
                                {t("fields.additionalNotes.label")}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="additionalNotes"
                                value={field.value ?? ""}
                                placeholder={t("fields.additionalNotes.placeholder")}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="cameraConsent"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-start gap-2">
                                <Checkbox
                                    aria-invalid={fieldState.invalid}
                                    id="cameraConsent"
                                    name={field.name}
                                    checked={Boolean(field.value)}
                                    onCheckedChange={(checked) =>
                                        field.onChange(checked === true)
                                    }
                                    onBlur={field.onBlur}
                                />
                                <FieldLabel htmlFor="cameraConsent">
                                    {t("fields.cameraConsent.label")}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
            {form.formState.errors.root?.message ? (
                <p className="mb-3 text-sm text-destructive">
                    {form.formState.errors.root.message}
                </p>
            ) : null}
            <div className="flex justify-end items-center w-full">
                <Button disabled={isSubmitting}>
                    {isSubmitting ? t("actions.submitting") : t("actions.submit")}
                </Button>
            </div>
        </form>
    );
}
