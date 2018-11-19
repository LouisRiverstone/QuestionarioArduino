const five = require('johnny-five')
const questoes = require('./questoes.json')
const pinos = require('./pinos.json')
const board = new five.Board()

let btns
let ledGreen
let ledRed
let numeroPergunta = 0

board.on("ready", () => {
	ledGreen = pinos.ledVerde
	ledRed = pinos.ledVermelho
	btns = pinos.botoes.map(pino => new five.Button(pino))

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