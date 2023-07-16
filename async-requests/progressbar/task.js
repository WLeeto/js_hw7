document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();

  const fileInput = document.getElementById("file");
  const file = fileInput.files[0]; // Получить выбранный файл

  const formData = new FormData();
  formData.append("file", file);

  const url = "https://students.netoservices.ru/nestjs-backend/upload";

  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);

  // Обработчик прогресса загрузки
  xhr.upload.addEventListener("progress", function(event) {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      const progress = document.getElementById("progress");
      progress.value = percentComplete;
    }
  });

  // Обработчик успешного завершения загрузки
  xhr.addEventListener("load", function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Загрузка успешна
      console.log("Файл успешно загружен.");
    } else {
      // Ошибка загрузки
      console.error("Ошибка при загрузке файла:", xhr.status, xhr.statusText);
    }
  });

  // Обработчик ошибки загрузки
  xhr.addEventListener("error", function() {
    console.error("Произошла ошибка при загрузке файла.");
  });

  // Обработчик прерывания загрузки
  xhr.addEventListener("abort", function() {
    console.warn("Загрузка файла была прервана.");
  });

  xhr.send(formData);
});
