let MainBox = document.querySelector(".game")
let startGame = document.querySelector(".Strt-game")
let xBox = document.querySelector(".X-turn-box")
let oBox = document.querySelector(".O-turn-box")
let allBox = document.querySelectorAll(".mini-box")
let footer = document.querySelector(".footer")
let onePly = document.querySelector(".one-Player")
let twoPly = document.querySelector(".Two-Player")
let h3 = document.createElement("h3")
let h4 = document.createElement("h4")
let div = document.createElement("div")
div.classList.add("winply")
let click = 0
let turn = "X"
let delay = 500
let delay2= 700
let gameOver = ""
let defaultOneplr = "OnePlayer"
let count = 0
xBox.classList.add("default-turn")
onePly.classList.add("default-turn")

let allmusic = ["1.mp3","2.mp3","3.mp3","4.mp3","5.mp3","6.mp3","6.mp3","7.mp3","8.mp3","9.mp3","10.mp3","11.mp3","12.mp3","13.mp3","15.mp3",]
let m = new Audio(`audio.mp3/${allmusic[Math.floor(Math.random()*allmusic.length)]}`)
 m.play()


function chackWin() {
    if (
        (allBox[0].innerText === allBox[1].innerText && allBox[1].innerText === allBox[2].innerText && allBox[0].innerText !== "") ||
        (allBox[3].innerText === allBox[4].innerText && allBox[4].innerText === allBox[5].innerText && allBox[3].innerText !== "") ||
        (allBox[6].innerText === allBox[7].innerText && allBox[7].innerText === allBox[8].innerText && allBox[6].innerText !== "") ||
        (allBox[0].innerText === allBox[3].innerText && allBox[3].innerText === allBox[6].innerText && allBox[0].innerText !== "") ||
        (allBox[1].innerText === allBox[4].innerText && allBox[4].innerText === allBox[7].innerText && allBox[1].innerText !== "") ||
        (allBox[2].innerText === allBox[5].innerText && allBox[5].innerText === allBox[8].innerText && allBox[2].innerText !== "") ||
        (allBox[2].innerText === allBox[4].innerText && allBox[4].innerText === allBox[6].innerText && allBox[2].innerText !== "") ||
        (allBox[0].innerText === allBox[4].innerText && allBox[4].innerText === allBox[8].innerText && allBox[0].innerText !== "")
    ) {
        gameOver = "Game Over"
        startGame.innerText = gameOver
        h3.innerText = turn
        h4.innerText = "Winner!"
       function thisWin(){
        MainBox.innerHTML = ""
        div.append(h3, h4)
        MainBox.append(div)
       }

       setTimeout((thisWin), delay2)
    } else {
        count++
    }
    if (count === 9) {
        gameOver = "Game Over"
        startGame.innerText = gameOver
        h3.innerText = "XO"
        h4.innerText = "Draw!"
        function draw(){
            MainBox.innerHTML = ""
            div.append(h3, h4)
            MainBox.append(div)
        }
        setTimeout(( draw), delay2)
    }

}

function setTimeOut() {
    if (gameOver === "") {
        startGame.innerHTML = turn + " " + "Turn"
        if (turn === "X") {
            xBox.classList.add("default-turn")
            oBox.classList.remove("default-turn")
        } else {
            oBox.classList.add("default-turn")
            xBox.classList.remove("default-turn")
        }
    }
}

function chengeTurn() {
    return turn === "X" ? "O" : "X"
}

function radomClick() {
    let filter = []
    allBox.forEach((elm) => {
        if (elm.innerText === "") {
            filter.push(elm)
        }
    })
    let autoClick = filter[Math.floor(Math.random() * filter.length)]
    if (autoClick === undefined) { return }
    autoClick.innerText = turn
    autoClick.classList.add("turn")
    chackWin()
    turn = chengeTurn()
    setTimeout((setTimeOut), delay)
}

oBox.addEventListener("click", () => {
    if (click === 0) {
        turn = "O"
        xBox.classList.remove("default-turn")
        oBox.classList.add("default-turn")
    }
})

MainBox.addEventListener("click", (e) => {

    click = 1
    if (e.target.innerText === "" && gameOver === "" && defaultOneplr === "OnePlayer") {
        let clickText = e.target
        clickText.innerText = turn
        clickText.classList.add("turn")
        chackWin()
        turn = chengeTurn()
        setTimeout((setTimeOut), delay)
        if (gameOver === "") {
            setTimeout((radomClick), delay)
        }
    }
})

footer.addEventListener("click", (e) => {
    if (e.target.classList.contains("footer") || e.target.classList.contains("one-Player")) { return }
    if (e.target.classList.contains("Two-Player") && click === 0) {
        onePly.classList.remove("default-turn")
        twoPly.classList.add("default-turn")
        defaultOneplr = "TwoPlayer"
        MainBox.addEventListener("click", (e) => {
            if (e.target.innerText === "" && gameOver === "") {
                let clickText = e.target
                clickText.innerText = turn
                clickText.classList.add("turn")
                chackWin()
                turn = chengeTurn()
                setTimeout((setTimeOut), delay)
            }
        })
    } else if (e.target.classList.contains("restart-game")) {
      document.location.reload()
    }
})





