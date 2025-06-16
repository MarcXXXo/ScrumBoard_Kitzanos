// Gestisce il menù dei filtri attivi
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("filterToggle");
    const menu = document.getElementById("filterMenu");
    const searchInput = document.getElementById("task-search");
    const tipoFilter = document.getElementById("filter-tipo");
    const prioritaFilter = document.getElementById("filter-priorita");
    const utenteFilter = document.getElementById("filter-utente"); // opzionale

    // Aggiunge eventi per i filtri
    searchInput.addEventListener("input", filtraTask);
    tipoFilter.addEventListener("change", filtraTask);
    prioritaFilter.addEventListener("change", filtraTask);
    if (utenteFilter) utenteFilter.addEventListener("change", filtraTask);
    const taskCards = document.querySelectorAll(".task-card");

    // Funzione per filtrare le attività
    function filtraTask() {
        const search = searchInput.value.toLowerCase();
        const tipo = tipoFilter.value;
        const priorita = prioritaFilter.value;
        const utente = utenteFilter?.value || "";

        taskCards.forEach(card => {
            const descrizione = card.querySelector(".task-title")?.innerText.toLowerCase() || "";
            const tipoText = card.querySelector(".task-type")?.innerText || "";
            const prioritaContainer = card.closest(".priority");
            const hasPriorita = prioritaContainer?.classList?.contains(prioritaToClass(priorita));
            const creatore = card.querySelector(".task-creator")?.innerText || "";

            // Controlla se l'attività corrisponde ai filtri
            const matchSearch = descrizione.includes(search) || tipoText.toLowerCase().includes(search) || creatore.toLowerCase().includes(search);
            const matchTipo = tipo === "" || tipoText.includes(tipo);
            const matchPriorita = priorita === "" || hasPriorita;
            const matchUtente = utente === "" || creatore === utente;

            const visible = matchSearch && matchTipo && matchPriorita && matchUtente;
            card.style.display = visible ? "block" : "none"; // Mostra o nasconde la card
        });
    }

    // Funzione per mappare la priorità a una classe
    function prioritaToClass(code) {
        return {
            UI: "urgent-important",
            IN: "important-not-urgent",
            UN: "urgent-not-important",
            NN: "not-urgent-not-important"
        }[code] || "";
    }

    // Apre il menu al click
    toggle.addEventListener("click", (e) => {
        setTimeout(filtraTask);
        e.stopPropagation();
        menu.classList.toggle("show");
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", (!expanded).toString());
    });

    // Chiude il menu se clicchi fuori
    document.addEventListener("click", (e) => {
        setTimeout(filtraTask);
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove("show");
            // Resetta i filtri
            searchInput.value = '';
            tipoFilter.value = '';
            prioritaFilter.value = '';
            searchInput.dispatchEvent(new Event('input'));
            tipoFilter.dispatchEvent(new Event('change'));
            prioritaFilter.dispatchEvent(new Event('change'));
            if (utenteFilter) {
                utenteFilter.value = '';
                utenteFilter.dispatchEvent(new Event('change'));
            }
            toggle.setAttribute("aria-expanded", "false");
            setTimeout(filtraTask);
        }
    });

    // Refresh continuo dei filtri
    let lastFilterState = "";
    setInterval(() => {
        const currentState = JSON.stringify({
            search: searchInput.value.trim(),
            tipo: tipoFilter.value,
            priorita: prioritaFilter.value,
            utente: utenteFilter?.value || ""
        });

        if (currentState !== lastFilterState) {
            lastFilterState = currentState;
            filtraTask(); // Solo se i filtri sono realmente cambiati
        }
    }, 300);
});

