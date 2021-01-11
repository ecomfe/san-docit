/**
 * @file 从 md 中解析出来 H
 * @author ksky521
 */
const {slugify, deeplyParseHeaders} = require('./utils');
class TreeNode {
    constructor(level, title, hash) {
        this.level = level;
        this.title = title;
        this.hash = hash;
    }
}

class Tree {
    constructor() {
        this.root = new TreeNode(0);
        this.last = this.root;
    }
    insert(level, title, hash) {
        const node = new TreeNode(level, title, hash);

        const last = this.find(level, this.last);

        this.insertNode(node, last);

        this.last = node;

        return node;
    }
    insertNode(node, parent) {
        if (!parent) {
            parent = this.insert(node.level - 1);
        }
        if (!parent.children) {
            parent.children = [];
        }
        node.parent = parent;

        parent.children.push(node);
    }
    find(level, last) {
        if (last.level === level - 1) {
            return last;
        }
        if (last.parent) {
            return this.find(level, last.parent);
        }
        return this.root;
    }
    walk(callback) {
        this.walkNode(this.root, callback);
    }
    walkNode(node, callback) {
        if (node) {
            callback(node);
            if (node.children) {
                node.children.forEach(item => this.walkNode(item, callback));
            }
        }
    }
}

module.exports = (content, compiler, include = ['H2', 'H3']) => {
    include = include.map(i => i.toLowerCase());

    const tokens = compiler.parse(content, {});

    const tree = new Tree();
    tokens.forEach((t, i) => {
        if (t.type === 'heading_open' && include.includes(t.tag)) {
            const title = tokens[i + 1].content;
            const slug = t.attrs ? t.attrs.find(([name]) => name === 'id')[1] : '';
            const r = {
                level: parseInt(t.tag.slice(1), 10),
                title: deeplyParseHeaders(title),
                slug: slug || slugify(title)
            };
            tree.insert(r.level, r.title, r.slug);
        }
    });

    tree.walk(node => {
        delete node.parent;
    });

    return tree.root;
};
