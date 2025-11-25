// Função para enviar mensagem ao WhatsApp
function enviarWhatsApp(event) {
  event.preventDefault();

  // Capturar valores
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Validação
  if (!nome || !telefone || !mensagem) {
    alert("Por favor, preencha todos os campos!");
    return false;
  }

  // Número de WhatsApp
  const numero = "5588997136790";

  // Construir a mensagem
  let texto = "";
  texto += "Olá Kaka Pneus!%0A";
  texto += "Nome: " + encodeURIComponent(nome) + "%0A";
  texto += "Telefone: " + encodeURIComponent(telefone) + "%0A";
  texto += "Mensagem: " + encodeURIComponent(mensagem);

  // Primeira tentativa: WhatsApp App (melhor para celular)
  const urlApp = "whatsapp://send?phone=" + numero + "&text=" + texto;

  // Segunda tentativa: API WhatsApp (funciona melhor)
  const urlApi =
    "https://api.whatsapp.com/send?phone=" + numero + "&text=" + texto;

  // Terceira tentativa: WhatsApp Web (fallback)
  const urlWeb =
    "https://web.whatsapp.com/send?phone=" + numero + "&text=" + texto;

  console.log("URL App:", urlApp);
  console.log("URL API:", urlApi);

  // Tentar abrir o app primeiro
  const telaApp = window.open(urlApp, "_blank");

  setTimeout(() => {
    // Se não abriu o app, tenta a API
    if (!telaApp || telaApp.closed === undefined) {
      const telaApi = window.open(urlApi, "_blank");

      setTimeout(() => {
        // Se não abriu a API, tenta web
        if (!telaApi || telaApi.closed === undefined) {
          window.open(urlWeb, "_blank");
        }
      }, 500);
    }
  }, 500);

  // Limpar formulário
  setTimeout(() => {
    document.getElementById("formulario-whatsapp").reset();
  }, 1000);

  return false;
}
