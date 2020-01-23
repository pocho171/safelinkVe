// JavaScript Document

function countChar(val) {
        var len = val.value.length;
		$('#charNum').text((280 - len) + " characters remaining");
        if (len > 280) {
			$('#charNum').css('color','red');
		}
		else {
		  $('#charNum').css('color','white');
        }
      }


function amperoctoplus(s) {
	s = s.replace(/&/g, '%26');
	s = s.replace(/#/g, '%23');
	s = s.replace(/\+/g, '%2B');
	s = s.replace(/@/g, '%40');
	s = s.replace(/:/g, '%3A');
	return s;
}

function makeFB() {
		
	document.fb.fboutput1.value = "https://www.facebook.com/sharer/sharer.php?u=" + amperoctoplus(encodeURI(document.fb.fburl.value));
	document.fb.fboutput2.value = "<a href=\"https://www.facebook.com/sharer/sharer.php?u=" + amperoctoplus(encodeURI(document.fb.fburl.value)) + "\">Share on Facebook</a>";
	if (document.getElementById("fboutputwrapper").style.display !== "block") {
		 $('#fboutputwrapper').slideToggle('fast');
	}
}

function makeTw() {
	
	/* Clean up ampersands, octothorpes, and pluses */
	var $tweetnew = encodeURI(document.tw.tweet.value);
	$tweetnew = amperoctoplus($tweetnew);
	
	document.tw.twoutput.value = "https://twitter.com/intent/tweet?text=" + $tweetnew;
	document.tw.twoutput2.value = "<a href=\"https://twitter.com/intent/tweet?text=" + $tweetnew + "\">Share on Twitter</a>";
	if (document.getElementById("twoutputwrapper").style.display !== "block") {
		 $('#twoutputwrapper').slideToggle('fast');
	}
}

function makeLI() {
	
	/* Clean up ampersands, octothorpes, and pluses */
	var $lititlenew = encodeURI(document.li.lititle.value);
	$lititlenew = amperoctoplus($lititlenew);
	var $lisummarynew = encodeURI(document.li.lisummary.value);
	$lisummarynew = amperoctoplus($lisummarynew);
	
	document.li.lioutput1.value = "https://www.linkedin.com/shareArticle?mini=true&url=" + amperoctoplus(encodeURI(document.li.liurl.value)) + "&title=" + amperoctoplus($lititlenew) + "&summary=" + amperoctoplus($lisummarynew) + "&source=" + amperoctoplus(encodeURI(document.li.lisource.value));
	document.li.lioutput2.value = "<a href=\"https://www.linkedin.com/shareArticle?mini=true&url=" + amperoctoplus(encodeURI(document.li.liurl.value)) + "&title=" + amperoctoplus($lititlenew) + "&summary=" + amperoctoplus($lisummarynew) + "&source=" + amperoctoplus(encodeURI(document.li.lisource.value)) + "\">Share on LinkedIn</a>";
	if (document.getElementById("lioutputwrapper").style.display !== "block") {
		 $('#lioutputwrapper').slideToggle('fast');
	}
}


function makePin() {
	
	/* Clean up ampersands, octothorpes, and pluses */
	var $pinimagenew = encodeURI(document.pin.pinimage.value);
	$pinimagenew = amperoctoplus($pinimagenew);
	var $pinsummarynew = encodeURI(document.pin.pinsummary.value);
	$pinsummarynew = amperoctoplus($pinsummarynew);
	
	document.pin.pinoutput1.value = "https://pinterest.com/pin/create/button/?url=" + amperoctoplus(encodeURI(document.pin.pinurl.value)) + "&media=" + $pinimagenew + "&description=" + $pinsummarynew;
	document.pin.pinoutput2.value = "<a href=\"https://pinterest.com/pin/create/button/?url=" + amperoctoplus(encodeURI(document.pin.pinurl.value)) + "&media=" + $pinimagenew + "&description=" + $pinsummarynew + "\">Pin on Pinterest</a>";
	if (document.getElementById("pinoutputwrapper").style.display !== "block") {
		 $('#pinoutputwrapper').slideToggle('fast');
	}
}


function makeEmail() {
	
	/* Clean up ampersands, octothorpes, and pluses in the email body */
	var $emailbody = amperoctoplus(encodeURI(document.email.emailbody.value));
	/*$emailbody = amperoctoplus($emailbody);*/
	
	var $emailrecipient;
	$emailrecipient = "mailto:" + document.email.emailrecipient.value + "?";

	
	var $emailstring = "";
		
	if (document.email.emailcc.value !== "") {
		$emailstring = $emailstring + "&cc=" + document.email.emailcc.value;
	}
	if (document.email.emailbcc.value !== "") {
		$emailstring = $emailstring + "&bcc=" + document.email.emailbcc.value;
	}
	
	if (document.email.emailsubject.value !== "") {
		$emailstring = $emailstring + "&subject=" + amperoctoplus(encodeURI(document.email.emailsubject.value));
	}
	
	if (document.email.emailbody.value !== "") {
		$emailstring = $emailstring + "&body=" + $emailbody;
	}
		
	var $emailstringfinal;
	
	$emailstringfinal = $emailrecipient + $emailstring.slice(1);
	
	document.email.emailoutput1.value = $emailstringfinal;
	
	document.email.emailoutput2.value = "<a href=\"" + $emailstringfinal + "\">Send Email</a>";
	
	if (document.getElementById("emailoutputwrapper").style.display !== "block") {
		 $('#emailoutputwrapper').slideToggle('fast');
	}
}
