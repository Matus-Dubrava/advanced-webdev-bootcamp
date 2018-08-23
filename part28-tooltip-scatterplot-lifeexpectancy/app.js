// x-scale population / birhts
// y-scale lifeExpectancy
// radius-scale Births [2, 40]
// color-scale population / area [lightgreen, black]

const width = 600;
const height = 600;
const padding = 30;

const xScale = d3.scaleLinear()
                 .domain(d3.extent(birthData2011, (d) => d.births / d.population))
                 .range([padding, width - padding]);

const xAxis = d3.axisBottom(xScale)
                .tickSize(-width + 2 * padding)
                .tickSizeOuter(0);

const yScale = d3.scaleLinear()
                 .domain(d3.extent(birthData2011, (d) => d.lifeExpectancy))
                 .range([height - padding, padding]);

const yAxis = d3.axisLeft(yScale)
                .tickSize(-height + 2 * padding)
                .tickSizeOuter(0);

const colorScale = d3.scaleLinear()
                     .domain(d3.extent(birthData2011, (d) => d.population / d.area))
                     .range(['lightgreen', 'black']);

const radiusScale = d3.scaleLinear()
                      .domain(d3.extent(birthData2011, (d) => d.births))
                      .range([2, 40]);

const tooltip = d3.select('body')
                  .append('div')
                    .classed('tooltip', true);

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
    .attr('stroke', '#f2f2f2')
    .on('mousemove', showTooltip)
    .on('touchstart', showTooltip)
    .on('mouseout', hideTooltip)
    .on('touchend', hideTooltip);

d3.select('svg')
  .append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);

d3.select('svg')
  .append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

d3.select('svg')
  .append('text')
    .text('Births per Capita')
    .attr('x', width / 2)
    .attr('y', height - 5)
    .style('text-anchor', 'middle');

d3.select('svg')
  .append('text')
    .text('Life Expectancy')
    .attr('x', - height / 2)
    .attr('y', 12)
    .attr('transform', 'rotate(-90)')
    .style('text-anchor', 'middle');

d3.select('svg')
  .append('text')
    .text('Data on Births By Country in 2011')
    .attr('x', width / 2)
    .attr('y', 20)
    .style('text-anchor', 'middle')
    .style('font-size', '1.5em');

function showTooltip(d) {
  tooltip
    .style('opacity', 1)
    .style('left', d3.event.x - (tooltip.node().offsetWidth / 2) + 'px')
    .style('top', d3.event.y + 30 + 'px')
    .html(`
      <p>Region: ${d.region}</p>
      <p>Births: ${d.births.toLocaleString()}</p>
      <p>Population: ${d.population.toLocaleString()}</p>
      <p>Area: ${d.area}</p>
      <p>Life Expectancy: ${d.lifeExpectancy}</p>
    `);
}

function hideTooltip() {
  d3.select('.tooltip')
    .style('opacity', 0);
}
