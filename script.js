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
  let datas = [];
  var hoje = new Date(dados[dados.length - 1].createdAt);

  console.log("hoje");

  console.log(hoje);
  console.log("--------------");
  for (let i in dados) {
    datas.push(dados[i].createdAt);
  }
  for (let i in datas) {
    let data = new Date(datas[i]);
    if (data.getDay() < hoje.getDay()) {
      console.log(data);
    }
  }
}
getLeituras("http://localhost:3000/dados");
