import axios from 'axios';
import cheerio from 'cheerio';


const div = document.querySelector('.resultado');

let url = "https://www.tabelafipebrasil.com/placa/";

const fetchData = async(urll) => {
    const result = await axios.get(urll)
    return result.data
}

const main = async () => {
    const content = await fetchData(url);
    const $ = cheerio.load(content);
    let fipe = ($('.fipe-desktop tbody tr:eq(2) td:eq(2)').text());
    fipe = fipe.replace(/\D/g, "");
    const ano = ($('.fipeTablePriceDetail tbody tr:eq(2) td:eq(1)').text());

    return verifyPlate(ano + fipe);
};



function verifyPlate (str) {
    let ano = str.slice(0, 4);
    let fipe = str.slice(4);
    if (ano > 2015 && fipe > 60000) {
        aprovar(true);
    } else {aprovar(false)}
};

function aprovar(value) {
    if (value) {div.textContent = 'Seu seguro foi aprovado!'}
    else {div.textContent = 'que pena, seu seguro foi reprovado!'}
}

const input = document.querySelector('#input');

const regex = /^[A-Z]{3}\d{4}$/;

function verificaFormato(string) {
    return regex.test(string);
  };


function processarEventoTeclado(event) {
    const placa = input.value;
    if (verificaFormato(placa)) {
        if (event.key === 'Enter') {
            url = "https://www.tabelafipebrasil.com/placa/" + placa;
            main();
        }

    } else {
        div.textContent = 'Por favor, use o formato AAA9999';
    }
}

input.addEventListener("keydown", processarEventoTeclado);
document.querySelector('button').addEventListener("click", processarEventoTeclado);