// get tips from Smth
let tips = ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus delectus vel laborum unde quasi, non perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit, amet consectetur adipisicing.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quas similique sit et natus!', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit!', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo in enim dolorem distinctio?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit inventore earum culpa! Dolorum voluptates ut adipisci iste similique? Nam tempore ut excepturi eum qui.', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe optio ab, doloribus facere debitis iure libero harum, assumenda dolorem aliquam corrupti.'];

// check localStorage
(function checkStorage() {
  let localValue = localStorage.getItem('notifications');
    if (localValue !== 'hide') {
      // init function when LoremIpsum~ page will be load (script --> /body)
      setTimeout(() => {
        notifications();
      }, 0);
    }
})();

// if localStorage OK --> init function
function notifications() {
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
      </div>
    </footer>`;

  document.body.appendChild(template);

  closeWindow();
  disableSwitch();
  storageBox(tips);
  controlPoint();
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

  // select firstPoint as active
  let firstPoint = document.querySelectorAll('.point')[0];
  firstPoint.classList.add('active');
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
  let point = document.querySelectorAll('a');
    for (let i = 0; i < point.length; i++) {
      point[i].addEventListener('click', () => {
        resetPoint();
        point[i].classList.add('active');
      });
    }
}