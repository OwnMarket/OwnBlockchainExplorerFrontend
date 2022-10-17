// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: true,
  appContext: 'explorer',
  version: env.npm_package_version,
  serverUrl: '<<EXPLORER_API_URL>>',
  localizationUrl: 'https://platform-api.weown.com/translations',
  ethExplorerUrl: '<<ETH_EXPLORER_API_URL>>',
  bscExplorerUrl: '<<BSC_EXPLORER_API_URL>>',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'de'],
};
