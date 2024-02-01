from django.core import serializers
from django.forms.models import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render

from .models import Employee, Employeeform, Office, Officeform

# Create your views here.

def index(request):
    officeform=Officeform()
    employeeform=Employeeform()

    data={'officeform':officeform,'employeeform':employeeform}

    return render(request ,"index.html",data)


def officecrud(request):
    
    if request.method=='POST':
        
        officeform=Officeform(request.POST)
        office=officeform.save()
        return JsonResponse(model_to_dict(office),safe=False)