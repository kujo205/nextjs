import { FormEvent,useRef } from "react";
import { Button } from "../ui/Button";
import styles from "./EventsSearch.module.css";
interface SearchForm{
    onSubmit:(yaer:number,month:number)=>void;
}


export const SearchForm:React.FC<SearchForm> = ({onSubmit}) => {
    const yearRef=useRef<HTMLSelectElement>(null);
    const monthRef=useRef<HTMLSelectElement>(null);




    const submitHandler=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const year=yearRef.current?.value;
        const month=monthRef.current?.value;
        if(year&&month)
        onSubmit(+year,+month);
    }



  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Select a year</label>
          <select id="year" ref={yearRef}>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
      <div>
        <div className={styles.control}>
          <label htmlFor="month">Select a month</label>
          <select id="month" ref={monthRef}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button> Select </Button>
    </form>
  );
};