// Gestisce i filtri per le attività completate
document.addEventListener("DOMContentLoaded", () => {
    const toggle_comp = document.getElementById("filterToggle_comp");
    const menu_comp = document.getElementById("filterMenu_comp");
    const searchInput_comp = document.getElementById("task-search_comp");
    const tipoFilter_comp = document.getElementById("filter-tipo_comp");
    const prioritaFilter_comp = document.getElementById("filter-priorita_comp");
    const utenteFilter_comp = document.getElementById("filter-utente_comp"); // opzionale

    // Aggiunge eventi per i filtri
    searchInput_comp.addEventListener("input", filtraTask);
    tipoFilter_comp.addEventListener("change", filtraTask);
    prioritaFilter_comp.addEventListener("change", filtraTask);
    if (utenteFilter_comp) utenteFilter_comp.addEventListener("change", filtraTask);
    const taskCards_comp = document.querySelectorAll(".task-card");

    // Funzione per filtrare le attività completate
    function filtraTask() {
        const search_comp = searchInput_comp.value.toLowerCase();
        const tipo_comp = tipoFilter_comp.value;
        const priorita_comp = prioritaFilter_comp.value;
        const utente_comp = utenteFilter_comp?.value || "";

        taskCards_comp.forEach(card => {
            const descrizione_comp = card.querySelector(".task-title")?.innerText.toLowerCase() || "";
            const tipoText_comp = card.querySelector(".footer-info-1")?.innerText || "";
            const prioritaContainer_comp = card.closest(".footer-info-3");
            const hasPriorita_comp = prioritaContainer_comp?.classList?.contains(prioritaToClass(priorita_comp));
            const creatore = card.querySelector(".footer-info-3")?.innerText || "";

            // Controlla se l'attività corrisponde ai filtri
            const matchSearch_comp = descrizione_comp.includes(search_comp) || tipoText_comp.toLowerCase().includes(search_comp) || creatore.toLowerCase().includes(search_comp);
            const matchTipo_comp = tipo_comp === "" || tipoText_comp.includes(tipo_comp);
            const matchPriorita_comp = priorita_comp === "" || hasPriorita_comp;
            const matchUtente_comp = utente_comp === "" || creatore === utente_comp;

            const visible_comp = matchSearch_comp && matchTipo_comp && matchPriorita_comp && matchUtente_comp;
            card.style.display = visible_comp ? "block" : "none"; // Mostra o nasconde la card
        });
    }

    // Funzione per mappare la priorità a una classe
    function prioritaToClass(code) {
        return {
            UI: "urgent-important",
            IN: "important-not-urgent",
            UN: "urgent-not-important",
            NN: "not-urgent-not-important"
        }[code] || "";
    }

    // Apre il menu al click
    toggle_comp.addEventListener("click", (e_comp) => {
        setTimeout(filtraTask);
        e_comp.stopPropagation();
        menu_comp.classList.toggle("show");
        const expanded_comp = toggle_comp.getAttribute("aria-expanded") === "true";
        toggle_comp.setAttribute("aria-expanded", (!expanded_comp).toString());
    });

    // Chiude il menu se clicchi fuori
    document.addEventListener("click", (e_comp) => {
        setTimeout(filtraTask);
        if (!menu_comp.contains(e_comp.target) && !toggle_comp.contains(e_comp.target)) {
            menu_comp.classList.remove("show");
            // Resetta i filtri
            searchInput_comp.value = '';
            tipoFilter_comp.value = '';
            prioritaFilter_comp.value = '';
            searchInput_comp.dispatchEvent(new Event('input'));
            tipoFilter_comp.dispatchEvent(new Event('change'));
            prioritaFilter_comp.dispatchEvent(new Event('change'));
            if (utenteFilter_comp) {
                utenteFilter_comp.value = '';
                utenteFilter_comp.dispatchEvent(new Event('change'));
            }
            toggle_comp.setAttribute("aria-expanded", "false");
            setTimeout(filtraTask);
        }
    });

    // Refresh continuo dei filtri
    let lastFilterState = "";
    setInterval(() => {
        const currentState = JSON.stringify({
            search_comp: searchInput_comp.value.trim(),
            tipo_comp: tipoFilter_comp.value,
            priorita_comp: prioritaFilter_comp.value,
            utente_comp: utenteFilter_comp?.value || ""
        });

        if (currentState !== lastFilterState) {
            lastFilterState = currentState;
            filtraTask(); // Solo se i filtri sono realmente cambiati
        }
    }, 300);
});