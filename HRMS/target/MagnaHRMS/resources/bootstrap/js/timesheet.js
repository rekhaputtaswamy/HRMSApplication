var projects, tasks, desc;
var i=2;
$(document).ready(function(){
	$(function(){
	    var projectslist = $('#proj1').children('option').map(function(i,e){
	       return e.innerText;
	    }).get();
	    for(var i = 0; i < projectslist.length; i++) {
	    	projects += "<option id='p" + i+1 + "'>" + projectslist[i] + "</option>";
	    }
	    
	    var taskslist = $('#task1').children('option').map(function(i,e){
		       return e.innerText;
		    }).get();
	    for(var i = 0; i < taskslist.length; i++) {
	    	tasks += "<option id='t" + i+1 + "'>" + taskslist[i] + "</option>";
	    }
	    
	    var desclist = $('#desc1').children('option').map(function(i,e){
		       return e.innerText;
		    }).get();
	    
	    for(var i = 0; i < desclist.length; i++) {
	    	desc += "<option id='d" + i+1 + "'>" + desclist[i] + "</option>";
	    }
	    
	    changeToGeneral(1);
	    
	    setInTimeTotal();
		    
	});
	
	$("#submit").click(function() {
		if(timeValidation()) {
			addTimehseetEntries("Submit");
		}
    	
    });
	
	$("#accept").click(function() {
		if(timeValidation()) {
			addTimehseetEntries("Approved");
		}
    	
    });
	
	$("#reject").click(function() {
		if(timeValidation()) {
			addTimehseetEntries("Rejected");
		}
    	
    });
	
	$("#save").click(function() {
		addTimehseetEntries("Save");
    	
    });
	
     $("#add_row").click(function(){
    	 addRows();
     });
     
     $(document).off('click', '#delete_row').on('click', '#delete_row',function(e) {
    	 if(i>2){
			 $("#time"+(i-1)).html('');
			 deleteRow();
			 i--;
		 }
     }); 
     
	 $('input').change(function () { 
		 var id = $(this).attr('id');
		 updateTotal(id, this.value);
     });
});

function addRows() {
	alert(i);
	
	$('#total').before($('#time'+i).html("<td><select id='proj" + i + "' class='projsel" + i + "' onchange='sendId()'>" + projects + "</select>" +
			"<script>function sendId() {changeToGeneral('" + i + "');}</script></td>" +
			"<td class='taskstd" + i + "'><select id='task" + i + "' class='tasksel" + i + "' disabled>" + tasks + "</select></td>" +
			"<td class='projdesc" + i + "'><select id='desc" + i + "' class='projdesc" + i + "' disabled>" + desc + "</select></td>" +
			"<td class='tdclass'><input id='mon_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='mon_st" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='mon_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='mon_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='mon_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='mon_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='tue_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='tue_st" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='tue_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='tue_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='tue_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='tue_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='wed_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='wed_st" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='wed_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='wed_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='wed_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='wed_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='thu_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='thu_st" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='thu_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='thu_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='thu_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='thu_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='fri_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='fri_st" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='fri_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='fri_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='fri_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='fri_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='sat_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='sat_st" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='sat_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='sat_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='sat_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='sat_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='sun_st" + i + "' type='number' value='' placeholder='ST' class='form-control' name='sun_st" + i + 
			"'style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='sun_ot" + i + "' type='number' value='' placeholder='OT' class='form-control' name='sun_ot" + i + 
			"' style='padding: 0px; text-align: center'></td>" +
			"<td class='tdclass'><input id='sun_nb" + i + "' type='number' value='' placeholder='NB' class='form-control' name='sun_nb" + i + 
			"' style='padding: 0px; text-align: center'></td>"  +
			"<td class='tdclass'><input id='proj_rem_hrs" + i + "' type='number' value='' placeholder='0' class='form-control' name='proj_rem_hrs" + i +
			"' style='padding: 0px; text-align: center;'></td>" ));

  $('#tab_logic').append('<tr id="time'+(i+1)+'"></tr>');
  i++; 
  
  $('input').change(function () { 
	  var id = $(this).attr('id');
		  updateTotal(id, this.value);

  });
 
}

