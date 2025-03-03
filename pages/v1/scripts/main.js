// 컨텐츠 여기에 명시
const contents = [
    {
        src: 'p1/index.html',
        game: [
            'p1-game/index.html'
        ]
    },
    {
        src: 'p2/index.html',
        game: [
            'p2-game/index.html',
            'p2-game2/index.html'
        ]
    }
]

var nowPlaying = 0;
var nowGaming = null;

// Private Function
function setIframe(src) {
    var iframe = document.getElementById('contentFrame');
    iframe.src = src;
}

// Public Function
// Start next interaction(game) of the content now playing
function startGame() {
    var gamenow = contents[nowPlaying].game
    if(gamenow.length != 0) {
        if(nowGaming === null) {
            nowGaming = 0;
            setIframe(gamenow[nowGaming]);
        } else {
            nowGaming++;
            if(nowGaming >= gamenow.length) {
                nextContent();
            } else {
                setIframe(gamenow[nowGaming]);
            }
        }
    } else {
        nextContent();
    }
}

// Public Function
// Move to next video contents
function nextContent() {
    nowGaming = null;
    nowPlaying++;
    if (nowPlaying >= contents.length) {
        location.href = "index.html";
    } else {
        setIframe(contents[nowPlaying].src);
    }
}

// Public Function
// Move to previous video contents
function prevContent() {
    if (nowPlaying > 0) {
        nowPlaying--;
        var iframe = document.getElementById('contentFrame');
        iframe.src = contents[nowPlaying].src;
    }
}

// 아래는 시스템 이외의것들
window.onload = function () {
    var elem = document.getElementById("videoContainer");

    var p = new URL(location.href);
    var pp = p.searchParams;
    if(pp.has('dev')) {
        setIframe(pp.get('dev') + '/index.html');
    }

    // 풀스크린 코드
    document.getElementById("b_fullscreen").onclick = function() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    // 오른쪽 왼쪽 클릭시 iframe 내부 콘텐츠 바뀜
    document.getElementById("b_back").onclick = prevContent;
    document.getElementById("b_forward").onclick = nextContent;

    // ie 금지코드 시작
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
        alert("인터넷 익스플로러는 세종시 온라인 공부방을 지원하지 않아요. 크롬으로 접속해주세요!");
        document.location.href = 'pororo_home.html';
    }
}