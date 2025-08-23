import { createEntity } from './client';

export const Dataset = createEntity('datasets');
export const Analysis = createEntity('analyses');
export const Task = createEntity('tasks');
export const Document = createEntity('documents');
export const BrokerConnection = createEntity('broker-connections');
export const TradingBot = createEntity('trading-bots');

export const User = createEntity('users');
