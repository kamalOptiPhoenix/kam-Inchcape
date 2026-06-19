export default function watchElement(selector, callback) {
    const runCallback = (node) => {
        callback(node);
    };

    document.querySelectorAll(selector).forEach(runCallback);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== 1) return;

                if (node.matches?.(selector)) {
                    runCallback(node);
                }

                node.querySelectorAll?.(selector).forEach(runCallback);
            });
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    return observer;
}
