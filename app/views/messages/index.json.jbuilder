json.array! @new_message do |new_message|
  json.content  new_message.content
  json.user_id  new_message.user.id
  json.message_id  new_message.id
  json.user_name  new_message.user.name
  json.date  new_message.created_at.strftime("%Y/%m/%d %H:%M")
  json.image  new_message.image.url
end
