const width = 600;
const height = 600;
const padding = 5;
const barWidth = width / 12 - padding;
const [minYear, maxYear] = d3.extent(birthData, (d) => d.year);

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
    .merge(update)
        .attr('x', (d, i) => (barWidth + padding) * i)
        .attr('y', (d) => yScale(d.births))
        .attr('width', barWidth)
        .attr('height', (d) => height - yScale(d.births))
        .attr('fill', 'purple');
}
