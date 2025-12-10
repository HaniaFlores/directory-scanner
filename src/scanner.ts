import { promises as fs } from "fs";
import { join } from "path";
import { InvalidPathError, PermissionDeniedError } from "./errors";
import { indent } from "./utils";


/**
 * DirectoryScanner class:
 * Handles validating a directory path and recursively scanning
 * all subdirectories to produce a tree-like output.
 */

export class DirectoryScanner {
    constructor(private rootPath: string) {}

    /**
     * Validates that the provided root path exists and is a directory.
     * Throws custom errors for invalid paths or permission issues.
     */

    private async validatePath(): Promise<void> {
        try {
            const stats = await fs.stat(this.rootPath);

            // Ensure the path points to a directory
            if (!stats.isDirectory()) {
                throw new InvalidPathError(`'${this.rootPath}' is not a directory.`);
            }
        } catch (err: any) {
            // Path does not exist
            if (err.code === "ENOENT") {
                throw new InvalidPathError("The specified path does not exist.");
            }

             // No permission to access this folder
            if (err.code === "EACCES") {
                throw new PermissionDeniedError("You do not have permission to access this path.");
            }

            throw err;
        }
    }

    /**
     * Public method to start scanning after validation.
     * This is the entry point called by index.ts.
     */
    public async scan(): Promise<void> {
        // Ensure the path is valid before scanning
        await this.validatePath();

        console.log(`Scanning directory: ${this.rootPath}\n`);

        // Begin recursive traversal
        await this.scanRecursive(this.rootPath, 0);
    }

    /**
     * Recursively scans a directory and prints all its files and subdirectories.
     * The function uses async/await since fs operations are asynchronous.
     */

    private async scanRecursive(path: string, level: number): Promise<void> {
        let items;

        try {
            // Read directory contents asynchronously
            items = await fs.readdir(path);
        } catch (err: any) {

            // Handle permission errors gracefully without stopping execution
            if (err.code === "EACCES") {
                console.log(indent(level) + "[Permission Denied]");
                return;
            }
            throw err;
        }

        // Iterate over each file/subfolder inside the current directory
        for (const item of items) {
            const fullPath = join(path, item);
            const stats = await fs.stat(fullPath);

            if (stats.isDirectory()) {
                // Print directory name with folder icon
                console.log(indent(level) + `📁 ${item}/`);

                // Recursively scan deeper into child folder
                await this.scanRecursive(fullPath, level + 1);
            } else {
                // Print file name with file icon
                console.log(indent(level) + `📄 ${item}`);
            }
        }
    }
}
