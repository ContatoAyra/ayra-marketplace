const fs = require('fs');
const path = require('path');

const basePath = '/workspace/ayra-marketplace';
const folders = ['', 'css', 'js', 'images', 'pages'];

const files = {
  'index.html': `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ayra Marketplace — A melhor idade merece o melhor</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">Ayra</div>
            <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#services">Serviços</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="home" class="hero">
            <h1>A melhor idade merece o melhor</h1>
            <p>Bem-vindo ao Ayra Marketplace — o primeiro marketplace premium para a economia silver no Brasil.</p>
            <a href="#services" class="cta">Explorar Serviços</a>
        </section>
    </main>
    <script src="js/main.js"></script>
</body>
</html>`,
  'css/style.css': `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Georgia', serif; color: #2d3e2f; background: #faf8f5; }
.hero { min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; background: linear-gradient(135deg, #faf8f5 0%, #e8f0e4 100%); }
.hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #2d3e2f; }
.hero p { font-size: 1.2rem; max-width: 600px; margin-bottom: 2rem; color: #5a7a5e; }
.cta { display: inline-block; padding: 1rem 2rem; background: #2d3e2f; color: #fff; text-decoration: none; border-radius: 4px; font-size: 1.1rem; transition: background 0.3s; }
.cta:hover { background: #3d5e3f; }
nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 4rem; background: #fff; }
.logo { font-size: 1.8rem; font-weight: bold; color: #2d3e2f; }
nav ul { list-style: none; display: flex; gap: 2rem; }
nav a { text-decoration: none; color: #5a7a5e; font-size: 1rem; }
nav a:hover { color: #2d3e2f; }`,
  'js/main.js': `console.log('Ayra Marketplace — carregado com sucesso!');
document.addEventListener('DOMContentLoaded', () => {
    const cta = document.querySelector('.cta');
    if (cta) cta.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(cta.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
});`
};

folders.forEach(folder => {
    const fullPath = path.join(basePath, folder);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Pasta criada: ${fullPath}`);
    }
});

Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(basePath, filePath);
    fs.writeFileSync(fullPath, content);
    console.log(`Arquivo criado: ${fullPath}`);
});

console.log('\\n✅ Site Ayra Marketplace configurado com sucesso!');
