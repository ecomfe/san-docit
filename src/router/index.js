import {router} from '../common/san-router';
import NProgress from 'NProgress';
import hub from '../common/hub';
import utils from '../common/utils';
import NotFound from '../views/not-found.san';

import 'nprogress/nprogress.css';

router.setMode('html5');

// Webpack Inject
const config = process.env.SAN_DOCIT;
const components = ROUTES_IMPORT; 

const base = utils.base;
const sidebar = config.themeConfig.sidebar;

const addRouter = path => {
    if (components[path]) {
        const component = components[path];
        router.add({
            rule: base + path,
            Component: component,
            target: '#router-view'
        });
    }
}

const parseRouter = (root, callback) => {
    if (!root) {
        return;
    }
    callback(root);

    if (!root.children) {
        return;
    }
    root.children.forEach(item => {
        callback(item);

        if (item && item.children) {
            parseRouter(item, callback);
        }
    });
}

// router.add 注册路由
Object.keys(sidebar).forEach(name => {
    parseRouter(sidebar[name], node => node && node.path && addRouter(node.path));
});

const routes = [{
    path: '/notfound/',
    component: NotFound
}];

routes.forEach(route => {
    router.add({
        rule: base + route.path,
        Component: route.component,
        target: '#router-view'
    });
});

router.listen(function(e) {
    if (!components[e.path.substr(base.length)]) {
        // e.stop();
        // this.locator.stop();
        setTimeout(() => {this.locator.redirect(base + '/notfound/');}, 0);
        return;
    }
    if (e.path === e.referrer) {
        e.stop();
        return;
    }

    // 加载进度条
    if (NProgress.isRendered) {
        NProgress.remove();
    }
    NProgress.inc();

    hub.fire('RouterChanged', e);
});

global.hub.on('changed', () => {
    NProgress.done(true);
});

export default router;
