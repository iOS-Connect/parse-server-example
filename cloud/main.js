
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

// iOS push testing
Parse.Cloud.define("iosPushTest", function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var params = request.params;
  var user = request.user;
  var postCreator = params["user"];
  console.log(params);
  var postToken = params["postToken"];
  // Our "Message" class has a "text" key with the body of the message itself
  var messageText = params.text;
  var pushQuery = new Parse.Query(Parse.Installation);
  //pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only
  pushQuery.equalTo('deviceToken', postToken); // targeting iOS devices only
  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "Message: " + messageText
    }
  }, { success: function() {
      console.log("#### PUSH OK");
  }, error: function(error) {
      console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
