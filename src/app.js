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

var data = [
  {score: 63, subject: 'Mathematics'},
  {score: 82, subject: 'Geography'},
  {score: 74, subject: 'Spelling'},
  {score: 97, subject: 'Reading'},
  {score: 52, subject: 'Science'},
  {score: 74, subject: 'Chemistry'},
  {score: 100, subject: 'Physics'},
  {score: 52, subject: 'ASL'}
];

// 这里svg 仍然指向g 如果写成 var a = svg.append('rect') a 指向rect

// 创建一个线性比例尺
const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0])

// 将这个比例尺转换成纵坐标
const yAxis = d3.axisLeft(yScale)
  // .ticks(5) // 5个坐标
  // .tickValues([10,20,40,88,100]) // 这些值必须展示
  // .ticks(5, '%') 百分比 domain最大为1
svg.call(yAxis)

const xScale = d3.scaleBand()
  .padding(0.2)
  .domain(data.map(d => d.subject))
  .range([0, width])

const xAxis = d3.axisBottom(xScale)
  .ticks(6) // 仅仅是一种建议， d3 会根据最好的方案来替代这个。
  .tickSize(10)
  .tickPadding(5)

svg
  .append('g')      // 这里之所以要从新添加一个g， 是因为axisBottom只是创建一个锯齿朝下的底部坐标样子， 并不能代表在底部。
    .attr('transform', `translate(0, ${height})`)
  .call(xAxis)
  .selectAll('text')
  .style('text-anchor', 'end')
  .attr('transform', 'rotate(-45)')

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', d => {
    console.log(xScale(d.subject));
    return xScale(d.subject)
  })
  .attr('y', d => yScale(d.score))
  .attr('width', d => {
    console.log('xScale.bandwidth()', xScale.bandwidth());
    return xScale.bandwidth()
  })
  .attr('height', d => {
    console.log(yScale(d.score));
    // yScale(d.score) 拿到的是从上到下的高度。 从100 到分数的高度
    return height - yScale(d.score)
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
