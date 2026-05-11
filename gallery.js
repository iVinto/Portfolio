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
  setMeta("description", `${event.about.title}. ${event.about.description} Photography by Vinto.`);
  setMeta("twitter:title", `Vinto's ${event.about.title}`);
  setMeta("twitter:description", `${event.about.title}. ${event.about.description}`);
  setMetaProperty("og:title", `Vinto's ${event.about.title}`);
  setMetaProperty("og:description", `${event.about.title}. ${event.about.description}`);
  setMetaProperty("og:url", `https://vinto-portfolio.pages.dev/gallery.html?event=${event.id}`);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `https://vinto-portfolio.pages.dev/gallery.html?event=${event.id}`;

  // Build grid
  const grid = document.querySelector(".gallery-grid");
  grid.style.gridTemplateColumns = `repeat(${event.columns}, 1fr)`;

  // Load first few images eagerly, lazy-load the rest
  event.images.forEach((filename, i) => {
    const img = document.createElement("img");
    const label = imageLabel(i);
    img.alt = label;
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
  const galleryCounter = document.getElementById("galleryCounter");

  // Click handlers on grid images (delegated)
  grid.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      currentIndex = parseInt(e.target.dataset.index);
      showFullscreen(e.target, e);
    }
  });

  function showFullscreen(img, pointerEvent) {
    isFullscreen = true;
    updateButtons();
    const rect = img.getBoundingClientRect();
    fullscreenImg.src = img.src;
    fullscreenImg.alt = imageLabel(currentIndex);
    fullscreenImg.style.left = `${rect.left}px`;
    fullscreenImg.style.top = `${rect.top}px`;
    fullscreenImg.style.width = `${rect.width}px`;
    fullscreenImg.style.height = `${rect.height}px`;

    gridImages().forEach(img => img.style.opacity = "0.1");
    fullscreenDiv.style.display = "flex";
    updateCounter();
    if (pointerEvent) updateCursorDirection(pointerEvent);

    requestAnimationFrame(() => {
      fullscreenImg.style.transform = "translate(-50%, -50%) scale(1)";
      fullscreenImg.style.left = "50%";
      fullscreenImg.style.top = "50%";
      fullscreenImg.style.width = "";
      fullscreenImg.style.height = "";
      queueCounterPositionUpdate();
    });
  }

  window.showGrid = function () {
    isFullscreen = false;
    isOverlayVisible = false;
    updateButtons();
    fullscreenDiv.style.display = "none";
    fullscreenImg.style.transform = "scale(0)";
    fullscreenDiv.classList.remove("cursor-left", "cursor-right");
    gridImages().forEach(img => img.style.opacity = "1");
    overlay.classList.remove("visible");
    galleryCounter.style.display = "none";
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

    // Update control bars
    const controlsTop = document.querySelector(".controls-top");
    const controlsBottom = document.querySelector(".controls-bottom");
    controlsTop.style.backgroundColor = color;
    controlsBottom.style.backgroundColor = color;
    galleryCounter.style.backgroundColor = color;

    // Update button text color
    controlsTop.querySelectorAll("button").forEach(b => b.style.color = isDark ? "#fff" : "#000");
    controlsBottom.querySelectorAll("button").forEach(b => b.style.color = isDark ? "#fff" : "#000");
    galleryCounter.style.color = isDark ? "#fff" : "#000";

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

  function imageLabel(index) {
    return `${event.about.title} - photo ${index + 1} of ${event.images.length}`;
  }

  function updateCounter() {
    galleryCounter.textContent = `${currentIndex + 1} / ${event.images.length}`;
    galleryCounter.style.display = isFullscreen ? "block" : "none";
    if (isFullscreen) queueCounterPositionUpdate();
  }

  function queueCounterPositionUpdate() {
    requestAnimationFrame(() => requestAnimationFrame(updateCounterPosition));
  }

  function updateCounterPosition() {
    if (!isFullscreen) return;
    const rect = fullscreenImg.getBoundingClientRect();
    galleryCounter.style.left = `${Math.min(window.innerWidth - galleryCounter.offsetWidth - 12, rect.right + 12)}px`;
    galleryCounter.style.top = `${rect.bottom - galleryCounter.offsetHeight}px`;
  }

  function updateCursorDirection(e) {
    if (!isFullscreen) return;
    const rect = fullscreenImg.getBoundingClientRect();
    const isRightSide = e.clientX > rect.left + rect.width / 2;
    fullscreenDiv.classList.toggle("cursor-left", !isRightSide);
    fullscreenDiv.classList.toggle("cursor-right", isRightSide);
  }

  function setMeta(name, content) {
    const tag = document.querySelector(`meta[name="${name}"]`);
    if (tag) tag.content = content;
  }

  function setMetaProperty(property, content) {
    const tag = document.querySelector(`meta[property="${property}"]`);
    if (tag) tag.content = content;
  }

  // Fullscreen navigation
  fullscreenDiv.addEventListener("click", (e) => {
    const imgs = gridImages();
    const rect = fullscreenImg.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width / 2) {
      currentIndex = (currentIndex + 1) % imgs.length;
    } else {
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    }
    fullscreenImg.src = imgs[currentIndex].src;
    fullscreenImg.alt = imageLabel(currentIndex);
    updateCounter();
  });

  fullscreenDiv.addEventListener("mousemove", updateCursorDirection);
  fullscreenImg.addEventListener("load", queueCounterPositionUpdate);
  window.addEventListener("resize", queueCounterPositionUpdate);

  document.addEventListener("keydown", (e) => {
    if (!isFullscreen) return;
    const imgs = gridImages();
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % imgs.length;
      fullscreenImg.src = imgs[currentIndex].src;
      fullscreenImg.alt = imageLabel(currentIndex);
      updateCounter();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      fullscreenImg.src = imgs[currentIndex].src;
      fullscreenImg.alt = imageLabel(currentIndex);
      updateCounter();
    } else if (e.key === "Escape") {
      showGrid();
    }
  });

  window.addEventListener("load", updateButtons);
})();
