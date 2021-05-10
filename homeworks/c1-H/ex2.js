const URL="https://randomuser.me/api/?inc=picture,name,gender,email,dob"

function printAttribute(elementId,result){
    const nameElement = document.getElementById(elementId); 
    nameElement.innerHTML = `${result}`;
}

async function getRandomUser(){
    const result = await fetch(URL);
    const data = await result.json();

    document.getElementById("picture").setAttribute('src',data.results[0].picture.large);

    const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
    printAttribute( "name", name);
    const gender = `${data.results[0].gender}`;
    printAttribute( "gender", gender);
    const email = `${data.results[0].email}`;
    printAttribute( "email", email);
    const age = `${data.results[0].dob.age}`;
    printAttribute( "age", age);

}

  document.getElementById('generator').addEventListener('click',getRandomUser);