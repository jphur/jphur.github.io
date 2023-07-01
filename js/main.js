window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const header = document.querySelector('header');
  const swiper = new Swiper("#swiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      360: {
        slidesPerView: 1,
        spaceBetween: 60
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });

  window.onload = () => {
    if (window.innerWidth <= 1000) {
      responsiveMatrix(50);
    }
    if (window.innerWidth <= 685) {
      responsiveMatrix(75);
    }
    if (window.innerWidth <= 450) {
      responsiveMatrix(78);
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
    },
    false
  );

  /**
 * Añade a las entradas que se ven en pantalla la clase is-inViewport
 * @param {Object} entries 
 * @param {Object} observer 
 */
  const inViewport = (entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
  };

  /**
   * Pinta el lienzo y pinta la lluvia de letras
   */
  const draw = () => {
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
  const responsiveMatrix = (height) => {
    if (height == 75)
      sizeHeight = header.offsetHeight;
    else sizeHeight = header.offsetHeight;
    canvas.width = header.offsetWidth;
    canvas.height = sizeHeight;
    columns = canvas.width / fontSize;
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
  }

  const observer = new IntersectionObserver(inViewport);
  const els_inViewport = document.querySelectorAll('[data-inviewport]');
  els_inViewport.forEach(el => observer.observe(el, {}));

  canvas.width = header.offsetWidth;
  let sizeHeight = header.offsetHeight;
  canvas.height = sizeHeight;

  // Setting up the letters
  let letters = "ABCDEFGHIJKLMNOPQRSTUVXYZ日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789Z";
  letters = letters.split("");

  // Setting up the columns
  const fontSize = 10;
  let columns = canvas.width / fontSize;

  // Setting up the drops
  let drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  setInterval(draw, 33);
});