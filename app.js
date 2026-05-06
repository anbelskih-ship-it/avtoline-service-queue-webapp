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
    data._submitted_at = new Date().toISOString();
    data._timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (!tg || typeof tg.sendData !== "function") {
      window.alert("Форма должна быть открыта внутри Telegram.");
      return;
    }
    tg.sendData(JSON.stringify(data));
    if (typeof tg.close === "function") {
      tg.close();
    }
  }

  if (!tg) {
    return;
  }

  tg.ready();
  tg.expand();
  if (tg.MainButton && typeof tg.MainButton.hide === "function") {
    tg.MainButton.hide();
  }

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
