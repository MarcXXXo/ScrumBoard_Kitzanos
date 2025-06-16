L'obiettivo del progetto è sviluppare una dashboard (ScrumBoard) che rappresenti visivamente le task create, in corso o completate da parte di ogni utente (metodo AGILE).

-- Struttura del Progetto

Il progetto è organizzato in modo modulare per facilitare manutenzione, scalabilità e chiarezza.

  1. Cartella config

    - settings.py: impostazioni principali del progetto Django, come database, middleware, app installate, static files, e sicurezza.

    - urls.py: file principale per il routing URL, include i path di app sbk_app e accounts.

    - wsgi.py: file per la gestione del deployment WSGI (non mostrato ma previsto).

  2. Cartella accounts

    - forms.py: definizione di un form personalizzato di registrazione CustomUserCreationForm con campo aggiuntivo is_coordinator.

    - urls.py: definizione delle rotte legate all'autenticazione (login, logout, registrazione).

    - views.py: implementazioni delle viste di login, logout e registrazione, con gestione form e autenticazione.

  3.  Cartella sbk_app

    - models.py: definizione del modello Task con campi per descrizione, tipo, priorità, assegnazioni, note, e stato di completamento.

    - urls.py: definizione delle rotte per la home page, completamento e cancellazione task.

    - views.py: logica backend per la visualizzazione, creazione, modifica, completamento e eliminazione dei task. Include filtri basati sui ruoli utenti (coordinatori e                     utenti normali).

  4. Cartella static

    - css/style.css: foglio di stile principale, con design moderno, responsive e accessibile.

    - js/priorities.js: gestione interazioni per aggiunta attività e cambio tab priorità.

    - js/tabs.js: gestione interattiva del cambio tabs in interfacce multiple.

    - js/task.js: gestione di editing, completamento, eliminazione dei task e filtri dinamici.

    - font/Montserrat-Medium.woff2: font Montserrat per tipografia coerente.

  5. Cartella templates

    - accounts/login.html: template per il login.
    
    - accounts/register.html: template per la registrazione.
    
    - home.html: template principale per la visualizzazione e interazione con i task.

  6. Altri file

    - db.sqlite3: database di sviluppo SQLite.
    
    - manage.py: script per la gestione e il comando CLI di Django.

-- Come è stato strutturato il progetto

  - Ho utilizzato Django per un backend solido e scalabile, implementando autenticazione modelli relazionali e CRUD completo sui task.
  
  - Il frontend usa HTML5, CSS3 con variabili, layout responsive e JavaScript modulare per gestire le varie interazioni nelle pagine.
    
  - Le funzionalità chiave includono:
      - Gestione ruoli utenti (coordinatore/admin e utente normale).
      - Completezza di moduli con validazioni e feedback utenti.
      - Filtri avanzati dinamici per tipo, priorità, utente e ricerca testuale.
      - UI responsive con gestione tab e interfacce ordinarie e mobile-friendly.
      - Notifiche e comportamenti asincroni tramite fetch API e aggiornamenti DOM senza ricaricare la pagina.

-- Installazione e avvio

1. Clona il repository:  
   `git clone https://github.com/MarcXXXo/ScrumBoard_Kitzanos.git`

2. Crea un ambiente virtuale (consigliato ma opzionale):  
   `python -m venv venv`  
   `source venv/bin/activate` (Linux/macOS)  
   `venv\Scripts\activate` (Windows)

3. Installa le dipendenze:  
   `pip install -r requirements.txt`

4. Esegui le migrazioni:  
   `python manage.py makemigrations`
   `python manage.py migrate`

5. Avvia il server di sviluppo:  
   `python manage.py runserver`

6. Accedi all'app in browser:  
   [http://127.0.0.1:8000/]
   (http://127.0.0.1:8000/)

-- Considerazioni finali

    Questo progetto integra backend e frontend per fornire una piattaforma di task management.  
    Il codice è stato organizzato per facilitare future estensioni, ottimizzazioni e refactoring.

Creato da Marco Livesu 
marcolivesu1@gmail.com

  
