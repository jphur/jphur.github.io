window.addEventListener("DOMContentLoaded", (event) => {
    const toggleNav = document.getElementsByClassName("topnav__toggle")[0];
    const prevArrow = document.getElementsByClassName(
      "codes__container__prev"
    )[0];
    const nextArrow = document.getElementsByClassName(
      "codes__container__next"
    )[0];
  
    let slideIndex = 1;
    // canvas matrix
    const canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");
  
    // Setting the width and height of the canvas
    canvas.width = window.innerWidth;
    let sizeHeight = (80 * window.innerHeight) / 100; //desktop view
    canvas.height = sizeHeight;
  
    // Setting up the letters
    let letters =
      "ABCDEFGHIJKLMNOPQRSTUVXYZ日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789Z";
    letters = letters.split("");
  
    // Setting up the columns
    const fontSize = 10;
    let columns = canvas.width / fontSize;
  
    // Setting up the drops
    let drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    // Loop the animation
    setInterval(draw, 33);
  
  
    toggleNav.addEventListener("click", showMenu, false);
  
    nextArrow.addEventListener("click", plusSlides, false);
    prevArrow.addEventListener("click", substractSlides, false);
  
    window.onload = () => {
      if (window.innerWidth <= 1000) {
        responsiveSwiper();
        responsiveMatrix(50);
      }
      if (window.innerWidth <= 685) {
        responsiveMatrix(75);
      }
      if (window.innerWidth <= 450) {
        responsiveMatrix(78); //Me he dado cuenta que en el navegador de mi móvil pierde un 3% de altura no tengo claro porque
      }
    };
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth < 685) {
          responsiveMatrix(75);
        } else if (window.innerWidth < 1000) {
          responsiveMatrix(50);
        } else {
          responsiveMatrix(80);
        }
        responsiveSwiper();
      },
      false
    );
    /**
     * Indica la posición del próximo slider (entre 0 y 2)
     */
    function plusSlides() {
      showSlides((slideIndex += 1));
    }
    /**
     * indica la posición del próximo slider (entre 0 y 2)
     */
    function substractSlides() {
      showSlides((slideIndex += -1));
    }
    /**
     * Mira la posición actual y muestra el siguiente slide al actual y oculta el resto
     * @param {Int} position
     */
    function showSlides(position) {
      let x = document.getElementsByClassName("codes__container__box");
      if (position > x.length) {
        slideIndex = 1;
      }
      if (position < 1) {
        slideIndex = x.length;
      }
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[slideIndex - 1].style.display = "block";
    }
    /**
     * Muestra todos los slides
     */
    function showAllSlides() {
      let x = document.getElementsByClassName("codes__container__box");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
      }
    }
    /**
     *Muestra el menú o lo oculta al hacer click sobre el icono
     */
    function showMenu() {
      let links = document.getElementsByClassName("topnav__container")[0];
      if (links.style.display === "block") {
        links.style.display = "none";
      } else {
        links.style.display = "block";
      }
      responsiveMatrix(75);
    }
    /**
     * Pinta el lienzo y pinta la lluvia de letras
     */
    function draw() {
      ctx.fillStyle = "rgba(9, 107, 114, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "#0f0";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
  
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }
    /**
     * Cambiamos la altura y el ancho del lienzo y el ancho de las columnas
     * @param {Int} height
     */
    function responsiveMatrix(height) {
      if (height == 75)
        sizeHeight = (height * window.innerHeight) / 100 - toggleNav.offsetHeight;
      else sizeHeight = (height * window.innerHeight) / 100;
      canvas.width = window.innerWidth;
      canvas.height = sizeHeight;
      columns = canvas.width / fontSize;
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    }
    /**
     * trigger del swipper
     */
    function responsiveSwiper() {
      if (window.innerWidth > 1000) showAllSlides();
      else showSlides(1, 0);
    }
  /**
   * Añade a las entradas que se ven en pantalla la clase is-inViewport
   * @param {Object} entries 
   * @param {Object} observer 
   */
    const inViewport = (entries, observer) => {
      entries.forEach(entry => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
      });
    };
    
    const Obs = new IntersectionObserver(inViewport);
    const obsOptions = {};
    
    // Attach observer to every [data-inviewport] element:
    const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
    ELs_inViewport.forEach(EL => {
      Obs.observe(EL, obsOptions);
    });
  
  });