export async function getIp() {
  const data = await fetch('https://www.cloudflare.com/cdn-cgi/trace')
  const response = await data.text()
  const json = Object.fromEntries(
    response
      .trim()
      .split('\n')
      .map(line => line.split('='))
  )
  return json.ip
}

export function checkIfImageExists(url: string, callback: (exists: boolean) => void) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
};

// checkIfImageExists('http://website/images/img.png', (exists) => {
//   if (exists) {
//     // Success code
//   } else {
//     // Fail code
//   }
// });