
$(function($) {
	"use strict";

	var checkoutItems = {};
	var totalPrice = 0;

	function initElements(){
		checkoutItems = document.getElementById("checkoutItems");
	}

	function buildCheckoutItems(){
		console.log("-- build checkout items --");
		var strQuery = "";

		for(var i=0; i<aryCart.length; i++){
			var dataVO = aryCart[i];
			console.log(i + " : " + dataVO.name);
			strQuery += createCheckoutItem(dataVO);
			totalPrice += Number(dataVO.price);
		}
		//console.log("-- build : " + totalPrice);
		document.getElementById("checkoutItems").innerHTML = strQuery;
		updateTotal(totalPrice);
	}

	function createCheckoutItem(_dataVO){
		var str = "<div class='row' class='checkoutItem'>" +
		    "<div class='col-lg-2  col-md-2 col-sm-4 col-xs-4'>" +
		        "<img class='img-responsive itemImage' src=" + _dataVO.image + " alt=''>" +   
		    "</div>" +
		    "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 cartItemDetails'>" + 
		        "<h4 class='itemName'>" + _dataVO.name + "</h4>" +
		        "<button type='button' class='btnRemove'>Remove</button>" +
		    "</div>" +
		    "<div class='col-lg-4 col-md-4 col-sm-2 col-xs-2 cartItemDetails'>" +
		        "<h4 class='itemPrice'>Price: " + _dataVO.price + "</h4>" +
		    "</div>" +
		"</div>";

		return str;
	}

	function updateTotal(_val){
		document.getElementById("totalPrice").innerHTML = "Grand Total: " + _val.toLocaleString('en-IN', { style: 'currency', currency: 'PHP' });
	}

	initElements();
	buildCheckoutItems();

	console.log("-- called --");
}(jQuery));

/*
<div class="row" class="checkoutItem">
    <div class='col-lg-2  col-md-2 col-sm-4 col-xs-4'>
        <img class='img-responsive itemImage' src="images/products/item_2.jpg" alt=''>   
    </div>

    <div class='col-lg-6 col-md-6 col-sm-6 col-xs-6 cartItemDetails'>
        
        <h4 class="itemName">Product 1</h4>
        
        <button type='button'>Remove</button>
    </div>
    <div class='col-lg-4 col-md-4 col-sm-2 col-xs-2 cartItemDetails'>
        <h4 class='itemPrice'>Price: 200.00</h4>
    </div>
</div><!-- end checkout item -->

*/