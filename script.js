document.addEventListener('DOMContentLoaded', () => {
    // Audio Elements
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');
    const foolWinSound = document.getElementById('foolWinSound'); // Suara untuk Fool menang

    // DOM Element References
    const numPlayersInput = document.getElementById('numPlayers');
    const numCiviliansInput = document.getElementById('numCivilians');
    const numUndercoversInput = document.getElementById('numUndercovers');
    const numMrWhiteInput = document.getElementById('numMrWhite');
    const numFoolsInput = document.getElementById('numFools'); // Input untuk The Fool
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
    const foolVotedOutMessage = document.getElementById('foolVotedOutMessage'); // Pesan jika Fool menang
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

    const cardPopupOverlay = document.getElementById('cardPopupOverlay');
    const wordCardFlipper = document.getElementById('wordCardFlipper');
    const popupCardWord = document.getElementById('popupCardWord');
    const flipCardButton = document.getElementById('flipCardButton');
    const closePopupButton = document.getElementById('closePopupButton');

    const voteConfirmModal = document.getElementById('voteConfirmModal');
    const voteConfirmMessage = document.getElementById('voteConfirmMessage');
    const confirmVoteYesButton = document.getElementById('confirmVoteYesButton');
    const confirmVoteNoButton = document.getElementById('confirmVoteNoButton');

    // Menu Elements
    const menuButton = document.getElementById('menuButton');
    const menuPanel = document.getElementById('menuPanel');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuKamusKata = document.getElementById('menuKamusKata');
    const menuModeParty = document.getElementById('menuModeParty'); // Bisa digunakan nanti
    const menuPetunjuk = document.getElementById('menuPetunjuk');

    // Instructions Modal Elements
    const instructionsModal = document.getElementById('instructionsModal');
    const closeInstructionsButton = document.getElementById('closeInstructionsButton');

    // Game State
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
    let initialFoolsCount = 0; // Untuk The Fool
    let currentRoundVotedOut = null;
    let currentWordRevealCallback = null;
    let isVotingModeActive = false;
    let playerSelectedForVote = null;
    let aFoolHasWon = false; // Penanda jika The Fool sudah menang

    const avatarImages = [
        'assets/images/avatar1.png', 'assets/images/avatar2.png', 'assets/images/avatar3.png',
        'assets/images/avatar4.png', 'assets/images/avatar5.png', 'assets/images/avatar6.png'
    ];
    const truths = ["Apa kebohongan terbesarmu?"];
    const dares = ["Nyanyikan lagu anak-anak dengan gaya rock."];
    truths.push(
        "Apa hal paling memalukan yang pernah kamu lakukan?",
        "Siapa orang yang paling kamu kagumi dan mengapa?", "Jika kamu bisa bertukar hidup dengan seseorang selama sehari, siapa orang itu?",
        "Apa ketakutan terbesarmu?", "Apa momen paling membahagiakan dalam hidupmu sejauh ini?"
    );
    dares.push(
        "Posting foto selfie paling konyolmu ke media sosial (dengan caption 'Aku Bangga').",
        "Biarkan orang lain memilihkan status WhatsApp/Instagram story untukmu selama 1 jam.",
        "Bicara dengan aksen aneh (misal: robot, bangsawan) selama 5 menit ke depan."
    );

    // --- Helper Functions ---
    function playSound(soundElement) { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.warn("Sound err:", e)); } }
    function updateActiveSection(activeSectionId, keepMenuSections = false) {
        const sections = [gameSetupSection, gameAreaSection, truthOrDareSection, gameOverSection];
        // Jika tidak keepMenuSections, sembunyikan juga customWordSection
        if (!keepMenuSections && customWordSection) {
            customWordSection.classList.add('hidden');
        }
        // Sembunyikan instructionsModal juga jika tidak spesifik menampilkannya
        if (instructionsModal && activeSectionId !== 'instructionsModal') { // Cek jika kita mau menampilkan instructions modal
             instructionsModal.classList.add('hidden');
        }

        sections.forEach(s => {
            if(s) {
                if (s.id === activeSectionId) {
                    s.classList.remove('hidden');
                } else {
                    s.classList.add('hidden');
                }
            }
        });
    }

    function toggleMenu(forceClose = false) {
        if (forceClose || menuPanel.classList.contains('open')) {
            menuPanel.classList.remove('open');
            menuOverlay.classList.add('hidden');
        } else {
            menuPanel.classList.add('open');
            menuOverlay.classList.remove('hidden');
        }
    }

    // --- Menu Event Listeners ---
    menuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(); });
    closeMenuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(true); });
    menuOverlay.addEventListener('click', () => { toggleMenu(true); });

    menuKamusKata.addEventListener('click', () => {
        playSound(clickSound);
        if (gameInProgress) {
            alert("Kamus kata hanya bisa diakses sebelum permainan dimulai atau setelah permainan selesai.");
            toggleMenu(true);
            return;
        }
        // Tampilkan customWordSection dan sembunyikan setup jika setup aktif
        if (gameSetupSection.classList.contains('active-section') || gameOverSection.classList.contains('hidden')) { // Tampilkan jika di setup atau game over
            customWordSection.classList.toggle('hidden');
            gameSetupSection.classList.toggle('hidden', !customWordSection.classList.contains('hidden'));
        } else {
            customWordSection.classList.toggle('hidden');
        }
        updateActiveSection(customWordSection.classList.contains('hidden') ? 'gameSetup' : 'customWordSection', true);

        // Jika customWordSection ditampilkan, pastikan gameSetup disembunyikan jika sedang tidak aktif
        // Dan jika customWordSection disembunyikan, pastikan gameSetup ditampilkan kembali jika itu section aktif sebelumnya
        if (!customWordSection.classList.contains('hidden')) {
            if(!gameAreaSection.classList.contains('hidden') || !truthOrDareSection.classList.contains('hidden') || !gameOverSection.classList.contains('hidden')){
                 // Jangan tampilkan gameSetup jika game sedang berjalan di area lain
            } else {
                gameSetupSection.classList.add('hidden');
            }
        } else {
             if(!gameAreaSection.classList.contains('hidden') || !truthOrDareSection.classList.contains('hidden') || !gameOverSection.classList.contains('hidden')){
                // Jangan lakukan apa-apa pada gameSetup jika game berjalan
             } else if (!gameInProgress) { // Hanya tampilkan gameSetup jika game belum mulai
                gameSetupSection.classList.remove('hidden');
                updateActiveSection('gameSetup', true);
             }
        }
        toggleMenu(true); // Tutup menu setelah diklik
    });

    menuModeParty.addEventListener('click', () => {
        playSound(clickSound);
        // Untuk saat ini, tombol ini bisa menjadi placeholder.
        // Atau bisa toggle visibilitas input numFools jika sedang di gameSetup.
        alert("Mode Party dengan The Fool akan aktif jika jumlah The Fool > 0 pada pengaturan.");
        const foolInputDiv = numFoolsInput.parentElement;
        if (foolInputDiv) { // Jika input The Fool ada
            // Contoh: buat input berkedip atau beri highlight
            foolInputDiv.style.transition = 'background-color 0.3s ease';
            foolInputDiv.style.backgroundColor = 'var(--secondary-color)';
            setTimeout(() => {
                foolInputDiv.style.backgroundColor = '';
            }, 600);
        }
        toggleMenu(true);
    });

    menuPetunjuk.addEventListener('click', () => {
        playSound(clickSound);
        instructionsModal.classList.remove('hidden');
        toggleMenu(true);
    });

    closeInstructionsButton.addEventListener('click', () => {
        playSound(clickSound);
        instructionsModal.classList.add('hidden');
    });


    function loadCustomWords() { /* ... (sama seperti sebelumnya) ... */ }
    function saveCustomWords() { /* ... (sama seperti sebelumnya) ... */ }
    function updateCustomWordListUI() { /* ... (sama seperti sebelumnya) ... */ }
    loadSavedPlayerNames = () => { /* ... (sama seperti sebelumnya) ... */ };
    savePlayerNames = (arr) => { /* ... (sama seperti sebelumnya) ... */ };
    generatePlayerNameInputs = () => { /* ... (sama seperti sebelumnya) ... */ };

    loadCustomWords = () => {
        try {
            const stored = localStorage.getItem('customPairedWords_HTV4');
            if (stored) {
                customWords = JSON.parse(stored);
                if (!Array.isArray(customWords) || !customWords.every(item => typeof item === 'object' && item.civilian && item.undercover)) {
                    customWords = [];
                }
            }
        } catch (e) { customWords = []; }
        updateCustomWordListUI();
    };
    saveCustomWords = () => { localStorage.setItem('customPairedWords_HTV4', JSON.stringify(customWords)); };
    updateCustomWordListUI = () => {
        customWordListUl.innerHTML = '';
        customWords.forEach((pair, index) => {
            const li = document.createElement('li');
            li.textContent = `${pair.civilian} / ${pair.undercover}`;
            const btn = document.createElement('button');
            btn.textContent = 'Hapus';
            btn.onclick = () => {
                playSound(clickSound);
                customWords.splice(index, 1);
                saveCustomWords();
                updateCustomWordListUI();
            };
            li.appendChild(btn);
            customWordListUl.appendChild(li);
        });
    };
     loadSavedPlayerNames = () => {
        const saved = JSON.parse(localStorage.getItem('playerNames_HTV4'));
        if (saved && saved.length >= parseInt(numPlayersInput.min) && saved.length <= parseInt(numPlayersInput.max)) numPlayersInput.value = saved.length;
        generatePlayerNameInputs();
        const inputs = playerNamesContainer.querySelectorAll('input[type="text"]');
        if (saved && saved.length === inputs.length) inputs.forEach((input, i) => input.value = saved[i] || '');
    };
    savePlayerNames = (arr) => { localStorage.setItem('playerNames_HTV4', JSON.stringify(arr)); };
    generatePlayerNameInputs = () => {
        playerNamesContainer.innerHTML = ''; const num = parseInt(numPlayersInput.value) || 0;
        if (num >= 3 && num <= 6) {
            for (let i = 0; i < num; i++) {
                const div = document.createElement('div'); const lbl = document.createElement('label');
                lbl.setAttribute('for', `playerName${i + 1}`); lbl.textContent = `Pemain ${i + 1}:`;
                const inp = document.createElement('input'); inp.type = 'text'; inp.id = `playerName${i + 1}`; inp.placeholder = `Nama Pemain ${i + 1}`;
                div.appendChild(lbl); div.appendChild(inp); playerNamesContainer.appendChild(div);
            }
        }
    };


    toggleMusicButton.addEventListener('click', () => { playSound(clickSound); if (bgMusic.paused) { bgMusic.play().catch(e => console.warn("Music err:", e)); toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan</span>"; } else { bgMusic.pause(); toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar</span>"; } });
    numPlayersInput.addEventListener('input', generatePlayerNameInputs);

    addPairedWordButton.addEventListener('click', () => {
        playSound(clickSound);
        const civWord = customWordCivilianInput.value.trim();
        const undWord = customWordUndercoverInput.value.trim();
        if (civWord && undWord) {
            if (civWord.toLowerCase() === undWord.toLowerCase()) { alert('Kata Civilian dan Undercover tidak boleh sama.'); return; }
            const pairExists = customWords.some(pair =>(pair.civilian.toLowerCase() === civWord.toLowerCase() && pair.undercover.toLowerCase() === undWord.toLowerCase()) || (pair.civilian.toLowerCase() === undWord.toLowerCase() && pair.undercover.toLowerCase() === civWord.toLowerCase()) || pair.civilian.toLowerCase() === civWord.toLowerCase() || pair.undercover.toLowerCase() === civWord.toLowerCase() || pair.civilian.toLowerCase() === undWord.toLowerCase() || pair.undercover.toLowerCase() === undWord.toLowerCase());
            if (!pairExists) { customWords.push({ civilian: civWord, undercover: undWord }); saveCustomWords(); updateCustomWordListUI(); customWordCivilianInput.value = ''; customWordUndercoverInput.value = '';
            } else { alert('Pasangan kata atau salah satu kata ini sudah ada dalam kamus pribadi.'); }
        } else { alert('Kedua input kata (Civilian dan Undercover) harus diisi.'); }
    });

    startGameButton.addEventListener('click', () => { playSound(clickSound); setupGame(); });

    revealRoleCardButton.addEventListener('click', () => {
        playSound(clickSound);
        if (currentPlayerIndexForWordReveal >= players.length) return;
        const p = players[currentPlayerIndexForWordReveal];
        let txt = "";
        if (p.role === "Mr. White") txt = `Kamu <strong>Mr. White</strong>.<br><br>Berpura-pura tahu & jangan ketahuan!`;
        else if (p.role === "Undercover") txt = `Kamu <strong>Undercover</strong>.<br><br>Kata beda: <strong class='highlight-word'>${p.word}</strong>.<br><br>Cari pemain lain!`;
        else if (p.role === "The Fool") txt = `Kamu <strong>The Fool</strong> (Badut).<br><br>Tujuanmu: Buat dirimu divote keluar oleh pemain lain! Jangan sampai ketahuan kamu sengaja.`;
        else txt = `Kamu <strong>Civilian</strong>.<br><br>Kata: <strong class='highlight-word'>${p.word}</strong>.<br><br>Cari Undercover, Mr. White, dan The Fool!`;
        popupCardWord.innerHTML = txt;
        cardPopupOverlay.classList.remove('hidden');
        wordCardFlipper.classList.remove('is-flipped');
        currentWordRevealCallback = proceedToNextPlayerOrVoting;
    });

    checkMyWordAgainButton.addEventListener('click', () => {
        playSound(clickSound);
        const name = prompt("Nama Anda:");
        if (name) {
            const p = players.find(pl => pl.name.toLowerCase() === name.toLowerCase().trim() && !pl.isOut);
            if (p) {
                let txt = "";
                if (p.role === "Mr. White" || p.role === "The Fool") txt = `Hai ${p.name}, kamu <strong>${p.role}</strong>. Tidak ada kata untukmu.`;
                else txt = `Hai ${p.name}, kata kamu adalah: <strong class='highlight-word'>${p.word}</strong>`;
                popupCardWord.innerHTML = txt;
                cardPopupOverlay.classList.remove('hidden');
                wordCardFlipper.classList.remove('is-flipped');
                currentWordRevealCallback = null;
            } else { alert("Pemain tidak ditemukan atau sudah keluar."); }
        }
    });

    flipCardButton.addEventListener('click', () => { playSound(clickSound); wordCardFlipper.classList.add('is-flipped'); });
    closePopupButton.addEventListener('click', () => { playSound(clickSound); cardPopupOverlay.classList.add('hidden'); if (currentWordRevealCallback) { currentWordRevealCallback(); currentWordRevealCallback = null; } });
    cardPopupOverlay.addEventListener('click', (e) => { if (e.target === cardPopupOverlay) closePopupButton.click(); });
    activateVotingButton.addEventListener('click', () => { playSound(clickSound); isVotingModeActive = !isVotingModeActive; if (isVotingModeActive) { activateVotingButton.textContent = 'Batalkan Mode Vote'; activateVotingButton.classList.add('secondary-button'); activateVotingButton.classList.remove('primary-button'); votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain untuk memilih.'; document.querySelectorAll('#playersDisplay .player-info').forEach(pc => { const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId)); if (p && !p.isOut) pc.classList.add('votable'); }); } else { deactivateVotingMode(); } });
    playersDisplay.addEventListener('click', (event) => { if (!isVotingModeActive) return; const card = event.target.closest('.player-info.votable:not(.voted-out)'); if (!card) return; playSound(clickSound); const pId = parseInt(card.dataset.playerId); playerSelectedForVote = players.find(p => p.id === pId); if (playerSelectedForVote) { document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote')); card.classList.add('selected-for-vote'); voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`; voteConfirmModal.classList.remove('hidden'); } });

    confirmVoteYesButton.addEventListener('click', () => {
        playSound(clickSound);
        if (playerSelectedForVote) {
            currentRoundVotedOut = playerSelectedForVote;
            currentRoundVotedOut.isOut = true;
            aFoolHasWon = false; // Reset status kemenangan Fool setiap vote

            updatePlayersDisplayUI();
            votingSection.classList.add('hidden');
            mrWhiteGuessSection.classList.add('hidden');
            foolVotedOutMessage.classList.add('hidden');
            deactivateVotingMode();
            voteConfirmModal.classList.add('hidden');

            if (currentRoundVotedOut.role === "The Fool") {
                playSound(foolWinSound); // Atau suara kemenangan khusus
                currentRoundVotedOut.score += 2; // Misal The Fool dapat 2 poin
                savePlayerScores();
                foolWinnerMessage.textContent = `${currentRoundVotedOut.name} (The Fool) berhasil divote keluar dan MENANG!`;
                foolVotedOutMessage.classList.remove('hidden');
                aFoolHasWon = true; // Tandai bahwa The Fool telah menang
                // Pertimbangkan apakah game langsung berakhir atau lanjut jika ada target lain
                // Untuk sekarang, kita biarkan checkGameContinuationOrEnd() yang memutuskan
                // Namun, kita perlu mekanisme agar game tidak langsung lanjut ke ToD jika Fool menang
                setTimeout(() => { // Beri jeda agar pesan terlihat
                    foolVotedOutMessage.classList.add('hidden');
                    checkGameContinuationOrEnd();
                }, 4000);


            } else if (currentRoundVotedOut.role === "Undercover") {
                playSound(loseSound);
                triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!");
            } else if (currentRoundVotedOut.role === "Mr. White") {
                mrWhiteGuessSection.classList.remove('hidden');
            } else if (currentRoundVotedOut.role === "Civilian") {
                // Civilian keluar, bisa jadi ToD atau game lanjut/selesai
                playSound(loseSound); // Civilian yang keluar biasanya tidak bagus untuk tim Civilian
                triggerTruthOrDare(currentRoundVotedOut, "Civilian salah divote!");
            }
            playerSelectedForVote = null;
        }
    });

    confirmVoteNoButton.addEventListener('click', () => { playSound(clickSound); voteConfirmModal.classList.add('hidden'); if (playerSelectedForVote) { const card = document.querySelector(`.player-info[data-player-id='${playerSelectedForVote.id}']`); if (card) card.classList.remove('selected-for-vote'); } playerSelectedForVote = null; });
    submitMrWhiteGuessButton.addEventListener('click', () => { playSound(clickSound); const guess = mrWhiteWordGuessInput.value.trim().toLowerCase(); mrWhiteGuessSection.classList.add('hidden'); if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") { if (guess === civilianWord.toLowerCase()) { playSound(winSound); currentRoundVotedOut.score++; savePlayerScores(); updatePlayersDisplayUI(); endGame(`Mr. White (${currentRoundVotedOut.name}) menebak benar! Kata Civilian adalah: ${civilianWord}. Mr. White Menang!`); } else { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Mr. White salah tebak kata."); } mrWhiteWordGuessInput.value = ''; } });
    getTruthButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * truths.length); truthOrDareChallengeP.innerHTML = `<strong>TRUTH:</strong> ${truths[idx]}`; getTruthButton.disabled = true; getDareButton.disabled = true; });
    getDareButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * dares.length); truthOrDareChallengeP.innerHTML = `<strong>DARE:</strong> ${dares[idx]}`; getTruthButton.disabled = true; getDareButton.disabled = true; });
    punishmentDoneButton.addEventListener('click', () => { playSound(clickSound); truthOrDareSection.classList.add('hidden'); truthOrDareChallengeP.textContent = ''; getTruthButton.disabled = false; getDareButton.disabled = false; checkGameContinuationOrEnd(); });
    restartGameButton.addEventListener('click', () => { playSound(clickSound); resetGame(); });


    function setupGame() {
        roleCountError.textContent = "";
        const numTotal = parseInt(numPlayersInput.value);
        const numCivs = parseInt(numCiviliansInput.value);
        const numUnds = parseInt(numUndercoversInput.value);
        const numMWs = parseInt(numMrWhiteInput.value);
        const numFools = parseInt(numFoolsInput.value); // Ambil jumlah Fool

        if (numTotal < 3 || numTotal > 6) { roleCountError.textContent = "Jumlah pemain harus antara 3-6."; return; }
        if (numCivs < 1 && numFools === 0) { roleCountError.textContent = "Minimal harus ada 1 Civilian jika tidak ada The Fool."; return; }
        if (numCivs < 0 || numUnds < 0 || numMWs < 0 || numFools < 0) { roleCountError.textContent = "Jumlah peran tidak boleh negatif."; return; }
        if (numFools > 1) { roleCountError.textContent = "Maksimal hanya boleh ada 1 The Fool."; return; }
        if (numCivs + numUnds + numMWs + numFools !== numTotal) { roleCountError.textContent = "Total semua peran harus sama dengan jumlah pemain."; return; }
        // Validasi tambahan jika ada Fool, mungkin perlu ada minimal N pemain lain, dll. Untuk saat ini sederhana.

        const inputs = playerNamesContainer.querySelectorAll('input[type="text"]'); let names = [];
        for (let i = 0; i < inputs.length; i++) {
            const name = inputs[i].value.trim();
            if (name === "") { roleCountError.textContent = `Nama Pemain ${i + 1} tidak boleh kosong.`; return; }
            if (names.map(n => n.toLowerCase()).includes(name.toLowerCase())) { roleCountError.textContent = `Nama "${name}" sudah digunakan. Gunakan nama unik.`; return; }
            names.push(name);
        }
        if (names.length !== numTotal) { roleCountError.textContent = "Jumlah nama pemain tidak sesuai dengan jumlah pemain yang diinput."; return; }
        savePlayerNames(names);

        const wordOpportunities = [ ...defaultWords.map(w => ({ type: 'single', word: w })), ...customWords.map(p => ({ type: 'pair', pair: p })) ];
        if (wordOpportunities.length === 0 && (numCivs > 0 || numUnds > 0)) { roleCountError.textContent = "Kamus kata (default dan pribadi) kosong, tidak bisa memulai permainan dengan Civilian/Undercover."; return; }

        // Pemilihan kata (sama seperti sebelumnya, tapi hanya jika ada Civilian atau Undercover)
        civilianWord = ''; undercoverWord = '';
        if (numCivs > 0 || numUnds > 0) {
            const chosenOpportunity = wordOpportunities[Math.floor(Math.random() * wordOpportunities.length)];
            if (chosenOpportunity.type === 'pair') {
                civilianWord = chosenOpportunity.pair.civilian;
                undercoverWord = chosenOpportunity.pair.undercover;
            } else {
                civilianWord = chosenOpportunity.word;
                let flatWordList = [ ...defaultWords, ...customWords.flatMap(p => [p.civilian, p.undercover]) ].filter((value, index, self) => self.indexOf(value) === index);
                if (flatWordList.length <= 1 || (flatWordList.length === 1 && flatWordList[0] === civilianWord)) {
                    undercoverWord = civilianWord; 
                } else {
                    let tempUndercoverWord;
                    do { tempUndercoverWord = flatWordList[Math.floor(Math.random() * flatWordList.length)]; } while (tempUndercoverWord === civilianWord);
                    undercoverWord = tempUndercoverWord;
                }
            }
            if (numUnds === 0) undercoverWord = civilianWord;
        }


        let rolesToAssign = [];
        for (let i = 0; i < numCivs; i++) rolesToAssign.push("Civilian");
        for (let i = 0; i < numUnds; i++) rolesToAssign.push("Undercover");
        for (let i = 0; i < numMWs; i++) rolesToAssign.push("Mr. White");
        for (let i = 0; i < numFools; i++) rolesToAssign.push("The Fool"); // Tambahkan The Fool ke daftar peran

        // Acak peran
        for (let i = rolesToAssign.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rolesToAssign[i], rolesToAssign[j]] = [rolesToAssign[j], rolesToAssign[i]]; }

        players = []; const scores = JSON.parse(localStorage.getItem('playerScores_HTV4')) || {};
        names.forEach((name, i) => {
            const role = rolesToAssign[i];
            let wordForPlayer = null;
            if (role === "Civilian") wordForPlayer = civilianWord;
            else if (role === "Undercover") wordForPlayer = undercoverWord;
            // Mr. White dan The Fool tidak mendapat kata (wordForPlayer tetap null)
            players.push({ id: i, name: name, role: role, word: wordForPlayer, avatar: avatarImages[i % avatarImages.length], score: scores[name] || 0, isOut: false });
        });

        initialCiviliansCount = numCivs;
        initialFoolsCount = numFools; // Simpan jumlah Fool awal
        aFoolHasWon = false; // Reset status kemenangan Fool
        gameInProgress = true; currentRoundVotedOut = null; currentPlayerIndexForWordReveal = 0;

        updateActiveSection('gameArea');
        wordRevealInstruction.classList.remove('hidden'); revealRoleCardButton.classList.remove('hidden');
        votingSection.classList.add('hidden'); // Sembunyikan voting section di awal
        foolVotedOutMessage.classList.add('hidden'); // Sembunyikan pesan Fool
        checkMyWordAgainButton.classList.add('hidden'); restartGameButton.classList.remove('hidden');
        customWordSection.classList.add('hidden'); // Kamus kata disembunyikan

        currentPlayerForWord.textContent = players[currentPlayerIndexForWordReveal].name;
        updatePlayersDisplayUI();
    }

    proceedToNextPlayerOrVoting = () => { currentPlayerIndexForWordReveal++; if (currentPlayerIndexForWordReveal < players.length) { currentPlayerForWord.textContent = players[currentPlayerIndexForWordReveal].name; revealRoleCardButton.classList.remove('hidden'); } else { wordRevealInstruction.classList.add('hidden'); revealRoleCardButton.classList.add('hidden'); votingSection.classList.remove('hidden'); activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button'); votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; checkMyWordAgainButton.classList.remove('hidden'); } };
    updatePlayersDisplayUI = () => { playersDisplay.innerHTML = ''; players.forEach(p => { const d = document.createElement('div'); d.classList.add('player-info'); d.dataset.playerId = p.id; if (p.isOut) d.classList.add('voted-out'); d.innerHTML = `<img src="${p.avatar}" alt="Avatar ${p.name}"><div><strong>${p.name}</strong>${p.isOut ? `<span class="player-status">(KELUAR - ${p.role})</span>` : `<span class="player-status">(Skor: ${p.score})</span>`}</div>`; playersDisplay.appendChild(d); }); };
    deactivateVotingMode = () => { isVotingModeActive = false; activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button'); votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; document.querySelectorAll('#playersDisplay .player-info.votable').forEach(pc => { pc.classList.remove('votable'); pc.classList.remove('selected-for-vote'); }); playerSelectedForVote = null; };
    triggerTruthOrDare = (player, reason) => {
        // Jika The Fool sudah menang, jangan trigger ToD lagi untuk pemain yang baru keluar
        if (aFoolHasWon) {
            checkGameContinuationOrEnd();
            return;
        }
        punishedPlayerName.textContent = `${player.name} (${player.role}) ${reason} Harus Truth or Dare!`;
        updateActiveSection('truthOrDareSection');
        truthOrDareChallengeP.textContent = '';
        getTruthButton.disabled = false; getDareButton.disabled = false;
    };

    checkGameContinuationOrEnd = () => {
        if (aFoolHasWon) { // Jika The Fool sudah menang
            endGame(`${foolWinnerMessage.textContent} Permainan selesai lebih awal!`);
            return;
        }

        const activeP = players.filter(p => !p.isOut);
        const activeC = activeP.filter(p => p.role === "Civilian");
        const activeU = activeP.filter(p => p.role === "Undercover");
        const activeMW = activeP.filter(p => p.role === "Mr. White");
        // The Fool yang aktif tidak relevan untuk kondisi menang/kalah reguler jika mereka belum menang
        // (kecuali jika ada skenario khusus dimana Fool yang tidak keluar mempengaruhi game)

        let end = false, msg = "";

        if (activeU.length === 0 && activeMW.length === 0 && activeC.length > 0) {
            end = true; activeC.forEach(p => p.score++); msg = "SEMUA PENJAHAT KALAH! CIVILIAN MENANG!"; playSound(winSound);
        } else if (activeC.length === 0 && (activeU.length > 0 || activeMW.length > 0)) {
            end = true; let winners = [];
            activeU.forEach(p => { p.score++; if (!winners.includes("Undercover")) winners.push("Undercover"); });
            activeMW.forEach(p => { p.score++; if (!winners.includes("Mr. White")) winners.push("Mr. White"); });
            msg = `${winners.join(" & ")} MENANG karena Civilian habis!`; playSound(winSound);
        } else if (activeP.length <= 2 && (activeU.length > 0 || activeMW.length > 0)) {
            // Kondisi tambahan: jika pemain sisa sedikit dan masih ada penjahat, penjahat bisa menang
            // Misalnya, jika sisa 1 Civilian dan 1 Undercover/Mr.White, penjahat menang.
            // Ini bisa disesuaikan. Untuk sekarang, jika sisa 2 pemain dan salah satunya penjahat, penjahat menang.
            if (activeP.length === 2 && (activeU.find(p => !p.isOut) || activeMW.find(p => !p.isOut))) {
                 end = true; let winners = [];
                 activeU.forEach(p => { p.score++; if (!winners.includes("Undercover")) winners.push("Undercover"); });
                 activeMW.forEach(p => { p.score++; if (!winners.includes("Mr. White")) winners.push("Mr. White"); });
                 if (winners.length > 0) {
                    msg = `${winners.join(" & ")} MENANG karena situasi kritis!`; playSound(winSound);
                 } else { // Jika hanya sisa civilian dan fool (fool belum menang)
                     if (activeC.length > 0) { // Civilian menang by default
                        activeC.forEach(p => p.score++); msg = "CIVILIAN MENANG karena situasi kritis!"; playSound(winSound);
                     } else { // Skenario aneh, misal hanya Fool sisa tapi tidak divote
                        msg = "Permainan berakhir tanpa pemenang yang jelas dari peran standar.";
                     }
                 }
            }
        }


        if (currentRoundVotedOut && currentRoundVotedOut.role === "Civilian" && currentRoundVotedOut.isOut) {
            if (end && !msg.toLowerCase().includes("civilian menang")) {
                // playSound(loseSound); // Sudah di triggerTruthOrDare
                // triggerTruthOrDare(currentRoundVotedOut, "kalah sebagai Civilian.");
                // currentRoundVotedOut = null; // Dihapus agar tidak ToD dua kali
                // return;
            }
        }
        currentRoundVotedOut = null; // Reset setelah pengecekan

        if (end) {
            savePlayerScores();
            endGame(msg);
        } else {
            updateActiveSection('gameArea');
            votingSection.classList.remove('hidden');
            foolVotedOutMessage.classList.add('hidden');
            deactivateVotingMode();
        }
    };

    endGame = (message) => { gameInProgress = false; gameWinnerP.textContent = message; displayScoresUI(); updateActiveSection('gameOverSection'); checkMyWordAgainButton.classList.add('hidden'); restartGameButton.classList.remove('hidden'); customWordSection.classList.add('hidden');};
    savePlayerScores = () => { const scores = {}; players.forEach(p => { scores[p.name] = p.score; }); localStorage.setItem('playerScores_HTV4', JSON.stringify(scores)); };
    displayScoresUI = () => { scoreListUl.innerHTML = ''; const sorted = [...players].sort((a,b) => b.score - a.score); sorted.forEach(p => { const li = document.createElement('li'); li.innerHTML = `<strong>${p.name}</strong> (${p.role}): ${p.score} poin`; scoreListUl.appendChild(li); }); };

    resetGame = () => {
        players = []; civilianWord = ''; undercoverWord = ''; currentPlayerIndexForWordReveal = 0;
        gameInProgress = false; initialCiviliansCount = 0; initialFoolsCount = 0; aFoolHasWon = false;
        currentRoundVotedOut = null; roleCountError.textContent = '';
        deactivateVotingMode();
        updateActiveSection('gameSetup'); // Kembali ke setup
        customWordSection.classList.add('hidden'); // Pastikan kamus kata tersembunyi
        restartGameButton.classList.add('hidden');
        checkMyWordAgainButton.classList.add('hidden');
        wordRevealInstruction.classList.add('hidden');
        votingSection.classList.add('hidden');
        mrWhiteGuessSection.classList.add('hidden');
        foolVotedOutMessage.classList.add('hidden');
        truthOrDareSection.classList.add('hidden');
        gameOverSection.classList.add('hidden');
        voteConfirmModal.classList.add('hidden');
        loadSavedPlayerNames();
        if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
        else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
    };

    function initializeApp() {
        loadCustomWords();
        loadSavedPlayerNames();
        updateActiveSection('gameSetup'); // Mulai dari gameSetup
        // customWordSection.classList.remove('hidden'); // Dihapus, kamus kata disembunyikan defaultnya
        customWordSection.classList.add('hidden');


        if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
        else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
    }

    initializeApp();
});