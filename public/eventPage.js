let contextMenuItem = {
  "id": "elementPicker",
  "title": "FrankenStyle",
  "contexts": ["all"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData, tab) {
  if (tab) {
    if (clickData.menuItemId == "elementPicker") {
      let selectedEl = clickData.target.value;
      console.log("element right clicked", selectedEl)
      chrome.storage.sync.set({ 'element': selectedEl }, function () {
        console.log("something saved")
      })
    }
  }

})
