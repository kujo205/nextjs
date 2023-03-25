import { DummyData } from "../../../data/dummy-data";
import { FC } from "react";
import {Button} from "../ui/Button";
import styles from './EventItem.module.css';
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";



export const EventItem: FC<{ event: DummyData }> = ({ event }) => {

    const humanReadableDate=new Date(event.date)
    .toLocaleDateString('en-UA',{
        day:'numeric',
        month:'long',
        year:'numeric'
    });

    const formattedAddress=event.location.replace(', ','\n');

    console.log(formattedAddress)
    


  return (
    <li className={styles.item}>
        <img src={'/'+event.image}/>
        <div className={styles.content}>
            <div className={styles.summary}>
                <h2>
                    {event.title}
                </h2>
                <div className={styles.date}>
                    <DateIcon/>
                    <time>
                        {humanReadableDate}
                    </time>
                </div>
                <div  className={styles.address}>
                    <AddressIcon/>
                    <address>
                        {formattedAddress}
                    </address>
                </div>
            </div>
            <div className={styles.actions}>
                <Button href={`/events/${event.id}`}>
                   <span>
                    Explore Event
                    </span>
                    <span className={styles.icon}>
                        <ArrowRightIcon/>
                    </span> 
                </Button>
            </div>
        </div>
    </li>
  );
};
