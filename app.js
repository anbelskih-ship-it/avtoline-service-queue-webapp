(function () {
  const tg = window.Telegram.WebApp;
  const form = document.getElementById("service-form");
  const priority = document.getElementById("priority");
  const comment = document.getElementById("comment");
  const submitButton = document.getElementById("submit-button");

  function validate() {
    const commentRequired = priority.value === "наивысший";
    comment.required = commentRequired;
    if (!form.reportValidity()) {
      return false;
    }
    return true;
  }

  function submitPayload() {
    if (!validate()) {
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    tg.sendData(JSON.stringify(data));
  }

  tg.ready();
  tg.expand();
  tg.MainButton.setText("Отправить заявку");
  tg.MainButton.show();

  priority.addEventListener("change", validate);
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    submitPayload();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitPayload();
  });
  tg.MainButton.onClick(submitPayload);
})();
