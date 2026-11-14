
document.addEventListener("DOMContentLoaded", () => {
  const modalElement = document.querySelector("#contactModal");
  const form = modalElement.querySelector("form");
  const successMessage = document.querySelector("#successMessage");
  const animationContainer = document.querySelector("#successAnimation");

  modalElement.addEventListener("hide.bs.modal", () => {
  if (modalElement.contains(document.activeElement)) {
    document.activeElement.blur();
  }
});
  let animation = null;
  let lottiePromise = null;

  function loadLottie() {
    if (window.lottie) {
      return Promise.resolve(window.lottie);
    }

    if (!lottiePromise) {
      lottiePromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";

        script.onload = () => resolve(window.lottie);
        script.onerror = reject;

        document.body.appendChild(script);
      }).catch(error => {
        lottiePromise = null;
        throw error;
      });
    }

    return lottiePromise;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.add("d-none");
    successMessage.classList.remove("d-none");

    try {
      const lottie = await loadLottie();

      if (!modalElement.classList.contains("show")) return;

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
    } catch (error) {
      console.error("Lottie не завантажився:", error);
    }
  });

  modalElement.addEventListener("hidden.bs.modal", () => {
    form.reset();
    form.classList.remove("was-validated", "d-none");
    successMessage.classList.add("d-none");

    if (animation) {
      animation.stop();
    }
  });
});
