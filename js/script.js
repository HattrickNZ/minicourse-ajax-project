
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var $street = $("#street").val();
    var $cityState = $("#cityState").val();
    var $city = $cityState.split(',')[0];
    var address = $street + ', ' + $cityState;

    $greeting.text('So, you want to live at '+ address +'?');
    $nytHeaderElem.text("New York Times Articles About "+ $cityState);

    var streetviewUrl = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
           address + '">';

    $body.append(streetviewUrl);

    $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$city+"&sort=newest&api-key=<insert key here>",
        function( data ) {
            var docs = data.response.docs;
            var articles = [];

            $.each(docs, function(index, value){
                if(value.document_type == 'article') {
                    articles.push('<li class="article"><a href="'+value.web_url+'">'+value.headline.main+'</a><p>' + value.snippet + '</p>');
                }
            });

            $(articles.join( " " )).appendTo( $("#nytimes-articles") );

            // udacity solution
            // for(...)
            //   $nytElem.append(<article list item>);
        }).error(function(e) {
            $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
        }
    );

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax('http://en.wikipsdkjflasdjkflskjflsjedia.org/w/api.php?action=opensearch&search='+$city+'&format=json&callback=wikiCallBack', {
        dataType: "jsonp",
        success: function(response) {
            console.log(response);
            var articleTitles = response[1];
            var articleLinks = response[3];
            var numberOfArticles = articleLinks.length;
            for(var i = 0; i < numberOfArticles; i++) {
                $wikiElem.append('<li><a href="'+articleLinks[i]+'">'+articleTitles[i]+'</a></li>');
            }

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
}

$('#form-container').submit(loadData);



// loadData();
