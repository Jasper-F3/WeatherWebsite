// variaveis
// hoje
const divTemp = document.querySelector("#temp");
const divHumidade = document.querySelector("#humidade");
const divVento = document.querySelector("#vento");
// ontem
const divTempOntemMin = document.querySelector("#tempOntemMin");
const divTempOntemMax = document.querySelector("#TempOntemMax");
const divChuvaOntem = document.querySelector("#chuvaOntem");
// antes de ontem
const divTempAntesMin = document.querySelector("#minAntesOntem");
const divTempAntesMax = document.querySelector("#maxAntesOntem");
const divChuvaAntes = document.querySelector("#chuvaAntes");
// antes de ontem x2
const divTempAntesX2Min = document.querySelector("#mixAntesx2");
const divTempAntesX2Max = document.querySelector("#maxAntesx2");
const divChuvaAntesX2 = document.querySelector("#chuvaAntesx2");
// variaveis globais
let hoje;
let ontem;
let ontem_1;
let ontem_2;
// temperaturas
let tempOntem = [];
let TemperaturasFinaisOntem = [];
let temp2dias = [];
let Temp3dias = [];
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
        ontem = dados[i];
        TemperaturasFinaisOntem = minMax(tempOntem);
      }
      if (data.getDate() === hoje - 2) {
        temp2dias.push(dados[i].temperatura);
        ontem_1 = dados[i];
        temp2dias = minMax(temp2dias);
      }
      if (data.getDate() === hoje - 3) {
        Temp3dias.push(dados[i].temperatura);
        ontem_2 = dados[i];
        temp3dias = minMax(Temp3dias);
      }
    }

    // hoje
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
    // ontem
    if (element === ontem) {
      const tempMin = parseInt(TemperaturasFinaisOntem[0]);
      const tempMax = parseInt(TemperaturasFinaisOntem[1]);
      const chuva = ontem.chuva;
      // criação do texto para o html
      const tempAddMin = document.createTextNode(tempMin);
      const tempAddMax = document.createTextNode(tempMax);
      const chuvaAdd = document.createTextNode(chuva);
      // insert dos dados no html
      divTempOntemMin.append(tempAddMin, "°");
      divTempOntemMax.append(tempAddMax, "°");
      divChuvaOntem.append(chuvaAdd, "mm");
    }
    if (element === ontem_1) {
      const tempMin = parseInt(temp2dias[0]);
      const tempMax = parseInt(temp2dias[1]);
      const chuva = ontem_1.chuva;
      // criação do texto para o html
      const tempAddMin = document.createTextNode(tempMin);
      const tempAddMax = document.createTextNode(tempMax);
      const chuvaAdd = document.createTextNode(chuva);
      // insert dos dados no html
      divTempAntesMin.append(tempAddMin, "°");
      divTempAntesMax.append(tempAddMax, "°");
      divChuvaAntes.append(chuvaAdd, "mm");
    }
    if (element === ontem_2) {
      const tempMin = parseInt(temp3dias[0]);
      const tempMax = parseInt(temp3dias[1]);
      const chuva = ontem_2.chuva;
      // criação do texto para o html
      const tempAddMin = document.createTextNode(tempMin);
      const tempAddMax = document.createTextNode(tempMax);
      const chuvaAdd = document.createTextNode(chuva);
      // insert dos dados no html
      divTempAntesX2Min.append(tempAddMin, "°");
      divTempAntesX2Max.append(tempAddMax, "°");
      divChuvaAntesX2.append(chuvaAdd, "mm");
    }
  });
}
insertHTML("http://localhost:3000/dados");
