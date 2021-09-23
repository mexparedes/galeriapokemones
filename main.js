const http = require('http')
const axios = require('axios')
let datosProcesados = [];


let pokemonesPromesas = []
async function pokemonesGet() {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
    return data.results
}
async function getFullData(name) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return data
}
pokemonesGet().then((results) => {
    //console.log(results)
    results.forEach((p) => {
        let pokemonName = p.name
        pokemonesPromesas.push(getFullData(pokemonName))
    })
    Promise.all(pokemonesPromesas).then((data) => {
        data.forEach((p) => {
            datosProcesados.push({ name: p.name, url: p.sprites.front_default })
        })

        http
            .createServer(function (req, res) {
            const url = req.url
            if (url == '/pokemones') {
                res.writeHead(200, { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' }); //,'Access-Control-Allow-Origin': '*' 
                let yeison = JSON.stringify(datosProcesados);
                res.end(yeison);
            }
        })
        .listen(4000, () => console.log('Escuchando el puerto 3000'))

    })
    
})

