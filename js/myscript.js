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
	
	// -- SHOW ANIMATE IMAGES --//
	$( document ).ready(function() {

		var aryFeatured= oData.featuredItems;
		var el = $('#featuredItems');
		var el1 = el.children(".catalogue-item");

		$('img').imgLoad(function(){
		    $(".catalogue-item").show();
		});
		
	});




}(jQuery));