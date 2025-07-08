document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector("input[name='phone']");

  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/[^\d+]/g, '');

    if (phoneInput.value.startsWith('+7')) {
      phoneInput.value = phoneInput.value.slice(0, 12);
    } else if (phoneInput.value.startsWith('8')) {
      phoneInput.value = phoneInput.value.slice(0, 11);
    }
  });
});

const giftButtons = document.querySelectorAll(".gift-btn");
const giftInput = document.querySelector("input[name='gift']");

giftButtons.forEach(button => {
  button.addEventListener("click", () => {
    // value-ны hidden input-қа жазу
    giftInput.value = button.getAttribute("data-value");

    // актив кнопканың визуалын ауыстыру (басқасын өшіріп)
    giftButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
