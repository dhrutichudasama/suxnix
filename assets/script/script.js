document.addEventListener("componentsLoaded", () => {
    
    // Search model open and close
    const searchBtn = document.getElementById("searchBtn");
    const modal = document.getElementById("searchModal");
    const box = document.getElementById("searchBox");

    if (searchBtn && modal && box) {
        // Open modal
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.remove("opacity-0", "invisible");
            modal.classList.add("opacity-100", "visible");
            box.style.top = "0";
        });

        // Close on outside click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.add("opacity-0", "invisible");
            modal.classList.remove("opacity-100", "visible");
            box.style.top = "-100%";
        }
    }

    // sidebar & dropdown logic
    const menuBtn = document.getElementById("menuBtn");
    const overlay = document.getElementById("drawerOverlay");
    const drawer = document.getElementById("drawer");
    const closeDrawerBtn = document.getElementById("closeDrawer");
    const appDropdown = document.getElementById("appDropdown");

    function toggleDropdown() {
        if (!appDropdown) return;
        const isVisible = appDropdown.classList.contains("opacity-100");
        if (isVisible) {
            closeDropdown();
        } else {
            appDropdown.classList.remove("opacity-0", "invisible", "translate-y-2");
            appDropdown.classList.add("opacity-100", "visible", "translate-y-0");
        }
    }

    function closeDropdown() {
        if (!appDropdown) return;
        appDropdown.classList.add("opacity-0", "invisible", "translate-y-2");
        appDropdown.classList.remove("opacity-100", "visible", "translate-y-0");
    }

    function openDrawer() {
        if (!overlay || !drawer) return;
        overlay.classList.remove("opacity-0", "invisible");
        overlay.classList.add("opacity-100", "visible");
        drawer.style.right = "0";
        document.body.style.overflow = "hidden"; // Prevent scroll
    }

    function closeDrawer() {
        if (!overlay || !drawer) return;
        overlay.classList.add("opacity-0", "invisible");
        overlay.classList.remove("opacity-100", "visible");
        drawer.style.right = "-100%";
        document.body.style.overflow = ""; // Restore scroll
    }

    if (menuBtn) {
        // Toggle based on screen size
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (window.innerWidth > 1020) {
                // Desktop: Toggle Dropdown
                toggleDropdown();
            } else {
                // Mobile: Open Sidebar
                openDrawer();
            }
        });
    }

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener("click", closeDrawer);
    }

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeDrawer();
        });
    }

    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
        if (appDropdown && menuBtn) {
            if (!appDropdown.contains(e.target) && e.target !== menuBtn) {
                closeDropdown();
            }
        }
    });

    /**
     * PRODUCT SLIDER LOGIC
     */
    const sliderTrack = document.getElementById('sliderTrack');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    const dots = document.querySelectorAll('.dot');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const sliderWindow = document.getElementById('sliderWindow');

    if (sliderTrack && slides.length > 0 && sliderWindow) {
        let currentIndex = 0;
        let isAnimating = false;
        const realSlideCount = slides.length; // 4

        // Initial setup: clone for infinite effect
        const clonesBefore = slides.slice(-3).map(s => s.cloneNode(true));
        const clonesAfter = slides.slice(0, 3).map(s => s.cloneNode(true));

        clonesBefore.reverse().forEach(clone => sliderTrack.prepend(clone));
        clonesAfter.forEach(clone => sliderTrack.append(clone));

        const offsetCount = 3; // Number of clones at the start
        let currentPosition = offsetCount;

        function getVisibleSlides() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateSlider(transition = true) {
            const visibleSlides = getVisibleSlides();
            const slideWidth = sliderWindow.offsetWidth / visibleSlides;

            // Set each slide width dynamically
            document.querySelectorAll('.slide').forEach(slide => {
                slide.style.width = `${slideWidth}px`;
            });

            if (transition) {
                sliderTrack.style.transition = 'transform 0.6s ease';
            } else {
                sliderTrack.style.transition = 'none';
            }

            sliderTrack.style.transform = `translateX(-${currentPosition * slideWidth}px)`;

            // Active dots
            const activeIndex = (currentPosition - offsetCount + realSlideCount) % realSlideCount;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIndex);
            });
        }

        function moveNext() {
            if (isAnimating) return;
            isAnimating = true;
            currentPosition++;
            updateSlider();

            sliderTrack.addEventListener('transitionend', () => {
                if (currentPosition >= offsetCount + realSlideCount) {
                    currentPosition = offsetCount;
                    updateSlider(false);
                }
                isAnimating = false;
            }, { once: true });
        }

        function movePrev() {
            if (isAnimating) return;
            isAnimating = true;
            currentPosition--;
            updateSlider();

            sliderTrack.addEventListener('transitionend', () => {
                if (currentPosition < offsetCount) {
                    currentPosition = offsetCount + realSlideCount - 1;
                    updateSlider(false);
                }
                isAnimating = false;
            }, { once: true });
        }

        if (nextBtn) nextBtn.addEventListener('click', moveNext);
        if (prevBtn) prevBtn.addEventListener('click', movePrev);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                if (isAnimating) return;
                const index = parseInt(dot.getAttribute('data-index'));
                currentPosition = offsetCount + index;
                updateSlider();
            });
        });

        window.addEventListener('resize', () => updateSlider(false));

        // Initialize
        updateSlider(false);
    }

    // video section 
    const playBtn = document.getElementById('playBtn');
    const videoModal = document.getElementById('videoModal');
    const closevideoModal = document.getElementById('closevideoModal');
    const videoFrame = document.getElementById('videoFrame');

    if (playBtn && videoModal && videoFrame) {
        playBtn.addEventListener('click', () => {
            videoModal.classList.remove('hidden');
            videoModal.classList.add('flex');
            // autoplay video
            videoFrame.src = "https://www.youtube.com/embed/HQfF5XRVXjU?autoplay=1";
        });
    }

    if (closevideoModal && videoModal && videoFrame) {
        closevideoModal.addEventListener('click', () => {
            videoModal.classList.add('hidden');
            videoModal.classList.remove('flex');
            // stop video
            videoFrame.src = "";
        });
    }

    if (videoModal && videoFrame) {
        // click outside to close
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.add('hidden');
                videoModal.classList.remove('flex');
                videoFrame.src = "";
            }
        });
    }

    // counter section 
    const counters = document.querySelectorAll('.counter');
    const counterSection = document.querySelector('.counter-section');

    if (counters.length > 0 && counterSection) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach((counter) => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 1500; // 1.5s to match CSS transition
                        let startTime = null;

                        const update = (currentTime) => {
                            if (!startTime) startTime = currentTime;
                            // Calculate progress between 0 and 1
                            const progress = Math.min((currentTime - startTime) / duration, 1);
                            
                            // Use an ease-out timing function for smoother appearance
                            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                            const currentCount = Math.floor(easeOutProgress * target);

                            counter.innerText = currentCount + "%";

                            if (progress < 1) {
                                requestAnimationFrame(update);
                            } else {
                                counter.innerText = target + "%";
                            }
                        };

                        requestAnimationFrame(update);

                        // Circle animation
                        const circle = counter.parentElement.querySelector('.progress');
                        if (circle) {
                            const offset = 220 - (220 * target) / 100;
                            circle.style.strokeDashoffset = offset;
                        }
                    });

                    obs.unobserve(entry.target); // run only once
                }
            });
        }, { threshold: 0.4 });

        observer.observe(counterSection);
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove("opacity-0", "invisible");
                backToTopBtn.classList.add("opacity-100", "visible");
            } else {
                backToTopBtn.classList.add("opacity-0", "invisible");
                backToTopBtn.classList.remove("opacity-100", "visible");
            }
        });

        // Smooth scroll when clicked
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /**
     * TESTIMONIAL SLIDER LOGIC
     */
    const testiTrack = document.getElementById('testiTrack');
    const prevTesti = document.getElementById('prevTesti');
    const nextTesti = document.getElementById('nextTesti');
    const testiDots = document.querySelectorAll('.testi-dot');
    const testiSlides = Array.from(document.querySelectorAll('.testi-slide'));

    if (testiTrack && testiSlides.length > 0) {
        let tIndex = 0;
        const tCount = testiSlides.length;
        let tInterval;

        function updateTesti() {
            // Move track
            testiTrack.style.transform = `translateX(-${tIndex * 100}%)`;
            
            // Update dots
            testiDots.forEach((dot, i) => {
                if (i === tIndex) {
                    dot.classList.add('w-8', 'bg-[#0E9D4D]');
                    dot.classList.remove('w-3', 'bg-white/40');
                } else {
                    dot.classList.add('w-3', 'bg-white/40');
                    dot.classList.remove('w-8', 'bg-[#0E9D4D]');
                }
            });

            // Add subtle scale to active slide text
            testiSlides.forEach((slide, i) => {
                const content = slide.querySelector('.testi-content');
                if (content) {
                    if (i === tIndex) {
                        content.style.opacity = '1';
                        content.style.transform = 'scale(1)';
                    } else {
                        content.style.opacity = '0.5';
                        content.style.transform = 'scale(0.95)';
                    }
                    content.style.transition = 'all 0.5s ease';
                }
            });
        }

        function nextT() {
            tIndex = (tIndex + 1) % tCount;
            updateTesti();
        }

        function prevT() {
            tIndex = (tIndex - 1 + tCount) % tCount;
            updateTesti();
        }

        if (nextTesti) {
            nextTesti.addEventListener('click', () => {
                nextT();
                resetPlay();
            });
        }

        if (prevTesti) {
            prevTesti.addEventListener('click', () => {
                prevT();
                resetPlay();
            });
        }

        testiDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                tIndex = parseInt(e.target.getAttribute('data-idx'));
                updateTesti();
                resetPlay();
            });
        });

        // Autoplay
        function startPlay() {
            tInterval = setInterval(nextT, 4000);
        }

        function resetPlay() {
            clearInterval(tInterval);
            startPlay();
        }

        // Pause on hover
        const testiSection = document.querySelector('.testimonial-section');
        if (testiSection) {
            testiSection.addEventListener('mouseenter', () => clearInterval(tInterval));
            testiSection.addEventListener('mouseleave', startPlay);
        }

        // Initial setup
        updateTesti();
        startPlay();
    }

    /**
     * FAQ ACCORDION LOGIC
     */
    const faqBtns = document.querySelectorAll('.faq-btn');
    if (faqBtns.length > 0) {
        faqBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                if (item) {
                    const isActive = item.classList.contains('active');
                    
                    // Close all
                    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                    
                    // If it wasn't active initially, open it
                    if (!isActive) {
                        item.classList.add('active');
                    }
                }
            });
        });
    }

    /**
     * MOBILE SIDEBAR DROPDOWN LOGIC
     */
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    if (mobileDropdowns.length > 0) {
        mobileDropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('button');
            const content = dropdown.querySelector('.dropdown-content');
            const icon = dropdown.querySelector('i');
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const isOpen = content.classList.contains('opacity-100');
                
                // Close all others (Accordion effect)
                mobileDropdowns.forEach(other => {
                    const otherContent = other.querySelector('.dropdown-content');
                    const otherIcon = other.querySelector('i');
                    if (otherContent !== content) {
                        otherContent.style.maxHeight = '0px';
                        otherContent.classList.remove('opacity-100', 'mt-2', 'mb-2');
                        otherContent.classList.add('opacity-0');
                        if (otherIcon) otherIcon.classList.remove('rotate-180');
                    }
                });
                
                // Toggle current
                if (isOpen) {
                    content.style.maxHeight = '0px';
                    content.classList.remove('opacity-100', 'mt-2', 'mb-2');
                    content.classList.add('opacity-0');
                    if (icon) icon.classList.remove('rotate-180');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.classList.add('opacity-100', 'mt-2', 'mb-2');
                    content.classList.remove('opacity-0');
                    if (icon) icon.classList.add('rotate-180');
                }
            });
        });
    }

    /**
     * SMOOTH SCROLLING FOR REDIRECTS AND ON-PAGE HASHES WITH HEADER OFFSET
     */
    const headerOffset = 100; // Account for fixed header height

    function scrollToTarget(target) {
        if (!target) return;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    // 1. Smooth scroll on Load (if coming from another page with hash)
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                scrollToTarget(targetElement);
            }, 100);
            
            // Fallback for slower rendering
            setTimeout(() => {
                scrollToTarget(targetElement);
            }, 500);
        }
    }

    // 2. Smooth scrolling for Navigation Links (when clicked on the same page)
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            try {
                const linkUrl = new URL(this.href, window.location.href);
                
                // Only hijack the click if it's pointing to the current page
                if (linkUrl.pathname === window.location.pathname && linkUrl.hash) {
                    const targetElement = document.querySelector(linkUrl.hash);
                    if (targetElement) {
                        e.preventDefault();
                        scrollToTarget(targetElement);
                        history.pushState(null, null, linkUrl.hash); // Update URL safely
                    }
                }
            } catch (err) {
                // Ignore parsing errors for empty or invalid hashes
            }
        });
    });

});
// for scroll
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header"); // your fixed header

    function getHeaderHeight() {
        return header ? header.offsetHeight : 0;
    }

    function smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;

        const offset = getHeaderHeight();
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    // ✅ Click handling (same page smooth scroll)
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // only handle if same page
            if (href.includes("#") && (href.startsWith("#") || href.includes("index.html"))) {
                const id = "#" + href.split("#")[1];

                // agar already index page pe ho
                if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
                    e.preventDefault();
                    smoothScrollTo(id);
                }
            }
        });
    });

    // ✅ Page load pe smooth scroll (jab dusre page se aaye ho)
    if (window.location.hash) {
        setTimeout(() => {
            smoothScrollTo(window.location.hash);
        }, 200); // slight delay for DOM load
    }

});

// footer
    const slider = document.getElementById("instaSlider");
    const items = slider.children;
    let index = 0;

    const itemWidth = items[0].offsetWidth;

    function slideNext() {
        index++;

        if (index >= items.length) {
            index = 0;
        }

        slider.style.transform = `translateX(-${index * itemWidth}px)`;
        slider.style.transition = "transform 0.6s ease-in-out";
    }

    // Auto slide every 3 seconds
    setInterval(slideNext, 3000);