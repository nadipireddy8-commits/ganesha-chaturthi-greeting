/* =====================================================
   VINAYAKA CHATURTHI CINEMATIC EXPERIENCE
   ===================================================== */


/* =====================================================
   ELEMENTS
   ===================================================== */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

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


/* =====================================================
   CANVAS PARTICLES
   ===================================================== */

let particles = [];

let width = 0;
let height = 0;


function resizeCanvas() {

  width = window.innerWidth;
  height = window.innerHeight;

  const dpr =
    Math.min(window.devicePixelRatio || 1, 2);

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

      x: Math.random() * width,

      y: Math.random() * height,

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

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  particles.forEach((p) => {

    p.y -= p.speed;

    if (p.y < -5) {
      p.y = height + 5;
      p.x = Math.random() * width;
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

  requestAnimationFrame(drawParticles);
}


window.addEventListener(
  "resize",
  () => {

    resizeCanvas();

    createParticles();

  }
);


resizeCanvas();
createParticles();
drawParticles();


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

    petal.className = "petal";

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

    petalField.appendChild(petal);
  }
}

createPetals();


/* =====================================================
   MUSIC
   ===================================================== */

let musicPlaying = false;


function updateMusicUI() {

  if (!musicLabel || !musicToggle) {
    return;
  }

  if (musicPlaying) {

    musicLabel.textContent =
      "Music On";

    musicToggle.setAttribute(
      "aria-pressed",
      "true"
    );

  } else {

    musicLabel.textContent =
      "Music Off";

    musicToggle.setAttribute(
      "aria-pressed",
      "false"
    );
  }
}


async function startMusic() {

  if (!music) {
    return;
  }

  try {

    music.loop = true;

    music.volume = 0.72;

    await music.play();

    musicPlaying = true;

    updateMusicUI();

  } catch (error) {

    /*
      Browser blocked autoplay.

      This is normal on many mobile browsers.
      The Begin Celebration button will start it.
    */

    musicPlaying = false;

    updateMusicUI();
  }
}


function stopMusic() {

  if (!music) {
    return;
  }

  music.pause();

  musicPlaying = false;

  updateMusicUI();
}


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
   START EXPERIENCE
   ===================================================== */

function startExperience() {

  startMusic();

}


/* =====================================================
   AUTOMATIC MUSIC ATTEMPT
   ===================================================== */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        startExperience();

      },
      500
    );

  }
);


/* =====================================================
   BEGIN CELEBRATION
   ===================================================== */

if (beginBtn) {

  beginBtn.addEventListener(
    "click",
    async () => {

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

    petal.className = "petal";

    petal.style.position =
      "absolute";

    petal.style.left =
      "50%";

    petal.style.top =
      "50%";

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      100 + Math.random() * 450;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

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
          1300 + Math.random() * 900,

        easing:
          "cubic-bezier(.2,.7,.2,1)",

        fill: "forwards"
      }
    );

    petalBurst.appendChild(petal);
  }

  setTimeout(
    () => {

      petalBurst.innerHTML = "";

    },
    2500
  );
}


/* =====================================================
   CELEBRATION EFFECT
   ===================================================== */

function celebrate() {

  const sanctum =
    document.getElementById("sanctum");

  if (sanctum) {

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

        } else {

          await navigator.clipboard.writeText(
            window.location.href
          );

          alert(
            "Greeting link copied! 🙏"
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


/* =====================================================
   PARALLAX EFFECT
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
        (event.clientX /
          window.innerWidth -
          0.5) * 2;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 2;

      ganeshaParallax.style.transform =
        `translate(
          ${x * 8}px,
          ${y * 8}px
        )`;

    }
  );

}


/* =====================================================
   FIRST USER INTERACTION FALLBACK
   ===================================================== */

/*
  If the browser blocks autoplay,
  the first tap/click anywhere will
  attempt to start the devotional music.
*/

let interactionUsed = false;


function firstInteraction() {

  if (interactionUsed) {
    return;
  }

  interactionUsed = true;

  if (!musicPlaying) {
    startMusic();
  }

  document.removeEventListener(
    "pointerdown",
    firstInteraction
  );

  document.removeEventListener(
    "keydown",
    firstInteraction
  );
}


document.addEventListener(
  "pointerdown",
  firstInteraction,
  {
    once: true
  }
);


document.addEventListener(
  "keydown",
  firstInteraction,
  {
    once: true
  }
);


/* =====================================================
   INITIAL UI
   ===================================================== */

updateMusicUI();

console.log(
  "🕉️ Vinayaka Chaturthi greeting loaded successfully."
);
