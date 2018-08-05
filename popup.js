const save_options = () => {
  const closePinnedPages = document.getElementById("checkbox").checked;
  console.log("closepinned", closePinnedPages);

  chrome.storage.sync.set(
    {
      closePinnedPages: closePinnedPages
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

// document.addEventListener("DOMContentLoaded", restore_options);

document.getElementById("save").addEventListener("click", save_options);
