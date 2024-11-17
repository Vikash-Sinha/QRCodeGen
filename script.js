document.addEventListener('DOMContentLoaded', () => {
  const qrContainer = document.getElementById('qrcode');
  const generateBtn = document.getElementById('generate-btn');
  const downloadBtn = document.getElementById('download-btn');

  const colorPicker = document.getElementById('color-picker');
  const bgColorPicker = document.getElementById('bg-color-picker');
  const bgImageInput = document.getElementById('bgImageInput');
  const logoInput = document.getElementById('logoInput');
  const logoSizeSlider = document.getElementById('logoSize');
  const logoShapeSelector = document.getElementById('logoShape');
  const logoEffectSelector = document.getElementById('logoEffect');

  const removeColorBtn = document.getElementById('remove-color-btn');
  const removeBgColorBtn = document.getElementById('remove-bg-color-btn');
  const removeBgImageBtn = document.getElementById('remove-bg-image-btn');
  const removeLogoBtn = document.getElementById('remove-logo-btn');

  generateBtn.addEventListener('click', () => {
    const urlInput = document.getElementById('url-input').value;
    const companyName = document.getElementById('company-name').value;
    const companyDesc = document.getElementById('company-desc').value;
    const qrColor = colorPicker.value;

    if (!urlInput) {
      alert('Please enter a URL.');
      return;
    }

    qrContainer.innerHTML = ''; // Clear previous QR code
    const qrCanvas = document.createElement('canvas');
    const canvasSize = 400;
    qrCanvas.width = canvasSize + 200;
    qrCanvas.height = canvasSize + 200; // Additional space for text

    const qrCode = new QRCode(document.createElement('div'), {
      text: urlInput,
      width: canvasSize,
      height: canvasSize,
      colorDark: qrColor,
      colorLight: 'rgba(255, 255, 255, 0)', // Transparent background
      correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
      const qrImage = new Image();
      qrImage.src = qrCode._oDrawing._elCanvas.toDataURL();

      qrImage.onload = () => {
        const ctx = qrCanvas.getContext('2d');

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);

        // Add company name
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(companyName, (canvasSize / 2)+100, 50);

        // Add QR Code
        const qrYPos = 100; // Position below company name
        if (bgImageInput.files[0]) {
          const bgImage = new Image();
          bgImage.src = URL.createObjectURL(bgImageInput.files[0]);
          bgImage.onload = () => {
            ctx.save(); 
            ctx.globalAlpha = 0.5;
            ctx.drawImage(bgImage, 100, qrYPos, canvasSize, canvasSize);
            ctx.restore();
            ctx.drawImage(qrImage, 100, qrYPos, canvasSize, canvasSize);
            addLogo(ctx, qrCanvas, qrYPos);
          };
        } else {
          ctx.fillStyle = bgColorPicker.value;
          ctx.fillRect(100, qrYPos, canvasSize, canvasSize);
          ctx.drawImage(qrImage, 100, qrYPos, canvasSize, canvasSize);
          addLogo(ctx, qrCanvas, qrYPos);
        }

        // Add company description
        ctx.fillStyle = '#000000';
        ctx.font = 'italic 24px Arial';
        ctx.fillText(companyDesc, (canvasSize / 2)+100, canvasSize + 160);

        qrContainer.appendChild(qrCanvas);
        downloadBtn.style.display = 'block';
      };
    }, 500);
  });

  function addLogo(ctx, canvas, qrYPos) {
    if (logoInput.files[0]) {
      const logoImg = new Image();
      logoImg.src = URL.createObjectURL(logoInput.files[0]);
      logoImg.onload = () => {
        const logoSize = canvas.width * (logoSizeSlider.value / 100);
        const x = (canvas.width - logoSize) / 2;
        const y = qrYPos + (canvas.width - logoSize-200) / 2;

        ctx.save();
        const effect = logoEffectSelector.value;
        if (effect === 'blur') {
          ctx.filter = 'blur(5px)';
        } else if (effect === 'translucent') {
          ctx.globalAlpha = 0.5;
        }

        const shape = logoShapeSelector.value;
        if (shape === 'oval') {
          ctx.beginPath();
          ctx.ellipse(x + logoSize / 2, y + logoSize / 2, logoSize / 2, logoSize / 2, 0, 0, Math.PI * 2);
          ctx.clip();
        }

        ctx.drawImage(logoImg, x, y, logoSize, logoSize);
        ctx.restore();
      };
    }
  }

  downloadBtn.addEventListener('click', () => {
    const qrCanvas = qrContainer.querySelector('canvas');
    if (qrCanvas) {
      const link = document.createElement('a');
      link.href = qrCanvas.toDataURL('image/png');
      link.download = 'custom-qr-code.png';
      link.click();
    }
  });

  // Reset functionalities
  removeColorBtn.addEventListener('click', () => colorPicker.value = '#000000');
  removeBgColorBtn.addEventListener('click', () => bgColorPicker.value = '#ffffff');
  removeBgImageBtn.addEventListener('click', () => bgImageInput.value = '');
  removeLogoBtn.addEventListener('click', () => {
    logoInput.value = '';
  });
});

// Listen for color picker changes
colorPicker.addEventListener('input', () => {
  regenerateQRCode();
});

function regenerateQRCode() {
  const urlInput = document.getElementById('url-input').value;
  const companyName = document.getElementById('company-name').value;
  const companyDesc = document.getElementById('company-desc').value;
  const qrColor = colorPicker.value;

  if (!urlInput) {
    alert('Please enter a URL.');
    return;
  }

  qrContainer.innerHTML = ''; // Clear previous QR code
  const qrCanvas = document.createElement('canvas');
  const canvasSize = 400;
  qrCanvas.width = canvasSize + 200;
  qrCanvas.height = canvasSize + 200; // Additional space for text

  const qrCode = new QRCode(document.createElement('div'), {
    text: urlInput,
    width: canvasSize,
    height: canvasSize,
    colorDark: qrColor,
    colorLight: 'rgba(255, 255, 255, 0)', // Transparent background
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    const qrImage = new Image();
    qrImage.src = qrCode._oDrawing._elCanvas.toDataURL();

    qrImage.onload = () => {
      const ctx = qrCanvas.getContext('2d');

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);

      // Add company name
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(companyName, (canvasSize / 2) + 100, 50);

      // Add QR Code
      const qrYPos = 100; // Position below company name
      if (bgImageInput.files[0]) {
        const bgImage = new Image();
        bgImage.src = URL.createObjectURL(bgImageInput.files[0]);
        bgImage.onload = () => {
          ctx.drawImage(bgImage, 100, qrYPos, canvasSize, canvasSize);
          ctx.drawImage(qrImage, 100, qrYPos, canvasSize, canvasSize);
          addLogo(ctx, qrCanvas, qrYPos);
        };
      } else {
        ctx.fillStyle = bgColorPicker.value;
        ctx.fillRect(0, qrYPos, canvasSize, canvasSize);
        ctx.drawImage(qrImage, 100, qrYPos, canvasSize, canvasSize);
        addLogo(ctx, qrCanvas, qrYPos - 100);
      }

      // Add company description
      ctx.fillStyle = '#000000';
      ctx.font = 'italic 24px Arial';
      ctx.fillText(companyDesc, (canvasSize / 2) + 100, canvasSize + 160);

      qrContainer.appendChild(qrCanvas);
      downloadBtn.style.display = 'block';
    };
  }, 500);
}

