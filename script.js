document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById("grid");
  const arrowColors = ["green", "red"];
  let correctClicks = 0;
  let totalAreas = 2;
  const maxAreas = 6;

  function createGrid() {
    grid.innerHTML = '';
    let columns, rows;

    if (totalAreas === 2) {
      columns = 1;
      rows = 2;
    } else if (totalAreas === 4) {
      columns = 2;
      rows = 2;
    } else if (totalAreas === 6) {
      columns = 2;
      rows = 3;
    }

    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < totalAreas; i++) {
      const area = document.createElement("div");
      area.classList.add("grid-item");
      area.setAttribute("id", `area${i}`);
      grid.appendChild(area);
    }
  }

  function createShape() {
    const shapeType = Math.random() < 0.5 ? "arrow" : "circle";
    const shape = document.createElement("div");
    shape.classList.add("shape", shapeType);
    if (shapeType === "arrow") {
      shape.textContent = '↑';
      shape.style.fontSize = '2rem';
      shape.style.color = arrowColors[Math.floor(Math.random() * arrowColors.length)];
    } else {
      shape.style.backgroundColor = arrowColors[Math.floor(Math.random() * arrowColors.length)];
    }
    shape.onclick = moveShape;
    return shape;
  }

  function moveShape() {
    if (correctClicks >= 14) {
      alert("Parabéns! Você concluiu o jogo.");
      return; // Impede a criação de novas formas após os 10 últimos cliques
    }

    const areas = document.querySelectorAll('.grid-item');
    const currentArea = this.parentNode;
    currentArea.removeChild(this);

    // Ensure only one shape is generated at a time
    const newShape = createShape();
    const newAreaIndex = Math.floor(Math.random() * areas.length);
    areas[newAreaIndex].appendChild(newShape);

    correctClicks++;
    if (correctClicks % 5 === 0) {
      if (totalAreas < maxAreas) {
        totalAreas += 2;
        createGrid();
      }
      const areaIndex = Math.floor(Math.random() * totalAreas);
      document.getElementById(`area${areaIndex}`).appendChild(createShape());
    }
  }

  createGrid();
  document.getElementById(`area${Math.floor(Math.random() * totalAreas)}`).appendChild(createShape());
});
