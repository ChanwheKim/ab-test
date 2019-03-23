const interval = 100;
let waiting = false;

window.addEventListener('DOMContentLoaded', () => {
  console.log('tracking start');
  const url = window.location.href;

  const connectEvent = {
    name: 'connect',
    url,
  };

  fetch(`http://abtest-env.zui4w2hpdb.ap-northeast-2.elasticbeanstalk.com/api/test-page/${key}?event=${JSON.stringify(connectEvent)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  }).then(res => console.log('received response'));

  document.body.addEventListener('click', (ev) => {
    const isButtonCTA = !!ev.target.closest('.vabt-cta-btn');

    const clickEvent = {
      name: 'click',
      x: ev.pageX,
      y: ev.pageY,
      isButtonCTA,
    };

    fetch(`http://abtest-env.zui4w2hpdb.ap-northeast-2.elasticbeanstalk.com/api/test-page/${key}?event=${JSON.stringify(clickEvent)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
    });
  });
});

window.onunload = () => {
  const event = {
    name: 'leave',
  };

  fetch(`http://abtest-env.zui4w2hpdb.ap-northeast-2.elasticbeanstalk.com/api/test-page/${key}?event=${JSON.stringify(event)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  });
};
const key = "dp73yy179jtk4tn40";