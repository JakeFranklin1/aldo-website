// Header scroll effect
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    const scrollThreshold = 100; // Adjust this value as needed

    // Function to check scroll position and update header
    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // Check on scroll
    window.addEventListener("scroll", checkScroll);

    // Check on page load (in case page refreshes while scrolled)
    checkScroll();
});
