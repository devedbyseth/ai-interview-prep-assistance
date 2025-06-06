"use client"

import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Controller, Control, FieldValues, Path, Form } from "react-hook-form";
import { Input } from "./ui/input";

interface formFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?:"text" | "password" | "email" | "file";
}

const FormField = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  type = "text",
}: formFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
            className="px-3 py-5 placeholder:!text-sm placeholder:!opacity-50"
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage>{fieldState.error?.message}</FormMessage>

      </FormItem>
    )}
  />
);

export default FormField;
