console.log("Heloo World employee page")


 
 let emplist = [];  
 var csrftoken="{{ csrf_token }}"

 $(document).ready(function () {
   getallemployees();
 });

 // get all employees
 function getallemployees() {
   $.ajax({
     method: "GET",
     url: "/employees/",
     csrftoken:csrftoken,
   }).done((response) => {
     const tempemp = JSON.parse(response);
     emplist = tempemp;
     emplist = emplist.map((e) => {
       const emp={
         ...e.fields,
         id:e.pk
       }
       return emp
     });
     renderemptable();
   });
 }
 function renderemptable() {
   let tableBody = document.getElementById("emptbl");
   tableBody.remove();
   let newBody = document.createElement("tbody");
   newBody.id = "emptbl";
   document.getElementById("emptable").append(newBody);
   emplist.forEach(function (emp, index) {
     const row = newBody.insertRow();
     const count = document.createElement("TD");
     count.innerHTML = index + 1;
     const fname = document.createElement("TD");
     fname.innerHTML = emp.firstname;
     const lname = document.createElement("TD");
     lname.innerHTML = emp.lastname;
     const email = document.createElement("TD");
     email.innerHTML = emp.email;
     const gender = document.createElement("TD");
     gender.innerHTML = emp.gender == "M" ? "Male":"Female";
     const office = document.createElement("TD");
     office.innerHTML = emp.office.name;
     const location = document.createElement("TD");
     location.innerHTML = emp.office.locations;
     const activecol = document.createElement("TD");
     const check=document.createElement('input')
     check.type='checkbox'

     if (emp.active){
       check.checked='checked'
     }
     activecol.appendChild(check)

     check.onchange=function(){
       emp.active=check.checked
       const body={
         ...emp,
         office:emp.office.id 
       }
       const csrftoken = getCookie('csrftoken');
     
       $.ajax({
         headers: {'X-CSRFToken': csrftoken},
         method: "PUT",
         url: "/employee/",
         data:JSON.stringify(body),
       })
         .done(function (response) {
           console.log(response);
      
         })
         .fail(function (response) {
           console.log(response);
         });


     }
     row.appendChild(count);
     row.appendChild(fname);
     row.appendChild(lname);
     row.appendChild(email);
     row.appendChild(gender);
     row.appendChild(office);
     row.appendChild(location);
     row.appendChild(activecol);

   });
 }

 function getCookie(name) {
   let cookieValue = null;
   if (document.cookie && document.cookie !== '') {
       const cookies = document.cookie.split(';');
       for (let i = 0; i < cookies.length; i++) {
           const cookie = cookies[i].trim();
           // Does this cookie string begin with the name we want?
           if (cookie.substring(0, name.length + 1) === (name + '=')) {
               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
               break;
           }
       }
   }
   return cookieValue;
}


 function employeeformsubmit(event) {
   //  one of two methods to pevernt form submision
   event.preventDefault();
   const valuesinarry = $(this).serializeArray();
   const body = {};
   valuesinarry.forEach((e) => {
     body[e.name] = e.value;
   });
   //valuesinarry.reduce((body, e) => {
   //body[e.name] = e.value;
   //return body;
   //}, body);
   $.ajax({
     method: "POST",
     url: "/employee/",
     data: body,
   })
     .done(function (response) {
       console.log(response);
       event.target.reset();
       emplist.push(response);
       renderemptable();
     })
     .fail(function (response) {
       console.log(response);
     });
 }

 $("#employeeform").submit(employeeformsubmit);
