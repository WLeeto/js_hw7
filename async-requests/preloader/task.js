// Получение ссылки на элементы страницы
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

// Проверка наличия закэшированных данных
const cachedData = localStorage.getItem('currencyData');
if (cachedData) {
  // Отображение закэшированных данных
  const parsedData = JSON.parse(cachedData);
  displayCurrencyData(parsedData);
}

// Отправка GET-запроса для получения данных о курсе валют
fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
  .then(response => response.json())
  .then(data => {
    // Обновление кэшированных данных
    localStorage.setItem('currencyData', JSON.stringify(data));

    // Скрытие анимации загрузки
    loader.classList.remove('loader_active');

    // Отображение данных о курсе валют
    displayCurrencyData(data);
  })
  .catch(error => {
    console.log('Произошла ошибка:', error);
    loader.classList.remove('loader_active');
  });

// Функция для отображения данных о курсе валют
function displayCurrencyData(data) {
  const valutes = data.response.Valute;
  for (const valute in valutes) {
    const item = document.createElement('div');
    item.className = 'item';

    const code = document.createElement('div');
    code.className = 'item__code';
    code.textContent = valutes[valute].CharCode;

    const value = document.createElement('div');
    value.className = 'item__value';
    value.textContent = valutes[valute].Value;

    const currency = document.createElement('div');
    currency.className = 'item__currency';
    currency.textContent = 'руб.';

    item.appendChild(code);
    item.appendChild(value);
    item.appendChild(currency);

    itemsContainer.appendChild(item);
  }
}
