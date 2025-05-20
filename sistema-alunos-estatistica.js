const { join } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const adicionarAluno = require("./adicionar-aluno-nota");
const somarMedia = require("./somar-media");
const adicionarMediaSituacao = require("./adicionar-media-situacao");
const quantidadeSituacao = require("./quantidade-situacao");
function perguntarUsuario(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

let listaAlunos = [];

let fechar = false;

async function main() {
  console.log("Sistema de Gerenciamento de Notas de Alunos\n\n");

  while (!fechar) {
    const nomeAluno = await perguntarUsuario("Digite o nome do aluno: ");
    const nota1 = await perguntarUsuario("Nota 1: ");
    const nota2 = await perguntarUsuario("Nota 2: ");
    const nota3 = await perguntarUsuario("Nota 3: ");

    if (nota1 > 10 || nota2 > 10 || nota3 > 10) {
      console.log("\nValor acima de '10', favor digitar outro valor!\n");
      continue;
    } else {
      console.log("\nAluno cadastrado com sucesso!\n");
    }

    adicionarAluno(listaAlunos, nomeAluno, nota1, nota2, nota3);

    const cadastrarNovoAluno = await perguntarUsuario(
      "Deseja cadastrar outro aluno? (s / n) "
    );

    if (cadastrarNovoAluno == "n") {
      fechar = true;
      rl.close();
    }
  }

  console.log("\n====== Boletim Final ======");

  listaAlunos = adicionarMediaSituacao(listaAlunos);

  console.log(listaAlunos);

  const listaMedias = listaAlunos.map((aluno) => {
    return aluno.media;
  });
  const mediaGeralTurma = somarMedia(listaMedias);

  const maiorMedia = Math.max(...listaMedias);
  const menorMedia = Math.min(...listaMedias);

  const totalAlunos = listaAlunos.length;

  const quantidadeAprov = quantidadeSituacao(listaAlunos, "Aprovado");
  const quantidadeRec = quantidadeSituacao(listaAlunos, "Recuperação");
  const quantidadeRep = quantidadeSituacao(listaAlunos, "Reprovado");

  console.log(`
===== Estatísticas da Turma =====
Média Geral da Turma: ${mediaGeralTurma}
Maior média: ${maiorMedia}
Menor média: ${menorMedia}
Total de aluno: ${totalAlunos}
Aprovados: ${quantidadeAprov}
Em Recuperação: ${quantidadeRec}
Reprovados: ${quantidadeRep}`);
}

main();
