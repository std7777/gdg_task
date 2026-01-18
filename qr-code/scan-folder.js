import fs from "fs";
import path from "path";
import { scanFromFile } from "qr-scanner-cli";

const FOLDER = "./qr_code_zipbomb";

function normalize(value) {
    return value
        .replace(/\(scan\s*#\d+\)/i, "") // remove "(scan #123)"
        .replace(/\s+/g, " ")            // normalize whitespace
        .trim();
}

async function run() {
    const files = fs.readdirSync(FOLDER);
    const groups = {};

    for (const file of files) {
        const filePath = path.join(FOLDER, file);

        let value;
        try {
            value = await scanFromFile(filePath);
        } catch {
            value = "[SCAN FAILED]";
        }

        const normalized = normalize(value);

        if (!groups[normalized]) {
            groups[normalized] = [];
        }
        groups[normalized].push(file);
    }

    // Print grouped results
    for (const [value, fileList] of Object.entries(groups)) {
        console.log("\n==============================");
        console.log(`"${value}"`);
        console.log(`Count: ${fileList.length}`);
        console.log(`Files: ${fileList.join(", ")}`);
    }
}

run();
