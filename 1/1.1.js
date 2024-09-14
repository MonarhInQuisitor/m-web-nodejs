var Product = function(ID,name,description,price,brand,sizes,activeSize,quantity,date,reviews,images)
{this.ID=ID,
this.name=name,
this.description=description,
this.price=price,
this.brand=brand,
this.sizes=sizes,
this.activeSize=activeSize,
this.quantity=quantity,
this.date=date,
this.reviews=reviews,
this.images=images
};
var Rewiews = function(ID,author,date,comment,rating){
    this.ID=ID,
    this.author=author,
    this.date=date,
    this.comment=comment,
    this.rating=rating

}
var rewiew1 = new Rewiews(1,"Ivan",new Date(),"hyita.I give it a 1",{'service': 1, 'price':1, 'value':1, 'quality':1});
var rewiew2 = new Rewiews(2,"Vadim",new Date(),"super.I give it a 5",{'service': 5, 'price':5, 'value':5, 'quality':5});
var rewiew3 = new Rewiews(3,"Alina",new Date(),"SO so I've expected  way better. I give it a 3",{'service': 3, 'price':3, 'value':3, 'quality':3});
var pr= new Product(1,"Ivan","product",125,"Nike",[1,2,3,4,5],5,100, new Date(),[rewiew1,rewiew2,rewiew3],["1","2","3","4"]);
console.log(typeof pr)
for (x in pr){
    console.log(pr[x]);
}

