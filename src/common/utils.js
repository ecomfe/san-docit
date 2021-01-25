
const base = (() => {
    const baseUrl = VAR_BASE_URL;
    const base = baseUrl.length > 1 ? baseUrl.slice(0, -1) : '';
    return base;
})();

const treeWalk = (root, callback) => {
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
            treeWalk(item, callback);
        }
    });
}

export default {
    base,
    treeWalk
};
