import RightHand from "./right_hand.js";
import LeftHand from "./left_hand.js";
import GestureClassifier from "./gesture_classifier.js";

export default class HandDetection {
  constructor(grid) {
    this.grid = grid;
  }

  init() {
    this.initializeElements();
    this.initializeHolistic();
    this.initializeCamera();
    this.rightHand = new RightHand(this.grid);
    this.leftHand = new LeftHand();
    this.gestureClassifier = new GestureClassifier();
    this.gestureClassifier.init();
  }

  initializeElements() {
    this.videoElement = document.getElementById("video-input");
    this.canvasElement = document.getElementById("canvas-output");
    this.canvasCtx = this.canvasElement.getContext("2d");
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
        await this.holistic.send({ image: this.videoElement });
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
    this.rightHand.draw(this.canvasCtx);
    if (results.leftHandLandmarks) {
      this.leftHand.updateLandmarks(results.leftHandLandmarks);
      this.leftHand.draw(this.canvasCtx);
      this.gestureClassifier.addExample(results.image);
      this.gestureClassifier.predict(results.image, this.grid);
    }
    this.canvasCtx.restore();
  }
}
