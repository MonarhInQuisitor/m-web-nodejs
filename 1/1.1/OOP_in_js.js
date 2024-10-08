"use strict"
class AbstractProduct  {
  #ID; #name ;#description; #price ;#brand ; #quantity;  #date; #reviews; #images;
    constructor(ID,name, description,price,brand, quantity, date,reviews,images){
            this.#ID = ID,
            this.#name = name,
            this.#description = description,
            this.#price = price,
            this.#brand = brand,
            this.#quantity = quantity,
            this.#date = date,
            this.#reviews = reviews,
            this.#images = images
    }
     //getters
     get ID() {return this.#ID}
     get name() {return this.#name}
     get description()  {return this.#description}
     get price () { return this.#price}
     get brand () { return this.#brand}
     get quantity() {return this.#quantity}
     get date () {return this.#date}
     get reviews () {return this.#reviews}
     get images () {return this.#images}
     //setters
     set ID(ID) {this.#ID=ID}
     set name (name) { this.#name=name}
     set description (description){this.#description = description}
     set price (price) {this.#price = price}
     set brand (brand) {this.#brand = brand}
     set quantity (quantity){this.#quantity = quantity}
     set date (date) {this.#date = date}
     set reviews  (reviews) {this.#reviews = reviews}
     set images (images){this.#images = images}
      // Get full information about the product
     getFullInformation(){
       return {ID : this.ID,
name : this.name,
description : this.description,
price : this.price,
brand: this.brand,
quantity: this.quantity,
date: this.date,
reviews: this.reviews,
images : this.images
       }}
     
     // Get price for a specified quantity
     getPriceForQuantity(int){
        return `$${this.price*int}`
     }

// getter and setter in the same time. param is value of object("name","ID" etc.) type is value of param (1,0,"Ivan" etc.)
//if param is not exist than it is getter otherwise it is setter
     getterSetter(param,type){
        if (type===undefined){
            return this[param]
        }else{
            this[param]=type
        }
           
     }
}
//-------------------------
class Clothes extends AbstractProduct{
    #sizes ;#activeSize;#material;#color
     constructor(  ID, name, description, price, brand, sizes, activeSize, quantity,date, reviews,images,material,color){
        super(ID,name, description,price,brand, quantity, date,reviews,images),
       this.#sizes=sizes,
       this.$activeSize=activeSize
       this.#material=material,
       this.#color=color
     }
     get sizes (){return this.#sizes}
     get activeSize(){return this.#activeSize}
     get material(){return this.#material}
     get color(){return this.#color}
     set sizes(sizes){this.#sizes=sizes}
     set activeSize(activeSize){this.#activeSize=activeSize}
     set material(material){this.#material=material}
     set color(color){this.#color=color}
//redefines the metod of Abstract clas ????
     getFullInformation(){
       let sup= super.getFullInformation();
       sup.activeSize=this.#activeSize
       sup.material=this.#material
       sup.color=this.#color
       return sup
      
     }
     //get Image
     getImage = (param) =>
        this.images.includes(param)
            ? this.images.find((image) => image === param)
            : this.images[0];
            //add size into clouth
    addSize = function (size) {
        this.sizes.push(size);
    };
    //delete size from clouth
    deleteSize = function (size) {
        console.log("deleteSize");
        this.sizes.splice(
            this.sizes.findIndex((x) => x === size),
            1
        );
    };
    //push review into array Rewiews
    addReview = function (review) {
        this.reviews.push(review);
    };
    //delete an rewiew from the array rewiews
    deleteReview = function (ID) {
        this.reviews.splice(
            this.reviews.findIndex((x) => x.ID === ID),
            1
        );
    };
    //recieve avaraffe rating og the product
    getAverageRating = function () {
        var sum = 0;
        this.reviews.forEach((element) => {
            for (el in element.rating) {
                sum = sum + element.rating[el];
            }
        });
        return sum / this.reviews.length;
    };
}
// class Rewiews about a product
class Rewiews {
    #ID; #author; #date; #comment; #rating
    constructor(ID, author, date, comment, rating){
    this.#ID = ID,
    this.#author = author,
    this.#date = date,
    this.#comment = comment,
    this.#rating = rating;
}
//getters
get ID(){return this.#ID}
get author(){return this.#author}
get date(){return this.#date}
get comment(){return this.#comment}
get rating(){return this.#rating}
//setters
set ID(ID){this.#ID=ID}
set author(author){this.#author=author}
set date(date){this.#date=date}
set comment(comment){this.#comment=comment}
set rating(rating){this.#rating=rating}
};
class Electronics extends AbstractProduct{
    #power;#warantly
    constructor(ID,name, description,price,brand, quantity, date,reviews,images,warantly,power){
        super(ID,name, description,price,brand, quantity, date,reviews,images),
        this.#warantly=warantly,
        this.#power=power
    }
    get warantly(){return this.#warantly}
    get power(){return this.#power}
    set warantly(warantly){this.#warantly=warantly}
    set power(power){this.#power=power}
    //redefines the metod of Abstract clas ????
    getFullInformation(){
        let sup= super.getFullInformation()
        sup.warantly=this.#warantly
        sup.power=this.#power
        return sup
      }
}
  //search products into array of products by serach(name,ID,description etc.)
function searchProducts(products, search) {
    var sum = [];
    products.forEach((el) =>
        (el.name.includes(search) || el.description.includes(search))
            ? sum.push(el.getFullInformation()) // may replace el with el.
            : ""
    ); // "" It is needed because It needs some arguments after ":"
    return sum;
};
  //sorts products in array by sortRule(name,ID,description etc.)
function sortProducts(products, sortRule) {//compare over objects returned with getFullInformation()     
        if(  sortRule === "ID"|| sortRule === "price" ||sortRule === "activeSize"|| sortRule ===  "quantity"){
            products.sort((a, b) => a.getFullInformation()[sortRule] - b.getFullInformation()[sortRule]);
        }else{
            products.sort((a, b) => a.getFullInformation()[sortRule].localeCompare(b.getFullInformation()[sortRule]))
        }
};
//---------------------------------------------------------------------------
// run

//create rewiews 1
let reviews1 = new Rewiews(0, "Ivan", new Date(), "hyita.I give it a 1", {
    service: 1, price: 1,value: 1,quality: 1,
});
//create rewiews 2
let reviews2 = new Rewiews(1, "Vadim", new Date(), "super.I give it a 5", {
    service: 5,price: 5, value: 5,quality: 5,
});
//create rewiews 3
let reviews3 = new Rewiews( 2,"Alina",new Date(),"SO so I've expected  way better. I give it a 3",
{ service: 3, price: 3, value: 3, quality: 3 }
);
//create object clouthes
let cl = new Clothes( 0, "bag","product1",12,"Nike",["XX", "XL", "XXXL", "XXL", "M"],5,100,new Date(),
[reviews1, reviews2, reviews3],["1", "2", "3", "4"],"fabric", "red"
);
let el= new Electronics(0,"bag","product1",12,"Nike",100,new Date(),
    [reviews1, reviews2, reviews3],["1", "2", "3", "4"], 12, 10
);
let cl1 = new Clothes(1, "table","product2", 125, "Addida", ["XX", "XL", "XXXL", "XXL", "M"],5,100,new Date(),
    [reviews1, reviews2, reviews3],["1", "2", "3", "4"],"showk","black"
);
let cl2 = new Clothes(2,"chair","product3", 25,"limusin",["XX", "XL", "XXXL", "XXL", "M"],5,100,new Date(),
    [reviews1, reviews2, reviews3],["1", "2", "3", "4"],"plastic","green"
);
let cl3 = new Clothes( 3,"bad","product4",15, "Windows", ["XX", "XL", "XXXL", "XXL", "M"],5,100,new Date(),
    [reviews1, reviews2, reviews3],["1", "2", "3", "4"],"iron","blue"
);
//array of clothes
let product = [cl, cl1, cl2, cl3];
//---------------------------------------------------------------------------
// TESTS

//cl.description='aloha dance'
//console.log(el.getFullInformation())
//console.log(cl.getFullInformation())
//console.log(cl.getPriceForQuantity(2))
//console.log(searchProducts(product,"a"))
//console.log(cl.getFullInformation())
//sortProducts(product,"name")
//console.log(product.map(el=>el.getFullInformation()))// output for  sortProducts(product,"name")
cl.getterSetter("color","white")
console.log(cl.getterSetter("color"))
console.log(cl.color)
 