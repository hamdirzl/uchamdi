document.addEventListener('DOMContentLoaded', () => {
    // Audio Elements
    const bgMusic = document.getElementById('bgMusic');
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const loseSound = document.getElementById('loseSound');
    const foolWinSound = document.getElementById('foolWinSound') || loseSound;

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
    const cardBackImage = document.querySelector('.card-back-image');


    // Game State
    let players = [];
    let rolesToAssign = [];
    let totalPlayersToSetup = 0;
    let currentPlayerSetupIndex = 0;
    let selectedAvatarPath = null;
    let civilianWord = '';
    let undercoverWord = '';
    const gameWordPairs = [
        { civilian: "Gelas", undercover: "Cangkir" },
        { civilian: "Baju", undercover: "Kemeja" },
        { civilian: "Meja", undercover: "Kursi" },
        { civilian: "Mobil", undercover: "Motor" },
        { civilian: "Sepatu", undercover: "Sandal" },
        { civilian: "Kucing", undercover: "Anjing" },
        { civilian: "Buku", undercover: "Majalah" },
        { civilian: "Pena", undercover: "Pensil" },
        { civilian: "Televisi", undercover: "Radio" },
        { civilian: "Laptop", undercover: "Komputer" },
        { civilian: "Telepon", undercover: "Handphone" },
        { civilian: "Roti", undercover: "Donat" },
        { civilian: "Nasi", undercover: "Bubur" },
        { civilian: "Pisang", undercover: "Apel" },
        { civilian: "Jeruk", undercover: "Lemon" },
        { civilian: "Mangga", undercover: "Alpukat" },
        { civilian: "Gitar", undercover: "Piano" },
        { civilian: "Drum", undercover: "Rebana" },
        { civilian: "Kamera", undercover: "Foto" },
        { civilian: "Jam", undercover: "Waktu" },
        { civilian: "Rumah", undercover: "Gedung" },
        { civilian: "Jalan", undercover: "Gang" },
        { civilian: "Pohon", undercover: "Bunga" },
        { civilian: "Langit", undercover: "Awan" },
        { civilian: "Bintang", undercover: "Bulan" },
        { civilian: "Matahari", undercover: "Terang" },
        { civilian: "Air", undercover: "Es" },
        { civilian: "Api", undercover: "Panas" },
        { civilian: "Angin", undercover: "Udara" },
        { civilian: "Gunung", undercover: "Bukit" }
    ];
    let customWords = [];
    let gameInProgress = false;
    let initialCiviliansCount = 0;
    let initialUndercoversCount = 0;
    let initialMrWhiteCount = 0;
    let initialFoolsCount = 0;
    let currentRoundVotedOut = null;
    let currentWordRevealCallback = null;
    let isVotingModeActive = false; // Variabel penting untuk mode vote
    let playerSelectedForVote = null;
    let aFoolHasWon = false;
    // Disesuaikan dengan 6 gambar avatar, langsung di assets/images/
    const avatarImages = [
        'assets/images/avatar1.png',
        'assets/images/avatar2.png',
        'assets/images/avatar3.png',
        'assets/images/avatar4.png',
        'assets/images/avatar5.png',
        'assets/images/avatar6.png'
    ];
    const truths = [];
    const dares = [];
    // Isi truths dan dares (contoh)
    truths.push(
        "Apa hal paling memalukan yang pernah kamu lakukan?",
        "Siapa orang yang paling kamu kagumi dan mengapa?",
        "Apa kebiasaan terburukmu?",
        "Jika bisa mengubah satu hal di masa lalumu, apa itu?",
        "Apa impian terbesarmu yang belum tercapai?",
        "Apa rahasia yang tidak pernah kamu ceritakan kepada siapapun?",
        "Apa pendapat jujurmu tentang pemain di sebelah kananmu?",
        "Apa makanan paling aneh yang pernah kamu makan?",
        "Jika kamu bisa memiliki kekuatan super, apa itu?",
        "Apa ketakutan terbesarmu?"
    );
    dares.push(
        "Posting foto selfie paling konyolmu ke media sosial (dengan caption 'Aku Bangga').",
        "Nyanyikan lagu anak-anak dengan suara operatic.",
        "Telepon teman dan katakan 'Aku adalah seekor ayam' tanpa tertawa.",
        "Lakukan push-up 10 kali.",
        "Menarilah seperti nobody's watching selama 30 detik.",
        "Berikan pujian tulus kepada setiap pemain lain.",
        "Pakai kaus kaki di tanganmu sampai giliranmu berikutnya.",
        "Ganti bahasa ponselmu ke bahasa yang tidak kamu mengerti selama 10 menit.",
        "Ceritakan lelucon terburuk yang kamu tahu.",
        "Berjalanlah mundur sampai ke tempat dudukmu."
    );


    // --- Helper Functions ---
    function playSound(soundElement) { if (soundElement) { soundElement.currentTime = 0; soundElement.play().catch(e => console.warn("Sound err:", e)); } }

    function updateActiveSection(activeSectionId) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        const targetSection = document.getElementById(activeSectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        } else {
            console.error(`Section with ID ${activeSectionId} not found.`);
        }

        // Adjust button visibility based on section
        if (activeSectionId === 'gameSetup' || activeSectionId === 'customWordSection') {
            homeButton.classList.remove('hidden');
            backButton.classList.add('hidden');
            restartGameButton.classList.add('hidden');
        } else if (activeSectionId === 'gameArea' || activeSectionId === 'truthOrDareSection' || activeSectionId === 'gameOverSection') {
            homeButton.classList.add('hidden');
            backButton.classList.remove('hidden');
            restartGameButton.classList.remove('hidden');
        } else {
            homeButton.classList.remove('hidden');
            backButton.classList.add('hidden');
            restartGameButton.classList.add('hidden');
        }

        // Specifically manage initial setup view
        if (activeSectionId === 'gameSetup') {
            roleConfigurationDiv.classList.remove('hidden');
            playerNameEntryDiv.classList.add('hidden');
        }
    }

    function toggleMenu(forceClose = false) {
        if (forceClose) {
            menuPanel.classList.remove('open');
            menuOverlay.classList.add('hidden');
        } else {
            menuPanel.classList.toggle('open');
            menuOverlay.classList.toggle('hidden', !menuPanel.classList.contains('open'));
        }
    }

    function loadCustomWords() {
        const storedWords = localStorage.getItem('dracarysCustomWords');
        if (storedWords) {
            customWords = JSON.parse(storedWords);
            updateCustomWordListUI();
        }
    }

    function saveCustomWords() {
        localStorage.setItem('dracarysCustomWords', JSON.stringify(customWords));
    }

    function updateCustomWordListUI() {
        customWordListUl.innerHTML = '';
        if (customWords.length === 0) return;
        customWords.forEach((pair, index) => {
            const li = document.createElement('li');
            li.innerHTML = `Civilian: <strong>${pair.civilian}</strong>, Undercover: <strong>${pair.undercover}</strong> <button data-index="${index}">Hapus</button>`;
            customWordListUl.appendChild(li);
        });

        customWordListUl.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                playSound(clickSound);
                const indexToRemove = parseInt(e.target.dataset.index);
                customWords.splice(indexToRemove, 1);
                saveCustomWords();
                updateCustomWordListUI();
            });
        });
    }

    function populateAvatarChoices() {
        avatarSelectionContainer.innerHTML = '';
        avatarImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Avatar';
            img.addEventListener('click', () => {
                playSound(clickSound);
                document.querySelectorAll('.avatar-selection-container img').forEach(img => img.classList.remove('selected-avatar'));
                img.classList.add('selected-avatar');
                selectedAvatarPath = src;
            });
            avatarSelectionContainer.appendChild(img);
        });
    }

    // --- Event Listeners Menu, Navigasi, dan Umum ---
    menuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(); });
    closeMenuButton.addEventListener('click', () => { playSound(clickSound); toggleMenu(true); });
    menuOverlay.addEventListener('click', () => { playSound(clickSound); toggleMenu(true); });

    menuKamusKata.addEventListener('click', () => {
        playSound(clickSound);
        toggleMenu(true);
        updateActiveSection('customWordSection');
        backButton.classList.remove('hidden');
        homeButton.classList.add('hidden');
    });

    menuModeParty.addEventListener('click', () => {
        playSound(clickSound);
        toggleMenu(true);
        // This is where you would typically go to a special "Party Mode" setup
        // For now, let's just go to main setup or alert that it's "The Fool" mode
        alert('Mode Party adalah Mode The Fool (sudah termasuk dalam permainan utama jika diaktifkan di pengaturan peran).');
        updateActiveSection('gameSetup'); // Redirect to main setup
    });

    menuPetunjuk.addEventListener('click', () => {
        playSound(clickSound);
        toggleMenu(true);
        instructionsModal.classList.remove('hidden');
    });

    closeInstructionsButton.addEventListener('click', () => {
        playSound(clickSound);
        instructionsModal.classList.add('hidden');
    });

    homeButton.addEventListener('click', () => {
        playSound(clickSound);
        resetGame();
        updateActiveSection('gameSetup');
    });

    backButton.addEventListener('click', () => {
        playSound(clickSound);
        // Logic to go back to the previous relevant section
        // Simple heuristic: if in custom word, go to setup. if in game, go to setup.
        if (customWordSection.classList.contains('hidden') && !gameAreaSection.classList.contains('hidden')) {
            // If in game, go back to setup or confirm restart
            if (confirm("Kembali ke pengaturan akan mereset permainan. Lanjutkan?")) {
                resetGame();
                updateActiveSection('gameSetup');
            }
        } else {
            // If in custom word section
            updateActiveSection('gameSetup');
        }
    });

    toggleMusicButton.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
            }).catch(e => console.error("Error playing music:", e));
        } else {
            bgMusic.pause();
            toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
        }
    });

    // --- LOGIKA SETUP GAME ---
    proceedToNameEntryButton.addEventListener('click', () => {
        playSound(clickSound);
        const numPlayers = parseInt(numPlayersInput.value);
        const numCivilians = parseInt(numCiviliansInput.value);
        const numUndercovers = parseInt(numUndercoversInput.value);
        const numMrWhite = parseInt(numMrWhiteInput.value);
        const numFools = parseInt(numFoolsInput.value);

        const totalRoles = numCivilians + numUndercovers + numMrWhite + numFools;

        if (numPlayers < 3 || numPlayers > 6) {
            roleCountError.textContent = 'Jumlah pemain harus antara 3 dan 6.';
            return;
        }
        if (totalRoles !== numPlayers) {
            roleCountError.textContent = `Jumlah total peran (${totalRoles}) tidak sesuai dengan jumlah pemain (${numPlayers}).`;
            return;
        }
        if (numFools > 1) {
            roleCountError.textContent = 'Jumlah The Fool tidak bisa lebih dari 1.';
            return;
        }
        if (numCivilians < 1) {
            roleCountError.textContent = 'Setidaknya harus ada 1 Civilian.';
            return;
        }

        roleCountError.textContent = '';
        totalPlayersToSetup = numPlayers;
        initialCiviliansCount = numCivilians;
        initialUndercoversCount = numUndercovers;
        initialMrWhiteCount = numMrWhite;
        initialFoolsCount = numFools;

        rolesToAssign = [];
        for (let i = 0; i < numCivilians; i++) rolesToAssign.push('Civilian');
        for (let i = 0; i < numUndercovers; i++) rolesToAssign.push('Undercover');
        for (let i = 0; i < numMrWhite; i++) rolesToAssign.push('Mr. White');
        for (let i = 0; i < numFools; i++) rolesToAssign.push('The Fool');

        rolesToAssign.sort(() => Math.random() - 0.5); // Shuffle roles

        roleConfigurationDiv.classList.add('hidden');
        playerNameEntryDiv.classList.remove('hidden');
        populateAvatarChoices();
        currentPlayerSetupIndex = 0;
        prepareNextPlayerNameEntry();
    });

    function prepareNextPlayerNameEntry() {
        if (currentPlayerSetupIndex < totalPlayersToSetup) {
            playerNamePrompt.textContent = `Pemain ${currentPlayerSetupIndex + 1}, Masukkan Nama, Pilih Avatar & Lihat Peranmu:`;
            currentNameInput.value = '';
            selectedAvatarPath = null;
            document.querySelectorAll('.avatar-selection-container img').forEach(img => img.classList.remove('selected-avatar'));
            submitNameAndRevealCardButton.textContent = 'Simpan & Lihat Peran';
        } else {
            startGameFromIterativeSetup();
        }
    }

    function updateRegisteredPlayersList() {
        registeredPlayersListUl.innerHTML = '';
        players.forEach(p => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = p.avatar;
            img.alt = p.name;
            li.appendChild(img);
            li.appendChild(document.createTextNode(p.name));
            registeredPlayersListUl.appendChild(li);
        });
    }

    submitNameAndRevealCardButton.addEventListener('click', () => {
        playSound(clickSound);
        const name = currentNameInput.value.trim();
        if (!name || !selectedAvatarPath) {
            nameEntryError.textContent = 'Nama dan Avatar harus diisi!';
            return;
        }
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            nameEntryError.textContent = 'Nama pemain sudah ada!';
            return;
        }
        nameEntryError.textContent = '';

        const assignedRole = rolesToAssign[currentPlayerSetupIndex];
        const player = {
            id: currentPlayerSetupIndex,
            name: name,
            avatar: selectedAvatarPath,
            role: assignedRole,
            isOut: false,
            score: 0
        };
        players.push(player);
        updateRegisteredPlayersList();

        showWordCardPopup(player, () => {
            currentPlayerSetupIndex++;
            prepareNextPlayerNameEntry();
        });
    });

    function showWordCardPopup(player, callback) {
        wordCardFlipper.classList.remove('is-flipped');
        cardPopupOverlay.classList.remove('hidden');
        cardBackTitle.textContent = `${player.name}, siap?`;

        // Store the callback to be executed when the card is closed
        currentWordRevealCallback = callback;

        // Reset the image in case it was hidden by onerror
        if (cardBackImage) {
            cardBackImage.src = "assets/images/card-back.png"; // Set default image
            cardBackImage.style.display = 'block';
            cardBackImage.parentElement.classList.remove('no-image');
        }

        flipCardButton.onclick = () => {
            playSound(clickSound);
            wordCardFlipper.classList.add('is-flipped');
            let wordToShow = '';
            if (player.role === 'Civilian' || player.role === 'Undercover') {
                wordToShow = `<strong>${player.role}:</strong> Kata Rahasia: <strong class="highlight-word">${player.role === 'Civilian' ? civilianWord : undercoverWord}</strong>`;
            } else if (player.role === 'Mr. White') {
                wordToShow = `<strong>Mr. White:</strong> Kamu tidak memiliki kata rahasia.<br>Tugasmu: berpura-pura tahu kata rahasia. Jika divote keluar, tebak kata Civilian untuk menang!`;
            } else if (player.role === 'The Fool') {
                wordToShow = `<strong>The Fool:</strong> Tujuanmu adalah membuat dirimu terlihat paling mencurigakan agar divote keluar!<br>Jika berhasil divote keluar (bukan karena alasan lain), kamu menang!`;
            }
            popupCardWord.innerHTML = wordToShow;
        };

        closePopupButton.onclick = () => {
            playSound(clickSound);
            cardPopupOverlay.classList.add('hidden');
            wordCardFlipper.classList.remove('is-flipped');
            if (currentWordRevealCallback) {
                currentWordRevealCallback();
                currentWordRevealCallback = null; // Clear the callback
            }
        };
    }

    function startGameFromIterativeSetup() {
        gameInProgress = true;
        updateActiveSection('gameArea');
        if (gameWordPairs.length + customWords.length === 0) {
            alert("Tidak ada pasangan kata yang tersedia. Silakan tambahkan di 'Kamus Kata Pribadi'.");
            resetGame();
            return;
        }

        const allWordPairs = [...gameWordPairs, ...customWords];
        const selectedPair = allWordPairs[Math.floor(Math.random() * allWordPairs.length)];
        civilianWord = selectedPair.civilian;
        undercoverWord = selectedPair.undercover;

        updatePlayersDisplayUI();
        votingSection.classList.remove('hidden');
        checkMyWordAgainButton.classList.remove('hidden');
    }

    checkMyWordAgainButton.addEventListener('click', () => {
        playSound(clickSound);
        // Find the current player's role (this needs more sophisticated 'current player' tracking if it's not the setup phase)
        // For simplicity, this button assumes the user just wants to see THEIR word again, so we'd need to know who pressed it.
        // In a real game, this might be a pop-up asking "Siapa namamu?" or have a login system.
        // For now, let's just make it show for the last registered player as a placeholder or simply the current player's role if we store it globally after login.
        // As per the structure, it appears this button is for whoever is playing at the moment.
        // Let's assume there's a way to identify the current user, or let's simplify for demonstration:
        const playerNameInputForCheck = prompt("Siapa namamu?");
        if (playerNameInputForCheck) {
            const player = players.find(p => p.name.toLowerCase() === playerNameInputForCheck.toLowerCase());
            if (player) {
                showWordCardPopup(player, () => {
                    // No action needed after closing for this specific button click
                });
            } else {
                alert("Pemain tidak ditemukan.");
            }
        }
    });


    // --- FUNGSI INTI GAME (Kartu, Voting, ToD, dll.) ---

    // Event listener untuk activateVotingButton
    if (activateVotingButton) {
        activateVotingButton.addEventListener('click', () => {
            playSound(clickSound);
            isVotingModeActive = !isVotingModeActive;

            if (isVotingModeActive) {
                activateVotingButton.textContent = 'Batalkan Mode Vote';
                activateVotingButton.classList.add('secondary-button');
                activateVotingButton.classList.remove('primary-button');
                if (votingInstruction) votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain untuk memilih.';
                let votableCount = 0;
                document.querySelectorAll('#playersDisplay .player-info').forEach(pc => {
                    const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId));
                    if (p && !p.isOut) {
                        pc.classList.add('votable');
                        votableCount++;
                    }
                });
            } else {
                deactivateVotingMode();
            }
        });
    } else {
        console.error("Elemen activateVotingButton tidak ditemukan!");
    }

    // Event listener untuk playersDisplay
    if (playersDisplay) {
        playersDisplay.addEventListener('click', (event) => {
            if (!isVotingModeActive) {
                return;
            }

            const card = event.target.closest('.player-info.votable:not(.voted-out)');
            if (!card) {
                return;
            }
            playSound(clickSound);
            const pId = parseInt(card.dataset.playerId);
            playerSelectedForVote = players.find(p => p.id === pId);

            if (playerSelectedForVote) {
                document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(pCard => pCard.classList.remove('selected-for-vote'));
                card.classList.add('selected-for-vote');
                if (voteConfirmMessage) voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`;

                if (voteConfirmModal) {
                    voteConfirmModal.classList.remove('hidden');
                }
            }
        });
    } else {
        console.error("Elemen playersDisplay tidak ditemukan!");
    }

    // Event listener untuk confirmVoteYesButton
    if (confirmVoteYesButton) {
        confirmVoteYesButton.addEventListener('click', () => {
            playSound(clickSound);
            if (playerSelectedForVote) {
                currentRoundVotedOut = playerSelectedForVote;
                currentRoundVotedOut.isOut = true;
                aFoolHasWon = false;
                updatePlayersDisplayUI();

                if (mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden');
                if (foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
                deactivateVotingMode();
                if (voteConfirmModal) voteConfirmModal.classList.add('hidden');

                if (currentRoundVotedOut.role === "The Fool") {
                    playSound(foolWinSound);
                    currentRoundVotedOut.score += 3; // Fool wins points
                    savePlayerScores();
                    if (foolWinnerMessage) foolWinnerMessage.textContent = `${currentRoundVotedOut.name} (The Fool) berhasil divote keluar dan MENANG!`;
                    if (foolVotedOutMessage) foolVotedOutMessage.classList.remove('hidden');
                    aFoolHasWon = true;
                    // The Fool's win means the game ends for them, but the main game might continue
                    setTimeout(() => {
                        if (foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
                        checkGameContinuationOrEnd();
                    }, 3000);
                } else if (currentRoundVotedOut.role === "Mr. White") {
                    if (mrWhiteGuessSection) mrWhiteGuessSection.classList.remove('hidden');
                    // Mr. White will guess, then checkGameContinuationOrEnd will be called
                } else if (currentRoundVotedOut.role === "Undercover") {
                    playSound(loseSound);
                    triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!");
                    // Game continues after ToD, checkGameContinuationOrEnd is called from punishmentDoneButton
                } else if (currentRoundVotedOut.role === "Civilian") {
                    playSound(loseSound);
                    triggerTruthOrDare(currentRoundVotedOut, "Civilian salah divote!");
                    // Game continues after ToD, checkGameContinuationOrEnd is called from punishmentDoneButton
                }
                playerSelectedForVote = null;
            }
        });
    } else {
        console.error("Elemen confirmVoteYesButton tidak ditemukan!");
    }

    if (confirmVoteNoButton) {
        confirmVoteNoButton.addEventListener('click', () => {
            playSound(clickSound);
            deactivateVotingMode();
            if (voteConfirmModal) voteConfirmModal.classList.add('hidden');
        });
    }

    function deactivateVotingMode() {
        isVotingModeActive = false;
        if (activateVotingButton) {
            activateVotingButton.textContent = 'Aktifkan Mode Vote';
            activateVotingButton.classList.add('primary-button');
            activateVotingButton.classList.remove('secondary-button');
        }
        if (votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, aktifkan mode vote dan pilih pemain.';
        document.querySelectorAll('#playersDisplay .player-info.votable').forEach(pc => pc.classList.remove('votable'));
        document.querySelectorAll('#playersDisplay .player-info.selected-for-vote').forEach(p => p.classList.remove('selected-for-vote'));
        playerSelectedForVote = null;
    }

    function updatePlayersDisplayUI() {
        playersDisplay.innerHTML = '';
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-info');
            if (player.isOut) {
                playerCard.classList.add('voted-out');
            }
            playerCard.dataset.playerId = player.id;

            playerCard.innerHTML = `
                <img src="${player.avatar}" alt="${player.name}">
                <strong>${player.name}</strong>
                <span class="player-status">${player.isOut ? 'Tereliminasi' : 'Dalam Game'}</span>
            `;
            playersDisplay.appendChild(playerCard);
        });
    }

    function triggerTruthOrDare(player, message) {
        updateActiveSection('truthOrDareSection');
        if (punishedPlayerName) punishedPlayerName.textContent = `${player.name}, ${message} Saatnya Truth or Dare!`;
        if (truthOrDareChallengeP) truthOrDareChallengeP.textContent = ''; // Clear previous challenge
        getTruthButton.classList.remove('hidden');
        getDareButton.classList.remove('hidden');
        punishmentDoneButton.classList.add('hidden');
    }

    getTruthButton.addEventListener('click', () => {
        playSound(clickSound);
        if (truths.length > 0) {
            const randomTruth = truths[Math.floor(Math.random() * truths.length)];
            truthOrDareChallengeP.textContent = `Truth: ${randomTruth}`;
            punishmentDoneButton.classList.remove('hidden');
            getTruthButton.classList.add('hidden');
            getDareButton.classList.add('hidden');
        } else {
            truthOrDareChallengeP.textContent = 'Tidak ada Truth yang tersedia.';
            punishmentDoneButton.classList.remove('hidden');
        }
    });

    getDareButton.addEventListener('click', () => {
        playSound(clickSound);
        if (dares.length > 0) {
            const randomDare = dares[Math.floor(Math.random() * dares.length)];
            truthOrDareChallengeP.textContent = `Dare: ${randomDare}`;
            punishmentDoneButton.classList.remove('hidden');
            getTruthButton.classList.add('hidden');
            getDareButton.classList.add('hidden');
        } else {
            truthOrDareChallengeP.textContent = 'Tidak ada Dare yang tersedia.';
            punishmentDoneButton.classList.remove('hidden');
        }
    });

    punishmentDoneButton.addEventListener('click', () => {
        playSound(clickSound);
        updateActiveSection('gameArea');
        checkGameContinuationOrEnd();
    });

    submitMrWhiteGuessButton.addEventListener('click', () => {
        playSound(clickSound);
        const guess = mrWhiteWordGuessInput.value.trim();
        mrWhiteGuessSection.classList.add('hidden');
        if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") {
            if (guess.toLowerCase() === civilianWord.toLowerCase()) {
                playSound(winSound);
                currentRoundVotedOut.score += 5; // Mr. White wins points
                endGame("Mr. White menang dengan menebak kata rahasia!");
            } else {
                playSound(loseSound);
                triggerTruthOrDare(currentRoundVotedOut, `Tebakan Mr. White salah! Kata sebenarnya adalah "${civilianWord}".`);
                // Game continues via punishmentDoneButton after ToD
            }
        }
        mrWhiteWordGuessInput.value = '';
    });


    function checkGameContinuationOrEnd() {
        const activePlayers = players.filter(p => !p.isOut);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');
        const totalUndercovers = players.filter(p => p.role === 'Undercover').length; // Total initial Undercovers
        const totalMrWhite = players.filter(p => p.role === 'Mr. White').length; // Total initial Mr. White

        // Condition 1: The Fool wins
        if (aFoolHasWon) {
            // If Fool won, the game continues for others, but check main win conditions
            // Reset the flag after processing, or ensure it's handled properly within the Fool's elimination block
            // The setTimeout in fool's elimination already hides the message, so we just proceed.
            // If it was the *only* win condition, we'd end here. But others can still win.
        }

        // Condition 2: Undercover/Mr. White win (if they outnumber civilians)
        // This means if (Undercover + Mr. White) >= Civilians
        if ((activeUndercovers.length + activeMrWhite.length) >= activeCivilians.length) {
            if (activeUndercovers.length > 0 || activeMrWhite.length > 0) {
                playSound(loseSound); // Civilians lost
                endGame("Undercover dan/atau Mr. White menang karena mereka melebihi jumlah Civilian yang aktif!");
                return;
            }
        }

        // Condition 3: Civilians win (all Undercovers and Mr. White eliminated)
        if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
            playSound(winSound); // Civilians win
            endGame("Civilian menang! Semua Undercover dan Mr. White berhasil ditemukan.");
            return;
        }

        // Condition 4: Game continues - implicit if none of the above conditions are met.
        // The UI should remain in gameArea.
    }


    function endGame(winnerMessage) {
        gameInProgress = false;
        updateActiveSection('gameOverSection');
        gameWinnerP.textContent = winnerMessage;
        savePlayerScores();
        displayScoresUI();
        restartGameButton.classList.remove('hidden');
        votingSection.classList.add('hidden'); // Hide voting section
        checkMyWordAgainButton.classList.add('hidden'); // Hide check word button
    }

    function savePlayerScores() {
        // Implement score saving if you have a persistent scoring system
        // For this example, scores are just calculated at the end.
    }

    function displayScoresUI() {
        scoreListUl.innerHTML = '';
        players.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.name} (${p.role}): ${p.score} poin`;
            scoreListUl.appendChild(li);
        });
    }

    restartGameButton.addEventListener('click', () => {
        playSound(clickSound);
        resetGame();
        updateActiveSection('gameSetup');
    });

    function resetGame() {
        players = [];
        rolesToAssign = [];
        totalPlayersToSetup = 0;
        currentPlayerSetupIndex = 0;
        selectedAvatarPath = null;
        civilianWord = '';
        undercoverWord = '';
        gameInProgress = false;
        currentRoundVotedOut = null;
        isVotingModeActive = false;
        playerSelectedForVote = null;
        aFoolHasWon = false;

        // Clear UI elements
        numPlayersInput.value = 4; // Reset to default
        numCiviliansInput.value = 2; // Reset to default
        numUndercoversInput.value = 1; // Reset to default
        numMrWhiteInput.value = 1; // Reset to default
        numFoolsInput.value = 0; // Reset to default
        roleCountError.textContent = '';
        nameEntryError.textContent = '';
        currentNameInput.value = '';
        registeredPlayersListUl.innerHTML = '';
        playersDisplay.innerHTML = '';
        mrWhiteWordGuessInput.value = '';
        truthOrDareChallengeP.textContent = '';
        foolWinnerMessage.textContent = '';
        gameWinnerP.textContent = '';
        scoreListUl.innerHTML = '';

        // Reset section visibility
        roleConfigurationDiv.classList.remove('hidden');
        playerNameEntryDiv.classList.add('hidden');
        votingSection.classList.add('hidden');
        mrWhiteGuessSection.classList.add('hidden');
        foolVotedOutMessage.classList.add('hidden');
        checkMyWordAgainButton.classList.add('hidden');
        punishmentDoneButton.classList.add('hidden');
        getTruthButton.classList.remove('hidden'); // Ensure ToD buttons are visible for next game setup
        getDareButton.classList.remove('hidden');
        activateVotingButton.textContent = 'Aktifkan Mode Vote';
        activateVotingButton.classList.remove('secondary-button');
        activateVotingButton.classList.add('primary-button');
        votingInstruction.textContent = 'Setelah berdiskusi, silakan aktifkan mode vote dan pilih pemain yang akan dieliminasi.';

        // Re-initialize app specific UI
        initializeApp();
    }


    function initializeApp() {
        loadCustomWords();
        updateActiveSection('gameSetup'); // Start with game setup
        if (customWordSection) customWordSection.classList.add('hidden'); // Ensure custom word section is hidden initially
        if (backButton) backButton.classList.add('hidden'); // Hide back button on initial load
        if (avatarSelectionContainer) populateAvatarChoices(); // Populate avatars on start

        if (bgMusic && toggleMusicButton) {
            if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
        }
    }

    initializeApp();
});