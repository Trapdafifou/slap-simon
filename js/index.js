var elem = document.querySelector( 'div' ),
    mx = 0,
    my = 0,
    mxOffset = 0,
    myOffset = 0,
    ex = 0,
    ey = 0,
    ew = elem.offsetWidth,
    eh = elem.offsetHeight,
    vx = 0,
    vy = 0,
    ww = window.innerWidth,
    wh = window.innerHeight,
    score = 0,
    tracking = false,
    raf = null,
    prefixes = [ '-o-', '-ms-', '-moz-', '-webkit-', ''],
    weapon = function(){
        this.type = ["batte", "pelle", "sextoy"];
        this.weapSelect = function(){
            for(i=0; i<this.type.length;i++){

            }
        };
        this.force = 1; // multiplicateur de vx et vy
        this.damage = function (){
           switch (this.type !== 0) {

               case (this.type [0]):
                   this.damage = 5;
                   weapon.force = 1.2;
                   break;

               case (this.type [1]):
                   this.damage = 15;
                   weapon.force = 2;
                   break;

               case (this.type [2]):
                   this.damage = 50;
                   weapon.force = 5;
                   break;
           }
        }; //diminue les pv de simon
        this.img= ""; //modifie le css du pointer avec les armes

    };

console.log(window.innerWidth);

function prefixCss( elem, prop, val ) {
	  var length = prefixes.length,
		  i = 0;
	  for( ; i < length; i++ ) {
		    elem.style[ prefixes[ i ] + prop ] = val;
	  }
}


function setElemCoords( x, y ) {
  prefixCss( elem, 'transform', 'translate3d( ' + x + 'px, ' + y + 'px, 0)'  );
  elem.setAttribute( 'data-x', x );
  elem.setAttribute( 'data-y', y );
  ex = x;
  ey = y;
}

var score = function () {
    this.begin = 0;
    this.save = function () {
        if(!localStorage){
            console.log('erreur');
        } else {
            localStorage.setItem('score', this.getScore);
        }
    };

};



function checkBounds() {

    var Score = new score();
    // Score.save();

  //rebonds sur droite et limite
  if( ex + ew > ww ) {
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.5;
      vy *= 0.5;
    }
    //Coord en rapport au calcule de la width de l'elem
    ex = ww - ew;
      Score.begin++;
      console.log(Score.begin)
  }


  // limite gauche du screen.
  if( ex < 0 ) {
    if( tracking ) {
      vx = 0;
    } else {
      vx = -vx * 0.7;
      vy *= 0.99;
    }
    ex = 0;
      Score.begin++;
      console.log(Score.begin)
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
       Score.begin++;
       console.log(Score.begin)
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
      Score.begin++;
      console.log(Score.begin)
  }
}

function mousedowncb() {
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

    if (weapon.type == "batte"){
        Vitesse.vy += 0.923534;
        Vitesse.vx *= 0.9234243242;
        Vitesse.vy *= 0.9234243242;
        return Vitesse;
    } else if(weapon.type =="pelle"){
        Vitesse.vy += 0.9432432465;
        Vitesse.vx *= 0.9323242323;
        Vitesse.vy *= 0.9657756546;
        return Vitesse;
    } else if (weapon.type == "sextoys"){
        Vitesse.vy += 0.999999998;
        Vitesse.vx *= 0.9843574534;
        Vitesse.vy *= 0.9234243242;
        return Vitesse;

    }
}





function loop() {
  raf = requestAnimationFrame( loop );
  if( tracking ) {
    vx = ( mx - mxOffset - ex ) / 2;
    vy = ( my - myOffset - ey ) / 2;
  }

    var Vitesse = vitesse(score);

  vy += 1;
  vx *= 0.80000000;
  vy *= 0.80000343;
  ex += vx;
  ey += vy;
    // if (weapon.type == "batte"){
    //     vx *= 0.95;
    //     vy *= 0.99;
    // }

  checkBounds();
  
  setElemCoords( ex, ey );
}

function WeaponChoose(){
    var choose = document.querySelector('li');
    // choose.selected = true;

        weapon.type = weapon.damage;
        vy *= -2;
        vx *= -2;
    console.log('toto')



}

// Les event
elem.addEventListener( 'mousedown', mousedowncb, false );
window.addEventListener( 'mouseup', mouseupcb, false );
window.addEventListener( 'mousemove', mousemovecb, false );
window.addEventListener( 'resize', resizecb, false );
WeaponChoose();

// Propriété initiale de la div
setElemCoords( ex, ey );
loop();

