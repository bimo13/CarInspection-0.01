$('#form-DataPolis').validate({
	highlight: function(element) {
		$(element).closest('.form-group').addClass('has-error');
	},
	unhighlight: function(element) {
		$(element).closest('.form-group').removeClass('has-error');
	},
	errorElement: 'span',
	errorClass: 'help-block',
	errorPlacement: function(error, element) {
		if(element.parent('.input-group').length) {
			error.insertAfter(element.parent());
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler: function(form){
		checkInsData();
	}
});

function checkInsData(){
	
	$("#pleasewait").modal();
	var polis_no	=	$("#polis_no").val();
	
	$.post(
		// URL
		//
		"http://carsurvey.totalit.co.id/web-service/form-ins-cekDataPolis.php",
		// Data POST
		//
		{ polis_no: polis_no },
		// When Succeeded
		//
		function(data){
			if(data['status'] != 1){
				$("#myDialogs").empty();
				$("#myDialogs").html("<div class=\"text-danger\">Alert !</div>");
				
				$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
				$("#myDialogsText").addClass("alert-danger");
				$("#myDialogsText").html(data['message']);
				
				$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
				$("#button-DialogNo").removeClass("hide");
				$("#button-DialogClose").removeClass("hide");
				
				$("#button-DialogYes").unbind();
				$("#button-DialogNo").unbind();
				$("#button-DialogClose").unbind();
				
				$("#button-DialogClose").bind("click", function(){
					$("#AppDialogs").modal("hide");
				});
				
				$("#button-DialogYes").addClass("hide");
				$("#button-DialogNo").addClass("hide");
				
				$("#pleasewait").modal("hide");
				$("#AppDialogs").modal();
			}else{
				$("#pleasewait").modal("hide");
				
				$("#btn-conf-ins").addClass("hidden");
				$("#btn-del-ins").removeClass("hidden");
				$("#btn-del-ins").attr("data-value",data['return_data']['polis_no']);
				
				$("#polis_no").val("");
				$("#polis_no").val(data['return_data']['polis_no']);
				$("#kend_no_polisi").val(data['return_data']['kend_no_polisi']);
				
				$("#polis_no").attr("readonly", true);
				$("#kend_no_polisi").attr("readonly", true);
				$("#kend_no_polisi").removeClass("hidden");
				
				$("#polis_nama").val(data['return_data']['polis_nama']);
				$("#kend_merk").val(data['return_data']['kend_merk']);
				$("#kend_type").val(data['return_data']['kend_type']);
				$("#kend_tahun").val(data['return_data']['kend_tahun']);
				$("#kend_no_rangka").val(data['return_data']['kend_no_rangka']);
				$("#kend_no_mesin").val(data['return_data']['kend_no_mesin']);
			}
		},
		"json"
	);
}