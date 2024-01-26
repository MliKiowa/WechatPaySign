const crypto = require('crypto');
const mchid = '16418XXXXX';
const serial_no = '1CF307154EXXX3637A17XXX90CD1EFB9XXXX';
const cert =`-----BEGIN PRIVATE KEY-----
XXXXX
-----END PRIVATE KEY-----`
function createRandomString(len) {
  const data = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let str = "";
  for (let i = 0; i < len; i++) {
    str += data.charAt(Math.floor(Math.random() * data.length));
  }
  return str;
}

function createSign(method, url, timestamp, nonce_str, data, cert) {
  const signStr = `${method}\n${url}\n${timestamp}\n${nonce_str}\n${data}\n`;
  console.log(signStr);
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signStr);
  return sign.sign(cert, 'base64');
}

function createAuthorizationHeader(method, url, mchid, order, cert, serial_no) {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const nonce_str = createRandomString(32);
    const signature = createSign(method, url, timestamp, nonce_str, order, cert);
    return `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonce_str}",timestamp="${timestamp}",signature="${signature}",serial_no="${serial_no}"`;
  }
  

  const method = 'POST';
  const url = '/v3/pay/transactions/native';
  const order = ""; 
  const authHeader = createAuthorizationHeader(method, url, mchid, order, cert, serial_no);
  console.log(authHeader);
