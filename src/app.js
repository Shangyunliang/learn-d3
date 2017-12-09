// 创建画布的一般步骤
// 创建一个div 宽高给好
// 创建一个margin 对象
// 计算内容宽高 （内容宽高要减去margin）
// svg宽高要加上margin
// g的位置由margin top 和 margin left决定
// g中内容的就可以正常使用上面计算的出来的width 和 height了


const margin = {top: 20, right: 30, bottom: 60, left: 30}
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

d3.json('/data.json', function(err, data){
  // 创建一个线性比例尺
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.expectancy))
    .range([height, 0])
    .nice()

  // 将这个比例尺转换成纵坐标
  const yAxis = d3.axisLeft(yScale)
    // .ticks(5) // 5个坐标
    // .tickValues([10,20,40,88,100]) // 这些值必须展示
    // .ticks(5, '%') 百分比 domain最大为1
  svg.call(yAxis)

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.cost))
    .range([0, width])
    .nice()

  const xAxis = d3.axisBottom(xScale)
    .ticks(5)

  svg
    .append('g')      // 这里之所以要从新添加一个g， 是因为axisBottom只是创建一个锯齿朝下的底部坐标样子， 并不能代表在底部。
      .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, 40])

  var circles = svg
    .selectAll('.ball')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'ball')
    .attr('transform', d => {
      return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`
    })


  circles
    .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', d => rScale(d.population))
      .style('fill-opacity', 0.5)
      .style('fill', 'steelblue')

  circles
    .append('text')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .attr('y', 4)
    .text(d => d.code)

})

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
