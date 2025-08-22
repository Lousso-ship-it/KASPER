import { base44 } from './base44Client';


export const Dataset = base44.entities.Dataset;

export const Analysis = base44.entities.Analysis;

export const Task = base44.entities.Task;

if (!Task.schedule) {
  Task.schedule = async (id, data) => {
    const { serverUrl, appId } = base44.getConfig();
    const token = typeof window !== 'undefined' ? localStorage.getItem('base44_access_token') : null;

    const response = await fetch(
      `${serverUrl}/api/apps/${appId}/entities/Task/${id}/schedule`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to schedule task: ${response.statusText}`);
    }

    return response.json();
  };
}

export const Document = base44.entities.Document;

export const BrokerConnection = base44.entities.BrokerConnection;

export const TradingBot = base44.entities.TradingBot;



// auth sdk:
export const User = base44.auth;