const SECONDS_IN_MILLISECONDS = 1000;
const MINUTES_IN_MILLISECONDS = SECONDS_IN_MILLISECONDS * 60;
const HOURS_IN_MILLISECONDS = MINUTES_IN_MILLISECONDS * 60;
const DAYS_IN_MILLISECONDS = HOURS_IN_MILLISECONDS * 24;

let socialMediaPlatform;
switch(true) {
  case window.location.href.includes('twitter'):
    socialMediaPlatform = 'twitter';
    break;

  default:
    socialMediaPlatform = 'twitter';
    break;
}

const socialMediaTargetClasses = {
  twitter: '.Icon--bird',
};

const target = document.querySelector(socialMediaTargetClasses[socialMediaPlatform]);

target.id = 'death-clock';
target.classList.add(socialMediaPlatform)

const averageHumanExpiryAge = 80;
const birthDate = new Date(1990, 4, 6);
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

  target.innerHTML = `
      <div class="days-until-expiry">${daysToDisplay} days</div>
      <div class="time-until-expiry">${hoursUntilTomorrow}:${minutesUntilNextHour}:${secondsToDisplay}</div>
    `;
}

window.setInterval(() => tickTock(), 1000);
