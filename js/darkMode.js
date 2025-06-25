// --- js/darkMode.js ---

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let toggleButton = null; // Inicialmente null

    console.log("darkMode.js carregado.");

    function applyTheme(theme) {
        console.log("applyTheme chamado com o tema:", theme);
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Lógica de carregamento inicial do tema (já funciona)
    const savedTheme = localStorage.getItem('theme');
    console.log("Tema salvo no localStorage na inicialização:", savedTheme);
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // --- MUDANÇA AQUI: Usar MutationObserver para esperar o botão ---
    const observer = new MutationObserver((mutationsList, observer) => {
        // Verifica se o botão já existe
        toggleButton = document.getElementById('darkModeToggle');
        if (toggleButton) {
            console.log("Botão darkModeToggle encontrado via MutationObserver.");
            // Adiciona o event listener APENAS UMA VEZ quando o botão é encontrado
            toggleButton.addEventListener('click', () => {
                console.log("Botão de toggle clicado!");
                if (body.classList.contains('dark-mode')) {
                    console.log("Atualmente em modo escuro, tentando mudar para CLARO.");
                    applyTheme('light');
                    localStorage.setItem('theme', 'light');
                    console.log("Tema após clique (localStorage):", localStorage.getItem('theme'));
                } else {
                    console.log("Atualmente em modo claro, tentando mudar para ESCURO.");
                    applyTheme('dark');
                    localStorage.setItem('theme', 'dark');
                    console.log("Tema após clique (localStorage):", localStorage.getItem('theme'));
                }
            });
            observer.disconnect(); // Para de observar o DOM assim que o botão é encontrado
        }
    });

    // Começa a observar mudanças no <body> (ou em um elemento pai conhecido que conterá o header)
    observer.observe(body, { childList: true, subtree: true });
});