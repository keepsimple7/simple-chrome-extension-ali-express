chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    $.ajax({
        type: "POST",
        url: "http://localhost/save-cat.php",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({
            cats: msg,
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log("success->: ", data);
        },
        error: function(errMsg) {
            console.log("error->: ", errMsg);
            // alert("saved");
        }
    });
    sendResponse("Gotcha!");
});
