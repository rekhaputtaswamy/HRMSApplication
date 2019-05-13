var action = "", loc = "";
var sPath = "", sPage="";
var searchClicked = false;

$(document).ready(function() {
	sPath = window.location.pathname;
	sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
	
	if(sPage.trim() == "" || sPage.trim() == "login") {
		hideLogout(true);
		clearLocalStorage();
		
	} else if (sPage.trim() == "home" && localStorage.getItem("isProfileSaved").trim() == "") {
		hideLogout(false);
		localStorage.setItem("isProfileSaved", true);
		saveValues();
	} else {
		hideLogout(false);
	}
	
	if(searchClicked == true) {
		disableFields(false);
	}
	
	$("#back").click(function() {
		action = "";
        location.href = $('#ctx').val() + "/home";
	});
	
});

$(function () {
    setNavigation();
});

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".nav a").each(function () {
        if (path.substring(0, href.length) === 'href') {
        	loc = $(this).closest('li').addClass('active');
        }
    });
    
}

function modifyProfile() {
	if($("#modify").text() == 'Modify') {
		action = "modify";
		restoreValues();
		$("#add").prop("disabled", 'disabled');
	} else {
		action = "list_modify";
	}
	$("#role").css({
		display : ""
	});
	
	disableFields(false);
	$("#submit").prop("disabled", false);
	$("#emp_number").prop("readonly", true);
	$("#email_id").prop("readonly", true);	
	
	
	$("#employement_type").hide();
	alert("employement_type--" + localStorage.getItem("employement_type"));
	$("#employement_drop").val(localStorage.getItem("employement_type"));
	$("#employement_drop").show();
	
	$("#gender").hide();
	alert("gender--" + localStorage.getItem("gender"));
	$("#gender_drop").val(localStorage.getItem("gender"));
	$("#gender_drop").show();
	
	$("#dob").hide();
	$("#dob_input").val(localStorage.getItem("dob"));
	$("#dob_input").show();
	$('#dob_datePicker').show();

    $("#doj").hide();
    $("#doj_input").val(localStorage.getItem("doj"));
    $("#doj_input").show();
    $('#doj_datePicker').show();

    $("#start_date").hide();
    $("#start_date_input").val(localStorage.getItem("start_date"));
    $("#start_date_input").show();
    $('#start_date_datePicker').show();

    $("#end_date").hide();
    $("#end_date_input").val(localStorage.getItem("end_date"));
    $("#end_date_input").show();
    $('#end_date_datePicker').show();
    
    $("#department").hide();
    alert("department--" + localStorage.getItem("department"));
	$("#department").val(localStorage.getItem("department"));
	$("#department_list").show();

}

function addProfile() {
	action = "add";
	clearValues();
	disableFields(false);
	$("#role").css({
		display : ""
	});
	$("#submit").prop("disabled", false);
	$("#modify").prop("disabled", 'disabled');
	
	$("#gender").hide();
	$("#gender_drop").show();
	$("#employement_type").hide();
	$("#employement_drop").show();
	$("#department").hide();
	$("#department_list").show();
	
}

function deleteProfile() {
	BootstrapDialog.confirm('Are you sure you want to delete the Profile?', function(result){
		if(result) {
            location.href = $('#ctx').val() + "/empinfo?delete=" + $('#emp_number').val();
        }
    });
}

function enableBack(value) {
	if(value == true) {
		$("#emp_back").css({
			display : ""
		});
		$("#add").css({
			display : "none"
		});
		$("#delete").css({
			display : ""
		});
		$("#modify").text('Edit');
		action = "list_modify";
	} else {
		$("#emp_back").css({
			display : "none"
		});
		$("#add").css({
			display : ""
		});
		$("#delete").css({
			display : "none"
		});
	}
	
}

function backToList() {
	enableBack(false);
	window.history.back();
}

function submitChanges() {
	$("#modify").prop("disabled", false);
	$("#add").prop("disabled", false);
	
	if(action.trim() == "modify") {
		callAction("modify", "post");
		saveValues();
	} else if(action.trim() == "list_modify") {
		callAction("modify", "post");
	} else if(action.trim() == "add") {
		callAction("add", "post");
	}
}

function callAction(actionVal, methodVal) {
	$("#emp_form").attr("action", actionVal);
	$("#emp_form").attr("method", methodVal);
	$("#emp_form").submit();
}

