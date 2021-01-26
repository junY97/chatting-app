  $(function () {
      // socket.io 서버에 접속한다
      var socket = io();

      // 서버로 자신의 정보를 전송한다.
      socket.emit("login", {
       
        name: makeRandomName(),
      
      });

   
      // 서버로부터의 메시지가 수신되면
      socket.on("login", function (data) {
        $(".top-pic").text(data);
        $("#chat").append("<div class='new-login'>"+data + "님이 들어왔습니다."+"</div>");
      });

      // 서버로부터의 메시지가 수신되면
      socket.on("chat", function (data) {
        $("#chat").append("<div class='chat-others'><span class='msg-box'>"+data.msg +"</span></div>");
      });

      // Send 버튼이 클릭되면
      $(".form").submit(function (e) {
        e.preventDefault();
        var $textSpace = $(".text-space");

        // 서버로 메시지를 전송한다.
        socket.emit("chat", { msg: $textSpace.val() });
           $("#chat").append("<div class='chat-mine'><span class='msg-box'>"+$textSpace.val()+"</span></div>");
        $textSpace.val("");
      });

      function makeRandomName() {
        var name = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 3; i++) {
          name += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return name;
      }
    });
