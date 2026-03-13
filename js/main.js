/* ========== Scroll Progress Bar & Scroll-to-Top ========== */
window.addEventListener('scroll', () => {
    const progress = document.getElementById('scroll-progress');
    if (progress) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progress.style.width = (scrollTop / scrollHeight * 100) + '%';
    }

    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

/* ========== Intersection Observer for fade-up ========== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /* ========== Animated Counters ========== */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const duration = 2000;
                const start = performance.now();
                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target) + '+';
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

    /* ========== Mobile Menu ========== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileClose = document.getElementById('mobile-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
        mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.remove('open'));
        });
    }

    /* ========== Project Filters ========== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            const grid = document.getElementById('project-grid');
            const moreBtn = document.getElementById('view-more-projects');

            // When filtering, expand to show all matches; when "All", collapse on mobile
            if (filter !== 'all' && grid) {
                grid.classList.add('expanded');
                if (moreBtn) { moreBtn.style.display = 'none'; }
            } else if (grid) {
                grid.classList.remove('expanded');
                if (moreBtn) { moreBtn.style.display = ''; moreBtn.classList.remove('expanded'); moreBtn.querySelector('span').textContent = 'View more projects'; }
            }

            projectCards.forEach(card => {
                const cat = card.dataset.category;
                if (filter === 'all' || cat === filter || cat.includes(filter)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ========== Audit Sub-tabs ========== */
    const subTabs = document.querySelectorAll('.sub-tab');
    const auditPanels = document.querySelectorAll('.audit-panel');

    function activateSubTab(tabId) {
        subTabs.forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tabId);
        });
        auditPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === tabId);
        });
    }

    subTabs.forEach(tab => {
        tab.addEventListener('click', () => activateSubTab(tab.dataset.tab));
    });

    /* ========== Nav Dropdown & Mobile Accordion Jump ========== */
    document.querySelectorAll('[data-jump]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.dataset.jump;
            activateSubTab(tabId);
            /* Close mobile menu if open */
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.remove('active');
            /* Scroll to Security section top with navbar offset */
            const section = document.getElementById('security');
            if (section) {
                const navHeight = document.querySelector('nav').offsetHeight || 70;
                const y = section.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                setTimeout(() => {
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 100);
            }
        });
    });

    /* Mobile Security accordion toggle */
    const mobileSecToggle = document.querySelector('.mobile-security-toggle');
    if (mobileSecToggle) {
        mobileSecToggle.addEventListener('click', () => {
            const sub = document.querySelector('.mobile-security-sub');
            const arrow = document.querySelector('.mobile-sec-arrow');
            sub.classList.toggle('hidden');
            arrow.style.transform = sub.classList.contains('hidden') ? '' : 'rotate(180deg)';
        });
    }

    /* ========== Research Tabs ========== */
    const researchTabs = document.querySelectorAll('.research-tab');
    const researchPanels = document.querySelectorAll('.research-panel');

    researchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            researchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.rtab;
            researchPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === target);
            });
        });
    });

    /* ========== Mobile View More (Projects) ========== */
    const viewMoreBtn = document.getElementById('view-more-projects');
    const projectGrid = document.getElementById('project-grid');
    if (viewMoreBtn && projectGrid) {
        viewMoreBtn.addEventListener('click', () => {
            const isExpanded = projectGrid.classList.toggle('expanded');
            viewMoreBtn.classList.toggle('expanded', isExpanded);
            viewMoreBtn.querySelector('span').textContent = isExpanded ? 'Show less' : 'View more projects';
        });
    }

    /* ========== Scroll to Top Button ========== */
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========== Smooth Scroll for nav links ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; /* skip empty anchors (dropdown items) */

            const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 70;

            /* Articles nav link: scroll to research section & switch to articles tab */
            if (href === '#articles-nav') {
                e.preventDefault();
                const researchSection = document.getElementById('research');
                if (researchSection) {
                    const y = researchSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                const articlesTab = document.querySelector('.research-tab[data-rtab="articles-panel"]');
                if (articlesTab) articlesTab.click();
                return;
            }
            /* Research nav link: scroll to research section & switch to talks tab */
            if (href === '#research') {
                e.preventDefault();
                const researchSection = document.getElementById('research');
                if (researchSection) {
                    const y = researchSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                const talksTab = document.querySelector('.research-tab[data-rtab="talks-panel"]');
                if (talksTab) talksTab.click();
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
