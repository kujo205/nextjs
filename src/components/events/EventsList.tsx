import { FC } from "react";
import { DummyData } from "../../../data/dummy-data";
import { EventItem } from "./EventItem";
import styles from './EventList.module.css';


export const EventsList: FC<{ events: DummyData[] }> = ({ events }) => {
  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};
