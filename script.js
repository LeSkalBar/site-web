document.addEventListener('DOMContentLoaded', () => {
    
    // ==================================================
    // 1. GESTION DU MENU MOBILE
    // ==================================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ==================================================
    // 2. GESTION DE L'ACCORDÉON DU MENU (LIMITER A 5)
    // ==================================================
    
    // On sélectionne toutes les listes dans les catégories du menu
    const menuLists = document.querySelectorAll('.menu-category ul');
    const LIMIT = 5; // Nombre d'articles à afficher par défaut

    menuLists.forEach(list => {
        const items = list.querySelectorAll('li');

        // Si la liste contient plus d'articles que la limite
        if (items.length > LIMIT) {
            
            // 1. Cacher les éléments excédentaires
            for (let i = LIMIT; i < items.length; i++) {
                items[i].classList.add('hidden-item');
            }

            // 2. Créer le bouton "Voir la suite"
            const btn = document.createElement('div');
            btn.className = 'expand-btn';
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> Voir la suite';

            // 3. Ajouter l'événement au clic
            btn.addEventListener('click', () => {
                const isOpen = btn.classList.contains('open');

                if (isOpen) {
                    // Si c'est ouvert, on referme
                    for (let i = LIMIT; i < items.length; i++) {
                        items[i].classList.add('hidden-item');
                    }
                    btn.innerHTML = '<i class="fas fa-chevron-down"></i> Voir plus';
                    btn.classList.remove('open');
                } else {
                    // Si c'est fermé, on ouvre tout
                    items.forEach(item => item.classList.remove('hidden-item'));
                    btn.innerHTML = '<i class="fas fa-chevron-up"></i> Voir moins';
                    btn.classList.add('open');
                }
            });

            // 4. Ajouter le bouton après la liste (ul)
            list.parentNode.appendChild(btn);
        }
    });

    // ==================================================
    // 3. GESTION DU CARROUSEL (BOUCLE INTELLIGENTE)
    // ==================================================
    const slider = document.getElementById('eventsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if(slider && prevBtn && nextBtn) {
        
        // --- BOUTON SUIVANT ---
        nextBtn.addEventListener('click', () => {
            // On calcule combien on doit scroller (la largeur visible actuelle)
            const scrollAmount = slider.clientWidth; 
            const maxScroll = slider.scrollWidth - slider.clientWidth;

            // Si on est à la fin (à 5px près pour la marge d'erreur)
            if (slider.scrollLeft >= maxScroll - 5) {
                slider.scrollTo({ left: 0, behavior: 'smooth' }); // Retour début
            } else {
                slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });

        // --- BOUTON PRÉCÉDENT ---
        prevBtn.addEventListener('click', () => {
            const scrollAmount = slider.clientWidth;

            // Si on est au début
            if (slider.scrollLeft <= 0) {
                slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' }); // Retour fin
            } else {
                slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    }
});

