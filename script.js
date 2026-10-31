
// =========================================
// AKG PORTFOLIO — JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  const modal = document.getElementById("mediaModal");
  const modalMedia = document.getElementById("modalMedia");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");

  // Footer year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Navbar background on scroll
  function updateNavbar() {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");

      if (menuToggle) {
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  });

  // Portfolio video hover previews
  const previewVideos = document.querySelectorAll(
    ".media-card .thumbnail video"
  );

  previewVideos.forEach((video) => {
    const card = video.closest(".media-card");

    card?.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) {
        video.play().catch(() => {});
      }
    });

    card?.addEventListener("mouseleave", () => {
      video.pause();

      try {
        video.currentTime = 0;
      } catch (_) {}
    });
  });

  // Reusable filter logic
  function setupFilters(groupSelector, cardSelector, categoryAttribute) {
    const groups = document.querySelectorAll(groupSelector);

    groups.forEach((group) => {
      const buttons = group.querySelectorAll("[data-filter]");
      const section = group.closest("section");

      if (!section) return;

      const cards = section.querySelectorAll(cardSelector);

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((item) => item.classList.remove("active"));
          button.classList.add("active");

          const filter = button.dataset.filter;

          cards.forEach((card) => {
            const category = card.getAttribute(categoryAttribute);
            const shouldShow = filter === "all" || category === filter;

            card.hidden = !shouldShow;
          });
        });
      });
    });
  }

  setupFilters(
    '[data-filter-group="reels"]',
    ".portrait-grid .media-card",
    "data-category"
  );

  setupFilters(
    '[data-filter-group="graphics"]',
    ".graphic-grid .media-card",
    "data-category"
  );

  // Open video/image preview
  function openModal(card) {
    const type = card.dataset.type;
    const src = card.dataset.src;
    const title = card.dataset.title || "Portfolio Preview";

    if (!src || !type) return;

    modalMedia.replaceChildren();

    if (type === "video") {
      const video = document.createElement("video");

      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.className = "modal-media";

      modalMedia.appendChild(video);

      video.play().catch(() => {});
    } else if (type === "image") {
      const image = document.createElement("img");

      image.src = src;
      image.alt = title;
      image.className = "modal-media";

      modalMedia.appendChild(image);
    } else {
      return;
    }

    modalCaption.textContent = title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    const activeVideo = modalMedia.querySelector("video");

    if (activeVideo) {
      activeVideo.pause();
      activeVideo.removeAttribute("src");
      activeVideo.load();
    }

    modalMedia.replaceChildren();
    modalCaption.textContent = "";
  }

  document.querySelectorAll(".media-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", () => openModal(card));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  modalClose?.addEventListener("click", closeModal);

  // Close when clicking the dark backdrop
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Escape closes the preview
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Optional scroll reveal effect
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-copy, .stats-grid, .experience-item, .skills-wrap"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("revealed"));
  }
});

(function () {
    "use strict";

    var popup = document.getElementById("ownerSecurityPopup");
    var message = document.getElementById("securityPopupMessage");
    var closeButton = document.getElementById("securityPopupClose");
    var hideTimer;

    function showSecurityPopup(text) {
        message.textContent = text;
        popup.classList.add("active");

        clearTimeout(hideTimer);
    }

    function closeSecurityPopup() {
        popup.classList.remove("active");
    }

    // Disable right-click and show the custom popup
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();

        showSecurityPopup(
            "Right-click functionality is disabled on this website."
        );
    });

    // Disable selected keyboard shortcuts
    document.addEventListener("keydown", function (event) {
        var key = event.key.toLowerCase();

        var blockedShortcut =
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey &&
                ["i", "j", "c"].includes(key)) ||
            (event.ctrlKey && key === "u");

        if (blockedShortcut) {
            event.preventDefault();

            showSecurityPopup(
                "This keyboard shortcut is restricted on this website."
            );
        }

        // Close popup using Escape
        if (event.key === "Escape") {
            closeSecurityPopup();
        }
    });

    // Close using the button
    closeButton.addEventListener("click", closeSecurityPopup);

    // Close when clicking the dark background
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closeSecurityPopup();
        }
    });

})();
