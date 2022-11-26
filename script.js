// variaveis
const divTemp = document.querySelector("#temp");
const divHumidade = document.querySelector("#humidade");
const divVento = document.querySelector("#vento");
var hoje = 0;
var tempOntem = [];

async function getDados(url) {
  let dados = await fetch(url);
  return dados.json();
}
function minMax(arr) {
  const min = _.min(arr);
  const max = _.max(arr);

  return [min, max];
}

async function insertHTML(url) {
  const dados = await getDados(url);
  const atualizacao = dados[dados.length - 1];

  dados.forEach((element) => {
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
  });
  //  tratamento datas
  hoje = new Date(dados[dados.length - 1].createdAt);
  for (let i in dados) {
    let data = new Date(dados[i].createdAt);

    if (data.getDay() === hoje.getDay() - 1) {
      tempOntem.push(dados[i].temperatura);
    }
  }
  let teste = minMax(tempOntem);
  console.log(teste);
}
insertHTML("http://localhost:3000/dados");
