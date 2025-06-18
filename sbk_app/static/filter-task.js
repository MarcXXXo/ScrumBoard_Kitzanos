function setupFilter(toggleId, menuId, inputId, tipoId, prioritaId, utenteId, cardSelector, tipoSelector, prioritaClassSelector, utenteSelector) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    const searchInput = document.getElementById(inputId);
    const tipoFilter = document.getElementById(tipoId);
    const prioritaFilter = document.getElementById(prioritaId);
    const utenteFilter = document.getElementById(utenteId);
    const taskCards = document.querySelectorAll(cardSelector);

    function filtraTask() {
        const search = searchInput.value.toLowerCase();
        const tipo = tipoFilter.value;
        const priorita = prioritaFilter.value;
        const utente = utenteFilter?.value || "";

        taskCards.forEach(card => {
            const descrizione = card.querySelector(".task-title")?.innerText.toLowerCase() || "";
            const tipoText = card.querySelector(tipoSelector)?.innerText || "";
            const prioritaContainer = card.closest(prioritaClassSelector);
            const hasPriorita = priorita === "" || prioritaContainer?.classList.contains(prioritaToClass(priorita));
            const creatore = card.querySelector(utenteSelector)?.innerText || "";
                                                              //decommentare per cercare in tutta la card
            const matchSearch = descrizione.includes(search); //|| tipoText.toLowerCase().includes(search) || creatore.toLowerCase().includes(search);
            const matchTipo = tipo === "" || tipoText.includes(tipo);
            const matchUtente = utente === "" || creatore === utente;

            const visible = matchSearch && matchTipo && hasPriorita && matchUtente;
            card.style.display = visible ? "block" : "none";
        });
    }
    

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", (!expanded).toString()); 
    });

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    // Event binding
    searchInput.addEventListener("input", filtraTask);
    tipoFilter.addEventListener("change", filtraTask);
    prioritaFilter.addEventListener("change", filtraTask);
    if (utenteFilter) utenteFilter.addEventListener("change", filtraTask);

    // Refresh solo se cambia qualcosa
    let lastState = "";
    setInterval(() => {
        const currentState = JSON.stringify({
            search: searchInput.value.trim(),
            tipo: tipoFilter.value,
            priorita: prioritaFilter.value,
            utente: utenteFilter?.value || ""
        });
        if (currentState !== lastState) {
            lastState = currentState;
            filtraTask();
        }
    }, 300);
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


function resetFiltri(sezione) {
    const prefix = {
        attive: '',
        completate: '_comp',
        archiviate: '_arch'
    }[sezione];

    const search = document.getElementById(`task-search${prefix}`);
    const tipo = document.getElementById(`filter-tipo${prefix}`);
    const priorita = document.getElementById(`filter-priorita${prefix}`);
    const utente = document.getElementById(`filter-utente${prefix}`);

    if (search) search.value = "";
    if (tipo) tipo.selectedIndex = 0;
    if (priorita) priorita.selectedIndex = 0;
    if (utente) utente.selectedIndex = 0;

    // Rilancia filtro corretto
    switch (sezione) {
        case 'attive':
            if (typeof filtraTaskAttive === 'function') filtraTaskAttive();
            break;
        case 'completate':
            if (typeof filtraTaskCompletate === 'function') filtraTaskCompletate();
            break;
        case 'archiviate':
            if (typeof filtraTaskArchiviate === 'function') filtraTaskArchiviate();
            break;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupFilter(
        "filterToggle", "filterMenu", "task-search", "filter-tipo", "filter-priorita", "filter-utente",
        ".task-card:not(.completed)", ".task-type", ".priority", ".task-creator"
    );

    setupFilter(
        "filterToggle_comp", "filterMenu_comp", "task-search_comp", "filter-tipo_comp", "filter-priorita_comp", "filter-utente_comp",
        ".task-card.completed", ".footer-info-1", ".task-card.completed", ".footer-info-3 strong"
    );

    setupFilter(
        "filterToggle_arch", "filterMenu_arch", "task-search_arch", "filter-tipo_arch", "filter-priorita_arch", "filter-utente_arch",
        ".task-card.archivied", ".footer-info-1", ".task-card.archivied", ".footer-info-3 strong"
    );

    const resetButtons = document.querySelectorAll(".reset-filters-btn");
    resetButtons.forEach(button => {
        button.addEventListener("click", () => {
            const sezione = button.dataset.sezione;
            resetFiltri(sezione);
        });
    });
});