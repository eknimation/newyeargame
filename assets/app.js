var team, game, currentTime, gameCountdown;

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

    $('.btn-game-blue').click(function () {
        game = $(this).data('game');

        $('.game-name').html(objGame[game]);

        $('#select-game-block').hide();
        $('#start-game-block').show();
    });

    $('#click-start').click(function () {
        startTime();

        $('#start-game-block').hide();
        $('#play-game-block').show();
    });
});

function startTime() {
    currentTime = 5;
    $('#timeout').html(currentTime);

    gameCountdown = setInterval(countDown, 1000);
}

function countDown() {
    currentTime -= 1;
    $('#timeout').html(currentTime);

    if (currentTime <= 0) {
        setTimeout(function () {
            clearInterval(gameCountdown);
            alert('หมดเวลา');
        }, 200);

    }


}


