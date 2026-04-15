/**
 * Shared logic for index pages (index.html, editorials.html, others.html)
 *
 * Each page sets these globals before loading this script:
 *   window.PAGE_CATEGORY  — "concerts" | "editorials" | "others"
 *   window.PAGE_FILTERS   — array of filter config objects (optional; omit for "All" only)
 *
 * Filter config object shape:
 *   { label: string, tag: string|null, group: string|null }
 */
(function () {
  const tbody     = document.getElementById("eventsBody");
  const hoverImg  = document.getElementById("hoverImage");
  const filterDiv = document.getElementById("filters");
  const category  = window.PAGE_CATEGORY;
  const filterCfg = window.PAGE_FILTERS || null;

  /* ── Table rows ───────────────────────────────────────────── */

  EVENTS.filter(ev => ev.category === category && !ev.hidden).forEach(ev => {
    const tr = document.createElement("tr");
    tr.className = ev.tags.join(" ");
    tr.innerHTML = `<td>${ev.year}</td><td>${ev.title}</td>`;

    tr.addEventListener("click", () => {
      window.location.href = `gallery.html?event=${ev.id}`;
    });
    tr.addEventListener("mouseenter", () => {
      hoverImg.src = `${ev.folder}/${ev.preview}`;
      hoverImg.style.display = "block";
    });
    tr.addEventListener("mouseleave", () => {
      hoverImg.style.display = "none";
    });

    tbody.appendChild(tr);
  });

  /* ── Hover image follows cursor ───────────────────────────── */

  document.addEventListener("mousemove", (e) => {
    if (hoverImg.style.display === "block") {
      hoverImg.style.top  = e.clientY + "px";
      hoverImg.style.left = e.clientX + "px";
    }
  });

  /* ── Filter buttons ───────────────────────────────────────── */

  if (filterCfg) {
    const activeTags = new Set();
    const btnMap     = new Map();

    filterCfg.forEach(f => {
      const btn = document.createElement("button");
      btn.textContent = f.label;
      if (f.tag) btnMap.set(f.tag, btn);

      btn.addEventListener("click", () => {
        if (f.tag === null) {
          // "All" — clear everything
          activeTags.clear();
          filterDiv.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        } else {
          if (activeTags.has(f.tag)) {
            activeTags.delete(f.tag);
            btn.classList.remove("active");
          } else {
            // Deactivate others in the same group
            filterCfg.forEach(other => {
              if (other.group === f.group && other.tag && other.tag !== f.tag) {
                activeTags.delete(other.tag);
                btnMap.get(other.tag)?.classList.remove("active");
              }
            });
            activeTags.add(f.tag);
            btn.classList.add("active");
          }
        }
        applyFilters();
      });

      filterDiv.appendChild(btn);
    });

    function applyFilters() {
      tbody.querySelectorAll("tr").forEach(row => {
        const show = activeTags.size === 0
          || [...activeTags].every(tag => row.classList.contains(tag));
        row.style.display = show ? "" : "none";
      });
    }
  } else {
    // Simple "All" reset button only (editorials / others)
    const btn = document.createElement("button");
    btn.textContent = "All";
    btn.addEventListener("click", () => {
      tbody.querySelectorAll("tr").forEach(row => { row.style.display = ""; });
    });
    filterDiv.appendChild(btn);
  }

  /* ── Mobile gate ──────────────────────────────────────────── */

  if (sessionStorage.getItem("gateSkipped")) {
    document.body.classList.add("gate-dismissed");
  }
  document.getElementById("mobileSkip").addEventListener("click", () => {
    sessionStorage.setItem("gateSkipped", "1");
    document.body.classList.add("gate-dismissed");
  });

  /* ── Sortable columns ─────────────────────────────────────── */

  const sortDirs = {};
  document.querySelectorAll("#eventsTable th.sortable").forEach(th => {
    th.addEventListener("click", () => {
      const col = parseInt(th.dataset.col);
      sortDirs[col] = sortDirs[col] === "asc" ? "desc" : "asc";
      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const aText = a.cells[col].textContent;
        const bText = b.cells[col].textContent;
        return sortDirs[col] === "asc"
          ? aText.localeCompare(bText)
          : bText.localeCompare(aText);
      });
      rows.forEach(row => tbody.appendChild(row));
    });
  });
})();
