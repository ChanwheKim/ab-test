const interval = 100;
let waiting = false;

window.addEventListener('DOMContentLoaded', () => {
  console.log('key is ', key);
  const url = window.location.href;
  console.log(url);
  const event = {
    name: 'connect',
    url,
  };

  fetch(`http://localhost:8080/api/test-page/${key}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ event }),
  })
    .then(res => res.json())
    .then(res => console.log(res));

  document.body.addEventListener('click', (ev) => {
    const isButtonCTA = !!ev.target.closest('.vabt-cta-btn');

    const event = {
      name: 'click',
      x: ev.pageX,
      y: ev.pageY,
      isButtonCTA,
    };

    fetch(`http://localhost:8080/api/test-page/${key}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event }),
    })
      .then(res => res.json())
      .then(res => console.log(res));
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

};
const key = "sktwia1ujth7nrex";