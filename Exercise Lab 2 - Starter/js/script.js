(function() {
    "use strict";

    function Pagination() {
      
      const prev = document.getElementById('button_prev');
      const next = document.getElementById('button_next');
      const clickPageNumber = document.querySelectorAll('.clickPageNumber');
      
      let currentPage = 1;
      let perPage = 10;
      
      this.init = function() {
          changePage(1);
          pageNumbers();
          selectedPage();
          clickPage();
          addEventListeners();
     }
      
      let addEventListeners = function() {
          prev.addEventListener('click', prevPage);
          next.addEventListener('click', nextPage);   
      }
            
      let selectedPage = function() {
          let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
          for (let i = 0; i < page_number.length; i++) {
              if (i == currentPage - 1) {
                  page_number[i].style.opacity = "1.0";
              } 
              else {
                  page_number[i].style.opacity = "0.5";
              }
          }   
      }  

      const id = document.getElementById('header');
      id.innerHTML="";
      id.innerHTML+="   <h2>Contacts</h2> <h3>Total:"+ users.length+"</h3>";
      
      let checkButtonOpacity = function() {
        currentPage == 1 ? prev.classList.add('opacity') : prev.classList.remove('opacity');
        currentPage == numPages() ? next.classList.add('opacity') : next.classList.remove('opacity');
      }

      let changePage = function(page) {
          const list = document.getElementById('contacts');

          if (page < 1) {
              page = 1;
          } 
          if (page > (numPages() -1)) {
              page = numPages();
          }
       
          list.innerHTML = "";
          for(var i = (page -1) * perPage; i < (page * perPage) && i < users.length; i++) {
              list.innerHTML += "  <li class=\"contact-item cf\"><div class=\"contact-details\"><img class=\"avatar\" src="+users[i].image+"><h3>"+users[i].name+"</h3><span class=\"email\">"+users[i].email+"</span></div> <div class=\"joined-details\"> <span class=\"date\">"+users[i].joined+"</span> </div> </li>";
          }
          checkButtonOpacity();
          selectedPage();
      }



      let prevPage = function() {
          if(currentPage > 1) {
              currentPage--;
              changePage(currentPage);
          }
      }

      let nextPage = function() {
          if(currentPage < numPages()) {
              currentPage++;
              changePage(currentPage);
          } 
      }

      let clickPage = function() {
          document.addEventListener('click', function(e) {
              if(e.target.nodeName == "SPAN" && e.target.classList.contains(clickPageNumber)) {
                  currentPage = e.target.textContent;
                  changePage(currentPage);
              }
          });
      }

      let pageNumbers = function() {
          let pageNumber = document.getElementById('page_number');
              pageNumber.innerHTML = "";

          for(let i = 1; i < numPages() + 1; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
      }

      let numPages = function() {
          return Math.ceil(users.length / perPage);  
      }
   }
  let pagination = new Pagination();
  pagination.init();
})();


