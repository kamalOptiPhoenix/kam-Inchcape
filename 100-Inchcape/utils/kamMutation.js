export default function KamMutation(selector, callback) {
    const matchedElement = document.querySelector(selector);

    if (matchedElement) {
        callback(matchedElement);
        return;
    }

    const observerRoot = document.body || document.documentElement;

    const observer = new MutationObserver(() => {
        const foundElement = document.querySelector(selector);

        if (foundElement) {
            observer.disconnect();
            callback(foundElement);
        }
    });

    observer.observe(observerRoot, {
        childList: true,
        subtree: true,
    });
}
