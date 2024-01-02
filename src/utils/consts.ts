import path from "node:path";
import { fileURLToPath } from "node:url";

export const dirname = path
	.dirname(new URL(import.meta.url).pathname)
	.replace("/dist", "");


const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);

export const PKG_ROOT = path.join(distPath, "../");
  
