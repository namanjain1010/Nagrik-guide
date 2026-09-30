document.addEventListener("DOMContentLoaded", () => {
  // 1. Highlight Active Nav Link
  const currentPath = window.location.pathname.split("/").pop() || "home.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "home.html")) {
      link.classList.add("active");
      link.style.color = "rgb(18, 154, 18)";
    } else {
      link.classList.remove("active");
      link.style.color = "";
    }
  });

  // 2. Search Functionality
  const searchForms = document.querySelectorAll('form[role="search"]');
  searchForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="search"]');
      const query = input.value.trim().toLowerCase();

      if (!query) return;

      const searchableItems = document.querySelectorAll(
        ".cards, .safety-card, .document-card, .emergency-card"
      );
      let found = false;

      searchableItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "";
          if (!found) {
            item.scrollIntoView({ behavior: "smooth", block: "center" });
            item.classList.add("highlight-card");
            setTimeout(() => item.classList.remove("highlight-card"), 2000);
            found = true;
          }
        } else {
          item.style.display = "none";
        }
      });

      if (!found) {
        alert("No matching guides or contacts found for: " + query);
        searchableItems.forEach((item) => (item.style.display = ""));
      }
    });
  });

  // 3. Scholarship Checklist Persistence (Student Help)
  const checklistCards = document.querySelectorAll(".document-card input[type='checkbox']");
  if (checklistCards.length > 0) {
    checklistCards.forEach((checkbox, index) => {
      const savedState = localStorage.getItem(`checklist_item_${index}`);
      if (savedState === "true") {
        checkbox.checked = true;
      }

      checkbox.addEventListener("change", () => {
        localStorage.setItem(`checklist_item_${index}`, checkbox.checked);
      });
    });
  }

  // 4. Scroll Animation Observer
  const animatableElements = document.querySelectorAll(
    ".cards, .safety-card, .emergency-card, .step-card, .stay-safe-box, .scammed-box, .hero-content"
  );

  animatableElements.forEach((el) => el.classList.add("fade-in-element"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  animatableElements.forEach((el) => observer.observe(el));
});