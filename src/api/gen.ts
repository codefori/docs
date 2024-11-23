import { ClassDeclaration, DefaultDeclaration, File, FunctionDeclaration, InterfaceDeclaration, TypescriptParser, VariableDeclaration } from "typescript-parser";
import type {Declaration} from "typescript-parser";
import path from "path";
import { stat, writeFile, readFile } from "fs/promises";

const exists = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    stat(path).then(() => resolve(true)).catch(() => resolve(false));
  });
}

const htmlEscape = (str: string): string => {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const linkType = (type: string|undefined): string => {
  if (!type) {
    return 'void';
  }

  type = type.trim();

  if (type.includes(`\n`)) {
    type = type.split(`\n`).map(t => t.trim()).join(` `);
  }

  const jsTypes = ['string', 'number', 'boolean', 'object', 'any', 'void', `Date`, `Function`, `undefined`, `Uint8Array`];
  if (jsTypes.includes(type)) {
    return type;
  }

  if (type.includes(`.`) || type.includes(`=>`) || type.includes(`"`) || type.includes(`{`)) {
    return htmlEscape(type);
  }

  if (type.startsWith(`Promise<`)) {
    console.log(type);
    return `Promise&lt;${linkType(type.slice(8, -1))}&gt;`;
  }

  if (type.startsWith(`Array<`)) {
    return `Array&lt;${linkType(type.slice(6, -1))}&gt;`;
  }

  if (type.startsWith(`Partial<`)) {
    return `Partial&lt;${linkType(type.slice(8, -1))}&gt;`;
  }

  if (type.endsWith(`<T>`)) {
    return `${linkType(type.slice(0, -3))}&lt;T&gt;`;
  }

  if (type.endsWith(`[]`)) {
    return `${linkType(type.slice(0, -2))}[]`;
  }

  if (type.includes(`|`)) {
    return type.split(`|`).map(t => linkType(t)).join(` | `);
  }

  return `<a href="#${type.toLowerCase()}">${htmlEscape(type)}</a>`;
}

const PRIVATE = 0;
let parsedFiles: string[] = [];
let sections: { [key: string]: string } = {};
const parser = new TypescriptParser();

// or a filepath
const HEADER_MDX = 'src/api/header.mdx';
const WORKSPACE = 'node_modules/@halcyontech/vscode-ibmi-types/';

const parseFile = async (tsPath: string) => {
  if (parsedFiles.includes(tsPath)) {
    return [];
  }

  console.log(`Parsing ${tsPath}`);

  const parsed = await parser.parseFile(tsPath, WORKSPACE);

  parsedFiles.push(tsPath);

  const baseName = path.basename(tsPath, '.d.ts');
  console.log(baseName);

  let interfaces: string[] = [];
  let functions: string[] = [];
  let classes: string[] = [];
  let variables: string[] = [];

  function handleDeclatation(symbol: Declaration) {

    if (symbol instanceof InterfaceDeclaration) {
      interfaces.push(`### ${symbol.name}`, ``, `#### Properties`, ``);
      for (const property of symbol.properties) {
        interfaces.push(`- ${property.name}${property.isOptional ? `?` : ``}: ${linkType(property.type)}`);
      }
      interfaces.push(``);
      
    } else if (symbol instanceof ClassDeclaration) {
      classes.push(`### ${symbol.name}`, ``);

      const staticProps = symbol.properties.filter(p => p.isStatic && p.visibility !== PRIVATE);
      const staticMethods = symbol.methods.filter(m => m.isStatic && m.visibility !== PRIVATE);

      if (staticProps.length > 0 || staticMethods.length > 0) {
        classes.push(`#### Static`, ``);
        for (const prop of staticProps) {
          classes.push(`- ${prop.name}: ${linkType(prop.type)}`);
        }
        for (const prop of staticMethods) {
          classes.push(`- ${prop.isAsync ? `async ` : ``}**${prop.name}**(${prop.parameters.map(p => `${p.name}: ${linkType(p.type)}`).join(', ')}): ${linkType(prop.type)}`);
        }
        classes.push(``);
      }

      const ctor = symbol.ctor;

      if (ctor) {
        classes.push(`#### Constructor`, ``);
        classes.push(`- ${symbol.name}(${ctor.parameters.map(p => `${p.name}: ${linkType(p.type)}`).join(', ')}): ${symbol.name}`);
        classes.push(``);
      }

      const instanceProps = symbol.properties.filter(p => !p.isStatic && p.visibility !== PRIVATE);
      const instanceMethods = symbol.methods.filter(m => !m.isStatic && m.visibility !== PRIVATE);

      if (instanceProps.length > 0) {
        classes.push(`#### Properties`, ``);
        for (const prop of instanceProps) {
          classes.push(`* ${prop.name}${prop.isOptional ? `?` : ``}: ${linkType(prop.type)}`);
        }
        classes.push(``);
      }

      if (instanceMethods.length > 0) {
        classes.push(`#### Methods`, ``);
        for (const prop of instanceMethods) {
          if (prop.name === 'countFiles') {
            console.log(prop);
          }

          classes.push(`* ${prop.isAsync ? `async ` : ``}**${prop.name}**(${prop.parameters.map(p => `${p.name}: ${linkType(p.type)}`).join(', ')}): ${linkType(prop.type)}`);
        }
        classes.push(``);
      }

    } else if (symbol instanceof FunctionDeclaration) {
      functions.push(`### ${symbol.name}()`, ``);
      functions.push(`- ${symbol.name}(${symbol.parameters.map(p => `${p.name}: ${linkType(p.type)}`).join(', ')}): ${linkType(symbol.type)}`);
      functions.push(``);

    } else if (symbol instanceof VariableDeclaration) {
      variables.push(`- ${symbol.name}: ${linkType(symbol.type)}`);
    
    } else if (symbol instanceof DefaultDeclaration) {

    } else {
      // console.log(symbol);
    }
  }

  if (parsed.declarations.length > 0) {
    for (const variable of parsed.declarations) {
      handleDeclatation(variable);
    }

    if (variables.length > 0) {
      variables = [`### Variables`, ``, ...variables, ``];
    }

    if (classes.length > 0 || interfaces.length > 0 || functions.length > 0 || variables.length > 0) {
      sections[baseName] = [...classes, ...functions, ...variables, ...interfaces, ``].join('\n');
    }
  }

  const imports = parsed.imports;
  for (const importDetail of imports) {
    if (importDetail.libraryName.startsWith('.')) {
      const dPath = path.join(parsed.filePath, `..`, importDetail.libraryName + `.d.ts`);
      if (await exists(dPath)) {
        await parseFile(dPath);
      }
    }
  }
}

await parseFile('node_modules/@halcyontech/vscode-ibmi-types/typings.d.ts');

const topMost = [`Instance`, `IBMi`, `IBMiContent`, `component`, `manager`, `Filter`];
const hidden = [`CustomUI`, `Storage`, `Configuration`];

let allLines: string[] = [];

if (await exists(HEADER_MDX)) {
  const header = await readFile(HEADER_MDX, 'utf8');
  allLines.push(header, ``, `---`, ``);
}

for (const file of topMost) {
  if (sections[file]) {
    allLines.push(`## ${file}`, sections[file]);
  }
}

for (const file of Object.keys(sections)) {
  if (!topMost.includes(file) && !hidden.includes(file)) {
    allLines.push(`## ${file}`, sections[file], ``, `---`, ``);
  }
}

// console.log(Object.keys(sections));

await writeFile('src/content/docs/dev/api.md', allLines.join('\n'));