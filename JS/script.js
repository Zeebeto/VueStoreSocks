Vue.component('product',{
    props:{
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <a :href="link" target="_blank"><img :src="image" :alt="tooltip"></a>
        </div>
        <div class="product-info">
            <h1 :title="tooltip">{{ title }} - {{price}}Kr <br><span v-show="price < 150 && inventory != 0">ON SALE!</span></h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory<= 10 && inventory > 0">Almost Gone!</p>
            <p v-else>Out of Stock</p>
            <p v-show="inventory != 0 && inventory <= 10">In stock: {{inventory}}</p>
            <p>Shipping: {{ shipping }}</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <ul>
                <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :class="{stroke: variant.variantImage == image}"
                :style="{backgroundColor: variant.variantColour}"
                @click="updateProduct(index)"
                :title="variant.variantColour">
                </div>
            </ul>
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{disabledButton: !inStock}">Add to Cart</button>
            <button @click="clearCart"
                    :class="{disabledButton: tempCart.length == 0}">Clear Cart</button>
        </div>
    </div>  
    `,
    data() {
        return {
            brand: 'Vue mastery',
            product: 'Socks',
            price: 99,
            tooltip: 'a pair of socks',
            selectedVariant: 0,
            link: getlink(),
            tempCart: [],
            details:["80% cotton","20% polyester", "lads only"],
            variants:[
                {
                    variantId: 1,
                    variantColour: "green",
                    variantSize:["s","m","l"],
                    variantImage: "../imgs/vueSocks-green.png",
                    variantInventory: 10,
                },
                {
                    variantId: 2,
                    variantColour: "blue",
                    variantSize:["xs","l","xl"],
                    variantImage: "../imgs/vueSocks-blue.png",
                    variantInventory: 5,
                },
                {
                    variantId: 3,
                    variantColour: "purple",
                    variantSize:["xs","l","xl"],
                    variantImage: "",
                    variantInventory: 50,
                },
                
            ],
            }
    },// data end
    methods: {
        addToCart: function (){
            if(this.variants[this.selectedVariant].variantInventory != 0){
                this.variants[this.selectedVariant].variantInventory--;
                this.tempCart.push(this.variants[this.selectedVariant].variantId);
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
            }
            if(this.variants[this.selectedVariant].variantInventory == 0) {
                this.inStock = false;
            }
        },
        updateProduct(index){ //not all browsers support this
            this.selectedVariant = index;
        },
        clearCart(){
            cart = app.cart;
            for(i=0;i<cart.length;i++){
                console.log(cart[i]);
                this.variants[cart[i]-1].variantInventory++;
            }
            this.tempCart= [];
            this.$emit('clear-cart');
        },
        
    }, //methods end
    computed: {
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantInventory;
        },
        inventory(){
            return this.variants[this.selectedVariant].variantInventory;
        },
        shipping(){
            if(this.premium == true) return "free"
            return "100kr"
        },
    },
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        deleteCart(){
           console.log("cleared cart");
           this.cart = [];
        },
    },
}) // end of app, new VUE

showsomething();
function showsomething(){
    thing = app.inventory;
    console.log(thing);
}
function getlink(){
   return "https://www.vg.no";
}