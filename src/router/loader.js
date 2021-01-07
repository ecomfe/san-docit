/**
 * @file 页面插件（组件）动态加载
 *
 * @author liubin29
 *
 * 2019-10-23
 */

const getBaseUrl = (filename) => {
    const base = process.env.NODE_ENV === 'development'
        ? '/' : window.publicPath
        + projectName + '/'
        + baseConfig.versions[projectName] + '/';

    return base + 'static/';
};

const loadScript = async (filename) => {
    const url = getBaseUrl(filename)
        + 'js/' + pluginName + '.js';

    return new Promise((resolve, reject) => {
        if (baseConfig.manifest
            && baseConfig.manifest[projectName]
            && !baseConfig.manifest[projectName][pluginName + '.js']) {
            return resolve();
        }
        let script = document.createElement('script');
        script.src = url;
        script.onload = () => {
            document.head.removeChild(script);
            resolve();
        };
        script.onerror = err => {
            document.head.removeChild(script);
            reject(err);
        };
        document.head.appendChild(script);
    });
};

const loadStyle = (pluginName, projectName) => {
    if (baseConfig.manifest
        && baseConfig.manifest[projectName]
        && !baseConfig.manifest[projectName][pluginName + '.css']) {
        return;
    }

    const url =  getBaseUrl(pluginName, projectName)
    + 'css/' + pluginName + '.css';

    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.type = 'text/css';
    linkTag.href = url;
    document.head.appendChild(linkTag);
};

export default mdFile => new Promise((resolve, reject) => {
    global[mdFile] = exports => {
        resolve(exports.default || {});
    };

    loadScript(mdFile).then(() => {}, reject);
});
