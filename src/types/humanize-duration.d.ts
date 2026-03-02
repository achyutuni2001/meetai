declare module "humanize-duration" {
  interface HumanizerOptions {
    language?: string;
    languages?: Record<string, unknown>;
    fallbacks?: string[];
    units?: Array<"y" | "mo" | "w" | "d" | "h" | "m" | "s" | "ms">;
    round?: boolean;
    conjunction?: string;
    serialComma?: boolean;
    spacer?: string;
    largest?: number;
    maxDecimalPoints?: number;
    delimiter?: string;
  }

  export default function humanizeDuration(
    ms: number,
    options?: HumanizerOptions,
  ): string;
}
