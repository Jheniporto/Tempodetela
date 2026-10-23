
// Base de dados fornecida para a atividade
const dadosPesquisa = {
  mediaNacionalDiaria: 4,
  alertaSaude: 6,

  sugestoes: [
    {
      limite: 2,
      mensagem: "Parabéns! Seu uso está equilibrado. Você tem mais tempo livre para hobbies e descanso."
    },
    {
      limite: 5,
      mensagem: "Atenção! Você está próximo da média nacional e já dedica bastante tempo às telas."
    },
    {
      limite: 24,
      mensagem: "Cuidado! Seu uso é elevado e pode afetar seu sono, foco e bem-estar. Que tal experimentar um detox digital?"
    }
  ]
};

// Captura os elementos do HTML
const formulario = document.getElementById("formulario");
const campoHoras = document.getElementById("horas");
const resultado = document.getElementById("resultado");

const tituloResultado = document.getElementById("tituloResultado");
const mensagemResultado = document.getElementById("mensagemResultado");
const semanal = document.getElementById("semanal");
const mensal = document.getElementById("mensal");
const reflexaoResultado = document.getElementById("reflexaoResultado");
const novoCalculo = document.getElementById("novoCalculo");

// Executa a análise quando o formulário é enviado
formulario.addEventListener("submit", function(event) {
  // Impede o recarregamento da página
  event.preventDefault();

  // Lê o valor digitado
  const horasDiarias = Number(campoHoras.value);

  // Valida o número informado
  if (
    campoHoras.value.trim() === "" ||
    !Number.isFinite(horasDiarias) ||
    horasDiarias < 0 ||
    horasDiarias > 24
  ) {
    alert("Digite um número entre 0 e 24 horas.");
    campoHoras.focus();
    return;
  }

  // Calcula o tempo semanal e mensal
  const horasSemanais = horasDiarias * 7;
  const horasMensais = horasDiarias * 30;

  // Seleciona uma mensagem de acordo com o tempo diário
  let sugestao;

  if (horasDiarias <= dadosPesquisa.sugestoes[0].limite) {
    sugestao = dadosPesquisa.sugestoes[0].mensagem;
  } else if (horasDiarias <= dadosPesquisa.sugestoes[1].limite) {
    sugestao = dadosPesquisa.sugestoes[1].mensagem;
  } else {
    sugestao = dadosPesquisa.sugestoes[2].mensagem;
  }

  // Compara com a média diária da pesquisa
  let comparacao;

  if (horasDiarias < dadosPesquisa.mediaNacionalDiaria) {
    comparacao = "Seu tempo está abaixo da média de referência de "
      + dadosPesquisa.mediaNacionalDiaria + " horas por dia.";
  } else if (horasDiarias === dadosPesquisa.mediaNacionalDiaria) {
    comparacao = "Seu tempo corresponde à média de referência de "
      + dadosPesquisa.mediaNacionalDiaria + " horas por dia.";
  } else {
    comparacao = "Você passa mais tempo nas redes do que a média de referência de "
      + dadosPesquisa.mediaNacionalDiaria + " horas por dia.";
  }

  // Avalia o limite de alerta configurado na base de dados
  let reflexao;

  if (horasDiarias >= dadosPesquisa.alertaSaude) {
    reflexao = "Seu tempo diário atingiu ou ultrapassou o limite de alerta configurado para esta atividade. Reflita sobre seus hábitos e procure equilibrar o tempo de tela com descanso, sono e outras atividades.";
  } else {
    reflexao = "Seu tempo está abaixo do limite de alerta configurado nesta atividade. Ainda assim, vale observar se o uso das telas interfere no seu sono, nos estudos ou nas relações pessoais.";
  }

  // Exibe os resultados na página
  tituloResultado.innerText = "Sua análise personalizada";
  mensagemResultado.innerText =
    "Você passa " + formatarHoras(horasSemanais)
    + " horas por semana e " + formatarHoras(horasMensais)
    + " horas em 30 dias nas redes sociais. " + comparacao;

  semanal.innerText = formatarHoras(horasSemanais) + " h";
  mensal.innerText = formatarHoras(horasMensais) + " h";

  reflexaoResultado.innerText = sugestao + " " + reflexao;

  // Mostra a área de resultado e leva o usuário até ela
  resultado.hidden = false;
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Formata números, inclusive os que possuem casas decimais
function formatarHoras(valor) {
  return Number(valor.toFixed(2)).toLocaleString("pt-BR");
}

// Permite fazer um novo cálculo
novoCalculo.addEventListener("click", function() {
  formulario.reset();
  resultado.hidden = true;
  campoHoras.focus();
  formulario.scrollIntoView({ behavior: "smooth", block: "center" });
});

