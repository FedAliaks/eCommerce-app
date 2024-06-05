export default function toggleBodyNotScrollable(): void {
  const html = document.querySelector('html');
  html?.classList.toggle('no-scroll');
}
