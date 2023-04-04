import {EnvironmentConfig} from "../app/core/environment/environment-config.model";

const configuration = new EnvironmentConfig();
configuration.production = false;

export const environment = configuration;
