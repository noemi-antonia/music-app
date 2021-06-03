export default class LeftHand {
  constructor() {
    this.bpm = 90;
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
    this.indexFinger = landmarks && landmarks[8];
    this.thumbFinger = landmarks && landmarks[4];
    this.updateBpm();
    this.updateRaisedFingers();
  }

  draw(ctx) {
    drawLandmarks(ctx, this.landmarks, {
      color: "lightblue",
      lineWidth: 1,
    });
    this.writeBpmInfo(ctx);
  }

  writeBpmInfo(ctx) {
    if (!this.indexFinger) return;
    const {
      x,
      y
    } = this.indexFinger;
    ctx.save();
    ctx.fillStyle = 'lightblue';
    ctx.font = '15px Arial';
    ctx.fillText(
      `bpm: ${this.bpm}`,
      x * 780 - 55,
      y * 439 - 15
    );
    ctx.restore();
  }

  updateBpm() {
    if (!(this.indexFinger && this.thumbFinger)) return;
    const {
      x: x1,
      y: y1
    } = this.indexFinger;
    const {
      x: x2,
      y: y2
    } = this.thumbFinger;
    const distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    // document.getElementById('distance').innerText = distance;
    const maxDistance = 0.02;
    if (distance < maxDistance) {
      if (this.lastBpmY) {
        if (y1 < this.lastBpmY) {
          this.bpm++;
        } else {
          this.bpm--;
        }
      }
      this.lastBpmY = y1;
    }
  }

  updateRaisedFingers() {
    this.tipIds = [4, 8, 12, 16, 20];
    let nrOfRaisedFingers = 0;

    // Thumb finger
    if (this.landmarks[this.tipIds[0]].x < this.landmarks[1].x) {
      nrOfRaisedFingers++;
    }

    for (let i = 1; i < 5; i++) {
      if (this.landmarks[this.tipIds[i]].y < this.landmarks[this.tipIds[i] - 2].y) {
        nrOfRaisedFingers++;
      }
    }

    document.getElementById('raised-fingers').innerText = `Number of raised fingers: ${nrOfRaisedFingers}`;
  }
}