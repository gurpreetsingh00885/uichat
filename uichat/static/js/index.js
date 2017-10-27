$(function() {
  var INDEX = 0;
  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val(); 
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    var buttons = [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ];
      var http = new XMLHttpRequest();
      var img = '  <svg class="ldi-igf6j3" width="25%" height="40%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;"><!--?xml version="1.0" encoding="utf-8"?--><!--Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="transform-origin: 50px 50px 0px;" xml:space="preserve" class=""><g style="transform-origin: 50px 50px 0px; transform: scale(0.89);" class=""><g style="transform-origin: 50px 50px 0px;" class=""><style type="text/css" style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -1.3s;" class="ld ld-fade">.st0{fill:#F4E6C8;} .st1{opacity:0.8;fill:#849B87;} .st2{fill:#D65A62;} .st3{fill:#E15C64;} .st4{fill:#F47E5F;} .st5{fill:#F7B26A;} .st6{fill:#FEE8A2;} .st7{fill:#ACBD81;} .st8{fill:#F5E169;} .st9{fill:#F0AF6B;} .st10{fill:#EA7C60;} .st11{fill:#A8B980;} .st12{fill:#829985;} .st13{fill:#798AAE;} .st14{fill:#8672A7;} .st15{fill:#CC5960;} .st16{fill:#E17A5F;} .st17{fill:#849B87;} .st18{opacity:0.8;fill:#E15C64;} .st19{opacity:0.8;fill:#F7B26A;} .st20{fill:#79A5B5;} .st21{opacity:0.8;fill:#79A5B4;} .st22{fill:#666766;}</style><g style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -1.2s;" class="ld ld-fade"><circle class="st2" cx="20" cy="50" r="10" fill="#0051a2" style="fill: rgb(0, 81, 162);"></circle></g><g style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -1.1s;" class="ld ld-fade"><circle class="st10" cx="50" cy="50" r="10" fill="#1b75be" style="fill: rgb(27, 117, 190);"></circle></g><g style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -1s;" class="ld ld-fade"><circle class="st9" cx="80" cy="50" r="10" fill="#408ee0" style="fill: rgb(64, 142, 224);"></circle></g><metadata xmlns:d="https://loading.io/stock/" style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -0.9s;" class="ld ld-fade"><d:name style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -0.8s;" class="ld ld-fade">ellipse</d:name><d:tags style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -0.7s;" class="ld ld-fade">dot,point,circle,waiting,typing,sending,message,ellipse,spinner</d:tags><d:license style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -0.6s;" class="ld ld-fade">cc-by</d:license><d:slug style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -0.5s;" class="ld ld-fade">igf6j3</d:slug></metadata></g></g><style type="text/css" style="transform-origin: 50px 50px 0px; animation-duration: 1.3s; animation-delay: -0.4s;" class="ld ld-fade">path,ellipse,circle,rect,polygon,polyline,line { stroke-width: 0; }@keyframes ld-fade {  0% {    opacity: 1;  }  100% {    opacity: 0;  }}@-webkit-keyframes ld-fade {  0% {    opacity: 1;  }  100% {    opacity: 0;  }}.ld.ld-fade {-webkit-animation: ld-fade 1s infinite linear;animation: ld-fade 1s infinite linear;}</style></svg></svg>'
      http.open("GET", "/api/chatbot/?text="+msg, true);
      http.setRequestHeader("Content-Type", "application/json");
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
              var chatbox = document.getElementById("chatbox");
              chatbox.innerHTML = chatbox.innerHTML.substr(0, chatbox.innerHTML.length - img.length);
              setTimeout(function() {      
              generate_message(JSON.parse(http.responseText)['response'], 'user');  
            }, 1000)
          }
      }
      http.send();
      generate_message(img, "image");
    
    
  })
  
  function generate_message(msg, type) {
    INDEX++;
    var str="";
    if(type!="image"){
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
  }
    str += msg;
    if(type!="image"){
    str += "          <\/div>";
    str += "        <\/div>";
    }
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  
  function generate_button_message(msg, buttons){    
    /* Buttons should be object array 
      [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ]
    */
    INDEX++;
    var btn_obj = buttons.map(function(button) {
       return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
    }).join('');
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-button\">";
    str += "            <ul>";   
    str += btn_obj;
    str += "            <\/ul>";
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);   
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    $("#chat-input").attr("disabled", true);
  }
  
  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
})