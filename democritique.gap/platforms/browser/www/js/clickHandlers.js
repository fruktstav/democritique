function colorizeComments() {


    $('.comment').each(function () {

        var random = Math.floor((Math.random() * 10) + 1);
        var randomColor = '';


        switch (random){
            case 1:
                randomColor = '#F44336'; // Red
                break;
            case 2:
                randomColor = '#E91E63'; // Pink
                break;
            case 3:
                randomColor = '#9C27B0'; // Purple
                break;
            case 4:
                randomColor = '#3F51B5'; // Indigo
                break;
            case 5:
                randomColor = '#009688'; // Teal
                break;
            case 6:
                randomColor = '#4CAF50'; // Green
                break;
            case 7:
                randomColor = '#CDDC39'; // Lime
                break;
            case 8:
                randomColor = '#FF9800'; // Orange
                break;
            default:
                randomColor = '#607D8B' // Grey
        }


        $(this).css('border-left-color',randomColor);
    });
}

function colorizeResults() {

    return;
    
    $('.result').each(function () {

        var random = parseInt($(this).attr('dbid')) % 10;
        var randomColor = '';

        switch (random){
            case 1:
                randomColor = '#F44336'; // Red
                break;
            case 2:
                randomColor = '#E91E63'; // Pink
                break;
            case 3:
                randomColor = '#9C27B0'; // Purple
                break;
            case 4:
                randomColor = '#673AB7'; // Deep Purple
                break;
            case 5:
                randomColor = '#3F51B5'; // Indigo
                break;
            case 6:
                randomColor = '#009688'; // Teal
                break;
            case 7:
                randomColor = '#4CAF50'; // Green
                break;
            case 8:
                randomColor = '#CDDC39'; // Lime
                break;
            case 9:
                randomColor = '#FF9800'; // Orange
                break;
            case 0:
                randomColor = '#FFC107'; // Amber
                break;
            default:
                randomColor = '#607D8B' // Grey
        }


        $(this).css('border-left-color',randomColor);
    });
}

function closeMenu() {

  $('#menu').stop().stop().velocity({
      left: '-55%'
    }, 100);

  $('#menufiller').fadeOut();

}

