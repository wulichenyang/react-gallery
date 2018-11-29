// 封装cookie的操作

function getCookie(key) {
  if (document.cookie) {
    let cookieArr = document.cookie.split('; ');
    for (let i = 0; i < cookieArr.length; i++) {
      let keyArr = cookieArr[i].split("=");
      if (keyArr[0] === key) {
        return decodeURI(keyArr[1])
        break
      }
    }
  } else {
    return ''
  }
}

function setCookie(name, val, hour) {
  let day = hour / 24;
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + day);
  document.cookie = `${name}=${encodeURI(val)}; expires=${expireDate.toGMTString()}`;
}

function removeCookie(name) {
  setCookie(name, "", -24);
}

const cookie = {
  setCookie,
  getCookie,
  removeCookie
};

export default cookie