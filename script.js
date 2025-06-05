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
    const playerNamesContainer = document.getElementById('playerNamesContainer');
    const startGameButton = document.getElementById('startGameButton');
    const roleCountError = document.getElementById('roleCountError');

    const gameSetupSection = document.getElementById('gameSetup');
    const customWordSection = document.getElementById('customWordSection');
    const gameAreaSection = document.getElementById('gameArea');
    const truthOrDareSection = document.getElementById('truthOrDareSection');
    const gameOverSection = document.getElementById('gameOverSection');

    const wordRevealInstruction = document.getElementById('wordRevealInstruction');
    const revealRoleCardButton = document.getElementById('revealRoleCardButton');
    const currentPlayerForWord = document.getElementById('currentPlayerForWord');
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

    // Tombol Navigasi Header Baru
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

    // Game State (sama seperti sebelumnya)
    let players = [];
    let civilianWord = '';
    let undercoverWord = '';
    let defaultWords = [
        "Kulkas", "Unicorn", "Ransel", "Teleskop", "Donat", "Pantai", "Keyboard", "Kaktus", "Bantal",
        "Pelangi", "Robot", "Pizza", "Jerapah", "Mikrofon", "Kamera", "Selancar", "Balon Udara",
        "Kacamata", "Jam Pasir", "Kompas", "Peta Harta Karun", "Sepatu Roda", "Rumah Pohon",
        "Kapal Selam", "Kue Ulang Tahun", "Lampu Belajar", "Mesin Waktu", "Pulau Tropis",
        "Kembang Api", "Berlian", "Topi Penyihir", "Gitar Listrik", "Astronot", "Es Krim",
        "Permen Kapas", "Puzzle", "Skateboard", "Bumerang", "Helikopter", "Sihir", "Misteri",
        "Petualangan", "Kecerdasan", "Keberuntungan", "Imajinasi", "Liburan", "Rahasia"
    ];
    let customWords = [];
    let currentPlayerIndexForWordReveal = 0;
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
    const truths = ["Apa kebohongan terbesarmu?"];
    const dares = ["Nyanyikan lagu anak-anak dengan gaya rock."];
    truths.push( "Apa hal paling memalukan yang pernah kamu lakukan?", "Siapa orang yang paling kamu kagumi dan mengapa?", "Jika kamu bisa bertukar hidup dengan seseorang selama sehari, siapa orang itu?", "Apa ketakutan terbesarmu?", "Apa momen paling membahagiakan dalam hidupmu sejauh ini?");
    dares.push( "Posting foto selfie paling konyolmu ke media sosial (dengan caption 'Aku Bangga').", "Biarkan orang lain memilihkan status WhatsApp/Instagram story untukmu selama 1 jam.", "Bicara dengan aksen aneh (misal: robot, bangsawan) selama 5 menit ke depan.");

    // --- Helper Functions ---
    function playSound(soundElement) { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.warn("Sound err:", e)); } }
    
    function updateActiveSection(activeSectionId, keepMenuSections = false) {
        const sections = [gameSetupSection, customWordSection, gameAreaSection, truthOrDareSection, gameOverSection];
        
        sections.forEach(s => {
            if(s) {
                if (s.id === activeSectionId) { s.classList.remove('hidden'); }
                else { s.classList.add('hidden'); }
            }
        });

        // Visibilitas Tombol Kembali
        if (backButton) {
            if (activeSectionId === 'customWordSection' || !instructionsModal.classList.contains('hidden')) {
                backButton.classList.remove('hidden');
            } else {
                backButton.classList.add('hidden');
            }
        }
        // Tombol Home selalu terlihat, kecuali jika Anda ingin menyembunyikannya di kondisi tertentu
        // if (homeButton) {
        //     if (activeSectionId === 'gameSetup') homeButton.classList.add('hidden');
        //     else homeButton.classList.remove('hidden');
        // }

         // Pastikan modal instruksi juga di-handle
        if (instructionsModal && activeSectionId !== 'instructionsModal' && !instructionsModal.classList.contains('hidden') && !keepMenuSections ) {
            // Jika kita pindah section dan instructions modal sedang terbuka (dan bukan target), sembunyikan
             // Cek keepMenuSections agar tidak disembunyikan jika hanya toggle customWordSection
            if (activeSectionId !== 'customWordSection'){
                instructionsModal.classList.add('hidden');
            }
        }
         // Logika tambahan untuk customWordSection dan gameSetupSection
        if (activeSectionId === 'gameSetup') {
            if(customWordSection) customWordSection.classList.add('hidden');
        } else if (activeSectionId === 'customWordSection') {
            if(gameSetupSection) gameSetupSection.classList.add('hidden');
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

    // --- Menu Event Listeners & Tombol Navigasi Header ---
    if (menuButton) menuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(); });
    if (closeMenuButton) closeMenuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(true); });
    if (menuOverlay) menuOverlay.addEventListener('click', () => { toggleMenu(true); });

    if (homeButton) {
        homeButton.addEventListener('click', () => {
            playSound(clickSound);
            resetGame(); // Tombol Home akan mereset permainan dan kembali ke setup
            toggleMenu(true); // Tutup menu jika terbuka
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            playSound(clickSound);
            if (!instructionsModal.classList.contains('hidden')) {
                instructionsModal.classList.add('hidden');
                // Setelah menutup instruksi, cek apakah kita perlu menampilkan setup atau customWord
                // Jika customWordSection adalah yg terakhir aktif sebelum instruksi, biarkan.
                // Jika tidak, kembali ke setup jika game belum mulai.
                if (customWordSection && !customWordSection.classList.contains('hidden')) {
                    // Biarkan customWordSection terlihat
                } else if (!gameInProgress && gameSetupSection) {
                    updateActiveSection('gameSetup');
                }
            } else if (customWordSection && !customWordSection.classList.contains('hidden')) {
                customWordSection.classList.add('hidden');
                if (gameSetupSection) {
                     updateActiveSection('gameSetup');
                }
            }
            // Tombol kembali akan otomatis disembunyikan oleh updateActiveSection jika kondisi tidak terpenuhi lagi
            toggleMenu(true);
        });
    }


    if (menuKamusKata && customWordSection && gameSetupSection) {
        menuKamusKata.addEventListener('click', () => {
            playSound(clickSound);
            if (gameInProgress && gameOverSection.classList.contains('hidden')) {
                alert("Kamus kata hanya bisa diakses sebelum permainan dimulai atau setelah permainan selesai.");
                toggleMenu(true);
                return;
            }
            updateActiveSection('customWordSection');
            toggleMenu(true);
        });
    }

    if (menuModeParty && numFoolsInput) { /* ... (sama seperti sebelumnya) ... */ }
    if (menuPetunjuk && instructionsModal) {
        menuPetunjuk.addEventListener('click', () => {
            playSound(clickSound);
            instructionsModal.classList.remove('hidden');
            if(backButton) backButton.classList.remove('hidden'); // Tampilkan tombol kembali
            toggleMenu(true);
        });
    }
    if (closeInstructionsButton && instructionsModal) {
        closeInstructionsButton.addEventListener('click', () => {
            playSound(clickSound);
            instructionsModal.classList.add('hidden');
            // Logika untuk tombol kembali setelah menutup instruksi
            if (customWordSection && !customWordSection.classList.contains('hidden')) {
                // Jangan lakukan apa-apa, biarkan customWordSection terlihat
                // Tombol kembali masih akan terlihat
            } else if (!gameInProgress && gameSetupSection) {
                updateActiveSection('gameSetup'); // Kembali ke setup jika game belum mulai
            } else {
                 if(backButton) backButton.classList.add('hidden'); // Sembunyikan jika tidak ada konteks kembali yang jelas
            }
        });
    }
    
    // Fungsi loadCustomWords, saveCustomWords, dll. (Sama seperti versi lengkap terakhir)
    loadCustomWords = () => { try { const stored = localStorage.getItem('customPairedWords_HTV4'); if (stored) { customWords = JSON.parse(stored); if (!Array.isArray(customWords) || !customWords.every(item => typeof item === 'object' && item.civilian && item.undercover)) { customWords = []; } } } catch (e) { customWords = []; } updateCustomWordListUI(); };
    saveCustomWords = () => { localStorage.setItem('customPairedWords_HTV4', JSON.stringify(customWords)); };
    updateCustomWordListUI = () => { if (!customWordListUl) return; customWordListUl.innerHTML = ''; customWords.forEach((pair, index) => { const li = document.createElement('li'); li.textContent = `${pair.civilian} / ${pair.undercover}`; const btn = document.createElement('button'); btn.textContent = 'Hapus'; btn.onclick = () => { playSound(clickSound); customWords.splice(index, 1); saveCustomWords(); updateCustomWordListUI(); }; li.appendChild(btn); customWordListUl.appendChild(li); }); };
    loadSavedPlayerNames = () => { if (!numPlayersInput || !playerNamesContainer) return; const saved = JSON.parse(localStorage.getItem('playerNames_HTV4')); if (saved && saved.length >= parseInt(numPlayersInput.min) && saved.length <= parseInt(numPlayersInput.max)) numPlayersInput.value = saved.length; generatePlayerNameInputs(); const inputs = playerNamesContainer.querySelectorAll('input[type="text"]'); if (saved && saved.length === inputs.length) inputs.forEach((input, i) => input.value = saved[i] || ''); };
    savePlayerNames = (arr) => { localStorage.setItem('playerNames_HTV4', JSON.stringify(arr)); };
    generatePlayerNameInputs = () => { if (!playerNamesContainer || !numPlayersInput) return; playerNamesContainer.innerHTML = ''; const num = parseInt(numPlayersInput.value) || 0; if (num >= 3 && num <= 6) { for (let i = 0; i < num; i++) { const div = document.createElement('div'); const lbl = document.createElement('label'); lbl.setAttribute('for', `playerName${i + 1}`); lbl.textContent = `Pemain ${i + 1}:`; const inp = document.createElement('input'); inp.type = 'text'; inp.id = `playerName${i + 1}`; inp.placeholder = `Nama Pemain ${i + 1}`; div.appendChild(lbl); div.appendChild(inp); playerNamesContainer.appendChild(div); } } };
    toggleMusicButton.addEventListener('click', () => { playSound(clickSound); if (bgMusic.paused) { bgMusic.play().catch(e => console.warn("Music err:", e)); toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan</span>"; } else { bgMusic.pause(); toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar</span>"; } });
    if (numPlayersInput) numPlayersInput.addEventListener('input', generatePlayerNameInputs);
    if (addPairedWordButton) addPairedWordButton.addEventListener('click', () => { playSound(clickSound); const civWord = customWordCivilianInput.value.trim(); const undWord = customWordUndercoverInput.value.trim(); if (civWord && undWord) { if (civWord.toLowerCase() === undWord.toLowerCase()) { alert('Kata Civilian dan Undercover tidak boleh sama.'); return; } const pairExists = customWords.some(pair =>(pair.civilian.toLowerCase() === civWord.toLowerCase() && pair.undercover.toLowerCase() === undWord.toLowerCase()) || (pair.civilian.toLowerCase() === undWord.toLowerCase() && pair.undercover.toLowerCase() === civWord.toLowerCase()) || pair.civilian.toLowerCase() === civWord.toLowerCase() || pair.undercover.toLowerCase() === civWord.toLowerCase() || pair.civilian.toLowerCase() === undWord.toLowerCase() || pair.undercover.toLowerCase() === undWord.toLowerCase()); if (!pairExists) { customWords.push({ civilian: civWord, undercover: undWord }); saveCustomWords(); updateCustomWordListUI(); customWordCivilianInput.value = ''; customWordUndercoverInput.value = ''; } else { alert('Pasangan kata atau salah satu kata ini sudah ada dalam kamus pribadi.'); } } else { alert('Kedua input kata (Civilian dan Undercover) harus diisi.'); } });
    if (startGameButton) startGameButton.addEventListener('click', () => { playSound(clickSound); setupGame(); });
    if (revealRoleCardButton) revealRoleCardButton.addEventListener('click', () => { playSound(clickSound); if (currentPlayerIndexForWordReveal >= players.length) return; const p = players[currentPlayerIndexForWordReveal]; let txt = ""; if (p.role === "Mr. White") txt = `Kamu <strong>Mr. White</strong>.<br><br>Berpura-pura tahu & jangan ketahuan!`; else if (p.role === "Undercover") txt = `Kamu <strong>Undercover</strong>.<br><br>Kata beda: <strong class='highlight-word'>${p.word}</strong>.<br><br>Cari pemain lain!`; else if (p.role === "The Fool") txt = `Kamu <strong>The Fool</strong> (Badut).<br><br>Tujuanmu: Buat dirimu divote keluar oleh pemain lain! Jangan sampai ketahuan kamu sengaja.`; else txt = `Kamu <strong>Civilian</strong>.<br><br>Kata: <strong class='highlight-word'>${p.word}</strong>.<br><br>Cari Undercover, Mr. White, dan The Fool!`; if(popupCardWord) popupCardWord.innerHTML = txt; if(cardPopupOverlay) cardPopupOverlay.classList.remove('hidden'); if(wordCardFlipper) wordCardFlipper.classList.remove('is-flipped'); currentWordRevealCallback = proceedToNextPlayerOrVoting; });
    if (checkMyWordAgainButton) checkMyWordAgainButton.addEventListener('click', () => { playSound(clickSound); const name = prompt("Nama Anda:"); if (name) { const p = players.find(pl => pl.name.toLowerCase() === name.toLowerCase().trim() && !pl.isOut); if (p) { let txt = ""; if (p.role === "Mr. White" || p.role === "The Fool") txt = `Hai ${p.name}, kamu <strong>${p.role}</strong>. Tidak ada kata untukmu.`; else txt = `Hai ${p.name}, kata kamu adalah: <strong class='highlight-word'>${p.word}</strong>`; if(popupCardWord) popupCardWord.innerHTML = txt; if(cardPopupOverlay) cardPopupOverlay.classList.remove('hidden'); if(wordCardFlipper) wordCardFlipper.classList.remove('is-flipped'); currentWordRevealCallback = null; } else { alert("Pemain tidak ditemukan atau sudah keluar."); } } });
    if (flipCardButton) flipCardButton.addEventListener('click', () => { playSound(clickSound); if(wordCardFlipper) wordCardFlipper.classList.add('is-flipped'); });
    if (closePopupButton) closePopupButton.addEventListener('click', () => { playSound(clickSound); if(cardPopupOverlay) cardPopupOverlay.classList.add('hidden'); if (currentWordRevealCallback) { currentWordRevealCallback(); currentWordRevealCallback = null; } });
    if (cardPopupOverlay) cardPopupOverlay.addEventListener('click', (e) => { if (e.target === cardPopupOverlay && closePopupButton) closePopupButton.click(); });
    if (activateVotingButton) activateVotingButton.addEventListener('click', () => { playSound(clickSound); isVotingModeActive = !isVotingModeActive; if (isVotingModeActive) { activateVotingButton.textContent = 'Batalkan Mode Vote'; activateVotingButton.classList.add('secondary-button'); activateVotingButton.classList.remove('primary-button'); votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain untuk memilih.'; document.querySelectorAll('#playersDisplay .player-info').forEach(pc => { const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId)); if (p && !p.isOut) pc.classList.add('votable'); }); } else { deactivateVotingMode(); } });
    if (playersDisplay) playersDisplay.addEventListener('click', (event) => { if (!isVotingModeActive) return; const card = event.target.closest('.player-info.votable:not(.voted-out)'); if (!card) return; playSound(clickSound); const pId = parseInt(card.dataset.playerId); playerSelectedForVote = players.find(p => p.id === pId); if (playerSelectedForVote) { document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote')); card.classList.add('selected-for-vote'); if(voteConfirmMessage) voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`; if(voteConfirmModal) voteConfirmModal.classList.remove('hidden'); } });
    if (confirmVoteYesButton) confirmVoteYesButton.addEventListener('click', () => { playSound(clickSound); if (playerSelectedForVote) { currentRoundVotedOut = playerSelectedForVote; currentRoundVotedOut.isOut = true; aFoolHasWon = false; updatePlayersDisplayUI(); if(votingSection) votingSection.classList.add('hidden'); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); deactivateVotingMode(); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); if (currentRoundVotedOut.role === "The Fool") { playSound(foolWinSound); currentRoundVotedOut.score += 2; savePlayerScores(); if(foolWinnerMessage) foolWinnerMessage.textContent = `${currentRoundVotedOut.name} (The Fool) berhasil divote keluar dan MENANG!`; if(foolVotedOutMessage) foolVotedOutMessage.classList.remove('hidden'); aFoolHasWon = true; setTimeout(() => { if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); checkGameContinuationOrEnd(); }, 4000); } else if (currentRoundVotedOut.role === "Undercover") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!"); } else if (currentRoundVotedOut.role === "Mr. White") { if(mrWhiteGuessSection) mrWhiteGuessSection.classList.remove('hidden'); } else if (currentRoundVotedOut.role === "Civilian") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Civilian salah divote!"); } playerSelectedForVote = null; } });
    if (confirmVoteNoButton) confirmVoteNoButton.addEventListener('click', () => { playSound(clickSound); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); if (playerSelectedForVote) { const card = document.querySelector(`.player-info[data-player-id='${playerSelectedForVote.id}']`); if (card) card.classList.remove('selected-for-vote'); } playerSelectedForVote = null; });
    if (submitMrWhiteGuessButton) submitMrWhiteGuessButton.addEventListener('click', () => { playSound(clickSound); const guess = mrWhiteWordGuessInput.value.trim().toLowerCase(); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") { if (guess === civilianWord.toLowerCase()) { playSound(winSound); currentRoundVotedOut.score++; savePlayerScores(); updatePlayersDisplayUI(); endGame(`Mr. White (${currentRoundVotedOut.name}) menebak benar! Kata Civilian adalah: ${civilianWord}. Mr. White Menang!`); } else { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Mr. White salah tebak kata."); } if(mrWhiteWordGuessInput) mrWhiteWordGuessInput.value = ''; } });
    if (getTruthButton) getTruthButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * truths.length); if(truthOrDareChallengeP) truthOrDareChallengeP.innerHTML = `<strong>TRUTH:</strong> ${truths[idx]}`; getTruthButton.disabled = true; if(getDareButton) getDareButton.disabled = true; });
    if (getDareButton) getDareButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * dares.length); if(truthOrDareChallengeP) truthOrDareChallengeP.innerHTML = `<strong>DARE:</strong> ${dares[idx]}`; if(getTruthButton) getTruthButton.disabled = true; getDareButton.disabled = true; });
    if (punishmentDoneButton) punishmentDoneButton.addEventListener('click', () => { playSound(clickSound); if(truthOrDareSection) truthOrDareSection.classList.add('hidden'); if(truthOrDareChallengeP) truthOrDareChallengeP.textContent = ''; if(getTruthButton) getTruthButton.disabled = false; if(getDareButton) getDareButton.disabled = false; checkGameContinuationOrEnd(); });
    if (restartGameButton) restartGameButton.addEventListener('click', () => { playSound(clickSound); resetGame(); });
    function setupGame() { /* ... (sama seperti versi lengkap terakhir, termasuk validasi Fool) ... */ 
        if(roleCountError) roleCountError.textContent = "";
        const numTotal = parseInt(numPlayersInput.value);
        const numCivs = parseInt(numCiviliansInput.value);
        const numUnds = parseInt(numUndercoversInput.value);
        const numMWs = parseInt(numMrWhiteInput.value);
        const numFools = parseInt(numFoolsInput.value); 

        if (numTotal < 3 || numTotal > 6) { if(roleCountError) roleCountError.textContent = "Jumlah pemain harus antara 3-6."; return; }
        if (numCivs < 1 && numFools === 0 && (numUnds > 0 || numMWs > 0) ) { // Civilian diperlukan jika ada peran jahat standar dan tidak ada Fool
             if(roleCountError) roleCountError.textContent = "Minimal harus ada 1 Civilian jika ada Undercover/Mr.White dan tidak ada The Fool."; return;
        } else if (numCivs < 0 && numFools > 0 && numUnds === 0 && numMWs === 0 && numTotal > 1) {
            // Jika hanya Fool dan Civilian, Civilian bisa 0 jika Fool ada, tapi total pemain harus cukup
        } else if (numCivs < 1 && numFools === 0) { // Jika tidak ada peran jahat dan tidak ada fool, civ minimal 1
             if(roleCountError) roleCountError.textContent = "Minimal harus ada 1 Civilian."; return;
        }

        if (numCivs < 0 || numUnds < 0 || numMWs < 0 || numFools < 0) { if(roleCountError) roleCountError.textContent = "Jumlah peran tidak boleh negatif."; return; }
        if (numFools > 1) { if(roleCountError) roleCountError.textContent = "Maksimal hanya boleh ada 1 The Fool."; return; }
        if (numCivs + numUnds + numMWs + numFools !== numTotal) { if(roleCountError) roleCountError.textContent = "Total semua peran harus sama dengan jumlah pemain."; return; }
        
        const inputs = playerNamesContainer.querySelectorAll('input[type="text"]'); let names = [];
        for (let i = 0; i < inputs.length; i++) {
            const name = inputs[i].value.trim();
            if (name === "") { if(roleCountError) roleCountError.textContent = `Nama Pemain ${i + 1} tidak boleh kosong.`; return; }
            if (names.map(n => n.toLowerCase()).includes(name.toLowerCase())) { if(roleCountError) roleCountError.textContent = `Nama "${name}" sudah digunakan. Gunakan nama unik.`; return; }
            names.push(name);
        }
        if (names.length !== numTotal) { if(roleCountError) roleCountError.textContent = "Jumlah nama pemain tidak sesuai dengan jumlah pemain yang diinput."; return; }
        savePlayerNames(names);

        const wordOpportunities = [ ...defaultWords.map(w => ({ type: 'single', word: w })), ...customWords.map(p => ({ type: 'pair', pair: p })) ];
        if (wordOpportunities.length === 0 && (numCivs > 0 || numUnds > 0)) { if(roleCountError) roleCountError.textContent = "Kamus kata (default dan pribadi) kosong."; return; }

        civilianWord = ''; undercoverWord = '';
        if (numCivs > 0 || numUnds > 0) { // Hanya pilih kata jika ada Civ atau Und
            const chosenOpportunity = wordOpportunities[Math.floor(Math.random() * wordOpportunities.length)];
            if (chosenOpportunity.type === 'pair') {
                civilianWord = chosenOpportunity.pair.civilian;
                undercoverWord = chosenOpportunity.pair.undercover;
            } else {
                civilianWord = chosenOpportunity.word;
                let flatWordList = [ ...defaultWords, ...customWords.flatMap(p => [p.civilian, p.undercover]) ].filter((value, index, self) => self.indexOf(value) === index);
                if (flatWordList.length <= 1 || (flatWordList.length === 1 && flatWordList[0] === civilianWord && numUnds > 0)) { // Jika hanya satu kata dan ada UC
                    undercoverWord = civilianWord; // Terpaksa sama
                     if (numUnds > 0) { // Beri peringatan jika UC ada tapi kata terpaksa sama
                        console.warn("Peringatan: Kata Undercover terpaksa sama dengan Civilian karena keterbatasan kamus.");
                        // Bisa juga tampilkan ini ke pengguna jika perlu: roleCountError.textContent = "Kamus kata kurang beragam untuk Undercover."; return;
                     }
                } else if (numUnds > 0) { // Hanya cari kata berbeda jika ada UC
                    let tempUndercoverWord;
                    do { tempUndercoverWord = flatWordList[Math.floor(Math.random() * flatWordList.length)]; } while (tempUndercoverWord === civilianWord);
                    undercoverWord = tempUndercoverWord;
                } else { // Jika tidak ada UC, kata UC tidak relevan
                    undercoverWord = civilianWord; 
                }
            }
             if (numUnds === 0) undercoverWord = civilianWord; // Jika tidak ada UC, samakan saja kata UC
        }


        let rolesToAssign = [];
        for (let i = 0; i < numCivs; i++) rolesToAssign.push("Civilian");
        for (let i = 0; i < numUnds; i++) rolesToAssign.push("Undercover");
        for (let i = 0; i < numMWs; i++) rolesToAssign.push("Mr. White");
        for (let i = 0; i < numFools; i++) rolesToAssign.push("The Fool"); 

        for (let i = rolesToAssign.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rolesToAssign[i], rolesToAssign[j]] = [rolesToAssign[j], rolesToAssign[i]]; }

        players = []; const scores = JSON.parse(localStorage.getItem('playerScores_HTV4')) || {};
        names.forEach((name, i) => {
            const role = rolesToAssign[i];
            let wordForPlayer = null;
            if (role === "Civilian") wordForPlayer = civilianWord;
            else if (role === "Undercover") wordForPlayer = undercoverWord;
            players.push({ id: i, name: name, role: role, word: wordForPlayer, avatar: avatarImages[i % avatarImages.length], score: scores[name] || 0, isOut: false });
        });

        initialCiviliansCount = numCivs;
        initialFoolsCount = numFools; 
        aFoolHasWon = false; 
        gameInProgress = true; currentRoundVotedOut = null; currentPlayerIndexForWordReveal = 0;

        updateActiveSection('gameArea');
        if(wordRevealInstruction) wordRevealInstruction.classList.remove('hidden'); 
        if(revealRoleCardButton) revealRoleCardButton.classList.remove('hidden');
        if(votingSection) votingSection.classList.add('hidden'); 
        if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); 
        if(checkMyWordAgainButton) checkMyWordAgainButton.classList.remove('hidden'); // Tampilkan tombol lupa kata
        if(restartGameButton) restartGameButton.classList.remove('hidden');
        if(customWordSection) customWordSection.classList.add('hidden'); 

        if(currentPlayerForWord) currentPlayerForWord.textContent = players[currentPlayerIndexForWordReveal].name;
        updatePlayersDisplayUI();    
    }
    proceedToNextPlayerOrVoting = () => { /* ... (sama seperti versi lengkap terakhir) ... */ currentPlayerIndexForWordReveal++; if (currentPlayerIndexForWordReveal < players.length) { if(currentPlayerForWord) currentPlayerForWord.textContent = players[currentPlayerIndexForWordReveal].name; if(revealRoleCardButton) revealRoleCardButton.classList.remove('hidden'); } else { if(wordRevealInstruction) wordRevealInstruction.classList.add('hidden'); if(revealRoleCardButton) revealRoleCardButton.classList.add('hidden'); if(votingSection) votingSection.classList.remove('hidden'); if(activateVotingButton){activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button');} if(votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; if(checkMyWordAgainButton) checkMyWordAgainButton.classList.remove('hidden'); } };
    updatePlayersDisplayUI = () => { /* ... (sama seperti versi lengkap terakhir) ... */ if(!playersDisplay) return; playersDisplay.innerHTML = ''; players.forEach(p => { const d = document.createElement('div'); d.classList.add('player-info'); d.dataset.playerId = p.id; if (p.isOut) d.classList.add('voted-out'); d.innerHTML = `<img src="${p.avatar}" alt="Avatar ${p.name}"><div><strong>${p.name}</strong>${p.isOut ? `<span class="player-status">(KELUAR - ${p.role})</span>` : `<span class="player-status">(Skor: ${p.score})</span>`}</div>`; playersDisplay.appendChild(d); }); };
    deactivateVotingMode = () => { /* ... (sama seperti versi lengkap terakhir) ... */ isVotingModeActive = false; if(activateVotingButton){activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button');} if(votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; document.querySelectorAll('#playersDisplay .player-info.votable').forEach(pc => { pc.classList.remove('votable'); pc.classList.remove('selected-for-vote'); }); playerSelectedForVote = null; };
    triggerTruthOrDare = (player, reason) => { /* ... (sama seperti versi lengkap terakhir) ... */ if (aFoolHasWon) { checkGameContinuationOrEnd(); return; } if(punishedPlayerName) punishedPlayerName.textContent = `${player.name} (${player.role}) ${reason} Harus Truth or Dare!`; updateActiveSection('truthOrDareSection'); if(truthOrDareChallengeP) truthOrDareChallengeP.textContent = ''; if(getTruthButton) getTruthButton.disabled = false; if(getDareButton) getDareButton.disabled = false; };
    checkGameContinuationOrEnd = () => { /* ... (sama seperti versi lengkap terakhir, termasuk cek aFoolHasWon) ... */ if (aFoolHasWon) { endGame(foolWinnerMessage && foolWinnerMessage.textContent ? `${foolWinnerMessage.textContent} Permainan selesai lebih awal!` : "The Fool Menang! Permainan selesai."); return; } const activeP = players.filter(p => !p.isOut); const activeC = activeP.filter(p => p.role === "Civilian"); const activeU = activeP.filter(p => p.role === "Undercover"); const activeMW = activeP.filter(p => p.role === "Mr. White"); let end = false, msg = ""; if (activeU.length === 0 && activeMW.length === 0 && activeC.length > 0) { end = true; activeC.forEach(p => p.score++); msg = "SEMUA PENJAHAT KALAH! CIVILIAN MENANG!"; playSound(winSound); } else if (activeC.length === 0 && (activeU.length > 0 || activeMW.length > 0)) { end = true; let winners = []; activeU.forEach(p => { p.score++; if (!winners.includes("Undercover")) winners.push("Undercover"); }); activeMW.forEach(p => { p.score++; if (!winners.includes("Mr. White")) winners.push("Mr. White"); }); msg = `${winners.join(" & ")} MENANG karena Civilian habis!`; playSound(winSound); } else if (activeP.length <= 2 && (activeU.length > 0 || activeMW.length > 0)) { if (activeP.length === 2 && (activeU.find(p => !p.isOut) || activeMW.find(p => !p.isOut))) { end = true; let winners = []; activeU.forEach(p => { p.score++; if (!winners.includes("Undercover")) winners.push("Undercover"); }); activeMW.forEach(p => { p.score++; if (!winners.includes("Mr. White")) winners.push("Mr. White"); }); if (winners.length > 0) { msg = `${winners.join(" & ")} MENANG karena situasi kritis!`; playSound(winSound); } else { if (activeC.length > 0) { activeC.forEach(p => p.score++); msg = "CIVILIAN MENANG karena situasi kritis!"; playSound(winSound); } else { msg = "Permainan berakhir tanpa pemenang yang jelas dari peran standar."; } } } } currentRoundVotedOut = null; if (end) { savePlayerScores(); endGame(msg); } else { updateActiveSection('gameArea'); if(votingSection) votingSection.classList.remove('hidden'); if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); deactivateVotingMode(); } };
    endGame = (message) => { /* ... (sama seperti versi lengkap terakhir) ... */ gameInProgress = false; if(gameWinnerP) gameWinnerP.textContent = message; displayScoresUI(); updateActiveSection('gameOverSection'); if(checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden'); if(restartGameButton) restartGameButton.classList.remove('hidden'); if(customWordSection) customWordSection.classList.add('hidden');};
    savePlayerScores = () => { /* ... (sama seperti versi lengkap terakhir) ... */ const scores = {}; players.forEach(p => { scores[p.name] = p.score; }); localStorage.setItem('playerScores_HTV4', JSON.stringify(scores)); };
    displayScoresUI = () => { /* ... (sama seperti versi lengkap terakhir) ... */ if(!scoreListUl) return; scoreListUl.innerHTML = ''; const sorted = [...players].sort((a,b) => b.score - a.score); sorted.forEach(p => { const li = document.createElement('li'); li.innerHTML = `<strong>${p.name}</strong> (${p.role}): ${p.score} poin`; scoreListUl.appendChild(li); }); };
    resetGame = () => { /* ... (sama seperti versi lengkap terakhir, termasuk reset Fool state) ... */ players = []; civilianWord = ''; undercoverWord = ''; currentPlayerIndexForWordReveal = 0; gameInProgress = false; initialCiviliansCount = 0; initialFoolsCount = 0; aFoolHasWon = false; currentRoundVotedOut = null; if(roleCountError) roleCountError.textContent = ''; deactivateVotingMode(); updateActiveSection('gameSetup'); if(customWordSection) customWordSection.classList.add('hidden'); if(restartGameButton) restartGameButton.classList.add('hidden'); if(checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden'); if(wordRevealInstruction) wordRevealInstruction.classList.add('hidden'); if(votingSection) votingSection.classList.add('hidden'); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); if(truthOrDareSection) truthOrDareSection.classList.add('hidden'); if(gameOverSection) gameOverSection.classList.add('hidden'); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); loadSavedPlayerNames(); if (bgMusic && toggleMusicButton) { if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>"; else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>"; } if(backButton) backButton.classList.add('hidden'); /* Sembunyikan tombol kembali saat reset */};

    function initializeApp() {
        loadCustomWords();
        loadSavedPlayerNames();
        updateActiveSection('gameSetup');
        if(customWordSection) customWordSection.classList.add('hidden');
        if(backButton) backButton.classList.add('hidden'); // Pastikan tombol kembali tersembunyi di awal

        if (bgMusic && toggleMusicButton) {
            if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
        }
    }

    initializeApp();
});