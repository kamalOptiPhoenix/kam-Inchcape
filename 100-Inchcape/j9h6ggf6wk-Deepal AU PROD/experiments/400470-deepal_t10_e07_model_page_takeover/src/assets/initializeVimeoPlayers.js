import kamT10DeepalConfig from './config.js';

export function preloadGif() {
    return new Promise((resolve) => {
        const gifImg = new Image();
        gifImg.onload = resolve;
        gifImg.onerror = resolve;
        gifImg.src = kamT10DeepalConfig.gifSrc;
    });
}

export function loadVimeoScript() {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
        if (window.Vimeo) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = kamT10DeepalConfig.vimeoScript;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Vimeo script failed to load'));
        document.head.appendChild(script);
    });
}

export function updateVideoVisibility(modal) {
    const desktopVideo = modal.querySelector('.desktop-video');
    const mobileVideo = modal.querySelector('.mobile-video');
    if (window.innerWidth <= 768) {
        desktopVideo.style.display = 'none';
        mobileVideo.style.display = 'block';
    } else {
        desktopVideo.style.display = 'block';
        mobileVideo.style.display = 'none';
    }
}

export function initializeVimeoPlayers(desktopIframe, mobileIframe) {
    return new Promise((resolve) => {
        const desktopPlayer = new window.Vimeo.Player(desktopIframe, {
            loop: true, autoplay: true, muted: true, background: true,
        });
        const mobilePlayer = new window.Vimeo.Player(mobileIframe, {
            loop: true, autoplay: true, muted: true, background: true,
        });

        Promise.all([desktopPlayer.ready(), mobilePlayer.ready()]).then(() => {
            if (window.innerWidth <= 768) {
                mobilePlayer.play().catch(console.log);
            } else {
                desktopPlayer.play().catch(console.log);
            }
            resolve();
        });
    });
}
