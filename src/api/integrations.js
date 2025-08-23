import { callEndpoint } from './client';

export const InvokeLLM = (data) => callEndpoint('integrations/invoke-llm', data);
export const SendEmail = (data) => callEndpoint('integrations/send-email', data);
export const UploadFile = (data) => callEndpoint('integrations/upload-file', data);
export const GenerateImage = (data) => callEndpoint('integrations/generate-image', data);
export const ExtractDataFromUploadedFile = (data) => callEndpoint('integrations/extract-data', data);

export const Core = {
  InvokeLLM,
  SendEmail,
  UploadFile,
  GenerateImage,
  ExtractDataFromUploadedFile
};
