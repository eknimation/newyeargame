var team, game, currentTime, gameCountdown, emolodyData, wheregoData, guessData, gameData, wordIndex;

var emelodyScore = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

var wheregoScore = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

var guessScore = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

var objTeam = {
    1: 'ทีม 1',
    2: 'ทีม 2',
    3: 'ทีม 3',
    4: 'ทีม 4'
};

var objGame = {
    1: 'อีเมโลดี้',
    2: 'ไปไหนดีครับ',
    3: 'ใบ้หัวต่อท้าย'
};

$(function () {
    $('.back-home').click(function () {
        clearInterval(gameCountdown);

        $('#word-skip, #word-correct').removeAttr('disabled');
        $('#score').html(0);

        $('#select-team-block').show();
        $('#select-game-block').hide();
        $('#start-game-block').hide();
        $('#play-game-block').hide();
    });

    $('.btn-team-orange').click(function () {
        team = $(this).data('team');

        $('.team-name').html(objTeam[team]);

        $('#select-team-block').hide();
        $('#select-game-block').show();
    });

    $('.select-game').click(function () {
        game = $(this).data('game');

        $('.game-name').html(objGame[game]);

        $('#select-game-block').hide();
        $('#start-game-block').show();
    });

    $('#click-start').click(function () {
        startTime();
        loadGame();

        $('#start-game-block').hide();
        $('#play-game-block').show();
    });

    $('#word-skip').click(function () {
        skipWord();
    });

    $('#word-correct').click(function () {
        correctWord();
    });
});

function startTime() {
    currentTime = 90;
    $('#timeout').html(currentTime);

    gameCountdown = setInterval(countDown, 1000);
}

function countDown() {
    currentTime -= 1;
    $('#timeout').html(currentTime);

    if (currentTime <= 0) {
        $('#word-skip, #word-correct').attr('disabled', 'disabled');
        setTimeout(function () {
            clearInterval(gameCountdown);
            alert('หมดเวลา');
        }, 100);

    }
}

function loadGame() {
    gameData;
    if (game == 1) {
        gameData = emelodyData;
    } else if (game == 2) {
        gameData = wheregoData;
    } else if (game == 3) {
        gameData = guessData;
    }
    wordIndex = 0;

    displayWord();
}

function displayWord() {
    var word = gameData[team][wordIndex];
    if (word == undefined) {
        word = '';
        clearInterval(gameCountdown);
        $('#word-skip, #word-correct').attr('disabled', 'disabled');

        setTimeout(function () {
            alert('หมดแล้วจ้า');
        }, 100);

    }
    $('#game-word').html(word);

}

function skipWord() {
    var size = gameData[team].length;

    if (size > 0) {
        var maxIndex = size - 1;
        var nextIndex = wordIndex + 1;

        if (nextIndex <= maxIndex) {
            wordIndex = nextIndex;
        } else {
            wordIndex = 0;
        }

        setTimeout(displayWord, 100);

    } else {
        alert('หมดแล้ว');
    }
}

function correctWord() {
    gameData[team].splice(wordIndex, 1);
    addScore();

    if (gameData[team][wordIndex] == undefined) {
        wordIndex = 0;
    }
    setTimeout(displayWord, 100);
}

function addScore() {
    var displayScore;
    if (game == 1) {
        emelodyScore[team] = parseInt(emelodyScore[team]) + 1;
        displayScore = emelodyScore[team];
    } else if (game == 2) {
        wheregoScore[team] = parseInt(wheregoScore[team]) + 1;
        displayScore = wheregoScore[team];
    } else if (game == 3) {
        guessScore[team] = parseInt(guessScore[team]) + 1;
        displayScore = guessScore[team];
    }

    $('#score').html(displayScore);
}
