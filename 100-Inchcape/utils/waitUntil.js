export function waitUntil(predicate, time = 10000) {
    return new Promise(((resolve) => {
        let int = setInterval(() => {
            if (predicate()) {
                resolve(predicate());
                clearInterval(int);
                int = null;
            }
        }, 500);
        setTimeout(() => {
            if (int !== null) {
                clearInterval(int);
                console.log('condition false');
            }
        }, time);
    }));
}
