document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o ícone do hambúrguer
  const burguerMenu = document.querySelector(".burguer_menu");
  // Seleciona a lista de links de navegação
  const navLinks = document.querySelector(".nav-links");

  // Verifica se os elementos existem na página para evitar erros
  if (burguerMenu && navLinks) {
    // Adiciona um 'click event listener' ao ícone do hambúrguer
    burguerMenu.addEventListener("click", () => {
      // Alterna a classe 'active' no ícone (para a animação de X)
      burguerMenu.classList.toggle("active");
      // Alterna a classe 'active' na lista de links (para mostrar/esconder o menu)
      navLinks.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        // Se o menu estiver aberto, fecha
        if (burguerMenu.classList.contains("active")) {
          burguerMenu.classList.remove("active");
          navLinks.classList.remove("active");
        }
      });
    });
  }
});