function hideLogout(value) {
	if(value == true) {
		$("#logout").css({
			display : "none"
		});
	} else {
		$("#logout").css({
			display : "block"
		});
	}
}

function setAction(action) {
	var img = " <span class=\"icon-cog icon-white\"></span><span class=\"caret\"></span>";
	$('#dropdownval').text(action).append(img);
}

function saveValues() {
	if(localStorage.getItem("emp_number") == "" || localStorage.getItem("emp_number") === null || $('#emp_number').val() == localStorage.getItem("emp_number")) {
		localStorage.setItem("name", $('#emp_name').val());
		localStorage.setItem("gender", $('#gender').val());
		localStorage.setItem("designation", $('#emp_position').val());
		localStorage.setItem("emp_number", $('#emp_number').val());
		localStorage.setItem("primary_contact", $('#primary_contact').val());
		localStorage.setItem("emergency_contact", $('#emergency_contact').val());
		localStorage.setItem("dob", $('#dob').val());
		localStorage.setItem("pan", $('#pan').val());
		localStorage.setItem("doj", $('#doj').val());
		localStorage.setItem("department", $('#department').val());
		localStorage.setItem("email_id", $('#email_id').val());
		localStorage.setItem("address", $('#address').val());
		localStorage.setItem("aadhar", $('#aadhar').val());
		localStorage.setItem("acc_no", $('#acc_no').val());
		localStorage.setItem("passport_no", $('#passport_no').val());
		localStorage.setItem("first_degree", $('#first_degree').val());
		localStorage.setItem("sec_degree", $('#sec_degree').val());
		localStorage.setItem("specialisation", $('#specialisation').val());
		localStorage.setItem("employer", $('#employer').val());
		localStorage.setItem("start_date", $('#start_date').val());
		localStorage.setItem("end_date", $('#end_date').val());
		localStorage.setItem("remarks", $('#remarks').val());
		localStorage.setItem("employement_type", $('#employement_type').val());
		localStorage.setItem("first_spec", $('#first_spec').val());
		localStorage.setItem("sec_spec", $('#sec_spec').val());
	}
	
}

function clearLocalStorage() {
	localStorage.setItem("isProfileSaved", "");	
	localStorage.setItem("role", "");	
	localStorage.setItem("name", "");
	localStorage.setItem("gender", "");
	localStorage.setItem("designation", "");
	localStorage.setItem("emp_number", "");
	localStorage.setItem("dob", "");
	localStorage.setItem("pan", "");
	localStorage.setItem("doj", "");
	localStorage.setItem("department", "");
	localStorage.setItem("email_id", "");
	localStorage.setItem("address", "");
	localStorage.setItem("aadhar", "");
	localStorage.setItem("acc_no", "");
	localStorage.setItem("passport_no", "");
	localStorage.setItem("first_degree", "");
	localStorage.setItem("sec_degree", "");
	localStorage.setItem("specialisation", "");
	localStorage.setItem("employer", "");
	localStorage.setItem("start_date", "");
	localStorage.setItem("end_date", "");
	localStorage.setItem("remarks", "");
	localStorage.setItem("employement_type", "");
	localStorage.setItem("primary_contact", "");
	localStorage.setItem("emergency_contact", "");
	localStorage.setItem("first_spec", "");
	localStorage.setItem("sec_spec", "");
}

function clearValues() {
	$('#emp_name').val('');
	$('#emp_position').val('');
	$('#emp_number').val('');
	$('#dob').val('');
	$('#pan').val('');
	$('#doj').val('');
	$('#department').val('');
	$('#email_id').val('');
	$('#mob_no').val('');
	$('#address').val('');
	$('#aadhar').val('');
	$('#acc_no').val('');
	$('#passport_no').val('');
	$('#first_degree').val('');
	$('#sec_degree').val('');
	$('#specialisation').val('');
	$('#employer').val('');
	$('#start_date').val('');
	$('#end_date').val('');
	$('#remarks').val('');
	$('#employement_type').val('');
	$('#primary_contact').val('');
	$('#emergency_contact').val('');
	$('#first_spec').val('');
	$('#sec_spec').val('');
	$('#gender').val('');
	$("#gender_drop").val('');
	
	$("#gender").hide();
	$("#gender_drop").show();
}

