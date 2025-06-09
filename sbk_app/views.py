from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Task
from django.views.decorators.http import require_POST


# Create your views here.
@login_required(login_url='/accounts/login/')
def home(request):
    if request.method == 'POST':
        descrizione = request.POST.get('descrizione')
        tipo = request.POST.get('tipo')
        priorita = request.POST.get('priorita')
        task_id = request.POST.get('task_id')
        
        if task_id:
            # MODIFICA
            task = get_object_or_404(Task, id=task_id)
            task.descrizione = request.POST.get('descrizione')
            task.tipo = request.POST.get('tipo')
            task.priorita = request.POST.get('priorita')
            task.save()
        else:

            Task.objects.create(
                descrizione=descrizione,
                tipo=tipo,
                priorita=priorita,
                creatore=request.user
            )
        return redirect('home')

    tasks_ui = Task.objects.filter(priorita='UI', completata=False)
    tasks_in = Task.objects.filter(priorita='IN', completata=False)
    tasks_un = Task.objects.filter(priorita='UN', completata=False)
    tasks_nn = Task.objects.filter(priorita='NN', completata=False)

    completate = Task.objects.filter(completata=True)

    context = {
        'tasks_ui': tasks_ui,
        'tasks_in': tasks_in,
        'tasks_un': tasks_un,
        'tasks_nn': tasks_nn,
        'completate': completate,
    }

    return render(request, "home.html", context)



@require_POST
def complete_task(request):
    print(">>> CHIAMATA ARRIVATA A complete_taskA") 
    task_id = request.POST.get('task_id')
    if task_id:
        try:
            task = Task.objects.get(id=task_id)
            task.completata= True
            task.save()
            return JsonResponse({'success': True})
        except Task.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Task non trovata'})
    return JsonResponse({'success': False, 'error': 'ID mancante'})
