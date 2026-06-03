const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const previewButtons = document.querySelectorAll("[data-preview]");
const faqItems = document.querySelectorAll(".faq-item");
const screenshotButtons = document.querySelectorAll("[data-modal-image]");
const screenshotModal = document.querySelector(".screenshot-modal");
const modalImage = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const revealItems = document.querySelectorAll(
  ".trust-band div, .proof-band div, .section-heading, .about-panel, .result-card, .service-card, .audience-grid article, .project-card, .process-list article, .support-card, .faq-item, .contact-section > div, .contact-panel, .site-footer"
);

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
};

window.addEventListener("scroll", updateHeader);
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a, .header-actions a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      card.classList.toggle("hidden", filter !== "todos" && card.dataset.category !== filter);
    });
  });
});

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const previewButton = card.querySelector(".screenshot-button");
    const previewImage = card.querySelector(".project-screenshot img");
    const title = button.getAttribute("aria-label") || "Tela do projeto";

    card.querySelectorAll("[data-preview]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    previewImage.style.opacity = "0";

    setTimeout(() => {
      previewImage.src = button.dataset.preview;
      previewButton.dataset.modalImage = button.dataset.preview;
      previewButton.dataset.modalTitle = title.replace("Ver ", "");
      previewButton.setAttribute("aria-label", `Ampliar ${title.replace("Ver ", "")}`);
      previewImage.style.opacity = "1";
    }, 120);
  });
});


const openModal = (image, title) => {
  if (!screenshotModal || !modalImage || !modalTitle) {
    return;
  }

  modalImage.src = image;
  modalImage.alt = title;
  modalTitle.textContent = title;
  screenshotModal.classList.add("active");
  screenshotModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  if (!screenshotModal || !modalImage) {
    return;
  }

  screenshotModal.classList.remove("active");
  screenshotModal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  document.body.classList.remove("modal-open");
};

screenshotButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modalImage, button.dataset.modalTitle || "Projeto KavCode");
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});


faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector("button").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

if ("IntersectionObserver" in window) {
  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
