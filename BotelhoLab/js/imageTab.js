          function openCity(evt, cityName) {
              $('.tabcontent').not('#' + cityName).each(function(){
                $(this).fadeOut();
              })
              
              if (!($('#' + cityName)).is(':visible')) {
                    
                   $('#' + cityName).fadeIn();
              } else {
                $('#' + cityName).fadeOut();
              }
            
             
             
          }


          $('.tablinks').click(function() {
              var reference = $(this);
              $('html,body').animate({
                      scrollTop: reference.offset().top
                  },
                  500);
          });
