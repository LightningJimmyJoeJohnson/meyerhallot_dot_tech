//import text from './text.json

let cats = Array.prototype.slice.call(document.getElementsByClassName('catagory'));
let indexOf=0;
let interval;
//getText();
loading();
fillTextBox(0);

function initMouse(){
    cats.forEach((element,i) =>{
	    element.addEventListener('click', () => {
		    console.log(element.id + ' clicked');
            console.log(i);
            fillTextBox(i);
            indexOf=i;
	    })
    });
}

window.addEventListener("keydown", (e) => {
    switch(e.keyCode){
        case 37:
            indexOf == 0 ? indexOf = 0 :indexOf--;
            fillTextBox(indexOf);
            break;
        case 39:
            indexOf == 2 ? indexOf = 2 : indexOf++;
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
	fetch('https://api.myjson.com/bins/ki8gj').then((responce)=>{ //temp url replace with real one later
		if(responce.ok){
			responce.json().then((data)=>{
				console.log(data);
                //text = data;
                //fillTextBox(0);
                initMouse();
			});
		}else{
			console.log('Error Unable to get json text');
		}
	}); 
}

function fillTextBox(index){
    document.getElementById('textBox').innerHTML = "";
    cats.forEach((item,index) => { //clear the colors on tab names
        item.style.backgroundColor= 'FFFFFF';
        item.style.color= '887e79';
    });
    switch(index){
        case 0:
            cats[1].style.color = '';
            cats[0].style.color = '0F1011';
            document.getElementById('gitProjects').innerHTML = "";
            clearInterval(interval);
            document.getElementById('textBox').innerHTML = formatExper(text.experience);
            break;
        case 1:
            cats[0].style.color = '';
            cats[1].style.color = '0F1011';
            httpGetRepos();
            break;
    }
}

function formatExper(exper){
    let html = '';
    exper.forEach((item)=> {
        html += `<div class = "exp">`;
        console.log(item);
        html += `<p class ="expName">${item.title} @ ${item.orgName}</p> <p class ="expPeriod">${item.period}</p>`;
        html += ``;
        html += `<p class ="expDesc">${item.description}</p>`;
        html += `</div>`;
    });
    return html;
}
