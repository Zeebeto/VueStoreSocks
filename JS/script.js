var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        price: 99,
        tooltip: 'a pair of socks',
        image: "../imgs/vueSocks-green.png",
        link: "https://www.vg.no",
        inventory: 10,
        details:["80% cotton","20% polyester", "lads only"],
        variants:[
            {
                variantId: 1,
                variantColour: "green",
                variantSize:["s","m","l"],
                variantImage: "../imgs/vueSocks-green.png",
            },
            {
                variantId: 2,
                variantColour: "blue",
                variantSize:["xs","l","xl"],
                variantImage: "../imgs/vueSocks-blue.png",
            }],
        cart: 0,
    },// data end
    methods: {
        addToCart: function (){
            this.cart += 1;
        },
        updateProduct(variantImage){ //not all browsers support this
            this.image = variantImage;
        },
        clearCart(){
            this.cart = 0;
            showsomething();
        },
    }, //methods end
    

}) // end of app, new VUE
showsomething();
function showsomething(){
    thing = app.inventory;
    console.log(thing);
}