$(document).ready(function() {
  $('#new_q_link').on('click', function(event){
    event.preventDefault();
    $.ajax({
      url: 'questions/new',
      method: 'get'
      }).done(function(response){
        $('#new_q_link').hide();
        $('#question_list').prepend(response);
      });
  });

  $('#question_container').on('click', '#post_button', function(event){
    event.preventDefault();
    $.ajax({
      url: 'questions',
      method: 'post',
      data: $('#new_q_form').serialize()
      }).done(function(response){
        $('#new_q_form').hide();
        $('#errors_list').hide();
        $('#question_list').prepend(response);
      });
  });



  $("#submit_answer_link").on("click", function(event){
    event.preventDefault();

    var event = event.target

    $.ajax({
      method: "get",
      url: $("#submit_answer_link").attr("href")

    }).done(function(response){
      $("#new_answer").append(response);
        $("#submit_answer_link").hide();
    });
  });

    $("#new_answer").on("submit", "#answer_form", function(event){
      event.preventDefault();
      var event_target = event.target

      $.ajax({
        method: "post",
        url: $("#answer_form").attr("action"),
        data: $(event_target).serialize()
      }).done(function(response){
        $("#answer_form").remove();
        $(".answers_container").append(response);
        $("#submit_answer_link").show();

      });
    });


    $("#edit_answer_link").on("click", function(event){
        event.preventDefault();

      var event = event.target

          debugger;
        $.ajax({
          method: "get",
          url: $("#edit_answer_link").attr("href")
        }).done(function(response){
          $("#edit_answer_section").append(response);
          $("#edit_answer_link").hide();
        });
    });


    $("#edit_answer_section").on("submit", "#edit_form", function(event){
        event.preventDefault();

      var event_target = event.target

        $.ajax({
          method: "post",
          url: $("#edit_answer_link").attr("action"),
          data: $(event_target).serialize()
        }).done(function(response){
          $("#edit_form").remove();
          $("#edit_answer_section").append(response);
          $("#edit_answer_link").show();
        });
    });


});
