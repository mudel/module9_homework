// Запуск после загрузки DOM

document.addEventListener('DOMContentLoaded', function() {

// Ноды ввода-вывода

const input1 = document.querySelector("#in1");
const input2 = document.querySelector("#in2");
const btn = document.querySelector('.j-btn-request');
const result = document.querySelector('.j-result');

// Функция отправки fetch запроса
function sendRequest() {

    // Если введенные данные не удовлетворяют условиям печать сообщения
    if (!validateInput()) {
      displayWarning('одно из чисел вне диапазона от 100 до 300');
      return;
      } else {
        let h = 0;
        let w = 0;
        if (input1.value <= input2.value) {
          h = input2.value;
          w = input1.value;
        } else {
          h = input1.value;
          w = input2.value;
        }

        fetch(`https://picsum.photos/${w}/${h}`)
        .then((response) => {
          displayResult(response.url);
        });
    }
    return;
  }

// Функция проверки введенных инпутов на входные условия
function validateInput() {
    let validated = true;
    if (input1.value === '' || isNaN(+input1.value)) {
      validated = false;
    } else {
        if (+input1.value < 100 || +input1.value > 300) {
        validated = false;
      }
    }
    if (input2.value === '' || isNaN(+input2.value)) {
      validated = false;
    } else {
        if (+input2.value < 100 || +input2.value > 300) {
        validated = false;
      }
    }
    return validated;
}

  // Функция вывода результата
  function displayResult(imageUrl) {    
      const imageBlock = `
        <div class="card">
          <img src="${imageUrl}" class="card-image">
        </div>
      `;
      result.innerHTML = imageBlock;
  }


  // Функция вывода сообщения при вводе неправильного значения
  function displayWarning(data) {
    let  warning = `
        <div class="class_warning">
          <p>${data}</p>
        </div>
      `;
    result.innerHTML = warning;
    return;
  }
    
  // Обработчик клика на кнопку 
  btn.addEventListener('click', () => {
    sendRequest();
  });

}, false);
