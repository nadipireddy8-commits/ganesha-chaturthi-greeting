/* ============================================================
   VINAYAKA CHATURTHI — CINEMATIC GREETING
   Telugu devotional music + particles + fireworks + sharing
   ============================================================ */

(() => {

  "use strict";


  /* ==========================================================
     ELEMENTS
     ========================================================== */

  const stage =
    document.getElementById("stage");

  const canvas =
    document.getElementById("bg-canvas");

  const ctx =
    canvas.getContext("2d");

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* ==========================================================
     CANVAS SIZE
     ========================================================== */

  let W = 0;
  let H = 0;

  const DPR =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  function resizeCanvas() {

    W =
      window.innerWidth;

    H =
      window.innerHeight;

    canvas.width =
      W * DPR;

    canvas.height =
      H * DPR;

    canvas.style.width =
      W + "px";

    canvas.style.height =
      H + "px";

    ctx.setTransform(
      DPR,
      0,
      0,
      DPR,
      0,
      0
    );
  }


  resizeCanvas();


  window.addEventListener(
    "resize",
    resizeCanvas
  );


  /* ==========================================================
     PARTICLES
     ========================================================== */

  const MAX_AMBIENT =
    reducedMotion
      ? 0
      : (
          W < 640
            ? 35
            : 70
        );


  class Mote {

    constructor() {

      this.reset(true);
    }


    reset(initial) {

      this.x =
        Math.random() * W;

      this.y =
        initial
          ? Math.random() * H
          : H + 10;

      this.r =
        .6 +
        Math.random() * 1.8;

      this.speed =
        .15 +
        Math.random() * .45;

      this.drift =
        (Math.random() - .5) * .3;

      this.alpha =
        .15 +
        Math.random() * .5;

      this.twinkleSpeed =
        .01 +
        Math.random() * .02;

      this.twinklePhase =
        Math.random() *
        Math.PI *
        2;

      this.hue =
        Math.random() > .5
          ? "244,196,48"
          : "255,201,140";
    }


    step(t) {

      this.y -=
        this.speed;

      this.x +=
        this.drift +
        Math.sin(
          t * .001 +
          this.twinklePhase
        ) * .15;


      if (
        this.y < -10
      ) {

        this.reset(false);
      }
    }


    draw() {

      const flicker =
        .6 +
        .4 *
        Math.sin(
          performance.now() *
          this.twinkleSpeed +
          this.twinklePhase
        );


      ctx.beginPath();


      ctx.arc(
        this.x,
        this.y,
        this.r,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(${this.hue},${this.alpha * flicker})`;


      ctx.fill();
    }

  }


  /* ==========================================================
     SPARKLE
     ========================================================== */

  class Sparkle {

    constructor(x, y) {

      this.x =
        x;

      this.y =
        y;

      this.life =
        1;

      this.decay =
        .012 +
        Math.random() * .01;

      this.r =
        1 +
        Math.random() * 1.6;


      const a =
        Math.random() *
        Math.PI *
        2;


      const s =
        .2 +
        Math.random() * .5;


      this.vx =
        Math.cos(a) * s;

      this.vy =
        Math.sin(a) * s -
        .15;
    }


    step() {

      this.x +=
        this.vx;

      this.y +=
        this.vy;

      this.life -=
        this.decay;

      return this.life > 0;
    }


    draw() {

      ctx.beginPath();


      ctx.arc(
        this.x,
        this.y,
        this.r * this.life,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(255,233,168,${this.life})`;


      ctx.shadowColor =
        "rgba(244,196,48,.9)";

      ctx.shadowBlur =
        6;


      ctx.fill();


      ctx.shadowBlur =
        0;
    }

  }


  /* ==========================================================
     FIREWORKS
     ========================================================== */

  class FireworkSpark {

    constructor(
      x,
      y,
      angle,
      speed,
      color
    ) {

      this.x =
        x;

      this.y =
        y;

      this.vx =
        Math.cos(angle) *
        speed;

      this.vy =
        Math.sin(angle) *
        speed;

      this.life =
        1;

      this.decay =
        .012 +
        Math.random() * .008;

      this.color =
        color;
    }


    step() {

      this.vy +=
        .012;

      this.vx *=
        .985;

      this.vy *=
        .985;

      this.x +=
        this.vx;

      this.y +=
        this.vy;

      this.life -=
        this.decay;

      return this.life > 0;
    }


    draw() {

      ctx.beginPath();


      ctx.arc(
        this.x,
        this.y,
        1.8 * this.life + .4,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(${this.color},${this.life})`;


      ctx.shadowColor =
        `rgba(${this.color},.8)`;

      ctx.shadowBlur =
        8;


      ctx.fill();


      ctx.shadowBlur =
        0;
    }

  }


  const motes =
    [];

  let sparkles =
    [];

  let fireworks =
    [];


  function seedMotes(count) {

    while (
      motes.length < count
    ) {

      motes.push(
        new Mote()
      );
    }


    while (
      motes.length > count
    ) {

      motes.pop();
    }
  }


  seedMotes(
    reducedMotion
      ? 0
      : Math.round(
          MAX_AMBIENT * .4
        )
  );


  function launchFirework(
    cx,
    cy
  ) {

    const goldColors = [

      "244,196,48",

      "255,201,140",

      "255,233,168",

      "232,103,44"

    ];


    const count =
      34;


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const angle =
        Math.PI *
        2 *
        i /
        count +
        Math.random() *
        .2;


      const speed =
        1.6 +
        Math.random() *
        2.4;


      const color =
        goldColors[
          Math.floor(
            Math.random() *
            goldColors.length
          )
        ];


      fireworks.push(
        new FireworkSpark(
          cx,
          cy,
          angle,
          speed,
          color
        )
      );
    }
  }


  function burstSparkles(
    x,
    y,
    count = 24
  ) {

    for (
      let i = 0;
      i < count;
      i++
    ) {

      sparkles.push(
        new Sparkle(
          x,
          y
        )
      );
    }
  }


  /* ==========================================================
     ANIMATION LOOP
     ========================================================== */

  function animate(t) {

    ctx.clearRect(
      0,
      0,
      W,
      H
    );


    for (
      let i = 0;
      i < motes.length;
      i++
    ) {

      motes[i].step(t);

      motes[i].draw();
    }


    sparkles =
      sparkles.filter(
        sparkle => {

          const alive =
            sparkle.step();

          if (alive) {
            sparkle.draw();
          }

          return alive;
        }
      );


    fireworks =
      fireworks.filter(
        firework => {

          const alive =
            firework.step();

          if (alive) {
            firework.draw();
          }

          return alive;
        }
      );


    requestAnimationFrame(
      animate
    );
  }


  requestAnimationFrame(
    animate
  );


  /* ==========================================================
     GANESHA AMBIENT SPARKLES
     ========================================================== */

  function ambientSparkleLoop() {

    if (
      stage.classList.contains(
        "is-awakened"
      ) &&
      !reducedMotion
    ) {

      const ganesha =
        document.getElementById(
          "ganeshaWrap"
        );


      if (ganesha) {

        const rect =
          ganesha.getBoundingClientRect();


        const cx =
          rect.left +
          rect.width / 2 +
          (
            Math.random() -
            .5
          ) *
          rect.width *
          .9;


        const cy =
          rect.top +
          rect.height / 2 +
          (
            Math.random() -
            .5
          ) *
          rect.height *
          .9;


        sparkles.push(
          new Sparkle(
            cx,
            cy
          )
        );
      }
    }


    setTimeout(
      ambientSparkleLoop,
      reducedMotion
        ? 999999
        : 220
    );
  }


  ambientSparkleLoop();


  /* ==========================================================
     PETALS
     ========================================================== */

  const petalField =
    document.getElementById(
      "petalField"
    );


  const PETAL_COUNT =
    reducedMotion
      ? 0
      : (
          W < 640
            ? 10
            : 18
        );


  function spawnPetal(
    container,
    opts = {}
  ) {

    const petal =
      document.createElement(
        "div"
      );


    petal.className =
      "petal";


    const size =
      opts.size ||
      (
        8 +
        Math.random() *
        10
      );


    petal.style.width =
      size + "px";


    petal.style.height =
      size * .75 +
      "px";


    petal.style.left =
      (
        opts.left ??
        Math.random() * 100
      ) + "%";


    if (
      opts.top !== undefined
    ) {

      petal.style.top =
        opts.top;
    }


    const duration =
      opts.duration ||
      (
        9 +
        Math.random() *
        8
      );


    petal.style.animationDuration =
      duration + "s";


    petal.style.animationDelay =
      (
        opts.delay ??
        Math.random() *
        duration
      ) + "s";


    petal.style.setProperty(
      "--drift",
      (
        opts.drift ??
        (
          Math.random() -
          .5
        ) *
        160
      ) + "px"
    );


    petal.style.opacity =
      String(
        .6 +
        Math.random() *
        .3
      );


    container.appendChild(
      petal
    );


    return petal;
  }


  for (
    let i = 0;
    i < PETAL_COUNT;
    i++
  ) {

    spawnPetal(
      petalField
    );
  }


  /* ==========================================================
     RANGOLI
     ========================================================== */

  const rangoliPetalsGroup =
    document.querySelector(
      ".rangoli-petals"
    );


  if (
    rangoliPetalsGroup
  ) {

    const cx =
      200;

    const cy =
      200;

    const count =
      12;

    const r1 =
      40;

    const r2 =
      74;


    let html =
      "";


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const a =
        Math.PI *
        2 *
        i /
        count;


      const x1 =
        cx +
        Math.cos(a) *
        r1;


      const y1 =
        cy +
        Math.sin(a) *
        r1;


      const x2 =
        cx +
        Math.cos(a) *
        r2;


      const y2 =
        cy +
        Math.sin(a) *
        r2;


      const perp =
        a +
        Math.PI / 2;


      const bulge =
        10;


      const mx =
        cx +
        Math.cos(a) *
        (r1 + r2) /
        2 +
        Math.cos(perp) *
        bulge;


      const my =
        cy +
        Math.sin(a) *
        (r1 + r2) /
        2 +
        Math.sin(perp) *
        bulge;


      html +=
        `<path
          class="rangoli-petal"
          d="M${x1.toFixed(1)},${y1.toFixed(1)}
             Q${mx.toFixed(1)},${my.toFixed(1)}
             ${x2.toFixed(1)},${y2.toFixed(1)}"
        />`;
    }


    rangoliPetalsGroup.innerHTML =
      html;
  }


  /* ==========================================================
     GANESHA IMAGE
     ========================================================== */

  const ganeshaImg =
    document.getElementById(
      "ganeshaImg"
    );


  if (
    ganeshaImg
  ) {

    ganeshaImg.addEventListener(
      "error",
      () => {

        ganeshaImg.style.opacity =
          ".25";
      }
    );
  }


  /* ==========================================================
     INTRO
     ========================================================== */

  const diyaLeft =
    document.getElementById(
      "diyaLeft"
    );

  const diyaRight =
    document.getElementById(
      "diyaRight"
    );


  function awaken() {

    if (
      stage.classList.contains(
        "is-awakened"
      )
    ) {

      return;
    }


    stage.classList.add(
      "is-awakened"
    );


    setTimeout(
      () => {

        diyaLeft.classList.add(
          "is-lit"
        );

      },
      900
    );


    setTimeout(
      () => {

        diyaRight.classList.add(
          "is-lit"
        );

      },
      1350
    );


    setTimeout(
      () => {

        const ganesha =
          document.getElementById(
            "ganeshaWrap"
          );


        if (ganesha) {

          const rect =
            ganesha.getBoundingClientRect();


          burstSparkles(

            rect.left +
            rect.width / 2,

            rect.top +
            rect.height / 2,

            30

          );
        }

      },
      1600
    );

  }


  /* ==========================================================
     MUSIC
     ========================================================== */

  const ganeshaMusic =
    document.getElementById(
      "ganeshaMusic"
    );


  const musicToggle =
    document.getElementById(
      "musicToggle"
    );


  const musicLabel =
    document.getElementById(
      "musicLabel"
    );


  let musicPlaying =
    false;


  function updateMusicUI() {

    if (!musicToggle) {
      return;
    }


    musicToggle.classList.toggle(
      "is-playing",
      musicPlaying
    );


    musicToggle.setAttribute(
      "aria-pressed",
      String(
        musicPlaying
      )
    );


    if (musicLabel) {

      musicLabel.textContent =
        musicPlaying
          ? "Music On"
          : "Music Off";
    }

  }


  async function startMusic() {

    if (!ganeshaMusic) {
      return;
    }


    try {

      ganeshaMusic.loop =
        true;

      ganeshaMusic.volume =
        .72;


      await ganeshaMusic.play();


      musicPlaying =
        true;


      updateMusicUI();

    }

    catch (error) {

      /*
        Browser blocked audible autoplay.
        The Begin Celebration button will
        try again after user interaction.
      */

      musicPlaying =
        false;

      updateMusicUI();
    }

  }


  function stopMusic() {

    if (!ganeshaMusic) {
      return;
    }


    ganeshaMusic.pause();


    musicPlaying =
      false;


    updateMusicUI();
  }


  /* Music button */

  if (musicToggle) {

    musicToggle.addEventListener(
      "click",
      async () => {

        if (
          musicPlaying
        ) {

          stopMusic();

        } else {

          await startMusic();

        }

      }
    );
  }


  /* ==========================================================
     AUTOMATIC OPENING
     ========================================================== */

  function startExperience() {

    awaken();


    /*
      Try automatic Telugu music.
      Some browsers allow it; others block
      audible autoplay.
    */

    setTimeout(
      () => {

        startMusic();

      },
      800
    );
  }


  window.addEventListener(
    "load",
    () => {

      setTimeout(
        startExperience,
        350
      );

    }
  );


  if (
    document.readyState ===
    "complete"
  ) {

    setTimeout(
      startExperience,
      350
    );
  }


  /* ==========================================================
     BEGIN CELEBRATION
     ========================================================== */

  const beginBtn =
    document.getElementById(
      "beginBtn"
    );


  const finalMessage =
    document.getElementById(
      "finalMessage"
    );


  const petalBurstField =
    document.getElementById(
      "petalBurst"
    );


  let celebrated =
    false;


  beginBtn.addEventListener(
    "click",
    () => {

      /*
        User interaction means the browser
        should allow the music to start.
      */

      startMusic();


      if (
        celebrated
      ) {

        return;
      }


      celebrated =
        true;


      beginBtn.disabled =
        true;


      beginBtn.textContent =
        "Celebration Begun ✨";


      stage.classList.add(
        "is-celebrating"
      );


      diyaLeft.classList.add(
        "is-bright"
      );


      diyaRight.classList.add(
        "is-bright"
      );


      /* ======================================================
         PETAL BURST
         ====================================================== */

      if (
        !reducedMotion
      ) {

        for (
          let i = 0;
          i < 40;
          i++
        ) {

          spawnPetal(
            petalBurstField,
            {

              left:
                50 +
                (
                  Math.random() -
                  .5
                ) *
                30,

              top:
                "40%",

              duration:
                2.6 +
                Math.random() *
                1.6,

              delay:
                Math.random() *
                .6,

              drift:
                (
                  Math.random() -
                  .5
                ) *
                500,

              size:
                8 +
                Math.random() *
                12

            }
          );
        }
      }


      /* ======================================================
         FIREWORKS
         ====================================================== */

      const ganesha =
        document.getElementById(
          "ganeshaWrap"
        );


      const rect =
        ganesha.getBoundingClientRect();


      const cx =
        rect.left +
        rect.width /
        2;


      const cy =
        rect.top +
        rect.height *
        .35;


      if (
        !reducedMotion
      ) {

        launchFirework(
          cx,
          cy
        );


        setTimeout(
          () => {

            launchFirework(
              cx - 90,
              cy + 30
            );

          },
          260
        );


        setTimeout(
          () => {

            launchFirework(
              cx + 90,
              cy + 10
            );

          },
          480
        );


        burstSparkles(
          cx,
          cy,
          50
        );
      }


      /* More particles */

      seedMotes(
        reducedMotion
          ? 0
          : Math.round(
              MAX_AMBIENT
            )
      );


      /* Final message */

      setTimeout(
        () => {

          finalMessage.classList.add(
            "is-shown"
          );

        },
        900
      );


      /* Cleanup */

      setTimeout(
        () => {

          petalBurstField.innerHTML =
            "";

        },
        6000
      );

    }
  );


  /* ==========================================================
     SHARE WISHES
     ========================================================== */

  const shareBtn =
    document.getElementById(
      "shareBtn"
    );


  const shareText =
    "Happy Vinayaka Chaturthi! 🙏 " +
    "May Lord Ganesha bless you and your family " +
    "with happiness, prosperity, success and " +
    "good fortune. " +
    "Ganpati Bappa Morya! 🐘";


  shareBtn.addEventListener(
    "click",
    async () => {

      const shareData = {

        title:
          "Happy Vinayaka Chaturthi",

        text:
          shareText,

        url:
          window.location.href
      };


      if (
        navigator.share
      ) {

        try {

          await navigator.share(
            shareData
          );

        }

        catch (error) {

          /*
            User cancelled sharing.
          */
        }

      }

      else if (
        navigator.clipboard
      ) {

        try {

          await navigator.clipboard.writeText(
            `${shareText} ${window.location.href}`
          );


          flashShareFeedback(
            "Wishes copied! 🙏"
          );

        }

        catch (error) {

          flashShareFeedback(
            "Couldn't copy the link."
          );
        }

      }

      else {

        flashShareFeedback(
          "Copy this page link to share."
        );
      }

    }
  );


  function flashShareFeedback(
    message
  ) {

    const original =
      shareBtn.textContent;


    shareBtn.textContent =
      message;


    shareBtn.disabled =
      true;


    setTimeout(
      () => {

        shareBtn.textContent =
          original;

        shareBtn.disabled =
          false;

      },
      2200
    );

  }


  /* ==========================================================
     3D PARALLAX
     ========================================================== */

  const parallaxTargets = [

    {
      el:
        document.getElementById(
          "ganeshaParallax"
        ),

      depth:
        10
    },


    {
      el:
        document.querySelector(
          ".light-rays"
        ),

      depth:
        22
    },


    {
      el:
        diyaLeft,

      depth:
        -14
    },


    {
      el:
        diyaRight,

      depth:
        -14
    },


    {
      el:
        document.getElementById(
          "rangoli"
        ),

      depth:
        6
    }

  ].filter(
    target =>
      target.el
  );


  let targetX =
    0;

  let targetY =
    0;

  let curX =
    0;

  let curY =
    0;


  function onPointerMove(
    clientX,
    clientY
  ) {

    const nx =
      clientX /
      W *
      2 -
      1;


    const ny =
      clientY /
      H *
      2 -
      1;


    targetX =
      nx;

    targetY =
      ny;
  }


  if (

    !reducedMotion &&

    window.matchMedia(
      "(hover:hover)"
    ).matches

  ) {

    window.addEventListener(
      "mousemove",
      event => {

        onPointerMove(
          event.clientX,
          event.clientY
        );

      }
    );
  }


  function parallaxLoop() {

    curX +=
      (
        targetX -
        curX
      ) *
      .06;


    curY +=
      (
        targetY -
        curY
      ) *
      .06;


    if (
      !reducedMotion
    ) {

      parallaxTargets.forEach(
        ({
          el,
          depth
        }) => {

          el.style.transform =
            `translate3d(
              ${curX * depth}px,
              ${curY * depth * .6}px,
              0
            )`;

        }
      );
    }


    requestAnimationFrame(
      parallaxLoop
    );
  }


  if (
    !reducedMotion
  ) {

    requestAnimationFrame(
      parallaxLoop
    );
  }


  /* ==========================================================
     RESIZE PARTICLES
     ========================================================== */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          () => {

            const budget =
              reducedMotion
                ? 0
                : (
                    W < 640
                      ? 35
                      : 70
                  );


            seedMotes(
              Math.round(
                budget * .4
              )
            );

          },
          250
        );

    }
  );


})();