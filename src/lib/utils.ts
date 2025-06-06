import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

type ResponseData = {
  category: string;
  title: string;
  slug: string;
}[];

export const fetcher = (
  ...args: Parameters<typeof fetch>
): Promise<ResponseData> => fetch(...args).then((res) => res.json());
