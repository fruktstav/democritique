function guid() {

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() +  s4() + s4() +
    s4() + s4() + s4() + s4();

}


function addUser(id) {

  $.post("http://democritique.lingonbyran.se/php/adduser.php", {'userid': id} );

            }


function getUserData(id) {

  $.post("http://democritique.lingonbyran.se/php/userconnect.php", {'userid': id}, function(data) {

    $("#karma").append(data);

  } );

}
