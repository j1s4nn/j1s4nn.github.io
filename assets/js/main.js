/* =========================================================
   Md Jisan Hossen — Academic Homepage
   Progressive enhancements: scroll progress, glass nav,
   scrollspy, scroll-reveal, stat counters, pointer tilt,
   back-to-top. All optional; page is fully readable without JS.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  var toTop = document.getElementById("toTop");
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll("#navLinks a")
  );

  /* ---------- Scroll progress + nav shadow + back-to-top ---------- */
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";

    if (nav) nav.classList.toggle("scrolled", doc.scrollTop > 12);
    if (toTop) toTop.classList.toggle("show", doc.scrollTop > 420);
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
      }
    },
    { passive: true }
  );
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Scrollspy ---------- */
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href");
      return id && id.charAt(0) === "#"
        ? document.querySelector(id)
        : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal (with stagger) ---------- */
  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var group = el.parentElement
            ? Array.prototype.slice.call(
                el.parentElement.querySelectorAll(":scope > [data-reveal]")
              )
            : [];
          var idx = group.indexOf(el);
          var delay = idx > 0 ? Math.min(idx, 6) * 70 : 0;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-visible");
          obs.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;

    if (reduceMotion) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    window.requestAnimationFrame(step);
  }

  var counters = Array.prototype.slice.call(
    document.querySelectorAll("[data-count]")
  );
  if (counters.length && "IntersectionObserver" in window) {
    var countObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { countObs.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Pointer tilt on cards ---------- */
  if (!reduceMotion && window.matchMedia &&
      window.matchMedia("(hover: hover)").matches) {
    var tiltEls = document.querySelectorAll(".tilt");
    Array.prototype.forEach.call(tiltEls, function (card) {
      var raf = null;
      function move(e) {
        if (raf) return;
        raf = window.requestAnimationFrame(function () {
          raf = null;
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            "perspective(720px) rotateX(" + (-y * 5).toFixed(2) + "deg) rotateY(" +
            (x * 6).toFixed(2) + "deg) translateY(-6px)";
        });
      }
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", function () {
        if (raf) { window.cancelAnimationFrame(raf); raf = null; }
        card.style.transform = "";
      });
    });
  }
})();
