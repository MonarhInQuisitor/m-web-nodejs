/**
 * Constructor of the Product object
 *
 * @param {string} ID unique value of product
 * @param {string} name of product
 * @param {string} description of product
 * @param {number} price of product
 * @param {string} brand of product
 * @param {string} activeSize  of product
 * @param {number} quantity of product in stock
 * @param {[]} images array of  of product
 */
var Product = function (
    ID,
    name,
    description,
    price,
    brand,
    sizes,
    activeSize,
    quantity,
    date,
    reviews,
    images
) {
    (this.ID = ID),
        (this.name = name),
        (this.description = description),
        (this.price = price),
        (this.brand = brand),
        (this.sizes = sizes),
        (this.activeSize = activeSize),
        (this.quantity = quantity),
        (this.date = date),
        (this.reviews = reviews),
        (this.images = images),
        //getters
        (this.getID = () => this.ID),
        (this.getDescription = () => this.description),
        (this.getPrice = () => this.price),
        (this.getBrand = () => this.brand),
        (this.getSizes = () => this.sizes),
        (this.getActiveSize = () => this.activeSize),
        (this.getQuantity = () => this.quantity),
        (this.getDate = () => this.date),
        (this.getReviews = () => this.reviews),
        (this.getImages = () => this.images),
        //setters
        (this.setID = (ID) => (this.ID = ID)),
        (this.setDescription = (description) => (this.description = description)),
        (this.setPrice = (price) => (this.price = price)),
        (this.setBrand = (brand) => (this.brand = brand)),
        (this.setSizes = (sizes) => (this.sizes = sizes)),
        (this.setActiveSize = (activeSize) => (this.activeSize = activeSize)),
        (this.setQuantity = (quantity) => (this.quantity = quantity)),
        (this.setDate = (date) => (this.date = date)),
        (this.setReviews = (reviews) => (this.reviews = reviews)),
        (this.setImages = (images) => (this.images = images)),
        (this.getReviewByID = function (ID) {
            return this.reviews.find((el) => el.ID === ID);
        });
    this.getImage = (param) =>
        this.images.includes(param)
            ? this.images.find((image) => image === pram)
            : this.images[0];
    this.addSize = function (size) {
        this.sizes.push(size);
    };
    this.deleteSize = function (size) {
        console.log("deleteSize");
        this.sizes.splice(
            this.sizes.findIndex((x) => x === size),
            1
        );
    };
    this.addReview = function (review) {
        this.reviews.push(review);
    };
    this.deleteReview = function (ID) {
        this.reviews.splice(
            this.reviews.findIndex((x) => x.ID === ID),
            1
        );
    };
    this.getAverageRating = function () {
        var sum = 0;
        this.reviews.forEach((element) => {
            for (el in element.rating) {
                sum = sum + element.rating[el];
            }
        });
        return sum / this.reviews.length;
    };
};
var Rewiews = function (ID, author, date, comment, rating) {
    (this.ID = ID),
        (this.author = author),
        (this.date = date),
        (this.comment = comment),
        (this.rating = rating);
};

var searchProducts = function (products, search) {
    var sum = [];
    products.forEach((el) =>
        el.name.includes(search) || el.description.includes(search)
            ? sum.push(el)
            : ""
    ); // "" It is needed because It needs some aruments after :
    return sum;
};
var sortProducts = function (products, sortRule) {
    typeof sortRule === "string"
        ? products.sort((a, b) => a[sortRule].localeCompare(b[sortRule]))
        : products.sort((a, b) => a[sortRule] - b[sortRule]);
};
var reviews1 = new Rewiews(0, "Ivan", new Date(), "hyita.I give it a 1", {
    service: 1,
    price: 1,
    value: 1,
    quality: 1,
});
var reviews2 = new Rewiews(1, "Vadim", new Date(), "super.I give it a 5", {
    service: 5,
    price: 5,
    value: 5,
    quality: 5,
});
var reviews3 = new Rewiews(
    2,
    "Alina",
    new Date(),
    "SO so I've expected  way better. I give it a 3",
    { service: 3, price: 3, value: 3, quality: 3 }
);
var pr = new Product(
    0,
    "bag",
    "product1",
    12,
    "Nike",
    ["XX", "XL", "XXXL", "XXL", "M"],
    5,
    100,
    new Date(),
    [reviews1, reviews2, reviews3],
    ["1", "2", "3", "4"]
);
var pr1 = new Product(
    1,
    "table",
    "product2",
    125,
    "Addida",
    ["XX", "XL", "XXXL", "XXL", "M"],
    5,
    100,
    new Date(),
    [reviews1, reviews2, reviews3],
    ["1", "2", "3", "4"]
);
var pr2 = new Product(
    2,
    "chair",
    "product3",
    25,
    "limusin",
    ["XX", "XL", "XXXL", "XXL", "M"],
    5,
    100,
    new Date(),
    [reviews1, reviews2, reviews3],
    ["1", "2", "3", "4"]
);
var pr3 = new Product(
    3,
    "bad",
    "product4",
    15,
    "Windows",
    ["XX", "XL", "XXXL", "XXL", "M"],
    5,
    100,
    new Date(),
    [reviews1, reviews2, reviews3],
    ["1", "2", "3", "4"]
);
/*for (x in pr){
    console.log(pr[x]);
}*/
/*var getReviewByID = function(){
    return this.name
};
pr.getReviewByID=getReviewByID;*/
console.log(pr.getReviewByID(0));
pr.addSize("L");
pr.deleteSize("XXL");
var reviews4 = new Rewiews(3, "Dima", new Date(), "Norm", {
    service: 4,
    price: 4,
    value: 4,
    quality: 4,
});
pr.addReview(reviews4);
pr.deleteReview(0);
console.log(pr.getAverageRating());
for (x in pr) {
    console.log(pr[x]);
}
pr.setID(6);
console.log(pr.getImage(1));
console.log(pr.getID());
console.log("-------------------------------------");
var product = [pr, pr1, pr2, pr3];
//console.log(searchProducts(product,"product"))
sortProducts(product, "name");
console.log(product);
console.log(typeof "name" == "string");
