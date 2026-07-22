/**
 * Gets model name from URL path using regex pattern
 */
function getModelName() {
  const path = window.location.pathname;
  const match = path.match(/\/models\/([^\/]+)\.html/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return "";
}

/**
 * Maps URL model names to form model values
 */
function mapModelNameToValue(modelName) {
  if (!modelName) return null;

  const modelNameLower = modelName.toLowerCase();

  // Mapping from URL model names to form values
  const modelMap = {
    "2008-hybrid-suv": "2008 Hybrid",
    "2008-suv": "2008 Hybrid", // Default 2008 to Hybrid
    "3008-suv": "3008 Hybrid",
    "5008-hybrid-suv": "5008 Hybrid",
    "308-hybrid": "308 Hybrid",
    "408-hybrid": "408 Hybrid",
    "partner-van": "Partner Van",
    "new-e-partner-van": "New E-Partner Van",
    "diesel-expert-van": "Expert Van",
    "e-expert": "E-Expert Van", // For /models/expert-van/e-expert.html
    "expert-van": "Expert Van",
    "boxer-van": "Boxer Van",
  };

  return modelMap[modelNameLower] || null;
}

/**
 * Maps URL paths to model values
 * Can be used in both parent and iframe
 */
export function getModelFromUrl(url) {
  // Extract pathname from URL
  let pathname;
  try {
    const urlObj = new URL(url);
    pathname = urlObj.pathname;
  } catch (e) {
    // If URL parsing fails, try to extract pathname manually
    const match = url.match(/\/models\/[^?#]*/i);
    pathname = match ? match[0] : "";
  }

  // Handle special case: /models/expert-van/e-expert.html
  if (pathname.includes("/models/expert-van/e-expert")) {
    return "E-Expert Van";
  }

  // Extract model name from path using regex
  const match = pathname.match(/\/models\/([^\/]+)\.html/);
  if (match && match[1]) {
    const modelName = match[1].trim();
    return mapModelNameToValue(modelName);
  }

  // Fallback to old pattern matching for edge cases
  const pathnameLower = pathname.toLowerCase();

  // Expert Van - check e-expert first (most specific)
  if (pathnameLower.includes("/models/expert-van/e-expert")) {
    return "E-Expert Van";
  }

  // 2008 - check hybrid-suv before suv
  if (pathnameLower.includes("/models/2008-hybrid-suv")) {
    return "2008 Hybrid";
  }
  if (pathnameLower.includes("/models/2008-suv")) {
    return "2008 Hybrid";
  }

  // 3008
  if (pathnameLower.includes("/models/3008-suv")) {
    return "3008 Hybrid";
  }

  // 5008 - check hybrid-suv first
  if (pathnameLower.includes("/models/5008-hybrid-suv")) {
    return "5008 Hybrid";
  }

  // 308 - check hybrid first
  if (pathnameLower.includes("/models/308-hybrid")) {
    return "308 Hybrid";
  }
  if (pathnameLower.includes("/models/308")) {
    return "308 Hybrid";
  }

  // 408 - check hybrid first
  if (pathnameLower.includes("/models/408-hybrid")) {
    return "408 Hybrid";
  }
  if (pathnameLower.includes("/models/408")) {
    return "408 Hybrid";
  }

  // Partner Van - check new-e-partner first
  if (pathnameLower.includes("/models/new-e-partner-van")) {
    return "New E-Partner Van";
  }
  if (pathnameLower.includes("/models/partner-van")) {
    return "Partner Van";
  }

  // Expert Van - check diesel-expert first
  if (pathnameLower.includes("/models/diesel-expert-van")) {
    return "Expert Van";
  }
  if (pathnameLower.includes("/models/expert-van")) {
    return "Expert Van";
  }

  // Boxer Van
  if (pathnameLower.includes("/models/boxer-van")) {
    return "Boxer Van";
  }

  return null;
}

// Track retry attempts to avoid infinite loops
let retryCount = 0;
const MAX_RETRIES = 10;

/**
 * Selects the model in the dropdown if it exists
 */
export function selectModelInIframe(modelValue) {
  if (!modelValue) return;

  const modelSelect = document.querySelector("#model");
  if (!modelSelect) {
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      // Retry after a short delay
      setTimeout(() => selectModelInIframe(modelValue), 500);
    } else {
      retryCount = 0; // Reset for next attempt
    }
    return;
  }

  // Reset retry count on success
  retryCount = 0;

  // Find the option with matching value
  const options = modelSelect.querySelectorAll("option");
  let foundOption = null;

  options.forEach((option) => {
    if (option.value === modelValue) {
      foundOption = option;
    }
  });

  if (foundOption) {
    // Only set if value is different to avoid unnecessary events
    if (modelSelect.value !== modelValue) {
      modelSelect.value = modelValue;

      // Trigger change event to ensure HTMX and other listeners are notified
      const changeEvent = new Event("change", { bubbles: true });
      modelSelect.dispatchEvent(changeEvent);

      // Also dispatch the custom modelChanged event
      document.body.dispatchEvent(new Event("modelChanged"));
    }
  }
}

// Track if message listener has been initialized to prevent duplicates
let messageListenerInitialized = false;

/**
 * Listens for messages from parent to select model based on URL or explicit model name
 */
export function initModelSelectionFromParent() {
  // Prevent duplicate listeners
  if (messageListenerInitialized) {
    console.log("***** iframe: message listener already initialized, skipping");
    return;
  }
  
  messageListenerInitialized = true;
  console.log("***** iframe: setting up message listener from parent");
  
  Kameleoon.API.Utils.addEventListener(window, "message", (event) => {
    // Security check: verify origin (parent is peugeot.com.au, iframe is peugeotforms.inchcape.com.au)
    // Allow messages from peugeot.com.au origin
    if (
      !event.origin.includes("peugeot.com.au") &&
      !event.origin.includes("peugeotforms.inchcape.com.au")
    ) {
      return;
    }

    if (
      event.data &&
      event.data.type === "PCAT64_SELECT_MODEL_FROM_URL" &&
      (event.data.url || event.data.modelValue)
    ) {
      console.log("***** iframe received message from parent");
      console.log("***** event.data.url", event.data.url);
      console.log("***** event.data.modelValue", event.data.modelValue);
      
      // Prefer explicit model value if provided, otherwise derive from URL
      const incomingModelValue = event.data.modelValue || null;
      const modelValue =
        incomingModelValue ||
        (event.data.url ? getModelFromUrl(event.data.url) : null);

      console.log("***** iframe extracted modelValue", modelValue);

      if (modelValue) {
        // Cache globally so it can also be reused on submit if needed
        try {
          window.pcat64SelectedModelFromParent = modelValue;
        } catch (e) {
          // Fail silently if window is not writable for some reason
        }
        console.log("***** iframe selecting model in dropdown", modelValue);
        selectModelInIframe(modelValue);
      }
    }
  });
}

/**
 * Sends current page URL to iframe so it can select model accordingly (for parent window)
 */
export function sendUrlToIframe() {
  console.log("***** sendUrlToIframe");
  const currentUrl = window.location.href;
  // Derive model from current URL once at source so we can send it directly
  const currentModelValue = getModelFromUrl(currentUrl);
  console.log("*****  currentModelValue", currentModelValue);
  // Find the iframe
  const iframe = document.querySelector("iframe.T64Iframe");
  if (!iframe) {
    // Retry after a short delay
    setTimeout(() => sendUrlToIframe(), 500);
    return;
  }

  // Function to send the message
  function sendMessage() {
    try {
      const iframeOrigin = "https://peugeotforms.inchcape.com.au";
      console.log("***** parent: attempting to send message to iframe");
      console.log("***** parent: iframe.contentWindow exists?", !!iframe.contentWindow);
      console.log("***** parent: sending modelValue", currentModelValue);
      
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            type: "PCAT64_SELECT_MODEL_FROM_URL",
            url: currentUrl,
            // Send explicit model value so iframe does not need to re-derive it
            modelValue: currentModelValue || null,
          },
          iframeOrigin
        );
        console.log("***** parent: message sent successfully");
      } else {
        console.log("***** parent: iframe.contentWindow is null, cannot send message");
      }
    } catch (e) {
      console.log("***** parent: error sending message to iframe", e);
    }
  }

  // Wait for iframe to be ready
  if (
    iframe.contentDocument &&
    iframe.contentDocument.readyState === "complete"
  ) {
    // Iframe is already loaded
    sendMessage();
  } else {
    // Wait for iframe to load
    iframe.addEventListener(
      "load",
      function sendUrl() {
        setTimeout(sendMessage, 500); // Give iframe a moment to initialize
        iframe.removeEventListener("load", sendUrl);
      },
      { once: true }
    );

    // Also try immediately in case iframe is already loaded
    sendMessage();
  }
}
