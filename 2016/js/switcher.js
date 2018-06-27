(function ($j) {

  switch_style = {

    onReady: function () {      
      this.switch_style_click();
    },
    
    switch_style_click: function(){
    	$(".colorbox").click(function(){
    		var id = $(this).attr("id");
    		
    		$("#switch_style").attr("href", "css/colors/" + id + ".css");    		
    	});
    },
  };

  $j().ready(function () {
	  switch_style.onReady();
  });

})(jQuery);

$( ".hiddenbox" ).click(
  function() {
    $(".colorbox-container").toggle('slide');
  }
);