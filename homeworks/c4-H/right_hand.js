export default class RightHand {
  constructor(grid) {
    this.grid = grid;
  }

  isCellPressed(cell) {
    const clientRect = cell.getBoundingClientRect();
    const indexFingerX = this.indexFingerTip.x * 780 + 20;
    const indexFingerY = this.indexFingerTip.y * 439 + 20;
    const cellX = clientRect.x;
    const cellY = clientRect.y;
    if (cell.classList.contains('recently-activated-by-touch')) return;
    return (
      indexFingerX > cellX && indexFingerX < clientRect.right &&
      indexFingerY > cellY && indexFingerY < clientRect.bottom
    )
  }

  updateLandmarks(landmarks) {
    this.landmarks = landmarks;
  }

  draw(ctx) {
    this.indexFingerTip = this.landmarks && this.landmarks[8];
    if (this.indexFingerTip) {
      const isPressed = this.indexFingerTip.z < -0.1;
      ctx.beginPath();
      ctx.fillStyle = isPressed ? 'green' : 'orange';
      ctx.arc(
        this.indexFingerTip.x * 780,
        this.indexFingerTip.y * 439,
        10,
        0,
        2 * Math.PI
      )
      ctx.fill();
      ctx.stroke();

      if (isPressed) {
        this.grid.cells.forEach((cell) => {
          if (this.isCellPressed(cell)) {
            this.grid.toggleCellState(cell);
            cell.classList.add('recently-activated-by-touch');
            setTimeout(() => {
              cell.classList.remove('recently-activated-by-touch');
            }, 400)
          }
        })
      }
    }
  }
}
