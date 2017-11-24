
function httpGetRepos(){
    fetch('https://api.github.com/users/LightningJimmyJoeJohnson/repos').then((responce)=>{
        if(responce.ok){
            responce.json().then((data)=>{
                console.log(data);
                addProjects(formatData(data));
            }); 
        } 
    });
}

function formatData(data){
    let formatedData = [];
    Object.keys(data).forEach((key) => {
        let name = data[key].name;
        let updated_at = formatTime(data[key].updated_at);
        let language;
        !(data[key].language) ? language = 'No language' : language = data[key].language;
        let watchers = data[key].watchers;
        let forks = data[key].forks;
        formatedData.push({name, updated_at, language, watchers, forks});
    });
    formatedData.sort((a,b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    });
    console.log(formatedData);
    return formatedData;
}

function formatTime(time){
    let formatedTime = new Date(Date.parse(time));
    let formatedTimeString = '' + (formatedTime.getMonth()+1) + '/' + formatedTime.getDate() + '/' + formatedTime.getYear();
    return formatedTimeString;
}

function addProjects(data){
    let html = '';
    console.log(data);
    Object.keys(data).forEach((key) => {
        console.log(data[key].name);
    html += `<div class="project shadow-large" style = "height:200px">
                    <div class="project-info">
                        <div>
                            <p> ${data[key].updated_at} </p>
                            <p> ${data[key].language} </p>
                        </div>
                        <h3><a href="https://github.com/LightningJimmyJoeJohnson/${data[key].name}" style="color: #374054;">${data[key].name}</a></h3>
                         <div>
						    <table style="float: left">
							    <tr>
								    <th>Stars</th>
							    </tr>
                                <tr>
    								<td>${data[key].watchers}</td>
  								</tr>
							</table>

                        <a href="https://github.com/LightningJimmyJoeJohnson/${data[key].name}">View Project</a>

						    <table style="float: right">
							    <tr>
								    <th>Forks</th>
									  </tr>
                                <tr>
    								<td>${data[key].forks}</td>
  								</tr>
							</table>
                        </div>
                    </div>
                    <!-- End .project-info -->
             </div>
            <!-- End .project -->
            `
    });
    drawProjects(html);
}


function drawProjects(html){
   document.getElementById('gitProjects').innerHTML = html; 
}

