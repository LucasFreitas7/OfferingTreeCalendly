import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getAvailableTimes } from '../../services/appointmentService';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export default function useSchedulingController({ onNext }: { onNext: (formattedDate: string) => void }) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [previousMonth, setPreviousMonth] = useState<string | null>(null);
  const [availableTimesForSelectedDate, setAvailableTimesForSelectedDate] = useState<string[]>([]);
  const [nextButtonVisibleIndex, setNextButtonVisibleIndex] = useState<number | null>(null);
  const [allAvailableDates, setAllAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [guests, setGuests] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this effect runs only on the client
  }, []);

  const isDateValid = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      return allAvailableDates.includes(formattedDate);
    }
    return false;
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      const currentMonth = date.format("YYYY-MM");
      if (previousMonth !== currentMonth) {
        setPreviousMonth(currentMonth);
        fetchAvailableTimes(date);
      }
    }
  };

  const handleMonthChange = (date: Dayjs) => {
    setSelectedDate(null);
    const currentMonth = date.format("YYYY-MM");
  
    setPreviousMonth(currentMonth);
    fetchAvailableTimes(date);
  };
  

  const formatSelectedDate = (date: Dayjs | null) => {
    return date ? date.format("dddd, D [de] MMMM") : "";
  };

  const fetchAvailableTimes = async (date: Dayjs) => {
    setLoading(isFirstLoad);
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }

    try {
      const allTimes = await getAvailableTimes(date);

      // Filters the dates to consider only today or future dates
      const today = dayjs().startOf('day'); // Considers today's date without the time part
      const allDates = allTimes.map((time: string) => dayjs(time).format("YYYY-MM-DD"));
      const filteredDates = allDates.filter(date => dayjs(date).isSameOrAfter(today, 'day')); // Excludes past dates

      const uniqueDates = [...new Set(filteredDates)]; // Removes duplicate dates
      setAllAvailableDates(uniqueDates);

      // Filters the available times for the selected day
      const availableTimes = allTimes.filter((time: string) =>
        dayjs(time).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
      );
      setAvailableTimesForSelectedDate(availableTimes);

    } catch (error) {
      console.error("Error fetching available times:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeClick = (index: number) => {
    setNextButtonVisibleIndex(index);
  };

  const handleNextClick = () => {
    if (selectedDate && nextButtonVisibleIndex !== null) {
      const selectedTime = availableTimesForSelectedDate[nextButtonVisibleIndex];
      const startTime = dayjs(selectedTime);
      const formattedDate = `${startTime.format("HH:mm")} - ${startTime.add(30, "minute").format("HH:mm")}, ${startTime.format("dddd, MMMM D, YYYY")}`;
      onNext(formattedDate);
      setCurrentStep(2);
    }
  };

  const handleScheduleEvent = () => {
    const guestEmails = guests !== "" ? guests.split(",").map((email) => email.trim()) : [];

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert(`Invalid main email: ${email}`);
      return;
    }

    if (guestEmails.length > 0) {
      if (guestEmails.length > 10) {
        alert("You can only add up to 10 guests.");
        return;
      }

      for (const email of guestEmails) {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          alert(`Invalid guest email: ${email}`);
          return;
        }
      }
    }

    console.log("Scheduled Event:", { name, email, guests: guestEmails });
  };

  useEffect(() => {
    const today = dayjs();
    fetchAvailableTimes(today);
  }, []);

  return {
    selectedDate,
    isDateValid,
    handleDateChange,
    handleMonthChange,
    formatSelectedDate,
    availableTimesForSelectedDate,
    loading,
    handleTimeClick,
    nextButtonVisibleIndex,
    handleNextClick,
    currentStep,
    name,
    email,
    setName,
    setEmail,
    handleScheduleEvent,
    setShowGuestInput,
    showGuestInput,
    guests,
    setGuests,
    isClient
  };
}
