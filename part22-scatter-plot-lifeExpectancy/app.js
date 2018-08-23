const width = 500,
      height = 500,
      padding = 30,
      yScale = d3.scaleLinear()
                 .domain(d3.extent(birthData2011, (d) => d.lifeExpectancy))
                 .range([height - padding, padding]),
      yAxis = d3.axisLeft(yScale)
                .tickSize(-height + 2 * padding)
                .tickSizeOuter(0),
      xScale = d3.scaleLinear()
                 .domain(d3.extent(birthData2011, (d) => d.births / d.population))
                 .range([padding, width - padding]),
      xAxis = d3.axisBottom(xScale)
                .tickSize(-width + 2 * padding)
                .tickSizeOuter(0),
      colorScale = d3.scaleLinear()
                     .domain(d3.extent(birthData2011, (d) => d.population / d.area))
                     .range(['lightgreen', 'black']),
      radiusScale = d3.scaleLinear()
                      .domain(d3.extent(birthData2011, (d) => d.births))
                      .range([2, 40]);

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
  .data(birthData2011)
  .enter()
  .append('circle')
    .attr('cx', (d) => xScale(d.births / d.population))
    .attr('cy', (d) => yScale(d.lifeExpectancy))
    .attr('r', (d) => radiusScale(d.births))
    .attr('fill', (d) => colorScale(d.population / d.area))

d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', height - padding)
    .attr('dy', "1.5em")
    .style('text-anchor', 'middle')
    .text('Births per Capita');

d3.select('svg')
  .append('text')
    .attr('x', width / 2)
    .attr('y', padding)
    .style('text-anchor', 'middle')
    .style('font-size', '1.5em')
    .text('Data on Births by Country in 2011');

d3.select('svg')
  .append('text')
    .attr('transform', `rotate(-90)`)
    .attr('x', - height / 2)
    .attr('y', padding)
    .attr('dy', '-1.1em')
    .style('text-anchor', 'middle')
    .text('Life expectancy');
