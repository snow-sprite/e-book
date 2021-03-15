const ua = navigator.userAgent.toLowerCase();
export const isWeixin = () => {
  const reg = new RegExp(/MicroMessenger/i);
  return reg.test(ua);
};
export const isMobile = () => {
  const agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPod',
    'iPad'
  ];
  for (let i = 0; i < agents.length; i++) {
    if (ua.indexOf(agents[i].toLowerCase()) >= 0) return true;
  }
  return false;
};

export const isSmallSize = () => {
  return (document.body || document.documentElement).clientWidth < 580;
};

export default {
  isWeixin,
  isMobile,
  isSmallSize
};
