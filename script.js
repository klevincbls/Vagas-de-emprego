
// ========================================
// KLEVINIMPORTS - CONFIGURAÇÃO
// ========================================

// Cole a URL do Google Apps Script terminada em /exec.
const URL_PLANILHA = "https://script.google.com/macros/s/AKfycby3F7QTYaIAJFhjuWQYJgeaRv1kBAFLQdrsnPDx3oK5qJopbx-7byCe3kD334Gn5W7DpA/exec";

// Elementos do formulário.
const form = document.getElementById("formulario");
const aviso = document.getElementById("aviso");
const botao = form.querySelector('button[type="submit"]');


// ========================================
// ENVIO DA CANDIDATURA
// ========================================

form.addEventListener("submit", function (evento) {

  // Impede que a página seja recarregada.
  evento.preventDefault();

  // Confere se a URL foi configurada.
  if (
    !URL_PLANILHA.startsWith("https://script.google.com/") ||
    URL_PLANILHA === ""
  ) {
    aviso.className = "error";
    aviso.textContent =
      "Configure a URL do Google Apps Script no arquivo script.js antes de enviar.";
    return;
  }

  // Exibe o estado de envio.
  aviso.className = "";
  aviso.textContent = "Enviando candidatura...";
  botao.disabled = true;

  // Envia os campos do formulário para o Google.
  fetch(URL_PLANILHA, {
    method: "POST",
    mode: "no-cors",
    body: new FormData(form)
  })

    // Executado quando a requisição é concluída.
    .then(function () {
      aviso.className = "success";
      aviso.textContent =
        "Solicitação enviada. Confira a planilha para confirmar o registro.";

      // Limpa os campos após o envio.
      form.reset();
    })

    // Trata falhas de rede detectadas pelo navegador.
    .catch(function () {
      aviso.className = "error";
      aviso.textContent =
        "Não foi possível enviar. Verifique sua conexão e a URL do Apps Script.";
    })

    // Reativa o botão ao terminar.
    .finally(function () {
      botao.disabled = false;
    });

});
