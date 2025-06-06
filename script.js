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
    const peekPlayerSelectModal = document.getElementById('peek-player-select-modal');
    const massPenaltyModal = document.getElementById('mass-penalty-modal');
    const howToPlayModal = document.getElementById('how-to-play-modal');

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
    const peekCardBtn = document.getElementById('peek-card-btn');
    const peekPlayerSelect = document.getElementById('peek-player-select');
    const confirmPeekBtn = document.getElementById('confirm-peek-btn');
    const closePeekViewBtn = document.getElementById('close-peek-view-btn');
    const closePeekSelectModalBtn = peekPlayerSelectModal.querySelector('.close-popup-btn');
    const massTruthBtn = document.getElementById('mass-truth-btn');
    const massDareBtn = document.getElementById('mass-dare-btn');
    const massPenaltyNextBtn = document.getElementById('mass-penalty-next-btn');
    const showGuideBtn = document.getElementById('show-guide-btn');
    const closeGuideBtn = howToPlayModal.querySelector('.close-popup-btn');


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
    const cardPlayerMissionP = document.getElementById('card-player-mission');
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
    const massPenaltyPlayerName = document.getElementById('mass-penalty-player-name');
    const massPenaltyDisplay = document.getElementById('mass-penalty-display');
    const massPenaltyText = document.getElementById('mass-penalty-text');


    // --- WEB AUDIO API SETUP ---
    let audioContext;
    let soundBuffers = {};
    let audioSetupPromise = null;

    const backgroundMusic = document.getElementById('background-music');
    const backgroundMusicTracks = [ 'assets/music/bg_music.mp3', 'assets/music/bg_music2.mp3', 'assets/music/bg_music3.mp3' ];
    let musicTrackIndex = 0;
    let isMusicPlaying = false;
    let musicManuallyPaused = true;
    
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
    let playersAwaitingPenalty = [];

    const POINTS_MW_GUESS_WIN = 7; const POINTS_UC_WIN = 5; const POINTS_MW_SURVIVAL_WIN = 5;
    const POINTS_CIVILIAN_TEAM_WIN_SURVIVED = 3; const POINTS_CIVILIAN_TEAM_WIN_ELIMINATED = 1;
    const POINTS_LOSER = 0;

    const wordPairs = [ { civilian: "Apel", undercover: "Pir" }, { civilian: "Pantai", undercover: "Gurun" }, { civilian: "Kucing", undercover: "Anjing" }, { civilian: "Buku", undercover: "Majalah" }, { civilian: "Mobil", undercover: "Motor" }, { civilian: "Rumah", undercover: "Apartemen" }, { civilian: "Sepak Bola", undercover: "Basket" }, { civilian: "Dokter", undercover: "Perawat" }, { civilian: "Nasi", undercover: "Roti" }, { civilian: "Hujan", undercover: "Salju" }, { civilian: "Sungai", undercover: "Danau" }, { civilian: "Gitar", undercover: "Piano" }, { civilian: "Kopi", undercover: "Teh" }, { civilian: "Sendok", undercover: "Garpu" }, { civilian: "Gunung", undercover: "Bukit" }, { civilian: "Laptop", undercover: "Komputer" }, { civilian: "Sepatu", undercover: "Sandal" }, { civilian: "Matahari", undercover: "Bulan" }, { civilian: "Pintu", undercover: "Jendela" }, { civilian: "Meja", undercover: "Kursi" } ];
    const truths = [ "Apa hal paling memalukan minggu ini?", "Hewan apa kamu & kenapa?", "Siapa paling bikin ketawa disini?", "Kebiasaan burukmu?", "Film/serial favorit sepanjang masa?", "Nemu dompet isi uang, kamu apain?", "Hal konyol dipercaya waktu kecil?", "Tokoh fiksi inspiratif?", "Makanan aneh pernah dicoba?", "Satu permintaan, minta apa?", "Lagu guilty pleasure?", "Bakat terpendammu?", "Liburan paling berkesan?", "Guru/dosen paling berpengaruh?", "Mimpi teraneh?" ];
    const dares = [ "Tiru suara kartun 15d.", "Tarian robot 30d.", "Sebut 5 benda merah 10d.", "Jadi reporter kejadian aneh.", "Nyanyi reff 'Balonku' gaya opera.", "Cerita lelucon.", "Jalan mundur keliling meja.", "Mata tertutup tebak 3 benda.", "Puji 3 orang disini.", "10 push-up/squat/jumping jack.", "Bicara aksen daerah lain 1m.", "Buat wajah paling lucu.", "Peluk (izin) pemain kananmu.", "Telepon teman nyanyi HBD.", "Pakai kaus kaki jadi sarung tangan." ];

    async function loadSound(name, url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            soundBuffers[name] = audioBuffer;
        } catch (e) {
            console.error(`Gagal memuat suara: ${name}`, e);
        }
    }

    function setupAudioEngine() {
        if (audioSetupPromise) return audioSetupPromise;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const soundPromises = [
            loadSound('click', 'assets/sounds/click.mp3'),
            loadSound('win', 'assets/sounds/win.mp3'),
            loadSound('lose', 'assets/sounds/lose.mp3')
        ];
        if (backgroundMusic) {
            const initialTrackIndex = parseInt(musicSelection.value);
            if (initialTrackIndex >= 0) backgroundMusic.src = backgroundMusicTracks[initialTrackIndex];
            else backgroundMusic.src = backgroundMusicTracks[0];
            backgroundMusic.volume = 0.15;
            backgroundMusic.addEventListener('ended', playNextMusicTrack);
            backgroundMusic.load();
        }
        audioSetupPromise = Promise.all(soundPromises);
        return audioSetupPromise;
    }

    function playSound(name) {
        if (!audioContext || audioContext.state !== 'running' || !soundBuffers[name]) {
            return;
        }
        const source = audioContext.createBufferSource();
        source.buffer = soundBuffers[name];
        source.connect(audioContext.destination);
        source.start(0);
    }
    
    function playClickSound() { playSound('click'); }
    function playWinSound() { playSound('win'); }
    function playLoseSound() { playSound('lose'); }
    
    function resumeAudioContext() {
        if (!audioContext) {
            setupAudioEngine().then(() => {
                 if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            });
        } else if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }

    document.body.addEventListener('click', resumeAudioContext, { once: true });
    document.body.addEventListener('touchstart', resumeAudioContext, { once: true });

    function playMusic(src) {
        backgroundMusic.src = src;
        const playWhenReady = () => {
            if (audioContext && audioContext.state !== 'running') return;
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
        if (musicManuallyPaused || parseInt(musicSelection.value) !== -1) return;
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

    if (toggleMusicBtn && backgroundMusic) {
        toggleMusicBtn.addEventListener('click', () => {
            playClickSound();
            resumeAudioContext();
            if (!isMusicPlaying) {
                musicManuallyPaused = false;
                backgroundMusic.play().then(() => { isMusicPlaying = true; toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; }).catch(() => { isMusicPlaying = false; musicManuallyPaused = true; toggleMusicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>'; });
            } else {
                backgroundMusic.pause();
                isMusicPlaying = false;
                musicManuallyPaused = true;
                toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
            }
        });
    }

    showGuideBtn.addEventListener('click', () => { playClickSound(); howToPlayModal.classList.remove('hidden'); });
    closeGuideBtn.addEventListener('click', () => { playClickSound(); howToPlayModal.classList.add('hidden'); });
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
    peekCardBtn.addEventListener('click', () => { playClickSound(); openPeekSelectionModal(); });
    if(closePeekSelectModalBtn) closePeekSelectModalBtn.addEventListener('click', () => { playClickSound(); peekPlayerSelectModal.classList.add('hidden'); });
    confirmPeekBtn.addEventListener('click', () => { playClickSound(); handleConfirmPeek(); });
    closePeekViewBtn.addEventListener('click', () => { playClickSound(); cardRevealModal.classList.add('hidden'); });
    massTruthBtn.addEventListener('click', () => { playClickSound(); applyMassPenalty('truth'); });
    massDareBtn.addEventListener('click', () => { playClickSound(); applyMassPenalty('dare'); });
    massPenaltyNextBtn.addEventListener('click', () => { playClickSound(); processNextPenalty(); });
    
    const configSectionForSteppers = document.getElementById('initial-config-section');
    configSectionForSteppers.addEventListener('click', (event) => {
        const target = event.target.closest('.stepper-btn');
        if (!target) return;
        playClickSound();
        const targetInputId = target.dataset.target;
        const operation = target.dataset.op;
        const inputElement = document.getElementById(targetInputId);
        if (!inputElement) return;
        let currentValue = parseInt(inputElement.value, 10);
        const min = parseInt(inputElement.min, 10);
        const max = parseInt(inputElement.max, 10);
        if (operation === 'plus') {
            if (isNaN(max) || currentValue < max) {
                inputElement.value = currentValue + 1;
            }
        } else if (operation === 'minus') {
            if (isNaN(min) || currentValue > min) {
                inputElement.value = currentValue - 1;
            }
        }
    });

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

    function openPeekSelectionModal() {
        peekPlayerSelect.innerHTML = '';
        const activePlayers = players.filter(p => !p.isEliminated);
        activePlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = player.name;
            option.textContent = player.name;
            peekPlayerSelect.appendChild(option);
        });
        peekPlayerSelectModal.classList.remove('hidden');
    }

    function handleConfirmPeek() {
        const selectedPlayerName = peekPlayerSelect.value;
        if (!selectedPlayerName) {
            alert('Pilih nama pemain terlebih dahulu!');
            return;
        }
        const playerData = players.find(p => p.name === selectedPlayerName);
        if (!playerData) return;
        peekPlayerSelectModal.classList.add('hidden');
        cardRevealPopupTitleH3.innerHTML = `<i class="fas fa-id-card"></i> Kartu untuk ${playerData.name}`;
        cardPlayerRoleP.textContent = playerData.role;
        cardPlayerWordP.textContent = playerData.word;
        let missionText = '';
        switch (playerData.role) {
            case "Civilian":
                missionText = "Beri petunjuk satu kata yang mengarah ke katamu untuk menemukan teman, tapi jangan terlalu jelas agar musuh tidak menebaknya. Bongkar kedok para penyamar!";
                break;
            case "Undercover":
                missionText = "Katamu sedikit berbeda. Berpura-puralah menjadi Civilian dengan memberi petunjuk yang meyakinkan, lalu singkirkan mereka satu per satu saat lengah.";
                break;
            case "Mr. White":
                missionText = "Kamu adalah agen rahasia tanpa informasi. Dengarkan petunjuk lain, beraktinglah seolah kamu tahu segalanya, dan tebak kata rahasia jika identitasmu terbongkar!";
                break;
        }
        cardPlayerMissionP.textContent = missionText;
        roleCardElement.classList.add('is-flipped');
        hideCardAndProceedBtn.classList.add('hidden');
        closePeekViewBtn.classList.remove('hidden');
        cardRevealModal.classList.remove('hidden');
    }

    function resetGameFull() {
        isInitialSetupPhase = true;
        players = []; 
        configuredTotalPlayers = 0; 
        rolesToDistribute = []; 
        currentPlayerIndex = 0;
        initialCiviliansCount = 0; 
        initialUndercoversCount = 0; 
        initialMrWhitesCount = 0;
        civilianWord = ""; 
        undercoverWord = "";
        gameInProgress = true;
        eliminatedThisRoundPlayer = null;
        currentWinningTeamType = null;
        currentWinnerPlayerObjects = [];
        playerSelectedForElimination = null;
        playersAwaitingPenalty = [];

        if (isMusicPlaying) {
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicManuallyPaused = true;
            toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
        }
        musicSelection.value = "0";

        totalPlayersConfigInput.value = "5"; 
        civiliansConfigInput.value = "3";
        undercoversConfigInput.value = "1"; 
        mrWhitesConfigInput.value = "1";
        configErrorP.classList.add('hidden'); 
        configErrorP.textContent = '';
        
        const allScreens = [
            playerNameInputSection, gameSection, mrWhiteGuessSection, 
            eliminationResultPopup, winnerPopupModal, roundOverSection, 
            finalScoreDisplayModal, cardRevealModal, musicSettingsModal, 
            peekPlayerSelectModal, massPenaltyModal, howToPlayModal
        ];
        allScreens.forEach(s => {
            if(s) s.classList.add('hidden');
        });
        
        initialConfigSection.classList.remove('hidden');

        resetTruthOrDareButtons();
        if(debugCivilianWordP) debugCivilianWordP.style.display = 'none';
        if(activePlayerListUl) activePlayerListUl.innerHTML = '';
        if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
        if(confirmEliminationBtn) confirmEliminationBtn.disabled = true;
        if(roundRolesListUl) roundRolesListUl.innerHTML = '';
        if(finalCumulativeScoresTbody) finalCumulativeScoresTbody.innerHTML = '';
        if(confettiAnimation) confettiAnimation.classList.add('hidden');
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
        resumeAudioContext();
        if (!isMusicPlaying && musicManuallyPaused) {
            musicManuallyPaused = false;
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }).catch(error => {
                    console.error("Pemutaran otomatis gagal:", error);
                    musicManuallyPaused = true;
                    isMusicPlaying = false;
                    toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i>';
                });
            }
        }
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
        playerNameInputTitleH2.innerHTML = `<i class="fas fa-user-plus"></i> Masukkan Nama Pemain ${currentPlayerIndex + 1}`;
        currentPlayerNameInput.value = ''; 
        currentPlayerNameInput.focus(); 
        submitNameAndDrawCardBtn.disabled = false;
    }

    function handleSubmitNameAndDrawCard() {
        const playerName = currentPlayerNameInput.value.trim();
        if (!playerName) { alert("Nama pemain tidak boleh kosong!"); return; }
        submitNameAndDrawCardBtn.disabled = true;
        const assignedRole = rolesToDistribute[currentPlayerIndex];
        let assignedWord = (assignedRole === "Civilian") ? civilianWord : (assignedRole === "Undercover") ? undercoverWord : "Anda tidak punya kata. Amati!";
        const avatarIndex = (players.length % 6) + 1;
        players.push({ name: playerName, role: assignedRole, word: assignedWord, isEliminated: false, originalRole: assignedRole, score: 0, avatar: `assets/images/avatar${avatarIndex}.png` });
        
        switchScreen(playerNameInputSection, null);
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
        cardPlayerRoleP.textContent = role;
        cardPlayerWordP.textContent = word;
        let missionText = '';
        switch (role) {
            case "Civilian":
                missionText = "Beri petunjuk satu kata yang mengarah ke katamu untuk menemukan teman, tapi jangan terlalu jelas agar musuh tidak menebaknya. Bongkar kedok para penyamar!";
                break;
            case "Undercover":
                missionText = "Katamu sedikit berbeda. Berpura-puralah menjadi Civilian dengan memberi petunjuk yang meyakinkan, lalu singkirkan mereka satu per satu saat lengah.";
                break;
            case "Mr. White":
                missionText = "Kamu adalah agen rahasia tanpa informasi. Dengarkan petunjuk lain, beraktinglah seolah kamu tahu segalanya, dan tebak kata rahasia jika identitasmu terbongkar!";
                break;
        }
        cardPlayerMissionP.textContent = missionText;
        roleCardElement.classList.remove('is-flipped');
        hideCardAndProceedBtn.classList.add('hidden');
        closePeekViewBtn.classList.add('hidden'); 
        cardRevealModal.classList.remove('hidden');
    }

    function handleCardFlip() {
        if (!roleCardElement.classList.contains('is-flipped')) {
            roleCardElement.classList.add('is-flipped');
            hideCardAndProceedBtn.classList.remove('hidden');
        }
    }

    // --- FUNGSI DIPERBAIKI (BUG FIX) ---
    function handleProceedAfterCardView() {
        // 1. Langsung balikkan kartu untuk menyembunyikan kontennya secara visual.
        // Ini adalah pertahanan utama agar informasi rahasia tidak bocor.
        roleCardElement.classList.remove('is-flipped');
    
        // 2. Gunakan penundaan singkat untuk memberi waktu pada animasi flip untuk memulai
        // dan untuk memastikan proses 'hide' diproses sebelum 'show' berikutnya.
        // Ini memecah race condition antara menyembunyikan modal dan menampilkannya lagi.
        setTimeout(() => {
            // Sembunyikan modal sepenuhnya
            cardRevealModal.classList.add('hidden');
            currentPlayerIndex++;
    
            if (currentPlayerIndex < configuredTotalPlayers) {
                if (isInitialSetupPhase) {
                    // Lanjut ke input nama pemain berikutnya (aliran ini sudah benar)
                    switchScreen(null, playerNameInputSection);
                    prepareForNextPlayerNameInput();
                } else { 
                    // Siapkan kartu untuk pemain berikutnya (sekarang aman karena modal sudah disembunyikan)
                    prepareNewRoundRoleReveal();
                }
            } else {
                // Semua pemain sudah dapat kartu, mulai permainan
                isInitialSetupPhase = false;
                switchScreen(null, gameSection);
                startGamePlay();
            }
        }, 250); // Penundaan 250ms (seperempat detik) cukup agar animasi flip dimulai dan browser memproses 'hide'
    }

    function startGamePlay() {
        gameInProgress = true; currentWinningTeamType = null; currentWinnerPlayerObjects = [];
        players.forEach(p => { p.isEliminated = false; });
        playerSelectedForElimination = null; 
        if(playerToEliminateDisplay) playerToEliminateDisplay.textContent = "Belum ada";
        if(confirmEliminationBtn) confirmEliminationBtn.disabled = true;
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
            resetTruthOrDareButtons();
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
        mrWhiteGuessSection.classList.add('hidden');
        mrWhiteWordGuessInput.value = '';
        if (guess.toLowerCase() === civilianWord.toLowerCase()) {
            playWinSound();
            currentWinningTeamType = "MR_WHITE_GUESS";
            currentWinnerPlayerObjects = [eliminatedThisRoundPlayer];
            gameInProgress = false;
            playersAwaitingPenalty = players.filter(p => !p.isEliminated && p.name !== eliminatedThisRoundPlayer.name);
            if (playersAwaitingPenalty.length > 0) {
                massPenaltyModal.classList.remove('hidden');
                processNextPenalty();
            } else {
                announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
            }
        } else {
            playLoseSound();
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-times-circle"></i> ${eliminatedThisRoundPlayer.name} (Mr. White) gagal menebak dan tereliminasi.`;
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.remove('hidden');
        }
    }

    function processNextPenalty() {
        const nextPlayer = playersAwaitingPenalty.shift();
        if (nextPlayer) {
            massPenaltyPlayerName.textContent = nextPlayer.name;
            massPenaltyDisplay.classList.add('hidden');
            massTruthBtn.disabled = false;
            massDareBtn.disabled = false;
            massPenaltyNextBtn.classList.add('hidden');
        } else {
            massPenaltyModal.classList.add('hidden');
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        }
    }

    function applyMassPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        massPenaltyText.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        massPenaltyDisplay.classList.remove('hidden');
        massTruthBtn.disabled = true;
        massDareBtn.disabled = true;
        massPenaltyNextBtn.classList.remove('hidden');
        if (playersAwaitingPenalty.length === 0) {
            massPenaltyNextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Selesaikan Babak';
        } else {
            massPenaltyNextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Lanjut ke Pemain Berikutnya';
        }
    }

    function checkWinConditionsAndProceed() {
        if (!gameInProgress && currentWinningTeamType) { announceWinner(currentWinningTeamType, currentWinnerPlayerObjects); return; }
        if (!gameInProgress) return;
        const activePlayers = players.filter(p => !p.isEliminated);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');
        if (activePlayers.length === 2 && activeCivilians.length === 1 && activeUndercovers.length === 1 && activeMrWhite.length === 0) {
            gameInProgress = false;
            const losingCivilian = activeCivilians[0];
            const winningUndercover = activeUndercovers[0];
            currentWinningTeamType = "UC_DUEL_WIN";
            currentWinnerPlayerObjects = [winningUndercover];
            losingCivilian.isEliminated = true;
            eliminatedThisRoundPlayer = losingCivilian;
            playLoseSound();
            document.getElementById('voting-phase').classList.add('hidden');
            eliminatedPlayerInfoH3.innerHTML = `<i class="fas fa-bolt"></i> Duel Terakhir! ${losingCivilian.name} (Civilian) kalah.`;
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.remove('hidden');
            return; 
        }
        let winDetected = false, determinedWinType = "", determinedWinners = [];
        if (activeUndercovers.length === 0 && activeMrWhite.length === 0) { 
            winDetected = true; 
            determinedWinType = "CIVILIAN_TEAM";
            determinedWinners = players.filter(p => p.originalRole === 'Civilian');
        }
        else if (activeCivilians.length === 0) {
            winDetected = true;
            determinedWinners = activePlayers;
            const survivingUndercovers = activePlayers.filter(p => p.role === 'Undercover');
            const survivingMrWhite = activePlayers.filter(p => p.role === 'Mr. White');
            if (survivingUndercovers.length > 0 && survivingMrWhite.length > 0) { determinedWinType = "UC_MW_SURVIVAL"; }
            else if (survivingUndercovers.length > 0) { determinedWinType = "UC_SURVIVAL"; }
            else if (survivingMrWhite.length > 0) { determinedWinType = "MW_SURVIVAL"; }
        }
        if (winDetected) {
            gameInProgress = false; currentWinningTeamType = determinedWinType; currentWinnerPlayerObjects = determinedWinners;
            if (determinedWinType !== "NO_WINNER_DRAW") playWinSound();
            announceWinner(currentWinningTeamType, currentWinnerPlayerObjects);
        } else {
            updateActivePlayerListWithAvatars();
            document.getElementById('voting-phase').classList.remove('hidden');
            playerSelectedForElimination = null; playerToEliminateDisplay.textContent = "Belum ada";
            confirmEliminationBtn.disabled = true; 
            resetTruthOrDareButtons();
            eliminationResultPopup.classList.add('hidden');
        }
    }

    function announceWinner(winningTeamType, winnerPlayerObjects = []) {
        let popupMsg = "🎉 Selamat! 🎉"; let popupDetail = "";
        switch (winningTeamType) {
            case "MR_WHITE_GUESS": popupMsg = `🎉 <i class="fas fa-crown"></i> Luar Biasa, ${winnerPlayerObjects[0].name}! 🎉`; popupDetail = "Anda (Mr. White) berhasil menebak kata rahasia Civilian!"; break;
            case "UC_DUEL_WIN": popupMsg = `🎉 Selamat, ${winnerPlayerObjects[0].name} (Undercover)! 🎉`; popupDetail = `Undercover memenangkan duel terakhir melawan Civilian!`; break;
            case "UC_SURVIVAL": popupMsg = `🎉 Selamat, Tim Undercover! 🎉`; popupDetail = "Tim Undercover berhasil bertahan hingga akhir!"; break;
            case "MW_SURVIVAL": popupMsg = `🎉 Selamat, Tim Mr. White! 🎉`; popupDetail = "Mr. White berhasil bertahan hingga semua Civilian tersingkir!"; break;
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
        roundOverTitleH2.textContent = "🏁 Babak Selesai! 🏁";
        roundRolesListUl.innerHTML = '';
        const winningRoles = [];
        if (["CIVILIAN_TEAM"].includes(currentWinningTeamType)) winningRoles.push("Civilian");
        if (["UC_DUEL_WIN", "UC_SURVIVAL", "UC_MW_SURVIVAL"].includes(currentWinningTeamType)) winningRoles.push("Undercover");
        if (["MR_WHITE_GUESS", "MW_SURVIVAL", "UC_MW_SURVIVAL"].includes(currentWinningTeamType)) winningRoles.push("Mr. White");
        
        players.forEach(p => {
            const li = document.createElement('li');
            let roleIcon = '';
            if (p.originalRole === 'Civilian') roleIcon = '<i class="fas fa-shield-alt" style="color:var(--theme-success)"></i> ';
            else if (p.originalRole === 'Undercover') roleIcon = '<i class="fas fa-user-secret" style="color:var(--theme-error)"></i> ';
            else if (p.originalRole === 'Mr. White') roleIcon = '<i class="fas fa-user-tie" style="color:var(--theme-mrwhite)"></i> ';
            
            const isWinner = winningRoles.includes(p.originalRole);
            let status = p.isEliminated ? 'Tereliminasi' : 'Selamat';
            if (isWinner) status = '🎉 MENANG 🎉';
            
            const roundScoreForPlayer = p.roundScoreThisTurn || 0;
            li.innerHTML = `<strong>${p.name}</strong>: ${roleIcon}${p.originalRole} <span style="font-style:italic; color: var(--text-secondary);">(Kata: ${p.word})</span> - ${status} <strong style="color: var(--theme-primary);">[+${roundScoreForPlayer} Poin]</strong> (Total: ${p.score})`;
            roundRolesListUl.appendChild(li);
        });

        debugCivilianWordP.style.display = 'block'; civilianWordDisplay.textContent = civilianWord;
        if(truthOrDareSection.parentElement === eliminationResultPopup) {
             eliminationResultPopup.classList.add('hidden');
        }
    }

    function calculateAndDisplayRoundScores() {
        players.forEach(player => {
            player.roundScoreThisTurn = POINTS_LOSER;
            const isDesignatedWinner = currentWinnerPlayerObjects.some(wp => wp.name === player.name);
            switch (currentWinningTeamType) {
                case "MR_WHITE_GUESS":
                    if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_GUESS_WIN;
                    break;
                case "UC_DUEL_WIN": case "UC_SURVIVAL":
                    if (player.originalRole === "Undercover" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_UC_WIN;
                    break;
                case "MW_SURVIVAL":
                    if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_SURVIVAL_WIN;
                    break;
                case "UC_MW_SURVIVAL":
                    if (player.originalRole === "Undercover" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_UC_WIN;
                    else if (player.originalRole === "Mr. White" && isDesignatedWinner) player.roundScoreThisTurn = POINTS_MW_SURVIVAL_WIN;
                    break;
                case "CIVILIAN_TEAM":
                    if (player.originalRole === "Civilian") player.roundScoreThisTurn = player.isEliminated ? POINTS_CIVILIAN_TEAM_WIN_ELIMINATED : POINTS_CIVILIAN_TEAM_WIN_SURVIVED;
                    break;
            }
            player.score += player.roundScoreThisTurn;
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
                <td data-label="Peringkat">#${index + 1}</td>
                <td data-label="Nama Pemain">${player.name}</td>
                <td data-label="Peran Asli">${player.originalRole}</td>
                <td data-label="Total Skor" class="score-value">${player.score} Poin</td>
            `;
            finalCumulativeScoresTbody.appendChild(tr);
        });
    }

    function applyPenalty(type) {
        let item = (type === 'truth') ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        penaltyTextP.innerHTML = (type === 'truth') ? `<i class="fas fa-check-circle"></i> <strong>TRUTH:</strong> ${item}` : `<i class="fas fa-fire"></i> <strong>DARE:</strong> ${item}`;
        penaltyDisplayDiv.classList.remove('hidden'); 
        
        truthBtn.disabled = true; 
        dareBtn.disabled = true;

        if (type === 'truth') {
            truthBtn.classList.add('selected');
        } else {
            dareBtn.classList.add('selected');
        }
        
        closeEliminationPopupBtn.classList.remove('hidden', 'btn-secondary');
        closeEliminationPopupBtn.classList.add('btn-primary');
    }

    function resetTruthOrDareButtons() {
        if(truthBtn) {
            truthBtn.disabled = false; 
            truthBtn.classList.remove('selected');
        }
        if(dareBtn) {
            dareBtn.disabled = false;
            dareBtn.classList.remove('selected');
        }
        if(penaltyDisplayDiv) penaltyDisplayDiv.classList.add('hidden'); 
        if(penaltyTextP) penaltyTextP.textContent = '';
        
        if(closeEliminationPopupBtn) {
            closeEliminationPopupBtn.classList.add('hidden', 'btn-secondary');
            closeEliminationPopupBtn.classList.remove('btn-primary');
        }
    }

    resetGameFull();
});