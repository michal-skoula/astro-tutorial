export function isExternal(currentUrl: string, baseHost: string): boolean {
  try {
    const urlHost = new URL(currentUrl).host;
    return !urlHost.includes(baseHost) && currentUrl.startsWith("http");
  } catch {
    return false;
  }
}
