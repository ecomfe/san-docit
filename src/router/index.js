import {router} from 'san-router'

// Webpack Inject
const docit = SAN_DOCIT;
const components = ROUTES_IMPORT; 

const sidebar = docit.themeConfig.sidebar;

const addRouter = node => {
    if (node && components[node.path]) {
        const component = components[node.path];
        router.add({
            rule: node.path,
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
    parseRouter(sidebar[name], addRouter);
});

router.setMode('html5');

export default router;
