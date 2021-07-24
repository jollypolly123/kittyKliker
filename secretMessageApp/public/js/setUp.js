head = `
    <title>Kitty Kliker <3</title>`;

navBar = `
      <div class="navbar-menu is-active">
        <a class="navbar-item" href="index.html">
          Home
        </a>
        <a class="navbar-item" href="viewMessages.html">
          View Your Messages
        </a>
        <a class="navbar-item" href="kittyKliker.html">
          Kitty Kliker
        </a>
      </div>`;

document.querySelector('.navbar').innerHTML = navBar;
document.querySelector('.head').innerHTML += head;