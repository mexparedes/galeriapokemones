const { default: axios } = require("axios");

async function getUser() {
    const { data } = await axios.get('https://randomuser.me/api/')
    const user = data.results[0]
    return user;
}

async function getHolidays(){
    const { data } = await axios.get('https://www.feriadosapp.com/api/holidays.json')
    return data.data
}

Promise.all([getUser(),getHolidays()]).then((resultado) => {
    const user = resultado[0];
    const feriados = resultado[1];
    console.log(user);
    console.log(feriados);
})
//getHolidays().then((x) => console.log(x));
