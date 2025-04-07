let buttonLabels = ["首頁", "自我介紹", "作品集", "測驗卷", "教學影片"];
let buttons = [];
let circles = [];
let dropdown;
let subButtons = [];
let popupWindow = null; // 用於存放小視窗的 DOM 元素

function setup() {
  createCanvas(windowWidth, windowHeight); // 畫布與螢幕大小一致

  // 建立按鈕
  let buttonX = width - 600; // 調整按鈕的起始 X 座標，向左再移動 50
  let buttonY = 10;          // 按鈕的 Y 座標
  let buttonWidth = 100;     // 按鈕寬度
  let buttonHeight = 50;     // 按鈕高度
  let buttonSpacing = 15;    // 按鈕間距

  for (let i = 0; i < buttonLabels.length; i++) {
    let x = buttonX + i * (buttonWidth + buttonSpacing);
    let btn = createButton(buttonLabels[i]);
    btn.position(x, buttonY);
    btn.size(buttonWidth, buttonHeight);
    btn.style('font-size', '18px'); // 字體大小
    btn.style('font-weight', 'bold'); // 字體變粗
    btn.style('border-radius', '10px'); // 框變圓潤
    btn.style('transition', 'background-color 0.3s'); // 平滑變色過渡
    btn.mouseOver(() => btn.style('background-color', '#ADD8E6')); // 滑鼠移入變為淡藍色
    btn.mouseOut(() => btn.style('background-color', '')); // 滑鼠移出恢復原色
    if (buttonLabels[i] === "作品集") {
      btn.mousePressed(() => toggleDropdown(x, buttonY + buttonHeight + 5)); // 點擊作品集按鈕顯示選項
    } else {
      btn.mousePressed(() => handleButtonClick(buttonLabels[i])); // 設定其他按鈕點擊事件
    }
    buttons.push(btn);
  }

  // 建立小視窗的 DOM 元素
  popupWindow = createDiv('');
  popupWindow.style('position', 'absolute');
  popupWindow.style('width', '80%');
  popupWindow.style('height', '80%');
  popupWindow.style('top', '10%');
  popupWindow.style('left', '10%');
  popupWindow.style('background-color', 'white');
  popupWindow.style('border', '2px solid black');
  popupWindow.style('border-radius', '10px');
  popupWindow.style('overflow', 'auto');
  popupWindow.style('display', 'none'); // 預設隱藏
  let closeButton = createButton('關閉');
  closeButton.parent(popupWindow);
  closeButton.style('position', 'absolute');
  closeButton.style('top', '10px');
  closeButton.style('right', '10px');
  closeButton.mousePressed(() => popupWindow.style('display', 'none')); // 點擊關閉按鈕隱藏小視窗

  // 隨機產生更多圓，並讓圓分散得更均勻
  for (let i = 0; i < 50; i++) { // 增加圓的數量
    let r, g, b;
    do {
      r = random(100, 255);
      g = random(100, 255);
      b = random(100, 255);
    } while (dist(r, g, b, 255, 182, 193) < 100); // 確保顏色與背景顏色差異足夠
    circles.push({
      x: random(50, width - 50), // 確保圓不會靠近邊界
      y: random(50, height - 50),
      r: random(10, 50),
      color: color(r, g, b)
    });
  }
}

function draw() {
  background(255, 182, 193); // 設定背景顏色為淡粉色 (RGB: 255, 182, 193)

  // 繪製圓，並讓圓隨滑鼠移動改變大小
  for (let circle of circles) {
    let distance = dist(mouseX, mouseY, circle.x, circle.y);
    let newRadius = circle.r + map(distance, 0, width, 20, -10); // 根據滑鼠距離調整大小
    newRadius = constrain(newRadius, 5, 100); // 限制圓的大小範圍
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, newRadius * 2);
  }
}

// 處理按鈕點擊事件
function handleButtonClick(label) {
  if (label === "首頁") {
    resetToHome(); // 點選首頁按鈕時回到最初畫面
  } else {
    console.log(label + " 按鈕被按下");
  }
}

// 回到最初畫面
function resetToHome() {
  // 移除所有子選項按鈕
  subButtons.forEach(btn => btn.remove());
  subButtons = [];
  
  // 隱藏小視窗
  popupWindow.style('display', 'none');
  
  console.log("回到首頁");
}

function toggleDropdown(x, y) {
  // 如果子選項按鈕已存在，移除它們
  if (subButtons.length > 0) {
    subButtons.forEach(btn => btn.remove());
    subButtons = [];
  } else {
    // 建立子選項按鈕
    let subButtonLabels = ["第一週", "第二週", "第三週", "第四週"]; // 修改為「週」
    let subButtonWidth = 100;
    let subButtonHeight = 40;
    let subButtonSpacing = 5;

    for (let i = 0; i < subButtonLabels.length; i++) {
      let btnY = y + i * (subButtonHeight + subButtonSpacing);
      let btn = createButton(subButtonLabels[i]);
      btn.position(x, btnY);
      btn.size(subButtonWidth, subButtonHeight);
      btn.style('font-size', '16px'); // 子選項字體大小
      btn.style('font-weight', 'bold'); // 字體變粗
      btn.style('border-radius', '8px'); // 框變圓潤
      btn.style('background-color', '#FFFFE0'); // 子選項背景顏色改為淡黃色
      if (subButtonLabels[i] === "第二週") {
        btn.mousePressed(() => showPopup("https://xxuanxxuanxxuan.github.io/20250303/")); // 第二週超連結
      } else if (subButtonLabels[i] === "第三週") {
        btn.mousePressed(() => showPopup("https://xxuanxxuanxxuan.github.io/20250310-/")); // 第三週超連結
      } else {
        btn.mousePressed(() => console.log(subButtonLabels[i] + " 被選擇")); // 處理其他子選項點擊事件
      }
      subButtons.push(btn);
    }
  }
}

// 顯示小視窗並載入指定的 URL
function showPopup(url) {
  popupWindow.html(`<iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>`);
  popupWindow.style('display', 'block');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}
