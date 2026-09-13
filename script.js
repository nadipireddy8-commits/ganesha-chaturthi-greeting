/* =====================================================
   VINAYAKA CHATURTHI
   CINEMATIC GREETING EXPERIENCE
   ===================================================== */


/* =====================================================
   ELEMENTS
   ===================================================== */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const music =
  document.getElementById("ganeshaMusic");

const musicToggle =
  document.getElementById("musicToggle");

const musicLabel =
  document.getElementById("musicLabel");

const beginBtn =
  document.getElementById("beginBtn");

const shareBtn =
  document.getElementById("shareBtn");

const finalMessage =
  document.getElementById("finalMessage");

const petalField =
  document.getElementById("petalField");

const petalBurst =
  document.getElementById("petalBurst");

const ganeshaParallax =
  document.getElementById("ganeshaParallax");

const sanctum =
  document.getElementById("sanctum");


/* =====================================================
   BACKGROUND PARTICLES
   ===================================================== */

let particles = [];

let width = window.innerWidth;
let height = window.innerHeight;


function resizeCanvas() {

  if (!canvas || !ctx) return;

  width = window.innerWidth;
  height = window.innerHeight;

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    width * dpr;

  canvas.height =
    height * dpr;

  canvas.style.width =
    width + "px";

  canvas.style.height =
    height + "px";

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );
}


function createParticles() {

  if (!canvas || !ctx) return;

  particles = [];

  const count =
    Math.min(
      110,
      Math.max(
        40,
        Math.floor(
          window.innerWidth / 12
        )
      )
    );


  for (let i = 0; i < count; i++) {

    particles.push({

      x:
        Math.random() * width,

      y:
        Math.random() * height,

      radius:
        Math.random() * 1.8 + 0.4,

      speed:
        Math.random() * 0.25 + 0.05,

      alpha:
        Math.random() * 0.65 + 0.15,

      twinkle:
        Math.random() * 0.03 + 0.01

    });

  }

}


function drawParticles() {

  if (!canvas || !ctx) return;

  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  particles.forEach((p) => {

    p.y -= p.speed;


    if (p.y < -5) {

      p.y =
        height + 5;

      p.x =
        Math.random() * width;

    }


    p.alpha +=
      Math.sin(
        Date.now() * p.twinkle
      ) * 0.002;


    p.alpha =
      Math.max(
        0.08,
        Math.min(
          0.8,
          p.alpha
        )
      );


    ctx.beginPath();


    ctx.arc(
      p.x,
      p.y,
      p.radius,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      `rgba(255,205,105,${p.alpha})`;

    ctx.fill();

  });


  requestAnimationFrame(
    drawParticles
  );

}


if (canvas && ctx) {

  resizeCanvas();

  createParticles();

  drawParticles();

}


window.addEventListener(
  "resize",
  () => {

    resizeCanvas();

    createParticles();

  }
);


/* =====================================================
   FALLING PETALS
   ===================================================== */

function createPetals() {

  if (!petalField) return;

  petalField.innerHTML = "";


  const count =
    window.innerWidth < 600
      ? 16
      : 28;


  for (let i = 0; i < count; i++) {

    const petal =
      document.createElement("span");

    petal.className =
      "petal";


    petal.style.left =
      Math.random() * 100 + "%";


    petal.style.animationDuration =
      7 + Math.random() * 9 + "s";


    petal.style.animationDelay =
      -Math.random() * 10 + "s";


    petal.style.transform =
      `rotate(${Math.random() * 360}deg)`;


    petal.style.opacity =
      0.3 + Math.random() * 0.5;


    petalField.appendChild(
      petal
    );

  }

}


createPetals();


/* =====================================================
   MUSIC SYSTEM
   ===================================================== */

let musicPlaying = false;


/*
   Update the music button.
*/

function updateMusicUI() {

  if (!musicToggle || !musicLabel) {
    return;
  }


  if (musicPlaying) {

    musicLabel.textContent =
      "Music On";

    musicToggle.setAttribute(
      "aria-pressed",
      "true"
    );

    musicToggle.classList.add(
      "is-playing"
    );

  } else {

    musicLabel.textContent =
      "Music Off";

    musicToggle.setAttribute(
      "aria-pressed",
      "false"
    );

    musicToggle.classList.remove(
      "is-playing"
    );

  }

}


/*
   Start devotional music.
*/

async function startMusic() {

  if (!music) {
    return false;
  }


  try {

    music.loop = true;

    music.volume = 0.72;

    await music.play();


    musicPlaying = true;

    updateMusicUI();


    console.log(
      "🎵 Ganesha devotional music started."
    );


    return true;

  } catch (error) {

    musicPlaying = false;

    updateMusicUI();


    console.log(
      "🔇 Browser blocked automatic audio."
    );


    return false;

  }

}


/*
   Stop music.
*/

function stopMusic() {

  if (!music) return;

  music.pause();

  musicPlaying = false;

  updateMusicUI();

}


/*
   Try autoplay.
*/

function tryAutoplay() {

  if (!music) return;


  music.volume = 0.72;

  startMusic();

}


/* =====================================================
   AUTOMATIC MUSIC ATTEMPTS
   ===================================================== */


/*
   First attempt.
*/

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      setTimeout(
        tryAutoplay,
        100
      );

    }
  );

} else {

  setTimeout(
    tryAutoplay,
    100
  );

}


/*
   Additional attempts after
   the complete page loads.
*/

window.addEventListener(
  "load",
  () => {

    setTimeout(
      tryAutoplay,
      300
    );

    setTimeout(
      tryAutoplay,
      1000
    );

    setTimeout(
      tryAutoplay,
      2000
    );

  }
);


