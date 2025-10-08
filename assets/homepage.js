// HEADER SIDE MENU

function openSideMenu() {

  const sideMenu = document.getElementById('sideMenu');

  const openIcon = document.getElementById('openSideMenu');

  const closeIcon = document.getElementById('closeSideMenu');

  const pageBody = document.body;





  sideMenu.style.width = "100vw";

  openIcon.style.display = "none";

  closeIcon.style.display = "block";

  pageBody.style.overflow = "hidden";

  pageBody.style.height = "100vw";

}





function closeSideMenu() {

  const sideMenu = document.getElementById('sideMenu');

  const openIcon = document.getElementById('openSideMenu');

  const closeIcon = document.getElementById('closeSideMenu');

  const pageBody = document.body;





  sideMenu.style.width = "0";

  openIcon.style.display = "block";

  closeIcon.style.display = "none";

  pageBody.style.overflow = "";

  pageBody.style.height = "";

}





// TOGGLE MOBILE SEARCH BAR

function openSearchBar() {

  const searchBarEl = document.getElementById('mobileSearchBar');

  searchBarEl.style.height = "max-content";
  document.querySelector('.custom_header-icon.searchClose').style.display = "block";
}



function closeSearchbar() {

  const searchBarEl = document.getElementById('mobileSearchBar');

  searchBarEl.style.height = "0";
  document.querySelector('.custom_header-icon.searchClose').style.display = "none";

}





// SIDEMENU ACCORDIONS

document.querySelectorAll('.sidemenu-hasChildren').forEach(a => {

  a.addEventListener('click', () => {

    a.classList.toggle('sidemenu_accordion--active');

  });

});



// OPEN MEGA MENU MODAL

document.querySelectorAll('.custom_header-menuButton').forEach(button => {

  button.addEventListener('click', () => {

    let sibbling = button.nextElementSibling;

    

    if (button.style.backgroundColor == "") {

      button.style.backgroundColor = "#4dc8e9";

    } else {

      button.style.backgroundColor = "";

    }

    if (button.style.color == "") {

      button.style.color = "#ffffff";

    } else {

      button.style.color = "";

    }

    closeAllModals(sibbling)

    setTimeout(() => {

      $(sibbling).slideToggle()

    }, 450);

    

  });

});



document.querySelectorAll('.custom_header-menu-button-circle').forEach(button => {

  button.addEventListener('click', () => {

    let sibbling = button.nextElementSibling;

    

    if (button.style.backgroundColor == "") {

      button.style.backgroundColor = "#ef729f";

    } else {

      button.style.backgroundColor = "";

    }

    if (button.style.color == "") {

      button.style.color = "#ffffff";

    } else {

      button.style.color = "";

    }

    closeAllModals(sibbling)
    setADImages(sibbling)
    setTimeout(() => {

      $(sibbling).slideToggle()
      console.log(sibbling)

    }, 450);

    

  });

});

function setADImages(element){
 
  let ads = element.querySelectorAll(`.megamenu-ad`)

  ads.forEach(ad => {

    if(ad.querySelector(`.ad-image`).getAttribute("src") == null){
      ad.querySelector(`.ad-image`).src = ad.querySelector(`.ad-image`).dataset.src
    }
  })
  
}

function closeAllModals(sibbling){

   let modals = document.querySelectorAll('.megaMenu-modal');



   modals.forEach((modal) => {

     if(modal.style.display == "" || modal.style.display ==  "none" || sibbling == modal) return;

     $(modal).slideToggle()

     modal.previousElementSibling.style.backgroundColor = "";

     modal.previousElementSibling.style.color = "";



   })

}