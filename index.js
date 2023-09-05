
  const movingDiv = document.querySelector('.workExperienceTitle');
  const boxWidth = 500;
  const divSize = 50;
  let x = Math.random() * (boxWidth - divSize);
  let y = Math.random() * (boxWidth - divSize);
  let xDirection = 1;
  let yDirection = 1;

  function moveDiv() {
    x += xDirection * (Math.random() * 5 + 1); // Random speed
    y += yDirection * (Math.random() * 5 + 1);

    if (x + divSize > boxWidth || x < 0) {
      xDirection *= -1;
    }
    if (y + divSize > boxWidth || y < 0) {
      yDirection *= -1;
    }

    movingDiv.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(moveDiv); // Recursive call for smooth animation
  }

  requestAnimationFrame(moveDiv); // Start the animation loop