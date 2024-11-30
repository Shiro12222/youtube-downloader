document.getElementById("animateButton").onclick = function() {
    animateButtonTransition();
    this.disabled = true;
};

function animateButtonTransition() {
    const animeButton = document.getElementById("animateButton");
    const downloadButton = document.getElementById("downloadButton");
    const dropDownButton = document.getElementById("dropDownButton");
    const resultBoard = document.getElementById("resultBoard");
  
  const currWidth = animeButton.clientWidth;
animeButton.style.backgroundColor = "#DACFCF";
animeButton.borderLeftRightRadius = "30px";
animeButton.style.width = currWidth + 1573 + "px";
  setTimeout(() => {
        downloadButton.style.opacity = "1";
        dropDownButton.style.opacity = "1";
        resultBoard.style.opacity = "1";
   }, 600);
}