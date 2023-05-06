import { Contacts } from "@/components/pages/Contacts";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Send me ypur messages"/>
      </Head>
      <Contacts />
    </>
  );
};
export default ContactPage;
