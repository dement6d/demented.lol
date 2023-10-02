const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

canvas.width = Math.max(window.screen.width, window.innerWidth);
canvas.height = Math.max(window.screen.height, window.innerHeight);

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

const characters = katakana + alphabet + numbers;

const fontSize = 16;
var columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(5, 5, 5, 0.1)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#FF0000';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = characters.charAt(Math.floor(Math.random() * characters.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};

setInterval(draw, 33);