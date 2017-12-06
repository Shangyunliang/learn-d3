// var div = d3.select('div');
// console.log(div.nodes());
// 
// var divLinks = div.selectAll('a');
// console.log(divLinks.nodes());
// 
// var secondLink = d3.selectAll('a:nth-child(2)');
// console.log(secondLink.nodes());
// 
// var allLinks = d3.selectAll(document.links);
// console.log(allLinks.size());


// var secondLink = d3.select('a:nth-child(2)')
// secondLink.attr('href', 'https://www.baidu.com')
//   // .style('color', 'red')
//   .classed('red', true)
//   .text('inventory')
//   .html('inventory <b>SALE</b>')
  
// d3.select('.title')
//   .append('button')
//     .html('inventory <b>SALE</b>')
    
    
// d3.select('.title')
//   .insert('div', 'a:nth-child(1)')
//     .html('inventory <b>SALE</b>')
// 
// d3.select('.action').remove()


// d3.select('.title')
//   .append('div')
//     .style('color', 'red')
//     .html('Inventory <b>SALE </b>')
//   // .append('button')   这样直接调用追加的button会在上面创建的div中
//   //   .style('display', 'block')
//   //   .text('submit')
// 
// d3.select('.title')
//   .append('button')
//     .style('display', 'block')
//     .text('submit')
//     
//     
//     

var scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 83 },
  { name: 'Cindy', score: 91 },
  { name: 'David', score: 96 },
  { name: 'Emily', score: 88 }
];


var bar = d3.select('.chart')
  .append('svg')
    .style('width', '200px')
    .style('height', '300px')
  .selectAll('g')
  .data(scores)
  .enter() 
    .append('g')
    .attr('transform', (d, i) => 'translate(0, ' + i * 33 + ')')
  
  bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    
  bar.append('text')
    .attr('y', 20)
    .text((d) => d.name)
  
  
  
  
  
  
  
  
  
  
