module.exports = function situacaoAluno(situacao) {
  if (situacao >= 7) {
    return "Aprovado";
  }
  if (situacao >= 5 && situacao < 7) {
    return "Recuperação";
  }
  if (situacao < 5) {
    return "Reprovado";
  }
};
