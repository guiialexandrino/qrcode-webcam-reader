import { webcamContainer, canvas, qrCodeResult } from './interface.js'
import { drawLine, buttonAppears } from './utils.js';

let interval = null

export const initQrCode = async () => {
  let stream = null
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true })
    
    const videoFromWebCam = document.createElement('video')
    videoFromWebCam.id = 'webcam'
    videoFromWebCam.style.display = 'none'
    videoFromWebCam.srcObject = stream
    videoFromWebCam.play()
    webcamContainer.appendChild(videoFromWebCam)
    webcamContainer.style.height = '600px'

    interval = setInterval(() => {
      canvas.width = videoFromWebCam.videoWidth
      canvas.height = videoFromWebCam.videoHeight

      if (canvas.width && canvas.height) {
        const canvasContext = canvas.getContext('2d')
        canvasContext.drawImage(videoFromWebCam, 0, 0, canvas.width, canvas.height)

        const image = canvasContext.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(image.data, image.width, image.height)

        if (code?.data) {
          drawLine(canvasContext, code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58')
          drawLine(canvasContext, code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58')
          drawLine(canvasContext, code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58')
          drawLine(canvasContext, code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58')

          qrCodeResult.innerHTML = `QRCode encontrado:  <strong>${code.data}</strong>`
          disconnectWebCam()
          buttonAppears(initQrCode)
        }
      }
    }, 80)    

  } catch (error) {
    console.error('Erro ao acessar a camera:', error)
  }
}

const disconnectWebCam = () => {
  const webcam = document.getElementById('webcam')
  webcam.srcObject.getTracks()[0].stop()
  webcam.srcObject = null
  webcamContainer.removeChild(webcam)
  clearInterval(interval)
}
