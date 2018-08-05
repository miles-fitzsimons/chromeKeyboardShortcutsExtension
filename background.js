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
    const tabsToClose = [];
    const activeTabIndex = tabs.find(tab => tab.active === true).index;

    chrome.storage.sync.get("closePinnedTabs", result => {
      const { closePinnedTabs } = result;
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

      if (command === "pin-current-tab") {
        chrome.tabs.update(tabs[activeTabIndex].id, {
          pinned: !tabs[activeTabIndex].pinned
        });
      }

      chrome.tabs.remove(tabsToClose);
    });
  });
});

// save on checkbox change
// sort out multiple windows bug
