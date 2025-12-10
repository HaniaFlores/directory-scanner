import { DirectoryScanner } from "./scanner";


/**
 * Entry point of the application.
 * Reads command-line arguments, creates a DirectoryScanner instance,
 * and triggers the scanning process.
 */

async function main() {

    // Expecting a path as the 3rd argument: npm start <path>
    const path = process.argv[2];

    // If the user did not input a directory path, show usage instructions
    if (!path) {
        console.log("Usage: npm start <directory-path>");
        return;
    }

    // Create scanner with user-supplied directory path
    const scanner = new DirectoryScanner(path);

    try {
        // Start scanning the directory structure
        await scanner.scan();
    } catch (err: any) {

        // Display readable error messages for invalid paths or permission issues
        console.error(`Error: ${err.message}`);
    }
}

main();
