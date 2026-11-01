document.addEventListener('DOMContentLoaded', () => {
  // Accessible responsive navigation for smaller screens.
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('primary-navigation');
  if (menuButton && navigation) {
    const closeMenu = () => { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.innerHTML = 'Menu <span aria-hidden="true">☰</span>'; };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
      menuButton.innerHTML = open ? 'Close <span aria-hidden="true">✕</span>' : 'Menu <span aria-hidden="true">☰</span>';
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
    window.addEventListener('resize', () => { if (window.innerWidth > 1000) closeMenu(); });
  }
  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  // Switch between the two required service-area map views. Coordinates are area references, not business addresses.
  const mapFrame = document.getElementById('service-area-map-frame');
  if (mapFrame) {
    const mapLocations = {
      central: { label: 'Pretoria Central', lat: '-25.745', lon: '28.207', bbox: '28.180,-25.765,28.235,-25.725', zoom: 14 },
      hatfield: { label: 'Hatfield', lat: '-25.747', lon: '28.239', bbox: '28.218,-25.762,28.260,-25.730', zoom: 14 }
    };
    const description = document.getElementById('map-location-description');
    const openMap = document.getElementById('open-service-area-map');
    document.querySelectorAll('[data-map-location]').forEach(button => button.addEventListener('click', () => {
      const place = mapLocations[button.dataset.mapLocation];
      if (!place) return;
      mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(place.bbox)}&layer=mapnik&marker=${place.lat}%2C${place.lon}`;
      mapFrame.title = `Interactive map of ${place.label}, Pretoria, South Africa`;
      description.textContent = `Showing the ${place.label} area.`;
      openMap.href = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=${place.zoom}/${place.lat}/${place.lon}`;
      document.querySelectorAll('[data-map-location]').forEach(item => {
        const active = item === button;
        item.setAttribute('aria-pressed', String(active));
        item.classList.toggle('button', active);
        item.classList.toggle('button-secondary', !active);
      });
    }));
  }

  const search = document.getElementById('service-search');
  if (search) {
    const cards = [...document.querySelectorAll('[data-service-card]')];
    const results = document.getElementById('service-results');
    const empty = document.getElementById('no-services');
    const filter = () => {
      const query = search.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach(card => {
        const text = (card.innerText + ' ' + (card.dataset.search || '')).toLowerCase();
        const match = !query || text.includes(query);
        card.hidden = !match;
        if (match) shown++;
      });
      results.textContent = query ? `${shown} service${shown === 1 ? '' : 's'} match “${search.value.trim()}”.` : 'Showing all services.';
      empty.hidden = shown !== 0;
    };
    search.addEventListener('input', filter);
    document.getElementById('clear-service-search')?.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
  }

  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const image = lightbox.querySelector('[data-lightbox-image]');
    const caption = lightbox.querySelector('[data-lightbox-caption]');
    const close = lightbox.querySelector('[data-lightbox-close]');
    let lastTrigger = null;
    const closeBox = () => { lightbox.hidden = true; image.src = ''; lastTrigger?.focus(); };
    document.querySelectorAll('[data-full-image]').forEach(button => button.addEventListener('click', () => {
      lastTrigger = button; image.src = button.dataset.fullImage; image.alt = button.querySelector('img')?.alt || '';
      caption.textContent = button.dataset.caption || ''; lightbox.hidden = false; close.focus();
    }));
    close.addEventListener('click', closeBox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeBox(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) closeBox(); });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('contact-form-status');
    contactForm.addEventListener('reset', () => { window.setTimeout(() => { status.hidden = true; status.textContent = ''; }, 0); });
    contactForm.addEventListener('submit', event => {
      event.preventDefault(); status.hidden = true;
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        status.textContent = 'Please complete the required fields and correct any invalid information.';
        status.classList.add('form-error'); status.hidden = false; return;
      }
      status.classList.remove('form-error');
      const data = new FormData(contactForm);
      const subject = `Website contact: ${data.get('contactSubject')}`;
      const body = [`Name: ${data.get('contactName')}`, `Email: ${data.get('contactEmail')}`, '', 'Message:', data.get('contactMessage')].join('\n');
      const mailto = `mailto:info@mashtechrepairs.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.replaceChildren();
      status.append(document.createTextNode('Your message passed validation. This static website cannot send or store it. '));
      const emailLink = document.createElement('a');
      emailLink.href = mailto; emailLink.textContent = 'Open the prepared email draft';
      status.append(emailLink, document.createTextNode('. Review the draft and press Send in your email application.'));
      status.hidden = false;
    });
  }

  const form = document.getElementById('repair-enquiry-form');
  if (form) {
    const problem = document.getElementById('problem');
    const count = document.getElementById('problem-count');
    const status = document.getElementById('form-status');
    const response = document.getElementById('enquiry-response');
    const params = new URLSearchParams(window.location.search);
    const device = params.get('device');
    if (device && document.getElementById('device-type')) document.getElementById('device-type').value = device;
    problem.addEventListener('input', () => { count.textContent = problem.value.length; });
    form.addEventListener('reset', () => { window.setTimeout(() => { count.textContent = '0'; status.hidden = true; status.textContent = ''; response.hidden = true; response.replaceChildren(); }, 0); });
    form.addEventListener('submit', event => {
      event.preventDefault();
      status.hidden = true;
      const phone = document.getElementById('phone');
      const digits = phone.value.replace(/\D/g, '');
      if (digits.length < 7) { phone.setCustomValidity('Please enter a phone number containing at least 7 digits.'); }
      else { phone.setCustomValidity(''); }
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Please check the highlighted fields and correct the information before continuing.';
        status.classList.add('form-error'); status.hidden = false; return;
      }
      status.classList.remove('form-error');
      const data = new FormData(form);
      const subject = `Repair enquiry: ${data.get('deviceType')} - ${data.get('deviceBrand')}`;
      const body = [
        'MashTech Repairs enquiry', '',
        `Name: ${data.get('fullName')}`,
        `Email: ${data.get('email')}`,
        `Phone: ${data.get('phone')}`,
        `Device type: ${data.get('deviceType')}`,
        `Brand/model: ${data.get('deviceBrand')}`,
        `Issue category: ${data.get('repairType')}`,
        `Preferred contact method: ${data.get('contactMethod')}`,
        '', 'Problem description:', data.get('problem')
      ].join('\n');
      const mailto = `mailto:info@mashtechrepairs.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.classList.remove('form-error');
      status.replaceChildren();
      status.append(document.createTextNode('Your details passed the form checks. The enquiry is ready to send, but this static website does not send or store it automatically. '));
      const emailLink = document.createElement('a');
      emailLink.href = mailto; emailLink.textContent = 'Open the prepared enquiry email';
      status.append(emailLink, document.createTextNode('. Review the details and press Send in your email application.'));
      status.hidden = false;
      response.replaceChildren();
      const heading = document.createElement('strong'); heading.textContent = 'What happens next';
      const explanation = document.createElement('p');
      explanation.textContent = `Your ${data.get('deviceType')} enquiry about “${data.get('repairType')}” is ready. A repair cost and appointment availability cannot be confirmed from this form alone; the device and reported issue would need to be reviewed first. The business would then confirm the assessment, any quote and available next steps. This demonstration does not make a booking or guarantee a repair price.`;
      response.append(heading, explanation); response.hidden = false;
    });
  }
});
