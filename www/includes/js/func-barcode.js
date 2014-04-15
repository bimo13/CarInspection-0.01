var app = {
	
	initialize: function(){
		this.bindEvents();
	},
	
	bindEvents: function(){
		document.getElementById('btn-scan-barcode').addEventListener('click', this.scan, false);
	},
	
	scan: function(){
		
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");
		scanner.scan(function(result){
			
			if(result.cancelled === false){
				
				$("#pleasewait").modal();
				var polis_no	=	result.text;
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
							
							$("#pleasewait").modal('hide');
							$("#AppDialogs").modal();
						}//END if(data['status'] != 1)
						else{
							$("#myDialogs").empty();
							$("#myDialogs").html("<div class=\"text-success\">Alert !</div>");
							
							$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
							$("#myDialogsText").addClass("alert-success");
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
							
							$("#pleasewait").modal('hide');
							$("#AppDialogs").modal();
						}//END else if(data['status'] != 1)
						
					},// END function(data) //When Succeeded
					"json"
					
				);//END $.post
				
			}//END if(result.cancelled === false)
			
		},//END scanner.scan(function(result)
		function(error){
			$("#myDialogs").empty();
			$("#myDialogs").html("<div class=\"text-danger\">Alert !</div>");
			
			$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
			$("#myDialogsText").addClass("alert-danger");
			$("#myDialogsText").html("Scanning failed: ", error);
			
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
			
			$("#pleasewait").modal('hide');
			$("#AppDialogs").modal();
		});//END function(error)
		
	}//END scan: function()
	
};//END var app