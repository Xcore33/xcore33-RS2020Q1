const txt = document.querySelector("#sectionContentSearch");

export function translate() {
  const request = new XMLHttpRequest();
  const text = encodeURIComponent(txt.value);
  const key = "trnsl.1.1.20200504T130133Z.8d398eeea55cc3d6.b0ed35f3724a112b13d6963dc8cbe56a570e02ee";
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en&format=plain&options=1`
  request.open('GET', url, true);
  request.onload = function getRequest() {
  if (request.status >= 200 && request.status < 400 ) {
    const data = JSON.parse(request.responseText);
    txt.value = data.text;
  }
  };
  request.send();
    };
