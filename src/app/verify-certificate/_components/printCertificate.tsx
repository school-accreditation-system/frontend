/* eslint-disable max-lines */
// Import the QR code library
import QRCode from "qrcode";

export const handlePrintCertificate = async ({
  logo,
  waterMark,
  sealImage,
  schoolName,
  schoolType,
  issuerName,
  issuerPosition,
  validFromDate,
  validToDate,
  certificateNumber,
}) => {
  // Function to get correct Next.js image paths
  const getNextImagePath = (imagePath) => {
    if (!imagePath) return "";

    // If it's already an absolute URL or data URL, return as is
    if (
      typeof imagePath === "string" &&
      (imagePath.startsWith("http") || imagePath.startsWith("data:"))
    ) {
      return imagePath;
    }

    // Handle Next.js image paths
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  // Generate QR code for the certificate verification
  const certificateVerificationUrl = `https://your-domain.com/verify/${certificateNumber}`;

  // Generate QR code first, before opening the print window
  let qrCodeDataUrl = "";
  try {
    qrCodeDataUrl = await QRCode.toDataURL(certificateVerificationUrl, {
      width: 100,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    // Set a fallback in case of error - either empty or a placeholder
    qrCodeDataUrl = "";
  }

  // Now create a new window for printing, after the QR code is generated
  const printWindow = window.open("", "_blank");

  // Generate the certificate HTML content with the QR code data URL
  const certificateHTML = `
      <html>
        <head>
          <title>Certificate of Accreditation</title>
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              @page {
                size: A4 landscape;
                margin: 0;
              }
            }
            
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 0;
              background: white;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            
            * {
              box-sizing: border-box;
              font-family: 'Times New Roman', serif;
            }
            
            .certificate-container {
              width: 297mm;
              height: 210mm;
              max-width: 100%;
              position: relative;
              background: #dbeafe;
              overflow: hidden;
              text-align: center;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 15px;
            }

            .main-container {
              background: white;
              width: 98%;
              height: 97%;
              position: relative;
              border-radius: 10px;
              box-shadow: 0 0 15px rgba(0,0,0,0.05);
            }

            .watermarks-container {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-template-rows: repeat(3, 1fr);
              z-index: 1;
              pointer-events: none;
              background: transparent;
            }

            .watermark {
              background-repeat: no-repeat;
              background-position: center;
              background-size: 180px;  /* Fixed size to match example */
              opacity: 0.05;  /* Much lighter opacity */
              width: 100%;
              height: 100%;
              transform: rotate(-30deg) scale(1.2);  /* Slightly larger scale */
              display: flex;
              justify-content: center;
              align-items: center;
            }


            .content {
              position: relative;
              z-index: 2;
              padding: 30px;
              height: 100%;
              display: flex;
              flex-direction: column;
              background: transparent;
              border-radius: 10px;
              border: 1px solid rgba(25, 118, 210, 0.2);
            }

            .title {
              font-size: 3.2rem;
              font-weight: bold;
              color: #000000; 
              margin: 0;
              padding: 10px 0;
              letter-spacing: 2px;
            }

            .subtitle {
              color: #546E7A;
              font-size: 1.4rem;
              margin: 5px 0 10px 0;
              letter-spacing: 1px;
            }
            
            .logo-container {
              text-align: center;
              margin-bottom: 10px;
            }
            
            .logo-container img {
              max-height: 120px;
              width: auto;
            }
            
            .title-container {
              padding: 15px 50px;
              margin: 15px 0 25px 0;
            }
            
            .body-text {
              font-size: 22px;
              line-height: 1.4;
              margin: 10px 0;
              text-align: center;
            }
            
            .school-name {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 10px 0;
            }
            
            .validity {
              font-size: 1.2rem;
              margin: 15px 0;
              text-align: center;
            }
            
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top:auto;
            }
            
            .issuer-section {
              text-align: left;
              width: 45%;
            }
            
            .seal-section {
              text-align: right;
              width: 45%;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            }
            
            .signature-line {
              width: 80%;
              border-top: 1px solid #000;
              margin: 30px 0 10px;
            }
            
            .issuer-name {
              font-weight: bold;
              font-size: 22px;
            }
            
            .issuer-position {
              font-size: 20px;
            }
            
            .qr-code {
              width: 90px;
              height: 90px;
              margin-bottom: 10px;
            }
            
            .certificate-id {
              font-size: 18px;
              margin-top: 5px;
            }
            
            .year {
              font-size: 1.6rem;
              font-weight: bold;
              color: #0078c1;
            }
            .date {
              color: #0078c1;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="main-container">
              <!-- Watermarks Container -->
              <div class="watermarks-container"></div>
      
              <!-- Content -->
              <div class="content">
                <div class="logo-container">
                  <img src="${getNextImagePath(logo)}" alt="NESA Logo" 
                       onerror="this.onerror=null; this.style.display='none';" />
                </div>
                
                <div class="title-container">
                  <h1 class="title">Certificate of Accreditation</h1>
                </div>
                
                <div class="body-text">
                  This is to certify that
                  <div class="school-name">${schoolName}</div>
                  is granted<br>
                  <strong class="year">Accreditation</strong><br>
                  for offering the ${schoolType}.
                </div>
                
                <div class="validity">
                  Valid from <strong class="date">${validFromDate}</strong> to <strong class="date">${validToDate}</strong>
                </div>
                
                <div class="footer">
                  <div class="issuer-section">
                    <div class="signature-line"></div>
                    <div class="issuer-name">${issuerName}</div>
                    <div class="issuer-position">${issuerPosition}</div>
                  </div>
                  
                  <div class="seal-section">
                    ${
                      qrCodeDataUrl
                        ? `<img class="qr-code" src="${qrCodeDataUrl}" alt="Certificate QR Code" />`
                        : `<div id="qrCodePlaceholder" class="qr-code"></div>`
                    }
                    <div class="certificate-id">
                      Certificate Number:<br>
                      ${certificateNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <script>
            // Function to create watermarks in a grid pattern
            function createWatermarks() {
              const container = document.querySelector('.watermarks-container');
              const watermarkPath = "${getNextImagePath(waterMark)}";
              const rows = 3;
              const cols = 4;
              
              // Create watermarks in a grid
              for (let i = 0; i < (rows * cols); i++) {
                const watermark = document.createElement('div');
                watermark.className = 'watermark';
                watermark.style.backgroundImage = "url('" + watermarkPath + "')";
                container.appendChild(watermark);
              }
            }
            
            // Function to create a fallback QR code if needed
            function createFallbackQRCode() {
              // Only create fallback if the QR code data URL wasn't provided
              if (!document.querySelector('.qr-code[src]')) {
                const placeholder = document.getElementById('qrCodePlaceholder');
                if (placeholder) {
                  const qrCanvas = document.createElement('canvas');
                  qrCanvas.width = 100;
                  qrCanvas.height = 100;
                  const qrContext = qrCanvas.getContext('2d');
                  
                  // Create a simple placeholder pattern
                  qrContext.fillStyle = '#ffffff';
                  qrContext.fillRect(0, 0, 100, 100);
                  qrContext.fillStyle = '#000000';
                  qrContext.fillRect(10, 10, 80, 80);
                  qrContext.fillStyle = '#ffffff';
                  qrContext.fillRect(20, 20, 60, 60);
                  qrContext.fillStyle = '#000000';
                  qrContext.fillRect(30, 30, 40, 40);
                  
                  // Create an image element
                  const img = document.createElement('img');
                  img.src = qrCanvas.toDataURL();
                  img.className = 'qr-code';
                  img.alt = 'Certificate QR Code (Placeholder)';
                  
                  // Replace the placeholder with the generated image
                  placeholder.parentNode.replaceChild(img, placeholder);
                }
              }
            }
            
            // Run once the document is loaded
            window.onload = function() {
              createWatermarks();
              createFallbackQRCode();
              
              // Add a delay to ensure images are loaded before printing
              setTimeout(() => {
                window.print();
                // window.close(); // Uncomment to automatically close after print dialog
              }, 1000);
            };
          </script>
        </body>
      </html>
    `;

  // Write to the new window and print
  printWindow.document.open();
  printWindow.document.write(certificateHTML);
  printWindow.document.close();
};
