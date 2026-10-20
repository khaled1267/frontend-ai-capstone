"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(50, "Use 50 characters or fewer."),
  email: z.email("Enter a valid email address."),
  timezone: z.string().min(1, "Choose a time zone."),
  productUpdates: z.boolean(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

const defaultValues: SettingsValues = {
  displayName: "",
  email: "",
  timezone: "",
  productUpdates: true,
};

export default function SettingsForm() {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  function onSubmit() {
    setSaved(true);
  }

  function clearSavedMessage() {
    if (saved) setSaved(false);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onChange={clearSavedMessage}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor="displayName"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Display name
          </label>
          <input
            id="displayName"
            autoComplete="name"
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={
              errors.displayName ? "displayName-error" : undefined
            }
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 aria-[invalid=true]:border-red-500"
            placeholder="e.g. Alex Morgan"
            {...register("displayName", { onChange: clearSavedMessage })}
          />
          {errors.displayName && (
            <p
              id="displayName-error"
              role="alert"
              className="mt-2 text-sm text-red-700"
            >
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 aria-[invalid=true]:border-red-500"
            placeholder="you@example.com"
            {...register("email", { onChange: clearSavedMessage })}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-2 text-sm text-red-700"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Time zone
          </label>
          <select
            id="timezone"
            aria-invalid={Boolean(errors.timezone)}
            aria-describedby={errors.timezone ? "timezone-error" : undefined}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 aria-[invalid=true]:border-red-500"
            {...register("timezone", { onChange: clearSavedMessage })}
          >
            <option value="">Select your time zone</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="Europe/London">London (GMT/BST)</option>
            <option value="Europe/Paris">Central European Time (CET)</option>
            <option value="Asia/Dhaka">Bangladesh Standard Time (BST)</option>
            <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
            <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
          </select>
          {errors.timezone && (
            <p
              id="timezone-error"
              role="alert"
              className="mt-2 text-sm text-red-700"
            >
              {errors.timezone.message}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <label
            htmlFor="productUpdates"
            className="flex cursor-pointer items-start gap-3"
          >
            <input
              id="productUpdates"
              type="checkbox"
              className="mt-1 size-4 rounded border-slate-300 accent-indigo-600 focus:ring-indigo-500"
              {...register("productUpdates", { onChange: clearSavedMessage })}
            />
            <span>
              <span className="block text-sm font-medium text-slate-800">
                Product updates
              </span>
              <span className="mt-1 block text-sm leading-5 text-slate-600">
                Receive occasional news about product improvements.
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse items-start gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className="min-h-5 text-sm text-emerald-700"
        >
          {saved ? "Settings saved for this session." : ""}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
