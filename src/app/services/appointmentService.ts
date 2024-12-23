// services/appointmentService.ts
import axios from 'axios';
import dayjs from 'dayjs';

const getAvailableTimes = async (date: dayjs.Dayjs) => {
  const startOfMonth = date.startOf("month").format("YYYY-MM-DDT00:00:00");
  const endOfMonth = date.endOf("month").format("YYYY-MM-DDT23:59:59");

  const mockResponseName = getMockResponseName(date);

  try {
    const response = await axios.get(
      `https://5b94bbb0-4b84-4173-8753-c9b46c84fc76.mock.pstmn.io/appointment_availabilities/available_times`,
      {
        headers: { "x-mock-response-name": mockResponseName },
        params: {
          start_date_time: startOfMonth,
          end_date_time: endOfMonth,
        },
      }
    );
    return response.data?.data?.available_times || [];
  } catch (error) {
    console.error("Error fetching available times:", error);
    throw error;
  }
};

const getMockResponseName = (date: dayjs.Dayjs) => {
  const formattedMonth = date.format("MMMYYYY");
  const mockResponseNames = ["Dec2024", "Jan2025", "Feb2025"];
  return mockResponseNames.includes(formattedMonth) ? formattedMonth : "Default";
};

export { getAvailableTimes };
