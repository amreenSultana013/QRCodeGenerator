function generateQRCode() {
    const text = document.getElementById('text').value;
    const logoInput = document.getElementById('logo');
    const downloadBtn = document.getElementById('download-btn');

    if (!text) {
        alert('Please enter some text or a URL!');
        return;
    }

    const qrCode = new QRCode(document.createElement('div'), {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        const qrCodeImage = qrCode._el.querySelector("img");

        if (qrCodeImage) {
            drawQRCodeWithLogo(qrCodeImage, logoInput.files[0]);
            downloadBtn.classList.remove('hidden');
        }
    }, 500);
}

function drawQRCodeWithLogo(qrCodeImage, logoFile) {
    const canvas = document.getElementById('qrcode');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(qrCodeImage, 0, 0, canvas.width, canvas.height);

    if (logoFile) {
        const reader = new FileReader();

        reader.onload = () => {
            const logo = new Image();
            logo.src = reader.result;

            logo.onload = () => {
                const logoSize = 60;
                const padding = 10;
                context.drawImage(
                    logo,
                    (canvas.width - logoSize - padding) / 2,
                    (canvas.height - logoSize - padding) / 2,
                    logoSize + padding,
                    logoSize + padding
                );
            };
        };

        reader.readAsDataURL(logoFile);
    }
}

function downloadQRCode() {
    const canvas = document.getElementById('qrcode');
    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'QRCode.png';
    link.click();
}
