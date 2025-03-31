
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

export const responsiveSpacing = {
  sm: "gap-2 sm:gap-4",
  md: "gap-3 sm:gap-5 md:gap-6",
  lg: "gap-4 sm:gap-6 md:gap-8 lg:gap-10"
}

export const responsiveGrid = {
  autoFit: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  cols2: "grid grid-cols-1 sm:grid-cols-2",
  cols3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  cols4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}
