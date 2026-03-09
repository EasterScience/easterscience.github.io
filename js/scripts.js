window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Enhance portfolio modals — inject project image and convert tech text to badges
window.addEventListener('DOMContentLoaded', function () {

    // Map modal IDs to their SVG images
    var modalImageMap = {
        'portfolioModal1': 'assets/img/portfolio/item1.svg',
        'portfolioModal2': 'assets/img/portfolio/item2.svg',
        'portfolioModal3': 'assets/img/portfolio/item3.svg',
        'portfolioModal4': 'assets/img/portfolio/item4.svg',
        'portfolioModal5': 'assets/img/portfolio/item5.svg',
        'portfolioModal6': 'assets/img/portfolio/item6.svg',
        'portfolioModal7': 'assets/img/portfolio/item7.svg',
        'portfolioModal8': 'assets/img/portfolio/music.svg',
        'portfolioModal9': 'assets/img/portfolio/item9.svg',
        'portfolioModal10': 'assets/img/portfolio/item10.svg',
        'portfolioModal11': 'assets/img/portfolio/item11.svg',
        'portfolioModal12': 'assets/img/portfolio/item12.svg',
        'portfolioModal13': 'assets/img/portfolio/item13.svg',
        'portfolioModal14': 'assets/img/portfolio/item14.svg',
        'portfolioModal15': 'assets/img/portfolio/item15.svg',
        'portfolioModal16': 'assets/img/portfolio/item16.svg',
        'portfolioModal17': 'assets/img/portfolio/item17.svg'
    };

    document.querySelectorAll('.portfolio-modal').forEach(function (modal) {
        var id = modal.id;
        var body = modal.querySelector('.modal-body');
        if (!body) return;

        // Remove text-secondary from title so CSS override applies
        var title = body.querySelector('.portfolio-modal-title');
        if (title) {
            title.classList.remove('text-secondary');
        }

        // Inject project image if not already present
        if (modalImageMap[id] && !body.querySelector('.modal-project-img')) {
            var divider = body.querySelector('.divider-custom');
            if (divider) {
                var img = document.createElement('img');
                img.className = 'modal-project-img';
                img.src = modalImageMap[id];
                img.alt = title ? title.textContent.trim() : 'Project';
                divider.parentNode.insertBefore(img, divider.nextSibling);
            }
        }

        // Convert "Technologies used:" text into badges
        var allText = body.querySelectorAll('p, strong');
        allText.forEach(function (el) {
            if (el.tagName === 'STRONG' && el.textContent.trim().toLowerCase().startsWith('technologies')) {
                var parent = el.parentElement;
                if (!parent || parent.querySelector('.tech-badges')) return;

                // Extract tech text after the strong tag
                var fullText = parent.innerHTML;
                var techMatch = fullText.match(/Technologies used:\s*<\/strong>\s*(.+?)(<br|<\/p|$)/i);
                if (techMatch) {
                    var techs = techMatch[1].replace(/<[^>]+>/g, '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
                    if (techs.length > 0) {
                        var badgesDiv = document.createElement('div');
                        badgesDiv.className = 'tech-badges';
                        techs.forEach(function (tech) {
                            var badge = document.createElement('span');
                            badge.className = 'tech-badge';
                            badge.textContent = tech;
                            badgesDiv.appendChild(badge);
                        });

                        // Remove the "Technologies used:" line and insert badges
                        parent.innerHTML = fullText.replace(/\s*<strong>Technologies used:\s*<\/strong>\s*[^<]*/i, '');
                        parent.parentNode.insertBefore(badgesDiv, parent.nextSibling);
                    }
                }
            }
        });
    });
});


// Skills section — no animation needed for chip layout


// Portfolio filter functionality
(function () {
    document.querySelectorAll('.portfolio-filter').forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active button
            document.querySelectorAll('.portfolio-filter').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.portfolio-card').forEach(function (card) {
                var categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.indexOf(filter) !== -1) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();
