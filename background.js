chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "." }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.commands.onCommand.addListener(command => {
  chrome.tabs.query({}, tabs => {
    let currentTabIndex;
    const tabsToClose = [];
    tabs.forEach((_, index) => {
      if (tabs[index].active) {
        currentTabIndex = index;
      }
    });

    if (command === "close-tabs-to-the-right") {
      for (let i = currentTabIndex + 1; i < tabs.length; i++) {
        tabsToClose.push(tabs[i].id);
      }
    }

    if (command === "close-tabs-to-the-left") {
      for (let i = 0; i < currentTabIndex; i++) {
        if (!tabs[i].pinned) {
          tabsToClose.push(tabs[i].id);
        }
      }
    }

    if (command === "close-other-tabs") {
      for (let i = 0; i < tabs.length; i++) {
        if (!tabs[i].pinned && i !== currentTabIndex) {
          tabsToClose.push(tabs[i].id);
        }
      }
    }

    chrome.tabs.remove(tabsToClose);
  });
});

// shortcut for piining tab?
// add ignore pins in options?
