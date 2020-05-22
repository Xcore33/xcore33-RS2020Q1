const textElement = (className, textContent) => {
  const text = document.createElement('p');
  text.classList.add(className);
  text.textContent = textContent || '';
  return text;
};


const divElement = (divClass, divId = null) => {
  const div = document.createElement('div');
  div.classList.add(divClass);
  div.id = divId || '';
  div.prepend();
  return div;
};

const headerElement = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  header.classList.add('wrapper');
  header.prepend();
  return header;
};

const mainElement = () => {
  const main = document.createElement('main');
  main.classList.add('main');
  main.classList.add('wrapper');
  main.prepend();
  return main;
};

const footerElement = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer-container');
  footer.classList.add('wrapper');
  footer.prepend(textElement('credits', 'RSS task by Xcore33'));
  return footer;
};

const renderLayout = () => {
  document.body.prepend(divElement('background-image', 'idBGImage'), headerElement(), mainElement(), footerElement());
};

export default {
  renderLayout,
};
