const width = 600,
      height = 600,
      minYear = d3.min(birthData, (d) => d.year),
      maxYear = d3.max(birthData, (d) => d.year);

birthData = birthData.map((v) => {
  if (v.month === 'January' || v.month === 'February' || v.month === 'March') {
    v.quarter = 1;
  }
  if (v.month === 'April' || v.month === 'May' || v.month === 'June') {
    v.quarter = 2;
  }
  if (v.month === 'July' || v.month === 'August' || v.month === 'September') {
    v.quarter = 3;
  }
  if (v.month === 'October' || v.month === 'November' || v.month === 'December') {
    v.quarter = 4;
  }
  return v;
});

const months = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const quarters = [1, 2, 3, 4];

const colorScaleOuter = d3.scaleOrdinal()
                          .domain(months)
                          .range(d3.schemeCategory20);

const colorScaleInner = d3.scaleOrdinal()
                          .domain(quarters)
                          .range(d3.schemeCategory10);

const chartGroup = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .classed('chart', true);

chartGroup
  .append('g')
    .classed('chart-outer', true);

chartGroup
  .append('g')
    .classed('chart-inner', true);

const input = d3.select('input')
                  .attr('min', minYear)
                  .attr('max', maxYear)
                  .attr('value', minYear)
                  .on('input', (d) => {
                    makeGraph(+d3.event.target.value);
                  });

makeGraph(minYear);

function makeGraph(year) {
  const yearData = birthData.filter((v) => v.year === year);

  const arcs = d3.pie()
                 .value((d) => d.births)
                 .sort((a, b) => {
                   return months.indexOf(a.month) - months.indexOf(b.month);
                 });

  const innerArcs = d3.pie()
                      .value((d) => d.births)
                      .sort((a, b) => a.quarter - b.quarter);

  const path = d3.arc()
                 .outerRadius(width / 2 - 40)
                 .innerRadius(width / 4);

  const innerPath = d3.arc()
                      .innerRadius(0)
                      .outerRadius(width / 4);

  const outer = d3.select('.chart-outer')
                   .selectAll('.arc')
                   .data(arcs(yearData));

  const inner = d3.select('.chart-inner')
                  .selectAll('.arc')
                  .data(innerArcs(getDataByQuarter(yearData)));

  outer
    .enter()
    .append('path')
      .classed('arc', true)
    .merge(outer)
      .attr('d', path)
      .attr('fill', (d) => colorScaleOuter(d.data.month))
      .attr('stroke', 'black');

  inner
    .enter()
    .append('path')
      .classed('arc', true)
    .merge(inner)
      .attr('d', innerPath)
      .attr('fill', (d) => colorScaleInner(d.data.quarter))
      .attr('stroke', 'black');

  d3.select('.current-year')
    .text('Selected year: ' + year);
}

function getDataByQuarter(data) {
  return [1, 2, 3, 4].map((v) => {
    let births = 0;

    data.forEach((obj) => {
      if (obj.quarter === v) { births += obj.births; }
    });

    return { quarter: v, births }
  });
}
