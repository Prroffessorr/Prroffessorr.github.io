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

//Многоязычность контента
var langArray = [
    {lang: "RU", description_first: "Перейти на русскоязычную версию сайта ?", description_second: "(Получено на основе вашего местоположения)"},
    {lang: "UA", description_first: "Перейти на українськомовну версію сайту ?", description_second: "(Отримано на основі вашого місця розташування)"},
    {lang: "EN", description_first: "Go to the English version of the site ?", description_second: "(Obtained based on your location)"},
];

var langAbout = [
    {lang: "RU", name: "Татарников Андрей", description: "Добрый день, я являюсь PHP/CMS Backend разработчиком. Занимаюсь разработкой сайтов под ключ на основе \
    WordPress и других CMS. Таких как Joomla, Opencart и тд. Все зависит от задачи и пожеланий клиента. \
    Также я работаю с Photoshop, Adobe Illustrator, HTML5, CSS3, JS тд. Более подробно с моими работами вы можете в разделе\
    \"Мои проекты\"."},

    {lang: "UA", name: "Татарников Андрій", description: "Добрий день, я є PHP/CMS Backend розробником. Займаюся розробкою сайтів під ключ на основі \
    WordPress і інших CMS. Таких як Joomla, Opencart і тд. Все залежить від завдання і побажань клієнта. \
    Також я працюю з Photoshop, Adobe Illustrator, HTML5, CSS3, JS тд. Більш детально з моїми роботами ви можете в розділі \
    \"Мої проекти\"."},

    {lang: "EN", name: "Tatarnikov Andrey", description: "Hello, I am a PHP / CMS Backend developer. I develop turnkey sites based on \
     WordPress and other CMS. Such as Joomla, Opencart, etc. It all depends on the task and wishes of the client. \
     I also work with Photoshop, Adobe Illustrator, HTML5, CSS3, JS, etc. You can learn more about my works in the section \
     \"My projects\"."},
];

//Получение информации об пользователе
$.get("https://ipinfo.io", function(response) {

if(!localStorage.getItem('current_country') || location.href==current_postion + "Index.html"){
    localStorage.setItem('current_country', "RU");
}

var select = document.getElementById('options'),
    option,
    i = 0,
    length = langArray.length;
    
    //Создаем ешементы в Select
    for(var i=0; i<length; i++){
        option = document.createElement('option');
        option.setAttribute('value', langArray[i].lang);
        option.appendChild(document.createTextNode(langArray[i].lang));
        select.appendChild(option);

        if(location.href != current_postion + "Index.html"){
            localStorage.setItem('current_country', url.split("-")[1].split(".")[0].toUpperCase());
            sessionStorage.setItem('make_go', 1);
            //Добавление информации в тег title и мета теги description c author нужную информацию в зависимости от языка
            if(langAbout[i].lang == url.split("-")[1].split(".")[0].toUpperCase()){
                document.title=langAbout[i].name;
                document.querySelector('meta[name="description"]').setAttribute("content", langAbout[i].description);
                document.querySelector('meta[name="author"]').setAttribute("content", langAbout[i].description);
            }

        }else{
            if(langAbout[i].lang==localStorage.getItem('current_country')){
                document.title=langAbout[i].name;
                document.querySelector('meta[name="description"]').setAttribute("content", langAbout[i].description);
                document.querySelector('meta[name="author"]').setAttribute("content", langAbout[i].description);
            }
        }
        
        //Переводим человека на нужную страницу
        if(langArray[i].lang == response.country && response.country != localStorage.getItem('current_country')){
            //Редиректим пользователя на страницу с переводом
            if(window.location.href != current_postion + "Index-" + langArray[i].lang + ".html"){
                var description_first = langArray[i].description_first;
                var description_second = langArray[i].description_second;
                var lang = langArray[i].lang;

                if(!sessionStorage.getItem('make_go')){
                    //Вызов функии перенаправления после 1 секундной задержки
                    setTimeout(function(){
                        var go_to_translate = confirm("\n"+description_first+"\n"+description_second);                  
                        if(go_to_translate==true){
                        localStorage.setItem('current_country', lang);
                        window.location.href = current_postion + "Index-" + lang.toLowerCase() + ".html";
                        }
                    }, 1000); 
                }
            }
        }
        //Делаем активный нужный язык
        if(langArray[i].lang == localStorage.getItem('current_country')){
            select[i].selected = true;
        }
    }
}, "jsonp");


$("select.select-country").change(function(){
    language = $(this).children("option:selected").val();
    localStorage.setItem('current_country', language);

    if(localStorage.getItem('current_country')=="RU"){
        window.location = current_postion + "Index.html";
    }else{
        window.location = current_postion + "Index-" +localStorage.getItem('current_country').toLowerCase() + ".html";
    }
});
