import { PanelPlugin } from '@grafana/data';
import { ExternalIpPanel } from './ExternalIpPanel';
import { ExternalIpOptions } from './types';
import { DEFAULT_API_URL, DEFAULT_REFRESH_IN_MS } from './constants';

export const plugin = new PanelPlugin<ExternalIpOptions>(ExternalIpPanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'apiUrl',
      name: 'API URL',
      description: 'URL to the Listlist API.',
      settings: {
        placeholder: DEFAULT_API_URL,
      },
    })
    .addTextInput({
      path: 'refreshInMs',
      name: 'Refresh',
      description: 'Refresh in Milliseconds.',
      settings: {
        placeholder: DEFAULT_REFRESH_IN_MS.toString(),
      }
    });
});
