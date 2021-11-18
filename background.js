let color = '#3A3B3C';
let defaultColor;
let cardColor;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    chrome.storage.sync.set({ defaultColor });
    chrome.storage.sync.set({ cardColor });
});