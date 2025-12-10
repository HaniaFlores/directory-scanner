export function indent(level: number): string {
    return "  ".repeat(level);
}

export function safeLog(message: string): void {
    console.log(message);
}
