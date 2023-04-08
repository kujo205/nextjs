import { FC } from "react";
import { DummyEvent } from "../../../data/dummy-data";
import { EventItem } from "./EventItem";
import styles from './EventList.module.css';


export const EventsList: FC<{ events: DummyEvent[] }> = ({ events }) => {
  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};
