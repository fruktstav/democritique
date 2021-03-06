function getPosts(type, sorting, pageCount) {

  $('.load-bar').show();



  $.post('http://democritique.lingonbyran.se/php/fetchReports.php',{'page': pageCount, 'type': type, 'sorting': sorting}, function(data) { //ajax command

      $(".noresultsfound").remove();
      $("#results").append(data); //append data received from server

      colorizeResults();
      clickHandlers();

      $("#results").show();

      $('.result').last().addClass('zigzag');

      $('.result').each(function(){

        if(!$(this).hasClass('animatedresult')) {

          $(this).addClass('newresult');

        }

      });



      $('.newresult').each(function(index){


        $(this).css('opacity','0');
        $(this).css('transform','scaleX(0.5)');

        $(this).show();

        $(this).delay(index*100).animate({transform: 'scaleXY(1)', opacity: '1'});


        $(this).next().animate({
              'transform': 'scaleX(20)'
            }, 500);

        $(this).removeClass('newresult');
        $(this).addClass('animatedresult');

      });


      $('.load-bar').hide();

  });
  // $('.zigzag').delay(1000).first().toggleClass('zigzag');

}

function getPost(dok_id) {

  $('.load-bar').show();

  $.post('http://democritique.lingonbyran.se/php/fetchReport.php',{'dok_id': dok_id}, function(data) { //ajax command

      $('#bodyid').append(data);

      $('.openedResult').addClass('activatedresult');


      colorizeResults();
      clickHandlers();

      colorizeComments()
      commentButtons()


      $('.load-bar').hide();

      openArticle()

      $uistate = "openedResult";

  });

}

function getNews(pageCount) {

  $('.load-bar').show();



  $.post('http://democritique.lingonbyran.se/php/fetchNews.php',{'page': pageCount}, function(data) { //ajax command

      $("#results").append(data); //append data received from server
      colorizeResults();
      clickHandlers();

      $('.result').each(function(){

        var momentSubject = $(this).find('.moment').text();

        momentSubject = moment(momentSubject, "YYYY-MM-DD HH:mm:ss").lang('sv').fromNow();

        $(this).find('.moment').text(momentSubject);

      });

      $("#results").show();

      $('.result').stop().fadeIn();

      $('.divisor').velocity({
            'width': '100%'
          }, 1500);

      $('.load-bar').hide();

  });

}

function getStartPage() {

  $('.load-bar').show();

  $.post('http://democritique.lingonbyran.se/php/fetchStartPage.php', function(data) { //ajax command

      $("#results").empty();

      $("#results").append(data); //append data received from server

      clickHandlers();

      $("#results").show();

      $('.result').stop().fadeIn();

      $('.load-bar').hide();


      $('.startpagenews').find('.divisor').last().remove();
      $('.startpagedecisions').find('.divisor').last().remove();



      $('.startpagenews').find('.result').each(function(){

        var element = $(this).find('.resultheader').find('p');

        $(this).find('.resultheader').find('.reporttext').remove();

        $(this).find('.reporttext').clone().insertAfter(element);

        $(this).find('.resultheader').find('.reporttext').css('display', '-webkit-box').removeClass('reporttext').removeClass('commenthide').removeClass('timelinehide').addClass('newstext');

        var momentSubject = $(this).find('.moment').text();

        momentSubject = moment(momentSubject, "YYYY-MM-DD HH:mm:ss").lang('sv').fromNow();

        $(this).find('.moment').text(momentSubject);

      });

      $('.startpagedecisions').find('.result').each(function(){

        var element = $(this).find('.resultheader').find('p');

        $(this).find('.resultheader').find('.decision').remove();

        $(this).find('.decision').clone().insertAfter(element);

        $(this).find('.resultheader').find('.decision').css('display', '-webkit-box').removeClass('decision').removeClass('commenthide').removeClass('timelinehide').addClass('newstext');

        $(this).find('.newstext').find('p').slice(2).remove();
        $(this).find('.newstext').find('ul').remove();
        $(this).find('.newstext').find('li').remove();

      });

      colorizeResults()

      $.ajax({
      type: 'POST',
      url: 'http://democritique.lingonbyran.se/php/fetchGlobalVotesData.php',
      success: function (data) {
      lineChartData = JSON.parse(data);

      var ctx = $('#globalvotes');

            var values = data;

            var graphdata = JSON.parse(data);

            var labels = [];

            i = 6;

            while (i >= 0) {

              var day = moment().subtract(i, 'days').format('D [/] M');
              labels.push(day);
              i--;

            }

            var chartdata = {
          labels: labels,
          datasets: [
              {
                  label: "M",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(95, 200, 243, 0.2)",
                  borderColor: "rgba(95, 200, 243, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(255,255,255,0.5)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['M'],
                  spanGaps: false,
              },
              {
                  label: "S",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(236, 27, 52, 0.2)",
                  borderColor: "rgba(236, 27, 52, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['S'],
                  spanGaps: false,
              },
              {
                  label: "L",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(17, 106, 181, 0.2)",
                  borderColor: "rgba(17, 106, 181, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['L'],
                  spanGaps: false,
              },
              {
                  label: "MP",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(43, 145, 44, 0.2)",
                  borderColor: "rgba(43, 145, 44, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['MP'],
                  spanGaps: false,
              },
              {
                  label: "V",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(253, 0, 0, 0.2)",
                  borderColor: "rgba(253, 0, 0, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['V'],
                  spanGaps: false,
              },
              {
                  label: "SD",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(95, 200, 243, 0.2)",
                  borderColor: "rgba(95, 200, 243, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['SD'],
                  spanGaps: false,
              },
              {
                  label: "KD",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(147, 49, 146, 0.2)",
                  borderColor: "rgba(147, 49, 146, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['KD'],
                  spanGaps: false,
              },
              {
                  label: "C",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(1, 106, 58, 0.2)",
                  borderColor: "rgba(1, 106, 58, 1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: graphdata['C'],
                  spanGaps: false,
              }
          ]
      };



            var myChart = new Chart(ctx, {
                type: 'line',
                data: chartdata,
                options: {
                    scaleLabel: 'procentuellt samtycke med befolkningen',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:false
                            }
                        }]
                    }
                }
            });
      }
      });
//
//       var ctx = $('#globalvotes');
//
//       var values = [33, 22, 55, 77, 44, 33, 40];
//
//
//       var data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "rgba(75,192,192,0.4)",
//             borderColor: "rgba(75,192,192,1)",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(75,192,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,192,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: [65, 59, 80, 81, 56, 55, 40],
//             spanGaps: false,
//         },
//         {
//             label: "My First dataset",
//             fill: false,
//             lineTension: 0.1,
//             backgroundColor: "rgba(255,192,192,0.4)",
//             borderColor: "rgba(255,192,192,1)",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(75,192,192,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(75,192,192,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             pointRadius: 1,
//             pointHitRadius: 10,
//             data: values,
//             spanGaps: false,
//         }
//     ]
// };
//       var myChart = new Chart(ctx, {
//           type: 'line',
//           data: data,
//           options: {
//               scales: {
//                   yAxes: [{
//                       ticks: {
//                           beginAtZero:true
//                       }
//                   }]
//               }
//           }
//       });

  });

}
