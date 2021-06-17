import RightHand from "./right_hand.js";

export default class HandDetection {
  init() {
    this.initializeElements();
    this.initializeHolistic();
    this.initializeCamera();
    this.rightHand = new RightHand();
  }

  initializeElements() {
    this.videoElement = document.getElementById("video-input");
    this.canvasElement = document.getElementById("canvas-output");
    this.canvasCtx = this.canvasElement.getContext("2d");

    this.startBtn = document.getElementById("start-btn");
    this.startBtn.addEventListener('click', () => {
      this.startBtn.classList.add("disabled");
      this.rightHand.startSound();
    })

    this.stopBtn = document.getElementById("stop-btn");
    this.stopBtn.addEventListener('click', () => {
      this.startBtn.classList.remove("disabled");
      this.rightHand.stopSound();
    })
  }

  initializeHolistic() {
    this.holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    this.holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.holistic.onResults(this.onResults.bind(this));
  }

  initializeCamera() {
    const camera = new Camera(this.videoElement, {
      onFrame: async () => {
        await this.holistic.send({
          image: this.videoElement
        });
      },
      width: 780,
      height: 439,
    });
    camera.start();
  }

  onResults(results) {
    this.canvasCtx.save();
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.canvasCtx.drawImage(
      results.image,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.rightHand.updateLandmarks(results.rightHandLandmarks);
    this.rightHand.showRaisedFingers();

    this.canvasCtx.restore();
  }
}