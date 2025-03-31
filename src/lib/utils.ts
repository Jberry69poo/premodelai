
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const container = "px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl"

export const responsiveWidth = {
  full: "w-full",
  normal: "w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl",
  wide: "w-full max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl",
  extraWide: "w-full max-w-xl mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl"
}

export const responsivePadding = {
  section: "py-8 md:py-12 lg:py-16",
  container: "px-4 sm:px-6 lg:px-8",
  inner: "px-4 py-5 sm:p-6"
}

export const responsiveText = {
  heading1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  heading2: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight",
  heading3: "text-xl sm:text-2xl font-semibold",
  body: "text-base sm:text-lg",
  small: "text-sm",
  tiny: "text-xs"
}
