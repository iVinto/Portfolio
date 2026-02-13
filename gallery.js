/**
 * Gallery page logic
 * Reads ?event=slug from URL, finds matching event in EVENTS, renders everything.
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("event");

  if (!eventId || typeof EVENTS === "undefined") {
    window.location.href = "index.html";
    return;
  }

  const event = EVENTS.find(e => e.id === eventId);
  if (!event) {
    window.location.href = "index.html";
    return;
  }

  // Set page title
  document.title = `Vinto's ${event.about.title}`;

  // Build grid
  const grid = document.querySelector(".gallery-grid");
  grid.style.gridTemplateColumns = `repeat(${event.columns}, 1fr)`;

  // Load first few images eagerly, lazy-load the rest
  event.images.forEach((filename, i) => {
    const img = document.createElement("img");
    img.alt = `${event.title} — Photo ${i + 1}`;
    img.dataset.index = i;
    img.decoding = "async";

    if (i < event.columns) {
      // First row loads immediately (above the fold)
      img.loading = "eager";
      img.fetchPriority = "high";
    } else {
      img.loading = "lazy";
    }

    img.src = `${event.folder}/${filename}`;
    grid.appendChild(img);
  });

  // Build overlay
  document.getElementById("aboutTitle").textContent = event.about.title;
  document.getElementById("aboutDescription").textContent = event.about.description;
  document.getElementById("aboutDate").textContent = event.about.date;
  document.getElementById("aboutLocation").textContent = event.about.location;

  // State
  let currentIndex = 0;
  let isFullscreen = false;
  let isOverlayVisible = false;

  // Elements
  const gridImages = () => document.querySelectorAll(".gallery-grid img");
  const fullscreenDiv = document.querySelector(".fullscreen");
  const fullscreenImg = document.querySelector(".fullscreen img");
  const overlay = document.getElementById("overlay");
  const whiteBtn = document.getElementById("whiteButton");
  const blackBtn = document.getElementById("blackButton");
  const indexBtn = document.getElementById("indexButton");
  const aboutBtn = document.getElementById("aboutButton");
  const portfolioBtn = document.getElementById("portfolioButton");

  // Click handlers on grid images (delegated)
  grid.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      currentIndex = parseInt(e.target.dataset.index);
      showFullscreen(e.target);
    }
  });

  function showFullscreen(img) {
    isFullscreen = true;
    updateButtons();
    const rect = img.getBoundingClientRect();
    fullscreenImg.src = img.src;
    fullscreenImg.style.left = `${rect.left}px`;
    fullscreenImg.style.top = `${rect.top}px`;
    fullscreenImg.style.width = `${rect.width}px`;
    fullscreenImg.style.height = `${rect.height}px`;

    gridImages().forEach(img => img.style.opacity = "0.1");
    fullscreenDiv.style.display = "flex";

    requestAnimationFrame(() => {
      fullscreenImg.style.transform = "translate(-50%, -50%) scale(1)";
      fullscreenImg.style.left = "50%";
      fullscreenImg.style.top = "50%";
      fullscreenImg.style.width = "";
      fullscreenImg.style.height = "";
    });
  }

  window.showGrid = function () {
    isFullscreen = false;
    isOverlayVisible = false;
    updateButtons();
    fullscreenDiv.style.display = "none";
    fullscreenImg.style.transform = "scale(0)";
    gridImages().forEach(img => img.style.opacity = "1");
    overlay.classList.remove("visible");
    setTimeout(() => { overlay.style.display = "none"; }, 500);
  };

  window.toggleOverlay = function () {
    isOverlayVisible = !isOverlayVisible;
    if (isOverlayVisible) {
      overlay.style.display = "flex";
      requestAnimationFrame(() => overlay.classList.add("visible"));
    } else {
      overlay.classList.remove("visible");
      setTimeout(() => { overlay.style.display = "none"; }, 500);
    }
    updateButtons();
  };

  window.changeBackgroundColor = function (color) {
    document.body.style.backgroundColor = color;
    fullscreenDiv.style.backgroundColor = color;
    const isDark = color === "#000";
    overlay.style.backgroundColor = isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)";
    document.body.style.color = isDark ? "#fff" : "#000";
    updateButtons();
  };

  window.goToPage = function (url) {
    window.location.href = url;
  };

  function updateButtons() {
    const isDark = document.body.style.backgroundColor === "rgb(0, 0, 0)";
    setBtn(whiteBtn, !isDark);
    setBtn(blackBtn, isDark);
    setBtn(indexBtn, !isFullscreen && !isOverlayVisible);
    setBtn(aboutBtn, isOverlayVisible);
    setBtn(portfolioBtn, false);
  }

  function setBtn(btn, selected) {
    btn.classList.toggle("selected", selected);
    btn.classList.toggle("unselected", !selected);
  }

  // Fullscreen navigation
  fullscreenDiv.addEventListener("click", (e) => {
    const imgs = gridImages();
    if (e.clientX > window.innerWidth / 2) {
      currentIndex = (currentIndex + 1) % imgs.length;
    } else {
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    }
    fullscreenImg.src = imgs[currentIndex].src;
  });

  document.addEventListener("keydown", (e) => {
    if (!isFullscreen) return;
    const imgs = gridImages();
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % imgs.length;
      fullscreenImg.src = imgs[currentIndex].src;
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      fullscreenImg.src = imgs[currentIndex].src;
    } else if (e.key === "Escape") {
      showGrid();
    }
  });

  window.addEventListener("load", updateButtons);
})();
