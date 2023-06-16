const video = document.getElementById('video')
const emotionArray = ['happy', 'sad', 'neutral', 'surprised']

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    
    if (resizedDetections.length > 0) {
      const expressions = resizedDetections[0].expressions;

      let emotion = "";
      for (const [expression, probability] of Object.entries(expressions)) {
        if (probability > 0.1) {
          emotion = expression;
          AskEmotion(emotion);
          break;
        }
      }
      console.log("Erkannte Emotion: " + emotion);
    }
  }, 100);
});

let next = true;
let num = 0;
let wellDoneTimer = null;

function AskEmotion(emotion) {
  const textContainer = document.getElementById("TextForEmotion");

  if (next == true) {
    num = getRandomNumber(1, 4);
    next = false;
  }
  else if(next == false){
    for(let i = 1; i <= emotionArray.length; i++)
    {
      textContainer.innerText = 'Show me your ' + emotionArray[num - 1] + ' face';
      if(emotion == emotionArray[num - 1]){
        next = true;
        textContainer.innerText = 'Well Done';
        startWellDoneTimer(textContainer);
      }
    }
  }
}

function startWellDoneTimer(textContainer) {
  clearTimeout(wellDoneTimer);
  wellDoneTimer = setTimeout(function () {
    textContainer.innerText = "";
  }, 5000);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}