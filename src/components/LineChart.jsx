import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    let options;
    if (timePeriod === "3h" || timePeriod === "24h") {
      options = { hour: "numeric", minute: "numeric", hour12: true };
    } else {
      options = { month: "numeric", day: "numeric", year: "numeric" };
    }

    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleString(
        "en-US",
        options
      )
    );
  }

  coinPrice.reverse();
  coinTimestamp.reverse();

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change:{" "}
            <span className="colored-title">{coinHistory?.data?.change}%</span>
          </Title>
          <Title level={5} className="current-price">
            Current{" "}
            <span className="colored-title">
              {coinName} Price: ${currentPrice}
            </span>
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
