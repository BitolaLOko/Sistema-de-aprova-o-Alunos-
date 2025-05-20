module.exports = function quantidadeSituacao(lista, situacao) {
  const quantidadeAprov = lista.filter(
    (aluno) => aluno.situacao === situacao
  ).length;
  return quantidadeAprov;
};
