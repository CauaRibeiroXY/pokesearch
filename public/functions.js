const baseUrl = "https://pokeapi.co/api/v2/"
const input = document.getElementById('name')
const namepkm = document.getElementById('namepkm')
const shiny = document.getElementById('shiny')
const statuspkn = document.getElementById('statuspkn')
const pkmimage = document.getElementById('pkmimage')
const button = document.getElementById('buscar')


button.addEventListener('click', () => {
    valor = input.value
    valor=valor.toLowerCase()
    buscar(valor)

})

const random = document.getElementById('random')
random.addEventListener('click', () => {

    buscar(getRandomInt(1, 898))
    
})

function buscar(valor) {
    
    if (valor > 898)
        valor = 898

    if (valor < 1)
        valor = 1


    link = baseUrl + "pokemon/" + valor
    
    if (!shiny.checked){
        fetch(link)
            .then((response) => response.json())
            .then((data) => {
                namepkm.textContent = data.name +" #" + data.id
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
        }else{
        fetch(link)
        .then((response) => response.json())
        .then((data) => {
            namepkm.textContent = data.name +" #" + data.id
            pkmimage.style.backgroundImage = `url('${data.sprites.other.home.front_shiny}')`
        })
        }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}