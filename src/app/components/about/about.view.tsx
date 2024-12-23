"use client";
import styles from "../about/page.module.css";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VideocamIcon from "@mui/icons-material/Videocam";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';

interface AboutProps {
  name: string;
  imageSrc: string;
  scheduleText: string;
  timezoneText: string;
}

export default function About({ name, imageSrc, scheduleText, timezoneText }: AboutProps) {
  return (
    <div className={styles.about}>
      <Image
        src={imageSrc}
        alt={`Photo of ${name}`}
        width={60}
        height={60}
        style={{ borderRadius: "50%" }}
      />
      <p>{name}</p>
      <h1>30 minute Interview</h1>
      <div className={styles.about_details}>
        <div className={styles.about_icon}>
          <AccessTimeIcon className={styles.icons} />
          <p className={styles.text_icon}>30 min</p>
        </div>
        <div className={styles.about_icon}>
          <VideocamIcon className={styles.icons} />
          <p className={styles.text_icon}>
            Web conferencing details provided upon confirmation
          </p>
        </div>
        {scheduleText !== "" && (
          <>
            <div className={styles.about_icon}>
              <CalendarTodayIcon className={styles.icons} />
              <p className={styles.text_icon}>{scheduleText}</p>
            </div>
            <div className={styles.about_icon}>
              <PublicIcon className={styles.icons} />
              <p className={styles.text_icon}>
                {timezoneText}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