function onBackKeyDown($commenthideHeights)
{
  switch($uistate) {
     case "home":
         navigator.app.exitApp();
         $('#closebutton').fadeOut()
         break;
     case "popup":
         $('.popupelement').fadeOut();
         $('#closebutton').fadeOut();
         break;
     case "activeresult":

        $('.removeNow').remove();

         if (tablet) { // IF TABLET

           $('#results').velocity({

               width: '100%'

           }, 500);

         }

         // $('body').stop().velocity({
         //       scrollTop: offset
         //   }, 800);

         $('.activatedresult').find(".comdiv").fadeOut();
         $('#'+dok_id).fadeOut();

         $('html, body').stop().animate({ scrollTop: originalOffset }, 1);


         $('.activatedresult').find(".comdiv").stop().velocity({

             width: '0%'

         }, 800);




         $('.activatedresult').find(".activatedresultbuttons").fadeOut();
         $('.activatedresult').find(".timeline").fadeOut();
         $('#results').fadeIn();

     // Div size variables for resizing

         height = $(window).height();
         headerHeight = $("#header").css("height");
         headerHeight = parseInt(headerHeight);
         height = height - headerHeight;

         $('.activatedresult').stop().velocity({
            top: scrollDist,
            height: originalHeight
          }, 800, function() {
         // Animation complete.

         $('.activatedresult').removeClass('animated');

         // Re-size div

         $('.activatedresult').find('.resultbody').css('height',originalHeightBody);
         $('.activatedresult').find('.resultbody').css('margin-bottom','-40px');



         $("#closebutton").fadeOut(); // No more escape routes!

         // Re-activate scrolling for results div (the list)
         // document.getElementById('results').removeEventListener('touchmove', stopScroll, false);
         // document.getElementById('bodyid').removeEventListener('touchmove', stopScroll, false);



         $('.activatedresult').removeAttr('style');
         $('.activatedresult').find('.resultbody').removeAttr('style');


         $('.activatedresult').css('height',originalHeight);
         $('.activatedresult').find('.resultbody').css('height', originalHeightBody);

         $('.activatedresult').find('.reporttext').hide();

         $('.'+dok_id).removeClass(dok_id);
         $('.timelinehide').fadeOut();
         $('.activatedresult').fadeOut();
         $('.activatedresult').delay(100).remove();
         $('#bodyid').css('overflow-y','scroll');

         clickHandlers()

     });
         break;
     case "openedResult":

         if (tablet) {

           $('#results').velocity({

               width: '100%'

           }, 500);

         }

         $('#results').fadeIn();

         $('.openedResult').fadeOut(function(){
           $('.openedResult').remove();
         });


         $("#closebutton").fadeOut(); // No more escape routes!


         clickHandlers()
         break;
     case "writing":

     // Reverse for tablet writing

     if (tablet) {

       $('.activepostcomment').toggleClass('tabletpostcomment');

       $('.activatedresult').toggleClass('nomargin');

       $('.activatedresult').velocity({

           width: '50%'

       }, 500);

      //  $('.activepostcomment').height('100%'); MAYBE

       $('.activatedresult').toggleClass('fatborderbottom');

       $('#results').fadeIn();
       $('#results').css('opacity','1');

     }

        $('.activepostcomment').toggleClass('activepostcomment');


         var $ij = 0;

         $('.activatedresult').find('.resultbodytext').fadeIn();
         $('.activatedresult').find('.newsthumb').fadeIn();
         $('.activatedresult').find('.reporttext').fadeIn();
         $('.activatedresult').find('.activatedresultbuttons').fadeIn();
         $('.activatedresult').find('#postcomment').fadeOut();
         $('.activatedresult').find('#postcomment').remove();
         $('.activatedcomments').fadeIn();
         $('.activatedresult').find('.timeline').fadeIn();
         $('.activatedresult').find('.comments').fadeIn();


         $('.activatedresult').find('.commenthide').each(function() {


           $(this).stop().velocity({
             'height': $commenthideHeights[$ij],
             'opacity':'1'
           },500);

           $ij++;

         });
         $uistate = "activeresult";
         break;

     default:
         // nothing

 }
}

function closeButton() {

    // Remove previously added extra UI elements
    $('#closebutton').unbind('click');
    $('#closebutton').click(function(){

            onBackKeyDown($commenthideHeights);

    });


}

function menuButton() {




  $('#menufiller').click(function(event){
    closeMenu()
  });


  $('#menubutton').click(function(event){

      // html2canvas($('#results'), {
      //               onrendered: function(canvas) {
      //                   var img = canvas.toDataURL("image/png")
      //                   document.getElementById("menufillerimage").src = img;
      //                   $('#menufillerimage').fadeIn(1000);
      //               }
      //           });

      $('#menufiller').fadeIn();


      $('#menu').stop().fadeIn();

      $('#menu').addClass('animated');

      $( "#menu" ).stop().velocity({
        left: '0'
      }, 500, function() {
        $('#menu').removeClass('animated');
      });

  });

}

