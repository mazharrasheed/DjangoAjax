console.log("Heloo World office page")


officeslist = []
emplist = []
$(document).ready(function () {

  getalloffices()
  $("#officeform").submit(officeformsubmit);

});

// get all Offices
function getalloffices() {
  $.ajax({
    method: "GET",
    url: "/offices/",
  })
    .done(response => {
     
      const tempoffices = JSON.parse(response)
      officeslist = tempoffices
      officeslist = officeslist.map(e => e.fields)
      renderofficetable()
    });
}
function renderofficetable() {
  let tableBody = document.getElementById('officetbl');
  tableBody.remove();
  let newBody = document.createElement('tbody');
  newBody.id = 'officetbl';
  document.getElementById('officetable').append(newBody);
  officeslist.forEach(
    function (office, index) {
      const row = newBody.insertRow();
      const count = document.createElement('TD');
      count.innerHTML = index + 1;
      const name = document.createElement('TD');
      name.innerHTML = office.name;
      const location = document.createElement('TD');
      location.innerHTML = office.locations;
      row.appendChild(count);
      row.appendChild(name);
      row.appendChild(location);
    }
  )

}


function officeformsubmit(event) {
  //  one of two methods to pevernt form submision
  event.preventDefault();
  const valuesinarry = $(this).serializeArray();
  const body = {};
  //valuesinarry.forEach(e=>{
  //body[e.name]=e.value
  //})
  valuesinarry.reduce((body, e) => {
    body[e.name] = e.value;
    return body;
  }, body);

  $.ajax({
    method: "POST",
    url: "/office/",
    data: body,
  })
    .done(function (response) {
      console.log(response);
      event.target.reset();
      officeslist.push(response)
      renderofficetable()

    })
    .fail(function (response) {
      console.log(response);
    });
}

