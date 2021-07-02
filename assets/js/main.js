jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    /* Bootstrap Tooltip for Skillset */
    // $('.level-label').tooltip();
    
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    
    // $("#rss-feeds").rss(
    
    //     //Change this to your own rss feeds
    //     "http://feeds.feedburner.com/TechCrunch/startups",
        
    //     {
    //     // how many entries do you want?
    //     // default: 4
    //     // valid values: any integer
    //     limit: 3,
        
    //     // the effect, which is used to let the entries appear
    //     // default: 'show'
    //     // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
    //     effect: 'slideFastSynced',
        
    //     // outer template for the html transformation
    //     // default: "<ul>{entries}</ul>"
    //     // valid values: any string
    //     layoutTemplate: "<div class='item'>{entries}</div>",
        
    //     // inner template for each entry
    //     // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
    //     // valid values: any string
    //     entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        
    //     }
    // );
    
    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    // GitHubCalendar("#github-graph", "IonicaBizau");
    
    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({
        username: "prroffessorr",
        selector: "#ghfeed",
        limit: 10 // optional
    });

    //Load more items
    $('.list-loadmore li:lt(3)').show();
    $('.list-loadmore li').not(':lt(3)').hide(300);
    $('.less').hide();
    var items =  document.getElementById('list-loadmore').getElementsByTagName('li').length;
    var shown =  3;
    $('.more').click(function () {
        shown = $('.list-loadmore li:visible').length+3;
        if(shown< items) {
          $('.list-loadmore li:lt('+shown+')').show(300);
        } else {
          $('.list-loadmore li:lt('+items+')').show(300);
          $('.more').hide();
          $('.less').show();
         
        }

        $('html,body').animate({
             scrollTop: $(this).offset().top
        }, 1000);
    });

    $('.less').click(function () {

        window.scroll({top: document.getElementById("aside").offsetTop, left: 0, behavior: 'smooth'});
        $('.list-loadmore li').not(':lt(3)').hide(300);
        $('.more').show();
        $('.less').hide();
    });
});

//Получаю текущее местоположение
var url = location.href;
//Получаю текущее местоположение
var current_postion=url.substring(0,url.indexOf("Index"));

//Получение информации об пользователе
$.get("https://ipinfo.io", function(response) {

localStorage.setItem('current_country', "RU");
//Многоязычность контента
var langArray = [
    {value: "val1", text: "RU", lang: "ru", description_first: "Перейти на русскоязычную версию сайта ?", description_second: "(Получено на основе вашего местоположения)"},
    {value: "val2", text: "UA", lang: "ua", description_first: "Перейти на украінськомовну версію сайту ?", description_second: "(Отримано на основі вашого місця розташування)"},
    {value: "val3", text: "EN", lang: "en", description_first: "Go to the English version of the site ?", description_second: "(Obtained based on your location)"},
];

var select = document.getElementById('options'),
    option,
    i = 0,
    length = langArray.length;
    
    //Создаем ешементы в Select
    for(var i=0; i<length; i++){
        option = document.createElement('option');
        option.setAttribute('value', langArray[i].value);
        option.appendChild(document.createTextNode(langArray[i].text));
        select.appendChild(option);

        //Переводим человека на нужную страницу
        if(langArray[i].text == response.country && response.country != localStorage.getItem('current_country')){
            //Редиректим пользователя на страницу с переводом
            if(window.location.href != current_postion + "Index-" + langArray[i].lang + ".html"){
                var description_first = langArray[i].description_first;
                var description_second = langArray[i].description_second;
                var lang = langArray[i].lang;

                //Вызов функии перенаправления после 1 секундной задержки
                setTimeout(function(){
                    var go_to_translate = confirm("\n"+description_first+"\n"+description_second);                  
                    if(go_to_translate==true){
                        window.location.href = current_postion + "Index-" + lang + ".html";
                    }
                }, 1000); 
            }
        }
        //Делаем активный нужный язык
        if(langArray[i].text == localStorage.getItem('current_country')){
            select[i].selected = true;
        }
    }
}, "jsonp");

$("select.select-country").change(function(){
    language = $(this).children("option:selected").text();
    localStorage.setItem('current_country', language);
    window.location = current_postion + "Index-" +localStorage.getItem('current_country') + ".html"
});
