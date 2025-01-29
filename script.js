const cartao = document.getElementById("cartao");

let startX = 0; // Armazena a posição inicial do toque
let currentRotation = 0; // Estado inicial do lado do cartão (0 = frente, 180 = verso)

// ---- Função para girar o cartão ----
function girarCartao(rotation) {
  cartao.style.transition = "transform 0.8s ease";
  cartao.style.transform = `rotateY(${rotation}deg)`;
  currentRotation = rotation;
}

// ---- Eventos para o hover no desktop ----
cartao.addEventListener("mouseenter", () => girarCartao(180)); // Gira para o verso
cartao.addEventListener("mouseleave", () => girarCartao(0)); // Volta para a frente

// ---- Eventos para toque/arrastar no celular ----
// Detecta o início do toque
cartao.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX; // Captura a posição inicial do toque
  cartao.style.transition = ""; // Remove a transição enquanto arrasta
});

// Detecta o movimento do toque
cartao.addEventListener("touchmove", (event) => {
  const currentX = event.touches[0].clientX; // Posição atual do toque
  const deltaX = currentX - startX; // Diferença entre a posição inicial e atual

  // Calcula a rotação em tempo real enquanto arrasta
  let rotation = currentRotation + deltaX / 2; // Ajuste sensibilidade dividindo deltaX
  rotation = Math.max(0, Math.min(180, rotation)); // Limita entre 0° e 180°
  cartao.style.transform = `rotateY(${rotation}deg)`;
});

// Detecta o fim do toque
cartao.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0].clientX; // Posição final do toque
  const deltaX = endX - startX; // Diferença entre início e fim do toque

  // Decide para qual lado girar com base no deltaX
  if (deltaX > 50) {
    girarCartao(0); // Volta para a frente
  } else if (deltaX < -50) {
    girarCartao(180); // Vai para o verso
  } else {
    // Caso o movimento seja pequeno, mantém o lado atual
    girarCartao(currentRotation);
  }
});
