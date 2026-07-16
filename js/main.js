console.log('Ayra Marketplace — carregado com sucesso!');

document.addEventListener('DOMContentLoaded', () => {
    const cta = document.querySelector('.cta');
    if (cta) {
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(cta.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
