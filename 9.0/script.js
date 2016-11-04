/**
 * Created by siqi on 11/3/16.
 */
console.log('9.0: Testing out nest')

var shoppers = [
    {type:"adult", product:"apple", spending:30},
    {type:"child", product:"banana", spending:9},
    {type:"adult", product:"orange", spending:6},
    {type:"adult", product:"apple", spending:20},
    {type:"adult", product:"apple", spending:4},
    {type:"adult", product:"orange", spending:5},
    {type:"child", product:"orange", spending:11},
    {type:"adult", product:"apple", spending:23},
    {type:"child", product:"orange", spending:2},
    {type:"adult", product:"apple", spending:5},
    {type:"adult", product:"apple", spending:9},
    {type:"adult", product:"orange", spending:28}
];

//Nest by shopper type
var shoppersByType = d3.nest() //the most improtant thing in nest is the criteria by which we group elements
    .key(function(d){return d.type;})
    .entries(shoppers);

shoppersByType.forEach(function(type){
    console.log(type);

    type.totalSpending = d3.sum(type.values, function(d){return d.spending});
});

//Nest by types of products bought
var shoppersByProduct = d3.nest()
    .key(function(d){return d.product;})
    .entries(shoppers);

//How much is spent in total on each product?
shoppersByProduct.forEach(function(product){
    product.total = d3.sum(product.values, function(d){return d.spending});
})

//How much did an average adult spend? Child?
shoppersByType.forEach(function(type){
    type.totalSpending = d3.mean(type.values, function(d){return d.spending});
})
//How much was spent by adults on oranges?
