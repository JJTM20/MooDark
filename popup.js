chrome.storage.sync.set({ defaultColor: document.body.style.backgroundColor });


toggleBtn.addEventListener("change", async () => {


    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (toggleBtn.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: ToggleDarkMode,
        });
    }
    if (!toggleBtn.checked) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: ToggleLightMode,
        });
    }
});
function ToggleDarkMode(toggleBtn) {
    chrome.storage.sync.get(['color'], ({ color }) => {
        document.body.style.backgroundColor = color;
    });
    document.querySelectorAll('div[class*="card"]').forEach(function (element) {
        chrome.storage.sync.set({ cardColor: element.style.backgroundColor });
        element.style.backgroundColor = "#2d2e2f";
    });
    //document.querySelectorAll('span[class*="text-truncate"]').forEach(element => element.style.color = "#c0c1c2");
    document.querySelectorAll('div[class*="w-100 text-truncate"]').forEach(element => element.style.color = "#c0c1c2");
    let navbar = document.querySelector('.navbar');
    navbar.classList.remove('bg-white');
    navbar.style.backgroundColor = "#c0c1c2";
}
function ToggleLightMode(toggleBtn) {

    chrome.storage.sync.get(['defaultColor', 'cardColor'], function (data) {
        console.log(data.cardColor);
        document.body.style.backgroundColor = data.defaultColor;
        document.querySelectorAll('div[class*="card"]').forEach(element => element.style.backgroundColor = data.cardColor);
        document.querySelectorAll('span[class*="w-100 text-truncate"]').forEach(element => element.style.color = "#fff");
    });
}