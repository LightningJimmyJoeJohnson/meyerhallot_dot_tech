let cats = Array.prototype.slice.call(document.getElementsByClassName('catagory'));
let indexOf=0;
let text;
let keys;
let interval;
getText(); 
loading();

cats.forEach((element) =>{
	element.addEventListener('click', () => {
		console.log(element.id + ' clicked');
		indexOf = keys.findIndex((elmClicked) => {
            return elmClicked === element.id.toString();
        });
        console.log(indexOf);
        fillTextBox(indexOf);
	})
});

window.addEventListener("keydown", (e) => {
    switch(e.keyCode){
        case 38:
            indexOf == 0 ? indexOf = 0 :indexOf--;
            fillTextBox(indexOf);
            break;
        case 40:
            indexOf == keys.length-1 ? indexOf = keys.length-1 : indexOf++;
            fillTextBox(indexOf);
            break;
    }
}, false);


console.log(cats);

function loading() {
    let i = 1;
    interval = setInterval(() => {
        document.getElementById('textBox').innerHTML = 'Loading' + '.'.repeat(i);
        i<3?i++:i=1;
    },500);
}

function getText(){
	fetch('https://api.myjson.com/bins/10pxvb').then((responce)=>{ //temp url replace with real one later
		if(responce.ok){
			responce.json().then((data)=>{
				console.log(data);
                text = data;
                keys = Object.keys(data);
                fillTextBox(0);
			});
		}else{
			console.log('Error Unable to get json text');
		}
	}); 
}

function fillTextBox(index){
    clearInterval(interval);
    document.getElementById('textBox').innerHTML = text[keys[index]];
}
