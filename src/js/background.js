/*
  On install, we set variables to default values
*/

(function() {
  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({lastCached: 'testing45'}, function() {
      console.log("On install");
    });
  });
})();
