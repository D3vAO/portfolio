// art-gallery.js

// 1. Banco de dados modular e opcional das suas artes
const artworks = [
    {
        title: "Freak Hunter - SplashScreen",
        description: "Estudo inicial do protagonista para o projeto Freak Hunter. Focado na silhueta e paleta de cores reduzida para estilo pixel art.",
        thumb: "images/art/freak-hunter/mainmenu.gif",
        images: [
            { url: "images/art/freak-hunter/mainmenu.gif", caption: "Versão final" },
            { url: "images/art/freak-hunter/splashscreen-concept.webp", caption: "Menu principal animado em pixel art." },
        ],
        featured: true // ESTE ITEM SERÁ GRANDE (Exemplo de destaque)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/freak-hunter/boo.gif",
        images: [
            { url: "images/art/freak-hunter/boo.gif", caption: "Versão final" },
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/freak-hunter/junkyard.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/freak-hunter/roof-garden.png",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/freak-hunter/concept-cover.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/freak-hunter/concept-scene.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/freak-hunter/old_splashscreen.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/cyber-thumb.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/cyber-thumb.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/cyber-thumb.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Freak Hunter - SplashScreen",
        description: "Estudo inicial do protagonista para o projeto Freak Hunter. Focado na silhueta e paleta de cores reduzida para estilo pixel art.",
        thumb: "images/art/prototypes/topdown-scene.jpg",
        images: [
            { url: "images/art/freak-hunter/mainmenu.gif", caption: "Versão final" },
            { url: "images/art/freak-hunter/splashscreen-concept.webp", caption: "Menu principal animado em pixel art." },
            { url: "images/art/freak-hunter/mainmenu.gif", caption: "Menu principal animado em pixel art." },
        ],
        featured: true // ESTE ITEM SERÁ GRANDE (Exemplo de destaque)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/cyber-thumb.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/cyber-thumb.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    },
    {
        title: "Cyberpunk Environment",
        description: "Cenário 2D desenvolvido para uma cena de diálogo, utilizando camadas de parallax e iluminação neon dinâmica.",
        thumb: "images/art/cyber-thumb.jpg",
        images: [
            "images/art/cyber-full.jpg"
        ],
        featured: false // ESTE ITEM SERÁ PEQUENO (padrão)
    }
];

// 2. Variáveis globais para controle do carrossel e elementos
let currentArtImages = []; 
let currentImgIndex = 0;   

const galleryContainer = document.getElementById('artGallery');
const modal = document.getElementById('artModal'); // Variável essencial adicionada

// 3. Renderiza a galeria automática
if (galleryContainer) {
    artworks.forEach((art, index) => {
        const item = document.createElement('div');
        
        // Aplica a classe .featured se o item for destaque
        item.className = art.featured ? 'art-item featured' : 'art-item';
        
        const tag = art.featured ? '<span class="featured-tag">FEATURED</span>' : '';
        
        item.innerHTML = `
            ${tag}
            <img src="${art.thumb}" alt="${art.title}" loading="lazy">
        `;
        
        item.onclick = () => openModal(index);
        galleryContainer.appendChild(item);
    });
}

// 4. Funções do Modal e Carrossel
function openModal(index) {
    if (!modal) return;
    
    const art = artworks[index];
    currentArtImages = art.images; 
    currentImgIndex = 0;            
    
    updateModalImage();
    document.getElementById('modalTitle').innerText = art.title;
    document.getElementById('modalDesc').innerText = art.description;
    
    const prevBtn = document.getElementById('prevArtImg');
    const nextBtn = document.getElementById('nextArtImg');
    
    // Mostra botões de navegação apenas se houver mais de uma imagem
    if (currentArtImages.length > 1) {
        if (prevBtn) prevBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Trava o scroll do site ao abrir
}

function updateModalImage() {
    const modalImg = document.getElementById('modalImg');
    const captionElem = document.getElementById('imageCaption');
    
    if (modalImg && currentArtImages.length > 0) {
        // Acessa a URL e a Legenda do objeto atual
        const currentData = currentArtImages[currentImgIndex];
        
        modalImg.src = currentData.url;
        captionElem.innerText = currentData.caption;
        
        // Reinicia a animação de fade
        modalImg.style.animation = 'none';
        captionElem.style.animation = 'none';
        modalImg.offsetHeight; 
        
        modalImg.style.animation = 'fadeIn 0.3s ease';
        captionElem.style.animation = 'fadeIn 0.3s ease';
    }
}

function changeArtImage(direction) {
    currentImgIndex += direction;
    
    // Loop infinito
    if (currentImgIndex < 0) {
        currentImgIndex = currentArtImages.length - 1;
    } else if (currentImgIndex >= currentArtImages.length) {
        currentImgIndex = 0;
    }
    
    updateModalImage();
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Libera o scroll
    }
}

// 5. Interações Adicionais (Fechar e Teclado)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};

// Suporte para setas do teclado e tecla Esc
document.addEventListener('keydown', (e) => {
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') changeArtImage(-1);
        if (e.key === 'ArrowRight') changeArtImage(1);
        if (e.key === 'Escape') closeModal();
    }
});