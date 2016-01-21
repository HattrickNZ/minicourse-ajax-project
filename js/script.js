
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
	
	// me working througth the solution
	var nyTimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$city+"&sort=newest&api-key=a5486bd5b73442ce353f3931ddc278b1:2:74079982";
	console.log("nyTimesURL",nyTimesURL);
	$.getJSON(nyTimesURL, function (data) {
		console.log("nytimesAPI",data);
		
		var docs = data.response.docs;
		//console.log("data.response.docs",data.response.docs);
        var articles = [];
		//console.log("articles",articles);
		
		$.each(docs, function(index, value){
			//console.log("index",index);
			//console.log("value.document_type",value.document_type);
			if(value.document_type == 'article') {
				articles.push('<li class="article"><a href="'+value.web_url+'">'+value.headline.main+'</a><p>' + value.snippet + '</p>');
			}
		});
		//console.log("articles",articles);
		//console.log("articles[0]",articles[0]);
		
		$(articles.join( " " )).appendTo( $("#nytimes-articles") );
		//console.log("articles.join( \" \" )",articles.join( " " ));
	});
	
	
	/*
    $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$city+"&sort=newest&api-key=a5486bd5b73442ce353f3931ddc278b1:2:74079982",
        function( data ) {
			console.log("nytimesAPI",data);
            var docs = data.response.docs;
            var articles = [];

            $.each(docs, function(index, value){
                if(value.document_type == 'article') {
                    articles.push('<li class="article"><a href="'+value.web_url+'">'+value.headline.main +' -- ' + value.source +'</a><p>' + value.snippet + '</p>');
                }
            });

            $(articles.join( " " )).appendTo( $("#nytimes-articles") );

            // udacity solution
            // for(...)
            //   $nytElem.append(<article list item>);
        }).error(function(e) {
            $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
			console.log("e",e)
        }
    );
		*/
		
		
	// this gets the timer going and if is not cleared after 8 seconds $wikiElem value will be changed 
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
		console.log("date",Date());
    }, 8000);
	

	
	//my version working through it 
	var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+$city+'&format=json&callback=wikiCallBack';
	console.log("wikiURL",wikiURL);
	$.ajax(wikiURL, {
			//url : wikiURL, // this would work also
			dataType: "jsonp",
			error: function(e){consiole.log("e",e);},
			success: function(response) {
				console.log("wikiResponse",response);
				var articleTitles = response[1];
				var articleLinks = response[3];
				var numberOfArticles = articleLinks.length;
				for(var i = 0; i < numberOfArticles; i++) {
                $wikiElem.append('<li><a href="'+articleLinks[i]+'">'+articleTitles[i]+'</a></li>');
				}
				console.log("date",Date());
				
				clearTimeout(wikiRequestTimeout);

			}
	});
	
	/*
    $.ajax('http://en.wikipedia.org/w/api.php?action=opensearch&search='+$city+'&format=json&callback=wikiCallBack', {
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
    });*/

    return false;
}

$('#form-container').submit(loadData);


//$('#form-container').submit(loadData2);

function loadData2() {
	alert("this is loadData2...this function is running now...")
}


// loadData();
