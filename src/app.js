// 创建画布的一般步骤
// 创建一个div 宽高给好
// 创建一个margin 对象
// 计算内容宽高 （内容宽高要减去margin）
// svg宽高要加上margin
// g的位置由margin top 和 margin left决定
// g中内容的就可以正常使用上面计算的出来的width 和 height了


const margin = {top: 20, right: 30, bottom: 30, left: 30}
let width = 400 - margin.left - margin.right
let height = 600 - margin.top - margin.bottom

// let fullWidth = width + margin.left + margin.right
// let fullHeight = height + margin.top + margin.bottom

const svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // .attr('viewBox', `0 0 ${fullWidth * 2} ${fullHeight * 2}`)
    .call(responsivefy)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .style('fill', 'lightblue')
  .style('stroke', 'green')

// 这里svg 仍然指向g 如果写成 var a = svg.append('rect') a 指向rect

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0])

const yAxis = d3.axisLeft(yScale)
  // .ticks(5) // 5个坐标
  // .tickValues([10,20,40,88,100]) // 这些值必须展示
  // .ticks(5, '%') 百分比 domain最大为1
svg.call(yAxis)

const xScale = d3.scaleTime()
  .domain([new Date(2017, 0, 1, 0), new Date(2017, 0, 2, 0)])
  .range([0, width])

const xAxis = d3.axisBottom(xScale)
  .ticks(6) // 仅仅是一种建议， d3 会根据最好的方案来替代这个。
  .tickSize(10)
  .tickPadding(5)

svg
  .append('g')
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis)

function responsivefy(svg){
  // get container + svg aspepct ratio
  var container = d3.select(svg.node().parentNode)
  var width = parseInt(svg.style('width'))
  var height = parseInt(svg.style('height'))
  var aspect = width / height;

   svg.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize)

   d3.select(window).on(`resize.${container.attr('id')}`, resize)

   function resize() {
      var targetWidth = parseInt(container.style('width'))
      svg.attr('width', targetWidth)
      svg.attr('height', Math.round(targetWidth / aspect))
   }
}
