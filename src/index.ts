import { DirectoryScanner } from "./scanner";

async function main() {
    const path = process.argv[2];

    if (!path) {
        console.log("Usage: npm start <directory-path>");
        return;
    }

    const scanner = new DirectoryScanner(path);

    try {
        await scanner.scan();
    } catch (err: any) {
        console.error(`Error: ${err.message}`);
    }
}

main();