function restoreValues() {
	$('#emp_name').val(localStorage.getItem("name"));
	$('#gender').val(localStorage.getItem("gender"));
	$('#emp_position').val(localStorage.getItem("designation"));
	$('#emp_number').val(localStorage.getItem("emp_number"));
	$('#dob').val(localStorage.getItem("dob"));
	$('#pan').val(localStorage.getItem("pan"));
	$('#doj').val(localStorage.getItem("doj"));
	$('#department').val(localStorage.getItem("department"));
	$('#email_id').val(localStorage.getItem("email_id"));
	$('#address').val(localStorage.getItem("address"));
	$('#aadhar').val(localStorage.getItem("aadhar"));
	$('#acc_no').val(localStorage.getItem("acc_no"));
	$('#passport_no').val(localStorage.getItem("passport_no"));
	$('#first_degree').val(localStorage.getItem("first_degree"));
	$('#sec_degree').val(localStorage.getItem("sec_degree"));
	$('#specialisation').val(localStorage.getItem("specialisation"));
	$('#employer').val(localStorage.getItem("employer"));
	$('#start_date').val(localStorage.getItem("start_date"));
	$('#end_date').val(localStorage.getItem("end_date"));
	$('#remarks').val(localStorage.getItem("remarks"));
	$('#employement_type').val(localStorage.getItem("employement_type"));
	$('#primary_contact').val(localStorage.getItem("primary_contact"));
	$('#emergency_contact').val(localStorage.getItem("emergency_contact"));
	$('#first_spec').val(localStorage.getItem("first_spec"));
	$('#sec_spec').val(localStorage.getItem("sec_spec"));
	
}

function empinfo() {
    console.log('empinfo: contextPath'+contextPath);
	setEditStatus(false);
	restoreValues();

	//Screens
	$("#emp_info_tab").css({
		display : ""
	});
	$("#timesheet_tab").css({
		display : "none"
	});
	$("#leave_tab").css({
		display : "none"
	});
	$("#report_tab").css({
		display : "none"
	});
	$("#approval_tab").css({
		display : "none"
	});
	
	//Admin
	$("#timesheet").css({
		display : "none"
	});
	$("#leave").css({
		display : "none"
	});
	$("#empinfo").css({
		display : ""
	});
	$("#reports").css({
		display : "none"
	});
	$("#approve").css({
		display : "none"
	});
	$("#role").css({
		display : "none"
	});
	
	$("#modify").text('Modify');
	
	enableBack(false);
	action = "";
    location.href = $('#ctx').val() + "/empinfo";	
}

function timesheetData() {
    location.href = $('#ctx').val() + "/getProjects";
}

function timesheet() {
	setEditStatus(false);
	
	//Screens
	$("#emp_info_tab").css({
		display : "none"
	});
	$("#timesheet_tab").css({
		display : ""
	});
	$("#leave_tab").css({
		display : "none"
	});
	$("#report_tab").css({
		display : "none"
	});
	$("#approval_tab").css({
		display : "none"
	});
	
	//Admin
	$("#timesheet").css({
		display : ""
	});
	$("#leave").css({
		display : "none"
	});
	$("#empinfo").css({
		display : "none"
	});
	$("#reports").css({
		display : "none"
	});
	$("#approve").css({
		display : "none"
	});
	
	$("#create_task_div").css({
		display : "none"
	});
	
	$("#first_container").css({
		display : ""
	});
	
	$("#timesheetentry").css({
		display : ""
	});
	
	$("#timesheetprofile").css({
		display : "none"
	});
	
	$("#approval_list").css({
		display : "none"
	});
    location.href =  $('#ctx').val()+"/timesheet";
}

function callAlert(msg) {
	BootstrapDialog.confirm(msg);
}

function leave() {
	setEditStatus(false);
	//Screens
	$("#emp_info_tab").css({
		display : "none"
	});
	$("#timesheet_tab").css({
		display : "none"
	});
	$("#leave_tab").css({
		display : ""
	});
	$("#report_tab").css({
		display : "none"
	});
	$("#approval_tab").css({
		display : "none"
	});
	
	//Admin
	$("#timesheet").css({
		display : "none"
	});
	$("#leave").css({
		display : ""
	});
	$("#empinfo").css({
		display : "none"
	});
	$("#reports").css({
		display : "none"
	});
	$("#approve").css({
		display : "none"
	});
    location.href = $('#ctx').val() + "/leave";
	
}

