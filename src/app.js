// 创建画布的一般步骤
// 创建一个div 宽高给好
// 创建一个margin 对象
// 计算内容宽高 （内容宽高要减去margin）
// svg宽高要加上margin
// g的位置由margin top 和 margin left决定
// g中内容的就可以正常使用上面计算的出来的width 和 height了


const margin = {top: 20, right: 15, bottom: 20, left: 15}
let width = 425 - margin.left - margin.right
let height = 625 - margin.top - margin.bottom

const svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('rect')
  .attr('width', width / 2 )
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green')

svg.append('rect')
  .attr('x', width / 2)
  .attr('width', width / 2)
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green')
