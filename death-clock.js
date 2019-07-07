const SECONDS_IN_MILLISECONDS = 1000;
const MINUTES_IN_MILLISECONDS = SECONDS_IN_MILLISECONDS * 60;
const HOURS_IN_MILLISECONDS = MINUTES_IN_MILLISECONDS * 60;
const DAYS_IN_MILLISECONDS = HOURS_IN_MILLISECONDS * 24;

let birthYear;
let birthMonth;
let birthDay;
chrome.storage.sync.get(['birthdate'], ({ birthdate }) => {
  if (birthdate) {
    [birthYear, birthMonth, birthDay] = birthdate.split('-');
  }
});

let socialMediaPlatform;
switch(true) {
  case window.location.href.includes('twitter'):
    socialMediaPlatform = 'twitter';
    break;
  case window.location.href.includes('facebook'):
    socialMediaPlatform = 'facebook';
    break;
  case window.location.href.includes('youtube'):
    socialMediaPlatform = 'youtube';
    break;
  case window.location.href.includes('instagram'):
    socialMediaPlatform = 'instagram';
    break;
  default:
    socialMediaPlatform = 'none';
    break;
}

const socialMediaTargetClasses = {
  twitter: 'a[aria-label="Twitter"]',
  facebook: 'a[title="Go to Facebook home"]',
  youtube: '#logo',
  instagram: 'a[href="/"]',
  none: '.insert-death-clock'
};

const startDeathClock = () => {
  target.id = `death-clock-${socialMediaPlatform}`;
  
  const averageHumanExpiryAge = 80;
  // JavaScript months start at 0
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const expectedDeath = new Date(birthDate.getFullYear() + averageHumanExpiryAge, birthDate.getMonth(), birthDate.getDate());
  
  const addCommansToNumber = (number) => {
    const reverseNumber = number
      .toString()
      .split('')
      .reverse();
  
    if (reverseNumber.length > 3) {
      for (i = 3; i < reverseNumber.length; i += 3) {
        reverseNumber[i] = `${reverseNumber[i]},`
      }
    }
  
    return reverseNumber.reverse().join('');
  }
  
  const tickTock = () => {
    let deathClock = `
      <div>SET YOUR BIRTHDATE!</div>
    `;

    if (birthYear && birthDay && birthMonth) {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1);
      const nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1);
      
      const timeUntilTomorrow = Math.abs(now.getTime() - tomorrow.getTime());
      const timeUntilNextHour = Math.abs(now.getTime() - nextHour.getTime());
      const timeUntilNextMinute = Math.abs(now.getTime() - nextMinute.getTime());
      const timeUntilExpiry = Math.abs(expectedDeath.getTime() - now.getTime());
    
      const daysUntilExpiry = Math.ceil(timeUntilExpiry / DAYS_IN_MILLISECONDS);
      const hoursUntilTomorrow = Math.ceil(timeUntilTomorrow / HOURS_IN_MILLISECONDS);
      const minutesUntilNextHour = Math.ceil(timeUntilNextHour / MINUTES_IN_MILLISECONDS);
      const secondsUntilNextMinute = Math.ceil(timeUntilNextMinute / SECONDS_IN_MILLISECONDS) - 1;
    
      const daysToDisplay = addCommansToNumber(daysUntilExpiry);
      const secondsToDisplay = (secondsUntilNextMinute.toString().length === 1)
        ? `0${secondsUntilNextMinute}`
        : secondsUntilNextMinute; 
      
      deathClock = `
        <div class="days-until-expiry">${daysToDisplay} days</div>
        <div class="time-until-expiry">${hoursUntilTomorrow}:${minutesUntilNextHour}:${secondsToDisplay}</div>
      `;
    }

    // Chrome Extension popup doesn't like emojis
    const skull = (socialMediaPlatform !== 'none') ? '☠️' : '';
    const makeThemCount = (socialMediaPlatform === 'none') ? '<br/><div>Make every day count!</div>' : '';

    target.innerHTML = `
        <div class="social-media-death-clock">
          <div class="skull-emoji">${skull}</div>
          <div class="death-clock">
            ${deathClock}
            ${makeThemCount}
          </div>
        </div>
      `;
  }

  window.setInterval(() => tickTock(), 1000);
}

let target;
const findTarget = setInterval(() => {
  target = document.querySelector(socialMediaTargetClasses[socialMediaPlatform]);
  if (target) {
    startDeathClock();
    clearInterval(findTarget);
  }
}, 1000);

