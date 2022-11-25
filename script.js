async function getDados(url) {
  let dados = await fetch(url);
  return dados.json();
}

async function imprimirDados(url) {
  const d = await getDados(url);
  console.log(d[0].temperatura);
}

document.querySelector("#info").addEventListener("click", async () => {
  await imprimirDados("http://localhost:3000/dados");
});
