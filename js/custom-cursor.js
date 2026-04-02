(function () {
  "use strict";

  if (typeof window === "undefined" || !document.body) return;

  function shouldSkip() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    if (window.matchMedia("(pointer: coarse)").matches) return true;
    if (window.innerWidth < 768) return true;
    return false;
  }

  function init() {
    if (shouldSkip()) return;

    var ring = document.createElement("div");
    ring.className = "custom-cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    var dot = document.createElement("div");
    dot.className = "custom-cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    document.body.classList.add("is-custom-cursor");

    var mx = 0;
    var my = 0;
    var rx = 0;
    var ry = 0;
    var raf = 0;

    var interactiveSelector =
      "a, button, [role='button'], input[type='submit'], input[type='button'], label[for], .scroll-to-top, .expand, [data-pjax-state]";

    function isNativeCursorZone(el) {
      if (!el) return false;
      if (el.closest("input, textarea, select, [contenteditable='true']")) return true;
      if (el.closest("iframe")) return true;
      return false;
    }

    function isInteractive(el) {
      if (!el) return false;
      return !!el.closest(interactiveSelector);
    }

    function tick() {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;

      var el = document.elementFromPoint(mx, my);
      var native = isNativeCursorZone(el);

      if (native) {
        document.body.classList.add("cursor-native");
        document.body.classList.remove("cursor-hover");
      } else {
        document.body.classList.remove("cursor-native");
        document.body.classList.toggle("cursor-hover", isInteractive(el));
      }

      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";

      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function onLeave() {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    }

    function onEnter() {
      ring.style.opacity = "";
      dot.style.opacity = "";
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, true);
    document.addEventListener("mouseenter", onEnter, true);
    window.addEventListener(
      "blur",
      function () {
        document.body.classList.add("cursor-native");
      },
      true
    );

    raf = requestAnimationFrame(tick);

    window.addEventListener(
      "beforeunload",
      function () {
        cancelAnimationFrame(raf);
      },
      { once: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
