// Import the QR code library
import QRCode from 'qrcode';

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
    let qrCodeDataUrl = '';
    try {
      qrCodeDataUrl = await QRCode.toDataURL(certificateVerificationUrl, {
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      // Set a fallback in case of error - either empty or a placeholder
      qrCodeDataUrl = '';
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
                size: A4 portrait;
                margin: 0;
              }
            }
            
            body {
              font-family: 'Arial', sans-serif;
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
            }
            
            .certificate-container {
              width: 210mm;
              height: 297mm;
              max-width: 100%;
              position: relative;
              background-color: #f8fbff;
              overflow: hidden;
              text-align: center;
              padding: 10px;
            }
            
            .certificate-border {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border: 2px solid #a0c8e7;
              border-radius: 10px;
              margin: 15px;
              pointer-events: none;
              z-index: 1;
            }
            
            .watermarks-container {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              z-index: 0;
              opacity: 0.1;
              pointer-events: none;
            }
            
            .watermark {
              position: absolute;
              width: 150px;
              height: 150px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
            }
            
            .content {
              position: relative;
              z-index: 2;
              padding: 30px;
              height: 100%;
              display: flex;
              flex-direction: column;
            }
            
            .logo-container {
              text-align: center;
              margin-bottom: 15px;
              margin-top: 10px;
            }
            
            .logo-container img {
              max-height: 350px;
            }
            
            .title-container {
              background-color: #4CAF50;
              padding: 10px 50px;
              margin: 20px 0;
            }
            
            .title {
              font-size: 2.4rem;
              font-weight: bold;
              color: #000;
              margin: 0;
              font-family: 'Times New Roman', serif;
            }
            
            .body-text {
              font-size: 24px;
              line-height: 1.6;
              margin: 30px 0;
              text-align: center;
            }
            
            .school-name {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 15px 0;
            }
            
            .validity {
              font-size: 1.6rem;
              margin: 15px 0;
              text-align: center;
            }
            
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: auto;
              padding: 20px;
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
              margin: 50px 0 10px;
            }
            
            .issuer-name {
              font-weight: bold;
              font-size: 20px;
            }
            
            .issuer-position {
              font-size: 18px;
            }
            
            .seal-image {
              width: 80px;
              height: 80px;
              margin-bottom: 10px;
            }
            
            .qr-code {
              width: 100px;
              height: 100px;
              margin-bottom: 10px;
            }
            
            .certificate-id {
              font-size: 16px;
              margin-top: 5px;
            }
            
            .year {
              font-size: 1.4rem;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <!-- Multiple watermarks in the background -->
            <div class="watermarks-container" id="watermarksContainer">
              <!-- Watermarks will be added dynamically via JavaScript -->
            </div>
            
            <!-- Border -->
            <div class="certificate-border"></div>
            
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
                <strong class="year">A one year Accreditation</strong><br>
                for offering the ${schoolType}.
              </div>
              
              <div class="validity">
                Valid from <strong>${validFromDate}</strong> to <strong>${validToDate}</strong>
              </div>
              
              <div class="footer">
                <div class="issuer-section">
                  <div class="signature-line"></div>
                  <div class="issuer-name">${issuerName}</div>
                  <div class="issuer-position">${issuerPosition}</div>
                </div>
                
                <div class="seal-section">
                  ${qrCodeDataUrl ? 
                    `<img class="qr-code" src="${qrCodeDataUrl}" alt="Certificate QR Code" />` : 
                    `<div id="qrCodePlaceholder" class="qr-code"></div>`
                  }
                  <div class="certificate-id">
                    Certificate Number:<br>
                    ${certificateNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <script>
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
            
            // Function to create multiple watermarks
            function createWatermarks() {
              const container = document.getElementById('watermarksContainer');
              const watermarkPath = "${getNextImagePath(waterMark)}";
              const numWatermarks = 15; // Number of watermarks to create
              
              // Container dimensions
              const containerWidth = container.offsetWidth;
              const containerHeight = container.offsetHeight;
              
              // Create multiple watermarks with random positions
              for (let i = 0; i < numWatermarks; i++) {
                const watermark = document.createElement('div');
                watermark.className = 'watermark';
                
                // Set random position (ensuring it's not too close to the edges)
                const left = Math.floor(Math.random() * (containerWidth - 150));
                const top = Math.floor(Math.random() * (containerHeight - 150));
                
                // Add a random rotation for variety
                const rotation = Math.floor(Math.random() * 40) - 20; // -20 to +20 degrees
                
                watermark.style.left = left + 'px';
                watermark.style.top = top + 'px';
                watermark.style.transform = 'rotate(' + rotation + 'deg)';
                watermark.style.backgroundImage = "url('" + watermarkPath + "')";
                
                container.appendChild(watermark);
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


// Helper functions
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getTwoYearsFromNow = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 2);
  return date;
};