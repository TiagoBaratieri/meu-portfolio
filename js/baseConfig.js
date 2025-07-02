// /js/baseConfig.js

document.addEventListener('DOMContentLoaded', function() {
    const baseUrlTag = document.getElementById('base-url');
    const repoName = '/meu-portfolio'; //repositório

    if (baseUrlTag) { // Garante que a tag <base> existe antes de tentar manipulá-la
        // Verifica se estamos no ambiente do GitHub Pages (pelo hostname)
        if (window.location.hostname.endsWith('github.io')) {
            // Define a base para incluir o nome do repositório
            baseUrlTag.href = repoName + '/'; 
        } else {
            // Para ambiente local (Live Server ou outro), mantém a base como raiz (/)
            baseUrlTag.href = '/'; 
        }
    } else {
        console.warn('A tag <base id="base-url"> não foi encontrada no HTML. Caminhos relativos podem não funcionar como esperado.');
    }
});