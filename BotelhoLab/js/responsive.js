         
               $('.fa-times').click(function() {
                   $(this).parent().slideUp(250);
               });
               $('.topic, .crew-topic, .topic-media, .motive').click(function() {
                   var Top = $(this);

                   if ($(this).next().is(':visible')) {

                       $(this).next().slideUp();

                   } else {
                       $(this).next().slideDown();
                       setTimeout(function() {
                           $('html,body').animate({
                                   scrollTop: Top.offset().top
                               },
                               250);
                       }, 300)
                   }

                   $('.topic, .crew-topic').not(this).each(function() {
                       $(this).next().slideUp();

                   });




               })
               $('.button').click(function() {
                   $('.portfolio').slideDown();
               });
               $('.fa-chevron-circle-down').click(function() {
                   $("body").css("overflow", "scroll");

                   $('.portfolio').slideUp();
               });
