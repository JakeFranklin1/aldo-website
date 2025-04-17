document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    const body = document.body;
    const scrollThreshold = 100;

    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.createElement("div");
    mobileMenuToggle.className = "mobile-menu-toggle";
    mobileMenuToggle.innerHTML = "<span></span><span></span><span></span>";
    header.querySelector(".header-container").appendChild(mobileMenuToggle);

    mobileMenuToggle.addEventListener("click", function() {
        // If menu is already open, add the fade out animation
        if (header.classList.contains("mobile-menu-open")) {
            const navUl = document.querySelector("nav ul");
            navUl.classList.add("closing");

            // Wait for animation to complete before hiding menu
            setTimeout(function() {
                header.classList.remove("mobile-menu-open");
                body.classList.remove("menu-open");
                navUl.classList.remove("closing");
            }, 300); // Same duration as the animation
        } else {
            // Open the menu
            header.classList.add("mobile-menu-open");
            body.classList.add("menu-open");
        }
    });

    // Close menu when clicking links with fade out animation
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            const navUl = document.querySelector("nav ul");
            navUl.classList.add("closing");

            setTimeout(function() {
                header.classList.remove("mobile-menu-open");
                body.classList.remove("menu-open");
                navUl.classList.remove("closing");
            }, 300); // Same duration as the animation
        });
    });

    // Scroll reveal function
    const revealElements = document.querySelectorAll('.reveal-element');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    let whyChooseStatsAnimated = false;

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if(elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');

                // If this is the stats section in About and hasn't been animated yet
                if(element.parentElement.classList.contains('stats-container') && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }

                // If this is the why choose us section and hasn't been animated yet
                if(element.closest('#why-choose-us') && !whyChooseStatsAnimated) {
                    animateWhyChooseStats();
                    whyChooseStatsAnimated = true;
                }
            }
        });
    }

    // Animate the statistics counters
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 16ms is roughly one frame at 60fps

            const counter = setInterval(() => {
                count += increment;

                if(count >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(count);
                }
            }, 16);
        });
    }

    // Animate the Why Choose Us statistics
    function animateWhyChooseStats() {
        const statElements = document.querySelectorAll('#why-choose-us .stat-number');

        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // 2 seconds

            // For the large number (1,750,000), use a different approach
            if(target > 10000) {
                const increment = target / (duration / 30); // Fewer steps for large numbers

                const counter = setInterval(() => {
                    count += increment;

                    if(count >= target) {
                        // Format with commas for readability
                        stat.textContent = target.toLocaleString();
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(count).toLocaleString();
                    }
                }, 30);
            } else {
                const increment = target / (duration / 16);

                const counter = setInterval(() => {
                    count += increment;

                    if(count >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(count);
                    }
                }, 16);
            }
        });
    }

    // Check for elements to reveal on initial load and scroll
    checkReveal();
    window.addEventListener('scroll', checkReveal);
});
