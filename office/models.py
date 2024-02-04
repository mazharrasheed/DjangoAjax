from django.db import models
from django.forms import Form, ModelForm
from django.forms.models import model_to_dict

# Create your models here.


class Office(models.Model):
    name=models.CharField(max_length=20)
    locations=models.CharField(max_length=20)

    def __str__(self):
        return self.name

    def natural_key(self):
        return(model_to_dict(self))

class Employee(models.Model):
    genders=[
        ("M","Male"),
        ("F", "Female")
    ]

    firstname=models.CharField(max_length=20)
    lastname=models.CharField(max_length=20)
    email=models.EmailField()
    gender=models.CharField(max_length=20,choices=genders)
    office=models.ForeignKey(Office,on_delete=models.CASCADE)
    active=models.BooleanField(default=True)

    def __str__(self):
        return self.firstname

class Officeform(ModelForm):

    class Meta():
        model=Office
        fields='__all__'

class Employeeform(ModelForm):

    class Meta():
        model=Employee
        fields='__all__'

