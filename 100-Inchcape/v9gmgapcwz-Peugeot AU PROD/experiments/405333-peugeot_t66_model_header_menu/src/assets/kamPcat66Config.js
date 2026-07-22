/* eslint-disable no-console */
import hardcodedVehicleHTML from './kamPcat66VehicleHTML.js';

const kamPcat66Config = {
  currentFilter: 'all',
  hardcodedVehicleHTML,
  hideOriginalStructure: () => {
    const segmentVehicles = document.querySelector(".segment_vehicles");
    if (segmentVehicles) {
      segmentVehicles.classList.add("PCAT66-hidden");
    }

    // Also hide the original flyout-nav content if needed
    const flyoutNav = document.querySelector("#flyout-nav");
    if (flyoutNav) {
      const originalContainers = flyoutNav.querySelectorAll(
        ".q-bodystyle-container, [data-gm-filter]"
      );
      originalContainers.forEach((container) => {
        container.classList.add("PCAT66-hidden");
      });
    }
  },

  hideOurRangeSection: () => {
    const button = Array.from(
      document.querySelectorAll(".flyout-content a.q-button")
    ).find((el) => el.textContent.trim() === "Our range");

    if (button) {
      const container = button.closest(".grid_builder_v2");
      if (container) {
        container.classList.add("PCAT66-hidden");
      }
    }
  },

  hideMobileMenuItems: () => {
    const mobileMenuItems = document.querySelectorAll(
      ".q-nav-offcanvas__scroller > ul.off-canvas-list > li.off-canvas-list__item > a.off-canvas-list__link"
    );
    //check if mobileMenuItems text contains "MODELS"
    mobileMenuItems.forEach((item) => {
      if (item.textContent.trim() === "MODELS") {
        // select next sibling of item ul.left-submenu
        const leftSubmenu = item.nextElementSibling;
        if (leftSubmenu) {
          leftSubmenu.classList.add("PCAT66-leftSubmenu");
          leftSubmenu.querySelectorAll("li").forEach((li) => {
            li.classList.add("PCAT66-hidden");
          });
        }
      }
    });
  },

  createCustomFilterButtons: () => {
    const isDesktop = window.innerWidth > 1081;
    let segmentVehicles = null;
    let leftSubmenu = null;

    if (isDesktop) {
      segmentVehicles = document.querySelector(".segment_vehicles");
      if (!segmentVehicles) {
        console.warn("PCAT66: .segment_vehicles not found");
        return;
      }
    } else {
      leftSubmenu = document.querySelector(".PCAT66-leftSubmenu");
      if (!leftSubmenu) {
        console.warn("PCAT66: .PCAT66-leftSubmenu not found");
        return;
      }
    }

    // Check if custom filter already exists
    if (document.querySelector(".PCAT66-custom-filter-wrapper")) {
      console.log("PCAT66: Custom filter already exists");
      return;
    }

    // Use insertAdjacentHTML instead of createElement
    const filterHTML = `
      <div class="PCAT66-custom-filter-wrapper">
       <h2>MODELS</h2>
        <ul class="PCAT66-custom-filter-list">
          <li class="PCAT66-filter-item PCAT66-filter-all PCAT66-active" data-filter="all">
            <a href="#" class="PCAT66-filter-link">All</a>
          </li>
          <li class="PCAT66-filter-item PCAT66-filter-electric" data-filter="electric">
            <a href="#" class="PCAT66-filter-link">Electric</a>
          </li>
          <li class="PCAT66-filter-item PCAT66-filter-hybrid" data-filter="hybrid">
            <a href="#" class="PCAT66-filter-link">Hybrid</a>
          </li>
          <li class="PCAT66-filter-item PCAT66-filter-van" data-filter="van">
            <a href="#" class="PCAT66-filter-link">Van Range</a>
          </li>
        </ul>
        <div class="PCAT66-custom-vehicle-list data-gm-filter-target q-content-container q-segment-vehicles small-12 q-bodystyles" id="PCAT66-vehicle-container"></div>
      </div>
    `;

    // Insert filter wrapper in the correct place
    if (isDesktop && segmentVehicles) {
      // Desktop: before .segment_vehicles
      segmentVehicles.insertAdjacentHTML("beforebegin", filterHTML);
    } else if (!isDesktop && leftSubmenu) {
      // Mobile: inside .PCAT66-leftSubmenu at the end
      leftSubmenu.insertAdjacentHTML("beforeend", filterHTML);

      // Add mobile-only CTA buttons at the end of the wrapper
      const wrapper = leftSubmenu.querySelector(
        ".PCAT66-custom-filter-wrapper:last-of-type"
      );
      if (wrapper) {
        const mobileCtasHTML = `
          <div class="PCAT66-mobile-cta-wrapper">
            <a href="https://findadealer.peugeot.com.au/" class="q-button q-button--primary PCAT66-mobile-cta">
              FIND A DEALER
            </a>
            <a href="https://configurator.peugeot.com.au/" class="q-button q-button--primary PCAT66-mobile-cta">
              BUILD &amp; PRICE
            </a>
            <a href="https://www.peugeot.com.au/buy/new-car-offers.html" class="q-button q-button--primary PCAT66-mobile-cta">
              DISCOVER OUR OFFERS
            </a>
          </div>
        `;
        wrapper.insertAdjacentHTML("beforeend", mobileCtasHTML);
      }
    }
  },

  createCustomVehicleList: () => {
    // Check if custom list already exists
    const vehicleContainer = document.querySelector(
      "#PCAT66-vehicle-container"
    );
    if (vehicleContainer) {
      console.log("PCAT66: Custom vehicle list already exists");
      // Render all vehicles initially
      kamPcat66Config.renderVehicles("all");
      return;
    }

    // Find the filter wrapper and get the container
    const filterWrapper = document.querySelector(
      ".PCAT66-custom-filter-wrapper"
    );
    if (!filterWrapper) {
      console.warn("PCAT66: Filter wrapper not found");
      return;
    }

    // The container should already be created in createCustomFilterButtons
    // Just render the vehicles
    kamPcat66Config.renderVehicles("all");
  },

  renderVehicles: (filterType) => {
    const vehicleContainer = document.querySelector(
      "#PCAT66-vehicle-container"
    );
    if (!vehicleContainer) {
      console.warn("PCAT66: Vehicle container not found");
      return;
    }

    // Clear existing content
    vehicleContainer.innerHTML = "";

    // Get hardcoded HTML for the filter type
    const vehicleHTML =
      kamPcat66Config.hardcodedVehicleHTML[filterType] ||
      kamPcat66Config.hardcodedVehicleHTML.all;

    // Insert the hardcoded HTML
    vehicleContainer.innerHTML = vehicleHTML;

    console.log(
      `PCAT66: Rendered hardcoded vehicles for filter: ${filterType}`
    );
  },

  initFilterFunctionality: () => {
    const filterButtons = document.querySelectorAll(".PCAT66-filter-item");

    filterButtons.forEach((button) => {
      const filterLink = button.querySelector(".PCAT66-filter-link");
      if (filterLink) {
        Kameleoon.API.Utils.addEventListener(filterLink, 'click', (e) => {
          e.preventDefault();
          const filterType = button.getAttribute("data-filter") || "all";

          // Update active state
          filterButtons.forEach((btn) => {
            btn.classList.remove("PCAT66-active");
          });
          button.classList.add("PCAT66-active");

          // Update current filter
          kamPcat66Config.currentFilter = filterType;

          // Render filtered vehicles
          kamPcat66Config.renderVehicles(filterType);
        });
      }
    });
  },
  initMobile: () => {
    // Hide mobile menu items
    kamPcat66Config.hideMobileMenuItems();
    // Create custom filter buttons
    kamPcat66Config.createCustomFilterButtons();

    // Create custom vehicle list
    kamPcat66Config.createCustomVehicleList();

    // Initialize filter functionality
    kamPcat66Config.initFilterFunctionality();
  },

  init: () => {
    // Wait for segment_vehicles to be available
    Kameleoon.API.Core.runWhenElementPresent('.segment_vehicles', () => {
      // Hide original structure
      kamPcat66Config.hideOriginalStructure();

      // Hide "Our range" section
      kamPcat66Config.hideOurRangeSection();

      // Create custom filter buttons
      kamPcat66Config.createCustomFilterButtons();

      // Create custom vehicle list
      kamPcat66Config.createCustomVehicleList();

      // Initialize filter functionality
      kamPcat66Config.initFilterFunctionality();
    });
  },
};

export default kamPcat66Config;
