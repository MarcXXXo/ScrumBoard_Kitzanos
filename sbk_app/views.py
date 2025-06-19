import json
from time import localtime
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Task
from django.db.models import Q
from django.views.decorators.http import require_POST
from django.utils import timezone
from datetime import date
from django.contrib import messages

# Vista per la home, accessibile solo agli utenti autenticati
@login_required(login_url='/accounts/login/')
def home(request):
    user = request.user
    assegnato_user = None  
    oggi = timezone.now().date()
    if request.method == 'POST':
        # Recupera i dati dal form
        descrizione = request.POST.get('descrizione')
        tipo = request.POST.get('tipo')
        priorita = request.POST.get('priorita')
        task_id = request.POST.get('task_id')
        assegnato_id = request.POST.get('assegnato_a')
        note = request.POST.get("note", "")
        
        # Recupera l'utente assegnato se presente
        if assegnato_id:
            assegnato_user = User.objects.get(id=assegnato_id)

        if task_id:
            # MODIFICA: Aggiorna un task esistente
            task = get_object_or_404(Task, id=task_id)
            task.descrizione = descrizione
            task.tipo = tipo
            task.priorita = priorita
            task.modificato_da = request.user
            task.note = note
            if assegnato_user is not None:
                task.creatore = assegnato_user  # Assegna il task 
            task.save()
            messages.info(request, "Task Modificata")
            return redirect('home')
        else:
            # CREA: Crea un nuovo task
            if assegnato_id:
                user = assegnato_user 
            Task.objects.create(
                descrizione=descrizione,
                tipo=tipo,
                priorita=priorita,
                creatore=user,
                note=note,
                data_creazione=timezone.now().date(),
            )
            messages.info(request, "Task Aggiunta")
        return redirect('home')
    
    # Recupera i task in base al ruolo dell'utente
    if user.is_superuser:
        # Il coordinatore vede tutto
        tasks_ui = Task.objects.filter(priorita='UI', completata=False)
        tasks_in = Task.objects.filter(priorita='IN', completata=False)
        tasks_un = Task.objects.filter(priorita='UN', completata=False)
        tasks_nn = Task.objects.filter(priorita='NN', completata=False)
        completate = Task.objects.filter(completata=True, archiviata=False, data_completamento=oggi)
        storico_tasks = Task.objects.filter(completata=True, archiviata=True).order_by('-data_archiviazione')
        utenti = User.objects.all()
    else:
        # Utente normale: solo task proprie o assegnate
        filtro = Q(creatore=user) | Q(assegnato_a=user)
        tasks_ui = Task.objects.filter(filtro, priorita='UI', completata=False)
        tasks_in = Task.objects.filter(filtro, priorita='IN', completata=False)
        tasks_un = Task.objects.filter(filtro, priorita='UN', completata=False)
        tasks_nn = Task.objects.filter(filtro, priorita='NN', completata=False)         
        completate = Task.objects.filter(filtro, completata=True, archiviata=False, data_completamento=oggi)
        storico_tasks = Task.objects.filter(filtro, completata=True, archiviata=True).order_by('-data_archiviazione')
        utenti = None

    #storico_tasks = Task.objects.filter(data_archiviazione__isnull=False).order_by('-data_archiviazione')

    context = {
        'tasks_ui': tasks_ui,
        'tasks_in': tasks_in,
        'tasks_un': tasks_un,
        'tasks_nn': tasks_nn,
        'completate': completate,
        'utenti': utenti,
        'storico_tasks': storico_tasks,
    }

    return render(request, "home.html", context)

# Vista per completare un task, accessibile solo tramite POST
@require_POST
def complete_task(request):
    task_id = request.POST.get('task_id')
    
    if task_id:
        try:
            task = Task.objects.get(id=task_id)
            task.completata = True
            task.data_completamento = timezone.now()
            task.save()
            messages.info(request, "Task Completata")
            return JsonResponse({'success': True})
        except Task.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Task non trovata'})
    return JsonResponse({'success': False, 'error': 'ID mancante'})

# Vista per eliminare un task, accessibile solo tramite POST e solo per utenti autorizzati
@require_POST
@login_required
def elimina_task(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)

        # Controllo: solo il creatore o il coordinatore possono eliminare qualsiasi task
        if request.user == task.creatore or request.user.is_staff:
            task.delete()
            messages.info(request, "Task Eliminata")
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "error": "Non autorizzato"}, status=403)

    except Task.DoesNotExist:
        return JsonResponse({"success": False, "error": "Task non trovata"}, status=404)


@require_POST
def update_priority(request):
    try:
        data = json.loads(request.body)
        task_id = data.get('task_id')
        priorita = data.get('priorita')
        task = Task.objects.get(id=task_id)
        # Opzionale: controlla se l'utente ha i permessi per modificare la task
        task.priorita = priorita
        #messages.info(request, "Priorità della task modificata")
        task.save()

        return JsonResponse({'success': True})
    except Task.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Task non trovata'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})