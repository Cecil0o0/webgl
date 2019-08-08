const ua = window.navigator.userAgent.toLowerCase();

function includes(ua: string, str: string) {
  return ua.indexOf(str) > -1;
}

export function isMobile(): string[] | [] {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

export function isIpad() {
  return includes(ua, 'ipad');
}
