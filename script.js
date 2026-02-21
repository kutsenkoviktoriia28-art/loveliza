const layer = document.getElementById("hearts-layer");
const btn = document.getElementById("moreHearts");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function makeHeart(x = rand(0, window.innerWidth)) {
  const heart = document.createElement("div");
  heart.className = "heart";

  // pastel-ish random pink/red
  const hue = rand(330, 10) % 360; // wrap around
  const sat = rand(70, 95);
  const light = rand(55, 70);
  heart.style.background = `hsl(${hue} ${sat}% ${light}%)`;

  const size = rand(10, 26);
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.setProperty("--s", rand(0.8, 1.4));

  heart.style.left = `${x}px`;
  heart.style.top = `${window.innerHeight + rand(0, 40)}px`;

  const duration = rand(4.5, 9.5);
  heart.style.animationDuration = `${duration}s`;

  layer.appendChild(heart);

  // remove when done
  heart.addEventListener("animationend", () => heart.remove());
}

function sprinkle(n = 20) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => makeHeart(rand(0, window.innerWidth)), rand(0, 900));
  }
}

// auto hearts
setInterval(() => {
  makeHeart(rand(0, window.innerWidth));
}, 180);

// click to add hearts
btn.addEventListener("click", () => sprinkle(35));

// click anywhere adds a burst
window.addEventListener("click", (e) => {
  // ignore button click double-trigger
  if (e.target === btn) return;
  for (let i = 0; i < 18; i++) {
    setTimeout(() => makeHeart(e.clientX + rand(-60, 60)), rand(0, 400));
  }
});

// first load burst
sprinkle(25);

