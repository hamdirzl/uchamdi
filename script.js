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
    const confettiAnimation = document.getElementById('confetti-animation');
    const musicSettingsModal = document.getElementById('music-settings-modal');

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
    const closePopupBtn = document.querySelector('#winner-popup-modal .close-popup-btn');
    const proceedToRoundScoresBtn = document.getElementById('proceed-to-round-scores-btn');
    const playNewRoundBtn = document.getElementById('play-new-round-btn');
    const finishGameShowFinalScoresBtn = document.getElementById('finish-game-show-final-scores-btn');
    const restartGameFullBtn = document.getElementById('restart-game-full-btn');
    const closeFinalScoreBtn = document.querySelector('#final-score-display-section .close-final-score-btn');
    const restartFromFinalBtn = document.getElementById('restart-from-final-btn');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    const openMusicSettingsBtn = document.getElementById('open-music-settings-btn');
    const confirmMusicBtn = document.getElementById('confirm-music-btn');
    const closeMusicSettingsBtn = musicSettingsModal.querySelector('.close-popup-btn');

    // --- DISPLAYS & INPUTS ---
    const totalPlayersConfigInput = document.getElementById('total-players-config');
    const civiliansConfigInput = document.getElementById('civilians-config');
    const undercoversConfigInput = document.getElementById('undercovers-config');
    const mrWhitesConfigInput = document.getElementById('mrwhites-config');
    const musicSelection = document.getElementById('music-selection');
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
    const popupWinnerMessageH2 = document.getElementById('popup-winner-message');
    const popupWinnerDetailP = document.getElementById('popup-winner-detail');
    const finalCumulativeScoresTbody = document.getElementById('final-cumulative-scores-list');


    // --- AUDIO ASSETS ---
    const clickSound = new Audio();
    const backgroundMusic = document.getElementById('background-music');
    const loseSound = new Audio();
    const winSound = new Audio();

    const backgroundMusicTracks = [ 'assets/music/bg_music.mp3', 'assets/music/bg_music2.mp3', 'assets/music/bg_music3.mp3' ];
    let musicTrackIndex = 0;
    let isMusicPlaying = false;
    let musicManuallyPaused = true;
    let audioContextResumed = false;
    let audioFilesSetup = false;

    // --- GAME STATE ---
    let players = [];
    let configuredTotalPlayers = 0;
    let initialCiviliansCount = 0; let initialUndercoversCount = 0; let initialMrWhitesCount = 0;
    let rolesToDistribute = [];
    let currentPlayerIndex = 0;
    let civilianWord = ""; let undercoverWord = "";
    let gameInProgress = true;
    let eliminatedThisRoundPlayer = null;
    let currentWinningTeamType = null;
    let currentWinnerPlayerObjects = [];
    let isInitialSetupPhase = true;
    let playerSelectedForElimination = null;

    const POINTS_MW_GUESS_WIN = 7; const POINTS_UC_WIN = 5; const POINTS_MW_SURVIVAL_WIN = 5;
    const POINTS_CIVILIAN_TEAM_WIN_SURVIVED = 3; const POINTS_CIVILIAN_TEAM_WIN_ELIMINATED = 1;
    const POINTS_LOSER = 0;

    const wordPairs = [ { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" }, { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" }, { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" }, { civilian: "Hujan", undercover: "Salju" }, { civilian: "Sungai", undercover: "Danau" }, { civilian: "Gitar", undercover: "Piano" }, { civilian: "Kopi", undercover: "Teh" }, { civilian: "Sendok", undercover: "Garpu" }, { civilian: "Gunung", undercover: "Bukit" }, { civilian: "Laptop", undercover: "Komputer" }, { civilian: "Sepatu", undercover: "Sandal" }, { civilian: "Matahari", undercover: "Bulan" }, { civilian: "Pintu", undercover: "Jendela" }, { civilian: "Meja", undercover: "Kursi" } ];
    const truths = [ "Apa hal paling memalukan minggu ini?", "Hewan apa kamu & kenapa?", "Siapa paling bikin ketawa disini?", "Kebiasaan burukmu?", "Film/serial favorit sepanjang masa?", "Nemu dompet isi uang, kamu apain?", "Hal konyol dipercaya waktu kecil?", "Tokoh fiksi inspiratif?", "Makanan aneh pernah dicoba?", "Satu permintaan, minta apa?", "Lagu guilty pleasure?", "Bakat terpendammu?", "Liburan paling berkesan?", "Guru/dosen paling berpengaruh?", "Mimpi teraneh?" ];
    const dares = [ "Tiru suara kartun 15d.", "Tarian robot 30d.", "Sebut 5 benda merah 10d.", "Jadi reporter kejadian aneh.", "Nyanyi reff 'Balonku' gaya opera.", "Cerita lelucon.", "Jalan mundur keliling meja.", "Mata tertutup tebak 3 benda.", "Puji 3 orang disini.", "10 push-up/squat/jumping jack.", "Bicara aksen daerah lain 1m.", "Buat wajah paling lucu.", "Peluk (izin) pemain kananmu.", "Telepon teman nyanyi HBD.", "Pakai kaus kaki jadi sarung tangan." ];

    function switchScreen(screenToHide, screenToShow) {
        if (screenToHide) {
            screenToHide.classList.add('hidden');
            screenToHide.classList.remove('animate-section-in');
        }
        if (screenToShow) {
            screenToShow.classList.remove('hidden');
            screenToShow.classList.add('animate-section-in');
            screenToShow.addEventListener('animationend', () => {
                screenToShow.classList.remove('animate-section-in');
            }, { once: true });
        }
    }

    function setupAudioFiles() {
        if (audioFilesSetup) return;
        try {
            clickSound.src = 'assets/sounds/click.mp3'; clickSound.volume = 0.5;
            loseSound.src = 'assets/sounds/lose.mp3'; loseSound.volume = 0.6;
            winSound.src = 'assets/sounds/win.mp3'; winSound.volume = 0.6;
            if (backgroundMusic) {
                const initialTrackIndex = parseInt(musicSelection.value);
                if (initialTrackIndex >= 0) backgroundMusic.src = backgroundMusicTracks[initialTrackIndex];
                else backgroundMusic.src = backgroundMusicTracks[0];
                backgroundMusic.volume = 0.15;
                backgroundMusic.addEventListener('ended', playNextMusicTrack);
                audioFilesSetup = true;
            }
        } catch (e) { console.warn("Gagal memuat file audio:", e); }
    }

    function playSound(soundElement) {
        if (audioContextResumed && audioFilesSetup && soundElement.src && soundElement.readyState >= 2) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.warn("Error playing sound:", e.name, e.message));
        }
    }

    function playClickSound() { playSound(clickSound); }
    function playLoseSound() { playSound(loseSound); }
    function playWinSound() { playSound(winSound); }

    function playMusic(src) {
        backgroundMusic.src = src;
        const playWhenReady = () => {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    musicManuallyPaused = false;
                    toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }).catch(error => {
                    isMusicPlaying = false;
                    musicManuallyPaused = true;
                    toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
                    console.error("Gagal memutar musik:", error);
                });
            }
            backgroundMusic.removeEventListener('canplaythrough', playWhenReady);
        };
        backgroundMusic.addEventListener('canplaythrough', playWhenReady, { once: true });
    }

    function playNextMusicTrack() {
        if (!audioFilesSetup || musicManuallyPaused || parseInt(musicSelection.value) !== -1) return;
        musicTrackIndex = (musicTrackIndex + 1) % backgroundMusicTracks.length;
        playMusic(backgroundMusicTracks[musicTrackIndex]);
    }
    
    function handleConfirmMusicClick() {
        const selectedValue = parseInt(musicSelection.value);
        if (selectedValue === -1) {
            backgroundMusic.loop = false;
            playNextMusicTrack();
        } else {
            backgroundMusic.loop = true;
            musicTrackIndex = selectedValue;
            playMusic(backgroundMusicTracks[musicTrackIndex]);
        }
    }
    
    function resumeAudioContext() {
        if (!audioContextResumed) {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            setupAudioFiles();
            audioContextResumed = true;
        }
    }
    document.body.addEventListener('click', resumeAudioContext, { once: true });
    document.body.addEventListener('touchstart', resumeAudioContext, { once: true });

    if (toggleMusicBtn && backgroundMusic) {
        toggleMusicBtn.addEventListener('click', () => {
            playClickSound();
            resumeAudioContext();
            if (!audioFilesSetup) { alert("File musik belum siap."); return; }
            if (isMusicPlaying) {
                backgroundMusic.pause();
                isMusicPlaying = false;
                musicManuallyPaused = true;
                toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                musicManuallyPaused = false;
                backgroundMusic.play().then(() => { isMusicPlaying = true; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(() => { isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>'; });
            }
        });
    }

    openMusicSettingsBtn.addEventListener('click', () => { playClickSound(); musicSettingsModal.classList.remove('hidden'); });
    closeMusicSettingsBtn.addEventListener('click', () => { playClickSound(); musicSettingsModal.classList.add('hidden'); });
    confirmMusicBtn.addEventListener('click', () => { playClickSound(); handleConfirmMusicClick(); musicSettingsModal.classList.add('hidden'); });
    
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
    if(closePopupBtn) closePopupBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    proceedToRoundScoresBtn.addEventListener('click', () => { playClickSound(); closeWinnerPopupAndShowRoundScores(); });
    playNewRoundBtn.addEventListener('click', () => { playClickSound(); startNewRoundWithSameTeam(); });
    finishGameShowFinalScoresBtn.addEventListener('click', () => { playClickSound(); showFinalScoreboard(); });
    restartGameFullBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });
    if(closeFinalScoreBtn) closeFinalScoreBtn.addEventListener('click', () => { playClickSound(); finalScoreDisplayModal.classList.add('hidden'); if(confettiAnimation) confettiAnimation.classList.add('hidden'); });
    restartFromFinalBtn.addEventListener('click', () => { playClickSound(); resetGameFull(); });

    function resetGameFull() {
        isInitialSetupPhase = true;
        players = []; configuredTotalPlayers = 0; rolesToDistribute = []; currentPlayerIndex = 0;
        initialCiviliansCount = 0; initialUndercoversCount = 0; initialMrWhitesCount = 0;
        civilianWord = ""; undercoverWord = "";
        gameInProgress = true;
        eliminatedThisRoundPlayer = null;
        currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        playerSelectedForElimination = null;

        if (isMusicPlaying) {
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicManuallyPaused = true;
            toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
        }
        
        musicSelection.value = "0";
        const initialTrackIndex = parseInt(musicSelection.value);
        if (audioFilesSetup && initialTrackIndex >= 0) {
            backgroundMusic.src = backgroundMusicTracks[initialTrackIndex];
        }

        totalPlayersConfigInput.value = "3"; civiliansConfigInput.value = "1";
        undercoversConfigInput.value = "1"; mrWhitesConfigInput.value = "1";
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';
        
        switchScreen(null, initialConfigSection);
        
        playerNameInputSection.classList.add('hidden');
        cardRevealModal.classList.add('hidden');
        gameSection.classList.add('hidden');
        winnerPopupModal.classList.add('hidden');
        roundOverSection.classList.add('hidden');
        finalScoreDisplayModal.classList.add('hidden');
        eliminationResultPopup.classList.add('hidden');
        mrWhiteGuessSection.classList.add('hidden');
        musicSettingsModal.classList.add('hidden');

        truthOrDareSection.classList.remove('hidden'); penaltyDisplayDiv.classList.add('hidden');
        closeEliminationPopupBtn.classList.add('hidden'); debugCivilianWordP.style.display = 'none';
        activePlayerListUl.innerHTML = ''; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true; roundRolesListUl.innerHTML = '';
        finalCumulativeScoresTbody.innerHTML = '';
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
        resetTruthOrDareButtons();
    }

    function validateConfigAndProceed() {
        const total = parseInt(totalPlayersConfigInput.value || "0");
        const civ = parseInt(civiliansConfigInput.value || "0");
        const uc = parseInt(undercoversConfigInput.value || "0");
        const mw = parseInt(mrWhitesConfigInput.value || "0");
    
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';
        
        if (isNaN(total) || isNaN(civ) || isNaN(uc) || isNaN(mw)) { showConfigError("Field hanya boleh diisi dengan angka."); return; }
        if (total < 3) { showConfigError("Jumlah total pemain minimal 3."); return; }
        if (civ < 0 || uc < 0 || mw < 0) { showConfigError("Jumlah peran tidak boleh negatif."); return; }
        if (uc === 0 && mw === 0) { showConfigError("Permainan harus memiliki setidaknya 1 Undercover atau 1 Mr. White."); return; }
        if (civ + uc + mw !== total) { showConfigError(`Jumlah peran (${civ + uc + mw}) tidak sama dengan Total Pemain (${total}).`); return; }
    
        configuredTotalPlayers = total;
        initialCiviliansCount = civ; initialUndercoversCount = uc; initialMrWhitesCount = mw;
        
        generateRolesToDistribute(); selectNewWordPair();
        players = []; currentPlayerIndex = 0; isInitialSetupPhase = true;
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        
        switchScreen(initialConfigSection, playerNameInputSection);
        prepareForNextPlayerNameInput();
    }

    function generateRolesToDistribute() { rolesToDistribute = []; for (let i = 0; i < initialCiviliansCount; i++) rolesToDistribute.push("Civilian"); for (let i = 0; i < initialUndercoversCount; i++) rolesToDistribute.push("Undercover"); for (let i = 0; i < initialMrWhitesCount; i++) rolesToDistribute.push("Mr. White"); for (let i = rolesToDistribute.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]]; } }
    function selectNewWordPair() { const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)]; civilianWord = selectedPair.civilian; undercoverWord = selectedPair.undercover; }
    function showConfigError(message) { configErrorP.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`; configErrorP.classList.remove('hidden'); }

    function prepareForNextPlayerNameInput() {
        playerNameInputTitleH2.innerHTML = `<i class="fas fa-user-plus"></i> Masukkan Nama Pemain ${currentPlayerIndex + 1} dari ${configuredTotalPlayers}`;
        currentPlayerNameInput.value = ''; currentPlayerNameInput.focus(); submitNameAndDrawCardBtn.disabled = false;
    }

    function handleSubmitNameAndDrawCard() {
        const playerName = currentPlayerNameInput.value.trim();
        if (!playerName) { alert("Nama pemain tidak boleh kosong!"); return; }
        submitNameAndDrawCardBtn.disabled = true;
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        let assignedWord = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        const avatarIndex = (players.length % 6) + 1;
        players.push({ name: playerName, role: assignedRole, word: assignedWord, isEliminated: false, originalRole: assignedRole, score: 0, avatar: `assets/images/avatar${avatarIndex}.png` });
        
        playerNameInputSection.classList.add('hidden');
        showRoleOnCard(playerName, assignedRole, assignedWord);
    }

    function prepareNewRoundRoleReveal() {
        const currentPlayer = players[currentPlayerIndex];
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        currentPlayer.role = assignedRole;
        currentPlayer.word = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        showRoleOnCard(currentPlayer.name, currentPlayer.role, currentPlayer.word);
    }

    function showRoleOnCard(playerName, role, word) {
        cardRevealPopupTitleH3.innerHTML = `<i class="fas fa-id-card"></i> Kartu untuk ${playerName}`;
        cardPlayerRoleP.textContent = role; cardPlayerWordP.textContent = word;
        roleCardElement.classList.remove('is-flipped'); hideCardAndProceedBtn.classList.add('hidden');
        cardRevealModal.classList.remove('hidden');
    }

    function handleCardFlip() { if (!roleCardElement.classList.contains('is-flipped')) { roleCardElement.classList.add('is-flipped'); hideCardAndProceedBtn.classList.remove('hidden'); } }

    function handleProceedAfterCardView() {
        cardRevealModal.classList.add('hidden'); currentPlayerIndex++;
        if (currentPlayerIndex < configuredTotalPlayers) {
            if (isInitialSetupPhase) { switchScreen(null, playerNameInputSection); prepareForNextPlayerNameInput(); } 
            else { prepareNewRoundRoleReveal(); }
        } else {
            isInitialSetupPhase = false;
            switchScreen(null, gameSection);
            startGamePlay();
        }
    }

    function startGamePlay() {
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        players.forEach(p => { p.isEliminated = false; });
        playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true;
        updateActivePlayerListWithAvatars();
        document.getElementById('voting-phase').classList.remove('hidden');
        resetTruthOrDareButtons();
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
    }

    function startNewRoundWithSameTeam() {
        isInitialSetupPhase = false; generateRolesToDistribute(); selectNewWordPair();
        currentPlayerIndex = 0;
        switchScreen(roundOverSection, null);
        winnerPopupModal.classList.add('hidden'); finalScoreDisplayModal.classList.add('hidden');
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
        prepareNewRoundRoleReveal();
    }

    function updateActivePlayerListWithAvatars() {
        activePlayerListUl.innerHTML = '';
        const activePlayers = players.filter(p => !p.isEliminated);
        if (activePlayers.length === 0 && gameInProgress) { checkWinConditionsAndProceed(); return; }
        activePlayers.forEach(player => {
            const li = document.createElement('li'); li.dataset.playerName = player.name;
            li.classList.add('player-avatar-card');
            if (player.name === playerSelectedForElimination) li.classList.add('selected-for-vote');
            const img = document.createElement('img'); img.src = player.avatar; img.alt = `Avatar ${player.name}`;
            img.classList.add('player-avatar-img');
            const nameSpan = document.createElement('span'); nameSpan.textContent = player.name;
            nameSpan.classList.add('player-avatar-name');
            li.appendChild(img); li.appendChild(nameSpan); activePlayerListUl.appendChild(li);
        });
        confirmEliminationBtn.disabled = !playerSelectedForElimination;
    }

    function handleAvatarVoteSelection(event) {
        if (!gameInProgress) return;
        const clickedLi = event.target.closest('.player-avatar-card');
        if (!clickedLi || clickedLi.classList.contains('eliminated')) return;
        const previouslySelectedCard = activePlayerListUl.querySelector('.selected-for-vote');
        if (clickedLi === previouslySelectedCard) {
            clickedLi.classList.remove('selected-for-vote'); playerSelectedForElimination = null;
            playerToEliminateDisplay.textContent = "Belum ada"; confirmEliminationBtn.disabled = true;
        } else {
            if (previouslySelectedCard) previouslySelectedCard.classList.remove('selected-for-vote');
            clickedLi.classList.add('selected-for-vote'); playerSelectedForElimination = clickedLi.dataset.playerName;
            playerToEliminateDisplay.textContent = playerSelectedForElimination; confirmEliminationBtn.disabled = false;
        }
    }

    function handleConfirmElimination() {
        if (!playerSelectedForElimination) { alert("Pilih pemain yang akan dieliminasi."); return; }
        eliminatedThisRoundPlayer = players.find(p => p.name === playerSelectedForElimination);
        if (!eliminatedThisRoundPlayer) return;
        eliminatedThisRoundPlayer.isEliminated = true;
        if (eliminatedThisRoundPlayer.role === "Civilian") { playLoseSound(); } else if (eliminatedThisRoundPlayer.role === "Undercover") { playWinSound(); }
        document.getElementById('voting-phase').classList.add('hidden');
        if (eliminatedThisRoundPlayer.role === "Mr. White") {
            mrWhiteGuessSection.classList.remove('hidden');
            mrWhiteNameGuessStrong.textContent = eliminatedThisRoundPlayer.name;
        } else {
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-skull-crossbones"></i> ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role}) telah tereliminasi.`;
            resetTruthOrDareButtons(); truthOrDareSection.classList.remove('hidden');
            eliminationResultPopup.classList.remove('hidden');
        }
        playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true; updateActivePlayerListWithAvatars();
    }

    function handleCloseEliminationPopup() {
        eliminationResultPopup.classList.add('hidden');
        resetTruthOrDareButtons();
        checkWinConditionsAndProceed();
    }

    function handleMrWhiteGuess() {
        const guess = mrWhiteWordGuessInput.value.trim();
        mrWhiteGuessSection.classList.add('hidden'); mrWhiteWordGuessInput.value = '';
        if (guess.toLowerCase() === civilianWord.toLowerCase()) {
            playWinSound(); currentWinningTeamType = "MR_WHITE_GUESS";
            currentWinnerPlayerObjects = [eliminatedThisRoundPlayer];
            gameInProgress = false;
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else {
            playLoseSound();
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${eliminatedThisRoundPlayer.name} (Mr. White) gagal menebak dan tereliminasi.`;
            resetTruthOrDareButtons(); truthOrDareSection.classList.remove('hidden');
            eliminationResultPopup.classList.remove('hidden');
        }
    }

    function checkWinConditionsAndProceed() {
        if (!gameInProgress && currentWinningTeamType) { announceWinner(currentWinningTeamType, currentWinnerPlayerObjects); return; }
        if (!gameInProgress) return;

        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

        let winDetected = false, determinedWinType = "", determinedWinners = [];

        if (activePlayers.length <= 2 && activeCivilians.length > 0 && activeUndercovers.length === 0 && activeMrWhite.length === 0) { winDetected = true; determinedWinType = "CIVILIAN_TEAM"; determinedWinners = activeCivilians; }
        else if (activeUndercovers.length === 0 && activeMrWhite.length === 0) { winDetected = true; determinedWinType = "CIVILIAN_TEAM"; determinedWinners = activeCivilians; }
        else if (activeCivilians.length === 0) {
            winDetected = true;
            const survivingUndercovers = activeUndercovers.filter(p => !p.isEliminated);
            const survivingMrWhite = activeMrWhite.filter(p => !p.isEliminated);
            if (survivingUndercovers.length > 0 && survivingMrWhite.length > 0) { determinedWinType = "UC_MW_SURVIVAL"; determinedWinners.push(...survivingUndercovers, ...survivingMrWhite); }
            else if (survivingUndercovers.length > 0) { determinedWinType = "UC_SURVIVAL"; determinedWinners.push(...survivingUndercovers); }
            else if (survivingMrWhite.length > 0) { determinedWinType = "MW_SURVIVAL"; determinedWinners.push(...survivingMrWhite); }
        }

        if (winDetected) {
            gameInProgress = false; currentWinningTeamType = determinedWinType; currentWinnerPlayerObjects = determinedWinners;
            if (determinedWinType !== "NO_WINNER_DRAW") playWinSound();
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else {
            updateActivePlayerListWithAvatars();
            document.getElementById('voting-phase').classList.remove('hidden');
            playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
            confirmEliminationBtn.disabled = true; resetTruthOrDareButtons();
            eliminationResultPopup.classList.add('hidden');
        }
    }

    function announceWinner(winningTeamType, winnerPlayerObjects = []) {
        let popupMsg = "🎉 Selamat! 🎉"; let popupDetail = "";
        switch (winningTeamType) {
            case "MR_WHITE_GUESS": popupMsg = `🎉 <i class="fas fa-crown"></i> Luar Biasa, ${winnerPlayerObjects[0].name}! 🎉`; popupDetail = "Anda (Mr. White) berhasil menebak kata rahasia Civilian!"; break;
            case "UC_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover! 🎉`; popupDetail = "Tim Undercover berhasil bertahan hingga akhir!"; break;
            case "MW_SURVIVAL": popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Mr. White)! 🎉`; popupDetail = "Mr. White berhasil bertahan hingga semua Civilian tersingkir!"; break;
            case "UC_MW_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover & Mr. White! 🎉`; popupDetail = "Tim Undercover dan Mr. White berhasil mengeliminasi semua Civilian!"; break;
            case "CIVILIAN_TEAM": popupMsg = `🎉 Selamat, Tim Civilian! 🎉`; popupDetail = "Tim Civilian berhasil mengungkap semua penjahat!"; break;
            default: popupDetail = "Permainan telah berakhir.";
        }
        popupWinnerMessageH2.innerHTML = popupMsg; popupWinnerDetailP.textContent = popupDetail;

        if (winningTeamType !== "NO_WINNER_DRAW" && confettiAnimation) {
            confettiAnimation.classList.remove('hidden');
            confettiAnimation.src = confettiAnimation.src.split("?")[0] + "?" + new Date().getTime();
        } else if (confettiAnimation) { confettiAnimation.classList.add('hidden'); }
        winnerPopupModal.classList.remove('hidden');
        switchScreen(gameSection, null);
    }

    function closeWinnerPopupAndShowRoundScores() {
        winnerPopupModal.classList.add('hidden');
        if (confettiAnimation) confettiAnimation.classList.add('hidden');
        switchScreen(null, roundOverSection);
        displayRoundOverDetails();
    }

    function displayRoundOverDetails() {
        calculateAndDisplayRoundScores();
        roundRolesListUl.innerHTML = '';
        players.forEach(p => {
            const li = document.createElement('li');
            let roleIcon = '';
            if (p.originalRole === 'Civilian') roleIcon = '<i class="fas fa-user-shield" style="color:var(--success-color)"></i> ';
            else if (p.originalRole === 'Undercover') roleIcon = '<i class="fas fa-user-secret" style="color:var(--error-color)"></i> ';
            else if (p.originalRole === 'Mr. White') roleIcon = '<i class="fas fa-user-tie" style="color:var(--accent-color)"></i> ';
            
            let status = p.isEliminated ? 'Tereliminasi' : 'Selamat';
            const isWinnerThisSpecificRound = currentWinnerPlayerObjects.some(wp => wp.name === p.name);
            if (isWinnerThisSpecificRound) status = '🎉 MENANG 🎉';
            
            const roundScoreForPlayer = p.roundScoreThisTurn || 0;
            li.innerHTML = `<strong>${p.name}</strong>: ${roleIcon}${p.originalRole} <span style="font-style:italic; color: var(--text-secondary);">(Kata: ${p.word})</span> - ${status} <strong style="color: var(--success-color);">[+${roundScoreForPlayer} Poin]</strong> (Total: ${p.score})`;
            roundRolesListUl.appendChild(li);
        });
        debugCivilianWordP.style.display = 'block'; civilianWordDisplay.textContent = civilianWord;
    }

    function calculateAndDisplayRoundScores() {
        players.forEach(player => {
            let roundScore = POINTS_LOSER;
            const isWinnerThisRoundObject = currentWinnerPlayerObjects.find(wp => wp.name === player.name);
            switch (currentWinningTeamType) {
                case "MR_WHITE_GUESS": if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_GUESS_WIN; break;
                case "UC_SURVIVAL": case "UC_MW_SURVIVAL": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) roundScore = POINTS_UC_WIN; break;
                case "MW_SURVIVAL": if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_SURVIVAL_WIN; break;
                case "CIVILIAN_TEAM": if (player.originalRole === "Civilian") roundScore = player.isEliminated ? POINTS_CIVILIAN_TEAM_WIN_ELIMINATED : POINTS_CIVILIAN_TEAM_WIN_SURVIVED; break;
            }
            player.score += roundScore; player.roundScoreThisTurn = roundScore;
        });
    }

    function showFinalScoreboard() {
        finalScoreDisplayModal.classList.remove('hidden');
        switchScreen(roundOverSection, null);
        winnerPopupModal.classList.add('hidden');
        if (confettiAnimation) confettiAnimation.classList.add('hidden');
        finalCumulativeScoresTbody.innerHTML = ''; 
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        sortedPlayers.forEach((player, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.originalRole}</td>
                <td class="score-value">${player.score} Poin</td>
            `;
            finalCumulativeScoresTbody.appendChild(tr);
        });
    }

    function applyPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        penaltyTextP.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        penaltyDisplayDiv.classList.remove('hidden'); truthBtn.disabled = true; dareBtn.disabled = true;
        closeEliminationPopupBtn.classList.remove('hidden');
    }

    function resetTruthOrDareButtons() {
        truthBtn.disabled = false; dareBtn.disabled = false;
        penaltyDisplayDiv.classList.add('hidden'); penaltyTextP.textContent = '';
        closeEliminationPopupBtn.classList.add('hidden');
    }

    resetGameFull();
});