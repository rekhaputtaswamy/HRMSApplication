$(document).ready(function(){
	var arr=[];
	var i=2;
	var depts = "";
	
	$("#add_profile").click(function(){
	    var deptlist = $('#department_list1').children('option').map(function(i,e){
	       return e.innerText;
	    }).get();
	    depts = "";
	    for(var j = 0; j < deptlist.length; j++) {
	    	depts += "<option id='d" + (j+1) + "'>" + deptlist[j] + "</option>";
	    }
    	$('#profile'+i).html("<td  width=250px><select id='department_list" + i + "'>" + depts + "</select></td>" +
       			"<td><input id='actual_hrs" + i + "' type='number' placeholder='0' style='border-color: transparent;'></td>" +
       			"<td><input id='additional_hrs" + i + "' type='number' value='0' style='border-color: transparent;'></td>" +
       			"<td><input id='total_hrs" + i + "' type='number' placeholder='0' style='border-color: transparent;'></td>" +
       			"<script>addTotal(" + i + ");</script>" );

         $('#profiles').append('<tr id="profile'+(i+1)+'"></tr>');
         i++; 
     
    });
    
    $("#save_profile").click(function() {
    	var count = 0;
    	var selectCount = 1;
    	var entries=[];
    	
    	if($("#start_datepicker").val() == '' || $("#end_datepicker").val() == '') {
    		BootstrapDialog.alert("Enter Start and End Date");
    		return;
    	}
    	
    	$("#profiles").find("tr").each(function(){
    		var tempStr = [];
    		$(this).find("td").each(function(){
    			if($(this).find('input').val() != undefined) {
    				tempStr.push($(this).find('input').val());
    			} else if ($(this).find('select').val() != undefined) {
					var vOptionSelect = "#department_list" + selectCount;
					var select_id = $(vOptionSelect).find(":selected").index();
					tempStr.push(parseInt(select_id) + 1);
    				
    				selectCount++;
    			}
    		});
    		
    		if(tempStr != '') {
    			entries[count++] = tempStr;
    			tempStr='';
    		}
    		
    	$('#project_values').val(entries);
    	 
    	$("#profile_time").attr("action", "addCustomer");
    	$("#profile_time").attr("method", "post");
    	$("#profile_time").submit();
    	
    });
  });
    
});

function addTotal(index) {
	var indexNo = parseInt(index);
	var actual="#actual_hrs" + index;
	var additional = "#additional_hrs" + index;
	var total = "#total_hrs" + index;
	
	$(actual).change(function () { 
 		var actualVal = $(actual).val();
 	    var additionalVal = $(additional).val();
 	    var totalVal = parseInt(actualVal) + parseInt(additionalVal);
 		$(total).val(totalVal);
      });
      $(additional).change(function () { 
    	  var actualVal = $(actual).val();
	 	  var additionalVal = $(additional).val();
	 	  var totalVal = parseInt(actualVal) + parseInt(additionalVal);
	 	  $(total).val(totalVal);
	  });
}
