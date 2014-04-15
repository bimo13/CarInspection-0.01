function logout(){
	
	$("#myDialogs").empty();
	$("#myDialogs").html("<div class=\"text-warning\">Sign Out</div>");
	
	$("#myDialogsText").removeClass("alert-success alert-info alert-warning alert-danger");
	$("#myDialogsText").addClass("alert-warning");
	$("#myDialogsText").html("Are you sure ?");
	
	$("#button-DialogYes").removeClass("btn-info btn-danger btn-warning btn-primary hide");
	$("#button-DialogNo").removeClass("hide");
	$("#button-DialogClose").removeClass("hide");
	
	$("#button-DialogYes").unbind();
	$("#button-DialogNo").unbind();
	$("#button-DialogClose").unbind();
	
	$("#button-DialogYes").addClass("btn-warning");
	$("#button-DialogYes").bind("click", function(){
		$("#AppDialogs").modal("hide");
		confirmLogout();
	});
	
	$("#button-DialogNo").bind("click", function(){
		$("#AppDialogs").modal("hide");
	});
	
	$("#button-DialogClose").addClass("hide");
	
	$("#pleasewait").modal('hide');
	$("#AppDialogs").modal();
	
}
	//-------------------------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------------------------

function confirmLogout(){
	
	$("#pleasewait").modal();
	
	$.post(
		// URL
		//
		"http://carsurvey.totalit.co.id/web-service/main-logout.php",
		// When Succeeded
		//
		function(data){
			if(data['status'] != 1){
				$("#myDialogs").empty();
				$("#myDialogs").html("<div class=\"text-danger\">Error !</div>");
				
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
				window.location.href="index.html";
			}
		},
		"json"
	);
	
}