function addTimehseetEntries(actiontype) {
	var count = 0;
	var entries=[];
	
	if($("#datepicker").val() == '') {
		BootstrapDialog.alert("Enter Date");
		return;
	}
	
	$("#tab_logic").find("tr").each(function(){
		var tempStr = [];
		var i = 0;
		var type = '';
		$(this).find("td").each(function(){
			
			if(i == 0) {
				type = $(this).find('select').val();
			}
			
			if($(this).find('select').val() == undefined) {
				if($(this).find('input').val() == 'Total' || $(this).find('input').val() == 'In Time') {
					return false;
				}
				tempStr.push($(this).find('input').val());
			} else {
				if(type == 'General' && i == 1) {
					i++;
					return true;
				} 
				tempStr.push($(this).find('select').val());
			}
			i++;
		});
		
		if(tempStr != '') {
			entries[count++] = tempStr;
			tempStr='';
		}
		
     });
	 
	 entries[count++] = $("#datepicker").val();
	 entries[count] = actiontype;
	 
	 var dateentry = $('#datepicker').val();
	 var dateObj = new Date(dateentry);
	 $('#weekno').val(dateObj.getWeek());
	 $('#tablevalues').val(entries);
 	
 	$("#timesheet_form").attr("action", "timesheetentry");
 	$("#timesheet_form").attr("method", "post");
 	$("#timesheet_form").submit();
	 
}

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
    var dayOfYear = ((today - onejan +1)/86400000);
    return Math.ceil(dayOfYear/7)
};

var mon_values_st = [], tue_values_st = [], wed_values_st = [], thu_values_st = [], fri_values_st = [], sat_values_st = [], sun_values_st = [];
var mon_values_ot = [], tue_values_ot = [], wed_values_ot = [], thu_values_ot = [], fri_values_ot = [], sat_values_ot = [], sun_values_ot = [];
var mon_values_nb = [], tue_values_nb = [], wed_values_nb = [], thu_values_nb = [], fri_values_nb = [], sat_values_nb = [], sun_values_nb = [];

function updateTotal(id, value) {

	if (id.startsWith("mon_st")) {
		mon_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var mon_st_total = getTotal(mon_values_st);
		$('#mon_st_total').val(parseInt(mon_st_total));
		
 	} else if (id.startsWith("mon_ot")) {
		mon_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var mon_ot_total = getTotal(mon_values_ot);
		$('#mon_ot_total').val(parseInt(mon_ot_total));
		
 	} else if (id.startsWith("mon_nb")) {
		mon_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var mon_nb_total = getTotal(mon_values_nb);
		$('#mon_nb_total').val(parseInt(mon_nb_total));
		
 	} else if (id.startsWith("tue_st")) {
 		tue_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var tue_st_total = getTotal(tue_values_st);
		$('#tue_st_total').val(parseInt(tue_st_total));
		
 	} else if (id.startsWith("tue_ot")) {
 		tue_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var tue_ot_total = getTotal(tue_values_ot);
		$('#tue_ot_total').val(parseInt(tue_ot_total));
		
 	} else if (id.startsWith("tue_nb")) {
 		tue_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var tue_nb_total = getTotal(tue_values_nb);
		$('#tue_nb_total').val(parseInt(tue_nb_total));
		
 	} else if (id.startsWith("wed_st")) {
 		wed_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var wed_st_total = getTotal(wed_values_st);
		$('#wed_st_total').val(parseInt(wed_st_total));
		
 	} else if (id.startsWith("wed_ot")) {
 		wed_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var wed_ot_total = getTotal(wed_values_ot);
		$('#wed_ot_total').val(parseInt(wed_ot_total));
		
 	} else if (id.startsWith("wed_nb")) {
 		wed_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var wed_nb_total = getTotal(wed_values_nb);
		$('#wed_nb_total').val(parseInt(wed_nb_total));
		
 	} else if (id.startsWith("thu_st")) {
 		thu_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var thu_st_total = getTotal(thu_values_st);
		$('#thu_st_total').val(parseInt(thu_st_total));
		
 	} else if (id.startsWith("thu_ot")) {
 		thu_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var thu_ot_total = getTotal(thu_values_ot);
		$('#thu_ot_total').val(parseInt(thu_ot_total));
		
 	} else if (id.startsWith("thu_nb")) {
 		thu_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var thu_nb_total = getTotal(thu_values_nb);
		$('#thu_nb_total').val(parseInt(thu_nb_total));
		
 	} else if (id.startsWith("fri_st")) {
 		fri_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var fri_st_total = getTotal(fri_values_st);
		$('#fri_st_total').val(parseInt(fri_st_total));
		
 	} else if (id.startsWith("fri_ot")) {
 		fri_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var fri_ot_total = getTotal(fri_values_ot);
		$('#fri_ot_total').val(parseInt(fri_ot_total));
		
 	} else if (id.startsWith("fri_nb")) {
 		fri_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var fri_nb_total = getTotal(fri_values_nb);
		$('#fri_nb_total').val(parseInt(fri_nb_total));
		
 	} else if (id.startsWith("sat_st")) {
 		sat_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var sat_st_total = getTotal(sat_values_st);
		$('#sat_st_total').val(parseInt(sat_st_total));
		
 	} else if (id.startsWith("sat_ot")) {
 		sat_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var sat_ot_total = getTotal(sat_values_ot);
		$('#sat_ot_total').val(parseInt(sat_ot_total));
		
 	} else if (id.startsWith("sat_nb")) {
 		sat_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var sat_nb_total = getTotal(sat_values_nb);
		$('#sat_nb_total').val(parseInt(sat_nb_total));
		
 	} else if (id.startsWith("sun_st")) {
 		sun_values_st[parseInt(id.slice(-1))] = parseInt(value);
		var sun_st_total = getTotal(sun_values_st);
		$('#sun_st_total').val(parseInt(sun_st_total));
		
 	} else if (id.startsWith("sun_ot")) {
 		sun_values_ot[parseInt(id.slice(-1))] = parseInt(value);
		var sun_ot_total = getTotal(sun_values_ot);
		$('#sun_ot_total').val(parseInt(sun_ot_total));
		
 	} else if (id.startsWith("sun_nb")) {
 		sun_values_nb[parseInt(id.slice(-1))] = parseInt(value);
		var sun_nb_total = getTotal(sun_values_nb);
		$('#sun_nb_total').val(parseInt(sun_nb_total));
		
 	}
	
	setAllDayTotal();
}   

