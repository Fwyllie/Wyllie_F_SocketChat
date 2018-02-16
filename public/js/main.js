(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      chatMessage = chatForm.querySelector('.message'),
      nameInput = document.querySelector('.nickname');

      function setNickname(){
        nameInput.addEventListener('keyup', leaveLogin, false);
        nickName = this.value;
        socket.emit('add user', nickName);
      }
      function leaveLogin(e){
        if(e.code == 'Enter'){
          let loginScreen =  document.querySelector("#login");
          let WelcomeMes = document.querySelector("#welcomeM");
          loginScreen.style.display = "none";
          welcomeM.innerHTML = "Welcome to Fran's chat " + nickName;
        }
      }
      function appendMessage(msg){
        let newMsg = `<li>${msg.message}</li>`;
        messageList.innerHTML += newMsg;
        // nickName.style.color = '#' + ('000000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
      }
      function handleSendMessage(e){
        e.preventDefault();
        nickname = (nickName && nickName.length > 0) ? nickName : 'user';
        msg = `${nickName} : ${chatMessage.value}`;
        socket.emit('chat message', msg);
        chatMessage.value = "";
        return false;
      }
      function appendDiscMessage (msg, nickName){
        let newMsg = `<li>${msg}</li>`;
        messageList.innerHTML += newMsg;
      }

      nameInput.addEventListener('change', setNickname, false);
      chatForm.addEventListener('submit', handleSendMessage, false);
      socket.addEventListener('chat message', appendMessage, false);
      socket.addEventListener('disconnect message', appendDiscMessage, false);
})();
