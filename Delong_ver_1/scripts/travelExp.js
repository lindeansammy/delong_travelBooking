/*
   Assignment 2

   Your Name:changwei lin

   Script Date: 06/11/2018

   Filename: travelExp.js

   Functions List:
  

   testLength()
      Tests a field for its length
   testDate()
       Tests the travel date has enter or not
   testPattern()
      Tests a field for its pattern

   validateForm
      Validates a Web form

   calcRow
      Calculates the costs within one row of the travel report

   calcTotal
      Calculates the total cost of the travel

   update
      Updates the total travel cost

*/

//second request
  function testLength(field) {
     
	 if (field.value.length ==0) {
		field.style.backgroundColor="yellow";
		return false;	 
	}
	else {
		field.style.backgroundColor="white";
		return true;
	}	  
}
//third request
function testPattern(field, reg) { 
  if (reg.test(field.value)== false) { 
   field.style.backgroundColor="yellow";  
   field.style.color="red";
   return false;
   }//end if
   else {
   field.style.backgroundColor="white";  
   field.style.color="black";
   return true;
   }//end else
}//end function

function testDates() { 

 var dateExists = true;  
 
  for (i=1;i<=4;i++) { 

 if (document.expform.elements["sub"+i].value!=="0.00") {  

     rowDateExists = testLength(document.expform.elements["date"+i]);  

      if (rowDateExists==false) {
      dateExists = false;
     }//end if
   }//end if
   }//end for
 return dateExists;
}//end function

function validateForm() {  // #5 validates the form 
   var valid = true;  // a. test to see if the form is valid or not
   if (testLength(document.expform.lastname)==false) {  
   valid = false;
   }
    if (testLength(document.expform.firstname)==false) { 
   valid = false;
   }
    if (testLength(document.expform.address)==false) {
   valid = false;
   }
   if (testLength(document.expform.summary)==false) {
   valid = false;
   }
   if (testPattern(document.expform.account,/ACT\d{6}$/)==false) {  
   valid = false;
   }
   if (testPattern(document.expform.department,/DEPT\d{6}$/)==false) {  
   valid = false;
   }
   if (testPattern(document.expform.project,/PROJ\d{6}$/)==false) {  
   valid = false;
   }
   if (testPattern(document.expform.ssn,/\d{9}|\d{3}-\d{3}-\d{3}$/)==false) {  
   valid = false;
   }
   if (testDates()==false) {  
   valid = false;
   }
   if (valid == false) {
   alert("Please fill out all required fields in the proper format.");  // alert message is called if fields are not filled out
   }
   return valid;
}//end function

function calcRow(row) {
   validateForm();	 
     // Calculates the costs within one row of the travel report
	var travel = parseFloat(document.expform.elements["travel"+row].value);
	var lodge = parseFloat(document.expform.elements["lodge"+row].value);
	var meal = parseFloat(document.expform.elements["meal"+row].value);
    return (travel + lodge + meal);
    
}

  function calcTotal() {
      //Calculates the total cost of the travel
	  var totalExp=0;
	  
	  for (var i=1; i<=4; i++) {
		totalExp += calcRow(i);
	  }
	  return totalExp;	
}

  function update(expense) {
     // Updates the total travel cost
      var numRegExp = /^\d*(\.\d{0,2})?$/; 

     if (numRegExp.test(expense.value)!==false) {
         
         for (var i = 1; i<=4; i++) {
             document.expform.elements["sub" + i].value = calcRow(i).toFixed(2);  
             document.expform.elements["total"].value = calcTotal().toFixed(2);
			}   
	 }
	 else { 
		alert("Invalid currency value");
		(expense.value="0.00");
		expense.focus();
	} 
}