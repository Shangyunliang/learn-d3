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

    var parseTime = d3.timeParse('%Y/%m/%d')

    data.forEach(company => {
      company.values.forEach(d => {
        d.date = parseTime(d.date)
        d.close = +d.close
      })
    })

    var xScale = d3.scaleTime()
      .domain([
        d3.min(data, co => d3.min(co.values, d => d.date)),
        d3.max(data, co => d3.max(co.values, d => d.date))
      ])
      .range([0, width])

    svg
      .append('g')
        .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5))

    var yScale = d3.scaleLinear()
      .domain([
        d3.min(data, co => d3.min(co.values, d => d.close)),
        d3.max(data, co => d3.max(co.values, d => d.close))
      ])
      .range([height, 0]) // 这里越小y越大, 距离底部越近, 最后path合并和y的最大值合并
      // 相当于x轴为底画图

    svg
      .append('g')
      .call(d3.axisLeft(yScale))

    console.log('yScale(yScale.domain()[0]:', yScale(yScale.domain()[0]))
    var area = d3.area()
      .x(d => xScale(d.date))
      .y0(yScale(yScale.domain()[0]))
      .y1((d, i) => {
        console.log(i,yScale(d.close));
        return yScale(d.close)
      })
      .curve(d3.curveCatmullRom.alpha(0.5))

    svg
      .selectAll('.area')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', d => area(d.values))
      .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
      .style('stroke-width', 2)
      .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
      .style('fill-opacity', 0.5)

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
