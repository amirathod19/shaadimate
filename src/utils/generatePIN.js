export default function generatePIN(length = 4) {
  let pin = "";

  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }

  return pin;
}