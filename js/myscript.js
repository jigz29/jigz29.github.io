$(function($) {
	"use strict";

	var mainbottom = $('.top-banner').offset().top + $('.top-banner').height() - 50;
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




	/*
	var topoffset = 10;

	// Activate Scrollspy
	$('body').scrollspy({
		target: 'header .navbar',
		offset: topoffset
	});

	$('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
		console.log("== ==");
	    var hash = $(this).find('li.active a').attr('href');
	    if(hash !== '#slideshow') {
	    $('header nav').addClass('inbody');
	    } else {
		    $('header nav').removeClass('inbody');
		}
	});

	$('.carousel').carousel({
	  interval: 2000
	})
*/
	
	$( document ).ready(function() {
		var aryFeatured= oData.featuredItems;
		var el = $('#featuredItems');
		var el1 = el.children(".catalogue-item");
		//var img = $( el1[0] ).find('item_image');
		console.log("-->> " + el1.length);

		
	});

}(jQuery));