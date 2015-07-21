$(function($) {
	"use strict";

	var aryFeaturedID = oData.featuredItems;
	var aryFeaturedData = [];
	var el = $('#featuredItems');
	var aryFeaturedItems = $('#featuredItems').find(".catalogue-item");
	var aryCatalogue = oData.catalogue;

	var mainbottom = $('.top-banner').offset().top + $('.top-banner').height() - 60;
	var stop = 0;

	$('.carousel').carousel({
	  interval: 2000
	})
	
	// -- SHOW ANIMATE IMAGES --//
	$( document ).ready(function() {
		init();
	});

	function init(){
		// -- ON SCROLL HEIGHT, SHOW MENU -- //
		$(window).on('scroll',function(){
		    // we round here to reduce a little workload
		    stop = Math.round($(window).scrollTop());

		    //console.log("--- stop " + stop + " > " + mainbottom+" --");
		    if (stop > mainbottom) {
		        $('.navbar-default').addClass('inbody');
		    } else {
		        $('.navbar-default').removeClass('inbody');
		   }
		});
		
		// -- GET FEATURED ITEMS DATA FROM CATALOGUE --//
		for(var i=0; i<aryFeaturedID.length; i++){
			//getItemInCatalogue(aryFeaturedID[i], aryCatalogue)
			aryFeaturedData.push( getItemInCatalogue(aryFeaturedID[i], aryCatalogue) );
		}

		if(aryFeaturedItems.length > 0){
			initFeaturedItems(aryFeaturedData, aryFeaturedItems);	// -- populate featured items elements//
			initProductModal();
		}
	}

	function getItemInCatalogue(_itemID, _aryCatalogue){
		var result = [];
		result = _aryCatalogue.filter(function (el) {
			return ( el.id === _itemID );
		});
		console.log(_itemID + " : " + result[0].name);

		return result[0];
	}


	// -- This will prepare the featured items -- //
	function initFeaturedItems(_aryFeaturedData, _aryFeaturedItems){
		var aryFeaturedData = [];
		
		for (var i = 0; i < _aryFeaturedData.length; i++) {

			var el = $(_aryFeaturedItems[i]); 
			el.data("dataVO", _aryFeaturedData[i]);	// -- attach featured data to element
			el.find("img").attr("src", el.data('dataVO').image);
			el.find(".itemName").text(el.data('dataVO').name);
			el.find(".itemPrice").text(el.data('dataVO').price);
		};

		$.fn.imgLoad = function(callback) {
	        return this.each(function() {
	            if (callback) {
	                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
	                    callback.apply(this);
	                }else {
	                    $(this).on('load', function(){
	                        callback.apply(this);
	                    });
	                }
	            }
	        });
	    };

	    $(".itemDetails").css('display', 'block');
		/*
		$('img').imgLoad(function(){
		    $(".itemDetails").fadeIn(600);
		});
		*/
	}

	// -- This will initialize the item modal -- //
	function initProductModal(){
		$('.catalogue-item').click(function(){
			currItemDataVO = $(this).data('dataVO');

			$('.modal-title').text(currItemDataVO.name);
			$('.modal-body .item_image').attr("src", currItemDataVO.image);
			$('.modal-body .itemModalDescription').text(currItemDataVO.details);
			$('.modal-body .itemPrice').text(currItemDataVO.price);
			
			$(".productModal").modal('show');
		});

		$('.productModal').on('show.bs.modal', function (event) {
			//var modal = $(this);
			//modal.find('.modal-title').text("Product Title");
		});
	}



}(jQuery));