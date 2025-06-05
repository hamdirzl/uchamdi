document.addEventListener('DOMContentLoaded', () => {
    // --- SECTIONS ---
    const initialConfigSection = document.getElementById('initial-config-section');
    const playerNameInputSection = document.getElementById('player-name-input-section');
    const gameSection = document.getElementById('game-section');
    const mrWhiteGuessSection = document.getElementById('mr-white-guess-section');
    const eliminationResultPopup = document.getElementById('elimination-result-popup');
    const truthOrDareSection = document.getElementById('truth-or-dare-section'); 
    const penaltyDisplayDiv = document.getElementById('penalty-display');
    const winnerPopupModal = document.getElementById('winner-popup-modal');
    const roundOverSection = document.getElementById('round-over-section');
    const finalScoreDisplayModal = document.getElementById('final-score-display-section');
    const cardRevealModal = document.getElementById('card-reveal-modal');

    // --- BUTTONS ---
    const proceedToCardDistributionBtn = document.getElementById('proceed-to-card-distribution-btn');
    const submitNameAndDrawCardBtn = document.getElementById('submit-name-and-draw-card-btn');
    const hideCardAndProceedBtn = document.getElementById('hide-card-and-proceed-btn');
    const roleCardElement = document.getElementById('role-card');
    const confirmEliminationBtn = document.getElementById('confirm-elimination-btn');
    const submitMrWhiteGuessBtn = document.getElementById('submit-mr-white-guess-btn');
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const closeEliminationPopupBtn = document.getElementById('close-elimination-popup-btn');
    const closePopupBtn = document.querySelector('.close-popup-btn');
    const proceedToRoundScoresBtn = document.getElementById('proceed-to-round-scores-btn');
    const playNewRoundBtn = document.getElementById('play-new-round-btn');
    const finishGameShowFinalScoresBtn = document.getElementById('finish-game-show-final-scores-btn');
    const restartGameFullBtn = document.getElementById('restart-game-full-btn');
    const closeFinalScoreBtn = document.querySelector('.close-final-score-btn');
    const restartFromFinalBtn = document.getElementById('restart-from-final-btn');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');

    // --- DISPLAYS & INPUTS ---
    const totalPlayersConfigInput = document.getElementById('total-players-config');
    const civiliansConfigInput = document.getElementById('civilians-config');
    const undercoversConfigInput = document.getElementById('undercovers-config');
    const mrWhitesConfigInput = document.getElementById('mrwhites-config');
    const configErrorP = document.getElementById('config-error');
    const playerNameInputTitleH2 = document.getElementById('player-name-input-title');
    const currentPlayerNameInput = document.getElementById('current-player-name-input');
    const cardRevealPopupTitleH3 = document.getElementById('card-reveal-popup-title');
    const cardPlayerRoleP = document.getElementById('card-player-role');
    const cardPlayerWordP = document.getElementById('card-player-word');
    const activePlayerListUl = document.getElementById('active-player-list');
    const civilianWordDisplay = document.getElementById('civilian-word-display');
    const debugCivilianWordP = document.getElementById('debug-civilian-word');
    const playerToEliminateDisplay = document.getElementById('player-to-eliminate-display');
    const mrWhiteNameGuessStrong = document.getElementById('mr-white-name-guess');
    const mrWhiteWordGuessInput = document.getElementById('mr-white-word-guess-input');
    const eliminatedPlayerInfoH3 = document.getElementById('eliminated-player-info');
    const penaltyTextP = document.getElementById('penalty-text');
    const roundOverTitleH2 = document.getElementById('round-over-title');
    const roundRolesListUl = document.getElementById('round-roles-list');
    const roundPlayerScoresListUl = document.getElementById('round-player-scores-list');
    const popupWinnerMessageH2 = document.getElementById('popup-winner-message');
    const popupWinnerDetailP = document.getElementById('popup-winner-detail');
    const finalCumulativeScoresListUl = document.getElementById('final-cumulative-scores-list');

    // --- AUDIO ASSETS ---
    const clickSound = new Audio(); 
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;
    let audioContextResumed = false; // Flag untuk memastikan konteks audio diaktifkan oleh interaksi pengguna
    let audioFilesSetup = false; // Flag untuk status setup path file audio

    // --- GAME STATE ---
    let players = [];
    let configuredTotalPlayers = 0;
    let initialCiviliansCount = 0; let initialUndercoversCount = 0; let initialMrWhitesCount = 0;
    let rolesToDistribute = [];
    let currentPlayerIndex = 0;
    let civilianWord = ""; let undercoverWord = "";
    let gameInProgress = false; let eliminatedThisRoundPlayer = null;
    let currentWinningTeamType = null; let currentWinnerPlayerObjects = [];
    let isInitialSetupPhase = true;
    let playerSelectedForElimination = null;

    const POINTS_MW_GUESS_WIN = 7; const POINTS_UC_WIN = 5; const POINTS_MW_SURVIVAL_WIN = 5;
    const POINTS_CIVILIAN_TEAM_WIN_SURVIVED = 3; const POINTS_CIVILIAN_TEAM_WIN_ELIMINATED = 1;
    const POINTS_LOSER = 0;

    const wordPairs = [
        { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" }, 
        { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" },
        { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" },
        { civilian: "Hujan", undercover: "Salju" }, { civilian: "Sungai", undercover: "Danau" }, { civilian: "Gitar", undercover: "Piano" },
        { civilian: "Kopi", undercover: "Teh" }, { civilian: "Sendok", undercover: "Garpu" }, { civilian: "Gunung", undercover: "Bukit" },
        { civilian: "Laptop", undercover: "Komputer" }, { civilian: "Sepatu", undercover: "Sandal" }, { civilian: "Matahari", undercover: "Bulan" },
        { civilian: "Pintu", undercover: "Jendela" }, { civilian: "Meja", undercover: "Kursi" }
    ];
    const truths = [ "Apa hal paling memalukan minggu ini?", "Hewan apa kamu & kenapa?", "Siapa paling bikin ketawa disini?", "Kebiasaan burukmu?", "Film/serial favorit sepanjang masa?", "Nemu dompet isi uang, kamu apain?", "Hal konyol dipercaya waktu kecil?", "Tokoh fiksi inspiratif?", "Makanan aneh pernah dicoba?", "Satu permintaan, minta apa?", "Lagu guilty pleasure?", "Bakat terpendammu?", "Liburan paling berkesan?", "Guru/dosen paling berpengaruh?", "Mimpi teraneh?" ];
    const dares = [ "Tiru suara kartun 15d.", "Tarian robot 30d.", "Sebut 5 benda merah 10d.", "Jadi reporter kejadian aneh.", "Nyanyi reff 'Balonku' gaya opera.", "Cerita lelucon.", "Jalan mundur keliling meja.", "Mata tertutup tebak 3 benda.", "Puji 3 orang disini.", "10 push-up/squat/jumping jack.", "Bicara aksen daerah lain 1m.", "Buat wajah paling lucu.", "Peluk (izin) pemain kananmu.", "Telepon teman nyanyi HBD.", "Pakai kaus kaki jadi sarung tangan." ];

    // --- AUDIO SETUP ---
    function setupAudioFiles() {
        if (audioFilesSetup) return; 
        try {
            clickSound.src = 'assets/sounds/click.mp3'; 
            clickSound.volume = 0.5; // Sedikit turunkan volume klik
            
            if (backgroundMusic) {
                 backgroundMusic.src = 'assets/music/bg_music.mp3'; 
                 backgroundMusic.volume = 0.15; // Turunkan volume BGM agar tidak terlalu dominan
                 console.log("Path file audio berhasil di-set. BGM src:", backgroundMusic.src);
                 audioFilesSetup = true;
            } else {
                console.warn("Elemen audio background-music tidak ditemukan saat setup file.");
            }
        } catch (e) {
            console.warn("Gagal memuat file audio (path atau format mungkin salah):", e);
        }
    }

    function playClickSound() {
        if (audioContextResumed && audioFilesSetup && clickSound.src && clickSound.readyState >= 2) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => { /* Biarkan browser menangani error autoplay minor di sini */ });
        }
    }
    
    // Mengaktifkan konteks audio setelah interaksi pengguna pertama
    function resumeAudioContext() {
        if (!audioContextResumed) {
            // Beberapa browser memerlukan ini untuk audio agar bisa diputar setelah interaksi
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            setupAudioFiles(); // Setup path file audio setelah konteks siap
            audioContextResumed = true;
            console.log("Konteks audio diaktifkan oleh interaksi pengguna.");
        }
    }
    document.body.addEventListener('click', resumeAudioContext, { once: true });
    document.body.addEventListener('touchstart', resumeAudioContext, { once: true }); // Untuk mobile


    if (toggleMusicBtn && backgroundMusic) { 
        toggleMusicBtn.addEventListener('click', () => {
            playClickSound();
            resumeAudioContext(); // Pastikan konteks audio aktif

            if (!audioFilesSetup) { // Jika path belum di-set, coba set lagi
                setupAudioFiles();
            }
            
            if (!backgroundMusic.src || backgroundMusic.src === window.location.href) { // Cek src valid
                 console.error("Path musik latar tidak valid atau belum di-set:", backgroundMusic.src);
                 alert("Musik latar tidak dapat dimuat. Periksa path file.");
                 toggleMusicBtn.innerHTML = '⚠️';
                 toggleMusicBtn.title = "Musik Error Path";
                 return;
            }

            if (isMusicPlaying) {
                backgroundMusic.pause();
                isMusicPlaying = false; 
                toggleMusicBtn.innerHTML = '🎵';
                toggleMusicBtn.title = "Putar Musik";
            } else {
                const playPromise = backgroundMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isMusicPlaying = true; 
                        toggleMusicBtn.innerHTML = '🔇';
                        toggleMusicBtn.title = "Hentikan Musik";
                    }).catch(error => {
                        console.error("Error saat memutar musik:", error);
                        isMusicPlaying = false; 
                        toggleMusicBtn.innerHTML = '⚠️';
                        toggleMusicBtn.title = "Musik Gagal Diputar";
                        if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') { 
                            alert("Browser mungkin memblokir pemutaran musik. Coba klik tombol musik lagi atau periksa pengaturan browser Anda.");
                        }
                    });
                }
            }
        });
    } else {
        if(!toggleMusicBtn) console.warn("Tombol toggle musik (#toggle-music-btn) tidak ditemukan.");
        if(!backgroundMusic) console.warn("Elemen audio (#background-music) tidak ditemukan.");
    }

    // --- EVENT LISTENERS (dengan playClickSound()) ---
    proceedToCardDistributionBtn.addEventListener('click', () => { playClickSound(); validateConfigAndProceed(); });
    submitNameAndDrawCardBtn.addEventListener('click', () => { playClickSound(); handleSubmitNameAndDrawCard(); });
    roleCardElement.addEventListener('click', () => { playClickSound(); handleCardFlip(); });
    hideCardAndProceedBtn.addEventListener('click', () => { playClickSound(); handleProceedAfterCardView(); });
    activePlayerListUl.addEventListener('click', (event) => { playClickSound(); handleAvatarVoteSelection(event); });
    confirmEliminationBtn.addEventListener('click', () => { playClickSound(); handleConfirmElimination(); });
    submitMrWhiteGuessBtn.addEventListener('click', () => { playClickSound(); handleMrWhiteGuess(); });
    truthBtn.addEventListener('click', () => { playClickSound(); applyPenalty('truth'); });
    dareBtn.addEventListener('click', () => { playClickSound(); applyPenalty('dare'); });
    closeEliminationPopupBtn.addEventListener('click', () => { playClickSound(); handleCloseEliminationPopup(); });
    closePopupBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    proceedToRoundScoresBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    playNewRoundBtn.addEventListener('click', () => { playClickSound(); startNewRoundWithSameTeam(); });
    finishGameShowFinalScoresBtn.addEventListener('click', () => { playClickSound(); showFinalScoreboard(); });
    restartGameFullBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    closeFinalScoreBtn.addEventListener('click', () => { playClickSound(); finalScoreDisplayModal.classList.add('hidden'); });
    restartFromFinalBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });


    function resetGameFull() {
        isInitialSetupPhase = true;
        players = []; configuredTotalPlayers = 0; rolesToDistribute = []; currentPlayerIndex = 0;
        initialCiviliansCount = 0; initialUndercoversCount = 0; initialMrWhitesCount = 0;
        civilianWord = ""; undercoverWord = ""; gameInProgress = false; eliminatedThisRoundPlayer = null;
        currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        playerSelectedForElimination = null;

        if(isMusicPlaying && backgroundMusic && backgroundMusic.src && backgroundMusic.src !== window.location.href) { 
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            toggleMusicBtn.innerHTML = '🎵';
            toggleMusicBtn.title = "Putar Musik";
            isMusicPlaying = false;
        }
        // audioFilesSetup dan audioContextResumed tidak direset agar setup audio tidak perlu diulang per game,
        // kecuali jika memang diinginkan (misal, ganti tema suara)

        totalPlayersConfigInput.value = "3"; civiliansConfigInput.value = "1";
        undercoversConfigInput.value = "1"; mrWhitesConfigInput.value = "1";
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';

        initialConfigSection.classList.remove('hidden');
        playerNameInputSection.classList.add('hidden');
        cardRevealModal.classList.add('hidden');
        gameSection.classList.add('hidden');
        winnerPopupModal.classList.add('hidden');
        roundOverSection.classList.add('hidden');
        finalScoreDisplayModal.classList.add('hidden');
        eliminationResultPopup.classList.add('hidden'); 

        mrWhiteGuessSection.classList.add('hidden'); 
        truthOrDareSection.classList.remove('hidden'); 
        penaltyDisplayDiv.classList.add('hidden');
        closeEliminationPopupBtn.classList.add('hidden'); 
        debugCivilianWordP.style.display = 'none';

        activePlayerListUl.innerHTML = '';
        playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true;
        roundRolesListUl.innerHTML = '';
        roundPlayerScoresListUl.innerHTML = '';
        finalCumulativeScoresListUl.innerHTML = '';
        resetTruthOrDareButtons();
    }

    function validateConfigAndProceed() {
        const total = parseInt(totalPlayersConfigInput.value);
        const civ = parseInt(civiliansConfigInput.value);
        const uc = parseInt(undercoversConfigInput.value);
        const mw = parseInt(mrWhitesConfigInput.value);

        configErrorP.classList.add('hidden'); configErrorP.textContent = '';
        if (isNaN(total) || isNaN(civ) || isNaN(uc) || isNaN(mw)) { showConfigError("Semua field jumlah harus diisi dengan angka."); return; }
        if (total < 3) { showConfigError("Jumlah total pemain minimal 3."); return; }
        if (civ < 1) { showConfigError("Minimal harus ada 1 Civilian."); return; }
        if (uc < 0 || mw < 0) { showConfigError("Jumlah Undercover atau Mr. White tidak boleh negatif."); return; }
        if (civ + uc + mw !== total) { showConfigError(`Jumlah peran (${civ + uc + mw}) tidak sama dengan Total Pemain (${total}).`); return; }

        configuredTotalPlayers = total;
        initialCiviliansCount = civ; initialUndercoversCount = uc; initialMrWhitesCount = mw;
        generateRolesToDistribute(); selectNewWordPair();
        players = []; currentPlayerIndex = 0;
        isInitialSetupPhase = true;
        startInitialNameInputPhase();
    }

    function generateRolesToDistribute() { rolesToDistribute = []; for (let i = 0; i < initialCiviliansCount; i++) rolesToDistribute.push("Civilian"); for (let i = 0; i < initialUndercoversCount; i++) rolesToDistribute.push("Undercover"); for (let i = 0; i < initialMrWhitesCount; i++) rolesToDistribute.push("Mr. White"); for (let i = rolesToDistribute.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]]; } }
    function selectNewWordPair() { if (wordPairs.length === 0) { civilianWord = "KataCivDefault"; undercoverWord = "KataUCDefault"; return; } const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)]; civilianWord = selectedPair.civilian; undercoverWord = selectedPair.undercover; /*debugCivilianWordP.style.display = 'block'; civilianWordDisplay.textContent = civilianWord;*/ }
    function showConfigError(message) { configErrorP.textContent = message; configErrorP.classList.remove('hidden'); }

    function startInitialNameInputPhase() {
        initialConfigSection.classList.add('hidden');
        playerNameInputSection.classList.remove('hidden');
        prepareForNextPlayerNameInput();
    }

    function prepareForNextPlayerNameInput() {
        playerNameInputTitleH2.textContent = `👤 Masukkan Nama Pemain ${currentPlayerIndex + 1} dari ${configuredTotalPlayers}`;
        currentPlayerNameInput.value = ''; currentPlayerNameInput.focus();
        submitNameAndDrawCardBtn.disabled = false;
    }

    function handleSubmitNameAndDrawCard() {
        const playerName = currentPlayerNameInput.value.trim();
        if (!playerName) { alert("Nama pemain tidak boleh kosong!"); return; }
        submitNameAndDrawCardBtn.disabled = true;

        const assignedRole = rolesToDistribute[currentPlayerIndex];
        let assignedWord = "";
        if (assignedRole === "Civilian") assignedWord = civilianWord;
        else if (assignedRole === "Undercover") assignedWord = undercoverWord;
        else if (assignedRole === "Mr. White") assignedWord = "Anda tidak punya kata. Amati!";
        
        const avatarIndex = (players.length % 6) + 1;
        const avatarUrl = `assets/images/avatar${avatarIndex}.png`;
        
        players.push({ name: playerName, role: assignedRole, word: assignedWord, isEliminated: false, originalRole: assignedRole, score: 0, avatar: avatarUrl });
        
        playerNameInputSection.classList.add('hidden');
        showRoleOnCard(playerName, assignedRole, assignedWord);
    }
    
    function prepareNewRoundRoleReveal() {
        const currentPlayer = players[currentPlayerIndex];
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        let assignedWord = "";
        if (assignedRole === "Civilian") assignedWord = civilianWord;
        else if (assignedRole === "Undercover") assignedWord = undercoverWord;
        else if (assignedRole === "Mr. White") assignedWord = "Anda tidak punya kata. Amati!";
        
        currentPlayer.role = assignedRole; 
        currentPlayer.word = assignedWord; 
        
        showRoleOnCard(currentPlayer.name, currentPlayer.role, currentPlayer.word);
    }

    function showRoleOnCard(playerName, role, word) {
        cardRevealPopupTitleH3.textContent = `Kartu untuk ${playerName}`;
        cardPlayerRoleP.textContent = role;
        cardPlayerWordP.textContent = word;
        roleCardElement.classList.remove('is-flipped');
        hideCardAndProceedBtn.classList.add('hidden');
        cardRevealModal.classList.remove('hidden');
    }

    function handleCardFlip() {
        if (!roleCardElement.classList.contains('is-flipped')) {
            roleCardElement.classList.add('is-flipped');
            hideCardAndProceedBtn.classList.remove('hidden');
        }
    }

    function handleProceedAfterCardView() {
        cardRevealModal.classList.add('hidden');
        currentPlayerIndex++;

        if (currentPlayerIndex < configuredTotalPlayers) {
            if (isInitialSetupPhase) {
                playerNameInputSection.classList.remove('hidden');
                prepareForNextPlayerNameInput();
            } else {
                prepareNewRoundRoleReveal();
            }
        } else {
            isInitialSetupPhase = false;
            startGamePlay();
        }
    }

    function startGamePlay() {
        gameInProgress = true;
        players.forEach(p => { p.isEliminated = false; });
        playerSelectedForElimination = null;
        playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true;

        gameSection.classList.remove('hidden');
        eliminationResultPopup.classList.add('hidden'); 
        mrWhiteGuessSection.classList.add('hidden');
        roundOverSection.classList.add('hidden');
        updateActivePlayerListWithAvatars();
        document.getElementById('voting-phase').classList.remove('hidden');
        document.getElementById('discussion-phase').classList.remove('hidden');
        resetTruthOrDareButtons();
    }

    function startNewRoundFlow() { 
        eliminationResultPopup.classList.add('hidden'); 
        resetTruthOrDareButtons(); 
        checkWinConditionsAndProceed(); 
    }

    function startNewRoundWithSameTeam() {
        roundOverSection.classList.add('hidden');
        winnerPopupModal.classList.add('hidden');
        isInitialSetupPhase = false;
        generateRolesToDistribute(); 
        selectNewWordPair();
        currentPlayerIndex = 0; 

        initialConfigSection.classList.add('hidden');
        playerNameInputSection.classList.add('hidden');
        gameSection.classList.add('hidden');
        finalScoreDisplayModal.classList.add('hidden');
        
        prepareNewRoundRoleReveal(); 
    }

    function updateActivePlayerListWithAvatars() {
        activePlayerListUl.innerHTML = '';
        const activePlayers = players.filter(p => !p.isEliminated);

        if (activePlayers.length === 0 && gameInProgress) {
             checkWinConditionsAndProceed(); 
            return;
        }

        activePlayers.forEach(player => {
            const li = document.createElement('li');
            li.dataset.playerName = player.name;
            li.classList.add('player-avatar-card');
            if (player.name === playerSelectedForElimination) {
                li.classList.add('selected-for-vote');
            }
            const img = document.createElement('img');
            img.src = player.avatar;
            img.alt = `Avatar untuk ${player.name}`;
            img.classList.add('player-avatar-img');
            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name;
            nameSpan.classList.add('player-avatar-name');
            li.appendChild(img);
            li.appendChild(nameSpan);
            activePlayerListUl.appendChild(li);
        });
        confirmEliminationBtn.disabled = !playerSelectedForElimination;
    }

    function handleAvatarVoteSelection(event) {
        if (!gameInProgress) return;
        const clickedLi = event.target.closest('.player-avatar-card');
        if (!clickedLi || clickedLi.classList.contains('eliminated')) return;

        const previouslySelectedCard = activePlayerListUl.querySelector('.selected-for-vote');
        
        if (clickedLi === previouslySelectedCard) { 
            clickedLi.classList.remove('selected-for-vote');
            playerSelectedForElimination = null;
            playerToEliminateDisplay.textContent = "Belum ada";
            confirmEliminationBtn.disabled = true;
        } else {
            if (previouslySelectedCard) {
                previouslySelectedCard.classList.remove('selected-for-vote');
            }
            clickedLi.classList.add('selected-for-vote');
            playerSelectedForElimination = clickedLi.dataset.playerName;
            playerToEliminateDisplay.textContent = playerSelectedForElimination;
            confirmEliminationBtn.disabled = false;
        }
    }

    function handleConfirmElimination() {
        if (!playerSelectedForElimination) {
            alert("Silakan pilih pemain yang akan dieliminasi dengan mengklik avatar mereka.");
            return;
        }
        eliminatedThisRoundPlayer = players.find(p => p.name === playerSelectedForElimination);
        if (!eliminatedThisRoundPlayer) return; 

        eliminatedThisRoundPlayer.isEliminated = true;
        
        document.getElementById('voting-phase').classList.add('hidden'); 
        document.getElementById('discussion-phase').classList.add('hidden');
        
        if (eliminatedThisRoundPlayer.role === "Mr. White") {
            mrWhiteGuessSection.classList.remove('hidden'); 
            mrWhiteNameGuessStrong.textContent = eliminatedThisRoundPlayer.name; 
            // eliminatedPlayerInfoH3.textContent = `😱 ${eliminatedThisRoundPlayer.name} ternyata adalah Mr. White!`; // Bisa ditampilkan di atas input tebakan
        } else {
            eliminatedPlayerInfoH3.textContent = `💀 ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role}) telah tereliminasi.`;
            resetTruthOrDareButtons();
            truthOrDareSection.classList.remove('hidden'); 
            closeEliminationPopupBtn.classList.add('hidden'); 
            eliminationResultPopup.classList.remove('hidden');
        }
        playerSelectedForElimination = null; 
        playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true;
        updateActivePlayerListWithAvatars(); 
    }
    
    function handleCloseEliminationPopup() {
        eliminationResultPopup.classList.add('hidden');
        resetTruthOrDareButtons(); 
        checkWinConditionsAndProceed(); 
    }

    function handleMrWhiteGuess() { 
        const guess = mrWhiteWordGuessInput.value.trim(); 
        mrWhiteGuessSection.classList.add('hidden'); 
        mrWhiteWordGuessInput.value = ''; 
        if (guess.toLowerCase() === civilianWord.toLowerCase()) { 
            announceWinner("MR_WHITE_GUESS", [eliminatedThisRoundPlayer]); 
        } else { 
            eliminatedPlayerInfoH3.textContent = `❌ ${eliminatedThisRoundPlayer.name} (Mr. White) gagal menebak kata dan tereliminasi.`;
            resetTruthOrDareButtons();
            truthOrDareSection.classList.remove('hidden');
            closeEliminationPopupBtn.classList.add('hidden');
            eliminationResultPopup.classList.remove('hidden');
        } 
    }
    
    function checkWinConditionsAndProceed() {
        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

        if (activePlayers.length === 0 && gameInProgress === false) { return; }

        let gameShouldEnd = false;
        let winners = []; 
        let winType = "";

        if (activeCivilians.length === 0) {
            gameShouldEnd = true;
            const survivingUndercovers = activeUndercovers.filter(p => !p.isEliminated);
            const survivingMrWhite = activeMrWhite.filter(p => !p.isEliminated);

            if (survivingUndercovers.length > 0 && survivingMrWhite.length > 0) { winType = "UC_MW_SURVIVAL"; winners.push(...survivingUndercovers, ...survivingMrWhite); }
            else if (survivingUndercovers.length > 0) { winType = "UC_SURVIVAL"; winners.push(...survivingUndercovers); }
            else if (survivingMrWhite.length > 0) { winType = "MW_SURVIVAL"; winners.push(...survivingMrWhite); }
            else if (activePlayers.length > 0 && activePlayers.every(p => p.role !== 'Civilian')) { winType = "NON_CIVILIAN_SURVIVAL"; winners = activePlayers; }
            else if (activePlayers.length === 0) { winType = "NO_WINNER_DRAW"; }
        }
        else if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
            if (activeCivilians.length > 0) { gameShouldEnd = true; winType = "CIVILIAN_TEAM"; winners = activeCivilians.filter(p => !p.isEliminated); }
        }
        
        if (gameShouldEnd && winType) { 
            announceWinner(winType, winners);
        } else if (gameInProgress) { 
            updateActivePlayerListWithAvatars(); 
            document.getElementById('discussion-phase').classList.remove('hidden'); 
            document.getElementById('voting-phase').classList.remove('hidden'); 
            playerSelectedForElimination = null;
            playerToEliminateDisplay.textContent = "Belum ada";
            confirmEliminationBtn.disabled = true;
            resetTruthOrDareButtons(); 
            eliminationResultPopup.classList.add('hidden');
        }
    }

    function announceWinner(winningTeamType, winnerPlayerObjects = []) {
        gameInProgress = false; currentWinningTeamType = winningTeamType; currentWinnerPlayerObjects = winnerPlayerObjects;
        let popupMsg = "🎉 Selamat! 🎉"; let popupDetail = "";
        switch (winningTeamType) {
            case "MR_WHITE_GUESS": popupMsg = `🎉 Luar Biasa, ${winnerPlayerObjects[0].name}! 🎉`; popupDetail = "Anda (Mr. White) berhasil menebak kata rahasia Civilian!"; break;
            case "UC_SURVIVAL": popupDetail = "Tim Undercover berhasil bertahan hingga akhir!"; if (winnerPlayerObjects.length === 1) popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Undercover)! 🎉`; else popupMsg = `🎉 Selamat, Tim Undercover! 🎉`; break;
            case "MW_SURVIVAL": popupDetail = "Mr. White berhasil bertahan hingga semua Civilian tersingkir!"; if (winnerPlayerObjects.length === 1) popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Mr. White)! 🎉`; else popupMsg = `🎉 Selamat, Mr. White! 🎉`; break;
            case "UC_MW_SURVIVAL": popupDetail = "Tim Undercover dan Mr. White berhasil mengeliminasi semua Civilian!"; popupMsg = `🎉 Selamat, Tim Undercover & Mr. White! 🎉`; break;
            case "CIVILIAN_TEAM": popupDetail = "Tim Civilian berhasil mengungkap semua penjahat!"; popupMsg = `🎉 Selamat, Tim Civilian! 🎉`; break;
            case "NON_CIVILIAN_SURVIVAL": popupDetail = "Semua Civilian telah tereliminasi!"; popupMsg = `🎉 Kemenangan untuk Tim Non-Civilian! 🎉`; break;
            case "NO_WINNER_DRAW": popupDetail = "Permainan berakhir tanpa pemenang yang jelas."; popupMsg = "Hasil Imbang!"; break;
            default: popupDetail = "Permainan telah berakhir.";
        }
        popupWinnerMessageH2.textContent = popupMsg; popupWinnerDetailP.textContent = popupDetail;
        winnerPopupModal.classList.remove('hidden');
        gameSection.classList.add('hidden'); 
        eliminationResultPopup.classList.add('hidden');
        mrWhiteGuessSection.classList.add('hidden');
    }

    function closeWinnerPopupAndShowRoundScores() { winnerPopupModal.classList.add('hidden'); displayRoundOverDetails(); }

    function displayRoundOverDetails() {
        calculateAndDisplayRoundScores(); 
        roundOverTitleH2.textContent = "🏁 Babak Selesai! 🏁"; roundRolesListUl.innerHTML = '';
        players.forEach(p => { 
            const li = document.createElement('li'); 
            let status = p.isEliminated ? 'Tereliminasi' : 'Selamat (Babak Ini)'; 
            const isWinnerThisSpecificRound = currentWinnerPlayerObjects.some(wp => wp.name === p.name);
            if (isWinnerThisSpecificRound) { status = '🎉 MENANG (Babak Ini) 🎉'; }
            li.innerHTML = `<strong>${p.name}</strong>: ${p.role} <span style="font-style:italic; color: #555;">(Kata: ${p.role === "Mr. White" ? "N/A" : p.word})</span> - ${status}`; 
            roundRolesListUl.appendChild(li); 
        });
        debugCivilianWordP.style.display = 'block'; civilianWordDisplay.textContent = civilianWord;
        roundOverSection.classList.remove('hidden');
        document.getElementById('round-scoring-section').classList.remove('hidden');
        
        truthOrDareSection.classList.add('hidden'); // Pastikan T&D tidak tampil di layar akhir babak
    }

    function calculateAndDisplayRoundScores() {
        roundPlayerScoresListUl.innerHTML = ''; players.forEach(player => {
            let roundScore = POINTS_LOSER;
            const isWinnerThisRoundObject = currentWinnerPlayerObjects.find(wp => wp.name === player.name);

            switch (currentWinningTeamType) {
                case "MR_WHITE_GUESS": if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) { roundScore = POINTS_MW_GUESS_WIN; } break;
                case "UC_SURVIVAL": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) { roundScore = POINTS_UC_WIN; } break;
                case "MW_SURVIVAL": if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) { roundScore = POINTS_MW_SURVIVAL_WIN; } break;
                case "UC_MW_SURVIVAL": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) { roundScore = POINTS_UC_WIN; } else if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) { roundScore = POINTS_MW_SURVIVAL_WIN; } break;
                case "CIVILIAN_TEAM":
                    if (player.originalRole === "Civilian") {
                        const civilianTeamActuallyWon = currentWinnerPlayerObjects.some(wp => wp.originalRole === "Civilian");
                        if (civilianTeamActuallyWon) {
                           if (!player.isEliminated) { roundScore = POINTS_CIVILIAN_TEAM_WIN_SURVIVED; } 
                           else { roundScore = POINTS_CIVILIAN_TEAM_WIN_ELIMINATED; }
                        }
                    }
                    break;
                case "NON_CIVILIAN_SURVIVAL": 
                    if (player.originalRole === "Undercover" && isWinnerThisRoundObject) roundScore = POINTS_UC_WIN; 
                    else if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_SURVIVAL_WIN; 
                    break;
            } 
            player.score += roundScore; 
            const scoreLi = document.createElement('li'); 
            scoreLi.innerHTML = `${player.name} (${player.role}): <strong>+${roundScore} Poin</strong> (Total: ${player.score})`; 
            roundPlayerScoresListUl.appendChild(scoreLi);
        });
    }

    function showFinalScoreboard() {
        roundOverSection.classList.add('hidden'); winnerPopupModal.classList.add('hidden'); gameSection.classList.add('hidden'); 
        finalCumulativeScoresListUl.innerHTML = ''; const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        sortedPlayers.forEach(player => { const li = document.createElement('li'); li.innerHTML = `${player.name} (${player.originalRole}): <span class="score-value">${player.score} Poin</span>`; finalCumulativeScoresListUl.appendChild(li); });
        finalScoreDisplayModal.classList.remove('hidden');
    }

    function applyPenalty(type) { 
        let item; 
        if (type === 'truth') { item = truths[Math.floor(Math.random() * truths.length)]; penaltyTextP.textContent = `😇 TRUTH: ${item}`; } 
        else { item = dares[Math.floor(Math.random() * dares.length)]; penaltyTextP.textContent = `😈 DARE: ${item}`; } 
        penaltyDisplayDiv.classList.remove('hidden'); 
        truthBtn.disabled = true; dareBtn.disabled = true;
        closeEliminationPopupBtn.classList.remove('hidden'); 
    }
    function resetTruthOrDareButtons() { 
        truthBtn.disabled = false; dareBtn.disabled = false; 
        penaltyDisplayDiv.classList.add('hidden'); penaltyTextP.textContent = '';
        closeEliminationPopupBtn.classList.add('hidden'); 
    }

    resetGameFull(); // Panggil reset di akhir untuk inisialisasi tampilan
});