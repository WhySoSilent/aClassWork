$(window).ready(function(){
	$(window).bind("beforeunload",function(event) {
		return " 确定要离开现在的页面吗 ？";	//比想象中简单的确认方法
	});
	
	var mark ={
		fenShu: 0
		};
	
	$("a.aButton").bind("click",function(event) {
		if(confirm("当真要交？")) {
			var sendParameter = "stu_id="+ $("#stu_id").attr("value") +"&rightAnswers="+ mark.fenShu + "&answer1=" + $("#qu1")[0].value + "&answer2=no&answer3=no";
							$.ajax({
							   type: "POST",
							   url: GlobalVariables.sendMsgAjaxPath,
							   cache: false,
							   data: sendParameter,
							   success: function(JSON){

										var response = eval ("(" + JSON + ")");
										if(response.response === "ok") {
										}
								}
							});
			//alert(sendParameter);
			alert("发鸟～");
		}else {
		}
	});
	
	$aKeyWord = $(".aKeyWord");
	
	$aKeyWord.bind("blur",function(){
		var rightAnswer = $(this).attr("data-rightAnswer");
		var studentInput = $(this).attr("value");
		
		if(studentInput === "") {
			$(this).removeClass("wrongInput");
			$(this).removeClass("rightInput");
			return;
		}
		if(studentInput === rightAnswer) {
			$(this).removeClass("wrongInput");
			$(this).addClass("rightInput");
			mark.fenShu ++;
		} else {
			$(this).removeClass("rightInput");
			$(this).addClass("wrongInput");
			if(mark.fenShu === 0) {
				return;
			}
			else {
				mark.fenShu--;
			}
		}
	});
});

var  GlobalVariables = {
	sendMsgAjaxPath: "temp.php",
}