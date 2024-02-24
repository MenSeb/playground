import Handlebars from 'handlebars';
import fs from 'node:fs';
import context from './context.json' assert { type: 'json' };

export const PARTIALS_PATH = './src/client/templates/partials/';
export const PAGES_PATH = './src/client/templates/pages/';

export function callbackPartials(callback, partialsPath = PARTIALS_PATH) {
    const partials = fs.readdirSync(partialsPath);

    for (const partial of partials) {
        const partialPath = `${partialsPath}/${partial}`;

        if (fs.lstatSync(partialPath).isDirectory()) {
            callbackPartials(callback, partialPath);
            continue;
        }

        const partialName = partial.substring(0, partial.indexOf('.'));

        callback(partialPath, partialName);
    }
}

export function compilePartial(partialPath) {
    return Handlebars.compile(fs.readFileSync(partialPath, 'utf-8'));
}

export function registerPartial(partialPath, partialName) {
    return Handlebars.registerPartial(partialName, compilePartial(partialPath));
}

export function registerPartials(partialsPath) {
    callbackPartials(registerPartial, partialsPath);
}

export class WatchPartialsPlugin {
    constructor(partialsPath) {
        this.partialsPath = partialsPath;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, () => {
            registerPartials(this.partialsPath);
        });
    }
}

export function registerPage(pageName, pagePath) {
    return {
        import: `${PAGES_PATH}${pagePath}`,
        data: context.pages[pageName],
    };
}

export function registerPages(pagesPath) {
    const pages = {};

    for (const pagePath of fs.readdirSync(pagesPath)) {
        const pageName = pagePath.substring(0, pagePath.indexOf('.'));
        const pageKey = pageName === 'index' ? pageName : `pages/${pageName}`;

        pages[pageKey] = registerPage(pageName, pagePath);
    }

    return pages;
}

// This helpers shpould be defined in the `preprocessorOptions.helpers` options of the HtmlBundlerPlugin
//Handlebars.registerHelper('idx', (index) => index + 1);

//Handlebars.registerHelper('len', (object) => object.length);

// Handlebars.registerHelper('assign', function (key, val, options) {
//     if (options.data.root === undefined) {
//         options.data.root = {};
//     }
//     options.data.root[key] = val;
// });
