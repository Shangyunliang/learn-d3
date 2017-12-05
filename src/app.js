function drawLine(lineString) {
  console.log(`------------------------${lineString}--------------------------`);
}

drawLine('scaleLinear')
var linearScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 600])
  .clamp(true)


console.log(linearScale(-20))
console.log(linearScale(50))
console.log(linearScale(100))

console.log(linearScale.invert(300));

drawLine('scaleTime')
// 注意时间月份
var timeScale = d3.scaleTime()
  .domain([new Date(2016,0,1), new Date(2016,9,31)])
  .range([0, 100])
  .clamp(true)
  
console.log(timeScale(new Date()))
console.log(timeScale(new Date(2016,0,1)))


console.log(timeScale.invert(50))
console.log(timeScale.invert(0))
console.log(timeScale.invert(100));