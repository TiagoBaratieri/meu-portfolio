document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitButton = document.getElementById("submitButton");
  const formStatus = document.getElementById("formStatus");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  console.log("nameError (span):", nameError);
  console.log("emailError (span):", emailError);
  console.log("messageError (span):", messageError); // Função para exibir erro em um campo específico

  function showError(element, message, errorSpan) {
    console.log(`Tentando mostrar erro para ${element.id}: "${message}"`); // ADICIONE
    if (errorSpan) {
      errorSpan.textContent = message;
      element.classList.add("is-invalid");
      console.log(
        `Erro mostrado para ${element.id}. Texto: ${errorSpan.textContent}`
      ); // ADICIONE
    } else {
      console.error(
        `ERRO CRÍTICO: Span de erro para ${element.id} não encontrado!`
      ); // ADICIONE
    }
  }



  // Função para limpar erro de um campo específico
  function clearError(element, errorSpan) {
    errorSpan.textContent = "";
    element.classList.remove("is-invalid");
  }

  // Função para exibir status do formulário
  function setFormStatus(message, isSuccess = true) {
    formStatus.textContent = message;
    formStatus.className = isSuccess ? "success" : "error";
  }

  // Validação principal do formulário ao tentar enviar
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    console.log('Formulário submetido. Iniciando validação...');
    let formIsValid = true; // Flag para controlar a validade geral do formulário

    // Limpa todos os erros anteriores e status antes de revalidar
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);
    setFormStatus(""); // Limpa a mensagem de status anterior

    // Validar Nome
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Por favor, digite seu nome.", nameError);
      formIsValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showError(
        nameInput,
        "O nome deve ter pelo menos 2 caracteres.",
        nameError
      );
      formIsValid = false;
    }

    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Por favor, digite seu e-mail.", emailError);
      formIsValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Por favor, insira um e-mail válido.", emailError);
      formIsValid = false;
    }

    // Validar Mensagem
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Por favor, digite sua mensagem.", messageError);
      formIsValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(
        messageInput,
        "A mensagem deve ter pelo menos 10 caracteres.",
        messageError
      );
      formIsValid = false;
    }

    // Se o formulário for válido, simule o envio
    if (formIsValid) {
      submitButton.disabled = true; // Desabilita o botão
      setFormStatus("Enviando mensagem...", true);

      // Simula um atraso de 2 segundos (como se estivesse enviando para um servidor)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simula sucesso
      setFormStatus("Mensagem enviada com sucesso!", true);
      contactForm.reset(); // Limpa os campos
    }

    submitButton.disabled = false; // Habilita o botão novamente, independentemente do sucesso ou falha na validação
  });

  //Validação em tempo real (ao sair do campo)

  nameInput.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      showError(this, "Por favor, digite seu nome.", nameError);
    } else if (this.value.trim().length < 2) {
      showError(this, "O nome deve ter pelo menos 2 caracteres.", nameError);
    } else {
      clearError(this, nameError);
    }
  });

  emailInput.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() === "") {
      showError(this, "Por favor, digite seu e-mail.", emailError);
    } else if (!emailRegex.test(this.value.trim())) {
      showError(this, "Por favor, insira um e-mail válido.", emailError);
    } else {
      clearError(this, emailError);
    }
  });

  messageInput.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      showError(this, "Por favor, digite sua mensagem.", messageError);
    } else if (this.value.trim().length < 10) {
      showError(
        this,
        "A mensagem deve ter pelo menos 10 caracteres.",
        messageError
      );
    } else {
      clearError(this, messageError);
    }
  });

  // Limpar erro ao digitar (para feedback mais rápido)
  nameInput.addEventListener("input", function () {
    clearError(this, nameError);
  });
  emailInput.addEventListener("input", function () {
    clearError(this, emailError);
  });
  messageInput.addEventListener("input", function () {
    clearError(this, messageError);
  });
});
