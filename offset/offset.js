const offset = ele => {
    let result = {
        left: 0,
        top: 0
    };

    const getOffset = (node, init) => {
        if (node.nodeType !== 1) {
            return;
        }

        let position =  window.getComputedStyle(node).position;

        if (init === undefined && position === 'static') {
            getOffset(node.parentNode);
            return;
        }

        result.top = result.top + node.offsetTop - node.scrollTop;
        result.left = result.left + node.offsetLeft - node.scrollLeft;

        if (position === 'fixed') {
            return;
        }

        getOffset(node.parentNode);
    }

    if (window.getComputedStyle(ele).display === 'none') {
        return result;
    }

    getOffset(ele, true);

    return result;
}

const offsetUseBounding = ele => {
    let result = {
        left: 0,
        top: 0
    };

    if (!ele.getClientRects().length) {
        return result;
    }

    if (window.getComputedStyle(ele).display === 'none') {
        return result;
    }

    let {top, left} = ele.getBoundingClientRect();
    let docElement = ele.ownerDocument.documentElement;
    result.left = left + window.pageXOffset - docElement.clientLeft;
    result.top = top + window.pageYOffset - docElement.clientTop;

    return result;
}
