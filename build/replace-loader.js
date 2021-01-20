const buildRules = (config, map) => {
    const devRules = config.map(rule => {
        const search = rule.search.map(name => ({
            search: name,
            replace: map[name]
        }));
        return {
            loader: 'string-replace-loader',
            test: rule.test,
            options: {
                multiple: search
            }
        };
    });
    
    const prodRules = [{
        loader: 'string-replace-loader',
        test: /server-entry\.js/,
        options: {
            multiple: Object.keys(map).map(rule => ({
                search: rule,
                replace: map[rule]
            }))
        }
    }];

    return devRules.concat(prodRules);
};

module.exports = function() {
    const component = require('./parser/component');
    const route = require('./parser/route');
    const theme = require('./parser/theme');
    const style = require('./parser/style');

    const cmpt = component.getComponentsImports();

    const replaceMap = {
        'ROUTES_IMPORT': route.getRoutesImportStr(),
        'IMPORT_COMPONENTS': cmpt.compImport,
        'MAP_COMPONENTS': cmpt.compMap,
        'THEMES_IMPORT': theme.getThemeImport(),
        '// IMPORT_USER_VARS': style.getStyleImport()
    };

    const config = [{
        test: /router\/index\.js/,
        search: ['ROUTES_IMPORT']
    }, {
        test: /common\/register-components\.js/,
        search: ['IMPORT_COMPONENTS', 'MAP_COMPONENTS']
    }, {
        test: /index\.js/,
        search: ['THEMES_IMPORT']
    }, {
        test: /index\.less/,
        search: ['// IMPORT_USER_VARS']
    }];

    return buildRules(config, replaceMap);
}