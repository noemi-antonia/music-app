import { drawHand,printQuiz } from "./utilities.js";

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const canvasVideo = document.getElementById('canvasVideo');
const ctx = canvas.getContext('2d');
const ctxVideo = canvasVideo.getContext('2d');
const quiz = document.getElementById('quiz-container');
const RESIZE = 330;
let canvasWidth;
let canvasHeight;


const question = "What is the smallest planet in our solar system?";
let answers = ["Venus","Mercury","Mars"];
const indexOfCorrectAnswer = 1;

const howManyOctaves = 4;

function startVideo() {
  navigator.getUserMedia(
    { 
      audio: true,
      video: true
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  );
  const playPromise = document.querySelector('video').play();
  if (playPromise) {
    playPromise.then(response => {
        const videoRatio = video.offsetWidth / video.offsetHeight;
        canvas.width = canvasVideo.width = 780;
        canvas.height = canvasVideo.height = canvas.width / videoRatio;
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        detect();
        quiz.style.width = `${canvasWidth - RESIZE}px`; 
        quiz.style.height = `${canvasHeight}px`;
        const originX = quiz.getBoundingClientRect().x;
        const originY = quiz.getBoundingClientRect().y;

        printQuiz(question,answers,indexOfCorrectAnswer, originX, originY);

      })
      .catch(error => { console.error(error) });  
  }
}

startVideo();

function onResults(results) {
  drawHand(results, ctx, ctxVideo, canvasWidth, canvasHeight);
}

const holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.1/${file}`;
}});
holistic.setOptions({
  selfieMode: true,
  upperBodyOnly: true,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
holistic.onResults(onResults);

const detect = async () => {
  await holistic.send({ image: video });
  requestAnimationFrame(detect);
};