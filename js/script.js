document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.getElementById('modeToggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    // Function to update header image visibility based on current display mode of site
    function updateHeaderImage() {
        const isDarkMode = !body.classList.contains('light-mode');
        document.querySelectorAll('.dark-mode-img, .light-mode-img').forEach(img => {
            img.style.display = img.classList.contains(isDarkMode ? 'dark-mode-img' : 'light-mode-img') ? 'block' : 'none';
        });
    }

    // Update mode toggle icon to reflect current mode state
    function updateToggleIcon() {
        modeToggle.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';
    }

    // Toggle between light and dark mode, update UI, and persist user preference
    function toggleMode() {
        body.classList.toggle('light-mode');
        const currentMode = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
        localStorage.setItem('mode', currentMode);
        updateToggleIcon();
        updateHeaderImage();
        updateColors();
        document.documentElement.setAttribute('data-theme', currentMode);
    }

    // Update colors based on current mode
    function updateColors() {
        const isDarkMode = !body.classList.contains('light-mode');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark-mode' : 'light-mode');
    }

    // Initialize mode based on user's previous preference
    const savedMode = localStorage.getItem('mode') || 'dark-mode';
    if (savedMode === 'light-mode') {
        body.classList.add('light-mode');
    }
    updateToggleIcon();
    updateHeaderImage();
    updateColors();

    // Event listener for mode toggle
    modeToggle.addEventListener('click', toggleMode);

    // Add click event listeners to project elements for opening project files
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('click', () => {
            const projectFile = project.getAttribute('data-project');
            if (projectFile) window.open(projectFile, '_blank');
        });
    });

    // GSAP animation for header text
    gsap.timeline().to(".animated-text span", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2
    });

    // Toggle mobile menu visibility
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => navList.classList.toggle('active'));
    }

    // Implement tab functionality on about page
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            contents.forEach(content => {
                content.classList.toggle('active', content.id === target);
            });
        });
    });

    // Highlight active timeline phase on scroll (optional enhancement)
    const timelineItems = document.querySelectorAll('.timeline-item');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isInView = rect.top + window.scrollY <= scrollPosition && rect.bottom + window.scrollY >= scrollPosition;
            item.classList.toggle('active-phase', isInView);
        });
    });

    // Initial call to ensure correct header image on page load
    updateHeaderImage();
});
