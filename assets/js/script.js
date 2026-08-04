// JK INTERIO - Interactive Web Application Engine

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    const boqDate = document.getElementById('boq-current-date');
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (boqDate) boqDate.textContent = todayStr;

    // 2. Navbar Scroll Glassmorphism Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    });

    // 4. Hero Slider Background & Typing Animation
    const heroSlides = document.querySelectorAll('#hero-slider .slide');
    const heroImgCards = document.querySelectorAll('.hero-img-card');
    let currentSlide = 0;

    function goToSlide(index) {
        if (heroSlides.length === 0) return;
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = index % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    if (heroSlides.length > 0) {
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    heroImgCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            goToSlide(idx);
        });
    });

    const typingElement = document.getElementById('typing-text');
    const phrases = [
        "Beautiful Living",
        "Luxury Kitchens",
        "Custom Wardrobes",
        "Bespoke Furniture",
        "Steel & Wood Elegance"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingElement) return;
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // 5. Scroll Triggered Statistics Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const statsSection = document.getElementById('hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // ms
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString('en-IN');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString('en-IN');
                    }
                }, stepTime);
            });
            statsAnimated = true;
        }
    }
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // 6. Services & Capabilities Category Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetElem = document.getElementById(targetTab);
            if (targetElem) targetElem.classList.add('active');
        });
    });

    // 7. Interactive 3D Room Visualizer Engine
    const visRoomSelect = document.getElementById('vis-room-select');
    const visFloorSelect = document.getElementById('vis-floor-select');
    const visBaseImg = document.getElementById('vis-base-img');
    const visCabinetOverlay = document.getElementById('vis-cabinet-overlay');
    const visWallOverlay = document.getElementById('vis-wall-overlay');
    const visSpecSummary = document.getElementById('vis-spec-summary');

    const roomImages = {
        kitchen: "assets/images/after_kitchen.png",
        living: "assets/images/after_living.png",
        bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
    };

    const beforeRoomImages = {
        kitchen: "assets/images/before_kitchen.png",
        living: "assets/images/before_living.png",
        bedroom: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80"
    };

    let selectedCabinetColor = "#1E2229";
    let selectedWallColor = "#F4F1EA";

    const baBeforeImgElem = document.getElementById('ba-before-img');

    if (visRoomSelect) {
        visRoomSelect.addEventListener('change', (e) => {
            const roomKey = e.target.value;
            if (roomImages[roomKey]) {
                visBaseImg.style.backgroundImage = `url('${roomImages[roomKey]}')`;
            }
            if (beforeRoomImages[roomKey] && baBeforeImgElem) {
                baBeforeImgElem.style.backgroundImage = `url('${beforeRoomImages[roomKey]}')`;
            }
            updateVisSummary();
        });
    }

    // Swatches
    document.querySelectorAll('#cabinet-swatches .swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            document.querySelectorAll('#cabinet-swatches .swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            selectedCabinetColor = swatch.getAttribute('data-color');
            visCabinetOverlay.style.backgroundColor = selectedCabinetColor;
            updateVisSummary();
        });
    });

    document.querySelectorAll('#wall-swatches .swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            document.querySelectorAll('#wall-swatches .swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            selectedWallColor = swatch.getAttribute('data-color');
            visWallOverlay.style.backgroundColor = selectedWallColor;
            updateVisSummary();
        });
    });

    function updateVisSummary() {
        if (!visSpecSummary) return;
        const roomName = visRoomSelect ? visRoomSelect.options[visRoomSelect.selectedIndex].text : "Kitchen";
        visSpecSummary.textContent = `Space: ${roomName} | Cabinet: ${selectedCabinetColor} | Wall: ${selectedWallColor}`;
    }

    // Draggable Before/After Comparison Bar
    const baSlider = document.getElementById('ba-slider');
    const baBeforeImg = document.getElementById('ba-before-img');
    const baHandle = document.getElementById('ba-handle');

    if (baSlider && baBeforeImg && baHandle) {
        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = baSlider.getBoundingClientRect();
            let x = clientX - rect.left;
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            const percentage = (x / rect.width) * 100;
            baBeforeImg.style.width = `${percentage}%`;
            baHandle.style.left = `${percentage}%`;
        };

        baHandle.addEventListener('mousedown', () => { isDragging = true; });
        window.addEventListener('mouseup', () => { isDragging = false; });
        baSlider.addEventListener('mousemove', (e) => {
            if (isDragging) moveSlider(e.clientX);
        });

        // Touch events for mobile
        baHandle.addEventListener('touchstart', () => { isDragging = true; });
        window.addEventListener('touchend', () => { isDragging = false; });
        baSlider.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length > 0) moveSlider(e.touches[0].clientX);
        });
    }

    // 8. Advanced 6-Step Wizard & AI Cost Estimator Engine
    const wizSteps = document.querySelectorAll('.wiz-step');
    const wizCards = document.querySelectorAll('.wiz-card-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const generateAiBoqBtn = document.getElementById('generate-ai-boq-btn');
    const estimatorDashboard = document.getElementById('estimator-results-dashboard');

    function goToWizStep(stepNum) {
        wizSteps.forEach(s => {
            const sNum = parseInt(s.getAttribute('data-step'));
            s.classList.remove('active', 'completed');
            if (sNum < stepNum) s.classList.add('completed');
            if (sNum === stepNum) s.classList.add('active');
        });

        wizCards.forEach(c => {
            c.classList.remove('active');
            if (c.id === `wiz-step-${stepNum}`) c.classList.add('active');
        });
    }

    wizSteps.forEach(stepHeader => {
        stepHeader.addEventListener('click', () => {
            const stepNum = parseInt(stepHeader.getAttribute('data-step'));
            goToWizStep(stepNum);
        });
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStepNum = parseInt(btn.getAttribute('data-next'));
            goToWizStep(nextStepNum);
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStepNum = parseInt(btn.getAttribute('data-prev'));
            goToWizStep(prevStepNum);
        });
    });

    // Smart Package Bundle Selection Handlers
    document.querySelectorAll('.bundle-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.bundle-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const bundleType = card.getAttribute('data-bundle');
            const bedSelect = document.getElementById('furn-bed-type');
            const wardSelect = document.getElementById('furn-wardrobe-type');
            const sofaSelect = document.getElementById('furn-sofa-type');
            const diningSelect = document.getElementById('furn-dining-set');
            const tvStyleSelect = document.getElementById('furn-tv-style');
            const tierSelect = document.getElementById('adv-tier');

            if (bundleType === 'essential') {
                if (bedSelect) bedSelect.value = 'queen_std';
                if (wardSelect) wardSelect.value = '3door_hinged';
                if (sofaSelect) sofaSelect.value = '3seater';
                if (diningSelect) diningSelect.value = '4seater';
                if (tvStyleSelect) tvStyleSelect.value = 'wall_mounted';
                if (tierSelect) tierSelect.value = 'standard';
            } else if (bundleType === 'premium') {
                if (bedSelect) bedSelect.value = 'king_hydraulic';
                if (wardSelect) wardSelect.value = '2door_sliding';
                if (sofaSelect) sofaSelect.value = 'lshape';
                if (diningSelect) diningSelect.value = '6seater';
                if (tvStyleSelect) tvStyleSelect.value = 'ent_wall';
                if (tierSelect) tierSelect.value = 'premium';
            } else if (bundleType === 'luxury') {
                if (bedSelect) bedSelect.value = 'king_upholstered';
                if (wardSelect) wardSelect.value = 'walk_in';
                if (sofaSelect) sofaSelect.value = 'recliner';
                if (diningSelect) diningSelect.value = '8seater';
                if (tvStyleSelect) tvStyleSelect.value = 'ent_wall';
                if (tierSelect) tierSelect.value = 'luxury';
            }

            // Auto trigger calculation
            calculateAdvancedAiEstimate();
        });
    });

    // Checkbox cards click toggle
    document.querySelectorAll('.cb-card').forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    card.classList.add('checked');
                } else {
                    card.classList.remove('checked');
                }
            });
        }
    });

    // Advanced AI Calculation Engine with Ready-Made Furniture
    function calculateAdvancedAiEstimate() {
        const areaSqft = parseFloat(document.getElementById('adv-area').value) || 1200;
        const projectType = document.getElementById('adv-project-type').value;
        const tier = document.getElementById('adv-tier').value;
        const finish = document.getElementById('adv-finish').value;
        const core = document.getElementById('adv-core').value;
        const hardware = document.getElementById('adv-hardware').value;
        const countertop = document.getElementById('adv-countertop').value;
        const clientName = document.getElementById('adv-client-name').value || "Respected Client";
        const clientLoc = document.getElementById('adv-location').value || "Kollam, Kerala";

        // Ready-made furniture selections
        const bedType = document.getElementById('furn-bed-type') ? document.getElementById('furn-bed-type').value : 'king_hydraulic';
        const wardType = document.getElementById('furn-wardrobe-type') ? document.getElementById('furn-wardrobe-type').value : '2door_sliding';
        const sofaType = document.getElementById('furn-sofa-type') ? document.getElementById('furn-sofa-type').value : 'lshape';
        const diningSet = document.getElementById('furn-dining-set') ? document.getElementById('furn-dining-set').value : '6seater';
        const tvStyle = document.getElementById('furn-tv-style') ? document.getElementById('furn-tv-style').value : 'ent_wall';

        // Count selected areas, features, appliances
        const selectedAreas = Array.from(document.querySelectorAll('input[name="area"]:checked')).map(cb => cb.value);
        const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(cb => cb.value);
        const selectedAppliances = Array.from(document.querySelectorAll('input[name="appliance"]:checked')).map(cb => cb.value);

        // Base rate per sq.ft
        let baseRate = 750;
        if (tier === 'economy') baseRate = 550;
        if (tier === 'premium') baseRate = 920;
        if (tier === 'luxury') baseRate = 1350;

        // Finish multiplier
        let finishMult = 1.0;
        if (finish === 'acrylic') finishMult = 1.15;
        if (finish === 'pu') finishMult = 1.22;
        if (finish === 'veneer') finishMult = 1.30;
        if (finish === 'glass') finishMult = 1.35;

        // Core Board multiplier
        let coreMult = 1.0;
        if (core === 'bwp_ply') coreMult = 1.12;
        if (core === 'hdhmr') coreMult = 1.08;

        const baseInteriorCost = areaSqft * baseRate * finishMult * coreMult;
        const areaAddons = selectedAreas.length * 28000;
        const featureAddons = selectedFeatures.length * 14000;
        const applianceAddons = selectedAppliances.length * 16000;

        // Ready-Made Furniture Cost Calculation
        let bedCost = 0;
        if (bedType === 'queen_std') bedCost = 45000;
        if (bedType === 'king_hydraulic') bedCost = 78000;
        if (bedType === 'king_upholstered') bedCost = 92000;
        if (bedType === 'bunk') bedCost = 48000;

        let wardCost = 0;
        if (wardType === '3door_hinged') wardCost = 55000;
        if (wardType === '4door_hinged') wardCost = 75000;
        if (wardType === '2door_sliding') wardCost = 95000;
        if (wardType === 'walk_in') wardCost = 145000;

        let sofaCost = 0;
        if (sofaType === '3seater') sofaCost = 38000;
        if (sofaType === 'lshape') sofaCost = 68000;
        if (sofaType === 'recliner') sofaCost = 115000;
        if (sofaType === 'sofa_bed') sofaCost = 42000;

        let diningCost = 0;
        if (diningSet === '4seater') diningCost = 42000;
        if (diningSet === '6seater') diningCost = 78000;
        if (diningSet === '8seater') diningCost = 125000;

        let tvCost = 0;
        if (tvStyle === 'wall_mounted') tvCost = 35000;
        if (tvStyle === 'floor_standing') tvCost = 45000;
        if (tvStyle === 'ent_wall') tvCost = 85000;

        const totalFurnitureCost = bedCost + wardCost + sofaCost + diningCost + tvCost;

        // Category breakdown
        const matCost = baseInteriorCost * 0.45;
        let hardCost = baseInteriorCost * 0.15;
        if (hardware === 'premium') hardCost *= 1.25;
        if (hardware === 'imported') hardCost *= 1.45;

        const accCost = areaAddons + applianceAddons;
        const featCost = featureAddons;
        const labourCost = baseInteriorCost * 0.16;
        const instCost = 45000;

        const subtotal = matCost + hardCost + accCost + featCost + totalFurnitureCost + labourCost + instCost;
        const gst = subtotal * 0.18;
        const grandTotal = subtotal + gst;
        const sqftRate = Math.round(grandTotal / areaSqft);

        // DOM Updates
        document.getElementById('adv-client-disp').textContent = clientName;
        document.getElementById('adv-proj-disp').textContent = `${projectType.toUpperCase().replace('_', ' ')} (${areaSqft.toLocaleString('en-IN')} sq.ft)`;
        document.getElementById('adv-loc-disp').textContent = clientLoc;

        document.getElementById('row-mat-cost').textContent = `₹ ${Math.round(matCost).toLocaleString('en-IN')}`;
        document.getElementById('row-hard-cost').textContent = `₹ ${Math.round(hardCost).toLocaleString('en-IN')}`;
        document.getElementById('row-acc-cost').textContent = `₹ ${Math.round(accCost).toLocaleString('en-IN')}`;
        document.getElementById('row-feat-cost').textContent = `₹ ${Math.round(featCost).toLocaleString('en-IN')}`;
        document.getElementById('row-labour-cost').textContent = `₹ ${Math.round(labourCost).toLocaleString('en-IN')}`;
        document.getElementById('row-inst-cost').textContent = `₹ ${Math.round(instCost).toLocaleString('en-IN')}`;

        document.getElementById('adv-subtotal').textContent = `₹ ${Math.round(subtotal).toLocaleString('en-IN')}`;
        document.getElementById('adv-gst').textContent = `₹ ${Math.round(gst).toLocaleString('en-IN')}`;
        document.getElementById('adv-grandtotal').textContent = `₹ ${Math.round(grandTotal).toLocaleString('en-IN')}`;
        document.getElementById('adv-sqft-rate').textContent = `₹ ${sqftRate}`;

        // Visual bars
        const matPct = Math.round((matCost / subtotal) * 100);
        const hardPct = Math.round(((hardCost + accCost) / subtotal) * 100);
        const featPct = Math.round((featCost / subtotal) * 100);
        const labourPct = 100 - (matPct + hardPct + featPct);

        document.getElementById('pct-mat').textContent = `₹ ${Math.round(matCost).toLocaleString('en-IN')}`;
        document.getElementById('bar-fill-mat').style.width = `${matPct}%`;

        document.getElementById('pct-hard').textContent = `₹ ${Math.round(hardCost + accCost).toLocaleString('en-IN')}`;
        document.getElementById('bar-fill-hard').style.width = `${hardPct}%`;

        document.getElementById('pct-feat').textContent = `₹ ${Math.round(featCost).toLocaleString('en-IN')}`;
        document.getElementById('bar-fill-feat').style.width = `${featPct}%`;

        document.getElementById('pct-labour').textContent = `₹ ${Math.round(labourCost + instCost).toLocaleString('en-IN')}`;
        document.getElementById('bar-fill-labour').style.width = `${labourPct}%`;

        // AI Advice generation
        const aiTipsList = document.getElementById('ai-tips-list');
        if (aiTipsList) {
            aiTipsList.innerHTML = `
                <li><i class="fa-solid fa-circle-check text-gold"></i> <strong>Core Board Match:</strong> ${core === 'bwp_ply' ? 'BWP 710 Marine Ply is optimal for Kerala moisture protection.' : 'Consider upgrading wet areas (Kitchen/Utility) to BWP 710 Marine Ply.'}</li>
                <li><i class="fa-solid fa-circle-check text-gold"></i> <strong>Finish Recommendation:</strong> ${finish.toUpperCase()} finish paired with ${countertop.toUpperCase()} countertop delivers high durability and 10x scratch resistance.</li>
                <li><i class="fa-solid fa-lightbulb text-gold"></i> <strong>Smart Optimization:</strong> ${selectedFeatures.includes('false_ceiling') ? 'False ceiling with LED cove lighting increases spatial elegance by 35%.' : 'Adding false ceiling in living areas enhances cove lighting ambience.'}</li>
            `;
        }

        // Show Dashboard
        if (estimatorDashboard) {
            estimatorDashboard.style.display = 'block';
            estimatorDashboard.scrollIntoView({ behavior: 'smooth' });
        }

        // Log estimate in admin panel
        saveQuoteToAdmin(clientName, projectType, selectedAreas.length, grandTotal);
    }

    if (generateAiBoqBtn) {
        generateAiBoqBtn.addEventListener('click', calculateAdvancedAiEstimate);
    }

    // Print & WhatsApp Actions
    const advPrintBtn = document.getElementById('adv-print-btn');
    if (advPrintBtn) {
        advPrintBtn.addEventListener('click', () => { window.print(); });
    }

    const advWhatsappBtn = document.getElementById('adv-whatsapp-btn');
    if (advWhatsappBtn) {
        advWhatsappBtn.addEventListener('click', () => {
            const clientName = document.getElementById('adv-client-disp').textContent;
            const total = document.getElementById('adv-grandtotal').textContent;
            const msg = encodeURIComponent(`Hi JK Interio, I generated an AI BOQ estimate for ${clientName}. Total Estimate: ${total}. Please connect with me for a site visit.`);
            window.open(`https://wa.me/919605620113?text=${msg}`, '_blank');
        });
    }

    // 9. Gallery Filter & Lightbox Zoom
    const galleryFilters = document.querySelectorAll('#gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterVal = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterVal === 'all' || item.getAttribute('data-category') === filterVal) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const imgSrc = btn.getAttribute('data-img');
            if (lightboxModal && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightboxModal.classList.add('active');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });
    }

    // 10. FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const parent = q.parentElement;
            parent.classList.toggle('active');
        });
    });

    // 11. Consultation Form Submission & Admin Lead Tracking
    const cForm = document.getElementById('consultation-form');
    const cStatus = document.getElementById('c-form-status');

    if (cForm) {
        cForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('c-submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

            const name = document.getElementById('c-name').value;
            const phone = document.getElementById('c-phone').value;
            const city = document.getElementById('c-city').value;
            const service = document.getElementById('c-service').value;

            setTimeout(() => {
                cStatus.style.color = '#28a745';
                cStatus.textContent = '✅ Success! Your site visit request has been recorded. Our Senior Architect will call you shortly.';
                cForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Request';

                // Add to Admin Lead Store
                addLeadToAdmin(name, phone, city, service);
            }, 1200);
        });
    }

    // 12. Admin CMS Dashboard Modal Logic
    const adminTriggerBtn = document.getElementById('admin-trigger-btn');
    const adminModal = document.getElementById('admin-modal');
    const adminClose = document.getElementById('admin-close');

    if (adminTriggerBtn && adminModal) {
        adminTriggerBtn.addEventListener('click', () => {
            adminModal.classList.add('active');
        });
    }

    if (adminClose) {
        adminClose.addEventListener('click', () => {
            adminModal.classList.remove('active');
        });
    }

    // Admin Tabs
    const admTabs = document.querySelectorAll('.adm-tab');
    const admContents = document.querySelectorAll('.adm-content');

    admTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-admtab');
            admTabs.forEach(t => t.classList.remove('active'));
            admContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetElem = document.getElementById(target);
            if (targetElem) targetElem.classList.add('active');
        });
    });

    function addLeadToAdmin(name, phone, city, service) {
        const leadsList = document.getElementById('adm-leads-list');
        if (!leadsList) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${todayStr}</td>
            <td>${name}</td>
            <td>${phone}</td>
            <td>${city}</td>
            <td>${service}</td>
            <td><span class="badge-status pending">New Lead</span></td>
        `;
        leadsList.insertBefore(tr, leadsList.firstChild);
    }

    function saveQuoteToAdmin(clientName, homeType, kitchFt, wardCount, total) {
        const quotesList = document.getElementById('adm-quotes-list');
        if (!quotesList) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${clientName}</td>
            <td>${homeType.toUpperCase()}</td>
            <td>${kitchFt} ft</td>
            <td>${wardCount} Units</td>
            <td><strong>₹ ${total.toLocaleString('en-IN')}</strong></td>
        `;
        quotesList.insertBefore(tr, quotesList.firstChild);
    }

    // 13. Product Catalog Filter, Search & Quick View Modal Engine
    const catalogSearchInput = document.getElementById('catalog-search-input');
    const catalogSearchBtn = document.getElementById('catalog-search-btn');
    const categoryPills = document.querySelectorAll('.pill-btn');
    const productCards = document.querySelectorAll('.product-card');
    const resultsCount = document.getElementById('results-count');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');

    function filterProducts() {
        const query = catalogSearchInput ? catalogSearchInput.value.toLowerCase().trim() : '';
        const activePill = document.querySelector('.pill-btn.active');
        const selectedPillCat = activePill ? activePill.getAttribute('data-cat') : 'all';

        const checkedCats = Array.from(document.querySelectorAll('input[name="cat_filter"]:checked')).map(cb => cb.value);
        const checkedMats = Array.from(document.querySelectorAll('input[name="mat_filter"]:checked')).map(cb => cb.value);
        const checkedTypes = Array.from(document.querySelectorAll('input[name="type_filter"]:checked')).map(cb => cb.value);

        let visibleCount = 0;

        productCards.forEach(card => {
            const cardCat = card.getAttribute('data-cat');
            const cardMat = card.getAttribute('data-mat');
            const cardType = card.getAttribute('data-type');
            const cardTitle = card.querySelector('h4') ? card.querySelector('h4').textContent.toLowerCase() : '';
            const cardDesc = card.querySelector('.prod-desc') ? card.querySelector('.prod-desc').textContent.toLowerCase() : '';

            let matchesQuery = !query || cardTitle.includes(query) || cardDesc.includes(query);
            let matchesPill = (selectedPillCat === 'all') || (cardCat === selectedPillCat);
            let matchesCat = checkedCats.length === 0 || checkedCats.includes(cardCat);
            let matchesMat = checkedMats.length === 0 || checkedMats.includes(cardMat);
            let matchesType = checkedTypes.length === 0 || checkedTypes.includes(cardType);

            if (matchesQuery && matchesPill && matchesCat && matchesMat && matchesType) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (resultsCount) {
            resultsCount.textContent = `Showing ${visibleCount} Premium Products`;
        }
    }

    if (catalogSearchInput) {
        catalogSearchInput.addEventListener('input', filterProducts);
    }
    if (catalogSearchBtn) {
        catalogSearchBtn.addEventListener('click', filterProducts);
    }

    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterProducts();
        });
    });

    document.querySelectorAll('.filter-cb input').forEach(cb => {
        cb.addEventListener('change', filterProducts);
    });

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            document.querySelectorAll('.filter-cb input').forEach(cb => cb.checked = false);
            if (catalogSearchInput) catalogSearchInput.value = '';
            categoryPills.forEach(p => p.classList.remove('active'));
            if (categoryPills[0]) categoryPills[0].classList.add('active');
            filterProducts();
        });
    }

    // Wishlist Toggle
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-regular');
                icon.classList.toggle('fa-solid');
            }
        });
    });

    // Quick View Modal
    const qvModal = document.getElementById('quick-view-modal');
    const qvClose = document.getElementById('quick-view-close');

    const productDataStore = {
        'prod1': {
            title: 'L-Shape Anti-Scratch Acrylic Modular Kitchen',
            cat: 'Modular Kitchen',
            price: '₹ 2,25,000',
            desc: 'BWP 710 Marine Ply base cabinet structure with anti-fingerprint acrylic shutter finish. Includes Soft-close Hettich German tandem drawers, spice pullout & Quartz countertop.',
            img: 'assets/images/after_kitchen.png'
        },
        'prod2': {
            title: 'Royal Teak King Hydraulic Bedroom Set',
            cat: 'Bedroom Furniture Set',
            price: '₹ 1,45,000',
            desc: 'Full bedroom set including King Hydraulic Storage Bed, 3-Door Sliding Glass Wardrobe, LED Vanity Mirror, Bedside Tables, and Ergonomic Study Table.',
            img: 'assets/images/after_living.png'
        },
        'prod3': {
            title: 'Entertainment Wall Unit with Teak Fluted Panels',
            cat: 'TV Units',
            price: '₹ 85,000',
            desc: 'Custom-built floating media console paired with teak fluted wall paneling, integrated cove LED strip lighting, and hidden cable routing.',
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
        },
        'prod4': {
            title: 'Lacquered Tinted Glass Sliding Wardrobe',
            cat: 'Wardrobes',
            price: '₹ 1,15,000',
            desc: 'Floor-to-ceiling glass sliding doors with heavy-duty aluminum track, motion-sensor LED interior lights, and modular hanging rails.',
            img: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=600&q=80'
        },
        'prod5': {
            title: 'Nordic L-Shape Sectional Fabric Sofa',
            cat: 'Living Room',
            price: '₹ 68,000',
            desc: 'Premium stain-resistant velvet upholstery with 40-density HR foam seating cushions and solid teak wood leg supports.',
            img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
        },
        'prod6': {
            title: 'Italian Calacatta Marble 6-Seater Dining Set',
            cat: 'Dining Furniture',
            price: '₹ 78,000',
            desc: '6-Seater dining table with Calacatta quartz marble top, solid teak wood frame, and 6 ergonomic cushioned chairs.',
            img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80'
        }
    };

    document.querySelectorAll('.btn-quick-view').forEach(btn => {
        btn.addEventListener('click', () => {
            const pId = btn.getAttribute('data-id');
            const data = productDataStore[pId];
            if (data && qvModal) {
                document.getElementById('qv-title').textContent = data.title;
                document.getElementById('qv-cat').textContent = data.cat;
                document.getElementById('qv-price').textContent = data.price;
                document.getElementById('qv-desc').textContent = data.desc;
                document.getElementById('qv-img').src = data.img;

                const waLink = document.getElementById('qv-whatsapp-link');
                if (waLink) {
                    waLink.href = `https://wa.me/919605620113?text=Hi%20JK%20Interio%2C%20I%20am%20interested%20in%20${encodeURIComponent(data.title)}`;
                }

                qvModal.style.display = 'flex';
            }
        });
    });

    if (qvClose && qvModal) {
        qvClose.addEventListener('click', () => {
            qvModal.style.display = 'none';
        });
    }

    // 14. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then((reg) => {
                console.log('JK Interio PWA ServiceWorker registered with scope:', reg.scope);
            }).catch((err) => {
                console.log('ServiceWorker registration failed:', err);
            });
        });
    }

    // 15. Smart Floating Action Buttons Auto-Hide on Scroll
    const fabWrapper = document.getElementById('fab-wrapper');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Auto hide on scrolling down fast, show on scroll up
        if (fabWrapper) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                fabWrapper.classList.add('fab-hidden');
            } else {
                fabWrapper.classList.remove('fab-hidden');
            }
        }

        lastScrollY = currentScrollY;
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});


