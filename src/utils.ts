/**
 * Produces indentation spaces based on recursion depth.
 * Used to visually format the directory tree output.
 */

export function indent(level: number): string {
    return "  ".repeat(level);
}

/**
 * Wrapper for console.log so we can centralize any
 * logging modifications later if needed.
 */

export function safeLog(message: string): void {
    console.log(message);
}
