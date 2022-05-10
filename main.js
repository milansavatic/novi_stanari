window.addEventListener('beforeunload',save);

let entryPeople=document.querySelector('#entry-people');
let addPeopleView=document.querySelector('#add-people-view');
// dodavanje placeholdeera
let idInput=document.querySelector('[placeholder="id"]');
let imeInput=document.querySelector('[placeholder="ime"]');
let prezimeInput=document.querySelector('[placeholder="prezime"]');
let emailInput=document.querySelector('[placeholder="email"]');
let godineInput=document.querySelector('[placeholder="godine"]');
let saveBtn=document.querySelector('#save');

saveBtn.addEventListener('click', savePeople);
//ovom funkcijom omogucujem ispis podataka o novom stanaru

function savePeople(){
 
    const newPeople={
    
        id:idInput.value,
        ime:imeInput.value,
        prezime:prezimeInput.value,
        email:emailInput.value,
        godine:godineInput.value
    }

    
    //ispusujem podatke
    db.push(newPeople);
  
    //posle push metode da mi se izbrisu unete vrednosti
    idInput.value=""
    imeInput.value="";
    prezimeInput.value="";
    emailInput.value="";
    godineInput.value="";
    //pozivam funkciju createentryPeolpe da bi imao nov ispis
    createentryPeople();
  
}




createentryPeople();
//funkcija koja kreira view
function createentryPeople(){
    let htmlPeople="";
    for(let i=0; i<db.length; i++){
        const people=db[i];
        htmlPeople+=`
        <tr>
        <td>${people.id}</td>
        <td>${people.ime}</td>
        <td>${people.prezime}</td>
        <td>${people.email}</td>
        <td>${people.godine}</td>
        <td><button data-id="${i}" class="delete-btn btn btn-sm btn-danger form-control">Delete</button></td>

        </tr>


        `
    }
    entryPeople.innerHTML=htmlPeople;

    //for petlje za svako delete dugme
    let allDeleteBtns=document.querySelectorAll('.delete-btn');
    for(let i=0;i<allDeleteBtns.length; i++){
        //dodajem klik
        allDeleteBtns[i].addEventListener('click',deletePeople);

    }

}
function deletePeople(){
    let id=this.getAttribute('data-id');
    db.splice(id,1);
    createentryPeople();

}
function save(){
    localStorage.db=JSON.stringify(db);
}