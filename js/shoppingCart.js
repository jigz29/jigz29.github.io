


$(function($) {
	"use strict";
	
	//localStorage.setItem("aryCart", ["apple", "coconut"])
	// -- SHOW ANIMATE IMAGES --//
	$( document ).ready(function() {
		//console.log("-- init shopping cart -- " + currItemDataVO);
		
		
	});
	//console.log("==>> " + localStorage.getItem("aryCart"));

	function initElements(){
		if(document.getElementById('btnAddToCart')) {
			btnAddToCart = document.getElementById('btnAddToCart');
			btnAddToCart.addEventListener('click', onAddToCartClick);
		}
		
		cartItems = document.getElementById("cartItems");
	}

	function onAddToCartClick(){
		console.log('-- click add to cart --' + currItemDataVO.id);
		addCartItem(currItemDataVO);
		$(".productModal").modal('hide');
	}

	function updateCart(){
		console.log("-- updateCart --");
		if (localStorage.getItem("aryCart")) {
			aryCart = JSON.parse(localStorage.getItem("aryCart"));
			cartItems.innerHTML = "("+aryCart.length+")";
		}
	}

	function addCartItem(_dataVO){
		aryCart.push(_dataVO);
		localStorage.setItem("aryCart", JSON.stringify(aryCart));

		updateCart();
	}

	function removeCartItem(_index){
		aryCart = JSON.parse(localStorage.getItem("aryCart"));
		aryCart.splice(_index, 1);
		//localStorage.setItem("aryCart", JSON.stringify(aryCart));
	}

	function clearCart(){
		localStorage.setItem("aryCart", []);
	}
	
	initElements();
	//clearCart();
	updateCart();

}(jQuery));