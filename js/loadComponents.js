// /js/loadComponents.js

// Função para carregar e injetar um componente (mantém-se a mesma)
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        // console.log(`Componente ${filePath} carregado com sucesso.`); 
    } catch (error) {
        console.error(`Could not load component from ${filePath}:`, error);
        throw error; // Propaga o erro para o .catch() do chamador
    }
}

// Lógica para inicializar o menu hambúrguer 
function initializeHamburgerMenu() {
    const burguerMenu = document.querySelector('.burguer_menu');
    const navLinks = document.querySelector('.nav-links');

    if (burguerMenu && navLinks) {
        burguerMenu.addEventListener('click', () => {
            burguerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link 
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (burguerMenu.classList.contains('active')) {
                    burguerMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
         console.log('Menu Hambúrguer inicializado.'); 
    } else {
        console.warn('Elementos do menu hambúrguer (burguer_menu ou nav-links) não encontrados. Verifique o HTML do cabeçalho.');
    }
}

// Quando o DOM estiver completamente carregado, carregue os componentes
document.addEventListener('DOMContentLoaded', () => {
   
    loadComponent('main-header', '/meu-portfolio/components/header.html')
        .then(() => {
            initializeHamburgerMenu(); // Inicializa o menu APÓS o header carregar
        })
        .catch(error => console.error("Error loading header:", error));

    loadComponent('main-footer', '/meu-portfolio/components/footer.html')
        .catch(error => console.error("Error loading footer:", error));
});