function commentButtons() {

    var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID)

    $(".comdown").unbind('click');
        $(".comdown").click(function() { // Activate functionality on upvote button
            $('.load-bar').show();
            $(this).unbind('click');
            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes
            comment_id = $(this).parent().parent().parent().attr('comment_id');
            $(this).parent().parent().parent().addClass('activatedcomment');

            $.post('http://democritique.lingonbyran.se/php/comdownvote.php',{'user_id': userID, 'comment_id': comment_id}, function(data) { // Send upvote
                currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes

                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                    $('.activatedcomment').find('.comup').next().addClass('votingSubtractClass');

                    currentVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                    currentVoteCount = parseInt(currentVoteCount)-1; // Remove old vote

                    $('.votingSubtractClass').text(currentVoteCount); // Set new amount of upvotes
                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class


                }

                $('.votingOperationClass').removeClass('votingOperationClass');

                $('.activatedcomment').removeClass('activatedcomment');

                $('.load-bar').hide();

            });


        });

    $(".comup").unbind('click');
        $(".comup").click(function() { // Activate functionality on upvote button
            $('.load-bar').show();
            $(this).unbind('click');
            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes
            comment_id = $(this).parent().parent().parent().attr('comment_id');

            $(this).parent().parent().parent().addClass('activatedcomment');

            $.post('http://democritique.lingonbyran.se/php/comupvote.php',{'user_id': userID, 'comment_id': comment_id}, function(data) { // Send upvote
                currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes

                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                    $('.activatedcomment').find('.comdown').next().addClass('votingSubtractClass');

                    currentVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                    currentVoteCount = parseInt(currentVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

                    $('.votingSubtractClass').text(currentVoteCount); // Set new amount of downvotes
                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class


                }

                $('.votingOperationClass').removeClass('votingOperationClass');

                $('.activatedcomment').removeClass('activatedcomment');

                $('.load-bar').hide();

            });


        });

}

