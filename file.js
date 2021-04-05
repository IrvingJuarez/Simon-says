const button = document.getElementById(`button-start`), hidenButton = document.getElementById(`hidenButton`)

const one = document.getElementById(`one`), two = document.getElementById(`two`), three = document.getElementById(`three`), four = document.getElementById(`four`)

const liveOne = document.getElementById(`live1`), liveTwo = document.getElementById(`live2`), liveThree = document.getElementById(`live3`), liveFour = document.getElementById(`live4`), liveFive = document.getElementById(`live5`)
const livesArray = [liveOne, liveTwo, liveThree, liveFour, liveFive]

const green = `#7DFF73`, red = `#FF5D6E`, blue = `#6474FF`, purple = `#FF5EFA`

const initialGreen = `#13FF00`, initialRed = `#FF001B`, initialBlue = `#001BFF`, initialPurple = `#FF00F7`

const MAX_LEVEL = 10

var scorehtml = document.getElementById(`score`)

const scoreDiv = document.getElementById(`main__score-div`)

const hidenPanel = document.getElementById(`hidenPanel`), resultPanel = document.getElementById(`resultPanel`)

var resultHtml = document.getElementById(`resultText`)

class Game{
    constructor(){
        this.start()
        this.nextLevel()
    }

    start(){
        button.style.display = "none"
        this.level = 1
        this.sublevel = 0
        this.score = 0
        this.lives = 5

        this.chooseColor = this.chooseColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.again = this.again.bind(this)
        this.passLevel = this.passLevel.bind(this)
    }

    generateSequence(){
        this.sequence = new Array(MAX_LEVEL).fill(0).map(e => Math.ceil(Math.random() * 4))

        // console.log(this.sequence)
    }

    nextLevel(){
        if(this.level > 1){
            hidenButton.innerHTML = "Next level"

            hidenButton.style.display = "initial"
            hidenButton.style.fontSize = "2.5rem"

            hidenButton.addEventListener(`click`, this.passLevel)
        }else{
            this.lightness()
            this.input()
        }
    }

    passLevel(){
        hidenButton.style.display = "none"

        setTimeout(() => {
            this.lightness()
            this.input()
            hidenButton.removeEventListener(`click`, this.passLevel)
        }, 500)
    }

    numberToColor(num){
        switch(num){
            case 1:
                return `one`
            case 2:
                return `two`
            case 3:
                return `three`
            case 4:
                return `four`
        }
    }
    
    lightness(){
        this.generateSequence()
        for(var i = 0; i < this.level; i++){
            const colorName = this.numberToColor(this.sequence[i])

            // this.flicker(colorName)
            setTimeout(() => this.flicker(colorName), 1000 * i)
        }

    }

    flicker(div){
        this.lightsUp(div)

        setTimeout(() => this.lightsDown(div), 350)
    }

    lightsUp(color){
        switch(color){
            case `one`:
                one.style.backgroundColor = green
                break;
            case `two`:
                two.style.backgroundColor = red
                break;
            case `three`:
                three.style.backgroundColor = blue
                break;
            case `four`:
                four.style.backgroundColor = purple
                break;
        }
        // console.log(`Lights up`)
    }

    lightsDown(color){
        switch(color){
            case `one`:
                one.style.backgroundColor = initialGreen
                break;
            case `two`:
                two.style.backgroundColor = initialRed
                break;
            case `three`:
                three.style.backgroundColor = initialBlue
                break;
            case `four`:
                four.style.backgroundColor = initialPurple
                break;
        }
        // console.log(`Lights down`)
    }

    input(){
        one.addEventListener(`click`, this.chooseColor)
        two.addEventListener(`click`, this.chooseColor)
        three.addEventListener(`click`, this.chooseColor)
        four.addEventListener(`click`, this.chooseColor)
    }

    noMoreInput(){
        one.removeEventListener(`click`, this.chooseColor)
        two.removeEventListener(`click`, this.chooseColor)
        three.removeEventListener(`click`, this.chooseColor)
        four.removeEventListener(`click`, this.chooseColor)
    }

    chooseColor(ev){
        const optionString = ev.target.dataset.number
        this.clicks(optionString)

        const optionNumber = this.stringToNumber(optionString)
        
        this.comprobation(optionNumber)
    }

    comprobation(option){

        if(option === this.sequence[this.sublevel]){
            this.sublevel++

            this.score += 2
            scorehtml.innerHTML = this.score

            if(this.score === 125){
                resultPanel.style.display = "initial"
                resultHtml.innerHTML = "You won :D"
            }else{
                if(this.sublevel === this.level){
                    this.noMoreInput()
                    this.level++
                    this.sublevel = 0
    
                    // console.log(`Next level`)
                    setTimeout(this.nextLevel, 1000)
                }
            }

            // console.log(`correct`)
        }else{
            this.lives--
            this.sublevel = 0

            console.log(`wrong`)

            this.noMoreInput()
            this.minusLive()
            this.lose()
        }
    }

    lose(){
        if(this.lives === 0){
            resultPanel.style.display = "initial"
            resultHtml.innerHTML = "You lost :("
        }else{
            hidenButton.innerHTML = "Try again"
            hidenButton.style.display = "initial"
            hidenButton.addEventListener(`click`, this.again)
        }
    }

    again(){
        hidenButton.style.display = "none"
        setTimeout(() => {
            this.lightness()
            this.input()
        }, 1000)
        hidenButton.removeEventListener(`click`, this.again)
    }

    minusLive(){
        switch(this.lives){
            case 4:
                liveFive.style.backgroundImage ="none"
                break;
            case 3:
                liveFour.style.backgroundImage ="none"
                break;
            case 2:
                liveThree.style.backgroundImage ="none"
                break;
            case 1:
                liveTwo.style.backgroundImage ="none"
                break;
            case 0:
                liveOne.style.backgroundImage ="none"
                // gameOver()
                break;
        }
    }

    clicks(divNumber){
        this.clickUp(divNumber)

        setTimeout(() => this.clickDown(divNumber), 300)
    }

    clickUp(color){
        switch(color){
            case `one`:
                one.style.backgroundColor = green
                one.style.boxShadow = "3px 3px 10px black inset"
                break;
            case `two`:
                two.style.backgroundColor = red
                two.style.boxShadow = "3px 0px 10px black inset"
                break;
            case `three`:
                three.style.backgroundColor = blue
                three.style.boxShadow = "3px -3px 10px black inset"
                break;
            case `four`:
                four.style.backgroundColor = purple
                four.style.boxShadow = "3px 0px 10px black inset"
                break;
        }
    }

    clickDown(color){
        switch(color){
            case `one`:
                one.style.backgroundColor = initialGreen
                one.style.boxShadow = "none"
                break;
            case `two`:
                two.style.backgroundColor = initialRed
                two.style.boxShadow = "none"
                break;
            case `three`:
                three.style.backgroundColor = initialBlue
                three.style.boxShadow = "none"
                break;
            case `four`:
                four.style.backgroundColor = initialPurple
                four.style.boxShadow = "none"
                break;
        }
    }

    stringToNumber(string){
        switch(string){
            case `one`:
                return 1
            case `two`:
                return 2 
            case `three`:
                return 3
            case `four`:
                return 4
        }
    }
}

function startGame(){
    var game = new Game()
}

function help(){
    hidenPanel.style.display = "initial"
}

function hideHelp(){
    hidenPanel.style.display = "none"
}

function hideResult(){
    resultPanel.style.display = "none"
    button.style.display = "initial"
    for(live of livesArray){
        live.style.backgroundImage = "url('./assets/icons/heart.svg')"
    }
    scorehtml.innerHTML = "0"
}