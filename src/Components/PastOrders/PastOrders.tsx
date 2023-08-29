import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../Context/UserContext";
import { UserContextState } from "../../Types/User";
import { Receipt } from "../../Types/Receipt";
import ReceiptCard from "../ReceiptCard/ReceiptCard";
import NoPastOrder from "../NoPastOrder/NoPastOrder";

import styled from "styled-components";

const Container = styled.div`
  width: 600px;
`;

const PastOrders: React.FC = () => {
  const { currentUser, updateCurrentUser } = useContext(
    Context
  ) as UserContextState;

  const [receiptData, setReceiptData] = useState<Receipt[]>([]);

  async function getReceipts() {
    try {
      const { data } = await axios.get<Receipt[]>(
        process.env.REACT_APP_URL+"/receipts/readuser",
        {
          headers: { "Acces-Control-Allow-Origin": "*" },
          params: { id: currentUser.userId },
        }
      );
      setReceiptData(data);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error message: ", error.message);
        return error.message;
      } else {
        console.log("Unexpected error: ", error);
        return "An unexptected error occurred";
      }
    }
  }

  useEffect(() => {
    getReceipts();
  }, []);

  let user = localStorage.getItem("curUserI");

  return (
    <Container>
      {receiptData.length !== 0 ? (
        receiptData.map((receipt) => {
          if (currentUser.userId.toString() === user) {
            return (
              <ReceiptCard
                key={receipt.receiptNumber}
                items={receipt.items}
                userId={receipt.userId}
                receiptNumber={receipt.receiptNumber}
                dateTime={receipt.dateTime}
                total={Math.round(receipt.total * 100) / 100}
              />
            );
          }
        })
      ) : (
        <NoPastOrder />
      )}
    </Container>
  );
};

export default PastOrders;
