
const points = [8];
let allAnswers = [];
const origins = {};
const answerToPlay = {};
let indexOfCorrectAnswer;

const synth3 = new Tone.MonoSynth({
  oscillator: {
    type: "square"
  }
}).toDestination();

export const drawHand = (results, ctx, ctxVideo, w, h) => {
  // Loop through each prediction
  ctx.save();
  ctx.clearRect(0, 0, w, h);
  ctxVideo.clearRect(0, 0, w, h);
  ctxVideo.drawImage(results.image, 0, 0, w, h);
  const rH = results?.rightHandLandmarks || [];
  const lH = results?.leftHandLandmarks || [];
  const hands = [rH, lH];
  let allPoints = {};
  hands.forEach((hand, i) => {
    // Loop through fingers
    if (hand.length) {
      points.forEach(point => {
        allPoints[`${i}_${point}`] = {};

        const x = hand[point].x * w;
        // Get y point
        const y = hand[point].y * h;
        // Start drawing

        ctx.beginPath();
        const radius = 8; //(Math.abs(hand[point].z.toFixed(2) * w))/12;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        // Set line color
        ctx.fillStyle = radius > 7 ? 'red' : 'gold';
        // if (radius > 7.5) {
          allPoints[`${i}_${point}`] = { x, y, i, point };
        // }
        ctx.fill();
      });
    }
  });
  if (Object.values(allPoints).length) {
    checkTouch(allPoints);
  }
  ctx.restore();
};

const checkTouch = (allPoints) => {
  allAnswers.forEach(a => {
    const answerIndex = a.getAttribute('answer-index');
    let activate = false;
    Object.values(allPoints).forEach(p => {
      const bBox = a.getBoundingClientRect();
      if (p.x > bBox.x - origins.x && p.x < bBox.x - origins.x + bBox.width &&
        p.y > bBox.y - origins.y && p.y < bBox.y - origins.y + bBox.height) {
        activate = true;
        if (a.classList.contains('answer') && p.y < bBox.y - origins.y + 100) {
          activate = false;
        }
      }
    })
    if (activate) {
      if (!answerToPlay[answerIndex].active) {
        console.log('anything');
        a.classList.add('active');
        answerToPlay[answerIndex].active = true;
        validateAnswer(a,answerIndex);
      }
      console.log('altcv');
    } else {
      console.log('any');
      a.classList.remove('active');
      answerToPlay[answerIndex].active = false;
    }
  });
}

// -------------------------------------------------------------------------

export const printQuiz = (question, answers, correctAnswer, originX, originY) => {

  origins.x = originX;
  origins.y = originY;

  indexOfCorrectAnswer = correctAnswer;
  const quizContainer = document.getElementById('quiz-container');
  const questionDiv = document.createElement('div');
  quizContainer.appendChild(questionDiv);
  questionDiv.classList.add('question');

  questionDiv.innerHTML = question;

  answers.forEach((answer, index) => {

    const answersDiv = document.createElement('div');
    quizContainer.appendChild(answersDiv);
    answersDiv.classList.add('answer');
    allAnswers.push(answersDiv);
    answerToPlay[index]={index};
    answersDiv.setAttribute('answer-index',`${index}`);
    answersDiv.innerHTML = answer;

    answersDiv.addEventListener('click', () => validateAnswer(answersDiv,index));

  });
}

const validateAnswer = (answersDiv,index) => {
  const activeElement = document.querySelector(".active");
  
  if(activeElement){
    activeElement.className='answer';
  }

  if (index == indexOfCorrectAnswer) {
    answersDiv.classList.add('green','active');
    synth3.triggerAttackRelease("A3", '8n');
  }
  else{
    answersDiv.classList.add('red','active');
    synth3.triggerAttackRelease("C1", '8n');
  }
}