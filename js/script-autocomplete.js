$(document).ready(function(){
   
   $("#brand").autocomplete({
      source: "php/json_brand.php",
      
      focus: function( event, ui ) {
         $( "#brand" ).val( ui.item.label);
         
      },

      select: function( event, ui ) {
         $( "#brand" ).val( ui.item.label);
         $( "#brandId" ).val( ui.item.value);
         return false;
      },

      minLength: 2,
      delay: 100,

   }).focus();

});