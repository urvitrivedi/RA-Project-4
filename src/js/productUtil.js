// JavaScript Document

export default class{
	constructor(){
		//console.log("ggg");
		this.netCartCount();
		this.netItems = 0;
		this.netPrice = 0;
		this.sku = "";
		this.price = "";
		this.quantity = "";
		this.netCartPrice();
		this.renderProductitems();
		//this.cartList();
	}

	addToCart(sku, price, quantity){
		//console.log(sku);
		//console.log(price);
		var cart = {
			sku:sku,
			quantity : 0,
			price : price,
			totalPrice : 0,
			netItems : 0
		};
		
		// Add Items to Cart
		
		//---------------------------------
		
		
		var item = JSON.parse(sessionStorage.getItem(sku));
		var cartOverallItems = null;

		if(typeof(Storage)!==undefined){
			
			if (item === null) {
				cart.price = cart.price;
				cart.quantity = 1;
				cart.totalPrice = cart.price * cart.quantity;
			}
			else {
				cart.price = cart.price;
				cart.quantity = item.quantity + 1;
				cart.totalPrice = cart.price * cart.quantity;
			}
		}// End Storage If condition
		
		else {
			alert("No Storage");
		} // End Storage Else Condition
		//this.netItems++;
		console.log('qty', cart.quantity, 'netItems', this.netItems);
		sessionStorage.setItem(sku,JSON.stringify(cart));
		cartOverallItems = JSON.parse(sku);
		
		//---------------------------------
		
		//sessionStorage.setItem(sku,JSON.stringify(cart));
		//let item = JSON.parse(sessionStorage.getItem(sku));
		//console.log(item);
		
//		document.getElementById("sku").innerHTML = (`${sku}`);
//		document.getElementById("quantity").innerHTML = (`${cart.quantity}`);
//		document.getElementById("total-price").innerHTML = (`${cart.totalPrice}`);
		//document.getElementById("cart-overallitems").innerHTML = this.netItems;
		this.netCartCount();
		this.netCartPrice();
		this.renderProductitems();
		//this.cartList(sku,quantity,price);
		
	}// End addToCart
	
	netCartCount(){
		this.netItems = 0;
		for (var i=0; i<sessionStorage.length; i++){
			//console.log('netItems', this.netItems);
			if(this.netItems === 0){
				var x = sessionStorage.key(i);
				//console.log(x);
				this.netItems = JSON.parse(sessionStorage.getItem(x)).quantity;
			}
			else{
				var x = sessionStorage.key(i);
				this.netItems += JSON.parse(sessionStorage.getItem(x)).quantity;
			}
			//console.log('netItems after if/else:', this.netItems);
		}
		//document.getElementById("cart-overallitems").innerHTML = sessionStorage.length;
		document.getElementById("cart-overallitems").innerHTML = this.netItems;
		
	}
	netCartPrice(){
		this.netPrice = 0;
		for (var i=0; i<sessionStorage.length; i++){
			//console.log('netPrice', this.netPrice);
			if(this.netPrice === 0){
				var y = sessionStorage.key(i);
				this.netPrice = JSON.parse(sessionStorage.getItem(y)).totalPrice;
			}
			else{
				var y = sessionStorage.key(i);
				this.netPrice += JSON.parse(sessionStorage.getItem(y)).totalPrice * JSON.parse(sessionStorage.getItem(y)).quantity;
			}
			//console.log('netPrice after if/else:', this.netPrice);
		}
		document.getElementById("netprice").innerHTML = this.netPrice;
	}
	
	renderProductitems(){
//		this.sku = "";
//		this.price = "";
//		this.quantity = "";
		for (var i=0; i<sessionStorage.length; i++){
			//$(".StoreCartValues").attr('SKU',sku);
			//var storeCartValues = $(".StoreCartValues").getItem(sku,price,quantity,totalPrice);
			var z = sessionStorage.key(i);
//			this.sku = JSON.parse(sessionStorage.getItem(z)).sku;
//			this.quantity = JSON.parse(sessionStorage.getItem(z)).quantity;
//			this.totalPrice = JSON.parse(sessionStorage.getItem(z)).totalPrice;
			var renderSku = JSON.parse(sessionStorage.getItem(z)).sku;
			var renderQuantity = JSON.parse(sessionStorage.getItem(z)).quantity;
			var renderPrice = JSON.parse(sessionStorage.getItem(z)).price;
			this.cartList(renderSku,renderQuantity,renderPrice);

		}
//		document.getElementById("sku").innerHTML = this.sku;
//		document.getElementById("quantity").innerHTML = this.quantity;
//		document.getElementById("total-price").innerHTML = this.totalPrice;
	}
	
	cartList(sku,quantity,price){
		var cartItemList = $('<div class="itemRows" id='+sku+'></div');
		//if this is the first time we are adding this product to the cart
		if($('#'+sku).length===0){
			//var cartItemList = $('<div class="itemRows" id='+sku+'></div');
			cartItemList.html('<p class="itemSku">'+'SKU'+" "+ sku +'</p>'+'<div>'+'</div>'+
				'<p class="cartListQuantity">'+'QUANTITY'+'</p>'+'<input type="text" value='+quantity+'>'+
				'<p>' + 'PRICE' + '<span class="cartListPrice">' + price + '</span>' +'</p>'+'<p class="cartListSubTotal">'+'SUB TOTAL'+" "+(price * quantity)+'</p>'+'<div>'+'</div>'+
				'<button type="button">'+'UPDATE'+'</button>'+'<button type="button">'+'REMOVE'+'</button>');
			$('.listItems').append(cartItemList);
		}
		//else just update the qty and subtotal
		else{
			
			var a = $('#'+ sku).find('input').val();
			var b = $('#'+ sku).find(".cartListPrice").text();
			console.log(a,b);
			
			var c = a * b;
			console.log(c);
			
			
			
		}
	}
	
	/* removeItemFromCart (sku) { // Removes one item
        for (var i in cart) {
            if (cart[i].sku === sessionStorage.getItem(sku)) { // "3" === 3 false
                cart[i].netItems--; // cart[i].count --
                if (cart[i].netItems === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    removeItemFromCartAll(sku) { // removes all item name
        for (var i in cart) {
            if (cart[i].sku === sessionStorage.getItem(sku)) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    clearCart() {
        cart = [];
        saveCart();
    }
	*/
	
	
}// End Default