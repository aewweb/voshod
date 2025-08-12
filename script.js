function scrollToTable() {
    const section = document.getElementById("zayavka");
    section.scrollIntoView({ behavior: "smooth" });
  }

// При прокрутке определяем, какой блок активен
document.addEventListener("scroll", () => {
  const blocks = document.querySelectorAll(".square-block");
  const triggerOffset = window.innerHeight / 2;

  blocks.forEach((block, index) => {
    const rect = block.getBoundingClientRect();
    if (rect.top < triggerOffset && rect.bottom > triggerOffset) {
      block.classList.add("active");
    }
  });
});

var swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: -100,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 800,
    modifier: 1,
    slideShadows: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
});

function sendForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const telegram = document.getElementById("telegram").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !telegram) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Пожалуйста, введите корректный адрес электронной почты.");
    return;
  }

  // Отправка данных в Telegram
  const message = `
📩 Новая заявка с сайта "Восход":
👤 ФИО: ${name}
📧 Email: ${email}
📱 Телефон: ${phone}
💬 Telegram: ${telegram}
  `;

  const TOKEN = "8135815901:AAGvHe4zyh-p5Q08B9eAATdEsi5aVio8CFE";
  const CHAT_ID = "553356311";
  const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Ваши данные отправлены! Свяжемся с Вами в течение 2 дней. Спасибо за участие!");
      document.getElementById("participationForm").reset();
    } else {
      alert("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  })
  .catch(error => {
    alert("Сервер недоступен. Проверьте подключение или обратитесь к разработчику.");
    console.error(error);
  });
}
