let input_message = $('.input-message')
let message_body = $('.msg_card_body')
let send_message_form = $('#send-message-form')
const USER_ID = $('#logged-in-user').val()

let loc = window.location
let wsstart = 'ws://'



if(loc.protocol === 'https'){
    wsstart = 'wss://'
}

let endpoint = wsstart + loc.host + loc.pathname

var socket = new WebSocket(endpoint)

socket.onopen = async function(e){
    console.log('open',e)
}

socket.onmessage = async function(e){
    console.log('Message',e)
    let data = JSON.parse(e.data)
    let message = data['message']
    newMessage(message)
}

socket.onerror = async function(e){
    console.log('error',e)
}

socket.onclose = async function(e){
    console.log('close',e)
}



function newMessage(message, sent_by_id, thread_id) {
	if ($.trim(message) === '') {
        console.log("Empty");
		return false;
	}
    console.log(message)
	let message_element = `
			<div class="d-flex mb-4 replied">
				<div class="msg_cotainer_send">
					${message}
					<span class="msg_time_send">8:55 AM, Today</span>
				</div>
				<div class="img_cont_msg">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
				</div>
			</div>
	    `
    
	

    // let message_body = $('.messages-wrapper[chat-id="' + chat_id + '"] .msg_card_body')
	message_body.append($(message_element))
    message_body.animate({
        scrollTop: $(document).height()
    }, 100);
	input_message.val(null);
}

send_message_form.on('submit',function(e){
    e.preventDefault()
    let message = document.getElementById("input-message").value
    let send_to;
    if(USER_ID == 1){
        send_to = 2
    }
    else{
        send_to = 1
    }
    let data = {
        'message':message,
        'sent_by':USER_ID,
        'send_to':send_to
    }
    data = JSON.stringify(data)
    // console.log("Before sending data = "+data)
    socket.send(data)
    $(this)[0].reset()

})