/*
   Retry when the page becomes visible.
*/

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.visibilityState ===
      "visible"
    ) {

      if (!musicPlaying) {
        tryAutoplay();
      }

    }

  }
);


/* =====================================================
   MUSIC BUTTON
   ===================================================== */

if (musicToggle) {

  musicToggle.addEventListener(
    "click",
    async () => {

      if (musicPlaying) {

        stopMusic();

      } else {

        await startMusic();

      }

    }
  );

}


/* =====================================================
   FIRST USER INTERACTION
   AUTOPLAY FALLBACK
   ===================================================== */


/*
   IMPORTANT:

   Browsers such as Chrome/Safari/mobile
   may block audible autoplay.

   When that happens, the first tap/click
   anywhere on the page starts the music.
*/

let interactionUsed = false;


async function handleFirstInteraction() {

  if (interactionUsed) {
    return;
  }


  interactionUsed = true;


  if (!musicPlaying) {

    await startMusic();

  }

}


document.addEventListener(
  "pointerdown",
  handleFirstInteraction,
  {
    once: true,
    passive: true
  }
);


document.addEventListener(
  "keydown",
  handleFirstInteraction,
  {
    once: true
  }
);


/* =====================================================
   MUSIC EVENTS
   ===================================================== */

if (music) {

  music.addEventListener(
    "playing",
    () => {

      musicPlaying = true;

      updateMusicUI();

    }
  );


  music.addEventListener(
    "pause",
    () => {

      if (!music.ended) {

        musicPlaying = false;

        updateMusicUI();

      }

    }
  );


  music.addEventListener(
    "error",
    () => {

      console.error(
        "❌ Unable to load ganesha-music.mpeg"
      );

    }
  );

}


/* =====================================================
   BEGIN CELEBRATION
   ===================================================== */

if (beginBtn) {

  beginBtn.addEventListener(
    "click",
    async () => {


      /*
         Because this click is a real
         user interaction, browsers
         normally allow audio here.
      */

      await startMusic();


      if (finalMessage) {

        finalMessage.classList.add(
          "show"
        );

      }


      createPetalBurst();

      celebrate();

    }
  );

}


/* =====================================================
   PETAL BURST
   ===================================================== */

function createPetalBurst() {

  if (!petalBurst) {
    return;
  }


  petalBurst.innerHTML = "";


  const count =
    window.innerWidth < 600
      ? 35
      : 70;


  for (let i = 0; i < count; i++) {

    const petal =
      document.createElement("span");


    petal.className =
      "petal";


    petal.style.position =
      "absolute";


    petal.style.left =
      "50%";


    petal.style.top =
      "50%";


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      100 +
      Math.random() *
      450;


    const x =
      Math.cos(angle) *
      distance;


    const y =
      Math.sin(angle) *
      distance;


    petal.animate(

      [

        {

          transform:
            "translate(-50%, -50%) scale(0.3) rotate(0deg)",

          opacity: 1

        },

        {

          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            )
            scale(1)
            rotate(${Math.random() * 900}deg)`,

          opacity: 0

        }

      ],

      {

        duration:
          1300 +
          Math.random() *
          900,

        easing:
          "cubic-bezier(.2,.7,.2,1)",

        fill:
          "forwards"

      }

    );


    petalBurst.appendChild(
      petal
    );

  }


  setTimeout(
    () => {

      petalBurst.innerHTML =
        "";

    },
    2500
  );

}


/* =====================================================
   CELEBRATION EFFECT
   ===================================================== */

function celebrate() {

  if (!sanctum) {
    return;
  }


  sanctum.animate(

    [

      {
        transform:
          "scale(1)"
      },

      {
        transform:
          "scale(1.015)"
      },

      {
        transform:
          "scale(1)"
      }

    ],

    {

      duration: 700,

      easing: "ease-out"

    }

  );

}


/* =====================================================
   SHARE BUTTON
   ===================================================== */

if (shareBtn) {

  shareBtn.addEventListener(
    "click",
    async () => {


      const shareData = {

        title:
          "Happy Vinayaka Chaturthi 🙏",

        text:
          "May Lord Ganesha bless you and your family with happiness, prosperity, success and good fortune. Ganpati Bappa Morya! 🙏🐘",

        url:
          window.location.href

      };


      try {


        if (
          navigator.share
        ) {

          await navigator.share(
            shareData
          );

        } else if (
          navigator.clipboard
        ) {

          await navigator.clipboard.writeText(
            window.location.href
          );


          showShareMessage(
            "Greeting link copied! 🙏"
          );

        } else {

          showShareMessage(
            "Copy this page link to share your wishes."
          );

        }


      } catch (error) {

        console.log(
          "Sharing cancelled."
        );

      }

    }
  );

}


/*
   Temporary share feedback.
*/

function showShareMessage(message) {

  if (!shareBtn) return;


  const originalText =
    shareBtn.textContent;


  shareBtn.textContent =
    message;


  shareBtn.disabled =
    true;


  setTimeout(
    () => {

      shareBtn.textContent =
        originalText;

      shareBtn.disabled =
        false;

    },
    2200
  );

}


/* =====================================================
   DESKTOP PARALLAX
   ===================================================== */

if (
  window.matchMedia(
    "(pointer: fine)"
  ).matches &&
  ganeshaParallax
) {


  window.addEventListener(
    "mousemove",
    (event) => {


      const x =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * 2;


      const y =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * 2;


      ganeshaParallax.style.transform =
        `translate(
          ${x * 8}px,
          ${y * 8}px
        )`;

    }
  );

}


/* =====================================================
   INITIAL UI
   ===================================================== */

updateMusicUI();


console.log(
  "🕉️ Vinayaka Chaturthi greeting loaded successfully."
);
