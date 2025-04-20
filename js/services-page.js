document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ script loaded');

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found ' + faqItems.length + ' FAQ items');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');

        question.addEventListener('click', () => {
            console.log('FAQ item clicked');
            // Toggle active class on the current item
            item.classList.toggle('active');

            // Optional: close other FAQs when opening one
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
        });
    });
});
