export default class RightHand {
  constructor() {
    this.startBtn = document.getElementById("start-btn");
    this.bpmElement = document.getElementById("bpm");
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
  }

  showRaisedFingers() {
    let raisedFingers = 0;
    const landmarks = this.landmarks;
    if (landmarks) {
      for (let i = 2; i <= 5; i++) {
        const fingerTip = landmarks[4 * i];
        const fingerDIP = landmarks[4 * i - 1];
        if (fingerTip.y < fingerDIP.y) {
          raisedFingers++;
        }
      }
      if (landmarks[4].x > landmarks[3].x) {
        raisedFingers++;
      }
    }

    document.querySelector('#raisedFingers').innerText = `Number of raised fingers: ${raisedFingers}`;
    this.updateBMP(raisedFingers);
  }

  updateBMP(raisedFingers) {
    Tone.Transport.bpm.value = 50 + (raisedFingers * 20);
    this.updateBMPOnScreen();
  }

  updateBMPOnScreen() {
    if (this.startBtn.classList.contains("disabled")) {
      this.bpmElement.innerText = `BPM: ${Tone.Transport.bpm.value}`
    } else {
      this.bpmElement.innerText = `BPM: 0`;
    }
  }

  startSound() {
    const osc = new Tone.Oscillator().toDestination();
    Tone.Transport.bpm.value = 50;
    Tone.Transport.scheduleRepeat(time => {
      osc.start(time).stop(time + 0.1);
    }, "4n");
    Tone.Transport.start();
    this.updateBMPOnScreen();
  }

  stopSound() {
    Tone.Transport.stop();
    this.updateBMPOnScreen();
  }

}