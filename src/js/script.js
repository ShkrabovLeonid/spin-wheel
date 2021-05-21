"use strict"
import Modal from './_modal';


spinWheel();

function spinWheel() {
  let currentRotation = -60;
  let boost = 7;
  const spinButton = document.querySelector('.spin');
  const inputGuess = document.querySelector('#guess');
  let guessNumber;
  let rollResult;
  const modalspinWheel = new Modal('#modal_1');
  inputGuessNumber();

  inputGuess.addEventListener('input', (e)=>{
    guessNumber = inputGuessNumber();
  });
  spinButton.addEventListener('click', startSpin);
  
  function inputGuessNumber() {
    if (inputGuess) {
      if (inputGuess.value != '' && inputGuess.value > 0 && inputGuess.value <= 6) {
        spinButton.disabled = false;
        return inputGuess.value;
      } else {
        spinButton.disabled = true;
        return false;
      }
    }
  }

  function startSpin() {
    modalspinWheel.closeModal();
    spinButton.disabled = true;
    inputGuess.disabled = true;
    let randomNumber = Math.floor(Math.random() * (7 - 1) + 1);
    let randomFloat = (randomNumber * boost) * 60;
    if (randomNumber === 1) {
        randomFloat = 420 * boost;
    }
    currentRotation += randomFloat;

    wheelRotate(currentRotation)
      .then(() => {
        if (randomNumber == guessNumber) {
          rollResult = 'victory';
        } else {
          rollResult = 'fail';
        }
        modalRender(rollResult, randomNumber);
      })
      .then(()=>{
        currentRotation += ((360 * boost)-randomFloat);
      })
      .catch((e)=>{
        console.error(e);
      })
      .finally(()=>{
        spinButton.disabled = false;
        inputGuess.disabled = false;
        const restartspinButton = modalspinWheel.modal.querySelector('.restart');
        restartspinButton.addEventListener('click', startSpin);
      });
  }

  function wheelRotate(degr) {
    let rotating = document.querySelector('.rotating');
    rotating.style.transform = 'rotate('+'-'+degr+'deg)';
    return promiseAfterTimeout(3);
  }

  function promiseAfterTimeout(seconds) {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(), seconds*1000);
    });
  }

  function modalRender(rollResult, rollNumber) {
    let imgUrl,
        textContent,
        textButton;

    if (rollResult === 'victory') {
      imgUrl = './img/victory.jpg';
      textContent = `
      <h3>Вы победили!!! Правильное число ${rollNumber}</h3>
      <p>Теперь сыграем в супер игру</p>`;
      textButton = `Да, да хочу!`;
    } else if (rollResult === 'fail'){
      imgUrl = './img/fail.jpg';
      textContent = `
      <h3>К сожалению вы проиграли. Правильное число ${rollNumber}</h3>
      <p>Ребята, снимите-ка с него шкуру...</p>`;
      textButton = `Есть ещё подковы!`;
    }
    const html = `
    <div class="content">
        <div class="content__info-block">
            <div class="content__item content__img">
                <img src="${imgUrl}"alt="">
            </div>
            <div class="content__item content__text">
                ${textContent}
            </div>
        </div>
        <div class="content__button">
            <button class="button restart">${textButton}</button>
        </div>
    </div>`;
    modalspinWheel.render(html);
    modalspinWheel.openModal();
  }
}