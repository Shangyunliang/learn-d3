var linearScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, 600])
  .clamp(true)


console.log(linearScale(-20))
console.log(linearScale(50))
console.log(linearScale(100))

console.log(linearScale.invert(300));