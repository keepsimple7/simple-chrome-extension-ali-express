document.onreadystatechange = function() {
    if (document.readyState == "complete") {
        var imgURL = chrome.extension.getURL("on48.png");
        var catLists = $('li.group-item');
        let subSelector = ".sub-group-item";
        // console.log('-->', catLists.length);
        if (catLists.length) {
            subSelector = ".sub-group-item";
        } else {
            catLists = $('li.category-block');
            subSelector = ".child-node";
        }
        for (const cat of catLists) {
            // console.log('-->', $(cat).find("a")[0].href);
            // console.log('-->', $(cat).find("a")[0].text);
            let catName = $(cat).find("a")[0].text;
            // $(cat).find("a")[0].after('<li><img src="https://picsum.photos/id/237/20/20" /></li>');
            $('<li class="added-item"><img src="' + imgURL + '" /></li>').insertAfter($(cat).find("a")[0])
            catResults.push({
                cat: catName,
                subCat: "",
                url: $(cat).find("a")[0].href,
            });
            var subCats = $(cat).find(subSelector);
            for (const sub of subCats) {
                // console.log('---->', $(sub).find("a")[0].href);
                // console.log('---->', $(sub).find("a")[0].text);
                $('<li class="added-item"><img src="' + imgURL + '" /></li>').insertAfter($(sub).find("a")[0])
                catResults.push({
                    cat: catName,
                    subCat: $(sub).find("a")[0].text,
                    url: $(sub).find("a")[0].href,
                });
            }
        }

        $(".added-item").click(function() {
            // alert("you clicked save");
            console.log($(this).prev('a')[0].href);
            let catObj = {
                cat: $(this).prev('a')[0].text,
                url: $(this).prev('a')[0].href,
            };
            if (confirm("Do you wanna save followings: "+JSON.stringify(catObj))) {
                chrome.runtime.sendMessage(catObj, function(response) {
                    console.log("Response: ", response);
                });
            } else {
                console.log('Why did you press cancel? You should have confirmed');
            }
        });
    }
}

var catResults = [];
// console.log("i am content!!!!!!!!!");
// alert(document.title);
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch (message.type) {
            case "getCat":
                sendResponse(catResults);
                break;
        }
    }
);