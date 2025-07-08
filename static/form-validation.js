document.querySelector("form").addEventListener("submit", function(e) {
  const giftInput = document.querySelector("input[name='gift']");
  if (!giftInput.value) {
    e.preventDefault();
    alert(window.lang === "kz" ? "Қонақ кәде сомасын таңдаңыз!" : "Выберите сумму подарка!");
  }
});
