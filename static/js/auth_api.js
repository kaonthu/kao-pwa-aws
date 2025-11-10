// ========================================================
// 🔐 auth_api.js
// 共用身分驗證與金鑰管理模組
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  const keyInput = document.getElementById("apiKeyInput");
  const keyDisplay = document.getElementById("currentKeyDisplay");
  const saveBtn = document.getElementById("saveKeyBtn");
  const clearBtn = document.getElementById("clearKeyBtn");

  if (!keyInput || !saveBtn || !clearBtn || !keyDisplay) return;

  // ✅ 自動載入登入時儲存的 api_key
  const savedKey = localStorage.getItem("api_key");
  updateKeyDisplay(savedKey);

  if (savedKey) {
    const username = localStorage.getItem("username") || "使用者";
    console.log(`🔐 偵測到登入金鑰，使用者：${username}`);

    // ✅ 顯示歡迎提示（插入目前金鑰下方）
    const welcomeNote = document.createElement("div");
    welcomeNote.innerHTML = `<b class="text-success">👋 歡迎 ${username}，API 金鑰已自動載入！</b>`;
    keyDisplay.parentElement.appendChild(welcomeNote);

    // 自動觸發「儲存金鑰」按鈕（保持同步邏輯）
    setTimeout(() => saveBtn.click(), 300);
  }

  // ✅ 儲存金鑰
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const key = keyInput.value.trim();
    const username = localStorage.getItem("username") || "使用者";
    if (!key) return showTempMessage("⚠️ 請輸入有效的金鑰！", "danger");
    localStorage.setItem("api_key", key);
    updateKeyDisplay(key);
    showTempMessage(`✅ API 金鑰已儲存！👋 Hello ${username}！`, "success");
  });

  // ✅ 清除金鑰
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("api_key");
    keyInput.value = "";
    updateKeyDisplay(null);
    showTempMessage("🧹 API 金鑰已清除。", "warning");
  });

  // 🧩 更新畫面顯示
  function updateKeyDisplay(key) {
    if (key) {
      keyInput.value = key;
      keyDisplay.textContent = key;
      keyDisplay.classList.add("text-success");
    } else {
      keyDisplay.textContent = "（尚未設定）";
      keyDisplay.classList.remove("text-success");
    }
  }

  // 💬 顯示暫時提示訊息
  function showTempMessage(msg, type = "info") {
    const note = document.createElement("div");
    note.innerText = msg; // 保留換行效果 (\n)
    note.className = `fw-bold text-${type} mt-2`;
    keyDisplay.parentElement.appendChild(note);
    setTimeout(() => note.remove(), 2500); // 2.5 秒後消失
  }
});
