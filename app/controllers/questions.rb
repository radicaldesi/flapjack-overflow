get '/questions' do
  @qs = Question.all.order('created_at desc')
  erb :'questions/index'
end

get '/questions/new' do
  erb :'questions/new', layout: false
end

post '/questions' do
  @q = Question.new(title: params['title'], body: params['body'], user_id: session['user_id'])
  tags = params['tags'].split(' ')
  if @q.save
    tags.each do |tag|
      new_tag = Tag.find_or_create_by(name: tag)
      QuestionTag.find_or_create_by(question_id: @q.id, tag_id: new_tag.id)
    end
    erb :'questions/_single', layout: false, locals: {q: @q}
  else
    @errors = @q.errors.full_messages
    erb :'questions/new', layout: false
  end
end

get '/questions/:id' do
  @q = Question.find_by(id: params[:id])
  @tag = Tag.find_by(id: params[:id])
  halt(404, erb(:'404')) if @q.nil?
  @comments = @q.comments.limit(3)
  @q.views += 1
  @q.save
  erb :"questions/show"
end

get '/questions/:id/edit' do
  @q = Question.find_by(id: params[:id])
  if session["user_id"] == @q.user_id
    erb :'questions/edit'
  else
    erb :'404'
  end
end

put '/questions/:id' do
  @q = Question.find_by(id: params[:id])
  if session["user_id"] == @q.user_id
    @q.assign_attributes(title: params['title'], body: params['body'])
    if @q.save
      if request.xhr?
        erb :"questions/_edited-question", layout: false, locals: {q: @q}
      else
        redirect "questions/#{@q.id}"
      end
    else
      @errors = @q.errors.full_messages
      erb :'questions/edit'
    end
  else
    erb :'404'
  end
end

delete '/questions/:id' do
  @q = Question.find_by(id: params[:id])
  if session["user_id"] == @q.user_id
    QuestionTag.where(question_id: @q.id).destroy_all
    @q.destroy
    redirect '/questions'
  else
    erb :'404'
  end
end
