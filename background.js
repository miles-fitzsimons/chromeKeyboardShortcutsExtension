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
    // let activeTabIndex;
    const tabsToClose = [];
    // tabs.forEach((_, index) => {
    //   if (tabs[index].active) {
    //     activeTabIndex = index;
    //   }
    // });

    const activeTabIndex = tabs.find(tab => tab.active === true).index;
    console.log("active", activeTabIndex);

    chrome.storage.sync.get("closePinnedTabs", result => {
      const { closePinnedTabs } = result;
      console.log("result", result, closePinnedTabs);
      if (command === "close-tabs-to-the-right") {
        for (let i = activeTabIndex + 1; i < tabs.length; i++) {
          tabsToClose.push(tabs[i].id);
        }
      }

      if (command === "close-tabs-to-the-left") {
        for (let i = 0; i < activeTabIndex; i++) {
          const thisTab = tabs[i];
          if (shouldTabBeClosed(closePinnedTabs, activeTabIndex, thisTab)) {
            tabsToClose.push(thisTab.id);
          }
        }
      }

      if (command === "close-other-tabs") {
        for (let i = 0; i < tabs.length; i++) {
          const thisTab = tabs[i];
          if (shouldTabBeClosed(closePinnedTabs, activeTabIndex, thisTab)) {
            tabsToClose.push(thisTab.id);
          }
        }
      }

      chrome.tabs.remove(tabsToClose);
    });
  });
});

// shortcut for piining tab?
// add ignore pins in options?

// save on checkbox change
