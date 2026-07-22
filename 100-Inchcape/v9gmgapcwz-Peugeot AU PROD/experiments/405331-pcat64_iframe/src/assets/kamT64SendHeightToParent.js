/**
 * Send iframe height to parent window with minimal delay.
 * Uses ResizeObserver when available, with a small fallback interval.
 */
export default function kamT64SendHeightToParent() {
  if (!document.body) {
    return;
  }

  const PARENT_ORIGIN = "https://www.peugeot.com.au";

  const sendHeight = () => {
    if (!window.parent || window.parent === window) {
      return;
    }

    const height = Math.round(document.body.getBoundingClientRect().height);
    if (!height) {
      return;
    }

    // New structured message format
    try {
      window.parent.postMessage(
        {
          type: "PCAT64_IFRAME_HEIGHT",
          height,
        },
        PARENT_ORIGIN
      );
    } catch (e) {
      // Fail silently and rely on legacy format below
    }

    // Legacy string format (kept for backward compatibility with parent listener)
    try {
      window.parent.postMessage(`T64StylingHeight-${height}`, "*");
    } catch (e) {
      // Ignore errors
    }
  };

  // Send initial height immediately to reduce first-paint flicker
  sendHeight();

  // Use ResizeObserver for near-instant updates when supported
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });
    resizeObserver.observe(document.body);
  } else {
    // Fallback: poll more frequently but only when height actually changes
    let lastHeight = 0;
    setInterval(() => {
      const currentHeight = Math.round(
        document.body.getBoundingClientRect().height
      );
      if (currentHeight && currentHeight !== lastHeight) {
        lastHeight = currentHeight;
        sendHeight();
      }
    }, 300);
  }
}
