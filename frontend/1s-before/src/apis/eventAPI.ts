import axios, { isAxiosError } from 'axios';

const URL = 'http://localhost:8080/api/v1/participations';

export const postParticipation = async (eventId: number) => {
  const memberId = 1;
  try {
    const response = await axios.post(URL, { eventId, memberId });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.message);
    }
  }
};
