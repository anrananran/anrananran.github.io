// Remember. There is no spoon.
$(document).ready(function() {

  // What if I told you that everything you see here was just an illusion?
  // What looks like a stream of characters is actually just one character, being painted on top of a screen full of previously painted characters. 
  // All we need to store is the Y co-ordinate of that character (and when we want it to restart from the top again)

  // Initialise some names up front for later use:
  var gContext, gWidth, gHeight, // Our Canvas
    gFade, gFont, gFontHeight, // Fade speed and font size
    gStreams, // the number of streams of letters to draw
    gY, gYTerm, gFillColor, // Arrays and color for our main stream of letters
    gYSlow, gYTermSlow, gSlowCycle, gCurrentSlowCycle, gSlowFillColor, // Arrays, color and render speed of our slow stream of letters
    gTerminateHeight, gTerminateAddHeight; // When we kill the streams

  // Set the height of the font. 
  // Let's use Google's Open Sans font (loaded via CSS) to make sure it looks the same, everywhere 
  gFontHeight = 9;
  gFont = gFontHeight + 'px "Open Sans"';

  // During each render, we blat the screen with this, to make everything we've already drawn fade a little. The higher the Alpha, the quicker everything will fade.
  gFade = 'rgba(0,0,0, 0.02)';

  // There are two streams of letters - the normal stream and a slow stream. We're using slightly different colors for each.
  // I prefer the whole blue thing, but I hear that green's pretty popular.
  gFillColor = '#0871b6'; // #289628 - if green's your thing
  gSlowFillColor = '#2891d6'; // #48B648

  // Our slow stream only gets redrawn after a few render cycles. This is where we set up how often it happens. 
  gSlowCycle = 2;
  gCurrentSlowCycle = gSlowCycle;

  // Our Canvas - in glorious 2d. We'll be needing that, for later.
  gContext = q.getContext('2d');

  // Let's plan to survive a window resize 
  rainWindowResize = function() {
    // by building everything we need from scratch inside a resize function.
    // Grab the current window's dimensions
    gWidth = window.innerWidth;
    gHeight = window.innerHeight;

    // Stretch the canvas HTML element to make sure that it covers the entire window.
    $('#q').attr({
      'width': gWidth + 'px',
      'height': gHeight + 'px'
    });

    // Paint the canvas black. All black.  It's like, how much more black could this be? and the answer is none.
    gContext.fillStyle = 'rgba(0,0,0,1)';
    gContext.fillRect(0, 0, gWidth, gHeight);

    // Work out the number of streams we'd need to fill the screen
    // We only have a font height, so I'm basically guessing that, give or take, our character width will be roughly the same. Adjust, if it's not.
    gStreams = Math.ceil(gWidth / (gFontHeight));

    // Storage for all the stuff happening on the screen
    gY = []; // This is where we're going to store our current Y co-ordinate for the main streams
    gYTerm = []; // And this is where we hold when it's going to stop

    gYSlow = []; // This is where we're going to store our current Y co-ordinate for the slow stream
    gYTermSlow = []; // And where it goes bye bye.

    gTerminateHeight = gHeight * 0.3; // Basically - any point after here, and our stream is living on borrowed time
    gTerminateAddHeight = gHeight; //  - Up to this much borrowed time, to be precise.

    // Valar Morghulis - every Stream must die. We use these to hold the calculated result of when that is.
    var goBoom, goBoomSlow;

    // Time to initialise all the streams
    for (var index = 0; index < gStreams; index++) {
      // For our initial deluge, position it off screen, with a little variation between it's starting height
      gY[index] = 0 - Math.ceil((Math.random() * 150)); // Note the use of Math.ceil, as integer positions draw faster

      // Work out it's lifespan
      // The keen eye'd among you may have noticed that the max lifespan of a stream is 0.3 + 1 * the height of the screen.
      // That's because I want to weight them to reach the bottom, more often than not.
      goBoom = gTerminateHeight + (Math.random() * gTerminateAddHeight);
      // That said - it's pointless drawing it once it's off the bottom of the canvas.
      gYTerm[index] = Math.min(goBoom, gHeight);

      // And now do the same thing again, except in slow motion.
      goBoomSlow = gTerminateHeight + (Math.random() * gTerminateAddHeight);
      gYTermSlow[index] = Math.min(goBoomSlow, gHeight);

      // Note that we're positioning the slower stuff further off screen. 
      // That's to give our initial flood a little more time to hit bottom before they start appearing.
      gYSlow[index] = 0 - Math.ceil((Math.random() * 450));
    }

    // And that's everything we need to initialise
  };

  // Would be a shame not to actually use our resize function, now we've written it, and all.
  $(window).resize(function() {
    rainWindowResize();
  });

  // Now we've got to work out how to throw it all on the screen
  renderRain = function() {

    // Blat everything previously drawn on the screen with our mostly transparent black rectangle of Doom™
    gContext.fillStyle = gFade;
    gContext.fillRect(0, 0, gWidth, gHeight);

    // Get ready to draw our streams, using the right color and font
    gContext.fillStyle = gFillColor;
    gContext.font = gFont;

    // for each stream we want to draw
    for (var index = 0; index < gStreams; index++) {
      // Pick a random character to lob on the screen
      var text = String.fromCharCode(33 + Math.random() * 32); // Any character from 33-64. Starting at 1488 is pretty funky, too.
      // Pick an orderly line to lob it down
      var x = index * gFontHeight;
      // And lob it however far down there we think it should go
      var y = gY[index];
      gContext.fillText(text, x, y);

      // If our stream's time has come to an end
      if (y > gYTerm[index]) {
        // Cast a resurrection spell.
        gY[index] = 0 - Math.ceil((Math.random() * 150));
        // And then doom him to certain death, once more.
        var t = gTerminateHeight + (Math.random() * gTerminateAddHeight);
        gYTerm[index] = Math.min(t, gHeight);
      } else {
        // Else, next time, we should totally lob it down there a bit further. Even if it might end in eventual death.
        gY[index] = y + gFontHeight;
      }
    };

    // And now get ready to do it all again, in slow motion
    // But only if it's the right time to draw it
    gCurrentSlowCycle--;
    if (gCurrentSlowCycle == 0) {

      // Set the slow mo color
      gContext.fillStyle = gSlowFillColor;

      // This should all look very familiar. (Really, it should all be done in a multidimensional array - but it's hopefully easier to understand written longhand, like this)
      for (index = 0; index < gStreams; index++) {
        text = String.fromCharCode(33 + Math.random() * 32);
        x = index * gFontHeight;
        y = gYSlow[index];
        gContext.fillText(text, x, y);
        if (y > gYTermSlow[index]) {
          gYSlow[index] = 0 - Math.ceil((Math.random() * 70)); // Note we don't hang around so much, second time in
          var t = gTerminateHeight + (Math.random() * gTerminateAddHeight);
          gYTermSlow[index] = Math.min(t, gHeight);
        } else {
          gYSlow[index] = y + gFontHeight;
        }
      };
      gCurrentSlowCycle = gSlowCycle; // And wait another few renders before we draw this again
    }

    // And go render, again.
    requestAnimationFrame(renderRain);
  };

  // Right, then. We now have one function to initialise everything, and one to draw them.
  // We should probably call them both, in that order.

  rainWindowResize(); // Initialise all the things. 
  renderRain(); // Draw all the things. ALL THE THINGS. Repeatedly.

  // And done. Yay!
})
