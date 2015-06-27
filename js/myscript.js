$(function($) {
	"use strict";

	$('.carousel').carousel({
	  interval: 2000
	})

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

	
	
	// -- SHOW ANIMATE IMAGES --//
	$( document ).ready(function() {
		var aryFeaturedData= oData.featuredItems;
		var el = $('#featuredItems');
		var aryCatalogueItems = $('#featuredItems').find(".catalogue-item");
		var el1 = oData.catalogue;

console.log(el1);
		console.log($(el1).find('ls0008'));

		if(aryCatalogueItems.length > 0){
			initFeaturedItems(aryFeaturedData,aryCatalogueItems);
			initProductModal();
		}

		
	});

	function initFeaturedItems(aryFeaturedData, _aryCatalogueItems){

		for (var i = 0; i < aryFeaturedData.length; i++) {
			//aryFeaturedData[i]
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