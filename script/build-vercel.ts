import { build as viteBuild } from "vite";
import { rm, cp, mkdir } from "fs/promises";
import path from "path";

async function buildForVercel() {
  console.log("Building for Vercel deployment...");
  
  await rm("dist", { recursive: true, force: true });
  await mkdir("dist/public", { recursive: true });

  console.log("Building client with Vite...");
  await viteBuild({
    configFile: path.resolve(process.cwd(), "vite.config.ts"),
    mode: "production",
  });

  console.log("Build completed successfully!");
  console.log("Output directory: dist/public");
}

buildForVercel().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
