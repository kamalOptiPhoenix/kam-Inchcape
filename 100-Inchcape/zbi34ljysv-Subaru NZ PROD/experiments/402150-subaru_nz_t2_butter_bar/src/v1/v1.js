/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import getT2Html from "../assets/getT2Html.js";
import handleScroll, { moveBarAboveNav } from "../assets/handleScroll.js";

(function v1() {
  function init() {
    console.log("*** Subaru NZ T2 - Butter Bar v3 ***");
    document.body.classList.add("subnzt2");

    const t2Header = document.querySelector(
      ".header-regions-wrapper .site.header"
    );
    const modelname = window.location.pathname.split("/").filter(Boolean).pop();
    const t2Html = getT2Html(modelname);

    if (!document.getElementById("t2butterbar")) {
      t2Header.insertAdjacentHTML("beforebegin", t2Html);
      moveBarAboveNav(); // Initial render
      Kameleoon.API.Utils.addEventListener(window, "scroll", handleScroll, { passive: true });

      // Add click listener to navigation toggle
      const navToggle = document.querySelector(".navigation__toggle");
      if (navToggle) {
        Kameleoon.API.Utils.addEventListener(navToggle, "click", () => {
          const butterBar = document.getElementById("t2butterbar");
          if (!butterBar) return;

          if (navToggle.classList.contains("is-open")) {
            butterBar.classList.add("nav-open");
          } else {
            butterBar.classList.remove("nav-open");
          }
        });
      }
    }
  }

  if (!window.subnzt2Start) {
    window.subnzt2Start = true;
    Kameleoon.API.Core.runWhenConditionTrue(
      () => document.querySelector(".header-regions-wrapper .site.header"),
      init
    );
  }
})();
