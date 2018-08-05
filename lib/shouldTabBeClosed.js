const shouldTabBeClosed = (closePinnedTabs, activeTabIndex, thisTab) => {
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
