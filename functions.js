let allTeams = [];

function getHtmlTeams(teams) {
     return teams.map(team => {
       return `<tr>
          <td>${team.members}</td>
          <td>${team.name}</td>
         <td>${team.url}</td>
         <td> 
          <a href="#" class="remove-btn" data-id="${team.id}">&#10006;</a> 
          <a href="#" class="edit-btn">&#9998</a>
         </td>
       </tr>`
      }).join("")
}

function showTeams(teams) {
    const html = getHtmlTeams(teams);
    
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = html;
}

fetch("http://localhost:3000/teams-json")
.then( response =>  response.json())
.then(teams => {
  allTeams = teams;
  showTeams(teams);
  });

function addTeam(team){
 fetch("http://localhost:3000/teams-json/create",{
    method: "POST",
    body: JSON.stringify(team),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then( response =>  response.json())
    .then(status => {
      console.warn("status", status)
    });
}

function removeTeam(id){
  fetch("http://localhost:3000/teams-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: id })
});
}



function saveTeam(){
  const members=document.querySelector("input[name=members]").value;
  const name=document.querySelector("input[name=name]").value;
  const url=document.querySelector("input[name=url]").value;

  const team = {
    name:name,
    members:members,
    url:url
  };
  
  addTeam(team);
}

document.querySelector("table tbody").addEventListener("click", e => {
  if(e.target.matches("a.remove-btn")){
    const id=e.target.getAttribute("data-id");
    removeTeam(id);
  }
})

 



