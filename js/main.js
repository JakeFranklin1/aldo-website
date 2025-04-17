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
});
