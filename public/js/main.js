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

function convertYouTubeUrl(url) {
  return url.replace('watch?v=', 'embed/');
}

async function getInfo(){
  try {
    const youtubeLink = document.getElementById("inputForm").value;
    const response = await fetch('/youtube/getTitle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: youtubeLink })
    });

    const videoInfo = await response.json();
    console.log(videoInfo);
    const descriptionDetails = document.getElementById("descriptionDetails");
    const descriptionTitle = document.getElementById("descriptionTitle");
    const description = document.getElementById("description");
    const youtubePreview = document.getElementById("youtubePreview");
    const embedYoutubeLink = convertYouTubeUrl(videoInfo.youtubeLink);

    youtubePreview.src = embedYoutubeLink;
    console.log(embedYoutubeLink);
    descriptionTitle.textContent = videoInfo.title;
    descriptionDetails.textContent = "\n" + videoInfo.description + "\n\n";
    description.style.opacity = "1";
    descriptionTitle.style.opacity = "1";
    descriptionDetails.style.opacity = "1";
  } catch (error) {
    console.log("Error:", error);
  }
}

async function handleDownload(){
  console.log("handledownloading");
  try {
    const youtubeLink = document.getElementById("inputForm").value;
    const response = await fetch('/youtube/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: youtubeLink })
    });

    if(response.ok){
      console.log("response ok");

      const download = await response.blob();
      const youtubeuUrl = window.URL.createObjectURL(download);
      const link = document.createElement("a");
      link.href = youtubeuUrl;
      link.download = "title.mp4";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(youtubeuUrl);
    } else {
      throw new Error("Download error");
    }
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
      getInfo();
      handleDownload();
  }
});

document.getElementById("downloadButton").onclick = () => {
  getInfo();
  handleDownload();
};