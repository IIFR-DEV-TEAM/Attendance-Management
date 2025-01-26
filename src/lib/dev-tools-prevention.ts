import { onMount } from 'svelte';

const preventDevTools = () =>{
  onMount(() => {
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('keydown', (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || // Ctrl+Shift+I or Ctrl+Shift+J
        (e.ctrlKey && e.key === 'U') || // Ctrl+U
        e.key === 'F12' // F12
      ) {
        e.preventDefault();
      }
    });
    const detectDevTools = () => {
      const threshold = 160;
      const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
      if (widthDiff > threshold || heightDiff > threshold) {
        return
      }
    };

    window.addEventListener('resize', detectDevTools);
    detectDevTools();
  });
}
export {preventDevTools}