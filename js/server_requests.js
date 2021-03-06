var userID;
var wordID;
var definitionID;
var groupID;

var translationID;

//TODO: GENERALISE SERVER REQUESTS

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
    xmlhttp.open("GET","php/get_random.php", true);
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
            var results_array = JSON.parse(xmlhttp.responseText);

            clear_definitions();
            wordID = results_array[0].WordID;
            groupID = results_array[0].GroupID;
            // if(results_array[0].Consensus == 1) {
            //     set_consensus_word(results_array[0].Word, results_array[0].PartOfSpeech, results_array[0].Definition);
            //     add_definition(results_array[0].DefinitionID, '✓ That is a good definition');
            //     for(var i = 1; i < results_array.length; i++) {
            //         if(results_array[i].Definition != undefined) {
            //             add_definition(results_array[i].DefinitionID, results_array[i].Definition);
            //         }
            //     }
            // }
            // else {
            set_word(results_array[0].Word, results_array[0].PartOfSpeech);
            add_definition(-1, "? I can't say - skip this one...", 'definitions');

            document.getElementById("consensus").innerHTML = "General Sense:";

            for(var i = 0; i < results_array.length; i++) {
                if(results_array[i].Author == 'wordnet') {
                    set_consensus(results_array[i].Definition);
                    add_definition(results_array[i].DefinitionID, "▶ Keep the General Sense. It's a good definition as is!");
                }
                else if(results_array[i].Definition != undefined) {
                    add_definition(results_array[i].DefinitionID, "▶ " + results_array[i].Definition);
                }
            }
            // }
            definitionID = -1;
        }
    }
    // alert(token);
    // document.getElementById("token").innerHTML = token;
    xmlhttp.open("GET","php/get_ranked.php?userID=" + userID + "&token=" + token, true);
    xmlhttp.send();
}

function submit_definition(definition) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","php/submit_definition.php?wordID=" + wordID + "&groupID=" + groupID  + "&definition=" + definition + "&userID=" + userID, true);
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
                // document.getElementById('greeting').innerHTML = 'Welcome back, ' + response.name + '!';
                // document.getElementById('profile_name').innerHTML = response.name;
            }
            else {
                // document.getElementById('greeting').innerHTML = 'Welcome, ' + response.name + '!';
                // document.getElementById('profile_name').innerHTML = response.name;
            }
            set_greeting(response.name);
            userID = response.id;
            initialise(userID);
        }
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","php/check_user.php?userID=" + response.id + "&noCache=" + noCache, true);
    xmlhttp.send();
}

function get_user_stats() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            // alert(xmlhttp.responseText);
            var obj = JSON.parse(xmlhttp.responseText);
            set_profile_data(obj.UserID, obj.Points, obj.PositionMode1, obj.Notify);
        }
    }
    // document.getElementById("token").innerHTML = token;
    xmlhttp.open("GET","php/get_profile.php?userID=" + userID + "&token=" + token, true);
    xmlhttp.send();
}

function get_user_trophies() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var results_array = JSON.parse(xmlhttp.responseText);
            if(results_array != undefined) {
                for(var i = 0; i < results_array.length; i++) {
                    if(results_array[i].Definition != undefined) {
                        add_trophy(results_array[i].Word, results_array[i].Definition);
                    }
                }
            }
        }
    }
    xmlhttp.open("GET","php/get_trophies.php?userID=" + userID, true);
    xmlhttp.send();
}

function submit_vote(definition_id, vote) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","php/submit_vote.php?wordID=" + wordID + "&definitionID=" + definition_id + "&vote=" + vote, true);
    xmlhttp.send();
}

function report_spam() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","php/report_spam.php?wordID=" + wordID + "&definitionID=" + definitionID + "&userID=" + userID, true);
    xmlhttp.send();
}

function complete_notification() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","php/complete_notification.php?userID=" + userID, true);
    xmlhttp.send();
}

function get_ranked_mode_2() {
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
            document.getElementById("translation_word").innerHTML = obj.Word;
            document.getElementById("translation_pos").innerHTML = obj.PartOfSpeech;
            document.getElementById("translation_definition").innerHTML = "General Sense: " + obj.Definition;

            var underscored_word = obj.Word.replace(" /g", "_");

            document.getElementById("wiktionary").href = "https://en.wiktionary.org/wiki/" + underscored_word;
            document.getElementById("dictionary").href = "http://dictionary.reference.com/browse/" + underscored_word;
            document.getElementById("wordnik").href = "https://www.wordnik.com/words/" + underscored_word;
            translationID = obj.ID;
            // var newBottom = document.getElementById("translation_entry").getBoundingClientRect().bottom;
            // var intString = (newBottom + 100).toString() + "px";
            // document.getElementById("translation_input_tool_box").style.top="100px";
        }
    }
    xmlhttp.open("GET","php/get_ranked_mode_2.php?userID=" + userID, true);
    xmlhttp.send();
}

function submit_translation(translation) {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var noCache = new Date().getTime();
    xmlhttp.open("GET","php/submit_translation.php?translation=" + translation + "&wordID=" + translationID + "&userID=" + userID + "&noCache=" + noCache, true);
    xmlhttp.send();
}
