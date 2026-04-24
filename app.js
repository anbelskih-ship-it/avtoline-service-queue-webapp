(function () {
  const tg = window.Telegram.WebApp;
  const form = document.getElementById("service-form");
  const priority = document.getElementById("priority");
  const comment = document.getElementById("comment");
  const submitButton = document.getElementById("submit-button");
  const debugBanner = document.getElementById("debug-banner");

  function showDebug(message) {
    debugBanner.hidden = false;
    debugBanner.textContent = message;
  }

  function validate() {
    const commentRequired = priority.value === "наивысший";
    comment.required = commentRequired;
    if (!form.reportValidity()) {
      return false;
    }
    return true;
  }

  function submitPayload() {
    showDebug("Нажатие обработано. Проверяем форму...");
    if (!validate()) {
      showDebug("Форма не прошла проверку. Проверьте обязательные поля.");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    if (!tg || typeof tg.sendData !== "function") {
      showDebug("Telegram WebApp API недоступен. Форма открыта вне поддерживаемого контекста.");
      return;
    }
    showDebug("Отправляем данные в Telegram...");
    tg.sendData(JSON.stringify(data));
  }

  if (!tg) {
    showDebug("Объект Telegram.WebApp не найден.");
    return;
  }

  tg.ready();
  tg.expand();
  if (tg.MainButton && typeof tg.MainButton.hide === "function") {
    tg.MainButton.hide();
  }
  showDebug("Форма готова к отправке.");

  priority.addEventListener("change", validate);
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    submitPayload();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitPayload();
  });
})();
