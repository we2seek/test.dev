var initSeconds = 0;
var timerId = 0;

// jQuery $(document).ready equivalent
document.addEventListener("DOMContentLoaded", function(event) {
	// timerId = setInterval(changeText, 1000);
    showHide("results");
    showHide("top_results");
    makeRequest(-1);
});

function changeText(){
	var timeText = document.getElementById("timeText");
	initSeconds++;
	timeText.textContent = secToHHMMSS(initSeconds, true);
}

function secToHHMMSS(seconds, animate){

	var msec = parseInt(seconds, 10);
    var sec = Math.floor(msec / 10);

    var hh = Math.floor(sec / 3600);
	var mm = Math.floor((sec - hh * 3600) / 60);
	var ss = Math.floor(sec - hh * 3600 - mm * 60);
    var zz =  msec - hh * 36000 - mm * 600 - ss * 10;

     // Sign : may disappear in results
    if (animate === true) {
	    var delimiter = (ss % 2 === 0) ? ":" : " ";
    } else {
        var delimiter = ":";
    }

	if (hh < 10) {
		hh = '0' + hh;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	if (ss < 10) {
		ss = '0' + ss;
	}

	return hh + delimiter + mm + delimiter + ss + "." + zz;
}

function fireStarter(){
	var tableResults = document.getElementById("results");
	var tableTopResults = document.getElementById("top_results");

	var button = document.getElementById("btnStart");
	var buttonText = button.textContent;
	if (buttonText === 'Stop') {
		window.clearInterval(timerId);
		button.textContent = "Start";
        tableResults.innerHTML = "<img src='/images/loading2.gif'>";
        tableTopResults.innerHTML = "<img src='/images/loading2.gif'>";
		makeRequest(initSeconds);
		initSeconds = 0;
	} else {
		timerId = setInterval(changeText, 100);
		button.textContent = "Stop";
	}
}

var httpRequest;

function makeRequest(seconds) {
	var url = "./php/coffee.php"
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        httpRequest = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.send('timer=' + encodeURIComponent(seconds));
}

function alertContents() {
	if (httpRequest.readyState == XMLHttpRequest.DONE ) {
		if(httpRequest.status == 200){
			var data = JSON.parse(httpRequest.responseText);
			var records = data.records;

			var html = "";
            records.forEach(function(item, i){
                html += "<tr><td>" + item["date"] + "</td><td>" +  secToHHMMSS(item["seconds"])	 + "</td></tr>";
            });
			document.getElementById("results").innerHTML = html;

            if (data["max_date"] != undefined && data["max_seconds"] != undefined) {
			    var html = "<tr><td>" + data["max_date"] + "</td><td>" + secToHHMMSS(data["max_seconds"]) + "</td></tr>";
    			document.getElementById("top_results").innerHTML = html;
            }
		} else {
			alert("Something went wrong with XMLHttpRequest: \r\n" 
				+ httpRequest.status + ": " + httpRequest.statusText);
		}
	}
}

function showHide(id){
    var table = document.getElementById(id);
    if (table.style.display === "none"){
        table.style.display = "";
    } else {
        table.style.display = "none";
    }
}