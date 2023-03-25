import { useRouter } from "next/router";
import { getEventById } from "../../../data/dummy-data";
import EventSummary from "../../components/events/event-detail/event-summary";
import EventLogistics from "../../components/events/event-detail/event-logistics";
import EventContent from "../../components/events/event-detail/event-content";

export default function Event() {
  const router = useRouter();

  const event = getEventById((router.query as { eventId: string }).eventId);

  if (!event) return <p>No event found!</p>;

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
