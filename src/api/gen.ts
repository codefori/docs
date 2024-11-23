import { ClassDeclaration, InterfaceDeclaration, TypescriptParser } from "typescript-parser";
import path from "path";
import { stat, writeFile, readFile } from "fs/promises";

const exists = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    stat(path).then(() => resolve(true)).catch(() => resolve(false));
  });
}

const PRIVATE = 0;
let parsedFiles: string[] = [];
let sections: { [key: string]: string } = {};
const parser = new TypescriptParser();

// or a filepath
const HEADER_MDX = 'src/api/header.mdx';
const WORKSPACE = 'node_modules/@halcyontech/vscode-ibmi-types/';

if (await exists(HEADER_MDX)) {
  const header = await readFile(HEADER_MDX, 'utf8');
  sections['header'] = header + `\n\n`;
}

const parseFile = async (tsPath: string) => {
  if (parsedFiles.includes(tsPath)) {
    return [];
  }

  const parsed = await parser.parseFile(tsPath, WORKSPACE);

  parsedFiles.push(tsPath);

  const baseName = path.basename(tsPath);
  // console.log(tsPath);

  let id = parsed.identifier;
  let interfaces: string[] = [];
  let classes: string[] = [];

  for (const variable of parsed.declarations) {
    if (variable instanceof InterfaceDeclaration) {
      interfaces.push(`### ${variable.name}`, ``, `#### Properties`, ``);
      for (const property of variable.properties) {
        interfaces.push(`- \`${property.name}${property.isOptional ? `?` : ``}: ${property.type}\``);
      }
      interfaces.push(``);
      
    } else if (variable instanceof ClassDeclaration) {
      classes.push(`### ${variable.name}`, ``);

      const staticProps = variable.properties.filter(p => p.isStatic && p.visibility !== PRIVATE);
      const staticMethods = variable.methods.filter(m => m.isStatic && m.visibility !== PRIVATE);

      if (staticProps.length > 0 || staticMethods.length > 0) {
        classes.push(`#### Static`, ``);
        for (const prop of staticProps) {
          classes.push(`- \`${prop.name}: ${prop.type}\``);
        }
        for (const prop of staticMethods) {
          classes.push(`- \`${prop.isAsync ? `async ` : ``}${prop.name}(${prop.parameters.map(p => `${p.name}: ${p.type}`).join(', ')}): ${prop.type}\``);
        }
        classes.push(``);
      }

      const ctor = variable.ctor;

      if (ctor) {
        classes.push(`#### Constructor`, ``);
        classes.push(`- \`${variable.name}(${ctor.parameters.map(p => `${p.name}: ${p.type}`).join(', ')}): ${variable.name}\``);
        classes.push(``);
      }

      const instanceProps = variable.properties.filter(p => !p.isStatic && p.visibility !== PRIVATE);
      const instanceMethods = variable.methods.filter(m => !m.isStatic && m.visibility !== PRIVATE);

      if (instanceProps.length > 0) {
        classes.push(`#### Properties`, ``);
        for (const prop of instanceProps) {
          classes.push(`- \`${prop.name}${prop.isOptional ? `?` : ``}: ${prop.type}\``);
        }
        classes.push(``);
      }

      if (instanceMethods.length > 0) {
        classes.push(`#### Methods`, ``);
        for (const prop of instanceMethods) {
          classes.push(`- \`${prop.isAsync ? `async ` : ``}${prop.name}(${prop.parameters.map(p => `${p.name}: ${p.type}`).join(', ')}): ${prop.type}\``);
        }
        classes.push(``);
      }

    } else {
      console.log(variable);
    }
  }

  // console.log(interfaces);

  const imports = parsed.imports;
  let subLines: string[] = [];
  for (const importDetail of imports) {
    if (importDetail.libraryName.startsWith('.')) {
      const dPath = path.join(parsed.filePath, `..`, importDetail.libraryName + `.d.ts`);
      if (await exists(dPath)) {
        parseFile(dPath);
      } else {
        console.log(`Could not find ${dPath}`);
      }
    }
  }

  sections[baseName] = [`## ${baseName}`, ...classes, ...interfaces, ``].join('\n');
}

await parseFile('node_modules/@halcyontech/vscode-ibmi-types/typings.d.ts');

const allLines = Object.keys(sections).map(k => sections[k]).flat();

await writeFile('src/content/docs/dev/api.mdx', allLines);