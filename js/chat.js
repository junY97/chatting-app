
var socket = io(); // socket.io 서버에 접속한다

socket.emit("login", {

  name: makeRandomName(),

});  // 서버로 자신의 정보를 전송한다.

socket.on("login", function (data) {
  $(".top-pic").text(data);
  $("#chat").append("<div class='new-login'>" + data + "님이 들어왔습니다." + "</div>");
});// 서버로부터의 메시지가 수신되면

socket.on("chat", function (data) {
  $("#chat").append("<div class='chat-others'><span class='msg-box'>" + data.msg + "</span></div>");
});// 서버로부터의 메시지가 수신되면

function sendChat() { //서버로 메세지전송
  var textSpace = $(".text-space"); // 채팅 메세지 값
  if (textSpace.val() != "") {
    $(".btn-submit").css("color", "rgb(189,176,58)");
    socket.emit("chat", { msg: textSpace.val() });
    $("#chat").append("<div class='chat-mine'><span class='msg-box'>" + textSpace.val() + "</span></div>");
    textSpace.val("");
  }
}

function makeRandomName() {
  var name = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 3; i++) {
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return name;
}


function enterCheck() {
  var textSpace = $(".text-space").val();
  if (textSpace == "") {
    $(".btn-submit").css("cursor", "auto");
    $(".btn-submit").css("color", "rgb(189,176,58)");
  }
  else if (textSpace != "") {
    $(".btn-submit").css("cursor", "pointer");
    $(".btn-submit").css("color", "rgb(77,54,54)");
  }
  if (event.keyCode == 13 && textSpace != "\n") {
    sendChat();
  }
  else if(event.keyCode==13&&textSpace=="\n"){
   $(".text-space").val("");
    $(".btn-submit").css("cursor", "auto");
    $(".btn-submit").css("color", "rgb(189,176,58)");
  }
}



