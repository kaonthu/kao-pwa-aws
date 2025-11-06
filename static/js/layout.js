// static/js/layout.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 載入 Header
    const headerRes = await fetch("/static/components/header.html");
    if (headerRes.ok) {
      const headerHtml = await headerRes.text();
      document.getElementById("header").innerHTML = headerHtml;
    } else {
      console.warn("⚠️ 無法載入 header.html");
    }

    // 載入 Footer
    const footerRes = await fetch("/static/components/footer.html");
    if (footerRes.ok) {
      const footerHtml = await footerRes.text();
      document.getElementById("footer").innerHTML = footerHtml;
    } else {
      console.warn("⚠️ 無法載入 footer.html");
    }

  } catch (err) {
    console.error("❌ 載入共用 header/footer 時發生錯誤：", err);
  }
});
