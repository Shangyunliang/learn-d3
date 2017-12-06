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


var update = d3.select('.chart')
  .selectAll('div')
  .data(scores, function(d){
    // 例子中该方法走七次， 2次是默认已经创建的div  d为undefined
    // 其他五次是数据
    console.log(d)
    return d ?  d.name : this.innerText
  })
  .style('color', 'blue')
  
var enter = update.enter()
  .append('div')
  .text((d) => d.name)
  .style('color', 'green')  
  
update.exit().remove()

update.merge(enter)
  .style('width', d => d.score * 10 + 'px')
  .style('height', '50px')
  .style('background', 'lightgreen')
  .style('border', '1px solid black')
  .style('text-transform', 'upperCase')
  
  
  
  
  
  
  
  
  
  
  
  
  
  
