chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: ".*" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.commands.onCommand.addListener(command => {
  chrome.tabs.query({}, tabs => {
    chrome.windows.getCurrent({}, window => {
      const currentWindowTabs = tabs.filter(tab => tab.windowId === window.id);
      const activeTabIndex = currentWindowTabs.find(tab => tab.active === true)
        .index;

      const tabsToClose = [];
      chrome.storage.sync.get("closePinnedTabs", result => {
        const { closePinnedTabs } = result;
        if (command === "close-tabs-to-the-right") {
          for (let i = activeTabIndex + 1; i < currentWindowTabs.length; i++) {
            const thisTab = currentWindowTabs[i];
            if (
              shouldTabBeClosed(
                closePinnedTabs,
                activeTabIndex,
                thisTab,
                window.id
              )
            ) {
              tabsToClose.push(currentWindowTabs[i].id);
            }
          }
        }

        if (command === "close-tabs-to-the-left") {
          for (let i = 0; i < activeTabIndex; i++) {
            const thisTab = currentWindowTabs[i];
            if (
              shouldTabBeClosed(
                closePinnedTabs,
                activeTabIndex,
                thisTab,
                window.id
              )
            ) {
              tabsToClose.push(thisTab.id);
            }
          }
        }

        if (command === "close-other-tabs") {
          for (let i = 0; i < currentWindowTabs.length; i++) {
            const thisTab = currentWindowTabs[i];
            if (
              shouldTabBeClosed(
                closePinnedTabs,
                activeTabIndex,
                thisTab,
                window.id
              )
            ) {
              tabsToClose.push(thisTab.id);
            }
          }
        }

        if (command === "pin-current-tab") {
          chrome.tabs.update(currentWindowTabs[activeTabIndex].id, {
            pinned: !currentWindowTabs[activeTabIndex].pinned
          });
        }

        chrome.tabs.remove(tabsToClose);
      });
    });
  });
});
