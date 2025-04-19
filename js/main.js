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
        const statElements = document.querySelectorAll('#why-choose-us .stat-number-wcu');

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

    const backToTopButton = document.getElementById('back-to-top');
    const heroSection = document.getElementById('hero');

    function toggleBackToTopButton() {
        // Get the height of the hero section
        const heroHeight = heroSection.offsetHeight;

        // Check if we've scrolled past the hero section
        if (window.scrollY > heroHeight) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Check on initial load
    toggleBackToTopButton();

    // Listen for scroll events
    window.addEventListener('scroll', toggleBackToTopButton);

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Industry cards flip effect
    const industryCards = document.querySelectorAll('.industry-card');
    const cardCtaButtons = document.querySelectorAll('.card-cta');
    const backToFrontButtons = document.querySelectorAll('.back-to-front');

    // Debug log to check if elements are found
    console.log('Found ' + cardCtaButtons.length + ' CTA buttons');
    console.log('Found ' + backToFrontButtons.length + ' back buttons');

    cardCtaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior if button is a link
            e.stopPropagation();
            const card = this.closest('.industry-card');
            card.classList.add('flipped');
            console.log('Card flipped to back');

            // Force a reflow to ensure the transition takes effect
            void card.offsetWidth;
        });
    });

    backToFrontButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation();
            const card = this.closest('.industry-card');
            card.classList.remove('flipped');
            console.log('Card flipped to front');

            // Force a reflow to ensure the transition takes effect
            void card.offsetWidth;
        });
    });

    // Industry filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            industryCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-industry') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate circular progress charts
    function animateCharts() {
        const charts = document.querySelectorAll('.metric-chart');

        charts.forEach(chart => {
            const circle = chart.querySelector('.circle');
            const percentage = chart.getAttribute('data-percentage');

            if (circle) {
                setTimeout(() => {
                    circle.style.strokeDasharray = `${percentage}, 100`;
                }, 300);
            }
        });
    }

    // Network globe visualization
    function createNetworkVisualization() {
        const networkViz = document.querySelector('.network-visualization');
        if (!networkViz) return;

        const numNodes = 30;
        const numConnections = 40;

        // Create nodes
        for (let i = 0; i < numNodes; i++) {
            const node = document.createElement('div');
            node.classList.add('network-node');
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animationDelay = `${Math.random() * 5}s`;
            networkViz.appendChild(node);
        }

        // Create connections
        for (let i = 0; i < numConnections; i++) {
            const connection = document.createElement('div');
            connection.classList.add('network-connection');

            // Random position and size
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = Math.random() * 100;
            const y2 = Math.random() * 100;

            connection.style.left = `${x1}%`;
            connection.style.top = `${y1}%`;
            connection.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
            connection.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
            connection.style.animationDelay = `${Math.random() * 5}s`;

            networkViz.appendChild(connection);
        }
    }

    // Network stats animation
    function animateNetworkStats() {
        const statElements = document.querySelectorAll('.network-stat .stat-number');

        statElements.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // 2 seconds

            // Different approach for larger numbers
            if (target > 10000) {
                const increment = target / (duration / 30);

                const counter = setInterval(() => {
                    count += increment;

                    if (count >= target) {
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

                    if (count >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(count);
                    }
                }, 16);
            }
        });
    }

    function initializeIndustriesSection() {
        // Check if section is in viewport
        const industriesSection = document.getElementById('industries');
        if (!industriesSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCharts();
                    animateNetworkStats();
                    createNetworkVisualization();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(industriesSection);
    }

    initializeIndustriesSection();
    // Check for elements to reveal on initial load and scroll
    checkReveal();
    window.addEventListener('scroll', checkReveal);
});
