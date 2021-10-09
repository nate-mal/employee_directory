(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const urlApi = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US';
const gallery = document.querySelector(".gallery");
const swiperContent = document.getElementById("swiper-content");


// init Swiper:
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
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
     
     
    if(version === "short") {
        containerHTML.className = "employee-container";
        containerHTML.id = id;
       containerHTML.innerHTML =
        `
       <img src="${photo_location}" class="profile-image" />
       <div class="employee-text">
         <p class="name">${name}</p>
         <p>${email}</p>
         <p>${city}</p>
       </div>
       `;
    }
    else {
        const phone = employee.phone;
        const adress = employee.location.street.number + " " + employee.location.street.name + ", " + employee.location.state + " " + employee.location.postcode;
        const birthdate = employee.dob.date.substr(0,10);
        containerHTML.className = "swiper-slide";
        containerHTML.innerHTML =
        `
       <img src="${photo_location}" class="profile-image" />
       <div class="employee-text">
       <div class= "shortAdress">
         <p class="name">${name}</p>
         <a href="mailto:${email}">${email}</a>
         <p>${city}</p>
        </div>
         <div class="fullAdress">
            <p>${phone}</p>
            <p>${adress}</p>
            <p>Birthday: ${birthdate}</p>
            </div>
       </div>
       
       `;
    }
    return containerHTML;
    
}
function generateGalleryEmployees(employees) {

    employees.forEach((emp, index) => {
        gallery.appendChild(generateEmployeeHTML(index, emp, "short"));
        swiperContent.appendChild(generateEmployeeHTML(index, emp));
    });
    
    gallery.addEventListener("click", async(e)=>{
       
        if(e.target.closest(".employee-container")) {
        const id = e.target.closest(".employee-container").id;
        const body = document.querySelector("body");
         await swiper.slideTo(id,false,false);  
        $(".custom-model-main").addClass('model-open');     
        body.style.overflow = "hidden";
    
        }

});
   
}
$(".close-btn, .bg-overlay").on("click", function(){
    const body = document.querySelector("body");
    body.style.overflow = "";
    $(".custom-model-main").removeClass('model-open');
   
  });


// Search functionality;


document.getElementById("search").addEventListener("keyup", mySearch);


function mySearch() {
  // Declare variables
  var input, filter, gallery, imgs, a, i;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  gallery = document.getElementById("gallery");
  cards = gallery.querySelectorAll('.employee-container');
  let countCards=0;
  let singleCard
  // Loop through all gallery items, and hide those who don't match the search query
  for (i = 0; i < cards.length; i++) {
    a = cards[i].querySelector(".name").textContent;
    
    if (a.toUpperCase().indexOf(filter) > -1) {
    countCards++;
     singleCard = cards[i];
      cards[i].style.display = "";
      
    } else {
      cards[i].style.display = "none";
    }
  }
  
  
  

} 



//swiper























  
  


  










},{}]},{},[1]);
