const config = require('./config');
const utils = require('./utils');

const buildRules = (replaceMap) => {
    // const devRules = replaceRules.map(rule => {
    //     const search = rule.search.map(name => ({
    //         search: name,
    //         replace: replaceMap[name]
    //     }));
    //     return {
    //         loader: 'string-replace-loader',
    //         test: rule.test,
    //         options: {
    //             multiple: search
    //         }
    //     };
    // });
    
    const rules = [{
        loader: 'string-replace-loader',
        test: /\.(js|less)$/,
        exclude: file => {
            return !/[\/\\]@*sdoc[\/\\]/.test(file) && /node_modules/.test(file);
        },
        options: {
            multiple: Object.keys(replaceMap).map(rule => ({
                search: rule,
                replace: replaceMap[rule]
            }))
        }
    }];

    return rules;
};

module.exports = function() {
    const component = require('./parser/component');
    const route = require('./parser/route');
    const theme = require('./parser/theme');
    const style = require('./parser/style');

    const cmpt = component.getComponentsImports();

    const options = config.load();

    const replaceMap = {
        'VAR_ROUTES_IMPORT': route.getRoutesImportStr(),
        'VAR_IMPORT_COMPONENTS': cmpt.compImport,
        'VAR_MAP_COMPONENTS': cmpt.compMap,
        'VAR_THEMES_IMPORT': theme.getThemeImport(),
        'VAR_SAN_CONFIG': JSON.stringify(options),
        'VAR_SAN_DOCIT': JSON.stringify(options),
        'VAR_LAYOUT_IMPORT': utils.getCommonPaths('layouts')[0],
        'VAR_BASE_URL': `'${options.base}'`,
        '// VAR_IMPORT_USER': style.getStyleImport()
    };

    return buildRules(replaceMap);
}