document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Cambia tab attivo
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Cambia contenuto visibile
    const tabId = tab.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
  });
});