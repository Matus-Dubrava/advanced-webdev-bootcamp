function getFrequencies(str) {
  const freq = [];

  Array.from(str).forEach((letter) => {
    let done = false;

    freq.forEach((obj) => {
      if (obj.character === letter) {
        obj.count += 1;
        done = true;
        return;
      }
    });

    if (!done) {
      freq.push({ character: letter, count: 1 });
    }
  });

  freq.sort((a, b) => a.character > b.character);
  return freq;
}

const $input = d3.select('input'),
      width = 600,
      height = 300,
      $chart = d3.select('svg')
                 .attr('width', width)
                 .attr('height', height),
      $clearBtn = d3.select('#clear-btn'),
      $freqBtn = d3.select('#freq-btn'),
      barPadding = 10;

$freqBtn
  .on('click', () => {
    const text = $input.property('value'),
          data = getFrequencies(text),
          barWidth = width / data.length - barPadding;

    const letters = $chart
                     .selectAll('.letter')
                     .data(data, (d) => d.character);

    letters
        .classed('new', false)
      .exit()
      .remove();

    const letterEnter = letters
      .enter()
      .append('g')
        .classed('letter', true)
        .classed('new', true)

    letterEnter.append('rect');
    letterEnter.append('text');

    letterEnter.merge(letters)
      .select('rect')
        .style('width', barWidth)
        .style('height', (d) => d.count * 20)
        .attr('x', (d, i) => (barWidth + barPadding) * i)
        .attr('y', (d) => d.count * 20)

    letterEnter.merge(letters)
      .select('text')
        .attr('x', (d, i) => (barWidth + barPadding) * i + barWidth / 2)
        .attr('y', (d) => d.count * 20 - 10)
        .attr('text-anchor', 'middle')
        .text((d) => d.character);

  });

//
// $freqBtn.on('click', () => {
//   const frequencies = getFrequencies($input.property('value'));
//
//   $chart
//     .attr('width', width)
//     .attr('height', height)
//
//   $chart
//     .selectAll('rect')
//     .data(frequencies, (d) => d.character)
//     .enter()
//     .remove();
//
//   const enterSelection = $chart
//     .selectAll('text')
//     .data(frequencies)
//     .enter();
//
//   enterSelection
//     .append('rect')
//       .attr('width', barWidth)
//       .attr('height', (d) => d.count * 20)
//       .attr('x', (d, i) => i * (barWidth + barPadding))
//       .attr('y', (d, i) => height - (d.count * 20) - 20)
//       .attr('fill', '#99b1db')
//
//   enterSelection
//     .append('text')
//       .text((d) => d.character)
//       .attr('stroke', '#333')
//       .attr('stroke-width', '0.5')
//       .attr('x', (d, i) => i * (barWidth + barPadding) + 10)
//       .attr('y', (d, i) => height)
//       .attr('text-anchor', 'middle');
//
//   enterSelection
//     .append('text')
//       .text((d) => d.count)
//       .attr('stroke', '#333')
//       .attr('stroke-width', '0.5')
//       .attr('x', (d, i) => i * (barWidth + barPadding) + 10)
//       .attr('y', (d, i) => height - (d.count * 20) - 30)
//       .attr('text-anchor', 'middle');
//
//
// });
