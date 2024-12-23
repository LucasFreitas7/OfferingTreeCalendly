import styles from "./page.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Fade, CircularProgress } from "@mui/material";
import useSchedulingController from "./scheduling.controller";
import dayjs from "dayjs";

export default function SchedulingView({ onNext }: { onNext: (formattedDate: string) => void }) {
  const {
    selectedDate,
    isDateValid,
    handleDateChange,
    formatSelectedDate,
    availableTimesForSelectedDate,
    loading,
    handleMonthChange,
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
  } = useSchedulingController({ onNext });

  return (
    <div className={styles.test}>
      {currentStep === 1 && (
        <div className={selectedDate ? styles.date_main : styles.date_center}>
          <div>
            {loading ? (
              <div className={styles.date_calendar}>
                <div className={styles.loading}>
                  <CircularProgress />
                </div>
              </div>
            ) : (
              <div className={styles.date_calendar}>
                <h3 className={styles.date_title}>Select a Date & Time</h3>
                {isClient && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={selectedDate}
                      shouldDisableDate={(date) => !isDateValid(date)}
                      onChange={handleDateChange}
                      onMonthChange={handleMonthChange}
                    />
                  </LocalizationProvider>
                )}
              </div>
            )}
          </div>

          {isClient && selectedDate && !loading && (
            <>
              <div className={styles.date_hour}>
                <p className={styles.text_date}>{formatSelectedDate(selectedDate)}</p>
                <div className={styles.date_buttons}>
                  {availableTimesForSelectedDate.map((time, index) => (
                    <div key={index}>
                      {nextButtonVisibleIndex === index ? (
                        <Fade in={true} timeout={500}>
                          <div className={styles.inline_buttons}>
                            <Button
                              variant="contained"
                              style={{
                                marginBottom: "8px",
                                backgroundColor: "gray",
                                width: "10vh",
                                height: "5vh",
                              }}
                              size="small"
                            >
                              {dayjs(time).format("HH:mm")}
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                marginBottom: "8px",
                                marginLeft: "4vh",
                                backgroundColor: "blue",
                                width: "10vh",
                              }}
                              onClick={handleNextClick}
                            >
                              Next
                            </Button>
                          </div>
                        </Fade>
                      ) : (
                        <Button
                          variant="outlined"
                          size="large"
                          style={{ marginBottom: "8px", width: "24vh" }}
                          onClick={() => handleTimeClick(index)}
                        >
                          {dayjs(time).format("HH:mm")}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className={styles.form_container}>
          <h2>Enter Details</h2>
          <p className={styles.input_name}>Name *</p>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className={styles.input_name}>Email *</p>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!showGuestInput && (
            <Button
              variant="outlined"
              color="primary"
              className={styles.add_guests_button}
              onClick={() => setShowGuestInput(true)}
            >
              Add Guests
            </Button>
          )}

          {showGuestInput && (

            <>
              <p className={styles.input_name}>Guests Email(s)</p>
              <TextField
                variant="outlined"
                multiline
                rows={5}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                helperText="You can add up to 10 emails, separated by commas."
              />
            </>
          )}

          <div className={styles.terms}>
            By proceeding, you confirm that you have read and agree to
            <a href="#"> Calendly's Terms of Use</a> and
            <a href="#"> Privacy Notice</a>.
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleEvent}
            className={styles.schedule_button}
          >
            Schedule Event
          </Button>
        </div>
      )}

    </div>
  );
}
