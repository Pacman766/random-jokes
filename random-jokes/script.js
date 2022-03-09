import translateRu from './ru.js';

/*------------- API -------------*/

const quoteEl = document.querySelector('#quote');
const btn = document.querySelector('#btn');
const languages = document.querySelector('.languages'); // parent
const ru = document.querySelector('.ru');
const en = document.querySelector('.en');
const main = document.querySelector('.main');
const h3 = document.querySelector('h3');

getQuoteEn();

languages.addEventListener('click', (e) => {
  if (e.target.classList.contains('ru') || e.target.classList.contains('en')) {
    if (e.target.classList.contains('ru')) {
      getQuoteRu();
      ru.classList.add('on');
      en.classList.remove('on');
      btn.textContent = 'Получить другую цитату';
      h3.textContent = 'Цитаты';

    } else if (e.target.classList.contains('en')) {
      getQuoteEn();
      ru.classList.remove('on');
      en.classList.add('on');
      btn.textContent = 'Get another quote';
      h3.textContent = 'Quotes';
    }
  }
});

btn.addEventListener('click', () => {
  main.classList.toggle('dark');
  if (ru.classList.contains('on')) {
    getQuoteRu();
  } else if (en.classList.contains('on')) {
    getQuoteEn();
  }
});

async function getQuoteEn() {
  // call API
  const quoteRes = await fetch('https://type.fit/api/quotes/');

  // convert to obj and get random el
  const quote = await quoteRes.json();
  const randomEl = quote[Math.floor(Math.random() * quote.length)];

  // set new quote
  quoteEl.innerHTML = `${randomEl.text} ${randomEl.author}`;
}

function getQuoteRu() {
  const randomEl = translateRu[Math.floor(Math.random() * translateRu.length)];
  return (quoteEl.innerHTML = `${randomEl.text}. ${randomEl.author}`);
}
