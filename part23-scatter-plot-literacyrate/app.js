const width = 500,
      height = 500,
      padding = 50,
      data = regionData.filter((v) => v.subscribersPer100)
                       .filter((v) => v.adultLiteracyRate)
                       .filter((v) => v.medianAge)
                       .filter((v) => v.urbanPopulationRate),
      xScale = d3.scaleLinear()
                 .domain(d3.extent(data, (d) => d.adultLiteracyRate))
                 .range([padding, width - padding]),
      xAxis = d3.axisBottom(xScale)
                .tickSize(- width + padding * 2)
                .tickSizeOuter(0),
      yScale = d3.scaleLinear()
                 .domain(d3.extent(data, (d) => d.subscribersPer100))
                 .range([height - padding, padding]),
      yAxis = d3.axisLeft(yScale)
                .tickSize(- height + padding * 2)
                .tickSizeOuter(0),
      radiusScale = d3.scaleLinear()
                      .domain(d3.extent(data, (d) => d.medianAge))
                      .range([2, 20]),
      colorScale = d3.scaleLinear()
                     .domain(d3.extent(data, (d) => d.urbanPopulationRate))
                     .range(['lightgreen', 'blue']);

d3.select('svg')
  .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

d3.select('svg')
  .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', (d) => xScale(d.adultLiteracyRate))
    .attr('cy', (d) => yScale(d.subscribersPer100))
    .attr('r', (d) => radiusScale(d.medianAge))
    .attr('fill', (d) => colorScale(d.urbanPopulationRate))
    .attr('stroke', '#f3f3f3')
    .attr('stroke-width', '1');

d3.select('svg')
  .append('text')
    .text('Literacy Rate, Aged 15 and up')
    .attr('y', height - padding)
    .attr('x', width / 2)
    .attr('dy', '2em')
    .style('text-anchor', 'middle');

d3.select('svg')
  .append('text')
    .text('Cellular Subscribtion vs. Literacy Rate')
    .attr('y', padding)
    .attr('x', width / 2)
    .attr('dy', '-1em')
    .style('text-anchor', 'middle')

d3.select('svg')
  .append('text')
    .text('Cellular Subscribtion per 100')
    .style('transform', `rotate(-90deg)`)
    .style('text-anchor', 'middle')
    .attr('x', - height / 2)
    .attr('y', padding)
    .attr('dy', '-1.7em')
