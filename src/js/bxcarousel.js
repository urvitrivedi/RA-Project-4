// JavaScript Document

export default function (obj) {
//	console.log("")
//	console.log(obj);
	document.getElementById('content').innerHTML = "";	// clear old articles first 
	for(var i=0; i < obj.length; i++){
		
		//console.log(obj[i].includedItemList.length);
		//console.log(obj[i]);
		if(obj[i].includedItemList.length > 0 && obj[i].manufacturer !==null) {
	
			//console.log(obj[i]);

			// Individual Item Image
			var bbImage = obj[i].largeImage;

			// Individual Item Manufacturer
			var bbManufacturer = obj[i].manufacturer;

			//Individual Item URL
			var bbURL = obj[i].url;

			// Individual Add to Cart URL
			var bbURLATC = obj[i].addToCartUrl; 

			// Individual Item Description
			var bbIncludedItem = obj[i].includedItemList[0].includedItem;

			// Individual Regular Price
			var bbRegularPrice = obj[i].regularPrice;

			//Individual Sku Items
			var bbSKU = obj[i].sku;

	//------------------------------------------------------------ JQUERY ---------------------------------------------------------------------//
	
	// New Item
	//var newItem = document.createElement("div");
//	
//	$(newItem).css("background-image","url("+bbImage+")");
//	$(newItem).append("<a href=" + bbURL + ">" + bbManufacturer + bbIncludedItem + bbRegularPrice + "</a>");
//	$(newItem).addClass("section"); //adds new class for Individual Grid Items
//	$("#content").append(newItem);
	
	//------------------------------------------------------------ JQUERY ---------------------------------------------------------------------//
	
	
	//------------------------------------------------------------ JAVASCRIPT -----------------------------------------------------------------//
	
	
			var newItem = document.createElement("div");

			newItem.innerHTML = `
			<h4> ${bbManufacturer} </h4>
			<h6> ${bbIncludedItem} </h6>
			<h5> ${bbRegularPrice} </h5>
			<button class="addtocart" data-sku="${bbSKU}" data-price="${bbRegularPrice}"> Add to Cart </button>`;
			newItem.setAttribute('class', 'product-item');
			newItem.style.backgroundImage="url('"+bbImage+"')";
			document.getElementById('content').appendChild(newItem);

	//------------------------------------------------------------ JAVASCRIPT -----------------------------------------------------------------//
	}
		else{
			
		}

	}	

}









