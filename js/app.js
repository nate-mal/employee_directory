
const urlApi = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const gallery = document.querySelector(".gallery");
const popupContent = document.getElementById("popup-content");

const employees = getEmployees()
                     .then(res=>{console.log(res);
                    return res;
                    })
                    .then(generateGalleryEmployees);


async function getEmployees() {
    try {
    let data =  await fetch(urlApi).then(res => res.json()).then(res => res.results)
    
    return data;              
    } catch(e) {
        console.log("Something went wrong " + e)
    }
}

function generateEmployeeHTML(id, employee,  version="long") {
    
     const name = employee.name.first + " " + employee.name.last;
     const email = employee.email;
     const city = employee.location.city;
     const photo_location = employee.picture.large;
     let containerHTML = document.createElement("div");
     containerHTML.className = "employee-container";
     
    if(version === "short") {
        containerHTML.id = id;
       containerHTML.innerHTML =
        `
       <img src="${photo_location}" class="profile-image" />
       <div class="employee-text">
         <p>${name}</p>
         <a href="#">${email}</a>
         <p>${city}</p>
       </div>
       `;
    }
    else {
        const phone = employee.phone;
        const adress = employee.location.street.number + " " + employee.location.street.name + ", " + employee.location.state + " " + employee.location.postcode;
        const birthdate = employee.dob.date.substr(0,10);
        containerHTML.innerHTML =
        `
       <img src="${photo_location}" class="profile-image" />
       <div class="employee-text">
       <div class= "shortAdress">
         <p>${name}</p>
         <a href="#">${email}</a>
         <p>${city}</p>
        </div>
         <div class="fullAdress">
            <p>${phone}</p>
            <p>${adress}</p>
            <p>Birthdate: ${birthdate}</p>
            </div>
       </div>
       
       `;
    }
    return containerHTML;
    
}
function generateGalleryEmployees(employees) {

    employees.forEach((emp, index) => {
        gallery.appendChild(generateEmployeeHTML(index, emp, "short"));
    });
    gallery.addEventListener("click", (e)=>{
       
        if(e.target.closest(".employee-container")) {
        const id = e.target.closest(".employee-container").id;
        popupContent.innerHTML = generateEmployeeHTML(id, employees[id]).innerHTML;
        $(".custom-model-main").addClass('model-open');
    
        }

});
}























  $(".close-btn, .bg-overlay").click(function(){
    $(".custom-model-main").removeClass('model-open');
  });
  


  









