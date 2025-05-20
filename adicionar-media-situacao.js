const situacaoAluno = require("./situacao-aluno");
const somarMedia = require("./somar-media");

module.exports = function adicionarMediaSituacao(lista) {
  return lista.map((obj) => {
    const mediaAluno = somarMedia(obj.notas);
    const situacaoAprov = situacaoAluno(mediaAluno);

    return {
      ...obj,
      media: mediaAluno,
      situacao: situacaoAprov,
    };
  });
};
