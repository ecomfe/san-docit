import {router} from 'san-router';
import NProgress from 'NProgress';
import 'nprogress/nprogress.css';

// Webpack Inject
const docit = SAN_DOCIT;
const components = ROUTES_IMPORT; 

const sidebar = docit.themeConfig.sidebar;

const addRouter = path => {
    if (components[path]) {
        const component = components[path];
        router.add({
            rule: path,
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

        if (item.children) {
            parseRouter(item, callback);
        }
    });
}

// router.add 注册路由
Object.keys(sidebar).forEach(name => {
    parseRouter(sidebar[name], node => addRouter(node.path || ''));
});

router.setMode('html5');

router.listen(e => {
    if (e.path === e.referrer || !components[e.path]) {
        e.stop();
        return;
    }

    // 加载进度条
    if (NProgress.isRendered) {
        NProgress.remove();
    }
    NProgress.inc();
});

global.hub.on('changed', () => {
    NProgress.done(true);
});

export default router;
