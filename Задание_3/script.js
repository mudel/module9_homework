// После загрузки DOM

document.addEventListener('DOMContentLoaded', function() {

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

  // Ищем ноду для вставки результата запроса
  const resultNode = document.querySelector('.j-result');
  // Ищем кнопку, по нажатии на которую будет запрос
  const btnNode = document.querySelector('.j-btn-request');

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
    resultNode.innerHTML = cards;
  }


  // Функция вывода сообщения при вводе неправильного значения
    
  function displayWarning(data) {
    let  warning = `
        <div class="class_warning">
          <p>${data}</p>
        </div>
      `;
    resultNode.innerHTML = warning;
  }
    
  // Вешаем обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {

      // Запрос числа из input
      let value = document.querySelector('.online-input').value;
      
      if (!Number.isInteger(+value)) {
        displayWarning("Нужно ввести целое число"); 
        document.querySelector('.online-input').value = "";
        return;
      };
      
      if (+value>10 || +value<1) {
        displayWarning("Число вне диапазона от 1 до 10"); 
        document.querySelector('.online-input').value = "";
        return;
      };

      console.log(value);
      
      useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
      document.querySelector('.online-input').value = "";
  });
}, false);
