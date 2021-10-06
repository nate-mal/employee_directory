



















// $(".Click-here").on('click', function() {
//     $(".custom-model-main").addClass('model-open');
//   }); 
  $(".close-btn, .bg-overlay").click(function(){
    $(".custom-model-main").removeClass('model-open');
  });
  


  const gallery = document.querySelector(".gallery");

  const popupContent = document.getElementById("popup-content");








gallery.addEventListener("click", (e)=>{
     
           if(e.target.closest(".employee-container")) {
           popupContent.innerHTML = e.target.closest(".employee-container").innerHTML;
           $(".custom-model-main").addClass('model-open');
           }

});
 