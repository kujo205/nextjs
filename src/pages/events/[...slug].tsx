import { useRouter } from "next/router";
import { dateFilter, getFilteredEvents } from "../../../data/dummy-data";
import { EventsList } from "@/components/events/EventsList";
import ResultsTitle from "@/components/results-title/results-title";
import { Fragment } from "react";

export default function Event() {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filterObj: dateFilter = {
    year: +filteredData[0],
    month: +filteredData[1],
  };

  if (isNaN(filterObj.month) || isNaN(filterObj.year)) {
    return <p className="center">Something is wrong with your input</p>;
  }

  const events = getFilteredEvents(filterObj);

  if (events.length === 0) {
    return <p className="center">No events for this very filter!</p>;
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(filterObj.year,filterObj.month-1)}/>
      <EventsList events={events} />
    </Fragment>
  );
}
