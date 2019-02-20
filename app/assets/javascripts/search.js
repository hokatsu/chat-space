$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUser(user) {
   var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    search_list.append(html);
  }

  function appendNoUser(message) {
    var html = `<div>
                  <div class='chat-group-user'>${ message }</div>
                </div>`
    search_list.append(html);
  }

  function addUser(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }

  function removeUser(name, id){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ id }" data-user-name="${ name }">追加</a>
              </div>`
  }

  $("#user-search-field").on("input", function() {
    var input = $("#user-search-field").val();
    search_list.empty();
     $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

     .done(function(users) {
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendNoUser("一致する名前はありません");
     }
   })

     .fail(function() {
      alert('名前検索に失敗しました');
    })
  });

  $("#user-search-result").on('click', '.chat-group-user__btn--add', function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');

    $(this).parent().remove();
    addUser(name, id)
  })

  $("#chat-group-users").on('click', '.chat-group-user__btn--remove', function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');

    $(this).parent().remove();
    removeUser(name, id)
  })
});
