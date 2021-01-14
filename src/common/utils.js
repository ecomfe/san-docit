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
    treeWalk
};
