export const getRootElement = (id: string): HTMLElement =>
  (document.getElementById(id) as HTMLElement) ??
  (() => {
    throw new Error(`#${id} missing or not an HTMLElement!`);
  })();
