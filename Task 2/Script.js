// Animate sections on scroll
const animatedSections = document.querySelectorAll('[class*="animate-"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100');
    }
  });
}, { threshold: 0.1 });

animatedSections.forEach(section => {
  section.classList.add('opacity-0');
  observer.observe(section);
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formFeedback.textContent = '';
    formFeedback.className = '';
    if (contactForm.checkValidity()) {
      formFeedback.textContent = 'Thank you for reaching out! (Demo only)';
      formFeedback.className = 'form-success';
      contactForm.reset();
    } else {
      formFeedback.textContent = 'Please fill out all fields correctly.';
      formFeedback.className = 'form-error';
    }
  });
}