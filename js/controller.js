function Person(first, last, age, eyecolor) {
  this.clearAllAddress();
  this.getCities();
  this.addresses = new Object();
  this.updatingIdx;
  this.getAddresses();
  this.exportJSON();
}

Person.prototype.createForm = function(cityList) {
//TBD add some field validator on form
var name = 
  `<div class='form-group'><label for="name">Name:</label>
  <input type="text" class="form-control" id="name" name="fname"></div>`;
var firstName =
  `<div class='form-group'><label for="firstname">First name:</label>
  <input type="text" class="form-control" id="firstname" name="firstname"></div>`;
var email =
  `<div class='form-group'><label for="email">Email:</label>
  <input type="text" class="form-control" id="email" name="email"></div>`;
var street =
  `<div class='form-group'><label for="street">Street:</label>
  <input type="text" class="form-control" id="street" name="street"></div>`;
var zip =
  `<div class='form-group'><label for="zip">Zip:</label>
  <input type="text" class="form-control" id="zip" name="zip"></div>`;
var city = '<div class="form-group"><label for="city">City:</label>';
  city += cityList;
  city += '</div>';  
var submitForm =
  `<div class='form-group'><input id="submit" class="btn btn-primary btn-lg btn-block" type="submit" value="Save"></div>`;
var inputForm = "<div>" + name + firstName + email + street + zip + city + submitForm + "</div>"
  $("#fillAddress").append(inputForm);
  this.saveAddress();
};

Person.prototype.createCityList = function(cityObj) {

  var cityList = '<select id="cities" name="cities" class="form-control">';
    for (i in cityObj) {
      cityList += '<option value="' + cityObj[i].citycode + '">' + cityObj[i].name + '</option>';
    }
  cityList += '</select>';
  return cityList;
};

Person.prototype.saveAddress = function() {
  var that = this;
$(document).ready(function(){
  $("#submit").click(function(){
     var dataObj =  {askTo: "insertAddress"
             , name: $("#name").val()
             , firstname: $("#firstname").val()
             , email: $("#email").val()
             , street: $("#street").val()
             , zip: $("#zip").val()
             , city: $( "#cities option:selected" ).val() //TBD if code changes during navigation throw exception
			};
    if(that.updatingIdx >= 0){
       var dbVer = that.addresses[that.updatingIdx]; 
       dataObj.askTo = "updateAddress";
       dataObj.id = dbVer.id;
       if (dbVer.name == dataObj.name
            && dbVer.firstname == dataObj.firstname
            && dbVer.email == dataObj.email
            && dbVer.street == dataObj.street
            && dbVer.zip == dataObj.zip
            && dbVer.citycode == dataObj.city
          ) {
              alert("No changes.");
              console.log(dataObj);
              console.log(dbVer);
              return;
            }
    }
    $.ajax({
      url:"vs/addressBook.php", 
      type: "post",
      dataType: 'json',
      data: dataObj,
      success:function(result){
        console.log(result);
        that.successMsg("Address saved for " + $("#name").val());
        that.resetFields();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
      }     
    });
  });
});

};

Person.prototype.updateAddress = function(idx) {
  var that = this;
$(document).ready(function(){
  $("#edit_"+idx).click(function(){
    that.resetFields((that.addresses[idx]));
	that.updatingIdx = idx;
  });
});

};

Person.prototype.resetFields = function(d) {
  //$("#submit").attr("disabled", true);
  if (typeof d == "undefined") {
    $("#name").val("");
    $("#firstname").val("");
    $("#email").val("");
    $("#street").val("");
    $("#zip").val("");
  } else {
    $("#name").val(d.name);
    $("#firstname").val(d.firstname);
    $("#email").val(d.email);
    $("#street").val(d.street);
    $("#zip").val(d.zip);
    $("#cities").val(d.citycode);	
  }
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#fillAddress").offset().top
  }, 200);
};

Person.prototype.getCities = function() {
	var that = this;
  $(document).ready(function(){
    $.ajax({
      url:"vs/addressBook.php", 
      type: "post",
      dataType: 'json',
      data: {askTo: "getCities"},
      success:function(result){
		that.createForm(that.createCityList(result));
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
      }     
    });
  });

};

Person.prototype.getAddresses = function() {
	var that = this;
  $(document).ready(function(){
    $.ajax({
      url:"vs/addressBook.php", 
      type: "post",
      dataType: 'json',
      data: {askTo: "getAddresses"},
      success:function(result){
		  console.log(result)
        that.addresses = result;
		that.createAddressTable(result);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
      }     
    });
  });

};

Person.prototype.createAddressTable = function(addresses) {
  var table = '<table id="addressTable" class="table">';
  table += `<thead>
        <tr>
          <th>#<th>
          <th>Name</th>
          <th>Firstname</th>
          <th>email</th>
          <th>Street</th>
          <th>zipcode</th>
          <th>City</th>
		  <th>Action</th>
        </tr>
      </thead>`;
  table += '<tbody>';
  //TBD 1. Make each field editable
  //    2. Introduce a Commit changes button
  //    3. On Click compare current values of addresses with this.addresses
  //    4. Find difference and send modified/deleted JSON to backend
  for (a in addresses){
    var idx = parseInt(a)+1;
    table += '<tr>';
	table += '<td><th scope="row">' + idx + '</th></td>';
	table += '<td>' + addresses[a].name + '</td>';
	table += '<td>' + addresses[a].firstname + '</td>';
	table += '<td>' + addresses[a].email + '</td>';
	table += '<td>' + addresses[a].street + '</td>';
	table += '<td>' + addresses[a].zip + '</td>';
	table += '<td>' + addresses[a].city + '</td>';
	table += '<td><table class="table-borderless"><tr><td><button class="btn btn-link" id="edit_'+a+'">Edit</button></td><td><button class="btn btn-link">Delete</button></td></tr></table></td>';

	table += '</tr>';
    this.updateAddress(a);
  }
  table += '</tbody></table>';
  $("#editAddress").append(table);
  $(document).ready(function() {
    $('#addressTable').DataTable( {
        "pagingType": "full_numbers",
    } );
  } );
};

Person.prototype.clearAllAddress = function() {
  var that = this;
$(document).ready(function(){
  $("#clear").click(function(){
    $.ajax({
      url:"vs/addressBook.php", 
      type: "post",
      dataType: 'json',
      data: {askTo: "refreshDatabase"},
      success:function(result){
        that.successMsg("Fresh Seed data in Place.");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
      }     
    });
  });
});

};

Person.prototype.successMsg = function(msg) {

var msgBoard =
  `<div class="alert alert-success" id="success-alert">
    <button type="button" class="close" data-dismiss="alert">x</button>
    <strong>Success! </strong>`;
  msgBoard += msg + '</div>';
  $("#notice").html(msgBoard);
  $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
    $("#success-alert").slideUp(500);
  });
};

Person.prototype.exportJSON = function() {
var that = this;
$(document).ready(function(){
  $("#exportJSON").click(function(){
    var a = document.getElementById("exportJSON");
    var file = new Blob([JSON.stringify(that.addresses)], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'addresses.txt';
  });
});

};