const five = require("johnny-five")
const board = new five.Board({ port: "COM3" });

let btns
let ledGreen
let ledRed
let numeroPergunta = 0


const questoes = [
    {
        pergunta: "2 + 2",
        respostas: {
            A: {
                descricao: "4",
                certa: true
            },
            B: {
                descricao: "2",
                certa: false
            }
        }
    },
    {
        pergunta: "qual animal que come com o rabo",
        respostas: {
            A: {
                descricao: "elefante",
                certa: false
            },
            B: {
                descricao: "sua mae",
                certa: true
            }
        }
    },
    {
        pergunta: "3+3",
        respostas: {
            A: {
                descricao: "6",
                certa: true
            },
            B: {
                descricao: "2",
                certa: true
            }
        }
    }
]

board.on("ready", () => {

    btns = {
        A: new five.Button(8),
        B: new five.Button(9)
    }

    ledGreen = new five.Led(11)
    ledRed = new five.Led(12)

    escrevePergunta()
    for (const key in btns) {
        btns[key].on("down", () => {
            verificaQuestao(key)
        })
        btns[key].on("up", apagaLed)
    }
})

function verificaQuestao(tecla) {
    if (questoes[numeroPergunta]) {
        if (questoes[numeroPergunta].respostas[tecla].certa) {
            ledGreen.on()
        } else {
            ledRed.on()
        }
        numeroPergunta++;
        escrevePergunta()

    }
}

function apagaLed() {
    ledRed.off()
    ledGreen.off()
}

function escrevePergunta() {
    process.stdout.write('\033c');
    if (questoes[numeroPergunta]) {
        console.log(questoes[numeroPergunta].pergunta)
        for (const key in questoes[numeroPergunta].respostas) {
            console.log(`${key}: ${questoes[numeroPergunta].respostas[key].descricao}`)
        }
    } else {
        console.log("Fim da Perguntas")
    }
}