function applyLeave() {
	$("#leave_form").attr("action", "applyLeave");
	$("#leave_form").attr("method", "post");
	$("#leave_form").submit();
}