(function () {
  const tg = window.Telegram.WebApp;
  const form = document.getElementById("service-form");
  const priority = document.getElementById("priority");
  const comment = document.getElementById("comment");

  function validate() {
    const commentRequired = priority.value === "наивысший";
    comment.required = commentRequired;
    if (!form.reportValidity()) {
      return false;
    }
    return true;
  }

  tg.ready();
  tg.expand();
  tg.MainButton.setText("Отправить заявку");
  tg.MainButton.show();

  priority.addEventListener("change", validate);

  tg.MainButton.onClick(function () {
    if (!validate()) {
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    tg.sendData(JSON.stringify(data));
  });
})();
