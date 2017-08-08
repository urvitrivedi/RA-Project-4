(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (obj) {
	//	console.log("")
	//	console.log(obj);
	document.getElementById('content').innerHTML = ""; // clear old articles first 
	for (var i = 0; i < obj.length; i++) {

		//console.log(obj[i].includedItemList.length);
		//console.log(obj[i]);
		if (obj[i].includedItemList.length > 0 && obj[i].manufacturer !== null) {

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

			newItem.innerHTML = "\n\t\t\t<h4> " + bbManufacturer + " </h4>\n\t\t\t<h6> " + bbIncludedItem + " </h6>\n\t\t\t<h5> " + bbRegularPrice + " </h5>\n\t\t\t<button class=\"addtocart\" data-sku=\"" + bbSKU + "\" data-price=\"" + bbRegularPrice + "\"> Add to Cart </button>";
			newItem.setAttribute('class', 'product-item');
			newItem.style.backgroundImage = "url('" + bbImage + "')";
			document.getElementById('content').appendChild(newItem);

			//------------------------------------------------------------ JAVASCRIPT -----------------------------------------------------------------//
		} else {}
	}
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bestbuy = require("./bestbuy");

var _bestbuy2 = _interopRequireDefault(_bestbuy);

var _bxcarousel = require("./bxcarousel");

var _bxcarousel2 = _interopRequireDefault(_bxcarousel);

var _productUtil = require("./productUtil");

var _productUtil2 = _interopRequireDefault(_productUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.baseurl = "https://api.bestbuy.com/v1/products";
		this.url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))";
		this.initBBCall();
		this.productNavigation();
		this.productUtil = new _productUtil2.default();
		console.log(sessionStorage);
	}

	_createClass(App, [{
		key: "initBBCall",
		value: function initBBCall() {
			var _this = this;

			(0, _bestbuy2.default)({ url: this.url, api: "8ccddf4rtjz5k5btqam84qak" })
			//request({url: "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))",api : "8ccddf4rtjz5k5btqam84qak"})
			.then(function (data) {
				/* fill carosel with products */
				(0, _bxcarousel2.default)(data.products);
				_this.addToCart();
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		} // End initBBCall()

	}, {
		key: "productNavigation",
		value: function productNavigation() {
			var _this2 = this;

			$(".option").on('click', function (e) {
				var target = e.target.value;
				_this2.url = _this2.baseurl + target;
				_this2.initBBCall();
			});
		}
	}, {
		key: "addToCart",
		value: function addToCart() {
			var _this3 = this;

			var atc = document.getElementsByClassName('addtocart');
			for (var i = 0; i < atc.length; i++) {
				atc[i].addEventListener("click", function (e) {
					var sku = e.target.getAttribute("data-sku");
					var price = e.target.getAttribute("data-price");
					var quantity = 1;
					_this3.productUtil.addToCart(sku, price, quantity);
				});

				//$("#show-cart").html(output);
			}

			//========== JAVASCRIPT ==============//

			//========== JQuery ==============//
			//		$(".addtocart").on('click', function(){
			//			var sku = $(this).attr("data-sku");
			//			var price = $(this).attr("data-price");
			//			new productUtil().addToCart(sku, price);
			//		});
			//========== JQuery ==============//
		} // End addtocart()


		//================================================================================================================================================


		//================================================================================================================================================


	}]);

	return App;
}(); // End Class App


exports.default = App;
var x = new App();

},{"./bestbuy":1,"./bxcarousel":2,"./productUtil":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JavaScript Document

var _class = function () {
	function _class() {
		_classCallCheck(this, _class);

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

	_createClass(_class, [{
		key: "addToCart",
		value: function addToCart(sku, price, quantity) {
			//console.log(sku);
			//console.log(price);
			var cart = {
				sku: sku,
				quantity: 0,
				price: price,
				totalPrice: 0,
				netItems: 0
			};

			// Add Items to Cart

			//---------------------------------


			var item = JSON.parse(sessionStorage.getItem(sku));
			var cartOverallItems = null;

			if ((typeof Storage === "undefined" ? "undefined" : _typeof(Storage)) !== undefined) {

				if (item === null) {
					cart.price = cart.price;
					cart.quantity = 1;
					cart.totalPrice = cart.price * cart.quantity;
				} else {
					cart.price = cart.price;
					cart.quantity = item.quantity + 1;
					cart.totalPrice = cart.price * cart.quantity;
				}
			} // End Storage If condition

			else {
					alert("No Storage");
				} // End Storage Else Condition
			//this.netItems++;
			console.log('qty', cart.quantity, 'netItems', this.netItems);
			sessionStorage.setItem(sku, JSON.stringify(cart));
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
		} // End addToCart

	}, {
		key: "netCartCount",
		value: function netCartCount() {
			this.netItems = 0;
			for (var i = 0; i < sessionStorage.length; i++) {
				//console.log('netItems', this.netItems);
				if (this.netItems === 0) {
					var x = sessionStorage.key(i);
					//console.log(x);
					this.netItems = JSON.parse(sessionStorage.getItem(x)).quantity;
				} else {
					var x = sessionStorage.key(i);
					this.netItems += JSON.parse(sessionStorage.getItem(x)).quantity;
				}
				//console.log('netItems after if/else:', this.netItems);
			}
			//document.getElementById("cart-overallitems").innerHTML = sessionStorage.length;
			document.getElementById("cart-overallitems").innerHTML = this.netItems;
		}
	}, {
		key: "netCartPrice",
		value: function netCartPrice() {
			this.netPrice = 0;
			for (var i = 0; i < sessionStorage.length; i++) {
				//console.log('netPrice', this.netPrice);
				if (this.netPrice === 0) {
					var y = sessionStorage.key(i);
					this.netPrice = JSON.parse(sessionStorage.getItem(y)).totalPrice;
				} else {
					var y = sessionStorage.key(i);
					this.netPrice += JSON.parse(sessionStorage.getItem(y)).totalPrice * JSON.parse(sessionStorage.getItem(y)).quantity;
				}
				//console.log('netPrice after if/else:', this.netPrice);
			}
			document.getElementById("netprice").innerHTML = this.netPrice;
		}
	}, {
		key: "renderProductitems",
		value: function renderProductitems() {
			//		this.sku = "";
			//		this.price = "";
			//		this.quantity = "";
			for (var i = 0; i < sessionStorage.length; i++) {
				//$(".StoreCartValues").attr('SKU',sku);
				//var storeCartValues = $(".StoreCartValues").getItem(sku,price,quantity,totalPrice);
				var z = sessionStorage.key(i);
				//			this.sku = JSON.parse(sessionStorage.getItem(z)).sku;
				//			this.quantity = JSON.parse(sessionStorage.getItem(z)).quantity;
				//			this.totalPrice = JSON.parse(sessionStorage.getItem(z)).totalPrice;
				var renderSku = JSON.parse(sessionStorage.getItem(z)).sku;
				var renderQuantity = JSON.parse(sessionStorage.getItem(z)).quantity;
				var renderPrice = JSON.parse(sessionStorage.getItem(z)).price;
				this.cartList(renderSku, renderQuantity, renderPrice);
			}
			//		document.getElementById("sku").innerHTML = this.sku;
			//		document.getElementById("quantity").innerHTML = this.quantity;
			//		document.getElementById("total-price").innerHTML = this.totalPrice;
		}
	}, {
		key: "cartList",
		value: function cartList(sku, quantity, price) {
			var cartItemList = $('<div class="itemRows" id=' + sku + '></div');
			//if this is the first time we are adding this product to the cart
			if ($('#' + sku).length === 0) {
				//var cartItemList = $('<div class="itemRows" id='+sku+'></div');
				cartItemList.html('<p class="itemSku">' + 'SKU' + " " + sku + '</p>' + '<div>' + '</div>' + '<p class="cartListQuantity">' + 'QUANTITY' + '</p>' + '<input type="text" value=' + quantity + '>' + '<p>' + 'PRICE' + '<span class="cartListPrice">' + price + '</span>' + '</p>' + '<p class="cartListSubTotal">' + 'SUB TOTAL' + " " + price * quantity + '</p>' + '<div>' + '</div>' + '<button type="button">' + 'UPDATE' + '</button>' + '<button type="button">' + 'REMOVE' + '</button>');
				$('.listItems').append(cartItemList);
			}
			//else just update the qty and subtotal
			else {

					var a = $('#' + sku).find('input').val();
					var b = $('#' + sku).find(".cartListPrice").text();
					console.log(a, b);

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

	}]);

	return _class;
}(); // End Default


exports.default = _class;

},{}]},{},[3]);
