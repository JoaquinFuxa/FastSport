var Slider = document.querySelector(".slider");
var IconoDerecho = document.querySelector(".icono-derecho");
var IconoIzuierdo = document.querySelector(".icono-izquierdo");
var Imagenes = document.querySelectorAll(".img-slider").length;
Contador = 0;

function MoverSlider()
  {
    if(Contador > Imagenes - 1)
        {
          Contador = 0;
        } else if(Contador < 0)
                   {
                    Contador =  Imagenes - 1;
                   }
    Slider.style.transition = "all 1s ease"
    Slider.style.marginLeft = `-${100 * Contador}%`;
  }

function MoverDerecha()
  {
     Contador++;
     MoverSlider();
  }
  setInterval(MoverDerecha, 3000);
IconoDerecho.addEventListener("click", MoverDerecha);

function MoverIzquierda()
  {
    Contador--;
    MoverSlider();
  }
IconoIzuierdo.addEventListener("click", MoverIzquierda)