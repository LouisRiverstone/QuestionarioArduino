const five = require('johnny-five')
const questoes = require('./questoes.json')
const pinos = require('./pinos.json')
const board = new five.Board()
const btns = {}
let ledGreen
let ledRed
let numeroPergunta = 0

board.on("ready", () => {
	ledGreen = new five.Led(pinos.ledVerde)
	ledRed = new five.Led(pinos.ledVermelho)

	for (const key in pinos.botoes) {
		btns[key] = new five.Button(pinos.botoes[key])
	}

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
		if (questoes[numeroPergunta].resposta == tecla) {
			ledGreen.on()
		}
		else {
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
	console.clear();
	if (questoes[numeroPergunta]) {
		console.log(questoes[numeroPergunta].pergunta)
		for (const key in questoes[numeroPergunta].opcoes) {
			console.log(`${key}: ${questoes[numeroPergunta].opcoes[key]}`)
		}
	}
	else {
		console.log("Fim da Perguntas")
	}
}