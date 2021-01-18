module.exports = function() {
    const component = require('./parser/component');
    const route = require('./parser/route');

    const snippet = component.getComponentsImports();

    const replaceMap = {
        'ROUTES_IMPORT': route.getRoutesImportStr(),
        'IMPORT_COMPONENTS': snippet.compImport,
        'MAP_COMPONENTS': snippet.compMap
    };

    return [{
        test: /router\/index\.js/,
        loader: 'string-replace-loader',
        options: {
            search: 'ROUTES_IMPORT',
            replace: replaceMap['ROUTES_IMPORT']
        }
    }, {
        test: /common\/register-components\.js/,
        loader: 'string-replace-loader',
        options: {
            multiple: [{
                search: 'IMPORT_COMPONENTS',
                replace: replaceMap['IMPORT_COMPONENTS']
            }, {
                search: 'MAP_COMPONENTS',
                replace: replaceMap['MAP_COMPONENTS']
            }]
            
        }
    }, {
        test: /server-entry\.js/,
        loader: 'string-replace-loader',
        options: {
            multiple: [{
                search: 'ROUTES_IMPORT',
                replace: replaceMap['ROUTES_IMPORT']
            }, {
                search: 'IMPORT_COMPONENTS',
                replace: replaceMap['IMPORT_COMPONENTS']
            }, {
                search: 'MAP_COMPONENTS',
                replace: replaceMap['MAP_COMPONENTS']
            }]
        }
    }];
}