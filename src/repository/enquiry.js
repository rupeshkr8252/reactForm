import { api } from "./api";

const enquireEndpoint = 'form/';

export const enquiry = async ({data, onSuccess, onError}) => {
  try {
    const response = await api.post(enquireEndpoint, data);
    if(onSuccess) onSuccess(response);
    
  } catch (err) {
    console.error(err);
    if(onError) onError(err);
    throw new Error('Error submitting form data');
  }
};