const fs = require("fs");
const path = require("path");

const dirs = [
  path.join(__dirname, "..", "node_modules", "@prisma", "engines"),
  path.join(__dirname, "..", "node_modules", "@prisma", "client"),
  path.join(__dirname, "..", "node_modules", ".prisma", "client"),
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;

  for (const file of fs.readdirSync(dir)) {
    if (!file.includes("engine")) continue;

    const filePath = path.join(dir, file);
    if (!fs.statSync(filePath).isFile()) continue;

    try {
      fs.chmodSync(filePath, 0o755);
    } catch {
      // chmod is a no-op on some platforms (e.g. Windows) — safe to ignore
    }
  }
}
