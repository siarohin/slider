// get tips from Smth
let tips = ['1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias ab sapiente facere.', '2. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias ab sapiente facere. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias ab sapiente facere.', '3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias ab sapiente facere!! Molestias ab sapiente facere.', '4. Molestias ab sapiente facere. Molestias ab sapiente facere.', '5. Molestias ab sapiente facere. Molestias ab sapiente facere. Molestias ab sapiente facere.', '6. Molestias ab sapiente facere.'];

// check localStorage
(function checkStorage() {
  let localValue = localStorage.getItem('notifications');
    if (localValue !== 'hide') {
      // init function when LoremIpsum~ page will be load (script --> /body)
      setTimeout(() => {
        notifications();
      }, 5000);
    }
})();

// if localStorage OK --> init function
function notifications() {
  // clear window adress in browser to start position;
  window.location.hash = '#1';

  // create a notificator
  let template = document.createElement('div');

  template.id = 'notifications';
  template.innerHTML = `
  <link href="./notifications/notifications.css" rel="stylesheet" type="text/css">
  <h3>Email tip of the day</h3>
    <a class="close"></a>
    <article>
    </article>
    <footer>
      <form>
        <input type="checkbox" id="ntf-trigger" name="trigger">
        <label for="ntf-trigger">Disable Tips</label>
      </form>
      <div class="points">
        <a class="prev"></a>
        <a class="next"></a>
      </div>
    </footer>`;

  document.body.appendChild(template);

  closeWindow();
  disableSwitch();
  storageBox(tips);
  listenerExperemental();
  controlPoint();
  keyListener();
  windowLister();
}


function listenerExperemental() {
  let toDown = document.querySelector('.prev');
  let toUp = document.querySelector('.next');
  let target = document.querySelectorAll('article > p');
  toDown.addEventListener('click', () => {
    let strToNum = (window.location.hash).replace(/[^0-9]/g,'');
    strToNum > 1 ? strToNum = +strToNum - 1 : strToNum = tips.length;
    window.location.hash = '#' + strToNum;
    windowLister();
  });
  toUp.addEventListener('click', () => {
    let strToNum = (window.location.hash).replace(/[^0-9]/g,'');
    strToNum < tips.length ? strToNum = +strToNum + 1 : strToNum = 1;
    window.location.hash = '#' + strToNum;
    windowLister();
  });
}

// is close button push? OK --> close window
function closeWindow() {
  let link = document.querySelector('.close');
  link.addEventListener('click', () => {
    let element = document.getElementById('notifications');
    element.classList.add('hidden');
  });
}

// is disable
function disableSwitch() {
  let checkbox = document.getElementById('ntf-trigger');
  checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      localStorage.setItem('notifications', 'hide');
      let localValue = localStorage.getItem('myKey');
      console.log(localValue);
    } else {
      localStorage.removeItem('notifications');
    }
  });
}

// add tips & points
let storageBox = (arr) => {
  let element = document.querySelector('article');
  let points = document.querySelector('points');

  for (let i = 0; i < arr.length; i++) {
    let p = document.createElement('p');
    document.querySelector('article').appendChild(p);
    p.id = '' + (i+1);
    p.innerHTML = arr[i];
    let a = document.createElement('a');
    document.querySelector('.points').insertBefore(a, document.querySelector('.next'));
    a.href = '#' + (i+1);
    a.classList.add('point');
  }
};

// point Reset
function resetPoint() {
  let point = document.querySelectorAll('.point');
  for (let i = 0; i < point.length; i++) {
    point[i].classList.remove('active');
  }
}

// point Control
function controlPoint() {
  let point = document.querySelectorAll('.point');
    for (let i = 0; i < point.length; i++) {
      point[i].addEventListener('click', () => {
        resetPoint();
        point[i].classList.add('active');
      });
    }
}

// window Listener function (set active to point)
function windowLister() {
  let point = document.querySelectorAll('.point');
  for (let i = 0; i < point.length; i++) {
    if (point[i].hash === window.location.hash) {
      resetPoint();
      point[i].classList.add('active');
    }
  }
}

// keyboard Listener
function keyListener() {
  let toDown = document.querySelector('.prev');
  let toUp = document.querySelector('.next');
  window.onkeyup = function(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    let strToNum = (window.location.hash).replace(/[^0-9]/g,'');

    if (key === 39) {
      strToNum < tips.length ? strToNum = +strToNum + 1 : strToNum = 1;
      toUp.classList.add('imitationClick');
      setTimeout(() => {
        toUp.classList.remove('imitationClick');
      }, 150);
    }
    if (key === 37) {
      strToNum > 1 ? strToNum = +strToNum - 1 : strToNum = tips.length;
      toDown.classList.add('imitationClick');
      setTimeout(() => {
        toDown.classList.remove('imitationClick');
      }, 150);
    }
    window.location.hash = '#' + strToNum;
    windowLister();
  }
}