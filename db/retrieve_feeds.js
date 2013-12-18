/**
 * Created by Akelaus on 12/3/13.
 */

/**
 *  TODO: will be utilized for unit tests
 */
function log_feeds(){
  var Feed = mongoose.model('Feed');
  Feed.find(function (arr,data) {
    //console.log(data);
    console.log(data);
  });
}