import {router} from 'san-router'

// import markdownit from '../../docs/markdownit.md';
// import simple from '../../docs/simple.md';

// router.add({rule: '/', Component: simple, target: '#router-view'});
// router.add({rule: '/m', Component: markdownit, target: '#router-view'});

const parseSidebarItem = sideItem => {
    if (sideItem) {
        const component = require(sideItem.filename);
        router.add({
            rule: sideItem.path,
            Component: component,
            target: '#router-view'
        });
    }
}

const parseSidebar = children => {
    if (children && children.length) {
        return children.map(sideItem => {
            if (typeof sideItem === 'string') {
                return parseSidebarItem(sideItem);
            }
            else if (sideItem.children) {
                return parseSidebar(sideItem.children);
            }
        });
    }
    return [];
};

// webpack.DefinePlugin SAN_DOCIT
const docit = SAN_DOCIT;
const sidebar = docit.themeConfig.sidebar;
Object.keys(sidebar).forEach(name => {
    parseSidebar(sidebar[name]);
})

export default router;

// start
// router.start();
