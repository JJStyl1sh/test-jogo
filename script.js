document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById("grid");
  const arrowColors = ["green", "red"];
  let correctClicks = 0;
  let totalAreas = 2;
  let arrowCount = 1;

  function createGrid() {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${Math.sqrt(totalAreas)}, 1fr)`;
    for (let i = 0; i < totalAreas; i++) {
      const area = document.createElement("div");
      area.classList.add("grid-item");
      area.setAttribute("id", `area${i}`);
      grid.appendChild(area);
    }
  }

  function createArrow() {
    const arrow = document.createElement("div");
    arrow.classList.add("arrow");
    arrow.textContent = '↑';
    arrow.style.fontSize = '2rem';
    arrow.style.color = arrowColors[Math.floor(Math.random() * arrowColors.length)];
    arrow.onclick = moveArrow;
    return arrow;
  }

  function moveArrow() {
    const areas = document.querySelectorAll('.grid-item');
    const currentArea = this.parentNode;
    currentArea.removeChild(this);
    const newAreaIndex = Math.floor(Math.random() * areas.length);
    areas[newAreaIndex].appendChild(createArrow());

    correctClicks++;
    if (correctClicks % 10 === 0) {
      totalAreas += 2;
    
      createGrid();
      for (let i = 0; i < arrowCount; i++) {
        const areaIndex = Math.floor(Math.random() * totalAreas);
        document.getElementById(`area${areaIndex}`).appendChild(createArrow());
      }
    }
  }

  createGrid();
  document.getElementById(`area${Math.floor(Math.random() * totalAreas)}`).appendChild(createArrow());
});
