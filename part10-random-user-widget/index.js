const url = 'https://randomuser.me/api',
      btn = document.querySelector('.btn'),
      nameEl = document.querySelector('.name'),
      usernameEl = document.querySelector('.username'),
      emailEl = document.querySelector('.email span'),
      cityEl = document.querySelector('.city span'),
      pictureEl = document.querySelector('.user-widget img');

function capitalize(str) {
  const parts = str.trim().split(/\s+/);
  return parts.map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  }).join(' ');
}

async function loadUser() {
  const reponse = await fetch(url);
        data = await reponse.json(),
        user = data.results[0],
        name = user.name.first + ' ' + user.name.last,
        username = user.login.username,
        email = user.email,
        city = user.location.city,
        picture = user.picture.large;

  nameEl.textContent = capitalize(name);
  usernameEl.textContent = username;
  emailEl.textContent = email;
  cityEl.textContent = capitalize(city);
  pictureEl.src = picture;
}

loadUser();

btn.addEventListener('click', loadUser);
