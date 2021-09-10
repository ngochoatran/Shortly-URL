const header = document.querySelector('.header')
const menu_open = document.querySelector('.open')
const menu_close = document.querySelector('.close')
const link_input = document.querySelector('.link-input')
const link_shorten_btn = document.querySelector('.link-shorten-btn')
const shorten_links_group = document.querySelector('.finished-links')
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

// render link to the screen
link_shorten_btn.onclick = function(){
    headLink += link_input.value
    load_icon.classList.add('loading')
    fetch(headLink)
        .then(function(response){ //Process the api
            return response.json()
        })
        .then(function(posts){ // Render link to the screen after having json
            var shortenLink = posts.result.short_link
            html += `<div class="finished-item">
            <p>
              ${link_input.value}
            </p>
            <span>${shortenLink}</span>
            <button class="copy">Copy</button>
            <button class="copied">Copied</button>
          </div>`
            shorten_links_group.innerHTML = html
            load_icon.classList.remove('loading')
            let shorten_links = document.querySelectorAll('.finished-item')
            return shorten_links
        })
        .then(function(shorten_links){ // When the user click the button copy
            shorten_links.forEach(function(shorten_link){
                let copy_btn = shorten_link.querySelector('button')
                let new_link = shorten_link.querySelector('span')
                copy_btn.onclick = ()=>{
                    shorten_link.classList.add('copy-active')
                    navigator.clipboard.writeText(new_link.innerText);
                    alert('Copied to the clipboard')
                }
            })
        })  
}


