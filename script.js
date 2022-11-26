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
  });
  var hoje = new Date(dados[dados.length - 1].createdAt);

  console.log("hoje");

  console.log(hoje);
  console.log("--------------");
  var tempOntem = [];

  for (let i in dados) {
    let data = new Date(dados[i].createdAt);

    if (data.getDay() === hoje.getDay() - 1) {
      tempOntem.push(dados[i].temperatura);
      console.log("--------------");
    }
    console.log(tempOntem);
  }
}
getLeituras("http://localhost:3000/dados");
