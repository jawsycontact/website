"use client";
import * as z from "zod";
import { registrationFormSchema } from "@/lib/forms/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { Check } from "lucide-react";
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

type Schema = z.infer<typeof registrationFormSchema>;

export function RegistrationForm() {
    const form = useForm<Schema>({
        resolver: zodResolver(registrationFormSchema as never),
    });
    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    const handleSubmit = form.handleSubmit(async (data: Schema) => {
        try {
            // TODO: implement form submission
            console.log(data);
            form.reset();
        } catch {
            // TODO: handle error
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
                        Thank you
                    </h2>
                    <p className="text-center text-lg text-pretty text-muted-foreground">
                        Form submitted successfully, we will get back to you soon
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
                            <FieldLabel htmlFor="fullName">Name *</FieldLabel>
                            <Input
                                {...field}
                                id="fullName"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={`What's your name ?`}
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
                            <FieldLabel htmlFor="email">Email *</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder={`What's your email ?`}
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
                            <FieldLabel htmlFor="age">Age </FieldLabel>
                            <Input
                                {...field}
                                id="age"
                                type="number"
                                onChange={(e) => {
                                    field.onChange(e.target.valueAsNumber);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="How old are you ?"
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
                                City (or district)
                            </FieldLabel>
                            <Input
                                {...field}
                                id="cityOrDistrict"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Where do you live in (or around) Paris ?"
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
                            { value: "french", label: "French" },
                            { value: "anglais", label: "Anglais" },
                            {
                                value: "french but i want to speak en anglais",
                                label: "French but I want to speak en anglais",
                            },
                            {
                                value: "english but i want to improve my french",
                                label: "English but I want to improve my french",
                            },
                        ];
                        return (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 [&_p]:pb-1 col-span-full"
                            >
                                <FieldLabel htmlFor="languagePreferences">
                                    Language *
                                </FieldLabel>

                                <MultiSelect
                                    values={field.value ?? []}
                                    onValuesChange={(value) => field.onChange(value ?? [])}
                                >
                                    <MultiSelectTrigger>
                                        <MultiSelectValue placeholder="Pick your language preference during the event" />
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
                            { value: "female", label: "Female" },
                            { value: "male", label: "Male" },
                            { value: "other", label: "Other" },
                        ];
                        return (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="gender">Gender </FieldLabel>

                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option" />
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
                                Why do you want to join DIVE ?{" "}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="joinReason"
                                placeholder="What pushed you into joining in ?"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <FieldSeparator className="my-4" />
                <h1 className="mt-6 mb-1 font-extrabold text-3xl tracking-tight col-span-full">
                    Which theme inspires you most ?
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
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeIdentityBelonging">
                                    Identity & Belonging{" "}
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
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themePossibilitiesPressure">
                                    Possibilities & Pressure{" "}
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
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeFriendshipConnections">
                                    Friendship & Connections{" "}
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
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeSoloSelfLove">
                                    Solo in Paris & Self-Love{" "}
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
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="themeAdulthoodScam">
                                    The Adulthood Scam{" "}
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
                                Instagram
                            </FieldLabel>
                            <Input
                                {...field}
                                id="instagramHandle"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                                aria-invalid={fieldState.invalid}
                                placeholder="Type your profile here"
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
                            <div className="flex items-start gap-2 mb-1">
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
                                    Are you ok with being captured on camera ? *
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
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
                                Anything you want to share ?{" "}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="additionalNotes"
                                placeholder="Enter your text"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>
            <div className="flex justify-end items-center w-full">
                <Button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
