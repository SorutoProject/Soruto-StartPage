function search(){
	var searchValue = $("#text2").val();
	var sw = encodeURI(searchValue);
	var service = encodeURI(document.getElementById("text1").value.toLowerCase()).split("%").join("");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "services/" + service + ".txt", true);
		xhr.onreadystatechange = function(){
    		// 本番用
    		if (xhr.readyState === 4 && xhr.status === 200){
				openPage(xhr.responseText,sw);
    		}
			// ローカルファイル用
			if (xhr.readyState === 4 && xhr.status === 0){
      		openPage(xhr.responseText,sw);
    		}
			if(xhr.readyState === 4 && xhr.status === 404){
				alert("指定されたサービスは登録されていません。");
			}
  		};
  xhr.send(null);
}
function openPage(url,w){
		var swurl = url.split("*").join(w);
		location.href=swurl;
}
$(function() {
				$('#text1').autocomplete({
                    source: ["Google","Yahoo","YouTube","ニコニコ動画"],
                    autoFocus: true,
                    delay: 300,
                    minLength: 1,
                });
                $('#text2').autocomplete({
                    source: function(request, response) {
                        $.ajax({
                            url: "https://www.google.com/complete/search",
                            data: {hl:'ja', client:'firefox', q: request.term},
                            dataType: "jsonp",
                            type: "GET",
                            success :function(data) {
                                response(data[1]);
                            }
                        });
                    },
                    autoFocus: true,
                    delay: 300,
                    minLength: 1,
                });
            });