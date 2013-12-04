/**
 * Created by Akelaus on 12/3/13.
 */
function log_feeds(){
  var Feed = mongoose.model('Feed');
  Feed.find(function (arr,data) {
    //console.log(data);
    console.log(data);
  });
}