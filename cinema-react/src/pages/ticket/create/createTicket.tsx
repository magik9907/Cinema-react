import React from "react";
import TicketEditor from "../../../components/ticketEditor/ticketEditor";

export default function CreateTicket(): JSX.Element {
    const url = `${process.env.REACT_APP_BACKEND}/api/ticket`;
    return <TicketEditor fetchMethod="POST" seans={''}/>;
  }