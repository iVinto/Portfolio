// Block right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Block common keyboard shortcuts for saving images
document.addEventListener("keydown", (e) => {
  // Block Ctrl+S / Cmd+S (save)
  if ((e.ctrlKey || e.metaKey) && e.key === "s") e.preventDefault();
  // Block Ctrl+U / Cmd+U (view source)
  if ((e.ctrlKey || e.metaKey) && e.key === "u") e.preventDefault();
});
