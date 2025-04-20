document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        // Success message after form submission
        if (window.location.search.includes('form=submitted')) {
            const formContainer = document.querySelector('.contact-form-container');
            const successMessage = document.createElement('div');
            successMessage.className = 'form-message success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';

            // Replace the form with success message
            if (formContainer) {
                const formHeader = formContainer.querySelector('.form-header');
                formContainer.innerHTML = '';
                formContainer.appendChild(formHeader);
                formContainer.appendChild(successMessage);
            }
        }

        // Form validation
        contactForm.addEventListener('submit', function(e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('invalid');
                } else {
                    field.classList.remove('invalid');
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('invalid');
                }
            }

            if (!isValid) {
                e.preventDefault();

                // Create or show error message
                let errorMessage = contactForm.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error-message';
                    errorMessage.textContent = 'Please fill in all required fields correctly.';
                    contactForm.appendChild(errorMessage);
                }

                errorMessage.style.display = 'block';

                // Scroll to the first invalid field
                const firstInvalid = contactForm.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });

        // Remove error indicators as the user types
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('invalid');

                const errorMessage = contactForm.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            });
        });
    }
});
