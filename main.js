const header = document.querySelector(".header");
const menu_open = document.querySelector(".open");
const menu_close = document.querySelector(".close");
const link_enter_block = document.querySelector(".shorten-link");
const link_input = document.querySelector(".link-input");
const link_shorten_btn = document.querySelector(".link-shorten-btn");
const shorten_links_group = document.querySelector(".finished-links");
const load_icon = document.querySelector(".load");
var headLink = "https://api.shrtco.de/v2/shorten?url=";
var link_storage = sessionStorage.getItem("link-storage");
//Check the storge and declare the html variable
if (link_storage) {
  var html = link_storage;
} else {
  var html = "";
}

// Get the shorten-links in session-storage and render to the screen, add events
function loadPageHistory() {
  shorten_links_group.innerHTML = link_storage;
  const past_links = document.querySelectorAll(".finished-item");
  if (past_links) {
    past_links.forEach((past_link) => {
      copyBtnEvent(past_link);
    });
  }
}

// When the user click the copy btn
function copyBtnEvent(shorten_link) {
  let copy_btn = shorten_link.querySelector(".copy");
  let copied_btn = shorten_link.querySelector(".copied");
  let new_link = shorten_link.querySelector("span");
  copy_btn.onclick = () => {
    shorten_link.classList.add("copy-active");
    navigator.clipboard.writeText(new_link.innerText);
    alert("Copied to the clipboard");
  };
  copied_btn.onclick = () => {
    navigator.clipboard.writeText(new_link.innerText);
    alert("Copied to the clipboard");
  };
}

//Validation the input
function inputValidation() {
  if (link_input.value.trim() === "") {
    link_enter_block.classList.add("invalid");
  }
}

function start() {
  loadPageHistory();

  //Open and close the mobile menu
  menu_close.onclick = () => {
    header.classList.remove("active-menu");
  };
  menu_open.onclick = () => {
    header.classList.add("active-menu");
  };

  // When user blur the input
  link_input.onblur = function () {
    inputValidation();
  };
  link_input.oninput = function () {
    link_enter_block.classList.remove("invalid");
  };

  // render link to the screen
  link_shorten_btn.onclick = function () {
    headLink += link_input.value;
    load_icon.classList.add("loading");
    fetch(headLink)
      //Process the api
      .then(function (response) {
        return response.json();
      })
      // Render link to the screen after having json
      .then(function (posts) {
        var shortenLink = posts.result.short_link;
        html += `<div class="finished-item">
            <p>
              ${link_input.value}
            </p>
            <span>${shortenLink}</span>
            <button class="copy">Copy</button>
            <button class="copied">Copied</button>
          </div>`;
        shorten_links_group.innerHTML = html;
        sessionStorage.setItem("link-storage", html);
        load_icon.classList.remove("loading");
        let shorten_links = document.querySelectorAll(".finished-item");
        return shorten_links;
      })
      // When the user click the button copy and copied
      .then(function (shorten_links) {
        shorten_links.forEach(function (shorten_link) {
          copyBtnEvent(shorten_link);
        });
      });
  };
}
start()
