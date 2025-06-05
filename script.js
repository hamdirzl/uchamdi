document.addEventListener('DOMContentLoaded', () => {
    // Audio Elements (sama)
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
    // const playerNamesContainer = document.getElementById('playerNamesContainer'); // Tidak digunakan lagi
    const roleCountError = document.getElementById('roleCountError');
    const nameEntryError = document.getElementById('nameEntryError'); // Error untuk input nama

    // Elemen baru untuk setup iteratif
    const roleConfigurationDiv = document.getElementById('roleConfiguration');
    const proceedToNameEntryButton = document.getElementById('proceedToNameEntryButton');
    const playerNameEntryDiv = document.getElementById('playerNameEntry');
    const playerNamePrompt = document.getElementById('playerNamePrompt');
    const currentNameInput = document.getElementById('currentNameInput');
    const submitNameAndRevealCardButton = document.getElementById('submitNameAndRevealCardButton');
    const registeredPlayersDisplay = document.getElementById('registeredPlayersDisplay');
    const registeredPlayersListUl = document.getElementById('registeredPlayersListUl');


    const gameSetupSection = document.getElementById('gameSetup');
    const customWordSection = document.getElementById('customWordSection');
    const gameAreaSection = document.getElementById('gameArea');
    const truthOrDareSection = document.getElementById('truthOrDareSection');
    const gameOverSection = document.getElementById('gameOverSection');

    // const wordRevealInstruction = document.getElementById('wordRevealInstruction'); // Tidak digunakan lagi untuk alur ini
    // const revealRoleCardButton = document.getElementById('revealRoleCardButton'); // Tidak digunakan lagi untuk alur ini
    const currentPlayerForWord = document.getElementById('currentPlayerForWord'); // Mungkin bisa dihapus jika tidak relevan lagi
    const playersDisplay = document.getElementById('playersDisplay');
    const votingSection = document.getElementById('votingSection');
    // ... (sisa referensi DOM sama seperti sebelumnya) ...
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
    let players = []; // Akan diisi satu per satu
    let rolesToAssign = []; // Kumpulan peran yang akan dibagikan
    let totalPlayersToSetup = 0;
    let currentPlayerSetupIndex = 0; // Untuk melacak pemain ke berapa yang sedang input nama

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
    // let currentPlayerIndexForWordReveal = 0; // Tidak digunakan lagi untuk alur ini
    let gameInProgress = false;
    let initialCiviliansCount = 0;
    let initialFoolsCount = 0;
    let currentRoundVotedOut = null;
    let currentWordRevealCallback = null; // Akan digunakan untuk callback setelah kartu ditutup
    let isVotingModeActive = false;
    let playerSelectedForVote = null;
    let aFoolHasWon = false;

    const avatarImages = [ /* ... (sama) ... */ ];
    const truths = [ /* ... (sama) ... */ ];
    const dares = [ /* ... (sama) ... */ ];
    // Isi truths dan dares
    truths.push( "Apa hal paling memalukan yang pernah kamu lakukan?", "Siapa orang yang paling kamu kagumi dan mengapa?", "Jika kamu bisa bertukar hidup dengan seseorang selama sehari, siapa orang itu?", "Apa ketakutan terbesarmu?", "Apa momen paling membahagiakan dalam hidupmu sejauh ini?");
    dares.push( "Posting foto selfie paling konyolmu ke media sosial (dengan caption 'Aku Bangga').", "Biarkan orang lain memilihkan status WhatsApp/Instagram story untukmu selama 1 jam.", "Bicara dengan aksen aneh (misal: robot, bangsawan) selama 5 menit ke depan.");


    // --- Helper Functions --- (sama)
    function playSound(soundElement) { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.warn("Sound err:", e)); } }
    function updateActiveSection(activeSectionId, keepMenuSections = false) { /* ... (sama seperti versi terakhir) ... */ 
        const sections = [gameSetupSection, customWordSection, gameAreaSection, truthOrDareSection, gameOverSection];
        sections.forEach(s => {
            if(s) {
                // Khusus untuk gameSetupSection, kita perlu cek sub-divisinya
                if (s.id === 'gameSetup') {
                    if (activeSectionId === 'gameSetup_roleConfig' || activeSectionId === 'gameSetup_nameEntry') {
                        s.classList.remove('hidden');
                        if (roleConfigurationDiv) roleConfigurationDiv.classList.toggle('hidden', activeSectionId !== 'gameSetup_roleConfig');
                        if (playerNameEntryDiv) playerNameEntryDiv.classList.toggle('hidden', activeSectionId !== 'gameSetup_nameEntry');
                    } else if (activeSectionId !== 'customWordSection') { // Jangan sembunyikan gameSetup jika customWord aktif
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
            if (activeSectionId === 'customWordSection' || (instructionsModal && !instructionsModal.classList.contains('hidden'))) {
                backButton.classList.remove('hidden');
            } else {
                backButton.classList.add('hidden');
            }
        }
        if (instructionsModal && activeSectionId !== 'instructionsModal' && !instructionsModal.classList.contains('hidden') && !keepMenuSections ) {
            if (activeSectionId !== 'customWordSection'){
                instructionsModal.classList.add('hidden');
            }
        }
        if (activeSectionId === 'gameSetup_roleConfig') { // Jika kembali ke role config dari customWord
            if(customWordSection) customWordSection.classList.add('hidden');
        }
    }

    function toggleMenu(forceClose = false) { /* ... (sama seperti versi terakhir) ... */ }

    // --- Menu Event Listeners & Tombol Navigasi Header --- (disesuaikan)
    if (menuButton) menuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(); });
    if (closeMenuButton) closeMenuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(true); });
    if (menuOverlay) menuOverlay.addEventListener('click', () => { toggleMenu(true); });

    if (homeButton) {
        homeButton.addEventListener('click', () => {
            playSound(clickSound);
            resetGame();
            toggleMenu(true);
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            playSound(clickSound);
            if (instructionsModal && !instructionsModal.classList.contains('hidden')) {
                instructionsModal.classList.add('hidden');
                // Jika sebelumnya customWordSection aktif, biarkan. Jika tidak, kembali ke setup jika game belum mulai.
                if (customWordSection && !customWordSection.classList.contains('hidden')) {
                     updateActiveSection('customWordSection'); // Tetap di customWord atau kembali ke state sebelum instruksi
                } else if (!gameInProgress && gameSetupSection) {
                    updateActiveSection('gameSetup_roleConfig'); // Kembali ke konfigurasi peran
                } else {
                     backButton.classList.add('hidden'); // Sembunyikan jika tidak jelas kembali ke mana
                }
            } else if (customWordSection && !customWordSection.classList.contains('hidden')) {
                updateActiveSection('gameSetup_roleConfig'); // Kembali ke konfigurasi peran
            }
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
    // ... (sisa menu listener sama)
     if (menuModeParty && numFoolsInput) {
        menuModeParty.addEventListener('click', () => {
            playSound(clickSound);
            alert("Mode Party dengan The Fool akan aktif jika jumlah The Fool > 0 pada pengaturan permainan.");
            if (numFoolsInput && roleConfigurationDiv && !roleConfigurationDiv.classList.contains('hidden')) {
                const foolInputDiv = numFoolsInput.parentElement;
                if (foolInputDiv) {
                    foolInputDiv.style.transition = 'background-color 0.3s ease, transform 0.1s ease';
                    foolInputDiv.style.backgroundColor = 'var(--secondary-color)';
                    foolInputDiv.style.transform = 'scale(1.03)';
                    setTimeout(() => { foolInputDiv.style.backgroundColor = ''; foolInputDiv.style.transform = ''; }, 700);
                }
            }
            toggleMenu(true);
        });
    }
    if (menuPetunjuk && instructionsModal) {
        menuPetunjuk.addEventListener('click', () => {
            playSound(clickSound);
            instructionsModal.classList.remove('hidden');
            if(backButton) backButton.classList.remove('hidden');
            toggleMenu(true);
        });
    }
    if (closeInstructionsButton && instructionsModal) {
        closeInstructionsButton.addEventListener('click', () => {
            playSound(clickSound);
            instructionsModal.classList.add('hidden');
            if (customWordSection && !customWordSection.classList.contains('hidden')) {
                // Tetap di custom word, tombol back masih relevan
            } else if (!gameInProgress && gameSetupSection) {
                updateActiveSection('gameSetup_roleConfig');
            } else {
                 if(backButton) backButton.classList.add('hidden');
            }
        });
    }

    // Fungsi load/save (sama)
    loadCustomWords = () => { try { const stored = localStorage.getItem('customPairedWords_HTV4'); if (stored) { customWords = JSON.parse(stored); if (!Array.isArray(customWords) || !customWords.every(item => typeof item === 'object' && item.civilian && item.undercover)) { customWords = []; } } } catch (e) { customWords = []; } updateCustomWordListUI(); };
    saveCustomWords = () => { localStorage.setItem('customPairedWords_HTV4', JSON.stringify(customWords)); };
    updateCustomWordListUI = () => { if (!customWordListUl) return; customWordListUl.innerHTML = ''; customWords.forEach((pair, index) => { const li = document.createElement('li'); li.textContent = `${pair.civilian} / ${pair.undercover}`; const btn = document.createElement('button'); btn.textContent = 'Hapus'; btn.onclick = () => { playSound(clickSound); customWords.splice(index, 1); saveCustomWords(); updateCustomWordListUI(); }; li.appendChild(btn); customWordListUl.appendChild(li); }); };
    // loadSavedPlayerNames dan generatePlayerNameInputs tidak lagi relevan dalam format lama
    // Kita tidak lagi men-generate semua input nama di awal.

    toggleMusicButton.addEventListener('click', () => { /* ... (sama) ... */ });
    // numPlayersInput.addEventListener('input', generatePlayerNameInputs); // Tidak relevan lagi

    if (addPairedWordButton) addPairedWordButton.addEventListener('click', () => { /* ... (sama) ... */ });

    // --- LOGIKA BARU untuk SETUP GAME ---
    if (proceedToNameEntryButton) {
        proceedToNameEntryButton.addEventListener('click', () => {
            playSound(clickSound);
            if(roleCountError) roleCountError.textContent = "";
            const numTotal = parseInt(numPlayersInput.value);
            const numCivs = parseInt(numCiviliansInput.value);
            const numUnds = parseInt(numUndercoversInput.value);
            const numMWs = parseInt(numMrWhiteInput.value);
            const numFools = parseInt(numFoolsInput.value);

            // Validasi jumlah pemain dan peran (sama seperti di setupGame lama)
            if (numTotal < 3 || numTotal > 6) { if(roleCountError) roleCountError.textContent = "Jumlah pemain harus antara 3-6."; return; }
            if (numCivs < 1 && numFools === 0 && (numUnds > 0 || numMWs > 0) ) { if(roleCountError) roleCountError.textContent = "Minimal harus ada 1 Civilian jika ada Undercover/Mr.White dan tidak ada The Fool."; return; }
            else if (numCivs < 0 && numFools > 0 && numUnds === 0 && numMWs === 0 && numTotal > 1) {}
            else if (numCivs < 1 && numFools === 0) { if(roleCountError) roleCountError.textContent = "Minimal harus ada 1 Civilian."; return; }
            if (numCivs < 0 || numUnds < 0 || numMWs < 0 || numFools < 0) { if(roleCountError) roleCountError.textContent = "Jumlah peran tidak boleh negatif."; return; }
            if (numFools > 1) { if(roleCountError) roleCountError.textContent = "Maksimal hanya boleh ada 1 The Fool."; return; }
            if (numCivs + numUnds + numMWs + numFools !== numTotal) { if(roleCountError) roleCountError.textContent = "Total semua peran harus sama dengan jumlah pemain."; return; }

            totalPlayersToSetup = numTotal;
            initialCiviliansCount = numCivs; // Simpan untuk logika menang/kalah
            initialFoolsCount = numFools;

            // Persiapkan kata-kata
            const wordOpportunities = [ ...defaultWords.map(w => ({ type: 'single', word: w })), ...customWords.map(p => ({ type: 'pair', pair: p })) ];
            if (wordOpportunities.length === 0 && (numCivs > 0 || numUnds > 0)) { if(roleCountError) roleCountError.textContent = "Kamus kata kosong!"; return; }
            
            civilianWord = ''; undercoverWord = '';
            if (numCivs > 0 || numUnds > 0) {
                const chosenOpportunity = wordOpportunities[Math.floor(Math.random() * wordOpportunities.length)];
                if (chosenOpportunity.type === 'pair') {
                    civilianWord = chosenOpportunity.pair.civilian;
                    undercoverWord = chosenOpportunity.pair.undercover;
                } else {
                    civilianWord = chosenOpportunity.word;
                    let flatWordList = [ ...defaultWords, ...customWords.flatMap(p => [p.civilian, p.undercover]) ].filter((value, index, self) => self.indexOf(value) === index);
                    if (flatWordList.length <= 1 || (flatWordList.length === 1 && flatWordList[0] === civilianWord && numUnds > 0)) {
                        undercoverWord = civilianWord; 
                         if (numUnds > 0) console.warn("Peringatan: Kata Undercover terpaksa sama dengan Civilian.");
                    } else if (numUnds > 0) {
                        let tempUndercoverWord;
                        do { tempUndercoverWord = flatWordList[Math.floor(Math.random() * flatWordList.length)]; } while (tempUndercoverWord === civilianWord);
                        undercoverWord = tempUndercoverWord;
                    } else { 
                        undercoverWord = civilianWord; 
                    }
                }
                if (numUnds === 0) undercoverWord = civilianWord;
            }

            // Buat kumpulan peran yang akan dibagikan
            rolesToAssign = [];
            for (let i = 0; i < numCivs; i++) rolesToAssign.push("Civilian");
            for (let i = 0; i < numUnds; i++) rolesToAssign.push("Undercover");
            for (let i = 0; i < numMWs; i++) rolesToAssign.push("Mr. White");
            for (let i = 0; i < numFools; i++) rolesToAssign.push("The Fool");
            // Acak peran
            for (let i = rolesToAssign.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rolesToAssign[i], rolesToAssign[j]] = [rolesToAssign[j], rolesToAssign[i]]; }

            players = []; // Reset array players
            currentPlayerSetupIndex = 0;
            aFoolHasWon = false;
            updateRegisteredPlayersList(); // Kosongkan daftar pemain terdaftar
            prepareNextPlayerNameEntry();
            updateActiveSection('gameSetup_nameEntry'); // Pindah ke tampilan input nama
        });
    }

    function prepareNextPlayerNameEntry() {
        if(playerNamePrompt) playerNamePrompt.textContent = `Pemain ${currentPlayerSetupIndex + 1}, Masukkan Nama & Lihat Peranmu:`;
        if(currentNameInput) currentNameInput.value = ""; // Kosongkan input nama
        if(nameEntryError) nameEntryError.textContent = ""; // Kosongkan pesan error
        if(currentNameInput) currentNameInput.focus();
    }

    function updateRegisteredPlayersList() {
        if (!registeredPlayersListUl) return;
        registeredPlayersListUl.innerHTML = '';
        players.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.name;
            registeredPlayersListUl.appendChild(li);
        });
        if (players.length > 0 && registeredPlayersDisplay) {
            registeredPlayersDisplay.classList.remove('hidden');
        } else if (registeredPlayersDisplay) {
            registeredPlayersDisplay.classList.add('hidden');
        }
    }

    if (submitNameAndRevealCardButton) {
        submitNameAndRevealCardButton.addEventListener('click', () => {
            playSound(clickSound);
            const playerName = currentNameInput.value.trim();
            if(nameEntryError) nameEntryError.textContent = "";

            if (playerName === "") {
                if(nameEntryError) nameEntryError.textContent = "Nama tidak boleh kosong.";
                return;
            }
            if (players.some(p => p.name.toLowerCase() === playerName.toLowerCase())) {
                if(nameEntryError) nameEntryError.textContent = "Nama sudah digunakan. Pilih nama lain.";
                return;
            }

            // Ambil peran dan kata untuk pemain ini
            const role = rolesToAssign.pop(); // Ambil peran dari ujung array yang sudah diacak
            let wordForPlayer = null;
            if (role === "Civilian") wordForPlayer = civilianWord;
            else if (role === "Undercover") wordForPlayer = undercoverWord;

            const newPlayer = {
                id: currentPlayerSetupIndex,
                name: playerName,
                role: role,
                word: wordForPlayer,
                avatar: avatarImages[currentPlayerSetupIndex % avatarImages.length],
                score: 0, // Skor awal
                isOut: false
            };
            players.push(newPlayer);
            localStorage.setItem(`playerName_${currentPlayerSetupIndex}`, playerName); // Simpan nama jika perlu

            updateRegisteredPlayersList();

            // Tampilkan kartu peran untuk pemain ini
            let cardText = "";
            if (role === "Mr. White") cardText = `Hai ${playerName}, Kamu <strong>Mr. White</strong>.<br><br>Berpura-pura tahu & jangan ketahuan!`;
            else if (role === "Undercover") cardText = `Hai ${playerName}, Kamu <strong>Undercover</strong>.<br><br>Kata beda: <strong class='highlight-word'>${newPlayer.word}</strong>.<br><br>Cari pemain lain!`;
            else if (role === "The Fool") cardText = `Hai ${playerName}, Kamu <strong>The Fool</strong> (Badut).<br><br>Tujuanmu: Buat dirimu divote keluar oleh pemain lain! Jangan sampai ketahuan kamu sengaja.`;
            else cardText = `Hai ${playerName}, Kamu <strong>Civilian</strong>.<br><br>Kata: <strong class='highlight-word'>${newPlayer.word}</strong>.<br><br>Cari Undercover, Mr. White, dan The Fool!`;
            
            if(popupCardWord) popupCardWord.innerHTML = cardText;
            if(cardPopupOverlay) cardPopupOverlay.classList.remove('hidden');
            if(wordCardFlipper) wordCardFlipper.classList.remove('is-flipped');

            currentWordRevealCallback = handleCardCloseAfterSetup; // Callback baru
        });
    }

    function handleCardCloseAfterSetup() {
        currentPlayerSetupIndex++;
        if (currentPlayerSetupIndex < totalPlayersToSetup) {
            prepareNextPlayerNameEntry();
        } else {
            // Semua pemain sudah input nama dan lihat peran
            startGameFromIterativeSetup();
        }
    }

    function startGameFromIterativeSetup() {
        gameInProgress = true;
        // Simpan semua nama pemain (karena sekarang disimpan satu per satu)
        const playerNamesArray = players.map(p => p.name);
        localStorage.setItem('playerNames_HTV4', JSON.stringify(playerNamesArray));
        
        updateActiveSection('gameArea');
        // wordRevealInstruction & revealRoleCardButton tidak lagi diperlukan di sini
        if(checkMyWordAgainButton) checkMyWordAgainButton.classList.remove('hidden'); // Langsung tampilkan tombol ini
        if(votingSection) votingSection.classList.remove('hidden'); // Tampilkan voting section
        if(activateVotingButton) {
            activateVotingButton.textContent = 'Aktifkan Mode Vote';
            activateVotingButton.classList.remove('secondary-button');
            activateVotingButton.classList.add('primary-button');
        }
        if(votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.';
        if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
        if(restartGameButton) restartGameButton.classList.remove('hidden');

        updatePlayersDisplayUI(); // Tampilkan semua pemain di game area
    }

    // Fungsi lama revealRoleCardButton dan checkMyWordAgainButton perlu penyesuaian atau salah satunya tidak dipakai
    // revealRoleCardButton sudah tidak dipakai dalam alur ini.
    // checkMyWordAgainButton tetap bisa dipakai.

    // Modifikasi checkMyWordAgainButton agar mengambil info dari array `players`
    if (checkMyWordAgainButton) checkMyWordAgainButton.addEventListener('click', () => {
        playSound(clickSound);
        const name = prompt("Masukkan nama Anda untuk cek peran/kata lagi:");
        if (name) {
            const player = players.find(p => p.name.toLowerCase() === name.trim().toLowerCase() && !p.isOut);
            if (player) {
                let txt = "";
                if (player.role === "Mr. White" || player.role === "The Fool") {
                    txt = `Hai ${player.name}, kamu adalah <strong>${player.role}</strong>. Kamu tidak memiliki kata.`;
                } else {
                    txt = `Hai ${player.name} (<strong>${player.role}</strong>), kata rahasiamu adalah: <strong class='highlight-word'>${player.word}</strong>`;
                }
                if(popupCardWord) popupCardWord.innerHTML = txt;
                if(cardPopupOverlay) cardPopupOverlay.classList.remove('hidden');
                if(wordCardFlipper) wordCardFlipper.classList.remove('is-flipped');
                currentWordRevealCallback = null; // Tidak ada callback khusus setelah ini
            } else {
                alert("Pemain tidak ditemukan, sudah keluar, atau nama salah.");
            }
        }
    });


    // Sisa fungsi game logic (flipCardButton, closePopupButton, activateVotingButton, dst.)
    // perlu dipastikan tetap merujuk ke elemen yang benar dan logikanya masih sesuai.
    // Sebagian besar seharusnya masih relevan.
    // ... (Salin sisa fungsi dari versi lengkap terakhir: flipCardButton, closePopupButton, ... initializeApp)
    // PASTIKAN SEMUA FUNGSI LAINNYA ADA DI SINI
    if (flipCardButton) flipCardButton.addEventListener('click', () => { playSound(clickSound); if(wordCardFlipper) wordCardFlipper.classList.add('is-flipped'); });
    if (closePopupButton) closePopupButton.addEventListener('click', () => { 
        playSound(clickSound); 
        if(cardPopupOverlay) cardPopupOverlay.classList.add('hidden'); 
        if (currentWordRevealCallback) { 
            currentWordRevealCallback(); 
            currentWordRevealCallback = null; 
        } 
    });
    if (cardPopupOverlay) cardPopupOverlay.addEventListener('click', (e) => { if (e.target === cardPopupOverlay && closePopupButton) closePopupButton.click(); });
    
    // Voting logic, dll (sama seperti sebelumnya)
    if (activateVotingButton) activateVotingButton.addEventListener('click', () => { playSound(clickSound); isVotingModeActive = !isVotingModeActive; if (isVotingModeActive) { activateVotingButton.textContent = 'Batalkan Mode Vote'; activateVotingButton.classList.add('secondary-button'); activateVotingButton.classList.remove('primary-button'); if(votingInstruction) votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain untuk memilih.'; document.querySelectorAll('#playersDisplay .player-info').forEach(pc => { const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId)); if (p && !p.isOut) pc.classList.add('votable'); }); } else { deactivateVotingMode(); } });
    if (playersDisplay) playersDisplay.addEventListener('click', (event) => { if (!isVotingModeActive) return; const card = event.target.closest('.player-info.votable:not(.voted-out)'); if (!card) return; playSound(clickSound); const pId = parseInt(card.dataset.playerId); playerSelectedForVote = players.find(p => p.id === pId); if (playerSelectedForVote) { document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote')); card.classList.add('selected-for-vote'); if(voteConfirmMessage) voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`; if(voteConfirmModal) voteConfirmModal.classList.remove('hidden'); } });
    if (confirmVoteYesButton) confirmVoteYesButton.addEventListener('click', () => { playSound(clickSound); if (playerSelectedForVote) { currentRoundVotedOut = playerSelectedForVote; currentRoundVotedOut.isOut = true; aFoolHasWon = false; updatePlayersDisplayUI(); if(votingSection) votingSection.classList.add('hidden'); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); deactivateVotingMode(); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); if (currentRoundVotedOut.role === "The Fool") { playSound(foolWinSound); currentRoundVotedOut.score += 2; savePlayerScores(); if(foolWinnerMessage) foolWinnerMessage.textContent = `${currentRoundVotedOut.name} (The Fool) berhasil divote keluar dan MENANG!`; if(foolVotedOutMessage) foolVotedOutMessage.classList.remove('hidden'); aFoolHasWon = true; setTimeout(() => { if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); checkGameContinuationOrEnd(); }, 4000); } else if (currentRoundVotedOut.role === "Undercover") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!"); } else if (currentRoundVotedOut.role === "Mr. White") { if(mrWhiteGuessSection) mrWhiteGuessSection.classList.remove('hidden'); } else if (currentRoundVotedOut.role === "Civilian") { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Civilian salah divote!"); } playerSelectedForVote = null; } });
    if (confirmVoteNoButton) confirmVoteNoButton.addEventListener('click', () => { playSound(clickSound); if(voteConfirmModal) voteConfirmModal.classList.add('hidden'); if (playerSelectedForVote) { const card = document.querySelector(`.player-info[data-player-id='${playerSelectedForVote.id}']`); if (card) card.classList.remove('selected-for-vote'); } playerSelectedForVote = null; });
    if (submitMrWhiteGuessButton) submitMrWhiteGuessButton.addEventListener('click', () => { playSound(clickSound); const guess = mrWhiteWordGuessInput.value.trim().toLowerCase(); if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") { if (guess === civilianWord.toLowerCase()) { playSound(winSound); currentRoundVotedOut.score++; savePlayerScores(); updatePlayersDisplayUI(); endGame(`Mr. White (${currentRoundVotedOut.name}) menebak benar! Kata Civilian adalah: ${civilianWord}. Mr. White Menang!`); } else { playSound(loseSound); triggerTruthOrDare(currentRoundVotedOut, "Mr. White salah tebak kata."); } if(mrWhiteWordGuessInput) mrWhiteWordGuessInput.value = ''; } });
    if (getTruthButton) getTruthButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * truths.length); if(truthOrDareChallengeP) truthOrDareChallengeP.innerHTML = `<strong>TRUTH:</strong> ${truths[idx]}`; getTruthButton.disabled = true; if(getDareButton) getDareButton.disabled = true; });
    if (getDareButton) getDareButton.addEventListener('click', () => { playSound(clickSound); const idx = Math.floor(Math.random() * dares.length); if(truthOrDareChallengeP) truthOrDareChallengeP.innerHTML = `<strong>DARE:</strong> ${dares[idx]}`; if(getTruthButton) getTruthButton.disabled = true; getDareButton.disabled = true; });
    if (punishmentDoneButton) punishmentDoneButton.addEventListener('click', () => { playSound(clickSound); if(truthOrDareSection) truthOrDareSection.classList.add('hidden'); if(truthOrDareChallengeP) truthOrDareChallengeP.textContent = ''; if(getTruthButton) getTruthButton.disabled = false; if(getDareButton) getDareButton.disabled = false; checkGameContinuationOrEnd(); });
    if (restartGameButton) restartGameButton.addEventListener('click', () => { playSound(clickSound); resetGame(); });
    
    // setupGame sudah di atas (kosongkan saja, karena logikanya pindah)
    // function setupGame() {} // Kosongkan atau hapus fungsi lama ini
    
    // proceedToNextPlayerOrVoting sudah tidak digunakan dalam alur utama ini
    // function proceedToNextPlayerOrVoting() {} // Kosongkan atau hapus

    updatePlayersDisplayUI = () => { if(!playersDisplay) return; playersDisplay.innerHTML = ''; players.forEach(p => { const d = document.createElement('div'); d.classList.add('player-info'); d.dataset.playerId = p.id; if (p.isOut) d.classList.add('voted-out'); d.innerHTML = `<img src="${p.avatar}" alt="Avatar ${p.name}"><div><strong>${p.name}</strong>${p.isOut ? `<span class="player-status">(KELUAR - ${p.role})</span>` : `<span class="player-status">(Skor: ${p.score})</span>`}</div>`; playersDisplay.appendChild(d); }); };
    deactivateVotingMode = () => { /* ... (sama) ... */ };
    triggerTruthOrDare = (player, reason) => { /* ... (sama) ... */ };
    checkGameContinuationOrEnd = () => { /* ... (sama, termasuk cek aFoolHasWon) ... */ };
    endGame = (message) => { /* ... (sama) ... */ };
    savePlayerScores = () => { /* ... (sama) ... */ };
    displayScoresUI = () => { /* ... (sama) ... */ };

    function resetGame() {
        players = [];
        rolesToAssign = [];
        civilianWord = '';
        undercoverWord = '';
        currentPlayerSetupIndex = 0;
        totalPlayersToSetup = 0;
        gameInProgress = false;
        initialCiviliansCount = 0;
        initialFoolsCount = 0;
        aFoolHasWon = false;
        currentRoundVotedOut = null;
        if (roleCountError) roleCountError.textContent = '';
        if (nameEntryError) nameEntryError.textContent = '';
        deactivateVotingMode();
        
        updateActiveSection('gameSetup_roleConfig'); // Kembali ke konfigurasi peran
        if(customWordSection) customWordSection.classList.add('hidden');
        if(restartGameButton) restartGameButton.classList.add('hidden');
        if(checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden');
        // if(wordRevealInstruction) wordRevealInstruction.classList.add('hidden'); // Tidak dipakai
        if(votingSection) votingSection.classList.add('hidden');
        if(mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden');
        if(foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
        if(truthOrDareSection) truthOrDareSection.classList.add('hidden');
        if(gameOverSection) gameOverSection.classList.add('hidden');
        if(voteConfirmModal) voteConfirmModal.classList.add('hidden');
        if(registeredPlayersDisplay) registeredPlayersDisplay.classList.add('hidden');
        if(registeredPlayersListUl) registeredPlayersListUl.innerHTML = '';


        // Tidak perlu loadSavedPlayerNames karena input nama sekarang iteratif
        // loadSavedPlayerNames(); 
        if (numPlayersInput) numPlayersInput.value = 4; // Reset ke default
        if (numCiviliansInput) numCiviliansInput.value = 2;
        if (numUndercoversInput) numUndercoversInput.value = 1;
        if (numMrWhiteInput) numMrWhiteInput.value = 1;
        if (numFoolsInput) numFoolsInput.value = 0;


        if (bgMusic && toggleMusicButton) {
            if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
        }
        if(backButton) backButton.classList.add('hidden');
    }

    function initializeApp() {
        loadCustomWords();
        // loadSavedPlayerNames(); // Tidak dipanggil di sini lagi
        updateActiveSection('gameSetup_roleConfig'); // Mulai dari konfigurasi peran
        if(customWordSection) customWordSection.classList.add('hidden');
        if(backButton) backButton.classList.add('hidden');

        if (bgMusic && toggleMusicButton) {
            if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
        }
    }

    initializeApp();
});