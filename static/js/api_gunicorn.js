// =====================================================
// 🧩 EC2 Gunicorn + Nginx 測試模組
// =====================================================

// 端點設定
const gunicornRoot = "http://18.176.60.86/";
const gunicornStatus = "http://18.176.60.86/status";
const gunicornAPI = "http://18.176.60.86/api/";
const gunicornAPIStatus = "http://18.176.60.86/api/status";

// ☁️ CloudFront Proxy 測試
const cloudfrontAPI = "https://d2kenp4ywj2ej.cloudfront.net/api/";
const cloudfrontStatus = "https://d2kenp4ywj2ej.cloudfront.net/api/status";

// 通用呼叫函式
async function callGunicornAPI(url, targetId) {
  const box = document.getElementById(targetId);
  box.textContent = `🚀 正在呼叫：${url}`;
  try {
    const res = await fetch(url, { mode: "cors" });
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      box.textContent = JSON.stringify(json, null, 2);
    } catch {
      box.textContent = text;
    }
  } catch (err) {
    box.textContent = "❌ 發生錯誤：" + err;
  }
}

// 綁定所有按鈕事件
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnGunicornRoot").addEventListener("click", () => callGunicornAPI(gunicornRoot, "gunicornRootResult"));
  document.getElementById("btnGunicornStatus").addEventListener("click", () => callGunicornAPI(gunicornStatus, "gunicornStatusResult"));
  document.getElementById("btnGunicornAPI").addEventListener("click", () => callGunicornAPI(gunicornAPI, "gunicornAPIResult"));
  document.getElementById("btnGunicornAPIStatus").addEventListener("click", () => callGunicornAPI(gunicornAPIStatus, "gunicornAPIStatusResult"));
  document.getElementById("btnCloudfrontAPI").addEventListener("click", () => callGunicornAPI(cloudfrontAPI, "cloudfrontAPIResult"));
  document.getElementById("btnCloudfrontStatus").addEventListener("click", () => callGunicornAPI(cloudfrontStatus, "cloudfrontStatusResult"));
});
