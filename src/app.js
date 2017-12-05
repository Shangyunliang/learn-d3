d3.json('data/data.json', (data) =>{
  const max = d3.max(data, (d) => {
    return d.age
  })
  console.log(`max : ${max}`);
  
  const min = d3.min(data, (d) => {
    return d.age
  })
  console.log(`min : ${min}`);
  
  const extent = d3.extent(data, (d) => d.age)
  console.log(`extent : ${extent}`);
  
  const scale = d3.scaleLinear()
    .domain(extent)
    .range([0, 600])
    .clamp(true)
  console.log(scale(37));
  
  var ages = d3.set(data, (d) => d.age) 
  console.log(ages.values());
})

d3.csv('data/data.csv', (data) =>{
  console.log(data);
})

d3.csv('data/data.tsv', (data) =>{
  console.log(data);
})