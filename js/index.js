//On prends la div (Simon)
var elem = document.querySelector( 'div' ),
// Masse par rapport a X et Y
    mx = 0,
    my = 0,
    mxOffset = 0,
    myOffset = 0,
// Position var Elem
// e = Elem
    ex = 0,
    ey = 0,
// Taille Elem  Width/Height
    ew = elem.offsetWidth,
    eh = elem.offsetHeight,
// Vélocité sur coordonnées X et Y
    vx = 0,
    vy = 0,
// Taille de la fenêtre du navigateur  Width/Heigh
// Modifiable par la suite sur une div
    ww = window.innerWidth,
    wh = window.innerHeight,
// Quand la souris drag l'Elem
    tracking = false,
// Rafraichis la fenêtre avec la function loop()
    raf = null,

// Compatibilité navigateurs
    prefixes = [ '-o-', '-ms-', '-moz-', '-webkit-', ''];
function prefixCss( elem, prop, val ) {
	  var length = prefixes.length,
		  i = 0;
	  for( ; i < length; i++ ) {
		    elem.style[ prefixes[ i ] + prop ] = val;
	  }
}

console.log(window.innerWidth);

//Permet le mouvement;
function setElemCoords( x, y ) {
  prefixCss( elem, 'transform', 'translate3d( ' + x + 'px, ' + y + 'px, 0)'  );
  elem.setAttribute( 'data-x', x );
  elem.setAttribute( 'data-y', y );
  ex = x;
  ey = y;
}



function checkBounds() {

  //Limite droite de la window
  if( ex + ew > ww ) {
    if( tracking ) {
      vx = 0;
    } else {
      //  reviens vers la gauche + VITESSE DE L'ELEM
      vx = -vx * 0.99;
      vy *= 0.99;
    }
    //Coord en rapport au calcule de la width de l'elem
    ex = ww - ew;
  }


  // limite gauche du screen.
  if( ex < 0 ) {
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.99;
      vy *= 0.99;
    }
    ex = 0;
  }



  // Limite Bottom
   if( ey + eh > wh ) {
    if( tracking ) {
      vy = 0;
    } else {
      vx *= 0.99;
      vy = -vy * 0.7;
    }
    ey = wh - eh;
  }

  //  Limite Top
  if( ey < 0 ) {
    if( tracking ) {
      vy = 0;
    } else {
      vx *= 0.99;
      vy = -vy * 0.7;
    }
    ey = 0;
  }
}

function mousedowncb() {
  //  L'elem Suit la souris.
  tracking = true;
  setElemCoords( ex, ey );
  mxOffset = mx - ex;
  myOffset = my - ey;
}

function mouseupcb() {
  tracking = false;
}

function mousemovecb( e ) {
  mx = e.clientX;
  my = e.clientY;
}

function resizecb() {
  ww = window.innerWidth;
  wh = window.innerHeight;
}


function vitesse (arme) {
    var Vitesse = {
        vy: 0.95,
        vx: 0.89,
        // vy:0.99
    };


}


function loop() {
  raf = requestAnimationFrame( loop );
  if( tracking ) {
    vx = ( mx - mxOffset - ex ) /2;
    vy = ( my - myOffset - ey ) /2 ;
  }

    var Vitesse = vitesse();

  //  Vitesse de base X/Y
  vy += 0.90;
  vx *= 0.99;
  vy *= 0.99;
  //  vx et vy définissent la nouvelle position x/y de l'Elem
  ex += vx;
  ey += vy;

  //  Appel la fonction des limites et rebonds
  checkBounds();
  
  setElemCoords( ex, ey );

}

// Les event
elem.addEventListener( 'mousedown', mousedowncb, false );
window.addEventListener( 'mouseup', mouseupcb, false );
window.addEventListener( 'mousemove', mousemovecb, false );
window.addEventListener( 'resize', resizecb, false );


// Propriété initiale de la div
setElemCoords( ex, ey );
loop();

