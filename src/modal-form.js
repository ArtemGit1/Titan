
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
    document.body.insertAdjacentHTML('beforeend', type === 'abonement' ? formAbonement : formSimple);
    document.body.style.overflow = 'hidden';
    document.getElementById('formModalClose').onclick = removeForm;
    document.getElementById('formModalBg').onclick = function(e) {
      if (e.target === this) removeForm();
    };
    const form = document.querySelector('.form-modal-form');
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const abonementSelect = form.querySelector('select[name="abonement"]');

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


  const fd = new FormData(form);
  const payload = Object.fromEntries(fd.entries());

  payload.type = type === 'abonement' ? 'abonement' : 'simple';

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
  function removeForm() {
    const modal = document.getElementById('formModalBg');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }


  window.showSignupForm = function() { showForm('simple'); };
  window.showAbonementForm = function() { showForm('abonement'); };


  document.addEventListener('DOMContentLoaded', function() {
 
    document.querySelectorAll('.footer-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.showSignupForm();
      });
    });

    document.querySelectorAll('.trainer-signup-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.showSignupForm();
      });
    });

    document.querySelectorAll('.abonement-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.showAbonementForm();
      });
    });
  });
})();
