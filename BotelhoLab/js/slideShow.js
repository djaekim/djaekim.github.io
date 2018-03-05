
            var url = [
            	'images/2017/Group-Photo-2017.jpg',
            	 'images/Bacteria-fragmentation.png',
            	'images/newspaper.jpg'
            ]
            var time;
            var index = 0;
            var currentOption;
            Timer();
            $('.slide a').click(function(){
              var options = ($(this).attr('id'));
              currentOption = options;
              startTime();

     	      $('.slide a').not(options).each(function(){
	              $(this).children().removeClass('fa fa-circle');
	              $(this).children().addClass('fa fa-circle-o');
              });
              $('#'+options).children().addClass('fa fa-circle');
              
              $('.fade').fadeIn(500);
              $('#header0').children().fadeOut(500);
              setTimeout(function(){
              	 
              	 if (options.toString() == 'circleOne'){
              	 	$('#main > section.one').css('background-image', 'url('+url[0]+')');
              	 	$('#header-1').fadeIn();
              	 	index = 0;

              	 } else if (options == 'circleTwo'){
             	 	 $('#main > section.one').css('background-image', 'url('+url[1]+')');
             	 	 $('#header-2').fadeIn();
              	 	 index = 1;

              	 } else if (options =='circleThree'){
              		 $('#main > section.one').css('background-image', 'url('+url[2]+')');
              		 $('#header-3').fadeIn();
              	 	index = 2;

              	 } 
            	 $('.fade').fadeOut(500);

              },500);
            });
            function Timer (){
            	time = setInterval(function(){
            	$('.fade').fadeIn(500);
            	$('#header0').children().fadeOut(500);
            	 index = (++index % 3);
            	 setTimeout(function(){
            	 	var option;
            	 	$('#main > section.one').css('background-image', 'url('+url[index]+')');

            	 	if (index == 0){
            	 		option = 'circleOne';
            	 		$('#header-1').fadeIn();


            	 	} else if (index == 1){
            	 		option = 'circleTwo';
            	 		$('#header-2').fadeIn();

            	 	} else {
            	 		option = 'circleThree';
            	 		$('#header-3').fadeIn();


            	 	}
	        	 	  $('.slide a').not(option).each(function(){
			              $(this).children().removeClass('fa fa-circle');
			              $(this).children().addClass('fa fa-circle-o');
		              });
	         		  $('#'+option).children().addClass('fa fa-circle');

            	 	$('.fade').fadeOut(500);
            	 },500);
            }, 6000);
            }
            function startTime(){
            	clearInterval(time);
            	Timer();
            }
   
