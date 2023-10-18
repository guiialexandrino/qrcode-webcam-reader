import { canvas, webcamContainer, qrCodeResult } from "./interface.js"

export const drawLine = (canvasContext, begin, end, color) => {
  canvasContext.beginPath()
  canvasContext.moveTo(begin.x, begin.y)
  canvasContext.lineTo(end.x, end.y)
  canvasContext.lineWidth = 4
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

export const buttonAppears = (event) => {
  setTimeout(() => { 
    webcamContainer.style.height = '40px'
    canvas.style.display= 'none'
    const button = document.createElement('button')
    button.id = 'button'
    button.style.display = 'block'
    button.innerHTML = 'Abrir Leitor QrCode'
    button.addEventListener('click', () => {
      qrCodeResult.innerHTML = ''
      webcamContainer.style.height = '600px'
      canvas.style.display= 'block'
      const button = document.getElementById('button')
      button.remove()
      event()
    })
    webcamContainer.appendChild(button)
  }, 1000)
}