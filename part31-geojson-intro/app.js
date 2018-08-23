d3.json('./sample_geo.json', (err, data) => {
  if (err) { throw err; }

  const path = d3.geoPath();
  const width = 600;
  const height = 600;

  d3.select('svg')
      .attr('width', width)
      .attr('height', height)
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
      .attr('d', path)
      .attr('fill', (d) => d.properties.color);
});
