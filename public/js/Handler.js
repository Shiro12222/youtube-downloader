function animateButtonTransition() {
    const animeButton = document.getElementById("animateButton");
    const downloadButton = document.getElementById("downloadButton");
    const dropDownButton = document.getElementById("dropDownButton");
    const resultBoard = document.getElementById("resultBoard");
  
  const currWidth = animeButton.clientWidth;
animeButton.style.backgroundColor = "#DACFCF";
animeButton.borderLeftRightRadius = "30px";

animeButton.style.transform = "translateX(-50%)";
animeButton.style.width = currWidth + 1573 + "px";
  setTimeout(() => {
        downloadButton.style.opacity = "1";
        dropDownButton.style.opacity = "1";
        resultBoard.style.opacity = "1";
   }, 600);
}

function setPageScale() {
  const designWidth = 1920; 
  const designHeight = 1080;
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  
  const widthRatio = currentWidth / designWidth;
  const heightRatio = currentHeight / designHeight;
  const scale = Math.min(widthRatio, heightRatio);
  
  const wrapper = document.getElementById('pageWrapper');
  wrapper.style.transform = `scale(${scale})`;
  wrapper.style.transformOrigin = 'top center';
}

window.addEventListener('resize', setPageScale);
window.addEventListener('load', setPageScale);

document.getElementById("animateButton").onclick = function() {
  animateButtonTransition();
  this.disabled = true;
};