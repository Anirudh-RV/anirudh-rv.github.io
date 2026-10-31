(function () {
  // Nav border once the page scrolls.
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Project filters.
  var filters = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var tag = btn.getAttribute("data-filter");
      filters.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      projects.forEach(function (p) {
        var tags = (p.getAttribute("data-tags") || "").split(" ");
        p.hidden = tag !== "all" && tags.indexOf(tag) === -1;
      });
    });
  });

  // Fade sections in as they scroll into view.
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealed.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealed.forEach(function (el) {
      el.classList.add("in");
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
