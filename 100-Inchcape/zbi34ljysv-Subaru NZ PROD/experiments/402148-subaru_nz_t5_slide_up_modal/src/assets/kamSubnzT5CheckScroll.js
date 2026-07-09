let modalTriggered = false;

export default function kamSubnzT5CheckScroll(showSlider, scrollHandler) {
    if (modalTriggered) return;

    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
    );

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const triggerPoint = (documentHeight * 0.5) - viewportHeight;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll >= triggerPoint) {
        modalTriggered = true;
        window.removeEventListener('scroll', scrollHandler);
        showSlider();
    }
}
