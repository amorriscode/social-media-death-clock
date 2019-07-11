document.addEventListener('DOMContentLoaded', () => {
  const datePicker = document.querySelector('#birthdate');

  const clockContainer = document.querySelector('.container .clock');
  const backButton = document.querySelector('#back');

  const settingsContainer = document.querySelector('.container .settings');
  const settingsButton = document.querySelector('#settings');

  chrome.storage.sync.get(['birthdate'], ({ birthdate }) => {
    if (birthdate) {
      datePicker.value = birthdate;
      settingsContainer.style.setProperty('display', 'none');
    } else {
      clockContainer.style.setProperty('display', 'none');
    }
  });

  settingsButton.addEventListener('click', () => {
    clockContainer.style.setProperty('display', 'none');
    settingsContainer.style.setProperty('display', 'block');

  });

  backButton.addEventListener('click', () => {
    settingsContainer.style.setProperty('display', 'none');
    clockContainer.style.setProperty('display', 'block');

  });

  datePicker.addEventListener('change', () => {
    chrome.storage.sync.set({ birthdate: datePicker.value }, () => {
      console.log(`Birthdate updated to ${datePicker.value}`);
    });
  });
});