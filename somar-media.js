module.exports = function somarMedia(lista) {
  const somarNotas = lista.reduce((acc, notaStr) => acc + Number(notaStr), 0);
  const media = somarNotas / lista.length;
  const mediaArredondada = media.toFixed(2);
  const toNumber = Number(mediaArredondada);

  return toNumber;
};
