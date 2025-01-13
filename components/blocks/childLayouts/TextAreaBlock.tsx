"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ChevronDown, NotebookTextIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    ObjectBlockType,
    FormBlockInstance,
    FormBlockType,
    FormCategoryType,
    HandleBlurFunc
} from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useBuilder } from "@/context/builderProvider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const blockType: FormBlockType = "TextArea";
const blockCategory: FormCategoryType = "Field";

type attributesType = {
    label: string;
    helperText: string;
    required: boolean;
    placeHolder: string;
    rows: number;
};

type PropertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
    placeHolder: z.string().trim().optional(),
    label: z.string().trim().min(2).max(255),
    required: z.boolean().default(false),
    helperText: z.string().trim().max(255).optional(),
    rows: z.number().min(1).max(20).default(3),
});

export const TextAreaBlock: ObjectBlockType = {
    blockType,
    blockCategory,
    createInstance: (id: string) => ({
        id,
        blockType,
        attributes: {
            label: "Text Area",
            helperText: "",
            required: false,
            placeHolder: "Enter text here.",
            rows: 3,
        },
    }),
    blockBtnElement: {
        icon: NotebookTextIcon,
        label: "Text Area",
    },
    canvasComponent: TextAreaCanvasComponent,
    formComponent: TextAreaFormComponent,
    propertiesComponent: TextAreaPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
    attributes: attributesType;
};

function TextAreaCanvasComponent({
    blockInstance,
}: {
    blockInstance: FormBlockInstance;
}) {
    const block = blockInstance as NewInstance;
    const { label, placeHolder, required, helperText, rows, cols } =
        block.attributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-base !font-normal mb-2">
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
                placeholder={placeHolder}
                rows={rows || 3}
                cols={cols || 50}
                readOnly
                className="resize-none !min-h-[50px] !pointer-events-none cursor-default"
            />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}

function TextAreaFormComponent({
    blockInstance,
    isError: isSubmitError,
    errorMessage,
}: {
    blockInstance: FormBlockInstance;
    handleBlur?: HandleBlurFunc;
    isError?: boolean;
    errorMessage?: string;
}) {
    const block = blockInstance as NewInstance;
    const { label, placeHolder, required, helperText, rows, cols } =
        block.attributes;

    const [value, setValue] = useState("");
    const [isError, setIsError] = useState(false);

    const validateField = (val: string) => {
        if (required) {
            return val.trim().length > 0;
        }
        return true;
    };
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label
                className={`text-base !font-normal mb-2 ${isError || isSubmitError ? "text-red-500" : ""
                    }`}
            >
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
                placeholder={placeHolder}
                rows={rows || 3}
                cols={cols || 50}
                className={`resize-none !min-h-[50px] ${isError ? "!border-red-500" : ""
                    }`}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={(event) => {
                    const inputValue = event.target.value;
                    const isValid = validateField(inputValue);
                    setIsError(!isValid);
                }}
            />
            {helperText && (
                <p className="text-muted-foreground text-xs">{helperText}</p>
            )}

            {isError ? (
                <p className="text-red-500 text-xs">
                    {required && value.trim().length === 0
                        ? `This field is required.`
                        : ""}
                </p>
            ) : (
                errorMessage && (
                    <p className="text-red-500 text-xs">{errorMessage}</p>
                )
            )}
        </div>
    );
}

function TextAreaPropertiesComponent({
    positionIndex,
    parentId,
    blockInstance,
}: {
    positionIndex?: number;
    parentId?: string;
    blockInstance: FormBlockInstance;
}) {
    const block = blockInstance as NewInstance;
    const { updateChildBlock } = useBuilder();


    const form = useForm<PropertiesValidateSchemaType>({
        resolver: zodResolver(propertiesValidateSchema),
        defaultValues: {
            label: block.attributes.label,
            helperText: block.attributes.helperText,
            required: block.attributes.required,
            placeHolder: block.attributes.placeHolder,
            rows: block.attributes.rows,
        },
        mode: "onBlur",
    });

    useEffect(() => {
        form.reset({
            label: block.attributes.label,
            helperText: block.attributes.helperText,
            required: block.attributes.required,
            placeHolder: block.attributes.placeHolder,
            rows: block.attributes.rows,
        });
    }, [block.attributes, form]);

    function setChanges(values: PropertiesValidateSchemaType) {
        if (!parentId) return null;
        updateChildBlock(parentId, block.id, {
            ...block,
            attributes: {
                ...block.attributes,
                ...values,
            },
        });
    }

    return (
        <div className="w-full  pb-4">
            <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
                <span className="text-sm font-medium text-gray-600 tracking-wider">
                    Text Area {positionIndex}
                </span>
                <ChevronDown className="w-4 h-4" />
            </div>

            <Form {...form}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full space-y-3 px-4"
                >
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Label
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="max-w-[187px]"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        label: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="helperText"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Note
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        helperText: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-[11px] mt-2 pl-1">
                                            Provide a short note to guide users
                                        </FormDescription>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="placeHolder"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Placeholder
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        placeHolder: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rows"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Rows
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                defaultValue={3}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        rows: Number(e.target.value),
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="required"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Required
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                                setChanges({
                                                    ...form.getValues(),
                                                    required: value,
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}