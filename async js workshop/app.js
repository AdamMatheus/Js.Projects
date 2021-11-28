const button = document.querySelector('button');
const tbody = document.querySelector('tbody');
const thead = document.querySelector('thead');
const msg = document.querySelector('.msg');
const resource = 'mockk.json';

button.addEventListener('click', async () => {
  try {
    const response = await fetch(resource);
    if (response.status !== 200) {
      throw { status: response.status, statusText: response.statusText };
    }
    const data = await response.json();

    renderData(data);
  } catch (err) {
    msg.innerHTML = `statusCode: ${err.status} <br> statusText: ${err.statusText}`;
  }
});

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// getData(resource);

function renderData(data) {
  thead.innerHTML = `<tr>
                      <th>${data[0].firstName}</th>
                      <th>${data[0].lastName}</th>
                    </tr>`;

  data
    .filter(person => person.firstName !== 'firstName')
    .forEach(person => {
      tbody.innerHTML += `<tr>
                          <td>${person.firstName}</td>
                          <td>${person.lastName}</td>
                      </tr>`;
    });
}
