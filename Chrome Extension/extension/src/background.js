chrome.runtime.onInstalled.addListener(function () {
console.log('inside chrome.runtime.onInstalled.addListener');
});

chrome.runtime.onMessage.addListener(
    function (dataPackage, sender) {
        sites = dataPackage.d1;
        openSource = biasCounts(JSON.parse(sites));

        console.log('data received from content.js');


        articleText = dataPackage.d2;

        // Create a new request to backend
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:3000", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(articleText);
        let input = xhr.responseText;
        console.log('hello soham : input = '+input);

        a = articleText.split(" ").length;
        b = parseFloat(JSON.parse(input).mag);
        x = b/a;
        if(b/a < .01){
            x = .01;
        }
        if (b/a > .02){
            x = .02;
        }

        y = emotiveLanguage(x);
        console.log(y + 'emotive' + openSource + 'BIAS');

        z = openSource + y;
        console.log('hello soham : z = '+z);
        chrome.runtime.sendMessage(JSON.stringify(z), function (response) {
        });

    });

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/BigMcLargeHuge/opensources/master/sources/sources.json", true);
xhr.send();
var result = xhr.responseText;


function emotiveLanguage(ratio) {
    return 99 * (1 - ((ratio - .01) / .01));
}

var biasCount = 0;

function biasCounts(sites) {
    biasCount = -1;
    for (let i = 0; i < sites.length; i++) {
        if (result.includes(sites[i])) {
            biasCount++;
            console.log(sites[i]);
        }
    }
    if (biasCount > -1) {
        return 0;
    }
    return 1;
}
