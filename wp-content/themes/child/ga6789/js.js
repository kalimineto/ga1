document.addEventListener('DOMContentLoaded', function () {
    function toggleFooter() {
        // const footerDesktop = document.getElementById('footer-desktop');
        // const footerDesktop = document.getElementById('footer');
        const footerMobile = document.getElementById('footer-mobile');
        const gameBar = document.querySelector('.game-bar');

        if (window.innerWidth > 767) {
            // if (footerDesktop) footerDesktop.style.display = 'block';
            if (footerMobile) footerMobile.style.display = 'none';
            if (gameBar) gameBar.style.marginBottom = '';
        } else {
            // if (footerDesktop) footerDesktop.style.display = 'none';
            if (footerMobile) footerMobile.style.display = 'block';
            // if (gameBar) gameBar.style.marginBottom = '50px';
        }
    }

    toggleFooter();
    window.addEventListener('resize', toggleFooter);

    function initCarousel() {
        const carousels = document.querySelectorAll('.carousel-ga6789');
        carousels.forEach(function (carousel) {
            const itemsToShow = parseInt(carousel.dataset.cgShow) || 5;
            const items = Array.from(carousel.children);

            // Reset styles
            carousel.style.overflowX = '';
            carousel.style.scrollBehavior = '';
            carousel.style.flexWrap = '';
            items.forEach(item => item.style.flex = '');

            // Remove nav buttons and wrapper
            const parent = carousel.parentElement;
            if (parent.classList.contains('carousel-container')) {
                // Remove existing nav buttons
                const prevBtn = parent.querySelector('.carousel-prev');
                const nextBtn = parent.querySelector('.carousel-next');
                if (prevBtn) prevBtn.remove();
                if (nextBtn) nextBtn.remove();

                // Unwrap container
                const grandParent = parent.parentElement;
                grandParent.insertBefore(carousel, parent);
                parent.remove();
            }

            if (window.innerWidth <= 767) {
                // Wrap carousel
                if (!carousel.parentElement.classList.contains('carousel-container')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'carousel-container position-relative';
                    wrapper.style.overflow = 'hidden';
                    carousel.parentElement.insertBefore(wrapper, carousel);
                    wrapper.appendChild(carousel);
                }

                // items.forEach(item => {
                //     item.style.flex = `0 0 ${100 / itemsToShow}%`;
                // });

                items.forEach(item => {
                    item.style.flex = `0 0 31.5%`;
                });

                carousel.style.overflowX = 'hidden';
                carousel.style.scrollBehavior = 'smooth';
                carousel.style.flexWrap = 'nowrap';

                const wrapper = carousel.parentElement;

                if (!wrapper.querySelector('.carousel-nav')) {
                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'carousel-nav carousel-prev position-absolute top-50 start-0 translate-middle-y btn btn-sm btn-secondary rounded-circle';
                    prevBtn.style.zIndex = 1;
                    prevBtn.style.left = '10px';
                    prevBtn.style.display = 'none';
                    prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i>`;

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'carousel-nav carousel-next position-absolute top-50 end-0 translate-middle-y btn btn-sm btn-secondary rounded-circle';
                    nextBtn.style.zIndex = 1;
                    nextBtn.style.right = '10px';
                    nextBtn.innerHTML = `<i class="fas fa-chevron-right"></i>`;

                    wrapper.insertBefore(prevBtn, wrapper.firstChild);
                    wrapper.appendChild(nextBtn);

                    // Scroll handling
                    function handleScroll(direction) {
                        const scrollAmount = carousel.offsetWidth;
                        const currentScroll = carousel.scrollLeft;
                        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

                        if (direction === 'next') {
                            carousel.scrollTo({
                                left: Math.min(currentScroll + scrollAmount, maxScroll),
                                behavior: 'smooth'
                            });
                        } else {
                            carousel.scrollTo({
                                left: Math.max(currentScroll - scrollAmount, 0),
                                behavior: 'smooth'
                            });
                        }
                    }

                    prevBtn.addEventListener('click', () => handleScroll('prev'));
                    nextBtn.addEventListener('click', () => handleScroll('next'));

                    carousel.addEventListener('scroll', function () {
                        const currentScroll = carousel.scrollLeft;
                        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
                        updateNavButtons(carousel, currentScroll, maxScroll);
                    });

                    // Init button visibility
                    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
                    updateNavButtons(carousel, carousel.scrollLeft, maxScroll);
                }
            }
        });
    }

    function updateNavButtons(carousel, currentScroll, maxScroll) {
        const wrapper = carousel.parentElement;
        const prevBtn = wrapper.querySelector('.carousel-prev');
        const nextBtn = wrapper.querySelector('.carousel-next');
        if (prevBtn) prevBtn.style.display = currentScroll > 0 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = currentScroll < maxScroll ? 'block' : 'none';
    }

    initCarousel();

    let carouselResizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(carouselResizeTimer);
        carouselResizeTimer = setTimeout(initCarousel, 200);
    });
});
