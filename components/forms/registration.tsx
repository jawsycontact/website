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
    FieldContent,
    FieldLabel,
    FieldDescription,
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
import { Switch } from "@/components/ui/switch";

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
        } catch (error) {
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
                    name="input-7ba"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="input-7ba">Name *</FieldLabel>
                            <Input
                                {...field}
                                id="input-7ba"
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
                    name="input-e1e"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="input-e1e">Email *</FieldLabel>
                            <Input
                                {...field}
                                id="input-e1e"
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
                    name="input-772"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="input-772">Age </FieldLabel>
                            <Input
                                {...field}
                                id="input-772"
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
                    name="input-49b"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="input-49b">City (or district) </FieldLabel>
                            <Input
                                {...field}
                                id="input-49b"
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
                    name="multiselect-208"
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
                                <FieldLabel htmlFor="multiselect-208">Language *</FieldLabel>

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
                    name="select-6fd"
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
                                <FieldLabel htmlFor="select-6fd">Gender </FieldLabel>

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
                    name="textarea-a1a"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="textarea-a1a">
                                Why do you want to join DIVE ?{" "}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="textarea-a1a"
                                placeholder="What pushed you into joining in ?"
                            />
                            <FieldDescription>A multi-line text input field</FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <FieldSeparator className="my-4" />
                <h1 className="mt-6 mb-1 font-extrabold text-3xl tracking-tight col-span-full">
                    Which theme inspires you most ?
                </h1>
                <Controller
                    name="checkbox-451"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="checkbox-451"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="checkbox-451">
                                    Identity & Belonging{" "}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="checkbox-40b"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="checkbox-40b"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="checkbox-40b">
                                    Possibilities & Pressure{" "}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="checkbox-07a"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="checkbox-07a"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="checkbox-07a">
                                    Friendship & Connections{" "}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="checkbox-204"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="checkbox-204"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="checkbox-204">
                                    Solo in Paris & Self-Love{" "}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="checkbox-8ee"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Checkbox
                                    id="checkbox-8ee"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldLabel htmlFor="checkbox-8ee">
                                    The Adulthood Scam{" "}
                                </FieldLabel>
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <FieldSeparator className="my-4" />

                <Controller
                    name="input-eb8"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="input-eb8">Instagram </FieldLabel>
                            <Input
                                {...field}
                                id="input-eb8"
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
                    name="switch-a5d"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                            className="col-span-full"
                        >
                            <FieldContent>
                                <FieldLabel htmlFor="switch-a5d">
                                    Are you ok with being captured on camera ? *
                                </FieldLabel>
                                <FieldDescription>Yes or No</FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldContent>
                            <Switch
                                aria-invalid={fieldState.invalid}
                                id="switch-a5d"
                                name={field.name}
                                checked={Boolean(field.value)}
                                onCheckedChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        </Field>
                    )}
                />

                <Controller
                    name="textarea-d7e"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1 col-span-full"
                        >
                            <FieldLabel htmlFor="textarea-d7e">
                                Anything you want to share ?{" "}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                id="textarea-d7e"
                                placeholder="Enter your text"
                            />
                            <FieldDescription>A multi-line text input field</FieldDescription>
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