function getTotal(values) {
	var k = 0;
	var total_value = 0;
	for(k = 0; k < values.length; k++) {
		if(values[k] != undefined) {
			var val = 0;
			if( values[k] != '' && !isNaN(values[k])) {
				val = values[k];
			} 
			total_value += parseInt(val);
		}
	}
	
	return total_value;
}

function deleteRow() {
	
	mon_values_st.pop();
	mon_values_ot.pop();
	mon_values_nb.pop();
	tue_values_st.pop();
	tue_values_ot.pop();
	tue_values_nb.pop();
	wed_values_st.pop();
	wed_values_ot.pop();
	wed_values_nb.pop();
	thu_values_st.pop();
	thu_values_ot.pop();
	thu_values_nb.pop();
	fri_values_st.pop();
	fri_values_ot.pop();
	fri_values_nb.pop();
	sat_values_st.pop();
	sat_values_ot.pop();
	sat_values_nb.pop();
	sun_values_st.pop();
	sun_values_ot.pop();
	sun_values_nb.pop();
	
	$('#mon_st_total').val(parseInt(getTotal(mon_values_st)));
	$('#mon_ot_total').val(parseInt(getTotal(mon_values_ot)));
	$('#mon_nb_total').val(parseInt(getTotal(mon_values_nb)));
	$('#tue_st_total').val(parseInt(getTotal(tue_values_st)));
	$('#tue_ot_total').val(parseInt(getTotal(tue_values_ot)));
	$('#tue_nb_total').val(parseInt(getTotal(tue_values_nb)));
	$('#wed_st_total').val(parseInt(getTotal(wed_values_st)));
	$('#wed_ot_total').val(parseInt(getTotal(wed_values_ot)));
	$('#wed_nb_total').val(parseInt(getTotal(wed_values_nb)));
	$('#thu_st_total').val(parseInt(getTotal(thu_values_st)));
	$('#thu_ot_total').val(parseInt(getTotal(thu_values_ot)));
	$('#thu_nb_total').val(parseInt(getTotal(thu_values_nb)));
	$('#fri_st_total').val(parseInt(getTotal(fri_values_st)));
	$('#fri_ot_total').val(parseInt(getTotal(fri_values_ot)));
	$('#fri_nb_total').val(parseInt(getTotal(fri_values_nb)));
	$('#sat_st_total').val(parseInt(getTotal(sat_values_st)));
	$('#sat_ot_total').val(parseInt(getTotal(sat_values_ot)));
	$('#sat_nb_total').val(parseInt(getTotal(sat_values_nb)));
	$('#sun_st_total').val(parseInt(getTotal(sun_values_st)));
	$('#sun_ot_total').val(parseInt(getTotal(sun_values_ot)));
	$('#sun_nb_total').val(parseInt(getTotal(sun_values_nb)));
	
	setAllDayTotal();
}

function setAllDayTotal() {
	var values = [];
	values = getAllDayValues();
	
	var total = 0;
	for(var i = 0; i < values.length; i++) {
		val = values[i];
		if(val == '') {
			val = "0";
		}
		total += parseInt(val); 
	}
	
	$('#all_day_total').val(total);
}

function enableTimesheetAdmin(value) {
	if(value == true) {
		$("#create_task_div").css({
			display : ""
		});
	} else {
		$("#create_task_div").css({
			display : "none"
		});
	}
	
}

function showCreateTask() {
	
	$("#first_container").css({
		display : "none"
	});
	
	$("#timesheetentry").css({
		display : "none"
	});
	
	$("#timesheetprofile").css({
		display : ""
	});
	
}

function setRowCount(count) {
	if(count > 2) {
		i = parseInt(count) + 1;	
	}
}