function report() {
	setEditStatus(false);
	//Screens
	$("#emp_info_tab").css({
		display : "none"
	});
	$("#timesheet_tab").css({
		display : "none"
	});
	$("#leave_tab").css({
		display : "none"
	});
	$("#report_tab").css({
		display : ""
	});
	$("#approval_tab").css({
		display : "none"
	});
	
	//Admin
	$("#timesheet").css({
		display : "none"
	});
	$("#leave").css({
		display : "none"
	});
	$("#empinfo").css({
		display : "none"
	});
	$("#reports").css({
		display : ""
	});
	$("#approve").css({
		display : "none"
	});
    location.href = $('#ctx').val() + "/report";
}

function approval() {
	setEditStatus(false);
	//Screens
	$("#emp_info_tab").css({
		display : "none"
	});
	$("#timesheet_tab").css({
		display : "none"
	});
	$("#leave_tab").css({
		display : "none"
	});
	$("#report_tab").css({
		display : "none"
	});
	$("#approval_tab").css({
		display : ""
	});
	
	//Admin
	$("#timesheet").css({
		display : "none"
	});
	$("#leave").css({
		display : "none"
	});
	$("#empinfo").css({
		display : "none"
	});
	$("#reports").css({
		display : "none"
	});
	$("#approve").css({
		display : ""
	});

   
    location.href = $('#ctx').val() + "/approval";
}

function setEditStatus(value) {
	if (value == false) {
		
		$("#submit").css({
			display : "none"
		});
		$("#actionslist").css({
			display : "none"
		});
		$("#modify").css({
			display : "none"
		});
		$("#add").css({
			display : "none"
		});
		
		searchClicked = false;

	} else {
		setAction("Action");

		$("#submit").css({
			display : ""
		});
		$("#actionslist").css({
			display : ""
		});
		
		$("#modify").css({
			display : ""
		});
		$("#add").css({
			display : ""
		});
		
		$("#submit").attr('disabled', 'disabled');
	}
	
	disableFields(true);
	
}

function disableFields(value) {
	
	// readonly property set to true - Non editable
	// readonly property set to false - editable
	$("#emp_number").prop("readonly", value);
	$("#address").prop("readonly", value);
	$("#emp_name").prop("readonly", value);
	$("#gender").prop("readonly", value);
	$("#primary_contact").prop("readonly", value);
	$("#emergency_contact").prop("readonly", value);
	$("#dob").prop("readonly", value);
	$("#pan").prop("readonly", value);
	$("#emp_position").prop("readonly", value);
	$("#doj").prop("readonly", value);
	$("#project").prop("readonly", value);
	$("#department").prop("readonly", value);
	$("#email_id").prop("readonly", value);
	$("#mob_no").prop("readonly", value);
	$("#aadhar").prop("readonly", value);
	$("#acc_no").prop("readonly", value);
	$("#passport_no").prop("readonly", value);
	$("#doi").prop("readonly", value);
	$("#doe").prop("readonly", value);
	$("#first_degree").prop("readonly", value);
	$("#sec_degree").prop("readonly", value);
	$("#specialisation").prop("readonly", value);
	$("#employer").prop("readonly", value);
	$("#start_date").prop("readonly", value);
	$("#end_date").prop("readonly", value);
	$("#remarks").prop("readonly", value);
	$("#employement_type").prop("readonly", value);
	$("#first_spec").prop("readonly", value);
	$("#sec_spec").prop("readonly", value);
	$("#place_of_issue").prop("readonly", value);
	$("#bank").prop("readonly", value);
	
	$('#search_id').prop('readonly', false);
	
	
}

function provideAdminAccess(role) {
	if(role != '' && localStorage.getItem("role") == '') {
		localStorage.setItem("role", role);
	}
	
	if (role == '1' ) {
		$("#emp_admin").css({display : ""});
		$("#timesheet_admin").css({display : ""});
		$("#leave_admin").css({display : ""});
		$("#reports_admin").css({display : ""});
		$("#approvals_admin").css({display : ""});
		$("#approval_tb").css({display : ""});
	} 
}