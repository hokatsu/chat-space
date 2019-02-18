$(function(){
  function buildHTML(message){
    var text = ""
    if (message.content){
      text = `<p class="message__footer__content">${message.content}</p>`
    }

    var image = ""
    if (message.image){
      image = `<img class="message__footer__image" src="${message.image}">`
    }

    var html =`<div class="message">
                <div class="message_header">
                 <div class="message__header__name">
                  ${message.user_name}
                 </div>
                 <div class="message__header__time">
                  ${message.date}
                 </div>
                </div>
                <div class="message__footer">
                  ${text}
                  ${image}
                </div>
               </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.message-form').val('')
    })
  });
});
