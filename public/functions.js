const baseUrl = "https://pokeapi.co/api/v2/"
const input = document.getElementById('name')
const namepkm = document.getElementById('namepkm')
const shiny = document.getElementById('shiny')
const statuspkn = document.getElementById('statuspkn')
const pkmimage = document.getElementById('pkmimage')
const button = document.getElementById('buscar')
const species_name = document.getElementById('species')

const random = document.getElementById('random')

button.addEventListener('click', () => {
    valor = input.value
    valor = valor.toLowerCase()
    buscar(valor)
    

})


random.addEventListener('click', () => {

    buscar(getRandomInt(1, 898))
    
})



function buscar(valor) {

    if (valor > 898)
        valor = 898

    if (valor < 1)
        valor = 1
        pkn_species(valor)

    link = baseUrl + "pokemon/" + valor

    if (!shiny.checked) {
        fetch(link)
            .then((response) => response.json())
            .then((data) => {
                namepkm.textContent = data.name + " #" + data.id
                
                pkmimage.style.backgroundImage = `url('${data.sprites.other.home.front_default}')`
                statuspkn.innerHTML = ''
                for (var i in data.stats) {

                    statuspkn.innerHTML +=
                        `<li>
                ${data.stats[i].stat.name}: ${data.stats[i].base_stat}
                </li>`

                }

            })
            .catch(() => {
                console.log("Error")
                namepkm.textContent = "Não encontrado"
                pkmimage.style.backgroundImage = ''
                statuspkn.innerHTML = ''
            })
    } else {
        fetch(link)
            .then((response) => response.json())
            .then((data) => {
                
                
                namepkm.textContent = data.name + " #" + data.id
                pkmimage.style.backgroundImage = `url('${data.sprites.other.home.front_shiny}')`
            })
    }

}

function pkn_species(id) {

    link = baseUrl + "pokemon-species/" + id


    fetch(link)
        .then((response) => response.json())
        .then((data) => {
            species_name.innerHTML = ''

            for (var i in data.varieties) {

                species_name.innerHTML +=
                    `<button class="especies" type="button" style = "width:50%" value="${data.varieties[i].pokemon.name}">
                    ${data.varieties[i].pokemon.name}
                    </button>`

            }
            var variavelspecieis = document.getElementsByClassName("especies")

            for (var i in variavelspecieis) {

                console.log(variavelspecieis[i].attributes.value.value)
                
                    variavelspecieis[i].addEventListener('click', (e) => {

                        console.log(e.currentTarget.value)
                        buscar(e.currentTarget.value)

                    })
            }
        })

}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}