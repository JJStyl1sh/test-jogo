document.addEventListener("DOMContentLoaded", function() {
  const areas = [
    document.getElementById("area1"),
    document.getElementById("area2"),
    document.getElementById("area3"),
    document.getElementById("area4")
  ];

  let currentAreaIndex = Math.floor(Math.random() * areas.length);
  const arrowColors = ["green", "red"];

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
    areas[currentAreaIndex].innerHTML = '';
    currentAreaIndex = Math.floor(Math.random() * areas.length);
    areas[currentAreaIndex].appendChild(createArrow());
  }

  areas[currentAreaIndex].appendChild(createArrow());
});
