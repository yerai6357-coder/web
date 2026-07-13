/* =========================================================
   NEXUS SYSTEM - CORE JAVASCRIPT LOGIC
   Arquitectura Modular para Gestión de Estado y DOM
   ========================================================= */

// 1. SIMULACIÓN DE BASE DE DATOS (MOCK DATA)
// Esto representa la información que llegaría de tu backend (Appwrite/Supabase)
const database = {
    currentUser: {
        id: "usr_001",
        username: "admin_sys",
        name: "Admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        streaks: 45
    },
    posts: [
        {
            id: "post_101",
            author: { name: "Sarah Code", username: "sarah_dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
            timestamp: "Hace 2 min",
            content: "Acabo de desplegar mi primer clúster de Kubernetes en un servidor local. La arquitectura self-hosted es el futuro. 💻🚀",
            media: null,
            stats: { upvotes: 124, comments: 12, retweets: 5, likes: 300 },
            userInteractions: { upvoted: false, downvoted: false, liked: false }
        },
        {
            id: "post_102",
            author: { name: "Design Ninja", username: "ui_ux_ninja", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja" },
            timestamp: "Hace 15 min",
            content: "Explorando la nueva paleta de colores oscuros para la app. ¿Qué opinan de este contraste?",
            media: { type: "image", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },
            stats: { upvotes: 89, comments: 4, retweets: 1, likes: 450 },
            userInteractions: { upvoted: true, downvoted: false, liked: true }
        },
        {
            id: "post_103",
            author: { name: "Cyberpunk Tech", username: "cyber_tech", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyber" },
            timestamp: "Hace 1 hora",
            content: "Demostración de renderizado de partículas en WebGL. Va fluido a 60fps.",
            media: { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
            stats: { upvotes: 560, comments: 89, retweets: 120, likes: 1200 },
            userInteractions: { upvoted: false, downvoted: false, liked: false }
        }
    ],
    trending: [
        { category: "Tecnología", title: "#SelfHosted", posts: "12.5K posts" },
        { category: "Desarrollo", title: "JavaScript Módulo", posts: "8,340 posts" },
        { category: "Hardware", title: "Meta Quest 3", posts: "5,200 posts" }
    ]
};

// 2. SISTEMA DE GESTIÓN DE VISTAS (ENRUTADOR SPA)
class Router {
    constructor() {
        this.contentArea = document.getElementById('dynamic-content-area');
        this.currentView = 'feed-view';
    }

    navigate(viewName) {
        this.currentView = viewName;
        this.render();
        this.updateNavUI();
    }

    updateNavUI() {
        // Actualizar botones activos
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.dataset.target) {
                btn.classList.toggle('active', btn.dataset.target === this.currentView);
            }
        });
    }

    render() {
        this.contentArea.innerHTML = ''; // Limpiar DOM
        
        switch (this.currentView) {
            case 'feed-view':
                this.contentArea.appendChild(FeedRenderer.createFeed(database.posts));
                break;
            case 'reels-view':
                this.contentArea.appendChild(FeedRenderer.createReels());
                break;
            case 'communities-view':
                this.contentArea.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>Comunidades</h2><p>Construyendo ecosistemas tipo Reddit...</p></div>';
                break;
            case 'profile-view':
                this.contentArea.innerHTML = `<div style="padding: 20px; text-align: center;">
                    <img src="${database.currentUser.avatar}" style="width:100px; border-radius:50%">
                    <h2>${database.currentUser.name}</h2>
                    <p>@${database.currentUser.username}</p>
                    <div style="margin-top:20px; padding:10px; background:var(--bg-surface); border-radius:8px;">
                        🔥 Racha actual: ${database.currentUser.streaks} días
                    </div>
                </div>`;
                break;
            default:
                this.contentArea.innerHTML = '<div style="padding: 20px;">En desarrollo...</div>';
        }
    }
}

// 3. RENDERIZADOR DE COMPONENTES UI
const FeedRenderer = {
    createFeed(posts) {
        const fragment = document.createDocumentFragment();
        
        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post-card';
            
            // HTML dinámico para el post
            let mediaHTML = '';
            if (post.media) {
                if (post.media.type === 'image') {
                    mediaHTML = `<div class="post-media-container"><img src="${post.media.url}" alt="Post image" loading="lazy"></div>`;
                } else if (post.media.type === 'video') {
                    mediaHTML = `<div class="post-media-container"><video controls muted loop><source src="${post.media.url}" type="video/mp4"></video></div>`;
                }
            }

            // Clases dinámicas para interacciones
            const upClass = post.userInteractions.upvoted ? 'upvoted' : '';
            const downClass = post.userInteractions.downvoted ? 'downvoted' : '';
            const likeClass = post.userInteractions.liked ? 'liked' : '';
            const likeIcon = post.userInteractions.liked ? '❤️' : '🤍';

            article.innerHTML = `
                <div class="vote-column">
                    <button class="vote-btn up ${upClass}" onclick="Interactions.vote('${post.id}', 'up')">⇧</button>
                    <span class="vote-count" id="score-${post.id}">${post.stats.upvotes}</span>
                    <button class="vote-btn down ${downClass}" onclick="Interactions.vote('${post.id}', 'down')">⇩</button>
                </div>
                
                <div class="post-content">
                    <div class="post-header">
                        <img src="${post.author.avatar}" alt="Avatar" class="avatar" style="width:30px; height:30px; margin-right:8px;">
                        <span class="name">${post.author.name}</span>
                        <span class="username">@${post.author.username}</span>
                        <span class="dot">·</span>
                        <span class="time">${post.timestamp}</span>
                    </div>
                    
                    <div class="post-body">
                        ${post.content}
                    </div>
                    
                    ${mediaHTML}
                    
                    <div class="post-actions">
                        <button class="action-btn">💬 <span>${post.stats.comments}</span></button>
                        <button class="action-btn">🔁 <span>${post.stats.retweets}</span></button>
                        <button class="action-btn like-btn ${likeClass}" id="like-${post.id}" onclick="Interactions.toggleLike('${post.id}')">
                            <span class="icon">${likeIcon}</span> 
                            <span class="count">${post.stats.likes}</span>
                        </button>
                        <button class="action-btn">📤</button>
                    </div>
                </div>
            `;
            fragment.appendChild(article);
        });
        
        return fragment;
    },

    createReels() {
        const container = document.createElement('div');
        container.className = 'reels-container';
        
        // Simulación de Reels (TikTok UI)
        container.innerHTML = `
            <div class="reel-item">
                <video class="reel-video" autoplay loop muted playsinline>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                </video>
                <div class="reel-overlay">
                    <h3>@cyber_tech</h3>
                    <p>Demo de animación 3D 🚀 #tech #3d</p>
                </div>
            </div>
        `;
        return container;
    },

    renderTrending() {
        const list = document.getElementById('trending-list');
        list.innerHTML = '';
        database.trending.forEach(trend => {
            list.innerHTML += `
                <li class="trend-item">
                    <div class="category">${trend.category}</div>
                    <div class="title">${trend.title}</div>
                    <div class="posts">${trend.posts}</div>
                </li>
            `;
        });
    }
};

