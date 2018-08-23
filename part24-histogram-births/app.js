const width = 600,
      height = 600,
      barPadding = 1,
      padding = 20,
      minYear = d3.min(birthData, (d) => d.year),
      maxYear = d3.max(birthData, (d) => d.year),
      yearData = birthData.filter(d => d.year === minYear),
      xScale = d3.scaleLinear()
                 .domain([0, d3.max(yearData, (d) => d.births)])
                 .rangeRound([padding, width - padding]),
      histogram = d3.histogram()
                   .domain(xScale.domain())
                   .thresholds(xScale.ticks())
                   .value(d => d.births),
      bins = histogram(yearData),
      barWidth = width / bins.length - barPadding
      yScale = d3.scaleLinear()
                 .domain([0, d3.max(bins, (d) => d.length)])
                 .range([height, 0]);

const bars = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .selectAll('.bar')
  .data(bins)
  .enter()
  .append('g')
    .classed('bar', true);

bars
  .append('rect')
    .attr('x', (d, i) => xScale(d.x0))
    .attr('y', (d) => yScale(d.length))
    .attr('height', (d) => height - yScale(d.length))
    .attr('width', (d) => xScale(d.x1) - xScale(d.x0) - barPadding)
    .attr('fill', '#9c27b0');

bars
  .append('text')
    .text((d) => `${d.x0} - ${d.x1} (bar height: ${d.length})`)
    .attr('transform', 'rotate(-90)')
    .attr('y', (d) => (xScale(d.x1) + xScale(d.x0)) / 2)
    .attr('x', - height + 10)
    .style('alignment-baseline', 'middle');

d3.select('input')
  .property('min', minYear)
  .property('max', maxYear)
  .property('value', minYear)
  .on('input', () => {
    const year = +d3.event.target.value,
          yearData = birthData.filter((v) => v.year === year);

    xScale.domain([0, d3.max(yearData, (d) => d.births)]);
    histogram.domain(xScale.domain())
             .thresholds(xScale.ticks());

    const bins = histogram(yearData);
    yScale.domain([0, d3.max(bins, (d) => d.length)]);

    const bars = d3.select('svg')
                   .selectAll('.bar')
                   .data(bins);

    bars
      .exit()
      .remove();

    const g = bars
                .enter()
                .append('g')
                  .classed('bar', true);

    g.append('rect');
    g.append('text');

    g.merge(bars)
      .select('rect')
        .attr('x', (d, i) => xScale(d.x0))
        .attr('y', (d) => yScale(d.length))
        .attr('height', (d) => height - yScale(d.length))
        .attr('width', (d) => {
          const width = xScale(d.x1) - xScale(d.x0) - barPadding;
          return width < 0 ? 0 : width;
        })
        .attr('fill', '#9c27b0');

    g.merge(bars)
      .select('text')
        .text((d) => `${d.x0} - ${d.x1} (bar height: ${d.length})`)
        .attr('transform', 'rotate(-90)')
        .attr('y', (d) => (xScale(d.x1) + xScale(d.x0)) / 2)
        .attr('x', - height + 10)
        .style('alignment-baseline', 'middle');

  });