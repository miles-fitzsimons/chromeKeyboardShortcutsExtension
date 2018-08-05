const save_options = () => {
  const closePinnedTabs = document.getElementById("checkbox").checked;
  console.log("closepinned", closePinnedTabs);

  chrome.storage.sync.set(
    {
      closePinnedTabs
    },
    () => {
      const status = document.getElementById("status");
      status.textContent = "Options saved";
      setTimeout(() => {
        status.textContent = "";
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
      console.log("restoring", items);
      document.getElementById("checkbox").checked = items.closePinnedTabs;
    }
  );
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
