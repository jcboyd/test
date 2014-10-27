var userID;
var wordID;
function get_random() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            obj = JSON.parse(xmlhttp.responseText);
            document.getElementById("word").innerHTML = obj.Word;
            document.getElementById("definition").innerHTML = obj.Definition;
        }
    }
    xmlhttp.open("GET","get_random.php", true);
    xmlhttp.send();
}

function get_ranked() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            obj = JSON.parse(xmlhttp.responseText);
            wordID = obj.ID;
            document.getElementById("word").innerHTML = obj.Word;
            document.getElementById("part_of_speech").innerHTML = obj.PartOfSpeech;
            document.getElementById("def1").innerHTML = obj.Definition;
        }
    }
    document.getElementById("definition").value = "";
    xmlhttp.open("GET","get_ranked.php", true);
    xmlhttp.send();
}

function submit_definition() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var definition = document.getElementById("definition").value;
    xmlhttp.open("GET","submit_definition.php?wordID=" + wordID + "&definition=" + definition + "&userID=" + userID, true);
    xmlhttp.send();
}

function check_user(response) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            obj = JSON.parse(xmlhttp.responseText);
            if(obj.CheckResult == 1) {
                document.getElementById('greeting').innerHTML = 'Welcome back, ' + response.name + '!';
            }
            else {
                document.getElementById('greeting').innerHTML = 'Welcome, ' + response.name + '!';
            }
        }
        userID = response.id;
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","check_user.php?userID=" + response.id + "&noCache=" + "noCache", true);
    xmlhttp.send();
}