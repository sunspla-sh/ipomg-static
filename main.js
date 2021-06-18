
async function loadText(url, event){
  event.stopPropagation();
  try{
    event.target.querySelector('.gradient-border-container__inner__info__load').classList.remove('done');
    event.target.querySelector('.gradient-border-container__inner__info__text-reload').classList.remove('fail');
    event.target.querySelector('.gradient-border-container__inner__info__btn-reload').classList.remove('fail');
    const res = await fetch(url);
    const text = await res.text();
    event.target.querySelector('.gradient-border-container__inner__info__text').innerText = text;
    event.target.querySelector('.gradient-border-container__inner__info__load').classList.add('done');
    event.target.querySelector('.gradient-border-container__inner__info__text').classList.remove('loading');
    event.target.querySelector('.gradient-border-container__inner__info__btn-copy').classList.remove('loading');
  } catch(error){
    
    event.target.querySelector('.gradient-border-container__inner__info__load').classList.add('done');
    event.target.querySelector('.gradient-border-container__inner__info__text-reload').classList.add('fail');
    event.target.querySelector('.gradient-border-container__inner__info__btn-reload').classList.add('fail');
    console.log('something went wrong while attempting to fetch and load the text: ', error);
  }
}

//dispatch a loading event to trigger the loadText function (with a pre-specified url)
function tryLoading(event){
  event.target.closest('.gradient-border-container').dispatchEvent(new Event('fetching'));
}

//copies text to clipboard
function copyTextToClipboard(event){
  let copied = event.target.closest('.gradient-border-container__inner__info').querySelector('.gradient-border-container__inner__info__text').innerText;
  navigator.clipboard.writeText(copied)
    .then(() => {
      event.target.innerText = 'Copied!';
      setTimeout(() => event.target.innerText = 'Copy', 1000)
    })
    .catch(() => {
      event.target.innerText = 'Failed';
      setTimeout(() => event.target.innerText = 'Copy', 1000)
    });
}

document.querySelector('#ip-container').addEventListener('fetching', loadText.bind(this, 'http://localhost:3001/text'));
document.querySelector('#hostname-container').addEventListener('fetching', loadText.bind(this, 'http://localhost:3001/hn-text'));

//bind the retryLoading funtion to the retry buttons
document.querySelectorAll('.gradient-border-container__inner__info__btn-reload').forEach(elem => elem.addEventListener('click', tryLoading))

//bind the copyTextToClipboard function to the copy buttons
document.querySelectorAll('.gradient-border-container__inner__info__btn-copy').forEach(elem => elem.addEventListener('click', copyTextToClipboard))

//trigger intial loading for all info container
document.querySelectorAll('.gradient-border-container').forEach(elem => elem.dispatchEvent(new Event('fetching')))

