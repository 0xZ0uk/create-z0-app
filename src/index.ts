#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import ncp from "ncp";
import chalk from "chalk";
import { dirname } from "./utils/consts";
import { runCli } from "./cli";
import { initializeGit } from "./helpers/git";


const main = async () => {
	const {
    appName,
    packages,
    flags: { noGit, noInstall, importAlias, appRouter },
  } = await runCli();

		if (appName === "") {
			console.error(chalk.red("Project name cannot be empty!"));
			process.exit(1);
		}

		const projectPath = path.join(process.cwd(), appName);

		// Check if the project directory already exists
		if (fs.existsSync(projectPath)) {
			console.error(
				chalk.red(`Error: Directory "${appName}" already exists.`)
			);
			process.exit(1);
		}

		// Create the project directory
		fs.mkdirSync(projectPath);

		// Add your logic to generate project files/directory structure here
		const templatePath = path.join(dirname, "template/base");

		ncp(templatePath, projectPath, (err) => {
			if (err) {
				console.error(chalk.red(`Error copying template files: ${err}`));
				process.exit(1);
			}

			console.log(
				chalk.green(`Project "${appName}" created successfully.`)
			);
		});

		if (!noGit) {
			await initializeGit(projectPath);
		}

		process.exit(0);
}

main().catch((err) =>  {
	console.error("Aborting installation, due to error: ", err);
	process.exit(1);
})