document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('participationForm');
  const submitBtn = document.getElementById('submitBtn');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const telegramInput = document.getElementById('telegram');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const telegramError = document.getElementById('telegram-error');
  const formStatus = document.getElementById('form-status');

  // Маска телефона: +375 (XX) XXX-XX-XX
  const im = new Inputmask({
    mask: "+375 (99) 999-99-99",
    placeholder: "_",
    showMaskOnFocus: true,
    showMaskOnHover: false,
    clearIncomplete: false,      // не очищать поле при потере фокуса
    autoUnmask: false,           // всегда хранить значение с маской
    jitMasking: true,
    greedy: false
  });
  im.mask(phoneInput);

  // Примитивная проверка email (с учётом практики)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function setError(input, errorElem, message) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    errorElem.textContent = message;
  }

  function clearError(input, errorElem) {
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    errorElem.textContent = '';
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      setError(nameInput, nameError, 'Введите ФИО.');
      return false;
    }
    if (value.length < 2) {
      setError(nameInput, nameError, 'Слишком короткое значение.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      setError(emailInput, emailError, 'Введите email.');
      return false;
    }
    if (!emailPattern.test(value)) {
      setError(emailInput, emailError, 'Введите корректный email (например, name@example.com).');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    // Проверяем полноту по Inputmask
    const isComplete = phoneInput.inputmask && phoneInput.inputmask.isComplete();
    if (!value) {
      setError(phoneInput, phoneError, 'Введите номер телефона.');
      return false;
    }
    if (!isComplete) {
      setError(phoneInput, phoneError, 'Введите номер в формате: +375 (XX) XXX-XX-XX.');
      return false;
    }
    clearError(phoneInput, phoneError);
    return true;
  }

  function validateTelegram() {
    const value = telegramInput.value.trim();
    // Если поле не пустое, проверяем строгий формат: @ + минимум 2 символа (буквы/цифры/нижнее подчёркивание)
    if (value && !/^@[\w\d_]{2,}$/.test(value)) {
      setError(
        telegramInput,
        telegramError,
        'Некорректный ник. Формат: @username.'
      );
      return false;
    }  
    clearError(telegramInput, telegramError);
    return true;
  }
  

  // Live-валидация
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);
  telegramInput.addEventListener('input', validateTelegram);

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  telegramInput.addEventListener('blur', validateTelegram);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const v1 = validateName();
    const v2 = validateEmail();
    const v3 = validatePhone();
    const v4 = validateTelegram();

    if (!(v1 && v2 && v3 && v4)) {
      // Фокус на первое невалидное поле
      const firstInvalid = [nameInput, emailInput, phoneInput, telegramInput].find(el => el.classList.contains('error'));
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Данные
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const telegram = telegramInput.value.trim();

    const message = `
    📩 Новая заявка с сайта "Восход":
    👤 ФИО: ${name}
    📧 Email: ${email}
    📱 Телефон: ${phone}
    💬 Telegram: ${telegram || '-'}
    `.trim();

    // ВАЖНО: храните токен на сервере/функции-прокси, а не в фронтенде!
    const TOKEN = "8135815901:AAGvHe4zyh-p5Q08B9eAATdEsi5aVio8CFE";
    const CHAT_ID = "553356311";
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    try {
      await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message })
      });
    
      form.reset();
    } finally {
      // Показ модального окна
        const modal = document.getElementById('successModal');
        const closeBtn = modal.querySelector('.modal-close');

        modal.style.display = 'block';

        // Закрытие по клику на крестик
        closeBtn.onclick = () => {
          modal.style.display = 'none';
        };

        // Закрытие по клику вне окна
        window.onclick = (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        };
              
      submitBtn.disabled = false;
      submitBtn.textContent = 'УЧАСТВОВАТЬ';
    }    
    
  });
});  