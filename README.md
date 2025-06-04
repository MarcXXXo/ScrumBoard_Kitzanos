L'obiettivo del progetto è sviluppare una dashboard (ScrumBoard) che rappresenti visivamente le task create, in corso o completate da parte di ogni utente (metodo AGILE).

  1.	Requisiti
     
  L’interfaccia si deve dividere in due pagine principali, Task Attive e Task Completate.
  La pagina Task Completate è semplicemente una lista di tutte le attività segnate come completate.
  
  La pagina Task Attive si dividerà secondo una matrice di priorità così divisa:
  
    •	Urgente e Importante (Rosso)
    
    •	Importante Non Urgente (Giallo)
    
    •	Urgente e Non Importante (Verde)
    
    •	Non Urgente e Non Importante (Grigio)
    
  
  2.	Entità
     
  Le entità che devono essere necessariamente presenti sono Utente e Task, da considerare l’implementazione di un Coordinatore.
  
    UTENTE
    
    •	Può creare una Task, ne sarà il responsabile (si occuperà lui di portarla a termine)
    
    •	Può modificare la Task 
    
    •	Può contrassegnare una Task come completata
    
    •	Un utente può solo autoassegnarsi delle task e non può aggiungere altri utenti alla task creata da lui
    
    •	L’utente può cancellare solo le task create da lui
    
    TASK
    
    •	Composta da Titolo, Descrizione, Tipo e Priorità
    
    •	(Scadenza?)
    
    •	(Data Creazione?)
    
    •	Sarà riportato anche il nome dell’utente creatore
    
    COORDINATORE
    
    •	Può creare task e assegnarle ad uno o più utenti,
    
    •	Può cambiare la priorità delle task
    
    •	Può cancellare e modificare qualsiasi task
    
  
  3.	Viste
     
  Le viste sono le varie pagine visualizzate, per ora ne sono state individuate 3.
  
    •	Task attive visualizzate dall’utente
    
    •	Task completate visualizzate sia dall’utente che dal coordinatore
    
    •	Task attive visualizzate dal coordinatore
        
  4.	Implementazioni
     
  Per distinguere l’utente dal coordinatore si rende necessario un login.
  
  5.	Ambiente di Sviluppo
     
  IDE: PyCharm 2025.1.1.1

  Backend: Framework utilizzato sarà Django (Python)
  
  Frontend: HTML e CSS per l’interfaccia con integrazioni JS per eventuali animazioni (es. drag&drop)
