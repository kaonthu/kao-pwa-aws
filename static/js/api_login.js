// ========================================================
// 🔐 身分認證測試模組 (api_login.js)
// 適用於 test.html 的登入測試區塊
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btnLoginTest");
  const userInput = document.getElementById("loginUser");
  const passInput = document.getElementById("loginPass");
  const resultDiv = document.getElementById("loginResult");

  if (!btnLogin) return; // 若頁面沒有登入按鈕則不執行

  btnLogin.addEventListener("click", async () => {
    const user_id = userInput.value.trim();
    const password = passInput.value.trim();

    if (!user_id || !password) {
      resultDiv.textContent = "⚠️ 請輸入帳號與密碼。";
      return;
    }

    resultDiv.textContent = "登入中...";

    try {
      // ✅ 目前可用的兩條路徑
      const apiEndpoints = {
        cloudfront: "https://d2kenp4ywj2ej.cloudfront.net/api/login", // 正式 HTTPS 通道
        ec2: "http://18.176.60.86/api/login"                          // 開發階段測試用
      };

      // 預設使用 CloudFront
      const res = await fetch(apiEndpoints.cloudfront, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, password })
      });

      const data = await res.json();

      if (res.ok && data.api_key) {
        resultDiv.innerHTML = `
          ✅ 登入成功！<br>
          使用者：${data.message}<br>
          API Key：<code>${data.api_key}</code>
        `;
      } else {
        resultDiv.innerHTML = `❌ 登入失敗：${data.error || "未知錯誤"}`;
      }
    } catch (err) {
      console.error("登入請求錯誤：", err);
      resultDiv.textContent = "伺服器錯誤或網路無法連線。";
    }
  });
});
