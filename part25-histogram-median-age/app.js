const width = 600,
      height = 600,
      barPadding = 1,
      padding = 50,
      data = regionData.filter((v) => v.medianAge),
      initialBinCount = 16;

d3.select('input')
    .attr('min', 1)
    .attr('max', 50)
    .property('value', initialBinCount)
  .on('input', () => {
    updateRect(+d3.event.target.value);
  });

const svg = d3.select('svg')
              .attr('width', width)
              .attr('height', height);

svg.append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(0, ${height - padding})`)

svg.append('g')
    .classed('y-axis', true)
    .attr('transform', `translate(${padding}, 0)`)

svg.append('text')
    .text('Median Age')
    .attr('transform', `translate(${width / 2}, ${height - 10})`)
    .style('text-anchor', 'middle');

svg.append('text')
    .text('Frequencies')
    .attr('x', - height / 2)
    .attr('y', 20)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle');

updateRect(initialBinCount);

function updateRect(val) {
  const xScale = d3.scaleLinear()
                   .domain(d3.extent(data, (d) => d.medianAge))
                   .rangeRound([padding, width - padding]),
        histogram = d3.histogram()
                      .domain(xScale.domain())
                      .thresholds(xScale.ticks(val))
                      .value((d) => d.medianAge),
        bins = histogram(data),
        yScale = d3.scaleLinear()
                   .domain([0, d3.max(bins, (d) => d.length)])
                   .range([height - padding, padding]);

        d3.select('.y-axis')
            .call(d3.axisLeft(yScale));

        d3.select('.x-axis')
            .call(d3.axisBottom(xScale)
                    .ticks(val))
          .selectAll('text')
            .attr('y', -3)
            .attr('x', 10)
            .attr('transform', 'rotate(90)')
            .style('text-anchor', 'start');

        const rect = svg
                      .selectAll('rect')
                      .data(bins);

        rect
          .exit()
          .remove();

        rect
          .enter()
            .append('rect')
          .merge(rect)
            .attr('x', (d) => xScale(d.x0))
            .attr('y', (d) => yScale(d.length))
            .attr('width', (d) =>  {
              const width = xScale(d.x1) - xScale(d.x0) - barPadding;
              return width < 0 ? 0 : width;
            })
            .attr('height', (d) => height - yScale(d.length) - padding)
            .attr('fill', 'blue');

        d3.select('.bin-count')
          .text(`Number of bins: ${val}`);
}
