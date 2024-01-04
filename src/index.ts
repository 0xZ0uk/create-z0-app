#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import ncp from "ncp";

import { runCli } from "./cli";
import { initializeGit } from "./helpers/git";
import { installDependencies } from "./helpers/installDependencies";
import { dirname } from "./utils/consts";

const main = async () => {
  const {
    appName,
    flags: { noGit, noInstall },
  } = await runCli();

  if (appName === "") {
    console.error(chalk.red("Project name cannot be empty!"));
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), appName);

  // Check if the project directory already exists
  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`Error: Directory "${appName}" already exists.`));
    process.exit(1);
  }

  // Create the project directory
  fs.mkdirSync(projectPath);

  // Add your logic to generate project files/directory structure here
  const templatePath = path.join(dirname, "template/base");

  ncp(templatePath, projectPath, async (err) => {
    if (err) {
      console.error(chalk.red(`Error copying template files: ${err}`));
      process.exit(1);
    }

    if (noGit) {
      await initializeGit(projectPath);
    }

    // Install dependencies
    if (noInstall) {
      console.log(
        chalk.yellow(
          `Installing dependencies in ${projectPath} using ${chalk.cyan(
            "bun",
          )}...`,
        ),
      );

      await installDependencies(projectPath);
    }

    console.log(chalk.green(`Project "${appName}" created successfully.`));
  });

  // Initialize a new git repo
};

main().catch((err) => {
  console.error("Aborting installation, due to error: ", err);
  process.exit(1);
});
