chrome.runtime.onMessage.addListener(function (z, sender) {
    console.log('coming inside the pop up');
    console.log(JSON.parse(z));
    awesome(JSON.parse(z));
});


function awesome(z)
{
    $('.chart').data('easyPieChart').update(z);
    if (z > 80) {
        $('.chart').data('easyPieChart').options.barColor = '#3BC865';
    } else if (z > 60) {
        $('.chart').data('easyPieChart').options.barColor = '#CEEA44';
    } else if (z > 30) {
        $('.chart').data('easyPieChart').options.barColor = '#F1B95A';
    } else if (z > 30) {
        $('.chart').data('easyPieChart').options.barColor = '#FFFFFF';
    }
    z = Math.floor(z);
    console.log('value of z = '+z);
    $("#valuee").text(z+"%");
}

function clickHandler(e)
{
    setTimeout(awesomeTask, 1000);
}

function main()
{

}


$(function ()
{
    $('button').click(clickHandler);
    $('.chart').easyPieChart({
        size: 100,
        barColor: '#17d3e6',
        scaleColor: false,
        lineWidth: 10,
        trackColor: '#373737',
        animate: 2500,
        lineCap: 'circle',
        display: true,
        text: '%',
    })
});

$(document).ready(function ()
{

    console.log('ready');


    var link2 = document.getElementById("snopes");
    if(link2)
    {
        link2.addEventListener("click", function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.update(tab.id, { url: 'https://www.snopes.com/' }, function () {

            });
        });
    }, false);
    }


    window.addEventListener('resize', (e) => {
        console.log(e);
        $('.main-container').addClass('animated fadeIn');
    });
});