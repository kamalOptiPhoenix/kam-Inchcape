import kamT1FotonConfig from './config.js';

export function loadVimeoScript() {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
        if (window.Vimeo) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = kamT1FotonConfig.vimeoScript;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            reject(new Error('Vimeo script failed to load'));
        };
        document.head.appendChild(script);
    });
}

export function updateVideoVisibility(modal) {
    const desktopVideo = modal.querySelector('.desktop-video');
    const mobileVideo = modal.querySelector('.mobile-video');

    if (window.innerWidth <= 768) {
        if (desktopVideo) {
            desktopVideo.classList.add('hidden');
            desktopVideo.classList.remove('visible');
        }
        if (mobileVideo) {
            mobileVideo.classList.add('visible');
            mobileVideo.classList.remove('hidden');
        }
    } else {
        if (desktopVideo) {
            desktopVideo.classList.add('visible');
            desktopVideo.classList.remove('hidden');
        }
        if (mobileVideo) {
            mobileVideo.classList.add('hidden');
            mobileVideo.classList.remove('visible');
        }
    }
}

export function initializeVimeoPlayers(desktopIframe, mobileIframe) {
    return new Promise((resolve) => {
        try {
            const desktopPlayer = new window.Vimeo.Player(desktopIframe, {
                loop: true, autoplay: true, muted: true, background: true,
            });

            const mobilePlayer = new window.Vimeo.Player(mobileIframe, {
                loop: true, autoplay: true, muted: true, background: true,
            });

            Promise.all([desktopPlayer.ready(), mobilePlayer.ready()]).then(() => {
                if (window.innerWidth <= 768) {
                    mobilePlayer.play().then(() => {
                        resolve();
                    }).catch(() => {
                        resolve();
                    });
                } else {
                    desktopPlayer.play().then(() => {
                        resolve();
                    }).catch(() => {
                        resolve();
                    });
                }
            }).catch(() => {
                resolve();
            });
        } catch (error) {
            resolve();
        }
    });
}
