export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://bellas-baskett.techafsb.chatgpt.site'
  ).replace(/\/$/, '');
}