function changeToGeneral(index) {
	
	var projsel = ".projsel" + index;
	var tasksel = ".taskstd" + index;
	var gensel = ".gentd" + index;
	var projVal = $(projsel).val();
	var selId = "#proj" + index + " option:selected";
	var id = $(selId).index();
	
	var taskOption = "#task" + index + " option";
	var descOption = "#desc" + index + " option";
	
	$(taskOption)[id].selected = true;
	$(descOption)[id].selected = true;
	
	if(projVal=='General'){
		$(tasksel).css({
			display : "none"
		});
		$(gensel).css({
			display : ""
		});
		
    }else{
    	$(tasksel).css({
			display : ""
		});
		$(gensel).css({
			display : "none"
		});
    }

	
}

function getAllDayValues() {
	var values = [];
	values.push($('#mon_st_total').val());
	values.push($('#mon_ot_total').val());
	values.push($('#mon_nb_total').val());
	
	values.push($('#tue_st_total').val());
	values.push($('#tue_ot_total').val());
	values.push($('#tue_nb_total').val());
	
	values.push($('#wed_st_total').val());
	values.push($('#wed_ot_total').val());
	values.push($('#wed_nb_total').val());
	
	values.push($('#thu_st_total').val());
	values.push($('#thu_ot_total').val());
	values.push($('#thu_nb_total').val());

	values.push($('#fri_st_total').val());
	values.push($('#fri_ot_total').val());
	values.push($('#fri_nb_total').val());
	
	values.push($('#sat_st_total').val());
	values.push($('#sat_ot_total').val());
	values.push($('#sat_nb_total').val());
	
	values.push($('#sun_st_total').val());
	values.push($('#sun_ot_total').val());
	values.push($('#sun_nb_total').val());
	
	return values;
}

function setInTimeTotal() {
	var sams_total = parseInt($('#day1_sams').val()) + parseInt($('#day2_sams').val()) + parseInt($('#day3_sams').val()) + 
					 parseInt($('#day4_sams').val()) + parseInt($('#day5_sams').val()) + parseInt($('#day6_sams').val()) +
					 parseInt($('#day7_sams').val());
	
	$('#all_week_in').val(parseInt(sams_total));
}

function timeValidation() {
	// Monday
	var mon = getDayTotal("mon");
	var mon_sams = 0;
	if($('#day1_sams').val() != '') {
		mon_sams = parseInt($('#day1_sams').val());
	}
	if(mon > mon_sams) {
		showAlert("Monday");
		return false;
	}
	
	// Tuesday
	var tue = getDayTotal("tue");
	var tue_sams = 0;
	if($('#day2_sams').val() != '') {
		tue_sams = parseInt($('#day2_sams').val());
	}
	if(tue > tue_sams) {
		showAlert("Tuesday");
		return false;
	}

	// Wednesday
	var wed = getDayTotal("wed");
	var wed_sams = 0;
	if($('#day3_sams').val() != '') {
		wed_sams = parseInt($('#day3_sams').val());
	}
	if(wed > wed_sams) {
		showAlert("Wednesday");
		return false;
	}
	
	// Thursday
	var thu = getDayTotal("thu");
	var thu_sams = 0;
	if($('#day4_sams').val() != '') {
		thu_sams = parseInt($('#day4_sams').val());
	}
	if(thu > thu_sams) {
		showAlert("Thursday");
		return false;
	}
	
	// Friday
	var fri = getDayTotal("fri");
	var fri_sams = 0;
	if($('#day5_sams').val() != '') {
		fri_sams = parseInt($('#day5_sams').val());
	}
	if(fri > fri_sams) {
		showAlert("Friday");
		return false;
	}
	
	// Saturday
	var sat = getDayTotal("sat");
	var sat_sams = 0;
	if($('#day6_sams').val() != '') {
		sat_sams = parseInt($('#day6_sams').val());
	}
	if(sat > sat_sams) {
		showAlert("Saturday");
		return false;
	}
	
	// Sunday
	var sun = getDayTotal("sun");
	var sun_sams = 0;
	if($('#day7_sams').val() != '') {
		sun_sams = parseInt($('#day7_sams').val());
	}
	if(sun > sun_sams) {
		showAlert("Sunday");
		return false;
	}
	
	return true;
	
}

function showAlert(day) {
	BootstrapDialog.alert("Timesheet Entered on " + day + " is more than its In-Time!!");
}

function getDayTotal(day) {
	var stId = "#" + day + "_st_total";
	var otId = "#" + day + "_ot_total";
	var nbId = "#" + day + "_nb_total";
	var dayTotal = 0;
	
	if($(stId).val() != '') {
		dayTotal += parseInt($(stId).val());
	}
	
	if($(otId).val() != '') {
		dayTotal += parseInt($(otId).val());
	}
	
	if($(nbId).val() != '') {
		dayTotal += parseInt($(nbId).val());
	}
	
	return dayTotal;
}
