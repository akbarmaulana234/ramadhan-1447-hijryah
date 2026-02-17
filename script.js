import * as THREE from 'three';

// ========== 3D ISLAMIC SETUP ==========
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xfff5e6, 1);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

const backLight = new THREE.PointLight(0x446688, 0.5);
backLight.position.set(-2, 1, -3);
scene.add(backLight);

// ========== 3D OBJECTS ==========

// 1. Masjid
const masjidGroup = new THREE.Group();
const kubahGeo = new THREE.SphereGeometry(0.8, 24, 16);
const kubahMat = new THREE.MeshStandardMaterial({ 
    color: 0xffaa33, 
    emissive: 0x332200, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.7 
});
const kubah = new THREE.Mesh(kubahGeo, kubahMat);
kubah.position.y = 1.5;
kubah.scale.set(1, 0.6, 1);
masjidGroup.add(kubah);

const menaraGeo = new THREE.CylinderGeometry(0.2, 0.25, 2, 6);
const menaraMat = new THREE.MeshStandardMaterial({ color: 0xccaa88, wireframe: true });
const menara1 = new THREE.Mesh(menaraGeo, menaraMat);
menara1.position.set(-1.2, 1, -0.5);
masjidGroup.add(menara1);

const menara2 = new THREE.Mesh(menaraGeo, menaraMat);
menara2.position.set(1.2, 1, -0.5);
masjidGroup.add(menara2);

masjidGroup.position.set(-1.5, 0, -2);
scene.add(masjidGroup);

// 2. Kubah Mengambang
const kubah2Geo = new THREE.SphereGeometry(0.5, 16, 12);
const kubah2Mat = new THREE.MeshStandardMaterial({ 
    color: 0xffaa33, 
    emissive: 0x221100, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.8 
});
const kubah2 = new THREE.Mesh(kubah2Geo, kubah2Mat);
kubah2.position.set(2, 2, -1);
scene.add(kubah2);

// 3. Ketupat
const ketupatGroup = new THREE.Group();
for (let i = 0; i < 8; i++) {
    const ketupatGeo = new THREE.OctahedronGeometry(0.25);
    const ketupatMat = new THREE.MeshStandardMaterial({ 
        color: 0x44aa88, 
        wireframe: true, 
        emissive: 0x113322 
    });
    const ketupat = new THREE.Mesh(ketupatGeo, ketupatMat);
    const angle = (i / 8) * Math.PI * 2;
    ketupat.position.set(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5 + 1, -1);
    ketupatGroup.add(ketupat);
}
scene.add(ketupatGroup);

// 4. Bulan Sabit
const bulanGroup = new THREE.Group();
const bulanUtamaGeo = new THREE.SphereGeometry(0.6, 16, 12);
const bulanUtamaMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, wireframe: true });
const bulanUtama = new THREE.Mesh(bulanUtamaGeo, bulanUtamaMat);
bulanUtama.position.set(-1, 2.2, -2);
bulanGroup.add(bulanUtama);

const bulanGelapGeo = new THREE.SphereGeometry(0.5, 16, 12);
const bulanGelapMat = new THREE.MeshStandardMaterial({ color: 0x332200, wireframe: true });
const bulanGelap = new THREE.Mesh(bulanGelapGeo, bulanGelapMat);
bulanGelap.position.set(-0.6, 2.4, -1.8);
bulanGroup.add(bulanGelap);
scene.add(bulanGroup);

// 5. Bintang
const starGroup = new THREE.Group();
for (let i = 0; i < 30; i++) {
    const starGeo = new THREE.OctahedronGeometry(0.08);
    const starMat = new THREE.MeshStandardMaterial({ color: 0xffdd88, wireframe: true });
    const star = new THREE.Mesh(starGeo, starMat);
    star.position.set(
        (Math.random() - 0.5) * 10, 
        Math.random() * 4, 
        (Math.random() - 0.5) * 8 - 2
    );
    starGroup.add(star);
}
scene.add(starGroup);

