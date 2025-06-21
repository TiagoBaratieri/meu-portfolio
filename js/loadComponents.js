// js/loadComponents.js

// Função para carregar um componente HTML de forma assíncrona
async function loadComponent(id, url) {
    const element = document.getElementById(id);
    if (element) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // Lança um erro se a resposta não for OK (ex: 404 Not Found)
                throw new Error(`HTTP error! status: ${response.status} for ${url}`);
            }
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error(`Could not load component from ${url}:`, error);
        }
    }
}

// Inicializa o menu hambúrguer
function initializeHamburgerMenu() {
    const burguerMenu = document.querySelector('.burguer_menu');
    const navLinks = document.querySelector('.nav-links');

    if (burguerMenu && navLinks) {
        burguerMenu.addEventListener('click', () => {
            burguerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link (opcional)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (burguerMenu.classList.contains('active')) {
                    burguerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
}

// Quando o DOM estiver completamente carregado, carregue os componentes
document.addEventListener('DOMContentLoaded', () => {
    // Carregar header e footer. Os caminhos são absolutos a partir da raiz do servidor.
    // '/components/header.html' assume que 'components' está na raiz do seu projeto.
    loadComponent('main-header', '/components/header.html')
        .then(() => {
            // Inicializa o menu hambúrguer APÓS o header ser carregado
            initializeHamburgerMenu();
        })
        .catch(error => console.error("Error loading header:", error)); // Captura erros no carregamento do header

    loadComponent('main-footer', '/components/footer.html')
        .catch(error => console.error("Error loading footer:", error)); // Captura erros no carregamento do footer
});