// 4. LÓGICA DE INTERACCIONES (Eventos del Usuario)
const Interactions = {
    vote(postId, direction) {
        // En un entorno real, aquí harías un FETCH/AXIOS a tu API backend.
        const post = database.posts.find(p => p.id === postId);
        if (!post) return;

        const scoreElement = document.getElementById(`score-${postId}`);
        const upBtn = scoreElement.parentElement.querySelector('.up');
        const downBtn = scoreElement.parentElement.querySelector('.down');

        if (direction === 'up') {
            if (post.userInteractions.upvoted) {
                // Quitar upvote
                post.stats.upvotes--;
                post.userInteractions.upvoted = false;
                upBtn.classList.remove('upvoted');
            } else {
                // Dar upvote
                post.stats.upvotes++;
                post.userInteractions.upvoted = true;
                upBtn.classList.add('upvoted');
                // Si tenía downvote, quitarlo
                if (post.userInteractions.downvoted) {
                    post.stats.upvotes++; // Recupera el punto perdido
                    post.userInteractions.downvoted = false;
                    downBtn.classList.remove('downvoted');
                }
            }
        } else {
            // Lógica inversa para downvote
             if (post.userInteractions.downvoted) {
                post.stats.upvotes++;
                post.userInteractions.downvoted = false;
                downBtn.classList.remove('downvoted');
            } else {
                post.stats.upvotes--;
                post.userInteractions.downvoted = true;
                downBtn.classList.add('downvoted');
                if (post.userInteractions.upvoted) {
                    post.stats.upvotes--;
                    post.userInteractions.upvoted = false;
                    upBtn.classList.remove('upvoted');
                }
            }
        }
        
        // Actualizar DOM
        scoreElement.innerText = post.stats.upvotes;
    },

    toggleLike(postId) {
        const post = database.posts.find(p => p.id === postId);
        if (!post) return;

        const btnElement = document.getElementById(`like-${postId}`);
        const iconElement = btnElement.querySelector('.icon');
        const countElement = btnElement.querySelector('.count');

        post.userInteractions.liked = !post.userInteractions.liked;
        
        if (post.userInteractions.liked) {
            post.stats.likes++;
            btnElement.classList.add('liked');
            iconElement.innerText = '❤️';
        } else {
            post.stats.likes--;
            btnElement.classList.remove('liked');
            iconElement.innerText = '🤍';
        }

        countElement.innerText = post.stats.likes;
        
        // Animación de pulso
        btnElement.style.transform = 'scale(1.2)';
        setTimeout(() => btnElement.style.transform = 'scale(1)', 200);
    }
};

// 5. INICIALIZACIÓN GLOBAL DE LA APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    // 5.1 Instanciar Enrutador
    const appRouter = new Router();
    
    // 5.2 Configurar Event Listeners de Navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.dataset.target;
            if (targetView) appRouter.navigate(targetView);
        });
    });

    // 5.3 Sistema de Modo Oscuro (Persistente con LocalStorage)
    const themeBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;
    
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
    rootEl.setAttribute('data-theme', savedTheme);
    themeBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌓';

    themeBtn.addEventListener('click', () => {
        const currentTheme = rootEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        rootEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('nexus-theme', newTheme);
        themeBtn.innerText = newTheme === 'dark' ? '☀️' : '🌓';
    });

    // 5.4 Gestión de Modales
    window.toggleModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.toggle('hidden');
    };

    document.querySelectorAll('.post-btn-main, .post-btn-mobile').forEach(btn => {
        btn.addEventListener('click', () => toggleModal('compose-modal'));
    });

    // 5.5 Renderizado Inicial
    FeedRenderer.renderTrending();
    appRouter.navigate('feed-view');
});