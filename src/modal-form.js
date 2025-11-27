(function() {
  const formSimple = `
    <div class="form-modal-bg" id="formModalBg">
      <div class="form-modal">
        <button class="form-modal-close" id="formModalClose" aria-label="Закрити">&times;</button>
        <h2 class="form-modal-title">Записатися</h2>
        <form class="form-modal-form">
          <input type="text" name="name" placeholder="Ім'я" required autocomplete="off">
          <input type="tel" name="phone" placeholder="Телефон" required autocomplete="off">
          <button type="submit" class="form-modal-submit">Надіслати</button>
        </form>
        <div class="form-modal-note">Натискаючи кнопку, ви даєте згоду на обробку персональних даних</div>
      </div>
    </div>
  `;

  const formAbonement = `
    <div class="form-modal-bg" id="formModalBg">
      <div class="form-modal">
        <button class="form-modal-close" id="formModalClose" aria-label="Закрити">&times;</button>
        <h2 class="form-modal-title">Записатися</h2>
        <form class="form-modal-form">
          <input type="text" name="name" placeholder="Ім'я" required autocomplete="off">
          <input type="tel" name="phone" placeholder="Телефон" required autocomplete="off">
          <select name="abonement" required>
            <option value="" disabled selected>Оберіть абонемент</option>
            <option value="1 місяць ранковий">1 місяць ранковий</option>
            <option value="1 місяць">1 місяць</option>
            <option value="3 місяці">3 місяці</option>
            <option value="5 місяців">5 місяців</option>
            <option value="10 місяців">10 місяців</option>
          </select>
          <button type="submit" class="form-modal-submit">Надіслати</button>
        </form>
        <div class="form-modal-note">Натискаючи кнопку, ви даєте згоду на обробку персональних даних</div>
      </div>
    </div>
  `;

  function showForm(type) {
    removeForm();
    const html = type === 'abonement' ? formAbonement : formSimple;
    document.body.insertAdjacentHTML('beforeend', html);
    document.body.style.overflow = 'hidden';

    const modalClose = document.getElementById('formModalClose');
    const modalBg = document.getElementById('formModalBg');
    if (modalClose) modalClose.onclick = removeForm;
    if (modalBg) modalBg.onclick = (e) => { if (e.target === modalBg) removeForm(); };

    const form = document.querySelector('.form-modal-form');
    if (!form) return;

    let errorBlock = form.querySelector('.form-modal-error');
    if (!errorBlock) {
      errorBlock = document.createElement('div');
      errorBlock.className = 'form-modal-error';
      errorBlock.style.color = '#ffe600';
      errorBlock.style.fontSize = '1rem';
      errorBlock.style.margin = '0 0 10px 0';
      form.insertBefore(errorBlock, form.firstChild);
    }

    form.onsubmit = async function(e) {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const abonementSelect = form.querySelector('select[name="abonement"]');

      let valid = true;
      let errors = [];

      if (!nameInput || !/^([А-Яа-яЁёЇїІіЄєҐґA-Za-z\s'-]{2,})$/.test(nameInput.value.trim())) {
        valid = false;
        errors.push("Введіть коректне ім'я (мінімум 2 літери)");
        if (nameInput) nameInput.style.boxShadow = '0 0 0 2px #ff3b3b';
      } else if (nameInput) nameInput.style.boxShadow = '';

      if (!phoneInput) valid = false;
      else {
        let phoneVal = phoneInput.value.replace(/\D/g, '');
        if (!/^\d{10,12}$/.test(phoneVal)) {
          valid = false;
          errors.push("Введіть коректний телефон (тільки цифри, мінімум 10)");
          phoneInput.style.boxShadow = '0 0 0 2px #ff3b3b';
        } else phoneInput.style.boxShadow = '';
      }

      if (abonementSelect && !abonementSelect.value) {
        valid = false;
        errors.push("Оберіть абонемент");
        abonementSelect.style.boxShadow = '0 0 0 2px #ff3b3b';
      } else if (abonementSelect) abonementSelect.style.boxShadow = '';

      if (!valid) {
        errorBlock.innerHTML = errors.join('<br>');
        return;
      } else {
        errorBlock.innerHTML = '';
      }

      const payload = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        type: type === 'abonement' ? 'Абонемент' : 'Контакт',
        abonement: abonementSelect ? abonementSelect.value : undefined
      };

 

      try {
        const res = await fetch("https://withered-king-8f59.123ctakan123.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          alert("Дякуємо за заявку!");
          removeForm();
        } else {
          alert("Помилка при відправці форми");
        }
      } catch (err) {
        alert("Помилка мережі: " + err.message);
      }
    };
  }

  // Gift training форма
  const giftForm = document.querySelector('.gift-training-form');
  if (giftForm) {
    let errorDiv = giftForm.querySelector('.gift-form-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'gift-form-error';
      errorDiv.style.color = '#ffe600';
      errorDiv.style.margin = '10px 0';
      giftForm.insertBefore(errorDiv, giftForm.firstChild);
    }

    giftForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = giftForm.querySelector('input[placeholder*="Ім’я"]');
      const phoneInput = giftForm.querySelector('input[placeholder*="+38"]');

      let valid = true;
      let errors = [];

      if (!nameInput || !/^([А-Яа-яЁёЇїІіЄєҐґA-Za-z\s'-]{2,})$/.test(nameInput.value.trim())) {
        valid = false;
        errors.push("Введіть коректне ім'я (мінімум 2 літери)");
        if (nameInput) nameInput.style.boxShadow = '0 0 0 2px #ff3b3b';
      } else if (nameInput) nameInput.style.boxShadow = '';

      if (!phoneInput) valid = false;
      else {
        const phoneVal = phoneInput.value.replace(/\D/g, '');
        if (!/^\d{10,12}$/.test(phoneVal)) {
          valid = false;
          errors.push("Введіть коректний телефон (тільки цифри, мінімум 10)");
          phoneInput.style.boxShadow = '0 0 0 2px #ff3b3b';
        } else phoneInput.style.boxShadow = '';
      }

      if (!valid) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = errors.join(', ');
        return;
      } else {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
      }

      const payload = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        type: 'Подарункова'
      };



      try {
        const res = await fetch("https://withered-king-8f59.123ctakan123.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const btn = giftForm.querySelector('button[type="submit"]');
          const oldText = btn.innerHTML;
          btn.innerHTML = 'Дякуємо! Заявку надіслано';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = oldText;
            btn.disabled = false;
          }, 2500);
          giftForm.reset();
        } else {
          alert("Помилка при відправці форми");
        }
      } catch (err) {
        alert("Помилка мережі: " + err.message);
      }
    });
  }

  function removeForm() {
    const modal = document.getElementById('formModalBg');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }

  window.showSignupForm = () => showForm('simple');
  window.showAbonementForm = () => showForm('abonement');

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footer-btn, .trainer-signup-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.preventDefault(); window.showSignupForm(); });
    });
    document.querySelectorAll('.abonement-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.preventDefault(); window.showAbonementForm(); });
    });
  });
})();
