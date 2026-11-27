(function () {
  var toggle = document.getElementById("navToggle");
  var header = document.querySelector(".header");
  var nav = document.getElementById("navMenu");
  var year = document.getElementById("year");
  var form = document.getElementById("leadForm");
  var waNumber = "557199662764";

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle && header && nav) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var nome = data.get("nome") || "";
      var telefone = data.get("telefone") || "";
      var interesse = data.get("interesse") || "";
      var mensagem = data.get("mensagem") || "";
      var text =
        "Olá, sou " +
        nome +
        ". Quero um orçamento com a SERVIPRE.\nInteresse: " +
        interesse +
        "\nWhatsApp: " +
        telefone +
        (mensagem ? "\nMensagem: " + mensagem : "");
      window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }
})();
(function () {
  var stack = document.getElementById("aboutStack");
  var prevBtn = document.getElementById("aboutPrev");
  var nextBtn = document.getElementById("aboutNext");
  var counter = document.getElementById("aboutCounter");

  if (!stack || !prevBtn || !nextBtn) return;

  var photos = Array.prototype.slice.call(stack.querySelectorAll(".about__photo"));
  var layerClasses = ["about__photo--base", "about__photo--overlap", "about__photo--third"];
  var activeIndex = photos.length - 1;

  function renderStack() {
    photos.forEach(function (img, idx) {
      layerClasses.forEach(function (cls) {
        img.classList.remove(cls);
      });
      var offset = (idx - activeIndex + photos.length) % photos.length;
      if (offset === 0) {
        img.classList.add("about__photo--third");
      } else if (offset === 1) {
        img.classList.add("about__photo--base");
      } else {
        img.classList.add("about__photo--overlap");
      }
    });

    if (counter) {
      counter.textContent = (activeIndex + 1) + " / " + photos.length;
    }
  }

  prevBtn.addEventListener("click", function () {
    activeIndex = (activeIndex - 1 + photos.length) % photos.length;
    renderStack();
  });

  nextBtn.addEventListener("click", function () {
    activeIndex = (activeIndex + 1) % photos.length;
    renderStack();
  });

  renderStack();
})();
