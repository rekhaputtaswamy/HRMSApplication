function searchActions() {
	if($('#approvals_start_datepicker').val() == '' || $('#approvals_end_datepicker').val() == '') {
		BootstrapDialog.show({
            message: 'Enter Start and End Date',
            animate: false,
            buttons: [{
                label: 'OK',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }]
        });
		
	} else {
		$("#leave_approval_list").css({
			display : ""
		});
		
		$("#timesheet_approval_list").css({
			display : ""
		});
		
		$("#approvals_form").attr("action", "approvals");
	 	$("#approvals_form").attr("method", "post");
	 	$("#approvals_form").submit();
	}
}