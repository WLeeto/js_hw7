// Функция для выполнения GET-запроса по указанному URL
function getData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Функция для отображения опроса
function displayPoll(pollData) {
  const pollTitleElement = document.getElementById('poll__title');
  const pollAnswersElement = document.getElementById('poll__answers');

  // Очищаем содержимое опроса перед отображением нового опроса
  pollTitleElement.innerText = '';
  pollAnswersElement.innerHTML = '';

  // Отображаем заголовок опроса
  pollTitleElement.innerText = pollData.data.title;

  // Создаем кнопки ответов и добавляем их в контейнер pollAnswersElement
  pollData.data.answers.forEach(answer => {
    const answerButton = document.createElement('button');
    answerButton.className = 'poll__answer';
    answerButton.innerText = answer;
    pollAnswersElement.appendChild(answerButton);
  });

  // Назначаем обработчики кликов на кнопках ответов
  const answerButtons = document.querySelectorAll('.poll__answer');
  answerButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('Спасибо, ваш голос засчитан!');
    });
  });
}

// Отправляем GET-запрос для получения данных опроса
getData('https://students.netoservices.ru/nestjs-backend/poll')
  .then(pollData => {
    displayPoll(pollData);
  })
  .catch(error => {
    console.error('Error:', error);
    // Обработка ошибок при получении данных опроса
  });
