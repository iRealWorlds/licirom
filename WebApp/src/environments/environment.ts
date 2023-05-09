import {EnvironmentConfig} from '@licirom/core/environment/environment-config.model';

const configuration = new EnvironmentConfig();
configuration.production = false;
configuration.api.baseUri = 'http://127.0.0.1:8001';

export const environment = configuration;
