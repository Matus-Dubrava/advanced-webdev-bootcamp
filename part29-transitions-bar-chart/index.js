const width = 600;
const height = 600;
const padding = 5;
const barWidth = width / 12 - padding;
const [minYear, maxYear] = d3.extent(birthData, (d) => d.year);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augus', 'September', 'October', 'November', 'December'];

const yScale = d3.scaleLinear()
                 .domain([0, d3.max(birthData, (d) => d.births)])
                 .range([height - padding, padding]);

const svg = d3.select('svg')
                  .attr('width', width)
                  .attr('height', height);

const input = d3.select('input')
                    .attr('min', minYear)
                    .attr('max', maxYear)
                    .on('input', () => {
                      makeGraph(+d3.event.target.value);
                    });

const tooltip = d3.select('body')
                    .append('div')
                      .classed('tooltip', true);

makeGraph(minYear);

function makeGraph(year) {
  const yearData = birthData.filter((v) => v.year === year);

  const update = svg
                  .selectAll('.bar')
                  .data(yearData);

  update
    .exit()
    .remove();

  update
    .enter()
      .append('rect')
        .classed('bar', true)
        .attr('y', (d) => yScale(d.births))
        .attr('height', (d) => height - yScale(d.births))
    .merge(update)
        .attr('x', (d, i) => (barWidth + padding) * i)
        .attr('width', barWidth)
        .attr('fill', 'purple')
        .on('mousemove', (d) => {
          d3.select(d3.event.target)
            .attr('fill', 'orange');

          tooltip
            .style('left', d3.event.x - 30 + 'px')
            .style('top', d3.event.y + 20 + 'px')
            .style('opacity', 1)
            .text(`${d.births.toLocaleString()}`);
        })
        .on('mouseout', (d) => {
          d3.select(d3.event.target)
            .attr('fill', 'purple');

          tooltip
            .style('opacity', 0);
        })
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .delay((d, i) => i * 200)
          .attr('y', (d) => yScale(d.births))
          .attr('height', (d) => height - yScale(d.births));
}
