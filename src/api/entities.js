import { base44 } from './base44Client';

export const Dataset = base44.entities.Dataset;

export const Analysis = base44.entities.Analysis;

export const Task = base44.entities.Task;

export const Document = base44.entities.Document;

export const BrokerConnection = base44.entities.BrokerConnection;

export const TradingBot = base44.entities.TradingBot;

// auth sdk:
export const User = {
  ...base44.auth,
  role: {
    ADMIN: 'admin',
    USER: 'user',
  },
};
