d3.queue()
  .defer(d3.json, '//unpkg.com/world-atlas@1.1.4/world/50m.json')
  .defer(d3.csv, './data/all_data.csv', (row) => {
    return {
      country: row.Country,
      countryCode: row['Country Code'],
      continent: row.Continent,
      region: row.Region,
      year: +row.Year,
      emissionsPerCapita: +row['Emissions Per Capita'],
      emissions: +row.Emissions
    }
  })
  .await((err, mapData, emissionsData) => {
    if (err) { throw err; }

    const geoData = topojson.feature(mapData, mapData.objects.countries).features;

    emissionsData.forEach((row) => {
      const countries = geoData.filter((d) => d.id === row.countryCode);
      countries.forEach((country) => country.properties = row);
    });

    const width = 700;
    const height = 400;
    const [minYear, maxYear] = d3.extent(emissionsData, (d) => d.year);

    let emissionType = 'emissionsPerCapita';
    let selectedCountry;

    const tooltip = d3.select('body')
                        .append('div')
                          .classed('tooltip', true);

    const emissionsRadioInput = d3.selectAll('.radio-group input');

    emissionsRadioInput
      .on('click', () => {
        emissionType = d3.event.target.value;

        setColor(minYear, emissionType);

        d3.selectAll('.radio-group label')
            .classed('active-radio', false);
        d3.select(d3.event.target.parentNode)
            .select('label')
              .classed('active-radio', 'true');

        makeHistogram(selectedCountry, emissionType);
      });

    d3.select('.year-input')
      .attr('min', minYear)
      .attr('max', maxYear)
      .attr('value', minYear)
      .on('input', (d) => {
        const year = +d3.event.target.value;
        setColor(year, emissionType);
      });

/***************************** MAP ********************************************/

    const projection = d3.geoMercator()
                         .scale(100)
                         .translate([width / 2, height / 1.4]);

    const path = d3.geoPath()
                   .projection(projection);

    d3.select(".map")
        .attr('width', width)
        .attr('height', height)
      .selectAll('.country')
      .data(geoData)
      .enter()
        .append('path')
        .classed('country', true)
        .attr('d', path);

    setColor(minYear, emissionType);

    function setColor(year, emissionType) {
      const yearData = emissionsData.filter((v) => v.year === year);

      const scale = d3.scaleLinear()
                      .domain([0, d3.max(yearData, (d) => d[emissionType])])
                      .range(['#ff8800', '#2d1700']);

      d3.selectAll('.country')
        .on('mousemove', (d) => {
          tooltip
            .style('opacity', 1)
            .style('left', d3.event.x - 100 + 'px')
            .style('top', d3.event.y + 20 + 'px')
            .html(`
              <p>Country: ${d.properties.country}</p>
              <p>Emissions: ${d.properties.emissions.toLocaleString()}</p>
              <p>Emissions p/C: ${d.properties.emissionsPerCapita.toLocaleString()}</p>
            `);
        })
        .on('mouseout', (d) => {
          tooltip
            .style('opacity', 0);
        })
        .on('click', (d) => {
          d3.selectAll('.country')
            .classed('stroked', false);

          d3.select(d3.event.target)
            .classed('stroked', true);

          selectedCountry = d.properties.country;
          makeHistogram(selectedCountry, emissionType);
        })
        .transition()
        .duration(750)
        .ease(d3.easeBackIn)
        .attr('fill', (d) => {
          const data = d.properties[emissionType];
          return data ? scale(data) : "#ccc"
        });
    }
/***************************** HISTOGRAM **************************************/

  const histoWidth = 500;
  const histoHeight = 500;
  const barPadding = 1;
  const padding = 50;

  function makeHistogram(country, emissionType) {
    let countryData = emissionsData.filter((v) => v.country === country);
    while (countryData.length !== 20) { countryData.shift(); }
    countryData.sort((a, b) => a.year - b.year)

    console.log(countryData);

    const barWidth = (histoWidth - (2 * padding)) / 20;

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(countryData, (d) => d[emissionType])])
                     .range([histoHeight - padding, padding]);

    const update = d3.select('.histo')
                         .attr('width', histoWidth)
                         .attr('height', histoHeight)
                      .selectAll('.bar')
                      .data(countryData);

    update
      .enter()
      .append('rect')
        .classed('bar', true)
        .attr('y', (d) => yScale(d[emissionType]))
        .attr('height', (d) => {
          const height = histoHeight - yScale(d[emissionType]);
          return height < 0 ? 0 : height;
        })
      .merge(update)
        .attr('x', (d, i) => i * barWidth + barPadding)
        .attr('width', barWidth - barPadding)
        .attr('fill', '#a53100')
        .transition()
        .duration(400)
        .delay((d, i) => i * 50)
          .attr('y', (d) => yScale(d[emissionType]))
          .attr('height', (d) => {
            const height = histoHeight - yScale(d[emissionType]) - padding;
            return height < 0 ? 0 : height;
          });

    const text = d3.select('.histo')
                     .selectAll('.x-axis-data')
                     .data(countryData);

    text
      .exit()
      .remove();

    text
      .enter()
      .append('text')
        .classed('x-axis-data', true)
        .text((d) => d.year)
        .attr('y', (d, i) => -i * barWidth - 5)
        .attr('x', histoHeight - padding)
        .attr('transform', 'rotate(90)');

    d3.select('.histo-header')
      .remove();

    d3.select('.histo')
      .append('text')
        .classed('histo-header', true)
        .text((d) => `CO2 ${emissionType} for ${selectedCountry}`)
        .attr('x', (histoWidth - (2 * padding)) / 2)
        .attr('y', padding - 5)
        .style('text-anchor', 'middle')
        .style('font-size', '1em');
  }

});
