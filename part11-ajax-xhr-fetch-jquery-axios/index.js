const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

const output = document.querySelector('.quote'),
      xhrBtn = document.querySelector('#btn-1'),
      fetchBtn = document.querySelector('#btn-2'),
      jqBtn = document.querySelector('#btn-3'),
      axiosBtn = document.querySelector('#btn-4');

function updateQuote(qt) {
  output.textContent = `"${qt}"`;
}

xhrBtn.addEventListener('click', (evt) => {
  const XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4 && XHR.status === 200) {
      const res = XHR.responseText;
      const data = JSON.parse(res);
      updateQuote(data);
    }
  }

  XHR.open('GET', url);
  XHR.send();
});

fetchBtn.addEventListener('click', (evt) => {
  fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Request failed.');
    }
    return response;
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    updateQuote(data);
  })
  .catch((err) => console.error(err));
});

jqBtn.addEventListener('click', (evt) => {
  $.ajax({
    url,
    method: 'get'
  })
  .done((data) => updateQuote(data))
  .fail((err) => console.error(err));
});

axiosBtn.addEventListener('click', (evt) => {
  axios.get(url)
  .then((data) => { updateQuote(data.data[0]); })
  .catch((err) => { console.error(err); });
});
