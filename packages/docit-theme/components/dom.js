const hasClass = (dom, name) => {
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(dom.className);
};

const addClass = (dom, name) => {
    if (hasClass(dom, name)) {
        return;
    }
    dom.className += ' ' + name;
};

const removeClass = (dom, name) => {
    if (!hasClass(dom, name)) {
        return;
    }
    const reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
    dom.className = dom.className.replace(reg, '');
};

export default {
    hasClass,
    addClass,
    removeClass
};
