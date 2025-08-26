//@ts-ignore
function getBrowserAndOS(userAgent) {
  let browser = "Unknown";
  let os = "Unknown";

  if (/chrome|crios|crmo/i.test(userAgent)) {
    browser = "Chrome";
  } else if (/firefox|fxios/i.test(userAgent)) {
    browser = "Firefox";
  } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
    browser = "Safari";
  } else if (/edg/i.test(userAgent)) {
    browser = "Edge";
  } else if (/msie|trident/i.test(userAgent)) {
    browser = "Internet Explorer";
  }

  if (/windows/i.test(userAgent)) {
    os = "Windows";
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    os = "Mac OS";
  } else if (/linux/i.test(userAgent)) {
    os = "Linux";
  } else if (/android/i.test(userAgent)) {
    os = "Android";
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = "iOS";
  }

  return { browser, os };
}

export function getUserDetails() {
  const platform = navigator.platform;
  const {browser, os} = getBrowserAndOS(navigator.userAgent);
  const language = navigator.language;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const cpuClass = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : "unknown";
  //@ts-ignore
  const memory = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : "unknown";
  const nowString = new Date().toDateString()
  const nowTime = new Date().toTimeString();
  return [
    { label: 'OS', value: os },
    { label: 'Browser', value: browser },
    { label: 'Kernel', value: 'Browser/JS' },
    { label: 'Language', value: language },
    { label: 'Resolution', value: `${screenWidth}x${screenHeight}` },
    { label: 'CPU', value: cpuClass },
    { label: 'Memory', value: memory },
    { label: 'Date', value: nowString },
    { label: 'Time', value: nowTime }
  ];
}

//@ts-ignore
export function formatUptime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const parts = [];
    if (days) parts.push(`${days} day${days>1?'s':''}`);
    if (hours || days) parts.push(`${hours} hour${hours!==1?'s':''}`);
    if (mins || hours || days) parts.push(`${mins} min${mins!==1?'s':''}`);
    parts.push(`${secs} sec${secs!==1?'s':''}`);
    return parts.join(', ');
  }