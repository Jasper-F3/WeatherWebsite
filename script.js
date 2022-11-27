// variaveis
// hoje
const divTemp = document.querySelector("#temp");
const divHumidade = document.querySelector("#humidade");
const divVento = document.querySelector("#vento");
// ontem
const divTempOntemMin = document.querySelector("#tempOntemMin");
const divTempOntemMax = document.querySelector("#TempOntemMax");
const divChuvaOntem = document.querySelector("#chuvaOntem");
// variaveis globais
var hoje = 0;
var tempOntem = [];
var TemperaturasFinaisOntem;

async function getDados(url) {
  let dados = await fetch(url);
  return dados.json();
}
function minMax(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  return [min, max];
}

async function insertHTML(url) {
  const dados = await getDados(url);
  const atualizacao = dados[dados.length - 1];

  dados.forEach((element) => {
    //  tratamento datas
    hoje = new Date(dados[dados.length - 1].createdAt).getDate();
    for (let i in dados) {
      let data = new Date(dados[i].createdAt);
      if (data.getDate() === hoje - 1) {
        tempOntem.push(dados[i].temperatura);
        var ontem = dados[i];
      }
    }
    TemperaturasFinaisOntem = minMax(tempOntem);

    if (element === atualizacao) {
      // dados
      const temp = parseInt(atualizacao.temperatura);
      const humidade = atualizacao.umidade;
      const vento = atualizacao.vento;
      // criação do texto para o html
      const tempAdd = document.createTextNode(temp);
      const humiAdd = document.createTextNode(humidade);
      const ventoAdd = document.createTextNode(vento);
      // insert dos dados no html
      divTemp.append(tempAdd, "°");
      divHumidade.append(humiAdd, "%");
      divVento.append(ventoAdd, "km/h");
    }
    if (element === ontem) {
      const tempMin = parseInt(TemperaturasFinaisOntem[0]);
      const tempMax = parseInt(TemperaturasFinaisOntem[1]);
      const chuva = ontem.chuva;
      console.log(chuva);
      // criação do texto para o html
      const tempAddMin = document.createTextNode(tempMin);
      const tempAddMax = document.createTextNode(tempMax);
      const chuvaAdd = document.createTextNode(chuva);
      // insert dos dados no html
      divTempOntemMin.append(tempAddMin, "°");
      divTempOntemMax.append(tempAddMax, "°");
      divChuvaOntem.append(chuvaAdd, "mm");
    }
  });

  console.log(TemperaturasFinaisOntem);
}
insertHTML("http://localhost:3000/dados");
