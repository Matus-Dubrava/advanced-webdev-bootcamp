const $input = d3.select('input'),
      $form = d3.select('form'),
      $letters = d3.select('#letters');

function findObjByPropertyValue(arr, prop, value) {
  let obj;

  arr.forEach((o) => {
    if (o.hasOwnProperty(prop) && o[prop] === value) {
      obj = o;
    }
  });

  return obj;
}

$form
  .on('submit', () => {
    d3.event.preventDefault();
    const value = Array.from($input.property('value')),
          occurances = [];

    value.forEach((letter) => {
      const o = findObjByPropertyValue(occurances, 'letter', letter);
      o ? o.count += 1 : occurances.push({ letter, count: 1 });
    });

    const updated = $letters
      .selectAll('.letter')
      .data(occurances, (d) => d.letter)
      .classed('new', false)

    $letters
      .selectAll('.letter')
      .data(occurances, (d) => d.letter)
      .exit()
      .remove();

    const newLetters = $letters
      .selectAll('.letter')
      .data(occurances)
      .enter()
      .append('div')
        .text((d) => d.letter)
        .classed('letter', true)
        .classed('new', true)

    newLetters.merge(updated)
      .style('height', (d) => {
        return (20 * d.count) + 'px';
      });
  });

d3.select('#reset')
  .on('click', () => {
    d3.selectAll('.letter')
      .data([])
      .exit()
      .remove();
  });
