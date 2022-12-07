// variaveis
// hoje
const divTemp = document.querySelector("#temp");
const divHumidade = document.querySelector("#humidade");
const divVento = document.querySelector("#vento");
const divHoje = document.querySelector("#semanaHoje");
const divChuva = document.querySelector("#chuva");
const divLumi = document.querySelector("#luminosidade");
const divPressao = document.querySelector("#pressao");
// ontem
// const divTempOntemMin = document.querySelector("#tempOntemMin");
// const divTempOntemMax = document.querySelector("#TempOntemMax");
// const divChuvaOntem = document.querySelector("#chuvaOntem");
// const divOntem = document.querySelector("#semanaOntem");

// // anteontem - AO
// const divTempAOMin = document.querySelector("#minAntesOntem");
// const divTempAOMax = document.querySelector("#maxAntesOntem");
// const divChuvaAO = document.querySelector("#chuvaAntes");
// // ante anteontem - AAO
// const divTempAAOMin = document.querySelector("#mixAntesx2");
// const divTempAAOMax = document.querySelector("#maxAntesx2");
// const divChuvaAAO = document.querySelector("#chuvaAntesx2");
// variaveis globais
let hoje;
let hojeDia;
let ontem;
let ontemDia;
// anteontem - AO
let AO;
let AODia;
// ante anteontem - AAO
let AAO;
let AAODia;

// temperaturas
let tempOntem = [];
let temp2dias = [];
let Temp3dias = [];
// dias semana
Semana = new Array(
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
);

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
    // for (let i in dados) {
    //   let data = new Date(dados[i].createdAt);

    //   // possivel geito de pagar a data completa para ser o ID do grafico
    //   // let idGrafico =
    //   //   data.getDate() + " " + data.getMonth() + " " + data.getFullYear();
    //   // console.log(idGrafico);

    //   if (data.getDate() === hoje - 1) {
    //     tempOntem.push(dados[i].temperatura);
    //     ontem = dados[i];
    //     tempOntem = minMax(tempOntem);
    //   }

    //   if (data.getDate() === hoje - 2) {
    //     temp2dias.push(dados[i].temperatura);
    //     AO = dados[i];
    //     temp2dias = minMax(temp2dias);
    //   }

    //   if (data.getDate() === hoje - 3) {
    //     Temp3dias.push(dados[i].temperatura);
    //     AAO = dados[i];
    //     temp3dias = minMax(Temp3dias);
    //   }
    // }

    // hoje
    if (element === atualizacao) {
      // dados
      const temp = parseInt(atualizacao.temperatura);
      const humidade = atualizacao.umidade;
      const vento = atualizacao.vento;
      const chuva = atualizacao.chuva;
      const lumi = atualizacao.luminosidade;
      const pressao = atualizacao.pressao;
      let dia = new Date(atualizacao.createdAt);
      dia = Semana[dia.getDay()];
      // criação do texto para o html
      const tempAdd = document.createTextNode(temp);
      const humiAdd = document.createTextNode(humidade + "%");
      const ventoAdd = document.createTextNode(vento + "km/h");
      const diaAdd = document.createTextNode(dia);
      const chuvaAdd = document.createTextNode(chuva + "mm");
      const lumiAdd = document.createTextNode(lumi + "%");
      const pressaoAdd = document.createTextNode(pressao + " P");

      // icons
      const iconhumidade = document.querySelector("#humiIcon");
      const iconVento = document.querySelector("#ventoIcon");
      const iconChuva = document.querySelector("#chuvaIcon");

      // insert dos dados no html
      divTemp.append(tempAdd, "°");
      divHumidade.insertBefore(humiAdd, iconhumidade);
      divVento.insertBefore(ventoAdd, iconVento);
      divChuva.insertBefore(chuvaAdd, iconChuva);
      divLumi.append(lumiAdd);
      divPressao.append(pressaoAdd);
      divHoje.append(diaAdd);
    }

    // ontem
    // if (element === ontem) {
    //   const tempMin = parseInt(tempOntem[0]);
    //   const tempMax = parseInt(tempOntem[1]);
    //   const chuva = ontem.chuva;
    //   let dia = new Date(ontem.createdAt);
    //   dia = Semana[dia.getDay()];
    //   // criação do texto para o html
    //   const tempAddMin = document.createTextNode(tempMin);
    //   const tempAddMax = document.createTextNode(tempMax);
    //   const chuvaAdd = document.createTextNode(chuva);
    //   const diaAdd = document.createTextNode(dia);
    //   // insert dos dados no html
    //   divTempOntemMin.append(tempAddMin, "°");
    //   divTempOntemMax.append(tempAddMax, "°");
    //   divChuvaOntem.append(chuvaAdd, "mm");
    //   divOntem.append(dia);
    // }
    // 2 dias antes
    // if (element === AO) {
    //   const tempMin = parseInt(temp2dias[0]);
    //   const tempMax = parseInt(temp2dias[1]);
    //   const chuva = AO.chuva;
    //   // criação do texto para o html
    //   const tempAddMin = document.createTextNode(tempMin);
    //   const tempAddMax = document.createTextNode(tempMax);
    //   const chuvaAdd = document.createTextNode(chuva);
    //   // insert dos dados no html
    //   divTempAOMin.append(tempAddMin, "°");
    //   divTempAOMax.append(tempAddMax, "°");
    //   divChuvaAO.append(chuvaAdd, "mm");
    // }

    // 3 dias antes
    // if (element === AAO) {
    //   const tempMin = parseInt(temp3dias[0]);
    //   const tempMax = parseInt(temp3dias[1]);
    //   const chuva = AAO.chuva;
    //   console.log(chuva);
    //   // criação do texto para o html
    //   const tempAddMin = document.createTextNode(tempMin);
    //   const tempAddMax = document.createTextNode(tempMax);
    //   const chuvaAdd = document.createTextNode(chuva);
    //   // insert dos dados no html
    //   divTempAAOMin.append(tempAddMin, "°");
    //   divTempAAOMax.append(tempAddMax, "°");
    //   divChuvaAAO.append(chuvaAdd, "mm");
    // }
  });
}
insertHTML("http://localhost:3000/dados");
