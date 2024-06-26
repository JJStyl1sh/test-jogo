document.getElementById('config').addEventListener('click', function() {
    this.classList.toggle('rotate');
    var extraButtons = document.getElementById('extra-buttons');
    if (extraButtons.style.display === "none" || extraButtons.style.display === "") {
        extraButtons.style.display = "block";
    } else {
        extraButtons.style.display = "none";
    }
});