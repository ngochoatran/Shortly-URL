const input = document.querySelector('.input')
var link = document.querySelector('#shorten-links')
var button = document.querySelector('#button')
var head  = 'https://api.shrtco.de/v2/shorten?url='

button.onclick = function(){
    head += input.value
    fetch(head)
        .then(function(response){
            return response.json()
        })
        .then(function(posts){
            var shortenLink = posts.result.short_link
            var html = `<li>${shortenLink}</li>`
            link.innerHTML = html
        })
}

