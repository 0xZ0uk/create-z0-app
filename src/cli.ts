import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";
import { getVersion } from "./utils/getVersion";
import prompts from "prompts";

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;

  // Extras
}

interface CliResults {
  appName: string;
  packages?: any[];
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: "create-z0-app",
  packages: [],
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    importAlias: "@/",
  },
};

export const runCli = async (): Promise<any> => {
  const cliResults = defaultOptions;

  const res = program
    .name("create-z0-app")
    .version(await getVersion(), "-v, --version", "Display the version number")
    .description(
      chalk.redBright(
        figlet("Created by z_0", function (err, data) {
          if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
          }
        }),
        "\n\n",
        "An opinionated stack based on the T3 stack."
      )
    )
    .argument(
      "[dir]",
      "The name of the application, as well as the name of the directory to create"
    )
    .option(
      "--noGit",
      "Explicitly tell the CLI to not initialize a new git repo in the project",
      false
    )
    .option(
      "--noInstall",
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      "-y, --default",
      "Bypass the CLI and use all default options to bootstrap a new z0-app",
      false
    )
    .option(
      "-i, --import-alias",
      "Explicitly tell the CLI to use a custom import alias",
      defaultOptions.flags?.importAlias
    )
    .parse(process.argv);

  const cliProvidedName = res.args[0];

  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = res.opts();

  if (cliResults.flags.default) {
    return cliResults;
  }

  try {
    // const pkgManager = "bun";
    const questions: prompts.PromptObject[] = [
      {
        type: "text",
        name: "appName",
        message: "What will your project be called?",
        initial: cliResults.appName,
      },
      {
        type: "toggle",
        choices: [
          { title: "Yes", value: true },
          { title: "No", value: false },
        ], 
        name: "useGit",
        message: "Will you be using git?",
        initial: true,
      },
      {
        type: "toggle",
        choices: [
          { title: "Yes", value: true },
          { title: "No", value: false },
        ], 
        name: "useInstall",
        message: "Will you be installing packages?",
        initial: true,
      },
      {
        type: "text",
        name: "importAlias",
        message: "What will your import alias be?",
        initial: cliResults.flags.importAlias,
      }
    ];

    
    let answers: prompts.Answers<string> = await prompts(questions);
  
    return {
      appName: answers?.appName ?? cliResults.appName,
      packages: [],
      flags: {
        noGit: answers?.useGit ?? cliResults.flags.noGit,
        noInstall: answers?.useInstall ?? cliResults.flags.noInstall,
        default: false,
        importAlias: cliResults.flags.importAlias,
      },
    }
  } catch (err) {
    console.error(err);
  }

  return { res, ...cliResults };
}

