$(document).ready(function() {
    //handle update
    $("#savebtn").click(function() {
        // alert("you clicked save");
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, {
                    type: "getCat"
                },
                function(response) {
                    if (confirm(JSON.stringify(response))) {
                        // alert('Thanks for confirming');
                        // alert(JSON.stringify(response));
                        var port = chrome.extension.connect({
                            name: "Sample Communication"
                        });
                        port.postMessage(response);
                        port.onMessage.addListener(function(msg) {
                            chrome.extension.getBackgroundPage().console.log("popup: message recieved" + msg);
                        });
                    } else {
                        alert('Why did you press cancel? You should have confirmed');
                    }
                });
        });
    });

    //allow update when enter is pressed
    $('input').keypress(function(e) {
        if (e.which == 13) {
            $("#savebtn").click();
            return false;
        }
    });

    chrome.extension.getBackgroundPage().console.log('>>> document > ready() called');
});