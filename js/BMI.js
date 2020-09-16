jQuery(function(){

 
	jQuery('#btn_calculate').click(function(){ //On clicking the button, calculate the Basal Metabolic Rate and display in the div.
		
		jQuery('td').css('border-style' , 'hidden'); //reset the 'td' elements in case one was selected before.
		
		jQuery('#display_BMR').text(calculateBMR());
		jQuery('#display_BMI').text(calculateBMI());
		
		var $height = jQuery("input[name='txt_height']").val();
		var $weight = jQuery("input[name='txt_weight']").val();
		
		jQuery('tr#'+ $height).children('td').each(function() { 
    		
			var num = $(this).text();
			
			if(parseInt(num) > parseInt($weight) ){ //if num > weight, previous cell gets changed, then return false to break out of the loop.
				   		 						    //Note that when pulling data from the form they are strings and must be converted.	
							
				jQuery(this).prev('td').css({
					'border-style' : 'dashed',
					'border-color' : 'blue' ,
					
				 });
				return false;
			}else if(parseInt(num) == parseInt($weight)){ //if num == weight, change the current .css for that cell.
				jQuery(this).css({
					'border-style' : 'dashed',
					'border-color' : 'blue' ,
				});
				//var previousCell = jQuery(this).prev();	
				return false;
			}
			
			
		});	
	});
	
	function calculateBMR(){ // This is a separate function to calculate the BMR of a male.
		 var $height = jQuery("input[name='txt_height']").val();
		 var $weight = jQuery("input[name='txt_weight']").val();
		 var $age = jQuery("input[name='txt_age']").val();
		 var $activity = $("input[name='activity']:checked").val();
	
		 var $BMR = 66 + (6.2 * $weight) + (12.7 * $height) - (6.76 * $age);
		
		switch($activity){
				case 'sedentary': $BMR = $BMR * 1.2;
				break;
				case 'light': $BMR = $BMR * 1.375;
				break;
				case 'moderate': $BMR = $BMR * 1.55;
				break;
				case 'high': $BMR = $BMR * 1.725;
				break;
				case 'athlete': $BMR = $BMR * 1.9;
				break;
			}
		$BMR = $BMR.toFixed(2); //Format BMR to 2 decimal places.
		
		return $BMR;
	}
	
	function calculateBMI(){
		
		// formula is BMI = kg/m2 where kg is a person's weight in kilograms 
		// and m2 is their height in metres squared. A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9.
		
		var $kg = jQuery("input[name='txt_weight']").val() * 0.45359237;
		var $meters = jQuery("input[name='txt_height']").val() * 0.0254;
		var $BMI = $kg/($meters * $meters);
		
		$BMI = $BMI.toFixed(1);
		
		return $BMI;
	}
});