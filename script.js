document.addEventListener('DOMContentLoaded', () => {
    // Audio Elements
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');
    const foolWinSound = document.getElementById('foolWinSound');

    // DOM Element References
    const numPlayersInput = document.getElementById('numPlayers');
    const numCiviliansInput = document.getElementById('numCivilians');
    const numUndercoversInput = document.getElementById('numUndercovers');
    const numMrWhiteInput = document.getElementById('numMrWhite');
    const numFoolsInput = document.getElementById('numFools');
    const roleCountError = document.getElementById('roleCountError');
    const nameEntryError = document.getElementById('nameEntryError');
    const roleConfigurationDiv = document.getElementById('roleConfiguration');
    const proceedToNameEntryButton = document.getElementById('proceedToNameEntryButton');
    const playerNameEntryDiv = document.getElementById('playerNameEntry');
    const playerNamePrompt = document.getElementById('playerNamePrompt');
    const currentNameInput = document.getElementById('currentNameInput');
    const avatarSelectionContainer = document.getElementById('avatarSelectionContainer');
    const submitNameAndRevealCardButton = document.getElementById('submitNameAndRevealCardButton');
    const registeredPlayersDisplay = document.getElementById('registeredPlayersDisplay');
    const registeredPlayersListUl = document.getElementById('registeredPlayersListUl');
    const gameSetupSection = document.getElementById('gameSetup');
    const customWordSection = document.getElementById('customWordSection');
    const gameAreaSection = document.getElementById('gameArea');
    const truthOrDareSection = document.getElementById('truthOrDareSection');
    const gameOverSection = document.getElementById('gameOverSection');
    const playersDisplay = document.getElementById('playersDisplay');
    const votingSection = document.getElementById('votingSection');
    const votingInstruction = document.getElementById('votingInstruction');
    const activateVotingButton = document.getElementById('activateVotingButton');
    const mrWhiteGuessSection = document.getElementById('mrWhiteGuessSection');
    const mrWhiteWordGuessInput = document.getElementById('mrWhiteWordGuess');
    const submitMrWhiteGuessButton = document.getElementById('submitMrWhiteGuess');
    const foolVotedOutMessage = document.getElementById('foolVotedOutMessage');
    const foolWinnerMessage = document.getElementById('foolWinnerMessage');
    const checkMyWordAgainButton = document.getElementById('checkMyWordAgainButton');
    const punishedPlayerName = document.getElementById('punishedPlayerName');
    const getTruthButton = document.getElementById('getTruthButton');
    const getDareButton = document.getElementById('getDareButton');
    const truthOrDareChallengeP = document.getElementById('truthOrDareChallenge');
    const punishmentDoneButton = document.getElementById('punishmentDoneButton');
    const gameWinnerP = document.getElementById('gameWinner');
    const scoreListUl = document.getElementById('scoreList');
    const customWordCivilianInput = document.getElementById('customWordCivilian');
    const customWordUndercoverInput = document.getElementById('customWordUndercover');
    const addPairedWordButton = document.getElementById('addPairedWordButton');
    const customWordListUl = document.getElementById('customWordList');
    const restartGameButton = document.getElementById('restartGameButton');
    const toggleMusicButton = document.getElementById('toggleMusicButton');
    const homeButton = document.getElementById('homeButton');
    const backButton = document.getElementById('backButton');
    const cardPopupOverlay = document.getElementById('cardPopupOverlay');
    const wordCardFlipper = document.getElementById('wordCardFlipper');
    const popupCardWord = document.getElementById('popupCardWord');
    const flipCardButton = document.getElementById('flipCardButton');
    const closePopupButton = document.getElementById('closePopupButton');
    const voteConfirmModal = document.getElementById('voteConfirmModal');
    const voteConfirmMessage = document.getElementById('voteConfirmMessage');
    const confirmVoteYesButton = document.getElementById('confirmVoteYesButton');
    const confirmVoteNoButton = document.getElementById('confirmVoteNoButton');
    const menuButton = document.getElementById('menuButton');
    const menuPanel = document.getElementById('menuPanel');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuKamusKata = document.getElementById('menuKamusKata');
    const menuModeParty = document.getElementById('menuModeParty');
    const menuPetunjuk = document.getElementById('menuPetunjuk');
    const instructionsModal = document.getElementById('instructionsModal');
    const closeInstructionsButton = document.getElementById('closeInstructionsButton');

    // Game State
    let players = [];
    let rolesToAssign = [];
    let totalPlayersToSetup = 0;
    let currentPlayerSetupIndex = 0;
    let selectedAvatarPath = null;
    let civilianWord = '';
    let undercoverWord = '';

    // DAFTAR KATA BAWAAN YANG DIPERBANYAK
    const gameWordPairs = [
        { civilian: "Kulkas", undercover: "Lemari Es" }, { civilian: "Pantai", undercover: "Pesisir" },
        { civilian: "Gelas", undercover: "Cangkir" }, { civilian: "Buku", undercover: "Majalah" },
        { civilian: "Sepatu", undercover: "Sandal" }, { civilian: "Mobil", undercover: "Motor" },
        { civilian: "Rumah", undercover: "Apartemen" }, { civilian: "Komputer", undercover: "Laptop" },
        { civilian: "Sendok", undercover: "Garpu" }, { civilian: "Meja", undercover: "Kursi" },
        { civilian: "Pensil", undercover: "Pulpen" }, { civilian: "Kucing", undercover: "Anjing" },
        { civilian: "Apel", undercover: "Jeruk" }, { civilian: "Matahari", undercover: "Bulan" },
        { civilian: "Siang", undercover: "Malam" }, { civilian: "Panas", undercover: "Dingin" },
        { civilian: "Nasi", undercover: "Roti" }, { civilian: "Teh", undercover: "Kopi" },
        { civilian: "Gunung", undercover: "Lembah" }, { civilian: "Hutan", undercover: "Gurun" },
        { civilian: "Pisau", undercover: "Gunting" }, { civilian: "Topi", undercover: "Helm" },
        { civilian: "Pintu", undercover: "Jendela" }, { civilian: "Susu", undercover: "Yogurt" },
        { civilian: "Ayam", undercover: "Bebek" }, { civilian: "Langit", undercover: "Awan" },
        { civilian: "Api", undercover: "Air" }, { civilian: "Bantal", undercover: "Guling" },
        { civilian: "Selimut", undercover: "Sprei" }, { civilian: "Televisi", undercover: "Radio" },
        { civilian: "Jembatan", undercover: "Terowongan" }, { civilian: "Sungai", undercover: "Danau" },
        { civilian: "Cinta", undercover: "Sayang" }, { civilian: "Sedih", undercover: "Kecewa" },
        { civilian: "Senang", undercover: "Gembira" }, { civilian: "Pintar", undercover: "Cerdas" },
        { civilian: "Kaya", undercover: "Makmur" }, { civilian: "Miskin", undercover: "Melarat" },
        { civilian: "Besar", undercover: "Luas" }, { civilian: "Kecil", undercover: "Sempit" },
        { civilian: "Cepat", undercover: "Laju" }, { civilian: "Lambat", undercover: "Perlahan" },
        { civilian: "Tidur", undercover: "Istirahat" }, { civilian: "Makan", undercover: "Minum" },
        { civilian: "Berlari", undercover: "Berjalan" }, { civilian: "Terbang", undercover: "Melayang" },
        { civilian: "Berenang", undercover: "Menyelam" }, { civilian: "Menulis", undercover: "Menggambar" },
        { civilian: "Membaca", undercover: "Mengeja" }, { civilian: "Astronot", undercover: "Kosmonot" },
        { civilian: "Teleskop", undercover: "Mikroskop" }, { civilian: "Penyanyi", undercover: "Biduan" },
        { civilian: "Aktor", undercover: "Pemeran" }, { civilian: "Dokter", undercover: "Suster" },
        { civilian: "Guru", undercover: "Dosen" }, { civilian: "Polisi", undercover: "Tentara" }
    ];

    let customWords = [];
    let gameInProgress = false;
    let initialCiviliansCount = 0;
    let initialFoolsCount = 0;
    let currentRoundVotedOut = null;
    let currentWordRevealCallback = null;
    let isVotingModeActive = false;
    let playerSelectedForVote = null;
    let aFoolHasWon = false;

    const avatarImages = [
        'assets/images/avatar1.png', 'assets/images/avatar2.png', 'assets/images/avatar3.png',
        'assets/images/avatar4.png', 'assets/images/avatar5.png', 'assets/images/avatar6.png'
    ];
    const truths = ["Apa kebohongan terbesarmu?"]; // Anda bisa menambah lebih banyak di sini
    const dares = ["Nyanyikan lagu anak-anak dengan gaya rock."]; // Anda bisa menambah lebih banyak di sini
    truths.push( "Apa hal paling memalukan yang pernah kamu lakukan?", "Siapa orang yang paling kamu kagumi dan mengapa?", "Jika kamu bisa bertukar hidup dengan seseorang selama sehari, siapa orang itu?", "Apa ketakutan terbesarmu?", "Apa momen paling membahagiakan dalam hidupmu sejauh ini?");
    dares.push( "Posting foto selfie paling konyolmu ke media sosial (dengan caption 'Aku Bangga').", "Biarkan orang lain memilihkan status WhatsApp/Instagram story untukmu selama 1 jam.", "Bicara dengan aksen aneh (misal: robot, bangsawan) selama 5 menit ke depan.");

    // --- Helper Functions ---
    function playSound(soundElement) { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.warn("Sound err:", e)); } }
    function updateActiveSection(activeSectionId) {
        const allSections = [gameSetupSection, customWordSection, gameAreaSection, truthOrDareSection, gameOverSection, instructionsModal];
         allSections.forEach(s => {
            if (s) {
                if (s.id === 'gameSetup') {
                    if (activeSectionId === 'gameSetup_roleConfig' || activeSectionId === 'gameSetup_nameEntry') {
                        s.classList.remove('hidden');
                        if (roleConfigurationDiv) roleConfigurationDiv.classList.toggle('hidden', activeSectionId !== 'gameSetup_roleConfig');
                        if (playerNameEntryDiv) playerNameEntryDiv.classList.toggle('hidden', activeSectionId !== 'gameSetup_nameEntry');
                    } else {
                        s.classList.add('hidden');
                    }
                } else if (s.id === activeSectionId) {
                    s.classList.remove('hidden');
                } else {
                    s.classList.add('hidden');
                }
            }
        });
        if (backButton) {
            const isCustomWordVisible = customWordSection && !customWordSection.classList.contains('hidden');
            const isInstructionsVisible = instructionsModal && !instructionsModal.classList.contains('hidden');
            backButton.classList.toggle('hidden', !(isCustomWordVisible || isInstructionsVisible));
        }
    }
    function toggleMenu(forceClose = false) {
        if (!menuPanel || !menuOverlay) {
            console.error("Elemen menuPanel atau menuOverlay tidak ditemukan saat toggleMenu.");
            return;
        }
        if (forceClose || menuPanel.classList.contains('open')) {
            menuPanel.classList.remove('open');
            menuOverlay.classList.add('hidden');
        } else {
            menuPanel.classList.remove('hidden'); 
            menuPanel.classList.add('open');    
            menuOverlay.classList.remove('hidden'); 
        }
    }

    // Fungsi untuk Custom Words
    function loadCustomWords() { try { const stored = localStorage.getItem('customPairedWords_HTV4'); if (stored) { customWords = JSON.parse(stored); if (!Array.isArray(customWords) || !customWords.every(item => typeof item === 'object' && item.civilian && item.undercover)) { console.warn("Data customPairedWords tidak valid, direset."); customWords = []; } } else { customWords = [];} } catch (e) { console.error("Error saat memuat customPairedWords:", e); customWords = []; } updateCustomWordListUI(); };
    function saveCustomWords() { localStorage.setItem('customPairedWords_HTV4', JSON.stringify(customWords)); };
    function updateCustomWordListUI() { if (!customWordListUl) return; customWordListUl.innerHTML = ''; customWords.forEach((pair, index) => { const li = document.createElement('li'); li.textContent = `${pair.civilian} / ${pair.undercover}`; const btn = document.createElement('button'); btn.textContent = 'Hapus'; btn.onclick = () => { playSound(clickSound); customWords.splice(index, 1); saveCustomWords(); updateCustomWordListUI(); }; li.appendChild(btn); customWordListUl.appendChild(li); }); };

    // --- Menu Event Listeners ---
    if (menuButton) menuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(); });
    if (closeMenuButton) closeMenuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(true); });
    if (menuOverlay) menuOverlay.addEventListener('click', () => { toggleMenu(true); });
    if (homeButton) { homeButton.addEventListener('click', () => { playSound(clickSound); resetGame(); toggleMenu(true); }); }
    if (backButton) { backButton.addEventListener('click', () => { playSound(clickSound); if (instructionsModal && !instructionsModal.classList.contains('hidden')) { instructionsModal.classList.add('hidden'); if (customWordSection && !customWordSection.classList.contains('hidden')) { updateActiveSection('customWordSection'); } else if (!gameInProgress && gameSetupSection) { updateActiveSection('gameSetup_roleConfig'); } else { backButton.classList.add('hidden'); } } else if (customWordSection && !customWordSection.classList.contains('hidden')) { updateActiveSection('gameSetup_roleConfig'); } toggleMenu(true); }); }
    
    if (menuKamusKata && customWordSection && gameSetupSection && roleConfigurationDiv && playerNameEntryDiv) {
        menuKamusKata.addEventListener('click', () => {
            playSound(clickSound);
            const gameIsActuallyRunning = gameAreaSection && !gameAreaSection.classList.contains('hidden') || truthOrDareSection && !truthOrDareSection.classList.contains('hidden');
            const gameIsOver = gameOverSection && !gameOverSection.classList.contains('hidden');

            if (gameIsActuallyRunning && !gameIsOver) {
                alert("Kamus kata hanya bisa diakses sebelum permainan dimulai atau setelah permainan selesai.");
                toggleMenu(true);
                return;
            }
            if (customWordSection.classList.contains('hidden')) {
                if(roleConfigurationDiv) roleConfigurationDiv.classList.add('hidden');
                if(playerNameEntryDiv) playerNameEntryDiv.classList.add('hidden');
                if(gameSetupSection) gameSetupSection.classList.remove('hidden'); 
                customWordSection.classList.remove('hidden');
                if(backButton) backButton.classList.remove('hidden');
            } else { 
                customWordSection.classList.add('hidden');
                if(roleConfigurationDiv) roleConfigurationDiv.classList.remove('hidden');
                 if(gameSetupSection) gameSetupSection.classList.remove('hidden');
                if(backButton) backButton.classList.add('hidden');
            }
            toggleMenu(true);
        });
    }
    if (menuModeParty && numFoolsInput) { menuModeParty.addEventListener('click', () => { playSound(clickSound); alert("Mode Party dengan The Fool akan aktif jika jumlah The Fool > 0 pada pengaturan permainan."); if (numFoolsInput && roleConfigurationDiv && !roleConfigurationDiv.classList.contains('hidden')) { const foolInputDiv = numFoolsInput.parentElement; if (foolInputDiv) { foolInputDiv.style.transition = 'background-color 0.3s ease, transform 0.1s ease'; foolInputDiv.style.backgroundColor = 'var(--secondary-color)'; foolInputDiv.style.transform = 'scale(1.03)'; setTimeout(() => { foolInputDiv.style.backgroundColor = ''; foolInputDiv.style.transform = ''; }, 700); } } toggleMenu(true); }); }
    if (menuPetunjuk && instructionsModal) { menuPetunjuk.addEventListener('click', () => { playSound(clickSound); instructionsModal.classList.remove('hidden'); if(backButton) backButton.classList.remove('hidden'); toggleMenu(true); }); }
    if (closeInstructionsButton && instructionsModal) { closeInstructionsButton.addEventListener('click', () => { playSound(clickSound); instructionsModal.classList.add('hidden'); if (customWordSection && !customWordSection.classList.contains('hidden')) { /* Tetap di custom word */ } else if (!gameInProgress && gameSetupSection) { updateActiveSection('gameSetup_roleConfig'); } else { if(backButton) backButton.classList.add('hidden'); } }); }
    
    const toggleMusicButtonElem = document.getElementById('toggleMusicButton'); // Alias untuk kejelasan
    if (toggleMusicButtonElem) { // Pastikan elemen ada
        toggleMusicButtonElem.addEventListener('click', () => { playSound(clickSound); if (bgMusic.paused) { bgMusic.play().catch(e => console.warn("Music err:", e)); toggleMusicButtonElem.innerHTML = "🎵<span class='sr-only'>Hentikan</span>"; } else { bgMusic.pause(); toggleMusicButtonElem.innerHTML = "🔇<span class='sr-only'>Putar</span>"; } });
    }

    if (addPairedWordButton && customWordCivilianInput && customWordUndercoverInput) {
        addPairedWordButton.addEventListener('click', () => {
            playSound(clickSound);
            const civWord = customWordCivilianInput.value.trim();
            const undWord = customWordUndercoverInput.value.trim();
            if (civWord && undWord) {
                if (civWord.toLowerCase() === undWord.toLowerCase()) { alert('Kata Civilian dan Undercover tidak boleh sama.'); return; }
                const allExistingWords = [...gameWordPairs, ...customWords].flatMap(p => [p.civilian.toLowerCase(), p.undercover.toLowerCase()]);
                if (allExistingWords.includes(civWord.toLowerCase()) || allExistingWords.includes(undWord.toLowerCase())) {
                     alert('Salah satu kata ini sudah ada dalam kamus (pribadi atau bawaan). Kata harus unik.'); return;
                }
                customWords.push({ civilian: civWord, undercover: undWord });
                saveCustomWords();
                updateCustomWordListUI();
                customWordCivilianInput.value = '';
                customWordUndercoverInput.value = '';
            } else {
                alert('Kedua input kata (Civilian dan Undercover) harus diisi.');
            }
        });
    }

    // --- LOGIKA SETUP GAME (proceedToNameEntryButton) ---
    if (proceedToNameEntryButton) {
        proceedToNameEntryButton.addEventListener('click', () => {
            playSound(clickSound);
            if(roleCountError) roleCountError.textContent = "";
            const numTotal = parseInt(numPlayersInput.value);
            const numCivs = parseInt(numCiviliansInput.value);
            const numUnds = parseInt(numUndercoversInput.value);
            const numMWs = parseInt(numMrWhiteInput.value);
            const numFools = parseInt(numFoolsInput.value); 
            if (numTotal < 3 || numTotal > 6) { if(roleCountError) roleCountError.textContent = "Jumlah pemain harus antara 3-6."; return; }
            if (numCivs < 1 && numFools === 0 && (numUnds > 0 || numMWs > 0) ) { if(roleCountError) roleCountError.textContent = "Minimal harus ada 1 Civilian jika ada Undercover/Mr.White dan tidak ada The Fool."; return; }
            else if (numCivs <= 0 && numFools > 0 && numUnds === 0 && numMWs === 0 && numTotal > 1) { /* Kondisi khusus Fool */ }
            else if (numCivs < 1 && numFools === 0) { if(roleCountError) roleCountError.textContent = "Minimal harus ada 1 Civilian."; return; }
            if (numCivs < 0 || numUnds < 0 || numMWs < 0 || numFools < 0) { if(roleCountError) roleCountError.textContent = "Jumlah peran tidak boleh negatif."; return; }
            if (numFools > 1) { if(roleCountError) roleCountError.textContent = "Maksimal hanya boleh ada 1 The Fool."; return; }
            if (numCivs + numUnds + numMWs + numFools !== numTotal) { if(roleCountError) roleCountError.textContent = "Total semua peran harus sama dengan jumlah pemain."; return; }

            totalPlayersToSetup = numTotal;
            initialCiviliansCount = numCivs; 
            initialFoolsCount = numFools;

            const allWordPairs = [...gameWordPairs, ...customWords];
            if (allWordPairs.length === 0 && (numCivs > 0 || numUnds > 0)) {
                if(roleCountError) roleCountError.textContent = "Tidak ada kata tersedia di kamus bawaan maupun pribadi!";
                return;
            }
            
            civilianWord = ''; undercoverWord = '';
            if ((numCivs > 0 || numUnds > 0) && allWordPairs.length > 0) {
                const chosenPair = allWordPairs[Math.floor(Math.random() * allWordPairs.length)];
                civilianWord = chosenPair.civilian;
                undercoverWord = chosenPair.undercover;
            } else if (numCivs === 0 && numUnds === 0 && (numMWs > 0 || numFools > 0)) {
                // Tidak ada kata jika tidak ada Civilian/Undercover, ini oke
            }

            rolesToAssign = [];
            for (let i = 0; i < numCivs; i++) rolesToAssign.push("Civilian");
            for (let i = 0; i < numUnds; i++) rolesToAssign.push("Undercover");
            for (let i = 0; i < numMWs; i++) rolesToAssign.push("Mr. White");
            for (let i = 0; i < numFools; i++) rolesToAssign.push("The Fool");
            for (let i = rolesToAssign.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rolesToAssign[i], rolesToAssign[j]] = [rolesToAssign[j], rolesToAssign[i]]; }

            players = []; 
            currentPlayerSetupIndex = 0;
            aFoolHasWon = false;
            selectedAvatarPath = null; 
            updateRegisteredPlayersList(); 
            prepareNextPlayerNameEntry();
            updateActiveSection('gameSetup_nameEntry'); 
        });
    }

    function populateAvatarChoices() { if (!avatarSelectionContainer) return; avatarSelectionContainer.innerHTML = ''; avatarImages.forEach(avatarSrc => { const img = document.createElement('img'); img.src = avatarSrc; img.alt = "Pilih Avatar"; img.dataset.avatarPath = avatarSrc; img.addEventListener('click', (e) => { document.querySelectorAll('#avatarSelectionContainer img.selected-avatar').forEach(selectedImg => { selectedImg.classList.remove('selected-avatar'); }); e.target.classList.add('selected-avatar'); selectedAvatarPath = e.target.dataset.avatarPath; playSound(clickSound); }); avatarSelectionContainer.appendChild(img); }); }
    function prepareNextPlayerNameEntry() { if(playerNamePrompt) playerNamePrompt.textContent = `Pemain ${currentPlayerSetupIndex + 1}, Masukkan Nama, Pilih Avatar & Lihat Peranmu:`; if(currentNameInput) currentNameInput.value = ""; if(nameEntryError) nameEntryError.textContent = ""; selectedAvatarPath = null; populateAvatarChoices(); if(currentNameInput) currentNameInput.focus(); }
    function updateRegisteredPlayersList() { if (!registeredPlayersListUl) return; registeredPlayersListUl.innerHTML = ''; players.forEach(p => { const li = document.createElement('li'); const img = document.createElement('img'); img.src = p.avatar || 'assets/images/avatar_default.png'; img.alt = `Avatar ${p.name}`; li.appendChild(img); li.appendChild(document.createTextNode(p.name)); registeredPlayersListUl.appendChild(li); }); if (players.length > 0 && registeredPlayersDisplay) { registeredPlayersDisplay.classList.remove('hidden'); } else if (registeredPlayersDisplay) { registeredPlayersDisplay.classList.add('hidden'); } }
    
    if (submitNameAndRevealCardButton) { 
        submitNameAndRevealCardButton.addEventListener('click', () => {
            playSound(clickSound); 
            const playerName = currentNameInput.value.trim(); 
            if(nameEntryError) nameEntryError.textContent = ""; 
            if (playerName === "") { if(nameEntryError) nameEntryError.textContent = "Nama tidak boleh kosong."; return; } 
            if (players.some(p => p.name.toLowerCase() === playerName.toLowerCase())) { if(nameEntryError) nameEntryError.textContent = "Nama sudah digunakan."; return; } 
            let avatarForPlayer = selectedAvatarPath; 
            if (!avatarForPlayer) { avatarForPlayer = avatarImages[currentPlayerSetupIndex % avatarImages.length]; } 
            const role = rolesToAssign.pop(); 
            let wordForPlayer = null; 
            if (role === "Civilian") wordForPlayer = civilianWord; 
            else if (role === "Undercover") wordForPlayer = undercoverWord; 
            const newPlayer = { id: currentPlayerSetupIndex, name: playerName, role: role, word: wordForPlayer, avatar: avatarForPlayer, score: 0, isOut: false }; 
            players.push(newPlayer); 
            updateRegisteredPlayersList(); 
            let cardText = ""; 
            if (role === "Mr. White") cardText = `Hai ${playerName}, Kamu <strong>Mr. White</strong>.<br><br>Berpura-pura tahu & jangan ketahuan!`; 
            else if (role === "Undercover") cardText = `Hai ${playerName}, Kamu <strong>Undercover</strong>.<br><br>Kata beda: <strong class='highlight-word'>${newPlayer.word}</strong>.<br><br>Cari pemain lain!`; 
            else if (role === "The Fool") cardText = `Hai ${playerName}, Kamu <strong>The Fool</strong> (Badut).<br><br>Tujuanmu: Buat dirimu divote keluar oleh pemain lain! Jangan sampai ketahuan kamu sengaja.`; 
            else cardText = `Hai ${playerName}, Kamu <strong>Civilian</strong>.<br><br>Kata: <strong class='highlight-word'>${newPlayer.word}</strong>.<br><br>Cari Undercover, Mr. White, dan The Fool!`; 
            if(popupCardWord) popupCardWord.innerHTML = cardText; 
            if(cardPopupOverlay) cardPopupOverlay.classList.remove('hidden'); 
            if(wordCardFlipper) wordCardFlipper.classList.remove('is-flipped'); 
            currentWordRevealCallback = handleCardCloseAfterSetup; 
        }); 
    }
    function handleCardCloseAfterSetup() { currentPlayerSetupIndex++; if (currentPlayerSetupIndex < totalPlayersToSetup) { prepareNextPlayerNameEntry(); } else { startGameFromIterativeSetup(); } }
    function startGameFromIterativeSetup() { gameInProgress = true; updateActiveSection('gameArea'); if(checkMyWordAgainButton) checkMyWordAgainButton.classList.remove('hidden'); if(votingSection) votingSection.classList.remove('hidden'); if(activateVotingButton){activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button');} if(votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); if(restartGameButton) restartGameButton.classList.remove('hidden'); updatePlayersDisplayUI(); }
    
    if (checkMyWordAgainButton) checkMyWordAgainButton.addEventListener('click', () => { playSound(clickSound); const name = prompt("Masukkan nama Anda untuk cek peran/kata lagi:"); if (name) { const player = players.find(p => p.name.toLowerCase() === name.trim().toLowerCase() && !p.isOut); if (player) { let txt = ""; if (player.role === "Mr. White" || player.role === "The Fool") { txt = `<img src="${player.avatar}" alt="Avatar Anda" style="width:60px; height:60px; border-radius:50%; margin-bottom:10px;"><br>Hai ${player.name}, kamu adalah <strong>${player.role}</strong>. Kamu tidak memiliki kata.`; } else { txt = `<img src="${player.avatar}" alt="Avatar Anda" style="width:60px; height:60px; border-radius:50%; margin-bottom:10px;"><br>Hai ${player.name} (<strong>${player.role}</strong>), kata rahasiamu adalah: <strong class='highlight-word'>${player.word}</strong>`; } if(popupCardWord) popupCardWord.innerHTML = txt; if(cardPopupOverlay) cardPopupOverlay.classList.remove('hidden'); if(wordCardFlipper) wordCardFlipper.classList.remove('is-flipped'); currentWordRevealCallback = null; } else { alert("Pemain tidak ditemukan, sudah keluar, atau nama salah."); } } });
    if (flipCardButton) flipCardButton.addEventListener('click', () => { playSound(clickSound); if(wordCardFlipper) wordCardFlipper.classList.add('is-flipped'); });
    if (closePopupButton) closePopupButton.addEventListener('click', () => { playSound(clickSound); if(cardPopupOverlay) cardPopupOverlay.classList.add('hidden'); if (currentWordRevealCallback) { currentWordRevealCallback(); currentWordRevealCallback = null; } });
    if (cardPopupOverlay) cardPopupOverlay.addEventListener('click', (e) => { if (e.target === cardPopupOverlay && closePopupButton) closePopupButton.click(); });
    
    // --- Voting Logic ---
    if (activateVotingButton) activateVotingButton.addEventListener('click', () => { playSound(clickSound); isVotingModeActive = !isVotingModeActive; if (isVotingModeActive) { activateVotingButton.textContent = 'Batalkan Mode Vote'; activateVotingButton.classList.add('secondary-button'); activateVotingButton.classList.remove('primary-button'); if(votingInstruction) votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain untuk memilih.'; document.querySelectorAll('#playersDisplay .player-info').forEach(pc => { const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId)); if (p && !p.isOut) pc.classList.add('votable'); }); } else { deactivateVotingMode(); } });
    if (playersDisplay) playersDisplay.addEventListener('click', (event) => { if (!isVotingModeActive) return; const card = event.target.closest('.player-info.votable:not(.voted-out)'); if (!card) return; playSound(clickSound); const pId = parseInt(card.dataset.playerId); playerSelectedForVote = players.find(p => p.id === pId); if (playerSelectedForVote) { document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote')); card.classList.add('selected-for-vote'); if(voteConfirmMessage) voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`; if(voteConfirmModal) voteConfirmModal.classList.remove('hidden'); } });
    if (confirmVoteYesButton) confirmVoteYesButton.addEventListener('click', () => { playSound(clickSound); if (playerSelectedForVote) { currentRoundVotedOut = playerSelectedForVote; currentRoundVotedOut.isOut = true; aFoolHasWon = false; updatePlayersDisplayUI(); if(votingSection) votingSection.classList.add('hidden'); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); deactivateVotingMode(); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); if (currentRoundVotedOut.role === "The Fool") { playSound(foolWinSound); currentRoundVotedOut.score += 2; savePlayerScores(); if(foolWinnerMessage) foolWinnerMessage.textContent = `${currentRoundVotedOut.name} (The Fool) berhasil divote keluar dan MENANG!`; if(foolVotedOutMessage) foolVotedOutMessage.classList.remove('hidden'); aFoolHasWon = true; setTimeout(() => { if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); checkGameContinuationOrEnd(); }, 4000); } else if (currentRoundVotedOut.role === "Undercover") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!"); } else if (currentRoundVotedOut.role === "Mr. White") { if(mrWhiteGuessSection) mrWhiteGuessSection.classList.remove('hidden'); } else if (currentRoundVotedOut.role === "Civilian") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Civilian salah divote!"); } playerSelectedForVote = null; } });
    if (confirmVoteNoButton) confirmVoteNoButton.addEventListener('click', () => { playSound(clickSound); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); if (playerSelectedForVote) { const card = document.querySelector(`.player-info[data-player-id='${playerSelectedForVote.id}']`); if (card) card.classList.remove('selected-for-vote'); } playerSelectedForVote = null; });
    if (submitMrWhiteGuessButton) submitMrWhiteGuessButton.addEventListener('click', () => { playSound(clickSound); const guess = mrWhiteWordGuessInput.value.trim().toLowerCase(); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") { if (guess === civilianWord.toLowerCase()) { playSound(winSound); currentRoundVotedOut.score++; savePlayerScores(); updatePlayersDisplayUI(); endGame(`Mr. White (${currentRoundVotedOut.name}) menebak benar! Kata Civilian adalah: ${civilianWord}. Mr. White Menang!`); } else { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Mr. White salah tebak kata."); } if(mrWhiteWordGuessInput) mrWhiteWordGuessInput.value = ''; } });
    
    // --- Truth or Dare Logic ---
    if (getTruthButton) getTruthButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * truths.length); if(truthOrDareChallengeP) truthOrDareChallengeP.innerHTML = `<strong>TRUTH:</strong> ${truths[idx]}`; getTruthButton.disabled = true; if(getDareButton) getDareButton.disabled = true; });
    if (getDareButton) getDareButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * dares.length); if(truthOrDareChallengeP) truthOrDareChallengeP.innerHTML = `<strong>DARE:</strong> ${dares[idx]}`; if(getTruthButton) getTruthButton.disabled = true; if(getDareButton) getDareButton.disabled = true; });
    if (punishmentDoneButton) punishmentDoneButton.addEventListener('click', () => { playSound(clickSound); if(truthOrDareSection) truthOrDareSection.classList.add('hidden'); if(truthOrDareChallengeP) truthOrDareChallengeP.textContent = ''; if(getTruthButton) getTruthButton.disabled = false; if(getDareButton) getDareButton.disabled = false; checkGameContinuationOrEnd(); });
    
    if (restartGameButton) restartGameButton.addEventListener('click', () => { playSound(clickSound); resetGame(); });
    
    updatePlayersDisplayUI = () => { if(!playersDisplay) return; playersDisplay.innerHTML = ''; players.forEach(p => { const d = document.createElement('div'); d.classList.add('player-info'); d.dataset.playerId = p.id; if (p.isOut) d.classList.add('voted-out'); const avatarSrc = p.avatar || 'assets/images/avatar_default.png'; d.innerHTML = `<img src="${avatarSrc}" alt="Avatar ${p.name}" onerror="this.src='assets/images/avatar_default.png'; this.alt='Avatar Default';"><div><strong>${p.name}</strong>${p.isOut ? `<span class="player-status">(KELUAR - ${p.role})</span>` : `<span class="player-status">(Skor: ${p.score})</span>`}</div>`; playersDisplay.appendChild(d); }); };
    deactivateVotingMode = () => { if (activateVotingButton) {activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button');} if(votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; document.querySelectorAll('#playersDisplay .player-info.votable').forEach(pc => pc.classList.remove('votable')); document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote')); isVotingModeActive = false; };
    triggerTruthOrDare = (player, reason) => { if(punishedPlayerName) punishedPlayerName.textContent = `${player.name} (${reason})`; if(truthOrDareSection) truthOrDareSection.classList.remove('hidden'); };
    
    checkGameContinuationOrEnd = () => {
        if (aFoolHasWon) { endGame("The Fool Menang!"); return; }
        const remainingPlayers = players.filter(p => !p.isOut);
        const remainingCivilians = remainingPlayers.filter(p => p.role === "Civilian");
        const remainingUndercovers = remainingPlayers.filter(p => p.role === "Undercover");
        const remainingMrWhites = remainingPlayers.filter(p => p.role === "Mr. White");
        // The Fool sudah ditangani jika dia divote keluar. Jika The Fool tidak divote dan menang, perlu logika lain (tidak ada di sini).
    
        if (remainingUndercovers.length === 0 && remainingMrWhites.length === 0 && (initialFoolsCount === 0 || players.find(p=>p.role==="The Fool" && p.isOut && !aFoolHasWon))) {
            playSound(winSound);
            players.filter(p => p.role === "Civilian").forEach(p => p.score++);
            if (initialFoolsCount > 0 && players.find(p=>p.role==="The Fool" && !p.isOut)) { players.find(p=>p.role==="The Fool").score++; }
            savePlayerScores();
            endGame("Semua Undercover & Mr. White telah keluar! Civilian MENANG!");
        } else if (remainingCivilians.length === 0 && (initialFoolsCount === 0 || players.find(p=>p.role==="The Fool" && p.isOut && !aFoolHasWon))) {
            playSound(winSound);
            remainingUndercovers.forEach(p => p.score++);
            remainingMrWhites.forEach(p => p.score++);
             if (initialFoolsCount > 0 && players.find(p=>p.role==="The Fool" && !p.isOut)) { players.find(p=>p.role==="The Fool").score++; }
            savePlayerScores();
            endGame("Semua Civilian telah keluar! Undercover & Mr. White MENANG!");
        } else if (remainingPlayers.length <= 2 && (remainingUndercovers.length > 0 || remainingMrWhites.length > 0) && (initialFoolsCount === 0 || players.find(p=>p.role==="The Fool" && p.isOut && !aFoolHasWon))) {
             playSound(winSound);
            remainingUndercovers.forEach(p => p.score++);
            remainingMrWhites.forEach(p => p.score++);
            if (initialFoolsCount > 0 && players.find(p=>p.role==="The Fool" && !p.isOut)) { players.find(p=>p.role==="The Fool").score++; }
            savePlayerScores();
            endGame("Sisa pemain terlalu sedikit untuk Civilian menang. Undercover & Mr. White MENANG!");
        } else {
            if(votingSection) votingSection.classList.remove('hidden');
        }
    };
    
    endGame = (message) => { gameInProgress = false; if(gameWinnerP) gameWinnerP.textContent = message; updateActiveSection('gameOverSection'); displayScoresUI(); if(restartGameButton) restartGameButton.classList.remove('hidden'); if(checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden'); };
    savePlayerScores = () => { const scores = {}; players.forEach(p => { scores[p.name] = p.score; }); localStorage.setItem('playerScores_HTV4', JSON.stringify(scores)); };
    displayScoresUI = () => { if (!scoreListUl) return; scoreListUl.innerHTML = ''; players.sort((a, b) => b.score - a.score).forEach(p => { const li = document.createElement('li'); li.innerHTML = `<strong>${p.name}</strong> (${p.role}): ${p.score} poin`; scoreListUl.appendChild(li); }); };
    
    resetGame = () => { 
        players = []; rolesToAssign = []; civilianWord = ''; undercoverWord = ''; currentPlayerSetupIndex = 0; totalPlayersToSetup = 0; selectedAvatarPath = null; 
        gameInProgress = false; initialCiviliansCount = 0; initialFoolsCount = 0; aFoolHasWon = false; currentRoundVotedOut = null; 
        if (roleCountError) roleCountError.textContent = ''; if (nameEntryError) nameEntryError.textContent = ''; 
        deactivateVotingMode(); 
        updateActiveSection('gameSetup_roleConfig'); 
        if(customWordSection) customWordSection.classList.add('hidden'); 
        if(restartGameButton) restartGameButton.classList.add('hidden'); 
        if(checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden'); 
        if(votingSection) votingSection.classList.add('hidden'); 
        if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); 
        if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); 
        if(truthOrDareSection) truthOrDareSection.classList.add('hidden'); 
        if(gameOverSection) gameOverSection.classList.add('hidden'); 
        if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); 
        if(registeredPlayersDisplay) registeredPlayersDisplay.classList.add('hidden'); 
        if(registeredPlayersListUl) registeredPlayersListUl.innerHTML = ''; 
        if(avatarSelectionContainer) avatarSelectionContainer.innerHTML = ''; 
        loadCustomWords(); 
        if (numPlayersInput) numPlayersInput.value = 4; 
        if (numCiviliansInput) numCiviliansInput.value = 2; 
        if (numUndercoversInput) numUndercoversInput.value = 1; 
        if (numMrWhiteInput) numMrWhiteInput.value = 1; 
        if (numFoolsInput) numFoolsInput.value = 0; 
        if (bgMusic && toggleMusicButtonElem) { 
            if (bgMusic.paused) toggleMusicButtonElem.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>"; 
            else toggleMusicButtonElem.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>"; 
        } 
        if(backButton) backButton.classList.add('hidden');
    };

    function initializeApp() {
        loadCustomWords();
        updateActiveSection('gameSetup_roleConfig');
        if(customWordSection) customWordSection.classList.add('hidden');
        if(backButton) backButton.classList.add('hidden');
        if(avatarSelectionContainer) avatarSelectionContainer.innerHTML = '';

        if (bgMusic && toggleMusicButtonElem) { // Gunakan toggleMusicButtonElem yang sudah dicek
            if (bgMusic.paused) toggleMusicButtonElem.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            else toggleMusicButtonElem.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
        }
    }

    initializeApp();
});