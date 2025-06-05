document.addEventListener('DOMContentLoaded', () => {
    // Audio Elements
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');

    // DOM Element References
    const numPlayersInput = document.getElementById('numPlayers');
    const numCiviliansInput = document.getElementById('numCivilians');
    const numUndercoversInput = document.getElementById('numUndercovers');
    const numMrWhiteInput = document.getElementById('numMrWhite');
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
    let currentRoundVotedOut = null;
    let currentWordRevealCallback = null;
    let isVotingModeActive = false;
    let playerSelectedForVote = null;

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

    function playSound(soundElement) { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.warn("Sound err:", e)); } }
    function updateActiveSection(activeSectionId) {
        const sections = [gameSetupSection, gameAreaSection, truthOrDareSection, gameOverSection];
        sections.forEach(s => { if(s) s.id === activeSectionId ? s.classList.remove('hidden') : s.classList.add('hidden'); });
    }

    function loadCustomWords() {
        try {
            const stored = localStorage.getItem('customPairedWords_HTV4');
            if (stored) {
                customWords = JSON.parse(stored);
                if (!Array.isArray(customWords) || !customWords.every(item => typeof item === 'object' && item.civilian && item.undercover)) {
                    console.warn("Data customPairedWords tidak valid, direset.");
                    customWords = [];
                }
            }
        } catch (e) { console.error("Err load customPairedWords:", e); customWords = []; }
        updateCustomWordListUI();
    }

    function saveCustomWords() {
        localStorage.setItem('customPairedWords_HTV4', JSON.stringify(customWords));
    }

    function updateCustomWordListUI() {
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
    }

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
            if (civWord.toLowerCase() === undWord.toLowerCase()) {
                alert('Kata Civilian dan Undercover tidak boleh sama.');
                return;
            }
            const pairExists = customWords.some(pair =>
                (pair.civilian.toLowerCase() === civWord.toLowerCase() && pair.undercover.toLowerCase() === undWord.toLowerCase()) ||
                (pair.civilian.toLowerCase() === undWord.toLowerCase() && pair.undercover.toLowerCase() === civWord.toLowerCase()) ||
                 pair.civilian.toLowerCase() === civWord.toLowerCase() || pair.undercover.toLowerCase() === civWord.toLowerCase() ||
                 pair.civilian.toLowerCase() === undWord.toLowerCase() || pair.undercover.toLowerCase() === undWord.toLowerCase()
            );

            if (!pairExists) {
                customWords.push({ civilian: civWord, undercover: undWord });
                saveCustomWords();
                updateCustomWordListUI();
                customWordCivilianInput.value = '';
                customWordUndercoverInput.value = '';
            } else {
                alert('Pasangan kata atau salah satu kata ini sudah ada dalam kamus pribadi.');
            }
        } else {
            alert('Kedua input kata (Civilian dan Undercover) harus diisi.');
        }
    });

    startGameButton.addEventListener('click', () => { playSound(clickSound); setupGame(); });

    // === MODIFIKASI DIAGNOSTIK JAVASCRIPT DIMULAI DI SINI ===
    revealRoleCardButton.addEventListener('click', () => {
        playSound(clickSound);
        if (currentPlayerIndexForWordReveal >= players.length) return;
        // const p = players[currentPlayerIndexForWordReveal]; // Variabel p sementara tidak digunakan untuk tes
        let txt = "";

        // Logika asli untuk menentukan txt dinonaktifkan sementara untuk tes
        // if (p.role === "Mr. White") txt = `Kamu <strong>Mr. White</strong>.<br><br>Berpura-pura tahu & jangan ketahuan!`;
        // else if (p.role === "Undercover") txt = `Kamu <strong>Undercover</strong>.<br><br>Kata beda: <strong class='highlight-word'>${p.word}</strong>.<br><br>Cari Civilian!`;
        // else txt = `Kamu <strong>Civilian</strong>.<br><br>Kata: <strong class='highlight-word'>${p.word}</strong>.<br><br>Cari Undercover & Mr. White!`;

        // Teks statis untuk tes di HP
        txt = "HALO INI TES KONTEN KARTU DI HP. Jika ini terlihat, JS mengisi konten.";
        console.log("Mobile Test - Card content set to:", txt); // Untuk cek di console jika bisa

        popupCardWord.innerHTML = txt;
        cardPopupOverlay.classList.remove('hidden');
        wordCardFlipper.classList.remove('is-flipped'); // Card starts on its back (efek flip di CSS di-disable untuk tes)
        currentWordRevealCallback = proceedToNextPlayerOrVoting;
    });

    checkMyWordAgainButton.addEventListener('click', () => {
        playSound(clickSound);
        const name = prompt("Nama Anda:");
        if (name) {
            const p = players.find(pl => pl.name.toLowerCase() === name.toLowerCase().trim() && !pl.isOut);
            if (p) {
                let txt = "";

                // Logika asli untuk menentukan txt dinonaktifkan sementara untuk tes
                // if (p.role === "Mr. White") txt = `Hai ${p.name}, kamu <strong>Mr. White</strong>. Tidak ada kata.`;
                // else txt = `Hai ${p.name}, kata: <strong class='highlight-word'>${p.word}</strong>`;

                // Teks statis untuk tes di HP
                txt = `TES LAGI UNTUK PEMAIN BERNAMA ${name}. Ini konten statis.`;
                console.log("Mobile Test - Check word content set to:", txt); // Untuk cek di console jika bisa

                popupCardWord.innerHTML = txt;
                cardPopupOverlay.classList.remove('hidden');
                wordCardFlipper.classList.remove('is-flipped'); // Efek flip di CSS di-disable untuk tes
                currentWordRevealCallback = null;
            } else {
                alert("Pemain tidak ditemukan/keluar.");
            }
        }
    });
    // === MODIFIKASI DIAGNOSTIK JAVASCRIPT SELESAI DI SINI ===


    flipCardButton.addEventListener('click', () => {
        playSound(clickSound);
        wordCardFlipper.classList.add('is-flipped'); // Ini mungkin tidak berefek visual karena CSS diagnostik
    });
    closePopupButton.addEventListener('click', () => {
        playSound(clickSound);
        cardPopupOverlay.classList.add('hidden');
        if (currentWordRevealCallback) {
            currentWordRevealCallback();
            currentWordRevealCallback = null;
        }
    });
    cardPopupOverlay.addEventListener('click', (e) => { if (e.target === cardPopupOverlay) closePopupButton.click(); });

    activateVotingButton.addEventListener('click', () => { playSound(clickSound); isVotingModeActive = !isVotingModeActive; if (isVotingModeActive) { activateVotingButton.textContent = 'Batalkan Mode Vote'; activateVotingButton.classList.add('secondary-button'); activateVotingButton.classList.remove('primary-button'); votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain.'; document.querySelectorAll('#playersDisplay .player-info').forEach(pc => { const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId)); if (p && !p.isOut) pc.classList.add('votable'); }); } else { deactivateVotingMode(); } });
    playersDisplay.addEventListener('click', (event) => { if (!isVotingModeActive) return; const card = event.target.closest('.player-info.votable:not(.voted-out)'); if (!card) return; playSound(clickSound); const pId = parseInt(card.dataset.playerId); playerSelectedForVote = players.find(p => p.id === pId); if (playerSelectedForVote) { document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote')); card.classList.add('selected-for-vote'); voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`; voteConfirmModal.classList.remove('hidden'); } });
    confirmVoteYesButton.addEventListener('click', () => { playSound(clickSound); if (playerSelectedForVote) { currentRoundVotedOut = playerSelectedForVote; currentRoundVotedOut.isOut = true; updatePlayersDisplayUI(); votingSection.classList.add('hidden'); mrWhiteGuessSection.classList.add('hidden'); deactivateVotingMode(); voteConfirmModal.classList.add('hidden'); if (currentRoundVotedOut.role === "Undercover") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!"); } else if (currentRoundVotedOut.role === "Mr. White") { mrWhiteGuessSection.classList.remove('hidden'); } else if (currentRoundVotedOut.role === "Civilian") { checkGameContinuationOrEnd(); } playerSelectedForVote = null; } });
    confirmVoteNoButton.addEventListener('click', () => { playSound(clickSound); voteConfirmModal.classList.add('hidden'); if (playerSelectedForVote) { const card = document.querySelector(`.player-info[data-player-id='${playerSelectedForVote.id}']`); if (card) card.classList.remove('selected-for-vote'); } playerSelectedForVote = null; });
    submitMrWhiteGuessButton.addEventListener('click', () => { playSound(clickSound); const guess = mrWhiteWordGuessInput.value.trim().toLowerCase(); mrWhiteGuessSection.classList.add('hidden'); if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") { if (guess === civilianWord.toLowerCase()) { playSound(winSound); currentRoundVotedOut.score++; savePlayerScores(); updatePlayersDisplayUI(); endGame(`Mr. White (${currentRoundVotedOut.name}) menebak benar! Kata: ${civilianWord}`); } else { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Mr. White salah tebak."); } mrWhiteWordGuessInput.value = ''; } });
    getTruthButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * truths.length); truthOrDareChallengeP.innerHTML = `<strong>TRUTH:</strong> ${truths[idx]}`; getTruthButton.disabled = true; getDareButton.disabled = true; });
    getDareButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * dares.length); truthOrDareChallengeP.innerHTML = `<strong>DARE:</strong> ${dares[idx]}`; getTruthButton.disabled = true; getDareButton.disabled = true; });
    punishmentDoneButton.addEventListener('click', () => { playSound(clickSound); truthOrDareSection.classList.add('hidden'); truthOrDareChallengeP.textContent = ''; getTruthButton.disabled = false; getDareButton.disabled = false; checkGameContinuationOrEnd(); });
    restartGameButton.addEventListener('click', () => { playSound(clickSound); resetGame(); });

    function setupGame() {
        roleCountError.textContent = "";
        const numTotal = parseInt(numPlayersInput.value), numCivs = parseInt(numCiviliansInput.value),
              numUnds = parseInt(numUndercoversInput.value), numMWs = parseInt(numMrWhiteInput.value);

        if (numTotal < 3 || numTotal > 6) { roleCountError.textContent = "Pemain 3-6."; return; }
        if (numCivs < 1) { roleCountError.textContent = "Min 1 Civilian."; return; }
        if (numUnds < 0 || numMWs < 0) { roleCountError.textContent = "Jumlah peran tidak boleh negatif."; return; }
        if (numCivs + numUnds + numMWs !== numTotal) { roleCountError.textContent = "Total peran != jumlah pemain."; return; }

        const inputs = playerNamesContainer.querySelectorAll('input[type="text"]'); let names = [];
        for (let i = 0; i < inputs.length; i++) {
            const name = inputs[i].value.trim();
            if (name === "") { roleCountError.textContent = `Nama Pemain ${i + 1} kosong.`; return; }
            if (names.map(n => n.toLowerCase()).includes(name.toLowerCase())) { roleCountError.textContent = `Nama "${name}" duplikat.`; return; }
            names.push(name);
        }
        if (names.length !== numTotal) { roleCountError.textContent = "Jumlah nama != jumlah pemain."; return; }
        savePlayerNames(names);

        const wordOpportunities = [
            ...defaultWords.map(w => ({ type: 'single', word: w })),
            ...customWords.map(p => ({ type: 'pair', pair: p }))
        ];

        if (wordOpportunities.length === 0) {
            roleCountError.textContent = "Kamus kata (default dan pribadi) kosong!"; return;
        }

        const chosenOpportunity = wordOpportunities[Math.floor(Math.random() * wordOpportunities.length)];

        if (chosenOpportunity.type === 'pair') {
            civilianWord = chosenOpportunity.pair.civilian;
            undercoverWord = chosenOpportunity.pair.undercover;
        } else {
            civilianWord = chosenOpportunity.word;
            let flatWordList = [
                ...defaultWords,
                ...customWords.flatMap(p => [p.civilian, p.undercover])
            ].filter((value, index, self) => self.indexOf(value) === index);

            if (flatWordList.length <= 1 || (flatWordList.length === 1 && flatWordList[0] === civilianWord)) {
                undercoverWord = civilianWord;
            } else {
                let tempUndercoverWord;
                do {
                    tempUndercoverWord = flatWordList[Math.floor(Math.random() * flatWordList.length)];
                } while (tempUndercoverWord === civilianWord);
                undercoverWord = tempUndercoverWord;
            }
        }
        if (numUnds === 0) {
            undercoverWord = civilianWord;
        }

        let rolesToAssign = [];
        for (let i = 0; i < numCivs; i++) rolesToAssign.push("Civilian");
        for (let i = 0; i < numUnds; i++) rolesToAssign.push("Undercover");
        for (let i = 0; i < numMWs; i++) rolesToAssign.push("Mr. White");
        for (let i = rolesToAssign.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rolesToAssign[i], rolesToAssign[j]] = [rolesToAssign[j], rolesToAssign[i]]; }

        players = []; const scores = JSON.parse(localStorage.getItem('playerScores_HTV4')) || {};
        names.forEach((name, i) => {
            const role = rolesToAssign[i];
            let wordForPlayer = null;
            if (role === "Civilian") wordForPlayer = civilianWord;
            if (role === "Undercover") wordForPlayer = undercoverWord;
            players.push({ id: i, name: name, role: role, word: wordForPlayer, avatar: avatarImages[i % avatarImages.length], score: scores[name] || 0, isOut: false });
        });

        initialCiviliansCount = numCivs; gameInProgress = true; currentRoundVotedOut = null; currentPlayerIndexForWordReveal = 0;

        updateActiveSection('gameArea');
        wordRevealInstruction.classList.remove('hidden'); revealRoleCardButton.classList.remove('hidden');
        votingSection.classList.add('hidden');
        checkMyWordAgainButton.classList.add('hidden'); restartGameButton.classList.remove('hidden');
        customWordSection.classList.add('hidden');

        currentPlayerForWord.textContent = players[currentPlayerIndexForWordReveal].name;
        updatePlayersDisplayUI();
    }

    proceedToNextPlayerOrVoting = () => { currentPlayerIndexForWordReveal++; if (currentPlayerIndexForWordReveal < players.length) { currentPlayerForWord.textContent = players[currentPlayerIndexForWordReveal].name; revealRoleCardButton.classList.remove('hidden'); } else { wordRevealInstruction.classList.add('hidden'); revealRoleCardButton.classList.add('hidden'); votingSection.classList.remove('hidden'); activateVotingButton.classList.remove('hidden'); deactivateVotingMode(); checkMyWordAgainButton.classList.remove('hidden'); } };
    updatePlayersDisplayUI = () => { playersDisplay.innerHTML = ''; players.forEach(p => { const d = document.createElement('div'); d.classList.add('player-info'); d.dataset.playerId = p.id; if (p.isOut) d.classList.add('voted-out'); d.innerHTML = `<img src="${p.avatar}" alt="Avatar ${p.name}"><div><strong>${p.name}</strong>${p.isOut ? `<span class="player-status">(KELUAR)</span>` : `<span class="player-status">(Skor: ${p.score})</span>`}</div>`; playersDisplay.appendChild(d); }); };
    deactivateVotingMode = () => { isVotingModeActive = false; activateVotingButton.textContent = 'Aktifkan Mode Vote'; activateVotingButton.classList.remove('secondary-button'); activateVotingButton.classList.add('primary-button'); votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.'; document.querySelectorAll('#playersDisplay .player-info.votable').forEach(pc => { pc.classList.remove('votable'); pc.classList.remove('selected-for-vote'); }); playerSelectedForVote = null; };
    triggerTruthOrDare = (player, reason) => { punishedPlayerName.textContent = `${player.name} (${player.role}) ${reason} Harus Truth or Dare!`; updateActiveSection('truthOrDareSection'); truthOrDareChallengeP.textContent = ''; getTruthButton.disabled = false; getDareButton.disabled = false; };
    checkGameContinuationOrEnd = () => { const activeP = players.filter(p => !p.isOut), activeC = activeP.filter(p => p.role === "Civilian"), activeU = activeP.filter(p => p.role === "Undercover"), activeMW = activeP.filter(p => p.role === "Mr. White"); let end = false, msg = ""; if (activeU.length === 0 && activeMW.length === 0 && activeC.length > 0) { end = true; activeC.forEach(p => p.score++); msg = "CIVILIAN MENANG!"; playSound(winSound); } else if (activeC.length === 0 && (activeU.length > 0 || activeMW.length > 0)) { end = true; let winners = []; activeU.forEach(p => { p.score++; if (!winners.includes("Undercover")) winners.push("Undercover"); }); activeMW.forEach(p => { p.score++; if (!winners.includes("Mr. White")) winners.push("Mr. White"); }); msg = `${winners.join(" & ")} MENANG!`; playSound(winSound); } if (currentRoundVotedOut && currentRoundVotedOut.role === "Civilian" && currentRoundVotedOut.isOut) { if (end && !msg.toLowerCase().includes("civilian menang")) { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "kalah sebagai Civilian terakhir."); currentRoundVotedOut = null; return; } } currentRoundVotedOut = null; if (end) { savePlayerScores(); endGame(msg); } else { updateActiveSection('gameArea'); votingSection.classList.remove('hidden'); deactivateVotingMode(); } };
    endGame = (message) => { gameInProgress = false; gameWinnerP.textContent = message; displayScoresUI(); updateActiveSection('gameOverSection'); checkMyWordAgainButton.classList.add('hidden'); restartGameButton.classList.remove('hidden'); };
    savePlayerScores = () => { const scores = {}; players.forEach(p => { scores[p.name] = p.score; }); localStorage.setItem('playerScores_HTV4', JSON.stringify(scores)); };
    displayScoresUI = () => { scoreListUl.innerHTML = ''; const sorted = [...players].sort((a,b) => b.score - a.score); sorted.forEach(p => { const li = document.createElement('li'); li.innerHTML = `<strong>${p.name}</strong> (${p.role}): ${p.score} poin`; scoreListUl.appendChild(li); }); };
    resetGame = () => { players = []; civilianWord = ''; undercoverWord = ''; currentPlayerIndexForWordReveal = 0; gameInProgress = false; initialCiviliansCount = 0; currentRoundVotedOut = null; roleCountError.textContent = ''; deactivateVotingMode(); updateActiveSection('gameSetup'); customWordSection.classList.remove('hidden'); restartGameButton.classList.add('hidden'); checkMyWordAgainButton.classList.add('hidden'); wordRevealInstruction.classList.add('hidden'); votingSection.classList.add('hidden'); mrWhiteGuessSection.classList.add('hidden'); truthOrDareSection.classList.add('hidden'); gameOverSection.classList.add('hidden'); voteConfirmModal.classList.add('hidden'); loadSavedPlayerNames(); if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>"; else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>"; };

    function initializeApp() {
        loadCustomWords();
        loadSavedPlayerNames();
        updateActiveSection('gameSetup');
        customWordSection.classList.remove('hidden');

        if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
        else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
    }

    initializeApp();
});