function clickHandlers() { // this binds the click function on results

  if ($('.popupelement').is(':visible')) {

      $uistate = "popup";
  }



  document.addEventListener("backbutton", onBackKeyDown, false);



  $('#profilebutton').click(function(event){

    event.stopPropagation();

    closeMenu()

    $.post('http://democritique.lingonbyran.se/php/fetchProfile.php',{'user_id': userID}, function(data) { //ajax command

        $('#profile').empty();
        $("#profile").append(data); //append data received from server
        colorizeComments();
        $('.load-bar').hide();


        $('.votemeteramount').each(function(index, value) {

          var tempwith = $(this).attr('amount');
          $(this).stop().velocity({
              'width': tempwith+'%'
            }, 800);
        });

    });

    $('.popupelement').fadeOut();

    $('.load-bar').show();
    $('#profile').fadeIn();
    $('#profile').stop().velocity({
        'margin-left': '0'
      }, 800);

  });

  $(document).on('click', '.menuitem', function() {
      // your function here
      $('#results').attr('style','none');
      $('.activatedresult').remove();
    });


    $('#billsbutton').unbind('click');

    $('#billsbutton').click(function(e){

      uistate = 'bills';

      closeMenu()

      $('.popupelement').fadeOut();

      $('.load-bar').show();

      $('#results').empty();


      var pageCount = 0; //increment count for ajax download of entry posts
      var currentDocType = 'planerat'; //currently chosen type of documents to be fetched
      var currentSorting = 'date'; //currently chosen type of sorting for said documents

      getPosts(currentDocType, currentSorting, pageCount); // New content
      pageCount++; // Increment indexing variable



    });

    $('#homebutton').unbind('click');

    $('#homebutton').click(function(){

      uistate = 'home';

      closeMenu()

      $('#closebutton').fadeOut();

      $('.popupelement').fadeOut();
      $('.activatedresult').fadeOut();
      $('.activatedresult').remove();

      $('.load-bar').show();

      $('#results').empty();



      var pageCount = 0; //increment count for ajax download of entry posts

      getStartPage(); // New content



    });

    $('#newsbutton').unbind('click');

    $('#newsbutton').click(function(){

      uistate = 'news';

      closeMenu()

      $('#closebutton').fadeOut();

      $('.popupelement').fadeOut();
      $('.activatedresult').fadeOut();
      $('.activatedresult').remove();

      $('.load-bar').show();

      $('#results').empty();



      var pageCount = 0; //increment count for ajax download of entry posts

      getNews(pageCount); // New content

      pageCount++; // Increment indexing variable



    });

    $('#decisionsbutton').unbind('click');

    $('#decisionsbutton').click(function(){

      closeMenu()

      $('#closebutton').fadeOut();

      $('.popupelement').fadeOut();
      $('.activatedresult').fadeOut();
      $('.activatedresult').remove();

      $('.load-bar').show();

      $('#results').empty();

      uistate = 'decisions';

      pageCount = 0; //increment count for ajax download of entry posts
      currentDocType = 'intraffat'; //currently chosen type of documents to be fetched
      currentSorting = 'date'; //currently chosen type of sorting for said documents

      getPosts(currentDocType, currentSorting, pageCount); // New content
      pageCount++; // Increment indexing variable



    });

    $('#compassbutton').unbind('click');

    $('#compassbutton').click(function(){

      closeMenu()

      $('.load-bar').show();
      $('#compass').show();

      $.post('http://democritique.lingonbyran.se/php/fetchVotes.php',{'user_id': userID}, function(data) { //ajax command

          $('#compass').empty();
          $('#compasspage').find('.compassresults').remove();
          $("#compass").append(data); //append data received from server
          $('.load-bar').hide();

          $('.votemeteramount').each(function(index, value) {

            var tempwith = $(this).attr('amount');
            $(this).stop().velocity({
                'width': tempwith+'%'
              }, 800);
          });

      });

      $('#compass').stop().velocity({
          'margin-left': '0'
        }, 800);

      $('#closebutton').fadeIn();

      $('#closebutton').click(function(){

        if ($uistate != 'activeresult') {

          $(this).fadeOut();

      }

        $('#compass').stop().velocity({
            'margin-left': '-110%'
          }, 800);



        closeButton()

      });


    });


                    var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID)

                    menuButton()

                    $(".result").unbind('click');
                    $(".result").click(function() { // When any result is clicked

                        offset = $(this).offset().top;

                        originalOffset = $(document).scrollTop();


                        clickHandlers()



                        // Removes old opened results for tablet UI
                        $('.activatedresult').addClass('removeNow').removeClass('activatedresult');
                        $('.activatedresult').width('50%');


                        $uistate = "activeresult";

                        $(this).unbind('click');
                        $('.load-bar').show(); // Show loadbar while getting extra data

                        $( this ).clone().appendTo( "#bodyid" ).addClass('activatedresult') // Clone clicked result

                        $('.activatedresult').each(function(){

                            if(!$(this).hasClass('animatedclass')){

                              $(this).css('-webkit-mask-image','none');
                            }

                        });

                        if (tablet) { // IF TABLET

                          $('#results').velocity({

                              width: '50%'

                          }, 500);

                        } else { // IF PHONE

                          $('#results').fadeOut();

                        }

                         // Add extra class for clicked div

                        // $(this).addClass('activatedresult');
                        // $(this).removeAttr('style');

                        // $('#bodyid').css('overflow-y','hidden');


                        dok_id = $(this).attr("dok_id"); // The currently read results ID
                        $(this).addClass(dok_id);

                        $.post('http://democritique.lingonbyran.se/php/fetchDocRefs.php',{'dok_id': JSON.stringify(dok_id)}, function(data) { // Get related documents

                            $('.activatedresult').find('.activatedresultbuttons').before(data);

                            $('.activatedresult').find('docref').remove();

                            $(".first").css("pointer-events", "auto");

                        });


                        // $('.activatedresult').find(".upvote").unbind('click');
                        $('.activatedresult').find(".upvote").click(function() { // Activate functionality on upvote button
                            $('.load-bar').show();
                            $(this).unbind('click');
                            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes

                            $.post('http://democritique.lingonbyran.se/php/upvote.php',{'user_id': userID, 'dok_id': JSON.stringify(dok_id)}, function(data) { // Send upvote

                                var currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes

                                $('.'+dok_id).find('.upvote').next().text(currentVoteCount); // Also for the original result in the list

                                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                                    $('.activatedresult').find('.downvote').next().addClass('votingSubtractClass');

                                    var currentSubVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                                    currentSubVoteCount = parseInt(currentSubVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

                                    $('.votingSubtractClass').text(currentSubVoteCount); // Set new amount of downvotes
                                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class
                                    $('.'+dok_id).find('.downvote').next().text(currentSubVoteCount);

                                }

                                $('.votingOperationClass').removeClass('votingOperationClass');

                                $('.load-bar').hide();

                            });


                        });

                        $('.activatedresult').find(".downvote").unbind('click');
                        $('.activatedresult').find(".downvote").click(function() { // Activate functionality on upvote button
                            $('.load-bar').show();
                            $(this).unbind('click');
                            $(this).next().addClass('votingOperationClass'); // Add extra class to the <p> holding amount of votes

                            $.post('http://democritique.lingonbyran.se/php/downvote.php',{'user_id': userID, 'dok_id': JSON.stringify(dok_id)}, function(data) { // Send upvote

                                var currentVoteCount = $('.votingOperationClass').text(); // Get current amount of votes

                                currentVoteCount = parseInt(currentVoteCount)+parseInt(data.charAt(0)); // Add 1 (or 0 if vote has already been cast)

                                $('.votingOperationClass').text(currentVoteCount); // Set new amount of upvotes
                                $('.'+dok_id).find('.downvote').next().text(currentVoteCount);

                                if (parseInt(data.charAt(1)) == 1) { // If vote has been cast on the other available option

                                    $('.activatedresult').find('.upvote').next().addClass('votingSubtractClass');

                                    var currentSubVoteCount = $('.votingSubtractClass').text(); // Get current amount of votes

                                    currentSubVoteCount = parseInt(currentSubVoteCount)-1; // Add 1 (or 0 if vote has already been cast)

                                    $('.votingSubtractClass').text(currentSubVoteCount); // Set new amount of upvotes
                                    $('.votingSubtractClass').removeClass('votingSubtractClass'); // Remove class
                                    $('.'+dok_id).find('.upvote').next().text(currentSubVoteCount);


                                }

                                $('.votingOperationClass').removeClass('votingOperationClass');

                                $('.load-bar').hide();

                            });


                        });

                        $('.activatedresult').find('.first').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.timelinehide').fadeOut();
                            $('.activatedresult').find('.docrefs').fadeIn();
                            $('.activatedresult').find('.videodome').remove();

                        });

                        $('.activatedresult').find('.second').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.timelinehide').fadeOut();
                            $('.activatedresult').find('.videodome').remove();
                            $('.activatedresult').find('.reporttext').fadeIn();

                        });

                        $('.activatedresult').find('.third').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.timelinehide').fadeOut();
                            $('.activatedresult').find('.debatetext').fadeIn();

                            if (tablet) { // IF TABLET

                              width = $(window).width()/2;

                            }else{

                              width = $(window).width();

                            }

                            $('.activatedresult').find('.videodome').remove();
                            if ( !$( ".videodome" ).length ) {

                                $('.activatedresult').find('.debatetext').after('<iframe class="videodome commenthide timelinehide" src="https://www.riksdagen.se/views/pages/embedpage.aspx?did=' + dok_id + '" width="' + (width*0.9) + '" height="' + (width*0.5) + '" allowfullscreen="true"></iframe>');

                            }

                            e.stopPropagation();
                        });

                        window.addEventListener("orientationchange", function(e) {
                          // Announce the new orientation number

                          e.preventDefault();

                          switch(window.orientation)
                          {
                            case 90:

                                    $( ".videodome" ).css({
                                      position: "fixed",
                                      top: "0",
                                      left: "0",
                                      width: "100%",
                                      height: "100%",
                                      margin: "0",
                                      zIndex: "998",
                                      border: "none"

                                    });
                                    $('#header').velocity({

                                        top: '-20%'

                                    }, 500);
                                    break;
                            case 0:

                                    $( ".videodome" ).attr('style','');

                                    $('#header').velocity({

                                        top: '0'

                                    }, 500);
                            default:
                                    $( ".videodome" ).attr('style','');

                                    $('#header').velocity({

                                        top: '0'

                                    }, 500);
                            }

                        }, false);

                        $('.activatedresult').find('.fourth').click(function(){

                            $('.activatedresult').find('.active').removeClass('active');
                            $(this).addClass('active');
                            $('.activatedresult').find('.timelinehide').fadeOut();
                            $('.activatedresult').find('.videodome').remove();

                            var decisionID = $('.activatedresult').attr('decisionid');

                            if (decisionID) {

                              $('.activatedresult').find('.decision').before('<iframe class="videodome commenthide timelinehide" src="https://www.riksdagen.se/views/pages/embedpage.aspx?did=' + decisionID + '" width="' + (width*0.9) + '" height="' + (width*0.5) + '" allowfullscreen="true"></iframe>');

                            }

                            $('.activatedresult').find('.decision').fadeIn();


                        });


                        // Expands the result div to accomodate further actions when pressed

                        // $( this ).css('height','100%');


                       $(".first").css("pointer-events", "none");
                       //do something





                        height = $(window).height();
                        headerHeight = $("#header").css("height");
                        headerHeight = parseInt(headerHeight);
                        height = height - headerHeight;

                        originalHeight = $(this).height();
                        originalHeightBody = $(this).find('.resultbody').height();

                        // Adds an escape route

                        $("#closebutton").fadeIn();

                        $('.activatedresult').find('.activatedresultbuttons').fadeIn();
                        $(".activatedresult").find('.resultbuttons').remove();

                        $(".activatedresult").find('.timeline').fadeIn();

                        $('.activatedresult').find('.reporttext').show();
                        $('.activatedresult').find('.reporttext').attr('id','specialreport');
                        $('.activatedresult').find('.reporttext').addClass('activatedreporttext');
                        $('.activatedreporttext').wrapInner('<p></p>');



                        $('.activatedresult').find(".comdiv").fadeIn();

                        $('.activatedresult').find(".comdiv").stop().velocity({

                            width: '100%'

                        }, 800);

                        // Let's make this div the right size, shall we?

                        $('.activatedresult').css("height",height);

                        $('.activatedresult').find(".resultbody").css("height","90%");

                        offset = offset - headerHeight;

                        scrollingDist = $(window).scrollTop();
                        scrollDist = $( this ).offset().top;
                        scrollDist = parseInt(scrollDist)-parseInt(scrollingDist);

                        if (scrollDist < 0) {

                          scrollDist = '53px';

                        }

                        $('.activatedresult').css('top',scrollDist);

                        $('.activatedresult').css({
                          "position": "fixed",
                          "z-index": "9"
                        });

                        toBeScrolled = (scrollDist-48);
                        $('.activatedresult').stop().velocity({
                            top: "48px"
                          }, 800, function() {
                            // Animation complete.
                        });

                        // Add extra class for this results specific comments

                        commentclass = 'comments'+dok_id;
                        $('.activatedresult').find('.comments').addClass(commentclass);
                        $('.activatedresult').find('.comments').css('padding-bottom', '60px');


                        // Click function for the comment-button


                        $('.activatedresult').find("#commentlink").unbind('click');
                        $('.activatedresult').find("#commentlink").click(function() {

                            $('.activepostcomment').find('#commentfield').focus();


                            // Comment writing mode

                            // Counter for keeping track of hidden ui elements

                            var $j = 0;

                            // Iterates through elements with the 'commenthide' class,
                            // stores them in the 'commenthideHeights' variable and finally adds one to $j

                            $('.activatedresult').find('.commenthide').each(function() {

                              $commenthideHeights[$j] = $(this).height();
                              $j++;

                          });

                            // Animation for hiding elements with the 'commenthide' class

                            $('.activatedresult').find('.commenthide').stop().velocity({
                              'height':'0',
                              'opacity':'0'
                            },500);

                            // $('.activatedresult').find('reporttext').delay(100).fadeOut();
                            $('.activatedresult').find('.commenthide').delay(500).fadeOut();


                            $uistate = "writing";


                            // Clone and insert comment form
                            $('.activatedresult').find("#postcomment").remove();
                            commentTarget = $('.activatedresult').find('.comdiv');
                            $("#postcomment").clone().insertAfter(commentTarget).addClass('activepostcomment');
                            $('.activatedresult').find("#postcomment").fadeIn();

                            // Tablet writing mode

                            if (tablet) { // IF TABLET

                              $('.activepostcomment').toggleClass('tabletpostcomment');

                              // $('.activatedresult').toggleClass('tablewritingresult');
                              // $('.activatedresult').toggleClass('activatedresult');


                              $('.activatedresult').toggleClass('nomargin');
                              $('.activatedresult').velocity({

                                  width: '100%'

                              }, 1000);

                              $('.activepostcomment').height('100%');
                              $('.activatedresult').addClass('fatborderbottom');


                              $('#results').fadeOut();
                              $('#results').css('opacity','0');

                            }

                            // Submit function of comment form

                            $('.activatedresult').find(".commentform").submit(function(e) {

                                $('.load-bar').show(); // Loading...

                                e.preventDefault();

                                commentText = $(this).find("#commentfield").val(); // Get the comment text

                                commentText = commentText.replace(/&/g , "&amp;");
                                commentText = commentText.replace(/</g , "&lt;");
                                commentText = commentText.replace(/>/g , "&gt;");
                                commentText = commentText.replace(/"/g , "&quot;");
                                commentText = commentText.replace(/'/g , "&#x27;");
                                commentText = commentText.replace(/\//g , "&#x2F;");

                                if (/\S/.test(commentText)) { // string is not empty and not just whitespace


                                    $('.activatedresult').find('#postcomment').fadeOut(); // Away with the form!
                                    $('.activatedresult').find('#postcomment').remove();

                                    $('html, body').stop().velocity({ // UI-hotfix for scrolling back after comment has been sent
                                        scrollTop: offset
                                    }, 800);

                                    var userID = window.localStorage.getItem("userID"); // Get local cookie with stored User ID

                                    // Post comment

                                    $.post('http://democritique.lingonbyran.se/php/addcomment.php',{'userid': userID, 'commenttext': JSON.stringify(encodeURIComponent(commentText)), 'parent': 'none', 'dok_id': JSON.stringify(dok_id)}, function(data) {
                                        $.post('http://democritique.lingonbyran.se/php/comments.php',{'dok_id': dok_id}, function(data) {

                                                $("."+commentclass).empty(); // Remove old data
                                                $("."+commentclass).append(data); // Append data received from server
                                                colorizeComments()
                                                commentButtons()
                                            })

                                        $('.load-bar').hide(); // Post completed!

                                        onBackKeyDown($commenthideHeights);

                                    });

                                    // Comment writing mode deactivated

                                    $('.activatedresult').find('.resultbodytext').fadeIn();
                                    $('.activatedresult').find('.reporttext').fadeIn();
                                    $('.activatedresult').find('.timeline').fadeIn();
                                    $('.activatedresult').find('.activatedresultbuttons').fadeIn();


                                }else{

                                    $('#commentfield').attr('placeholder','Du har inte skrivit något, pröva igen!');
                                    $('.load-bar').hide();

                                };


                            });

                        });

                        // Get comments

                        $.post('http://democritique.lingonbyran.se/php/comments.php',{'dok_id': dok_id}, function(data) {


                            $("."+commentclass).append(data); //append data received from server

                            $("."+commentclass).fadeIn();

                            colorizeComments()
                            commentButtons()

                            $('.load-bar').hide(); // Fetching of comments completed!

                        })



                        // Close result view



                        closeButton()




                        });

};
