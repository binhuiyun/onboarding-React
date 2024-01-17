import React from "react";
import { useParams } from "react-router-dom";


import StatusComponent from "../../../../components/StatusComponent";


export default function RejectedApplications() {
  const { status } = useParams();
  return <StatusComponent status={status} />  

}
