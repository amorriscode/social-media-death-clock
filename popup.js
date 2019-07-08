document.addEventListener('DOMContentLoaded', () => {
  const datePicker = document.querySelector('#birthdate');

  chrome.storage.sync.get(['birthdate'], ({ birthdate }) => {
    if (birthdate) {
      datePicker.value = birthdate;
    }
  });

  datePicker.addEventListener('change', () => {
    chrome.storage.sync.set({ birthdate: datePicker.value }, () => {
      console.log(`Birthdate updated to ${datePicker.value}`);
    });
  });
});