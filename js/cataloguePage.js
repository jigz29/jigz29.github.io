$(function($) {

	var listElement = $('#itemsGallery');
	var drpCategory = $("#drpCategory");
	var drpSection = $("#drpSection");
	var perPage = 8; 
	var numItems = 0;
	var numPages = 0;
	var currPage = 0;
	var totalPageItems = 0;
	var ctrImageLoaded = 0;
	var currCategory = "";
	var currSection = "";
	var aryCategory = [];
	var arySection = [];
	var aryFilteredData = [];
	
	$( document ).ready(function() {
	   console.log(" num items: " + numPages);

	    // -- INITIALIZE -- //
	    aryCategory = oData.categoryItems;
	    arySection = oData.sectionItems;

	    initDropdownLists( aryCategory, arySection);

		currCategory = aryCategory[0];
		currSection = arySection[0];
		setupGallery(oData.catalogue, currCategory, currSection);

	});

	// -- PAGINATION PAGE CLICK EVENT -- //
	function onPageClick(_evt, _origEvent, _type, _page){
    	console.log(" page: " +_page);
    	buildGallery(aryFilteredData, _page);
	}

	// -- CATEGORY DROP DOWN CLICK EVENT -- //
	function onDropCategoryClicked(){
		currCategory = $(this).text();
		setupGallery(oData.catalogue, currCategory, currSection);
	}

	// -- SECTION DROP DOWN CLICK EVENT -- //
	function onDropSectionClicked(){
		currSection = $(this).text();
		setupGallery(oData.catalogue, currCategory, currSection);
	}

	// -- EVENTS --//
	function onItemClick(){
		//console.log("-- clicked --");
		var itemID = $(this).attr('itemID');
    	window.location = "itemPage.html?itemID=" + itemID;
	}

	function onItemHover(){
		var eItemImage = $( this ).find('.item_image')[0];
		var eItemDetails = $( this ).find('.itemDetails')[0];
		var eBtn = $( this ).find('.btn-felgi')[0];
	    $(eItemImage).addClass('select');
	    $(eItemDetails).addClass('select');
	    $(eBtn).addClass('select');
	}

	function onItemOut(){
		var el = $( this ).find('.item_image')[0];
		var eItemDetails = $( this ).find('.itemDetails')[0];
		var eBtn = $( this ).find('.btn-felgi')[0];
		$(el).removeClass('select');
		$(eItemDetails).removeClass('select');
		$(eBtn).removeClass('select');
	}

	function setupGallery(_aryData, _category, _section){
		aryFilteredData = filteredCategoryList( _aryData, _category, _section );
		var pageNav = $('#pageNav');



		if(aryFilteredData.length > 0) {
			numItems = aryFilteredData.length;
			numPages = Math.ceil(numItems/perPage);

		    // -- PAGINATION -- //
		    var options = {
		        bootstrapMajorVersion:3,
		        currentPage: 1,
		        numberOfPages: numPages,
		        totalPages: numPages,
		        onPageClicked: onPageClick
		    }
		    pageNav.bootstrapPaginator(options);
		    pageNav.css("visibility", "visible");
		    buildGallery(aryFilteredData, 1);

		}else{
			$("#itemsGallery").html("");
			pageNav.css("visibility", "hidden");
		}

		//-- SET CATEGORY CURRENT TITLE --//
		var strTitle = "<h1>" + _category.toUpperCase() + "<span id='subTitle'>" + _section.toUpperCase() + "</span></h1>";
		$('.titleContent').html( strTitle );
		
	}

	// -- GET FILTERED CATEGORY / SECTION LIST -- //
	function filteredCategoryList(_aryData, _category, _section){
		console.log("cat: " + _category + " sec: " + _section);

		var oList = [];
		if(_category === "all" && _section === "all"){
			oList = _aryData;
		}else{
			oList = _aryData.filter(function (el) {
				if(_category != "all" && _section === "all") {
					return ( el.category === _category );
				}else if(_category === "all" && _section != "all"){
					return ( el.section === _section );
				}else{
					return ((el.category === _category) && (el.section === _section));
				}    
			});
		}

		return oList;
	}

	// -- BUILD CATALOGUE DROP DOWN LISTS -- //
	function initDropdownLists(_aryCategory, _arySection){
		var elCategory = $("#drpCategory ul");
		var content = "";
		for(var i=0; i<_aryCategory.length; i++){
			content += "<li><a href='#'>"+ _aryCategory[i] +"</a></li>";
		}
		elCategory.html(content);
		
		var elSection = $("#drpSection ul");
		content = "";
		for(var j=0; j<_arySection.length; j++){
			content += "<li><a href='#'>"+ _arySection[j] +"</a></li>";
		}
		elSection.html(content);

		$("#drpCategory ul li a").click( onDropCategoryClicked );
		$("#drpSection ul li a").click( onDropSectionClicked );
	}

	// -- BUILD CATALOGUE GALLERY -- //
	function buildGallery(_aryData, _page){
		var index =(_page - 1) * perPage;
		var limit = index + perPage;
		console.log("-- limit " + limit);

		if(limit > numItems) limit = numItems;
		$("#itemsGallery").html("");
		ctrImageLoaded = 0;
		totalPageItems = (limit - index);

		//console.log("first: " + index + "  limit: " + limit);

		for(i=index; i<limit; i++){
			//console.log("index: " + i);
			var item = new ItemCategory(_aryData[i]);
			
			$("#itemsGallery").append(item.itemTag);
		}

		// -- SET SELECTED PAGE ON ITEM CLICK -- //
		$('.catalogue-item a').click(onItemClick);
		// -- SET ITEM HOVER ANIMATION --//
		$('.catalogue-item').hover( onItemHover, onItemOut);

		$('.item_image').oLoader({
	        waitLoad: true,
	        fadeLevel: 0.9,
	        backgroundColor: '#fff',
	        style:0,
	        image: 'images/loader/loader2.gif',
	        complete:function(){
	        	ctrImageLoaded++;
	        	//if(ctrImageLoaded === totalPageItems) $(".catalogue-item").show();
	        	if(ctrImageLoaded === totalPageItems) {
	        		$(".itemDetails").fadeIn(600);
	        	}
	        	//console.log("-- image loaded -- " + ctrImageLoaded + " pages: " + totalPageItems);
	        }
      	});
	}

	// -- ITEM CATEGROY CLASS -- //
	function ItemCategory(_oItemData){
		//console.log(_oItemData);
		this.itemTag = "<div class='col-lg-3 col-md-3 col-sm-6 catalogue-item'>"+
		    "<div class='catalogue-item-content'><a itemID=" + _oItemData.id + " href='#' data-target='.productBox'>"+
		        "<img class='img-responsive item_image' src="+ _oItemData.image +" alt=''>"+
		        "<div class='itemDetails'>"+
		        	"<h4>"+ _oItemData.name +"</h4>" +
		        	"<p class='itemPrice'>price: " + _oItemData.price + "</p>" +
		        	"<button type='button' class='btn btn-info center-block' data-toggle='modal' >Buy Now</button>" +
		    	"</div>" +
		    "</a></div>"+
		"</div>";

	}


}(jQuery));