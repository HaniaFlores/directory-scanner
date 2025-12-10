import { promises as fs } from "fs";
import { join } from "path";
import { InvalidPathError, PermissionDeniedError } from "./errors";
import { indent } from "./utils";

export class DirectoryScanner {
    constructor(private rootPath: string) {}

    private async validatePath(): Promise<void> {
        try {
            const stats = await fs.stat(this.rootPath);
            if (!stats.isDirectory()) {
                throw new InvalidPathError(`'${this.rootPath}' is not a directory.`);
            }
        } catch (err: any) {
            if (err.code === "ENOENT") {
                throw new InvalidPathError("The specified path does not exist.");
            }
            if (err.code === "EACCES") {
                throw new PermissionDeniedError("You do not have permission to access this path.");
            }
            throw err;
        }
    }

    public async scan(): Promise<void> {
        await this.validatePath();
        console.log(`Scanning directory: ${this.rootPath}\n`);
        await this.scanRecursive(this.rootPath, 0);
    }

    private async scanRecursive(path: string, level: number): Promise<void> {
        let items;

        try {
            items = await fs.readdir(path);
        } catch (err: any) {
            if (err.code === "EACCES") {
                console.log(indent(level) + "[Permission Denied]");
                return;
            }
            throw err;
        }

        for (const item of items) {
            const fullPath = join(path, item);
            const stats = await fs.stat(fullPath);

            if (stats.isDirectory()) {
                console.log(indent(level) + `📁 ${item}/`);
                await this.scanRecursive(fullPath, level + 1);
            } else {
                console.log(indent(level) + `📄 ${item}`);
            }
        }
    }
}
