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
    
def employeecrud(request):
    if request.method=='POST':
        officeform=Employeeform(request.POST)
        employee=officeform.save()
        office=employee.office
        officejson=model_to_dict(office)
        response=model_to_dict(employee)
        response['office']=officejson
        return JsonResponse(response,safe=False)
    
def getalloffices(request):
    offices=Office.objects.all()
    data=serializers.serialize('json',offices)
    return JsonResponse(data,safe=False)

def showoffices(request):
    officeform=Officeform()
    data={'officeform':officeform,}
    return render(request ,"office.html",data)

def getallemployees(request):

    employees=Employee.objects.all() 
    data=serializers.serialize('json',employees,use_natural_foreign_keys=True)
    return JsonResponse(data,safe=False)



def showemployees(request):
    employeeform=Employeeform()
    data={'employeeform':employeeform}
    return render(request ,"employee.html",data)


