from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from accounts.forms import CustomUserCreationForm

# Vista per il login degli utenti
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Effettua il login dell'utente
            messages.success(request, "Login effettuato con successo!")
            return redirect('home')  # Reindirizza alla home
        else:
            messages.error(request, 'Username o password non validi.')  # Messaggio di errore
    return render(request, 'accounts/login.html')  # Rende il template di login

# Vista per il logout degli utenti
def logout_view(request):
    logout(request)  # Effettua il logout
    messages.success(request, "Logout effettuato con successo!")
    return redirect('login')  # Reindirizza alla pagina di login

# Vista per la registrazione degli utenti
def register_view(request):
    
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
          # Crea un'istanza del form con i dati POST
        if form.is_valid():
            user = form.save(commit=False)  # Salva l'utente senza committare al database per aspettare la scelta sul coordinatore
            # Uso is_coordinator per settare is_staff
            user.is_staff = form.cleaned_data.get('is_coordinator', False)  # Imposta is_staff in base a is_coordinator
            user.is_superuser = user.is_staff
            user.save()  # Salva l'utente nel database
            login(request, user)
            messages.success(request, 'Registrazione completata! Sei loggato')
            return redirect('home')  # Logga automaticamente
        else:
            messages.error(request, 'Nome utente o Password non validi')
    else: 
        form = CustomUserCreationForm()       
    return render(request, 'accounts/register.html', {'form': form})  # Rende il template di registrazione
