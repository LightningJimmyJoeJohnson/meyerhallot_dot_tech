let cats = Array.prototype.slice.call(document.getElementsByClassName('catagory'));
let ab = document.getElementById('about');

cats.forEach((element) =>{
	element.addEventListener('click', () => {
		console.log(element.id + ' clicked');
	})
});


console.log(cats);


let text = getText(); 

function getText(){
	console.log('Shit');
	fetch('https://api.myjson.com/bins/nsqyf').then((responce)=>{ //temp url replace with real one later
		if(responce.ok){
			responce.json().then((data)=>{
				console.log(data);
			});
		}else{
			console.log('Shit');
		}
	}); 
}


