# Overview

This project is a Recursive Directory Scanner written entirely in TypeScript. The goal of this software is to deepen my understanding of TypeScript’s core features—specifically classes, asynchronous functions, recursion, and error handling—while building a functional command-line tool. As a software engineer, I wanted to explore how TypeScript behaves in a real-world file system task, how its type system helps prevent mistakes, and how async logic can be structured cleanly inside a class-based design.

The program scans any directory path provided by the user and displays a clean, hierarchical tree structure showing all subfolders and files. It uses recursion to traverse nested folders, async/await to handle file system operations, and custom exceptions to manage invalid paths or permission errors.

{Provide a link to your YouTube demonstration. It should be a 4-5 minute demo of the software running and a walkthrough of the code. Focus should be on sharing what you learned about the language syntax.}

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

- TypeScript
- Visual Studio Code
- Node.js

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [Node.js File System (fs) Documentation](https://nodejs.org/api/fs.html)
- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- Improve the output formatting using colors for better readability.
- Add Jest tests to validate recursion and error handling logic.
- Add a progress indicator for very large directory scans.