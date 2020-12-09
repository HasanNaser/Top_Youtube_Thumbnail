const YOUTUBE_API = "https://youtube.googleapis.com/youtube/v3/";

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var getCategories = function (){
    var client = new HttpClient();
    let api_ = YOUTUBE_API + "videoCategories"+
        "?part=snippet"+
        "&key=AIzaSyChqRwk7UKteEeqqXBeH8sW6rfdiHNRk2A" +
        "&regionCode=TR";
    client.get(api_, function (response) {

        let result = JSON.parse(response);
        result.items.forEach(function (item){

            let element = "<option value='"+item.id+"'>"+item.snippet.title+"</option>"
            $("#category").append(element);
        })

        getThumbnails();

    });

}

var getThumbnails = function (){
    let selectedCategory = $("#category").val();
    if(!isNaN(selectedCategory)){
        selectedCategory=27;
    }
    let apiurl = YOUTUBE_API+"search" +
        "?part=snippet" +
        "&maxResults=50" +
        "&type=video&fields=items(id/videoId,snippet(channelId,channelTitle,description,title,thumbnails)),nextPageToken,pageInfo,prevPageToken,regionCode" +
        "&key=AIzaSyChqRwk7UKteEeqqXBeH8sW6rfdiHNRk2A" +
        // "&regionCode=TR"+
        "&videoCategoryId="+selectedCategory+
        "&publishedAfter=2020-01-01T00%3A00%3A00Z"+
        // "&relevanceLanguage=TR"
        "&order=viewCount";

    var client = new HttpClient();
    client.get(apiurl, function (response) {

        let result = JSON.parse(response);
        $("#result").empty();
        result.items.forEach(function (item){
            let element = "<a class='result-image' href='"+item.snippet.thumbnails.high.url+"' target='_blank' download><img  src='"+item.snippet.thumbnails.medium.url+"'></a>"
            $("#result").append(element);
        })

    });
}

$("#get-result-btn").click(function () {
    getThumbnails();
});


getCategories();
getThumbnails();