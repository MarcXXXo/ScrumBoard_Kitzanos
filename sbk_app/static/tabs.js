function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  let activeTabId = null;

  // Mappa dei prefissi dei filtri per ogni tab
  const prefixMap = {
    attive: '',
    completate: '_comp',
    storico: '_arch'
  };

  function resetFiltriTab(tabId) {
    const prefix = prefixMap[tabId];
    if (prefix === undefined) return;

    const search = document.getElementById(`task-search${prefix}`);
    const tipo = document.getElementById(`filter-tipo${prefix}`);
    const priorita = document.getElementById(`filter-priorita${prefix}`);
    const utente = document.getElementById(`filter-utente${prefix}`);

    if (search) search.value = "";
    if (tipo) tipo.selectedIndex = 0;
    if (priorita) priorita.selectedIndex = 0;
    if (utente) utente.selectedIndex = 0;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const newTabId = tab.getAttribute('data-tab');
      if (newTabId === activeTabId) return;

      // Resetta filtri della tab precedente
      if (activeTabId) resetFiltriTab(activeTabId);

      // Cambia la tab attiva
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => c.classList.remove('active'));
      const contentToShow = document.getElementById(newTabId);
      if (contentToShow) contentToShow.classList.add('active');

      activeTabId = newTabId;
    });
  });

  // Tab attiva iniziale
  const defaultTab = document.querySelector('.tab.active');
  activeTabId = defaultTab ? defaultTab.getAttribute('data-tab') : null;
}

document.addEventListener('DOMContentLoaded', initTabs);