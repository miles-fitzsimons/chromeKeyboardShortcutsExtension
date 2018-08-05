const save_options = () => {
  const closePinnedTabs = document.getElementById("checkbox").checked;

  chrome.storage.sync.set(
    {
      closePinnedTabs
    },
    () => {
      const checkboxAndLabel = document.getElementById("checkbox-and-label");
      const status = document.getElementById("status");
      checkboxAndLabel.style.display = "none";

      status.style.display = "initial";
      setTimeout(() => {
        checkboxAndLabel.style.display = "initial";
        status.style.display = "none";
      }, 1000);
    }
  );
};

const restore_options = () => {
  chrome.storage.sync.get(
    {
      closePinnedTabs: true
    },
    items => {
      document.getElementById("checkbox").checked = items.closePinnedTabs;
    }
  );
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("checkbox").addEventListener("change", save_options);
