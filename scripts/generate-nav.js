import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../public/docs');
const OUTPUT_FILE = path.join(__dirname, '../src/nav-config.json');

function scanDirectory(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(scanDirectory(filePath));
        } else if (filePath.endsWith('.md')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(content);

            // Calculate relative path from public folder for fetching
            const relativePath = '/docs/' + path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');

            results.push({
                path: relativePath,
                title: data.title || file.replace('.md', ''),
                parent: data.parent || 'Docs',
                nav_order: data.nav_order || 999,
            });
        }
    });

    return results;
}

try {
    console.log(`Scanning for markdown files in ${DOCS_DIR}...`);
    if (!fs.existsSync(DOCS_DIR)) {
        console.error(`Docs directory not found at ${DOCS_DIR}`);
        process.exit(1);
    }
    const files = scanDirectory(DOCS_DIR);

    // Group by parent
    const grouped = files.reduce((acc, file) => {
        const section = file.parent;
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(file);
        return acc;
    }, {});

    // Sort sections and their contents
    Object.keys(grouped).forEach(section => {
        grouped[section].sort((a, b) => a.nav_order - b.nav_order);
    });

    const sortedSections = Object.keys(grouped).sort();
    const finalConfig = sortedSections.reduce((acc, section) => {
        acc[section] = grouped[section];
        return acc;
    }, {});

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalConfig, null, 2));
    console.log(`Successfully generated nav config with ${files.length} pages at ${OUTPUT_FILE}`);
} catch (error) {
    console.error("Error generating nav config:", error);
    process.exit(1);
}
