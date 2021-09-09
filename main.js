const header = document.querySelector('.header')
const menu_open = document.querySelector('.open')
const menu_close = document.querySelector('.close')
const link_input = document.querySelector('.link-input')
const link_shorten_btn = document.querySelector('.link-shorten-btn')
const shorten_links = document.querySelector('.finished-links')
const load_icon = document.querySelector('.load')
var headLink = 'https://api.shrtco.de/v2/shorten?url='
var html = ''

//Open and close the menu
menu_close.onclick = ()=>{
    header.classList.remove('active-menu')
}
menu_open.onclick = ()=>{
    header.classList.add('active-menu')
}
link_shorten_btn.onclick = function(){
    headLink += link_input.value
    fetch(headLink)
        .then(function(response){
            return response.json()
        })
        .then(function(posts){
            var shortenLink = posts.result.short_link
            html += `<div class="finished-item">
            <p>
              ${link_input.value}<span>${shortenLink}</span>
            </p>
            <button class="copy">Copy</button>
            <button class="copied">Copied</button>
          </div>`
            shorten_links.innerHTML = html
        })
}

