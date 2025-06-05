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
    const popupWinnerMessageH2 = document.getElementById('popup-winner-message');
    const popupWinnerDetailP = document.getElementById('popup-winner-detail');
    const finalCumulativeScoresListUl = document.getElementById('final-cumulative-scores-list');


    // --- AUDIO ASSETS ---
    const clickSound = new Audio();
    const backgroundMusic = document.getElementById('background-music');
    const loseSound = new Audio();
    const winSound = new Audio();

    const backgroundMusicTracks = [
        'assets/music/bg_music.mp3',
        'assets/music/bg_music2.mp3',
        'assets/music/bg_music3.mp3'
    ];
    let currentMusicTrackIndex = 0;
    let isMusicPlaying = false;
    let musicManuallyPaused = false;
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

    function setupAudioFiles() {
        if (audioFilesSetup) return;
        try {
            clickSound.src = 'assets/sounds/click.mp3';
            clickSound.volume = 0.5;
            loseSound.src = 'assets/sounds/lose.mp3';
            loseSound.volume = 0.6;
            winSound.src = 'assets/sounds/win.mp3';
            winSound.volume = 0.6;

            if (backgroundMusic) {
                backgroundMusic.src = backgroundMusicTracks[currentMusicTrackIndex];
                backgroundMusic.volume = 0.15;
                backgroundMusic.loop = false;
                backgroundMusic.addEventListener('ended', playNextMusicTrack);
                console.log("Path file audio berhasil di-set. BGM src:", backgroundMusic.src);
                audioFilesSetup = true;
            } else {
                console.warn("Elemen audio background-music tidak ditemukan.");
            }
        } catch (e) {
            console.warn("Gagal memuat file audio:", e);
        }
    }

    function playSound(soundElement) {
        if (audioContextResumed && audioFilesSetup && soundElement && soundElement.src && soundElement.readyState >= 2) { // readyState >=2 (HAVE_CURRENT_DATA) or 3 (HAVE_FUTURE_DATA) or 4 (HAVE_ENOUGH_DATA)
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.warn("Error playing sound:", e.name, e.message));
        }
    }

    function playClickSound() { playSound(clickSound); }
    function playLoseSound() { playSound(loseSound); }
    function playWinSound() { playSound(winSound); }

    function playNextMusicTrack() {
        if (!audioFilesSetup || musicManuallyPaused) return; // Don't play next if manually paused
        currentMusicTrackIndex = (currentMusicTrackIndex + 1) % backgroundMusicTracks.length;
        backgroundMusic.src = backgroundMusicTracks[currentMusicTrackIndex];
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                toggleMusicBtn.innerHTML = '🔇';
                toggleMusicBtn.title = "Hentikan Musik";
            }).catch(error => {
                console.error("Gagal lanjut ke musik berikutnya otomatis:", error);
                isMusicPlaying = false;
                toggleMusicBtn.innerHTML = '🎵';
                 // musicManuallyPaused = true; // Consider if this should be set
            });
        }
    }

    function resumeAudioContext() {
        if (!audioContextResumed) {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            setupAudioFiles();
            audioContextResumed = true;
            console.log("Konteks audio diaktifkan.");

            if (audioFilesSetup && !isMusicPlaying && !musicManuallyPaused) {
                const playPromise = backgroundMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isMusicPlaying = true;
                        toggleMusicBtn.innerHTML = '🔇';
                        toggleMusicBtn.title = "Hentikan Musik";
                        console.log("Musik dimulai otomatis setelah interaksi.");
                    }).catch(error => {
                        console.warn("Autoplay musik gagal setelah interaksi:", error);
                        toggleMusicBtn.innerHTML = '🎵';
                    });
                }
            }
        }
    }
    document.body.addEventListener('click', resumeAudioContext, { once: true });
    document.body.addEventListener('touchstart', resumeAudioContext, { once: true });


    if (toggleMusicBtn && backgroundMusic) {
        toggleMusicBtn.addEventListener('click', () => {
            playClickSound();
            resumeAudioContext();

            if (!audioFilesSetup) {
                setupAudioFiles();
                if (!audioFilesSetup) {
                    alert("File musik belum siap. Coba lagi nanti."); return;
                }
            }
             if (!backgroundMusic.src || backgroundMusic.src === window.location.href || !backgroundMusicTracks.includes(backgroundMusic.src.substring(backgroundMusic.src.lastIndexOf('/') + 1))) {
                 console.warn("Path BGM tidak valid atau belum diset, mengatur ke trek pertama:", backgroundMusic.src);
                 backgroundMusic.src = backgroundMusicTracks[currentMusicTrackIndex];
            }

            if (isMusicPlaying) {
                backgroundMusic.pause();
                isMusicPlaying = false;
                musicManuallyPaused = true;
                toggleMusicBtn.innerHTML = '🎵';
                toggleMusicBtn.title = "Putar Musik";
            } else {
                musicManuallyPaused = false;
                const playPromise = backgroundMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isMusicPlaying = true;
                        toggleMusicBtn.innerHTML = '🔇';
                        toggleMusicBtn.title = "Hentikan Musik";
                    }).catch(error => {
                        console.error("Error saat memutar musik via tombol:", error);
                        isMusicPlaying = false;
                        musicManuallyPaused = true;
                        toggleMusicBtn.innerHTML = '⚠️';
                        toggleMusicBtn.title = "Musik Gagal Diputar";
                    });
                }
            }
        });
    }

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
            // musicManuallyPaused state persists unless autoplay is desired on full reset
            // For full reset, let's allow autoplay attempt again.
            // musicManuallyPaused = false;
            toggleMusicBtn.innerHTML = '🎵';
        }
        currentMusicTrackIndex = 0;
        if (audioFilesSetup && backgroundMusicTracks.length > 0) {
            // Only set src if it's different or not set, to avoid interrupting if not needed
            if (backgroundMusic.src !== backgroundMusicTracks[currentMusicTrackIndex]) {
                 backgroundMusic.src = backgroundMusicTracks[currentMusicTrackIndex];
            }
        }

        totalPlayersConfigInput.value = "3"; civiliansConfigInput.value = "1";
        undercoversConfigInput.value = "1"; mrWhitesConfigInput.value = "1";
        configErrorP.classList.add('hidden'); configErrorP.textContent = '';
        initialConfigSection.classList.remove('hidden');
        playerNameInputSection.classList.add('hidden'); cardRevealModal.classList.add('hidden');
        gameSection.classList.add('hidden'); winnerPopupModal.classList.add('hidden');
        roundOverSection.classList.add('hidden'); finalScoreDisplayModal.classList.add('hidden');
        eliminationResultPopup.classList.add('hidden'); mrWhiteGuessSection.classList.add('hidden');
        truthOrDareSection.classList.remove('hidden'); penaltyDisplayDiv.classList.add('hidden');
        closeEliminationPopupBtn.classList.add('hidden'); debugCivilianWordP.style.display = 'none';
        activePlayerListUl.innerHTML = ''; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true; roundRolesListUl.innerHTML = '';
        finalCumulativeScoresListUl.innerHTML = '';
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
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
        if (civ < 0) { showConfigError("Jumlah Civilian tidak boleh negatif."); return; }
        if (uc < 0 || mw < 0) { showConfigError("Jumlah Undercover atau Mr. White tidak boleh negatif."); return; }

        if (uc === 0 && mw === 0) {
            showConfigError("Permainan harus memiliki setidaknya 1 Undercover atau 1 Mr. White."); return;
        }
        if (civ + uc + mw !== total) { showConfigError(`Jumlah peran (${civ + uc + mw}) tidak sama dengan Total Pemain (${total}).`); return; }

        configuredTotalPlayers = total;
        initialCiviliansCount = civ; initialUndercoversCount = uc; initialMrWhitesCount = mw;
        generateRolesToDistribute(); selectNewWordPair();
        players = []; currentPlayerIndex = 0; isInitialSetupPhase = true;
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        startInitialNameInputPhase();
    }

    function generateRolesToDistribute() { rolesToDistribute = []; for (let i = 0; i < initialCiviliansCount; i++) rolesToDistribute.push("Civilian"); for (let i = 0; i < initialUndercoversCount; i++) rolesToDistribute.push("Undercover"); for (let i = 0; i < initialMrWhitesCount; i++) rolesToDistribute.push("Mr. White"); for (let i = rolesToDistribute.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[rolesToDistribute[i], rolesToDistribute[j]] = [rolesToDistribute[j], rolesToDistribute[i]]; } }
    function selectNewWordPair() { const selectedPair = wordPairs[Math.floor(Math.random() * wordPairs.length)]; civilianWord = selectedPair.civilian; undercoverWord = selectedPair.undercover; }
    function showConfigError(message) { configErrorP.textContent = message; configErrorP.classList.remove('hidden'); }

    function startInitialNameInputPhase() {
        initialConfigSection.classList.add('hidden'); playerNameInputSection.classList.remove('hidden');
        prepareForNextPlayerNameInput();
    }

    function prepareForNextPlayerNameInput() {
        playerNameInputTitleH2.textContent = `👤 Masukkan Nama Pemain ${currentPlayerIndex + 1} dari ${configuredTotalPlayers}`;
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
        cardRevealPopupTitleH3.textContent = `Kartu untuk ${playerName}`;
        cardPlayerRoleP.textContent = role; cardPlayerWordP.textContent = word;
        roleCardElement.classList.remove('is-flipped'); hideCardAndProceedBtn.classList.add('hidden');
        cardRevealModal.classList.remove('hidden');
    }

    function handleCardFlip() {
        if (!roleCardElement.classList.contains('is-flipped')) {
            roleCardElement.classList.add('is-flipped'); hideCardAndProceedBtn.classList.remove('hidden');
        }
    }

    function handleProceedAfterCardView() {
        cardRevealModal.classList.add('hidden'); currentPlayerIndex++;
        if (currentPlayerIndex < configuredTotalPlayers) {
            if (isInitialSetupPhase) {
                playerNameInputSection.classList.remove('hidden'); prepareForNextPlayerNameInput();
            } else { prepareNewRoundRoleReveal(); }
        } else { isInitialSetupPhase = false; startGamePlay(); }
    }

    function startGamePlay() {
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        players.forEach(p => { p.isEliminated = false; });
        playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
        confirmEliminationBtn.disabled = true; gameSection.classList.remove('hidden');
        eliminationResultPopup.classList.add('hidden'); mrWhiteGuessSection.classList.add('hidden');
        roundOverSection.classList.add('hidden'); updateActivePlayerListWithAvatars();
        document.getElementById('voting-phase').classList.remove('hidden');
        document.getElementById('discussion-phase').classList.remove('hidden');
        resetTruthOrDareButtons();
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
    }

    function startNewRoundWithSameTeam() {
        roundOverSection.classList.add('hidden'); winnerPopupModal.classList.add('hidden');
        isInitialSetupPhase = false; generateRolesToDistribute(); selectNewWordPair();
        currentPlayerIndex = 0; initialConfigSection.classList.add('hidden');
        playerNameInputSection.classList.add('hidden'); gameSection.classList.add('hidden');
        finalScoreDisplayModal.classList.add('hidden');
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

        if (eliminatedThisRoundPlayer.role === "Civilian") {
            playLoseSound();
        } else if (eliminatedThisRoundPlayer.role === "Undercover") {
            playWinSound();
        }

        document.getElementById('voting-phase').classList.add('hidden');
        document.getElementById('discussion-phase').classList.add('hidden');
        if (eliminatedThisRoundPlayer.role === "Mr. White") {
            mrWhiteGuessSection.classList.remove('hidden');
            mrWhiteNameGuessStrong.textContent = eliminatedThisRoundPlayer.name;
        } else {
            eliminatedPlayerInfoH3.textContent = `💀 ${eliminatedThisRoundPlayer.name} (Peran: ${eliminatedThisRoundPlayer.role}) telah tereliminasi.`;
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
            playWinSound();
            currentWinningTeamType = "MR_WHITE_GUESS";
            currentWinnerPlayerObjects = [eliminatedThisRoundPlayer];
            gameInProgress = false;
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else {
            playLoseSound();
            eliminatedPlayerInfoH3.textContent = `❌ ${eliminatedThisRoundPlayer.name} (Mr. White) gagal menebak dan tereliminasi.`;
            resetTruthOrDareButtons(); truthOrDareSection.classList.remove('hidden');
            eliminationResultPopup.classList.remove('hidden');
        }
    }

    function checkWinConditionsAndProceed() {
        if (!gameInProgress && currentWinningTeamType) {
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            return;
        }

        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

        if (activePlayers.length === 0 && gameInProgress) {
            if (!currentWinningTeamType) {
                currentWinningTeamType = "NO_WINNER_DRAW"; currentWinnerPlayerObjects = []; gameInProgress = false;
                announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            }
            return;
        }

        if (activePlayers.length === 2 && activeCivilians.length === 1 && activeUndercovers.length === 1 && activeMrWhite.length === 0) {
            const losingCivilian = activeCivilians[0];
            eliminatedThisRoundPlayer = losingCivilian;
            playLoseSound();

            currentWinningTeamType = "UC_DUEL_WIN";
            currentWinnerPlayerObjects = activeUndercovers; // Undercover wins
            gameInProgress = false;

            eliminatedPlayerInfoH3.textContent = `🚨 Duel Terakhir! 🚨 ${losingCivilian.name} (Civilian) kalah dan mendapat hukuman.`;
            resetTruthOrDareButtons(); truthOrDareSection.classList.remove('hidden');
            eliminationResultPopup.classList.remove('hidden');
            document.getElementById('voting-phase').classList.add('hidden');
            document.getElementById('discussion-phase').classList.add('hidden');
            if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden');
            return;
        }

        let gameShouldEndThisCheck = false;
        let determinedWinType = "";
        let determinedWinners = [];

        if (activeCivilians.length === 0) {
            gameShouldEndThisCheck = true;
            const survivingUndercovers = activeUndercovers.filter(p => !p.isEliminated);
            const survivingMrWhite = activeMrWhite.filter(p => !p.isEliminated);
            if (survivingUndercovers.length > 0 && survivingMrWhite.length > 0) { determinedWinType = "UC_MW_SURVIVAL"; determinedWinners.push(...survivingUndercovers, ...survivingMrWhite); }
            else if (survivingUndercovers.length > 0) { determinedWinType = "UC_SURVIVAL"; determinedWinners.push(...survivingUndercovers); }
            else if (survivingMrWhite.length > 0) { determinedWinType = "MW_SURVIVAL"; determinedWinners.push(...survivingMrWhite); }
            else if (activePlayers.length > 0 && activePlayers.every(p => p.role !== 'Civilian')) { determinedWinType = "NON_CIVILIAN_SURVIVAL"; determinedWinners = activePlayers; }
            else if (activePlayers.length === 0) { determinedWinType = "NO_WINNER_DRAW"; }
        }
        else if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
            if (activeCivilians.length > 0) {
                gameShouldEndThisCheck = true; determinedWinType = "CIVILIAN_TEAM";
                determinedWinners = activeCivilians.filter(p => !p.isEliminated);
            }
        }

        if (gameShouldEndThisCheck && determinedWinType) {
            currentWinningTeamType = determinedWinType; currentWinnerPlayerObjects = determinedWinners;
            gameInProgress = false;

            if (determinedWinType === "CIVILIAN_TEAM" || determinedWinType === "UC_SURVIVAL" || determinedWinType === "MW_SURVIVAL" || determinedWinType === "UC_MW_SURVIVAL" || determinedWinType === "NON_CIVILIAN_SURVIVAL" ) {
                 if(winnerPlayerObjects.length > 0) playWinSound(); // Play win sound for team wins if there are winners
            }


            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else if (gameInProgress) {
            updateActivePlayerListWithAvatars();
            document.getElementById('discussion-phase').classList.remove('hidden');
            document.getElementById('voting-phase').classList.remove('hidden');
            playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
            confirmEliminationBtn.disabled = true; resetTruthOrDareButtons();
            eliminationResultPopup.classList.add('hidden');
        }
    }

    function announceWinner(winningTeamType, winnerPlayerObjects = []) {
        let popupMsg = "🎉 Selamat! 🎉"; let popupDetail = "";
        switch (winningTeamType) {
            case "MR_WHITE_GUESS": popupMsg = `🎉 Luar Biasa, ${winnerPlayerObjects[0].name}! 🎉`; popupDetail = "Anda (Mr. White) berhasil menebak kata rahasia Civilian!"; break;
            case "UC_SURVIVAL": popupDetail = "Tim Undercover berhasil bertahan hingga akhir!"; if (winnerPlayerObjects.length === 1) popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Undercover)! 🎉`; else popupMsg = `🎉 Selamat, Tim Undercover! 🎉`; break;
            case "MW_SURVIVAL": popupDetail = "Mr. White berhasil bertahan hingga semua Civilian tersingkir!"; if (winnerPlayerObjects.length === 1) popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Mr. White)! 🎉`; else popupMsg = `🎉 Selamat, Mr. White! 🎉`; break;
            case "UC_MW_SURVIVAL": popupDetail = "Tim Undercover dan Mr. White berhasil mengeliminasi semua Civilian!"; popupMsg = `🎉 Selamat, Tim Undercover & Mr. White! 🎉`; break;
            case "CIVILIAN_TEAM": popupDetail = "Tim Civilian berhasil mengungkap semua penjahat!"; popupMsg = `🎉 Selamat, Tim Civilian! 🎉`; break;
            case "UC_DUEL_WIN": popupDetail = `Undercover (${winnerPlayerObjects[0].name}) memenangkan duel terakhir melawan Civilian!`; popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Undercover)! 🎉`; break;
            case "NON_CIVILIAN_SURVIVAL": popupDetail = "Semua Civilian telah tereliminasi!"; popupMsg = `🎉 Kemenangan untuk Tim Non-Civilian! 🎉`; break;
            case "NO_WINNER_DRAW": popupDetail = "Permainan berakhir tanpa pemenang yang jelas."; popupMsg = "Hasil Imbang!"; break;
            default: popupDetail = "Permainan telah berakhir.";
        }
        popupWinnerMessageH2.textContent = popupMsg; popupWinnerDetailP.textContent = popupDetail;

        if (winningTeamType !== "NO_WINNER_DRAW" && confettiAnimation) {
            confettiAnimation.classList.remove('hidden');
            confettiAnimation.src = confettiAnimation.src.split("?")[0] + "?" + new Date().getTime();
        } else if (confettiAnimation) {
            confettiAnimation.classList.add('hidden');
        }

        winnerPopupModal.classList.remove('hidden'); gameSection.classList.add('hidden');
        eliminationResultPopup.classList.add('hidden'); mrWhiteGuessSection.classList.add('hidden');
    }

    function closeWinnerPopupAndShowRoundScores() {
        winnerPopupModal.classList.add('hidden');
        if (confettiAnimation) confettiAnimation.classList.add('hidden');
        displayRoundOverDetails();
    }

    function displayRoundOverDetails() {
        calculateAndDisplayRoundScores(); roundOverTitleH2.textContent = "🏁 Babak Selesai! 🏁";
        roundRolesListUl.innerHTML = '';
        players.forEach(p => {
            const li = document.createElement('li');
            let status = p.isEliminated ? 'Tereliminasi' : 'Selamat (Babak Ini)';
            const isWinnerThisSpecificRound = currentWinnerPlayerObjects.some(wp => wp.name === p.name);
            if (isWinnerThisSpecificRound) { status = '🎉 MENANG (Babak Ini) 🎉'; }
            const roundScoreForPlayer = p.roundScoreThisTurn || 0;
            li.innerHTML = `<strong>${p.name}</strong>: ${p.role} <span style="font-style:italic; color: #555;">(Kata: ${p.role === "Mr. White" ? "N/A" : p.word})</span> - ${status} <strong style="color: #28a745;">[+${roundScoreForPlayer} Poin]</strong> (Total: ${p.score})`;
            roundRolesListUl.appendChild(li);
        });
        debugCivilianWordP.style.display = 'block'; civilianWordDisplay.textContent = civilianWord;
        roundOverSection.classList.remove('hidden'); truthOrDareSection.classList.add('hidden');
    }

    function calculateAndDisplayRoundScores() {
        players.forEach(player => {
            let roundScore = POINTS_LOSER;
            const isWinnerThisRoundObject = currentWinnerPlayerObjects.find(wp => wp.name === player.name);
            switch (currentWinningTeamType) {
                case "MR_WHITE_GUESS": if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_GUESS_WIN; break;
                case "UC_SURVIVAL": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) roundScore = POINTS_UC_WIN; break;
                case "MW_SURVIVAL": if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_SURVIVAL_WIN; break;
                case "UC_MW_SURVIVAL": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) roundScore = POINTS_UC_WIN; else if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_SURVIVAL_WIN; break;
                case "CIVILIAN_TEAM": if (player.originalRole === "Civilian") { const civWon = currentWinnerPlayerObjects.some(wp=>wp.originalRole==="Civilian"); if(civWon) roundScore = player.isEliminated ? POINTS_CIVILIAN_TEAM_WIN_ELIMINATED : POINTS_CIVILIAN_TEAM_WIN_SURVIVED; } break;
                case "UC_DUEL_WIN": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) roundScore = POINTS_UC_WIN; break;
                case "NON_CIVILIAN_SURVIVAL": if (player.originalRole === "Undercover" && isWinnerThisRoundObject) roundScore = POINTS_UC_WIN; else if (player.originalRole === "Mr. White" && isWinnerThisRoundObject) roundScore = POINTS_MW_SURVIVAL_WIN; break;
            }
            player.score += roundScore; player.roundScoreThisTurn = roundScore;
        });
    }

    function showFinalScoreboard() {
        roundOverSection.classList.add('hidden'); winnerPopupModal.classList.add('hidden'); gameSection.classList.add('hidden');
        finalCumulativeScoresListUl.innerHTML = ''; const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        sortedPlayers.forEach(player => { const li = document.createElement('li'); li.innerHTML = `${player.name} (${player.originalRole}): <span class="score-value">${player.score} Poin</span>`; finalCumulativeScoresListUl.appendChild(li); });
        finalScoreDisplayModal.classList.remove('hidden');
        if (confettiAnimation) confettiAnimation.classList.add('hidden');
    }

    function applyPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        penaltyTextP.textContent = (type === 'truth') ? `😇 TRUTH: ${item}` : `😈 DARE: ${item}`;
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