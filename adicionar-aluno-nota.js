module.exports = function adicionarAluno(lista, nome, not1, not2, not3) {
  const objeto = {
    nome: nome,
    notas: [Number(not1), Number(not2), Number(not3)],
  };

  lista.push(objeto);
};
