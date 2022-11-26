async function getDados(url) {
  let dados = await fetch(url);
  return dados.json();
}

async function getLeituras(url) {
  const dados = await getDados(url);
  const divTemp = document.querySelector("#temp");
  const divHumidade = document.querySelector("#humidade");
  const divVento = document.querySelector("#vento");
  var hoje;
  dados.forEach((element) => {
    const day = dados[dados.length - 1];

    if (element === day) {
      // dados
      const temp = Math.ceil(day.temperatura);
      const humidade = day.umidade;
      const vento = day.vento;
      // criação do texto para o html
      const tempAdd = document.createTextNode(temp);
      const humiAdd = document.createTextNode(humidade);
      const ventoAdd = document.createTextNode(vento);
      // insert dos dados no html
      divTemp.append(tempAdd, "°");
      divHumidade.append(humiAdd, "%");
      divVento.append(ventoAdd, "km/h");
    }
    for (let data in day) {
      if (data === "createdAt") {
        var dataHoje = day[data];
      }
    }
    var arrayHoje = dataHoje.split("T");
    hoje = arrayHoje[0].split("-");
    hoje = parseInt(hoje[2]);
  });
  for (let dias in dados) {
    var dataDia = dados[dias].createdAt;
    var arrayDia = dataDia.split("T");
    dia = arrayDia[0].split("-");
    dia = parseInt(dia[2]);

    if (dia === hoje - 2) {
    }
  }
}
getLeituras("http://localhost:3000/dados");
