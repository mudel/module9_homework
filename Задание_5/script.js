// 9.7. Финальное задание Задание 5.
// Запуск после загрузки DOM

document.addEventListener('DOMContentLoaded', function() {

// Ноды ввода-вывода

const input1 = document.querySelector("#in1");
const input2 = document.querySelector("#in2");
const btn = document.querySelector('.j-btn-request');
const result = document.querySelector('.j-result');

if( (localStorage.input1Stor!= null) & (localStorage.input2Stor!= null) ){
    useRequest(`https://picsum.photos/v2/list?page=${localStorage.input1Stor}&limit=${localStorage.input2Stor}`, displayResult);
}

// Функция отправки запроса
function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
        xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    xhr.send();
  };

// Функция проверки введенных инпутов на входные условия
function validateInput() {
    let validated1 = false;
    let validated2 = false;
    let result = false;

    if (input1.value === '' || isNaN(+input1.value)) {
      validated1 = true;
    } else {
        if (+input1.value < 1 || +input1.value > 10) {
        validated1 = true;
      }
    }
    if (input2.value === '' || isNaN(+input2.value)) {
      validated2 = true;
    } else {
        if (+input2.value < 1 || +input2.value > 10) {
        validated2 = true;
      }
    }

    if (validated1&validated2) {
      result = 'Номер страницы и лимит вне диапазона от 1 до 10';
      return result;
    }
    if (validated1&!validated2) {
      result = 'Номер страницы вне диапазона от 1 до 10';
      return result;
    }
    if (!validated1&validated2) {
      result = 'Лимит вне диапазона от 1 до 10';
      return result;
    }
    return result;
}

  // Функция вывода результата
  function displayResult(apiData) {
    let cards = '';
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img src="${item.download_url}" class="card-image">
        </div>
      `;
      cards = cards + cardBlock;
    });
    result.innerHTML = cards;
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
    let validate = validateInput();
    if (validate) {
      displayWarning(validate);
      return;
    } else {
        localStorage.input1Stor = input1.value; 
        localStorage.input2Stor = input2.value;    
        useRequest(`https://picsum.photos/v2/list?page=${input1.value}&limit=${input2.value}`, displayResult);
      }
  });

}, false);
