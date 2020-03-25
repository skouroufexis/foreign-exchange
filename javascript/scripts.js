

$(function(){
    var primary = $('#divCurrency1').html();
    var secondary = $('#divCurrency2').html();
    var path='https://api.exchangeratesapi.io/latest?base='+primary+'&symbols='+secondary;
    
    $.ajax(path, { dataType: 'json'}).then(function (response) {
    
    calculate(response)  
      
    
    
    
    //function to validate user input
    $('input').on('keyup',function(){
        var amount = $('input').val();
        
        validate(amount);
        
            
    })  
        
    
    //functions to open a modal for selecting another primary or secondary currency
    $('#divCurrency1').click(function(){

        $('.fade').css('opacity','0');
        
        $('main').append('<div id="div_modal" class="centreV"></div>');
        $('#div_modal').append('<div id="div_membrane_modal" class="centreV"></div>');    
        $('#div_membrane_modal').append('<button id="button_modal_close" class="centre">close</button>');
        $('#div_modal').append('<div id="div_currency_list" class="centre"><div class="div_loading centreV" id="div_loading2"><img src="../images/loading.gif" alt="loading icon"></div></div>');

        
        
        var path ='https://api.ratesapi.io/api/latest?base='+$('#divCurrency1').html();
        $.ajax(path,{dataType:'json'}).then(function(response){
            
            var currencies=response.rates;
            
            var currencies2=[]; //create an array to include the currencies, and then use sort() to sort the values
                                //alphabetically
            $.each(currencies,function(item,value){
                currencies2.push(item);
            });
            
            currencies2.sort();
            
            
            $.each(currencies2,function(i,item){
                $('#div_currency_list').append('<button class="button_currency button_currency1">'+item+'</button><br>');
            });
  
        });
        
        setTimeout(animate,100);
        
        $(document).on('click','.button_currency1',function(){
                    var newCurrency = $(this).html();

                            $('#divCurrency1').html(newCurrency);
                            
                    closeModal();
                })
    });
      
    //functions to set the new value for the primary & secondary currency    
    $('#divCurrency2').click(function(){
        
        $('.fade').css('opacity','0');
        
        
        $('main').append('<div id="div_modal" class="centreV"></div>');
        $('#div_modal').append('<div id="div_membrane_modal" class="centreV"></div>');    
        $('#div_membrane_modal').append('<button id="button_modal_close" class="centre">close</button>');
        $('#div_modal').append('<div id="div_currency_list" class="centre"><div class="div_loading centreV" id="div_loading3"><img src="../images/loading.gif" alt="loading icon"></div></div>');
        
        

        var path ='https://api.ratesapi.io/api/latest?base='+$('#divCurrency1').html();
        $.ajax(path,{dataType:'json'}).then(function(response){
            
            var currencies=response.rates;

            var currencies2=[]; //create an array to include the currencies, and then use sort() to sort the values
                                //alphabetically
            $.each(currencies,function(item,value){
                currencies2.push(item);
            });
            
            currencies2.sort();
            
            $.each(currencies2,function(i,item){
                $('#div_currency_list').append('<button class="button_currency button_currency2">'+item+'</button><br>');
            });
  
        });
        
        setTimeout(animate,100);
        
        $(document).on('click','.button_currency2',function(){
                    var newCurrency = $(this).html();

                            $('#divCurrency2').html(newCurrency);
                            
                    closeModal();
                })
    });    
        
    
        
    
     //methods for closing the modal
            
           $(document).on('click','#button_modal_close',function(){
               closeModal();
           })
        
            
            
            document.addEventListener('keydown',function(src){
                if(src.key==='Escape'){
                    closeModal();
                }
            });
            
            $(document).on('click','#div_modal',function(src){
               if(src.target.id==='div_modal'){
                    closeModal();
                }
           });

        function validate(amount){
            if(!isNaN(amount))
                {
                    
                    $('#div_warning').html('');
                    recalculate();
                }
            
            
            
            else
                {

                    $('#div_warning').html('only numbers allowed');
                    $('#result p').html(''); 
                }
        }


        //function to close the modal   
        function closeModal(){
            $('#div_modal').remove();
            $('.fade').css('opacity','1');
            $('#result p').text('');
            $('#div_loading4').removeClass('hide');
            $('#div_loading4').addClass('centreV');
            recalculate();

        }   



        //function to calculate the exchange rate based on the two currencies
        function calculate(response){

           if(!$('#div_loading4').hasClass('centreV'))
               {
                    $('#div_loading4').addClass('centreV');       
               }
           
            
            //retrieve secondary currency and its value    
            var currency2 = response.rates;
            currency2Name=Object.keys(currency2)[0];
            var currency2Value=Object.values(currency2)[0];
            
            var qty = $('input').val();  
            var result =(currency2Value*qty).toFixed(2);
            
            $('#divCurrency1').html(response.base);
            $('#divCurrency2').html(currency2Name);    

            $('#result p').html(result);    
            $('#div_date p').html('Last updated on <b>'+response.date+'</b>');
            $('#div_loading4').removeClass('centreV');
            $('#div_loading4').addClass('hide');
        }      



        //function to recalculate the exchange rate based on the new currencies    
        function recalculate(){

            var primary = $('#divCurrency1').html();
            var secondary = $('#divCurrency2').html();

            var path='https://api.exchangeratesapi.io/latest?base='+primary+'&symbols='+secondary;

            $.ajax(path,{datatype:'json'}).then(function(response){
                calculate(response);
            })

        }    


        //function to animate the entrance of the modal    
        function animate(){
            $('#div_loading2').removeClass('centreV');
            $('#div_loading2').addClass('hide');
            
            $('#div_loading3').removeClass('centreV');
            $('#div_loading3').addClass('hide');
            
            
            $('#div_currency_list').css('opacity','1');
            $('#div_currency_list').css('transform','translateY(0)');

        }    
        
        //function to swap between primary and secondary currency
        $('#button_swap').click(function(){
            var primary = $('#divCurrency1').html();
            var secondary = $('#divCurrency2').html();
            
            $('#divCurrency1').html(secondary);
            $('#divCurrency2').html(primary);

            $('#result p').text('');    
            $('#div_loading4').removeClass('hide');
            $('#div_loading4').addClass('centreV');
                
            recalculate();
            
            
        })
        
    
    
    })

});









