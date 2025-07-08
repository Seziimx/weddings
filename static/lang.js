const langBtn = document.getElementById("lang-toggle");

langBtn.addEventListener("click", () => {
  window.lang = (window.lang === "kz") ? "ru" : "kz";
  langBtn.innerText = (window.lang === "kz") ? "Русский" : "Қазақ тілі";
  translate();  // переводим всё
});

document.addEventListener("DOMContentLoaded", translate);
