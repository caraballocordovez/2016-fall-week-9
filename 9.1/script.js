console.log('9.1');

var m = {t:100,r:100,b:100,l:100},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w + m.l + m.r)
    .attr('height', h + m.t + m.b)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');

var scaleColor = d3.scaleOrdinal().range(d3.schemeCategory20);

d3.csv('../data/co2 emission.csv',parse,dataloaded);

function dataloaded(err, countries){
    //console.log(countries);

    //creating generator
    var arc = d3.arc()
        .startAngle(function(d){return d.startAngle})
        .endAngle(function(d){return d.endAngle})
        .innerRadius(0)
        .outerRadius(200);

    /* var datum = {
        startAngle: -90/360*Math.PI*2,
        endAngle: 180/360*Math.PI*2
    };

    plot.append("path")
        .datum(datum)
        .attr ("d", function(datum){
            return arc(datum);
        })
        .attr("transform", "translate("+w/2+" , "+h/2+")");
        */

        //Create a pie layout --> data transformation
        var ourPie = d3.pie()
            .value(function(d){ return d.emission2011});

        console.table(ourPie(countries));

        var slices = plot.selectAll("path") //the way to add paths to each element in the array "countries"
            .data(ourPie(countries))
            .enter()
            .append("path").attr("class", "slice country")
            .attr("d", function(d){
                return arc(d);
            })
            .attr("transform", "translate("+w/2+" , "+h/2+")")
            .on("click", function(d){
                console.log(d.data.country) 
            })
            .style("fill", function(d, i){
                return scaleColor(i);
            });

        //selection.on is how you listen to user interaction 


}

function parse(d){
    return {
        country:d['Country Name'],
        code:d['Country Code'],
        emission2011:d['2011 [YR2011]']=='..'?undefined:+d['2011 [YR2011]']
    }
}