
function httpGetRepos(){
    fetch('https://api.github.com/users/MeyerHallot/repos').then((responce)=>{
        if(responce.ok){
            responce.json().then((data)=>{
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
    return formatedData;
}

function formatTime(time){
    let formatedTime = new Date(Date.parse(time));
    let formatedTimeString = '' + (formatedTime.getMonth()+1) + '/' + formatedTime.getDate() + '/' + (formatedTime.getYear()-100); //minus 100 becuase the 2018 shows up as 2118 with out it
    return formatedTimeString;
}

function addProjects(data){
    let html = '';
    console.log(data);
    Object.keys(data).forEach((key) => {
    html += `<div class="project shadow-large" style = "height:200px">
                   <div class="projLevel0">
                        <p style="float: right"> ${data[key].updated_at} </p>
                        <p style="float: left"> ${data[key].language} </p>
                    </div>
                    <div class="projLevel1">
                        <h3><a href="https://github.com/MeyerHallot/${data[key].name}" style="color: #514E4E; text-decoration: none;">${data[key].name}</a></h3>
                        <a href="https://github.com/MeyerHallot/${data[key].name}" style="color: #514e4e;">View Project</a>
                    </div>
                    <div class="projLevel2">
						    <table style="float: left">
							    <tr>
								    <th>Stars</th>
							    </tr>
                                <tr>
    								<td>${data[key].watchers}</td>
  								</tr>
							</table>


						    <table style="float: right">
							    <tr>
								    <th>Forks</th>
									  </tr>
                                <tr>
    								<td>${data[key].forks}</td>
  								</tr>
							</table>
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

