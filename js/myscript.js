$(function($) {
	"use strict";

	var currSelectedId = "";

	$('.carousel').carousel({
	  interval: 2000
	})
	
	// -- SHOW ANIMATE IMAGES --//
	$( document ).ready(function() {
		var aryFeaturedID = oData.featuredItems;
		var aryFeaturedData = [];
		var el = $('#featuredItems');
		var aryFeaturedItems = $('#featuredItems').find(".catalogue-item");
		var aryCatalogue = oData.catalogue;

		var mainbottom = $('.top-banner').offset().top + $('.top-banner').height() - 60;
		var stop = 0;
		// on scroll, 
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

		console.log("-- " + getItemInCatalogue("ls0008", aryCatalogue).name);
		
		for(var i=0; i<aryFeaturedID.length; i++){
			//getItemInCatalogue(aryFeaturedID[i], aryCatalogue)
			aryFeaturedData.push( getItemInCatalogue(aryFeaturedID[i], aryCatalogue) );
		}

		if(aryFeaturedItems.length > 0){
			initFeaturedItems(aryFeaturedData, aryFeaturedItems);
			initProductModal();
		}

		
	});

	function getItemInCatalogue(_itemID, _aryCatalogue){
		var result = [];
		result = _aryCatalogue.filter(function (el) {
			return ( el.id === _itemID );
		});
		//console.log(_itemID + " : " + result[0].name);

		return result[0];
	}


	// -- This will prepare the featured items -- //
	function initFeaturedItems(_aryFeaturedData, _aryFeaturedItems){
		var aryFeaturedData = [];
		
		for (var i = 0; i < _aryFeaturedData.length; i++) {
			_aryFeaturedItems[i].dataVO = _aryFeaturedData[i];
			var el = _aryFeaturedItems[i]; 
			$(el).find("img").attr("src", el.dataVO.image);
			$(el).find(".itemName").text(el.dataVO.name);
			$(el).find(".itemPrice").text(el.dataVO.price);

			console.log( $(_aryFeaturedItems[i]).find("img").attr("src") );
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
		$('.catalogue-item-content').click(function(){
			$(".productModal").modal('show');
		});

		$('.productModal').on('show.bs.modal', function (event) {
			var modal = $(this);
			modal.find('.modal-title').text("Product Title");
		});
	}



}(jQuery));