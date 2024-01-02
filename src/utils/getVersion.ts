import path from "node:path";
import { promises as fsPromises } from "node:fs";
import { PKG_ROOT } from "./consts";

const { readFile } = fsPromises;

export const getVersion = async () => {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");

  try {
    const packageJsonContent = JSON.parse(await readFile(packageJsonPath, 'utf-8'));

    return packageJsonContent.version ?? "1.0.0";
  } catch (error) {
    console.error(`Error reading package.json: ${error}`);
    return "1.0.0"; // or handle the error as needed
  }
};
