import request from "./bestbuy";
import cara from "./bxcarousel";
import productUtil from "./productUtil";


export default class App{
	constructor(){
		this.baseurl = "https://api.bestbuy.com/v1/products";
		this.url = "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))";
		this.initBBCall();
		this.productNavigation();
		this.productUtil = new productUtil;
		console.log(sessionStorage);
	}
	
	initBBCall () {
	
	request({url: this.url, api: "8ccddf4rtjz5k5btqam84qak"})
	//request({url: "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))",api : "8ccddf4rtjz5k5btqam84qak"})
		.then(data => {
			/* fill carosel with products */
			cara(data.products);
			this.addToCart();
		})
		.catch(error => {
			console.log("warning Christopher Robins... Error");
			console.log(error);
		});
		
	} // End initBBCall()

	productNavigation () {
		$(".option").on('click', (e) => {
			var target = e.target.value;
			this.url = this.baseurl + target;
			this.initBBCall();
		});
	}

	addToCart(){
		let atc = document.getElementsByClassName('addtocart');
        for (var i = 0; i < atc.length; i++){
            atc[i].addEventListener("click", (e) =>  {
                let sku = e.target.getAttribute("data-sku");
                let price = e.target.getAttribute("data-price");
				let quantity = 1;
                this.productUtil.addToCart(sku,price,quantity);
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
	
	
} // End Class App
let x = new App;
