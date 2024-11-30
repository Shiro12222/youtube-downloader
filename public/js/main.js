function animateButtonTransition() {
  const animeButton = document.getElementById("animateButton");
  const downloadButton = document.getElementById("downloadButton");
  const dropDownButton = document.getElementById("dropDownButton");
  const resultBoard = document.getElementById("resultBoard");
  const inputForm = document.getElementById("inputForm");
  const currWidth = animeButton.clientWidth;

  // Onclick Transition
  animeButton.style.backgroundColor = "#DACFCF";
  animeButton.borderLeftRightRadius = "30px";
  animeButton.style.transform = "translateX(-50%)";
  animeButton.style.width = currWidth + 1573 + "px";
  inputForm.style.display = "block";
  downloadButton.style.display = "block";
  dropDownButton.style.display = "block";
  resultBoard.style.display = "flex";
  setTimeout(() => {
        inputForm.style.opacity = "1";
        downloadButton.style.opacity = "1";
        dropDownButton.style.opacity = "1";
        resultBoard.style.opacity = "1";
   }, 800);
}

// Flex size with scale
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

async function handleDownload(){
  try {
    const youtubeLink = document.getElementById("inputForm").value;
    const response = await fetch('/youtube/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: youtubeLink })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

window.addEventListener('resize', setPageScale);
window.addEventListener('load', setPageScale);

document.getElementById("animateButton").onclick = function() {
  animateButtonTransition();
  this.disabled = true;
};

document.getElementById("inputForm").addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      handleDownload();
  }
});
document.getElementById("downloadButton").onclick = handleDownload;