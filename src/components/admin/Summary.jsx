import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summury-components/Widget";
import axios from "axios";
import { url, setHeaders } from "../../features/api";
import Chart from "./summury-components/Chart";
import Transactions from "./summury-components/Transactions";
import AllTimeData from "./summury-components/AllTimeData";

const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);
  const [earnings, setEarnings] = useState([]);
  const [earningsPerc, setEarningsPerc] = useState(0);
  
  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());

        res.data.sort(compare);
        setUsers(res.data);
        setUsersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());

        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());

        res.data.sort(compare);
        setEarnings(res.data);
        setEarningsPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 245)",
      bgColor: "rgba(38, 198, 245, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: earnings[0]?.total ? earnings[0]?.total / 100 : 0,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: earningsPerc,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overwiew>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month.</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overwiew>
        <Chart/>
      </MainStats>
      <SideStats>
        <Transactions />
        <AllTimeData />
      </SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overwiew = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: felx;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
