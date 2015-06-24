$(function($) {
	"use strict";
	
	var aryCatalogue = [];

	$( document ).ready(function() {
		var itemID = window.location.search.substring(0).split('=')[1];
		
		$('#btnBack').click(onBackClick);

		aryCatalogue = oData.catalogue;
	 	var itemData = getItemData(aryCatalogue, itemID);
	 	loadItem(itemData);
	});

	function loadItem(_itemData){
		console.log("_item data: " + _itemData.name);
		
		$('#itemImage').attr('src', _itemData.image);
		$('.itemName').text(_itemData.name);
		$('.itemPrice').text(_itemData.price);
		$('.itemDescription').text(_itemData.details);
	}

	function getItemData(_aryCatalogue, _itemID){
		var itemData = {};

		var val = _aryCatalogue.filter(function (el) {
			return ( el.id == _itemID );
		});

		itemData = val[0];

		console.log("result: " + val[0].id);

		return itemData;
	}

	// -- EVENTS -- //
	function onBackClick(){
		window.location = "catalogue.html"
	}

}(jQuery));