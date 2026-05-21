/**
 * Google Analytics 4
 * แก้ค่าด้านล่างเป็น Measurement ID จาก GA4
 * (Admin → Data streams → เลือกเว็บ → Measurement ID รูปแบบ G-XXXXXXXXXX)
 */
const GA4_MEASUREMENT_ID = 'G-76ZRK3ZB6Q';

(function () {
  if (!GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID === 'G-76ZRK3ZB6Q') {
    return;
  }

  const host = window.location.hostname;

  // ไม่นับตอนพัฒนาบนเครื่องตัวเอง
  if (host === 'localhost' || host === '127.0.0.1') {
    return;
  }

  // ไม่นับ Netlify Deploy Preview (ลดสถิติปลอม)
  if (host.includes('netlify.app') && host.startsWith('deploy-preview')) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {
    send_page_view: true,
  });
})();
