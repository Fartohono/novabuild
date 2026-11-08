
document.addEventListener("DOMContentLoaded", () => {
  const modalElement = document.querySelector("#contactModal");
  const form = modalElement.querySelector("form");
  const successMessage = document.querySelector("#successMessage");
  const animationContainer = document.querySelector("#successAnimation");

  let animation = null;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Валідація форми
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Приховуємо форму
    form.classList.add("d-none");

    // Показуємо повідомлення
    successMessage.classList.remove("d-none");

    // Завантажуємо анімацію лише один раз
    if (!animation) {
      animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "./Success.json"
      });
    } else {
      animation.goToAndPlay(0, true);
    }
  });

  // Скидання при закритті модалки
  modalElement.addEventListener("hidden.bs.modal", () => {
    form.reset();
    form.classList.remove("was-validated", "d-none");
    successMessage.classList.add("d-none");

    if (animation) {
      animation.stop();
    }
  });
});
