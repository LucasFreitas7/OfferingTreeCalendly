"use client";

import { useParams } from "next/navigation";
import { people } from "../data/people";
import About from "../components/about/about.view";
import SchedulingView from "../components/scheduling/scheduling.view";
import styles from "../page.module.css";
import Image from "next/image";
import { useState } from "react";

export default function PersonPage() {
  const { id } = useParams();
  const [formattedDate, setFormattedDate] = useState<string>("");

  const handleFormattedDate = (formattedDate: string) => {
    setFormattedDate(formattedDate);
  };

  const person = id && people[id] ? people[id] : people["arvind"];

  return (
    <div>
      <div className={styles.home}>
        <div className={styles.info}>
          <div className={styles.image}>
            <Image
              src={person.logo}
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.about}>
            <About name={person.name} imageSrc={person.imageSrc} scheduleText={formattedDate} timezoneText="Brasilia Time" />
          </div>
        </div>
        <div className={styles.scheduling}>
          <SchedulingView onNext={handleFormattedDate} />
        </div>
      </div>
    </div>
  );
}
