// =====================================================
// ☁️ 基礎 API 測試模組 (Lambda / Public / Flask)
// =====================================================

// Lambda API 基底
const apiBase = "https://4b5cqz0xpd.execute-api.ap-northeast-1.amazonaws.com/Prod";
const lambdaHello = `${apiBase}/hello`;
const lambdaTest  = `${apiBase}/test`;

// 公共 API
const publicUrl   = "https://jsonplaceholder.typicode.com/todos/1";

// EC2 Flask API (Port 5000)
const ec2FlaskUrl = "http://18.176.60.86:5000/";

// 通用呼叫函式
async function callAPI(url, targetId) {
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

// 綁定事件（等頁面載入後執行）
document.addEventListener("DOMContentLoaded", () => {
  // Lambda
  document.getElementById("btnHello").addEventListener("click", () => callAPI(lambdaHello, "helloResult"));
  document.getElementById("btnTest").addEventListener("click", () => callAPI(lambdaTest, "testResult"));

  // 公共 API
  document.getElementById("btnPublic").addEventListener("click", () => callAPI(publicUrl, "publicResult"));

  // EC2 Flask
  document.getElementById("btnEC2").addEventListener("click", () => callAPI(ec2FlaskUrl, "ec2Result"));
});
