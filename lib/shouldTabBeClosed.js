const shouldTabBeClosed = (
  closePinnedTabs,
  activeTabIndex,
  thisTab,
  currentWindowId
) => {
  if (thisTab.windowId !== currentWindowId) {
    return false;
  }

  if (activeTabIndex === thisTab.index) {
    return false;
  }

  if (thisTab.pinned && closePinnedTabs) {
    return true;
  }

  if (thisTab.pinned && !closePinnedTabs) {
    return false;
  }

  return true;
};
