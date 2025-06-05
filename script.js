document.addEventListener('DOMContentLoaded', () => {
    console.log("Script.js loaded and DOM content is ready."); // Debugging log
    console.log("Attempting to initialize app functions..."); // Debugging log

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
    // Referensi elemen menu dihilangkan
    const instructionsModal = document.getElementById('instructionsModal');
    const closeInstructionsButton = document.getElementById('closeInstructionsButton');
    const cardBackImage = document.querySelector('.card-back-image');
    const cardBackTitle = document.getElementById('cardBackTitle');


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
    let isVotingModeActive = false;
    let playerSelectedForVote = null;
    let aFoolHasWon = false;
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
    function playSound(soundElement) {
        if (soundElement) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.warn("Sound playback failed:", e));
        }
    }

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
    }

    // Fungsi toggleMenu dihilangkan

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
        if (customWords.length === 0) {
            const li = document.createElement('li');
            li.textContent = "Belum ada pasangan kata pribadi.";
            li.style.fontStyle = 'italic';
            li.style.color = 'var(--subtle-text-color)';
            li.style.textAlign = 'center';
            customWordListUl.appendChild(li);
            return;
        }
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
    // Event listener untuk menu dihilangkan

    if (closeInstructionsButton) closeInstructionsButton.addEventListener('click', () => {
        playSound(clickSound);
        instructionsModal.classList.add('hidden');
    });

    if (homeButton) homeButton.addEventListener('click', () => {
        playSound(clickSound);
        if (gameInProgress && !confirm("Permainan sedang berlangsung. Kembali ke Home akan mereset game. Lanjutkan?")) {
            return; 
        }
        resetGame();
        updateActiveSection('gameSetup');
    });

    if (backButton) backButton.addEventListener('click', () => {
        playSound(clickSound);
        if (!gameAreaSection.classList.contains('hidden') || truthOrDareSection.classList.contains('hidden')) {
            if (gameInProgress && !confirm("Kembali akan mereset permainan. Lanjutkan?")) {
                return;
            }
            resetGame(); 
            updateActiveSection('gameSetup'); 
        } else if (!customWordSection.classList.contains('hidden')) {
            updateActiveSection('gameSetup'); 
        }
    });

    if (toggleMusicButton) toggleMusicButton.addEventListener('click', () => {
        if (bgMusic) { 
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
                }).catch(e => console.error("Error playing music:", e));
            } else {
                bgMusic.pause();
                toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            }
        }
    });

    // --- LOGIKA SETUP GAME ---
    if (proceedToNameEntryButton) proceedToNameEntryButton.addEventListener('click', () => {
        playSound(clickSound);
        const numPlayers = parseInt(numPlayersInput.value);
        const numCivilians = parseInt(numCiviliansInput.value);
        const numUndercovers = parseInt(numUndercoversInput.value);
        const numMrWhite = parseInt(numMrWhiteInput.value);
        const numFools = parseInt(numFoolsInput.value);

        const totalRoles = numCivilians + numUndercovers + numMrWhite + numFools;

        if (isNaN(numPlayers) || numPlayers < 3 || numPlayers > 6) {
            roleCountError.textContent = 'Jumlah pemain harus antara 3 dan 6.';
            return;
        }
        if (totalRoles !== numPlayers) {
            roleCountError.textContent = `Jumlah total peran (${totalRoles}) tidak sesuai dengan jumlah pemain (${numPlayers}).`;
            return;
        }
        if (isNaN(numFools) || numFools < 0 || numFools > 1) {
            roleCountError.textContent = 'Jumlah The Fool harus 0 atau 1.';
            return;
        }
        if (isNaN(numCivilians) || numCivilians < 1) {
            roleCountError.textContent = 'Setidaknya harus ada 1 Civilian.';
            return;
        }
        if (isNaN(numUndercovers) || numUndercovers < 0 || isNaN(numMrWhite) || numMrWhite < 0) {
             roleCountError.textContent = 'Jumlah Undercover atau Mr. White tidak valid.';
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

        rolesToAssign.sort(() => Math.random() - 0.5); 

        roleConfigurationDiv.classList.add('hidden');
        playerNameEntryDiv.classList.remove('hidden');
        populateAvatarChoices();
        currentPlayerSetupIndex = 0;
        players = []; 
        updateRegisteredPlayersList(); 
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
        if (players.length === 0) {
             registeredPlayersListUl.innerHTML = '<li>Belum ada pemain yang terdaftar.</li>';
             return;
        }
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

    if (submitNameAndRevealCardButton) submitNameAndRevealCardButton.addEventListener('click', () => {
        playSound(clickSound);
        const name = currentNameInput.value.trim();
        if (!name) {
            nameEntryError.textContent = 'Nama pemain tidak boleh kosong!';
            return;
        }
        if (!selectedAvatarPath) {
            nameEntryError.textContent = 'Pilih avatar terlebih dahulu!';
            return;
        }
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            nameEntryError.textContent = 'Nama pemain sudah ada! Gunakan nama yang berbeda.';
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

        currentWordRevealCallback = callback;

        if (cardBackImage) {
            cardBackImage.src = "assets/images/card-back.png"; 
            cardBackImage.style.display = 'block';
            cardBackImage.parentElement.classList.remove('no-image');
        }

        if (flipCardButton) flipCardButton.onclick = () => {
            playSound(clickSound);
            wordCardFlipper.classList.add('is-flipped');
            let wordToShow = '';
            if (player.role === 'Civilian') {
                wordToShow = `<strong>Civilian:</strong> Kata Rahasia: <strong class="highlight-word">${civilianWord}</strong>`;
            } else if (player.role === 'Undercover') {
                wordToShow = `<strong>Undercover:</strong> Kata Rahasia: <strong class="highlight-word">${undercoverWord}</strong>`;
            } else if (player.role === 'Mr. White') {
                wordToShow = `<strong>Mr. White:</strong> Kamu tidak memiliki kata rahasia.<br>Tugasmu: berpura-pura tahu kata rahasia. Jika divote keluar, tebak kata Civilian untuk menang!`;
            } else if (player.role === 'The Fool') {
                wordToShow = `<strong>The Fool:</strong> Tujuanmu adalah membuat dirimu terlihat paling mencurigakan agar divote keluar!<br>Jika berhasil divote keluar (bukan karena alasan lain), kamu menang!`;
            }
            popupCardWord.innerHTML = wordToShow;
        };

        if (closePopupButton) closePopupButton.onclick = () => {
            playSound(clickSound);
            cardPopupOverlay.classList.add('hidden');
            wordCardFlipper.classList.remove('is-flipped');
            if (currentWordRevealCallback) {
                currentWordRevealCallback();
                currentWordRevealCallback = null; 
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

    if (checkMyWordAgainButton) checkMyWordAgainButton.addEventListener('click', () => {
        playSound(clickSound);
        const playerNameInputForCheck = prompt("Siapa namamu?");
        if (playerNameInputForCheck) {
            const player = players.find(p => p.name.toLowerCase() === playerNameInputForCheck.toLowerCase());
            if (player) {
                showWordCardPopup(player, () => {
                });
            } else {
                alert("Pemain tidak ditemukan.");
            }
        } else {
            alert("Nama tidak boleh kosong.");
        }
    });


    // --- FUNGSI INTI GAME (Kartu, Voting, ToD, dll.) ---

    if (activateVotingButton) activateVotingButton.addEventListener('click', () => {
        playSound(clickSound);
        isVotingModeActive = !isVotingModeActive;

        if (isVotingModeActive) {
            activateVotingButton.textContent = 'Batalkan Mode Vote';
            activateVotingButton.classList.add('secondary-button');
            activateVotingButton.classList.remove('primary-button');
            votingInstruction.textContent = 'Mode Vote Aktif! Klik avatar pemain untuk memilih.';
            document.querySelectorAll('#playersDisplay .player-info').forEach(pc => {
                const p = players.find(pl => pl.id === parseInt(pc.dataset.playerId));
                if (p && !p.isOut) {
                    pc.classList.add('votable');
                }
            });
        } else {
            deactivateVotingMode();
        }
    });

    if (playersDisplay) playersDisplay.addEventListener('click', (event) => {
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
            voteConfirmMessage.innerHTML = `Yakin vote keluar <strong>${playerSelectedForVote.name}</strong>?`;
            voteConfirmModal.classList.remove('hidden');
        }
    });

    if (confirmVoteYesButton) confirmVoteYesButton.addEventListener('click', () => {
        playSound(clickSound);
        if (playerSelectedForVote) {
            currentRoundVotedOut = playerSelectedForVote;
            currentRoundVotedOut.isOut = true; 
            updatePlayersDisplayUI(); 

            if (mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden');
            if (foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
            deactivateVotingMode();
            if (voteConfirmModal) voteConfirmModal.classList.add('hidden');

            if (currentRoundVotedOut.role === "The Fool") {
                playSound(foolWinSound);
                currentRoundVotedOut.score += 3; 
                savePlayerScores();
                if (foolWinnerMessage) foolWinnerMessage.textContent = `${currentRoundVotedOut.name} (The Fool) berhasil divote keluar dan MENANG!`;
                if (foolVotedOutMessage) foolVotedOutMessage.classList.remove('hidden');
                aFoolHasWon = true; 
                setTimeout(() => {
                    if (foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
                    checkGameContinuationOrEnd(); 
                }, 3000);
            } else if (currentRoundVotedOut.role === "Mr. White") {
                if (mrWhiteGuessSection) mrWhiteGuessSection.classList.remove('hidden'); 
            } else if (currentRoundVotedOut.role === "Undercover") {
                playSound(loseSound);
                triggerTruthOrDare(currentRoundVotedOut, "Undercover terbongkar!");
            } else if (currentRoundVotedOut.role === "Civilian") {
                playSound(loseSound);
                triggerTruthOrDare(currentRoundVotedOut, "Civilian salah divote!");
            }
            playerSelectedForVote = null; 
        }
    });

    if (confirmVoteNoButton) confirmVoteNoButton.addEventListener('click', () => {
        playSound(clickSound);
        deactivateVotingMode();
        if (voteConfirmModal) voteConfirmModal.classList.add('hidden');
    });

    function deactivateVotingMode() {
        isVotingModeActive = false;
        if (activateVotingButton) {
            activateVotingButton.textContent = 'Aktifkan Mode Vote';
            activateVotingButton.classList.add('primary-button');
            activateVotingButton.classList.remove('secondary-button');
        }
        if (votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, silakan aktifkan mode vote dan pilih pemain yang akan dieliminasi.';
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
        if (truthOrDareChallengeP) truthOrDareChallengeP.textContent = ''; 
        if (getTruthButton) getTruthButton.classList.remove('hidden');
        if (getDareButton) getDareButton.classList.remove('hidden');
        if (punishmentDoneButton) punishmentDoneButton.classList.add('hidden'); 
    }

    if (getTruthButton) getTruthButton.addEventListener('click', () => {
        playSound(clickSound);
        if (truths.length > 0) {
            const randomTruth = truths[Math.floor(Math.random() * truths.length)];
            truthOrDareChallengeP.textContent = `Truth: ${randomTruth}`;
            if (punishmentDoneButton) punishmentDoneButton.classList.remove('hidden');
            if (getTruthButton) getTruthButton.classList.add('hidden');
            if (getDareButton) getDareButton.classList.add('hidden');
        } else {
            if (truthOrDareChallengeP) truthOrDareChallengeP.textContent = 'Tidak ada Truth yang tersedia.';
            if (punishmentDoneButton) punishmentDoneButton.classList.remove('hidden');
        }
    });

    if (getDareButton) getDareButton.addEventListener('click', () => {
        playSound(clickSound);
        if (dares.length > 0) {
            const randomDare = dares[Math.floor(Math.random() * dares.length)];
            truthOrDareChallengeP.textContent = `Dare: ${randomDare}`;
            if (punishmentDoneButton) punishmentDoneButton.classList.remove('hidden');
            if (getTruthButton) getTruthButton.classList.add('hidden');
            if (getDareButton) getDareButton.classList.add('hidden');
        } else {
            if (truthOrDareChallengeP) truthOrDareChallengeP.textContent = 'Tidak ada Dare yang tersedia.';
            if (punishmentDoneButton) punishmentDoneButton.classList.remove('hidden');
        }
    });

    if (punishmentDoneButton) punishmentDoneButton.addEventListener('click', () => {
        playSound(clickSound);
        updateActiveSection('gameArea');
        checkGameContinuationOrEnd(); 
    });

    if (submitMrWhiteGuessButton) submitMrWhiteGuessButton.addEventListener('click', () => {
        playSound(clickSound);
        const guess = mrWhiteWordGuessInput.value.trim();
        if (mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); 

        if (currentRoundVotedOut && currentRoundVotedOut.role === "Mr. White") {
            if (guess.toLowerCase() === civilianWord.toLowerCase()) {
                playSound(winSound);
                currentRoundVotedOut.score += 5; 
                endGame("Mr. White menang dengan menebak kata rahasia!");
            } else {
                playSound(loseSound);
                triggerTruthOrDare(currentRoundVotedOut, `Tebakan Mr. White salah! Kata sebenarnya adalah "${civilianWord}".`);
            }
        }
        if (mrWhiteWordGuessInput) mrWhiteWordGuessInput.value = ''; 
    });


    function checkGameContinuationOrEnd() {
        const activePlayers = players.filter(p => !p.isOut);
        const activeCivilians = activePlayers.filter(p => p.role === 'Civilian');
        const activeUndercovers = activePlayers.filter(p => p.role === 'Undercover');
        const activeMrWhite = activePlayers.filter(p => p.role === 'Mr. White');

        if ((activeUndercovers.length + activeMrWhite.length) >= activeCivilians.length) {
            if (activeUndercovers.length > 0 || activeMrWhite.length > 0) { 
                playSound(loseSound); 
                endGame("Undercover dan/atau Mr. White menang karena jumlah mereka melebihi atau sama dengan Civilian yang aktif!");
                return;
            }
        }

        if (activeUndercovers.length === 0 && activeMrWhite.length === 0) {
            playSound(winSound); 
            endGame("Civilian menang! Semua Undercover dan Mr. White berhasil ditemukan.");
            return;
        }

        updateActiveSection('gameArea');
        if (votingSection) votingSection.classList.remove('hidden');
        if (checkMyWordAgainButton) checkMyWordAgainButton.classList.remove('hidden');
    }


    function endGame(winnerMessage) {
        gameInProgress = false;
        updateActiveSection('gameOverSection');
        if (gameWinnerP) gameWinnerP.textContent = winnerMessage;
        savePlayerScores(); 
        displayScoresUI();
        if (restartGameButton) restartGameButton.classList.remove('hidden');
        if (votingSection) votingSection.classList.add('hidden'); 
        if (checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden'); 
        if (mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden'); 
        if (foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden'); 
    }

    function savePlayerScores() {
    }

    function displayScoresUI() {
        scoreListUl.innerHTML = '';
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        sortedPlayers.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `${p.name} (${p.role}): ${p.score} poin`;
            scoreListUl.appendChild(li);
        });
    }

    if (restartGameButton) restartGameButton.addEventListener('click', () => {
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

        if (numPlayersInput) numPlayersInput.value = 4;
        if (numCiviliansInput) numCiviliansInput.value = 2;
        if (numUndercoversInput) numUndercoversInput.value = 1;
        if (numMrWhiteInput) numMrWhiteInput.value = 1;
        if (numFoolsInput) numFoolsInput.value = 0;

        if (roleCountError) roleCountError.textContent = '';
        if (nameEntryError) nameEntryError.textContent = '';
        if (currentNameInput) currentNameInput.value = '';

        if (registeredPlayersListUl) registeredPlayersListUl.innerHTML = '';
        if (playersDisplay) playersDisplay.innerHTML = '';

        if (mrWhiteWordGuessInput) mrWhiteWordGuessInput.value = '';
        if (truthOrDareChallengeP) truthOrDareChallengeP.textContent = '';
        if (foolWinnerMessage) foolWinnerMessage.textContent = '';
        if (gameWinnerP) gameWinnerP.textContent = '';
        if (scoreListUl) scoreListUl.innerHTML = '';

        if (roleConfigurationDiv) roleConfigurationDiv.classList.remove('hidden');
        if (playerNameEntryDiv) playerNameEntryDiv.classList.add('hidden');
        if (votingSection) votingSection.classList.add('hidden');
        if (mrWhiteGuessSection) mrWhiteGuessSection.classList.add('hidden');
        if (foolVotedOutMessage) foolVotedOutMessage.classList.add('hidden');
        if (checkMyWordAgainButton) checkMyWordAgainButton.classList.add('hidden');
        if (punishmentDoneButton) punishmentDoneButton.classList.add('hidden');
        if (getTruthButton) getTruthButton.classList.remove('hidden');
        if (getDareButton) getDareButton.classList.remove('hidden');
        if (activateVotingButton) {
            activateVotingButton.textContent = 'Aktifkan Mode Vote';
            activateVotingButton.classList.remove('secondary-button');
            activateVotingButton.classList.add('primary-button');
        }
        if (votingInstruction) votingInstruction.textContent = 'Setelah berdiskusi, silakan aktifkan mode vote dan pilih pemain yang akan dieliminasi.';

        initializeApp();
    }


    function initializeApp() {
        console.log("initializeApp started."); 
        loadCustomWords();
        updateActiveSection('gameSetup'); 
        // Inisialisasi terkait menu dihilangkan
        
        populateAvatarChoices(); 
        updateRegisteredPlayersList(); 

        if (bgMusic && toggleMusicButton) {
            if (bgMusic.paused) toggleMusicButton.innerHTML = "🔇<span class='sr-only'>Putar Musik</span>";
            else toggleMusicButton.innerHTML = "🎵<span class='sr-only'>Hentikan Musik</span>";
        }
        console.log("initializeApp finished."); 
    }

    initializeApp();
});