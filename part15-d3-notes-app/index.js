const input = d3.select('#new-note input'),
      tempNote = d3.select('#temp-note');

d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      var input = d3.select('input');
      d3.select("#notes")
        .append('p')
          .classed('note', true)
          .text(input.property('value'));

      input.property('value', '');

      d3.select('#temp-note')
        .style('display', 'none');
    });

d3.select('#new-note input')
  .on('input', () => {
    const inpValue = input.property('value');

    inpValue !== ''
      ? tempNote
          .style('display', 'block')
          .text(input.property('value'))
      : tempNote
          .style('display', 'none')
  });

d3.select('#clear-notes')
  .on('click', () => {
    d3.selectAll('p:not(.temp-note)')
      .remove();
  });

d3.select('#lucky-btn')
  .on('click', () => {
    d3.selectAll('p:not(.temp-note)')
      .style('font-size', (_, idx) => {
        return (Math.floor(Math.random() * (40 - 10)) + 10) + 'px';
      });
  });
