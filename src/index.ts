#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { program } from "commander";
import ncp from "ncp";
import chalk from "chalk";
import figlet from "figlet";
import prompts from "prompts";

const dirname = path
	.dirname(new URL(import.meta.url).pathname)
	.replace("/dist", "");

program.version("0.1.0").description(
	chalk.redBright(
		await figlet("Created by z_0", function (err, data) {
			if (err) {
				console.log("Something went wrong...");
				console.dir(err);
				return;
			}
		}),
		"\n\n",
		"A CLI tool inspired by the T3 Stack"
	)
);

program
	.command("create")
	.description("Create a new project")
	.action(async () => {
		const response = await prompts({
			type: "text",
			name: "projectName",
			message: "Enter the project name:",
			validate: (value) =>
				value.trim() !== "" || "Project name cannot be empty",
		});

		const projectName = response.projectName.trim() as string;
		const projectPath = path.join(process.cwd(), projectName);

		// Check if the project directory already exists
		if (fs.existsSync(projectPath)) {
			console.error(
				chalk.red(`Error: Directory "${projectName}" already exists.`)
			);
			process.exit(1);
		}

		// Create the project directory
		fs.mkdirSync(projectPath);

		// Add your logic to generate project files/directory structure here
		const templatePath = path.join(dirname, "template");

		ncp(templatePath, projectPath, (err) => {
			if (err) {
				console.error(chalk.red(`Error copying template files: ${err}`));
				process.exit(1);
			}

			console.log(
				chalk.green(`Project "${projectName}" created successfully.`)
			);
		});
	});

program.parse(process.argv);