// Animation
function animate() {
    requestAnimationFrame(animate);
    ketupatGroup.rotation.y += 0.002;
    ketupatGroup.rotation.x += 0.001;
    starGroup.rotation.y += 0.0005;
    kubah2.rotation.y += 0.003;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========== PAGE MANAGEMENT ==========
function showPage(pageNum) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page${pageNum}`).classList.add('active');
    
    if (pageNum === 9) {
        initPuzzle();
    }
}

// ========== PAGE 1 BUTTONS ==========
document.getElementById('btnPage1Iya').addEventListener('click', function(e) {
    e.preventDefault();
    showPage(2);
    startTyping();
});

document.getElementById('btnPage1SiapBanget').addEventListener('click', function(e) {
    e.preventDefault();
    showPage(2);
    startTyping();
});

// ========== PAGE 2 TYPING ==========
const typingText = document.getElementById('typingText');
const progressBar = document.getElementById('progressBar');
const btnPage2Lanjut = document.getElementById('btnPage2Lanjut');

const ucapanText = "Taqabbalallahu minna wa minkum, minal aidin wal faizin, mohon maaf lahir dan batin🙏🏼";

function startTyping() {
    typingText.innerHTML = '';
    btnPage2Lanjut.style.display = 'none';
    progressBar.style.width = '0%';
    
    let i = 0;
    function type() {
        if (i < ucapanText.length) {
            typingText.innerHTML += ucapanText.charAt(i);
            i++;
            progressBar.style.width = (i / ucapanText.length * 100) + '%';
            setTimeout(type, 50);
        } else {
            btnPage2Lanjut.style.display = 'block';
        }
    }
    type();
}

btnPage2Lanjut.addEventListener('click', function(e) {
    e.preventDefault();
    showPage(3);
});

// ========== PAGE 3 MAKANAN ==========
const foodCards = document.querySelectorAll('#page3 .option-card');
const inputMakanan = document.getElementById('inputMakanan');
const statusMakanan = document.getElementById('statusMakanan');

foodCards.forEach(card => {
    card.addEventListener('click', function() {
        foodCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        statusMakanan.textContent = `Kamu pilih: ${this.textContent}`;
        setTimeout(() => showPage(4), 1000);
    });
});

inputMakanan.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        statusMakanan.textContent = `Kamu pilih: ${this.value}`;
        setTimeout(() => showPage(4), 1000);
    }
});

// ========== PAGE 4 MEMORY ==========
const memoryItems = document.querySelectorAll('#page4 .memory-item');
const memoryMessage = document.getElementById('memoryMessage');

const memoryTexts = {
    1: 'Malam takbiran yang indah 🌙',
    2: 'Shalat Id di masjid 🕌',
    3: 'Saling memaafkan 🤲',
    4: 'Cahaya lebaran ✨',
    5: 'Meriahnya takbir 🎆',
    6: 'Bersama orang tersayang 🫶🏻'
};

memoryItems.forEach(item => {
    item.addEventListener('click', function() {
        const memory = this.getAttribute('data-memory');
        memoryMessage.textContent = memoryTexts[memory];
        setTimeout(() => showPage(5), 1000);
    });
});

// ========== PAGE 5 DOA ==========
document.getElementById('btnDoa').addEventListener('click', function(e) {
    e.preventDefault();
    showPage(6);
});

// ========== PAGE 6 SURPRISE ==========
const surpriseBox = document.getElementById('surpriseBox');
const surpriseText = document.getElementById('surpriseText');
const surpriseMessage = document.getElementById('surpriseMessage');
let surpriseCount = 0;

surpriseBox.addEventListener('click', function() {
    surpriseCount++;
    if (surpriseCount === 1) {
        surpriseText.textContent = 'Aisya baik banget! ✨';
    } else if (surpriseCount === 2) {
        surpriseText.textContent = 'Aisya sholehah 🫶🏻';
    } else if (surpriseCount === 3) {
        surpriseText.textContent = 'Akbar sayang Aisya! ❤️';
        surpriseMessage.textContent = 'Kejutan selesai!';
        setTimeout(() => showPage(7), 1000);
    }
});

// ========== PAGE 7 LOVE METER ==========
const loveMeterFill = document.getElementById('loveMeterFill');
const lovePercentage = document.getElementById('lovePercentage');
const btnLoveMeter = document.getElementById('btnLoveMeter');

btnLoveMeter.addEventListener('click', function(e) {
    e.preventDefault();
    let percent = 0;
    const interval = setInterval(() => {
        percent += 5;
        loveMeterFill.style.width = percent + '%';
        lovePercentage.textContent = percent + '%';
        
        if (percent >= 100) {
            clearInterval(interval);
            setTimeout(() => showPage(8), 1000);
        }
    }, 50);
});

// ========== PAGE 8 WISH LIST ==========
const wishItems = document.querySelectorAll('#page8 .wish-item');
const wishMessage = document.getElementById('wishMessage');
let wishCompleted = 0;

wishItems.forEach(item => {
    item.addEventListener('click', function() {
        const check = this.querySelector('.wish-check');
        if (!check.classList.contains('checked')) {
            check.classList.add('checked');
            check.innerHTML = '✓';
            wishCompleted++;
            
            if (wishCompleted === 4) {
                wishMessage.textContent = 'Semua wishlist terkumpul! ✨';
                setTimeout(() => showPage(9), 1000);
            }
        }
    });
});

// ========== PAGE 9 PUZZLE ==========
const puzzleGrid = document.getElementById('puzzleGrid');
const movesSpan = document.getElementById('movesCount');
const matchesSpan = document.getElementById('matchesCount');
const puzzleMessage = document.getElementById('puzzleMessage');
const btnResetPuzzle = document.getElementById('btnResetPuzzle');

const iconPairs = [
    { id: 1, icon: '🌙' },
    { id: 2, icon: '🕌' },
    { id: 3, icon: '🤲' },
    { id: 4, icon: '✨' },
    { id: 5, icon: '🎁' },
    { id: 6, icon: '🫶🏻' },
    { id: 7, icon: '🍽️' },
    { id: 8, icon: '❤️' }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;

function initPuzzle() {
    cards = [];
    iconPairs.forEach(pair => {
        cards.push({ id: pair.id, icon: pair.icon, matched: false });
        cards.push({ id: pair.id, icon: pair.icon, matched: false });
    });
    
    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    renderPuzzleGrid();
    
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    lockBoard = false;
    movesSpan.textContent = moves;
    matchesSpan.textContent = matchedPairs;
    puzzleMessage.textContent = '';
}

function renderPuzzleGrid() {
    puzzleGrid.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-flip';
        if (card.matched) {
            cardDiv.classList.add('matched');
        }
        cardDiv.dataset.index = index;
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.innerHTML = '❤️';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = card.icon;
        
        cardDiv.appendChild(cardBack);
        cardDiv.appendChild(cardFront);
        
        cardDiv.addEventListener('click', () => flipCard(index));
        puzzleGrid.appendChild(cardDiv);
    });
}

function flipCard(index) {
    if (lockBoard) return;
    if (cards[index].matched) return;
    
    const cardDiv = document.querySelector(`.card-flip[data-index="${index}"]`);
    if (cardDiv.classList.contains('flipped')) return;
    
    moves++;
    movesSpan.textContent = moves;
    
    cardDiv.classList.add('flipped');
    flippedCards.push({ index, element: cardDiv });
    
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;
    
    const card1 = cards[flippedCards[0].index];
    const card2 = cards[flippedCards[1].index];
    
    if (card1.id === card2.id) {
        setTimeout(() => {
            card1.matched = true;
            card2.matched = true;
            
            flippedCards[0].element.classList.add('matched');
            flippedCards[1].element.classList.add('matched');
            
            matchedPairs++;
            matchesSpan.textContent = matchedPairs;
            
            flippedCards = [];
            lockBoard = false;
            
            if (matchedPairs === 8) {
                puzzleMessage.textContent = '🎉 Selamat! Kamu menang! 🎉';
                setTimeout(() => showPage(10), 1500);
            }
        }, 500);
    } else {
        setTimeout(() => {
            flippedCards[0].element.classList.remove('flipped');
            flippedCards[1].element.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 800);
    }
}

btnResetPuzzle.addEventListener('click', function(e) {
    e.preventDefault();
    initPuzzle();
});

// ========== PAGE 10 TIMELINE ==========
document.getElementById('btnTimeline').addEventListener('click', function(e) {
    e.preventDefault();
    showPage(11);
});

// ========== PAGE 11 BALASAN ==========
const inputBalasan = document.getElementById('inputBalasan');

inputBalasan.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        showPage(12);
    }
});

// ========== PAGE 12 RESTART ==========
document.getElementById('btnRestart').addEventListener('click', function(e) {
    e.preventDefault();
    
    wishCompleted = 0;
    surpriseCount = 0;
    
    document.querySelectorAll('.wish-check').forEach(c => {
        c.classList.remove('checked');
        c.innerHTML = '⬜';
    });
    
    document.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
    });
    
    loveMeterFill.style.width = '0%';
    lovePercentage.textContent = '0%';
    
    showPage(1);
});