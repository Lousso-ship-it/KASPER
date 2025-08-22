import { base44 } from './base44Client';

export const Dataset = base44.entities.Dataset;

export const Analysis = base44.entities.Analysis;

export const Task = base44.entities.Task;

const { Document: BaseDocument, DocumentVersion } = base44.entities;

export { DocumentVersion };

export const Document = {
  ...BaseDocument,
  async update(id, data) {
    try {
      const previous = BaseDocument.retrieve
        ? await BaseDocument.retrieve(id)
        : (await BaseDocument.list()).find(doc => doc.id === id);
      if (previous) {
        await DocumentVersion.create({ document: id, data: previous });
      }
    } catch (error) {
      console.error('Failed to archive document version', error);
    }
    return BaseDocument.update(id, data);
  }
};

export const BrokerConnection = base44.entities.BrokerConnection;

export const TradingBot = base44.entities.TradingBot;

// auth sdk:
export const User = base44.auth;
