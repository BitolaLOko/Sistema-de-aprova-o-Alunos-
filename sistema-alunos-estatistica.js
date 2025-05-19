const { join } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntarUsuario(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => {
      resolve(resposta);
    });
  });
}

function adicionarAluno(lista, nome, not1, not2, not3) {
  const objeto = {
    nome: nome,
    notas: [Number(not1), Number(not2), Number(not3)],
  };

  lista.push(objeto);
}

function somarMedia(lista) {
  const somarNotas = lista.reduce((acc, notaStr) => acc + Number(notaStr), 0);
  const media = somarNotas / lista.length;
  const mediaArredondada = media.toFixed(2);
  const toNumber = Number(mediaArredondada);

  return toNumber;
}

function addMedia(lista, result, situacao) {
  const addIndex = lista.map((obj, index) => ({
    ...obj,
    media: (index = result),
    situacao: (index = situacao),
  }));

  console.log(addIndex);
}

function situacaoAluno(situacao) {
  if (situacao >= 7) {
    return "Aprovado";
  }
  if (situacao >= 5 && situacao < 7) {
    return "Recuperação";
  }
  if (situacao < 5) {
    return "Reprovado";
  }
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
      console.log("\nAluno cadastrado com sucesso!?\n");
    }

    adicionarAluno(listaAlunos, nomeAluno, nota1, nota2, nota3);
    console.log(listaAlunos);

    const cadastrarNovoAluno = await perguntarUsuario(
      "Deseja cadastrar outro aluno? (s / n) "
    );

    if (cadastrarNovoAluno == "n") {
      console.log("===== Boletim Final =====");

      const media = somarMedia([nota1, nota2, nota3]);
      const situacao = situacaoAluno(media);

      addMedia(listaAlunos, media, situacao);

      rl.close();
      return;
    }
  }
}

main();
