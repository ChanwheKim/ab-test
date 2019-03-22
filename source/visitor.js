const interval = 100;
let waiting = false;

window.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;

  const connectEvent = {
    name: 'connect',
    url,
  };

  fetch(`http://localhost:8080/api/test-page/${key}?event=${JSON.stringify(connectEvent)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  });

  document.body.addEventListener('click', (ev) => {
    const isButtonCTA = !!ev.target.closest('.vabt-cta-btn');

    const clickEvent = {
      name: 'click',
      x: ev.pageX,
      y: ev.pageY,
      isButtonCTA,
    };

    fetch(`http://localhost:8080/api/test-page/${key}?event=${JSON.stringify(clickEvent)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
    });
  });

  // document.body.addEventListener('mousemove', (ev) => {
  //   if (!waiting) {
  //     waiting = true;

  //     const event = {
  //       name: 'mousemove',
  //       x: ev.pageX,
  //       y: ev.pageY,
  //     };

  //     fetch(`http://localhost:8080/api/test-page/${key}`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ event }),
  //     })
  //       .then(res => res.json())
  //       .then(res => console.log(res))
  //       .then(() => {
  //         setTimeout(() => {
  //           waiting = false;
  //         }, interval);
  //       });
  //   }
  // });
});

window.onunload = () => {
  const event = {
    name: 'leave',
  };

  fetch(`http://localhost:8080/api/test-page/${key}?event=${JSON.stringify(event)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  });
};
const key = "sktwi8kljtjylgib";