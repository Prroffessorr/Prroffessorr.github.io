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
    }, 500);

    });
    $('.less').click(function () {
        $('.list-loadmore li').not(':lt(3)').hide(300);
        $('.more').show();
        $('.less').hide();
    });
});