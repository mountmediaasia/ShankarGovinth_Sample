const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', () => { const isOpen = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!isOpen)); menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation'); navigation.classList.toggle('open', !isOpen); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  enquiryForm.querySelector('fieldset').disabled = false;
  enquiryForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const submitButton = enquiryForm.querySelector('button[type="submit"]');
    if (submitButton.disabled) return;
    const status = document.querySelector('#form-status');
    const values = new FormData(enquiryForm);
    const payload = { name: String(values.get('name')).trim(), email: String(values.get('email')).trim(), phone_number: String(values.get('phone')).trim(), message: String(values.get('message')).trim(), source: new URLSearchParams(location.search).get('s') };
    if (!payload.name || !payload.email || !payload.phone_number || !payload.message) { status.className = 'form-status error'; status.textContent = 'Please complete all required fields.'; status.focus(); return; }
    status.className = 'form-status'; status.textContent = 'Sending your enquiry…';
    submitButton.disabled = true; submitButton.textContent = 'Sending…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://w62tth47mc.execute-api.ap-southeast-1.amazonaws.com/prod/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
      if (!response.ok) throw new Error('Unable to send enquiry');
      const text = await response.text();
      if (text) { let result; try { result = JSON.parse(text); } catch {} if (result && (result.success === false || result.error || Number(result.statusCode) >= 400)) throw new Error('Enquiry not accepted'); }
      status.className = 'form-status success'; status.textContent = 'Thank you. Your enquiry has been sent. Our team will be in touch.';
      enquiryForm.reset();
    } catch (error) {
      status.className = 'form-status error'; status.textContent = 'We could not confirm that your enquiry was sent. Please email office@shankargovinth.com or call 03 6420 2928.';
    } finally {
      clearTimeout(timeout); submitButton.disabled = false; submitButton.textContent = 'Send enquiry'; status.focus();
    }
  });
}
