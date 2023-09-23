import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./analytics.module.css";
import PieC from "./pie.js";
import { useParams } from 'react-router';
import axios from "axios";

const AppContainer = styled.div`
    background-color: #1f253d;
    color: #ffffff;
    width: 100vw,
    height: 100vh;
    display: flex;
`

const MainContainer = styled.div`
    display: flex;
    min-height: 100vh;
 `;

const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;

    width: 100vw;
    height: 100vh;
`;

const DetailLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50vw;
    height: 100%
`;

const DetailRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    width: 50vw;
    height: 100%
`;

const PieChart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 100em;
    width: 35vw;
    height: 62vh;
`;

const Analytics = () => {

    const { id } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const [eventData, setEventData] = useState({});

    const [data, setData] = useState({
        labels: ['Views', 'Registered', 'Active'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
              'rgb(255, 99, 133)',
              'rgb(54, 162, 236)',
              'rgba(255, 206, 87)'
            ],
            borderWidth: 1,
          },
        ],
      });

    useEffect(() => {
        document.title = "Analytics | Haxguz";

        async function getData() {
            try {
                const response = await axios.get(`${API_URL}/event/analysis/${id}`, {
                  headers: { 'Bypass-Tunnel-Reminder': 'eventaz' },
                });
        
                const eventData = response.data.data;
        
                // Update the data state with the received data
                setData({
                  labels: ['Views', 'Registered', 'Active'],
                  datasets: [
                    {
                      label: 'Count ',
                      data: [
                        eventData.views,
                        eventData.registrations,
                        eventData.participations,
                      ],
                      backgroundColor: [
                        'rgb(255, 99, 133)',
                        'rgb(54, 162, 236)',
                        'rgba(255, 206, 87)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                });

                setEventData(eventData);
                console.log(eventData);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
    }
    getData();
}, [API_URL, id]);

    return (
        <>
        <AppContainer>
            <MainContainer>
                <DetailContainer>
                    <DetailLeft>
                        <div className={styles.cards}>
                            <div className={`${styles.card} ${styles.red}`} style={{"backgroundColor":"rgb(255, 99, 133)"}}>
                                <p className={styles.tip}>Attractions</p>
                                <p className={`${styles.second_text}`}>{eventData.views}</p>
                            </div>
                            <div className={`${styles.card} ${styles.red}`} style={{"backgroundColor":"rgb(54, 162, 236)"}}>
                                <p className={styles.tip}>Registered Users</p>
                                <p className={`${styles.second_text}`}>{eventData.registrations}</p>
                            </div>
                            <div className={`${styles.card} ${styles.red}`} style={{"backgroundColor":"rgba(255, 206, 87)"}}>
                                <p className={styles.tip}>Participated Users</p>
                                <p className={`${styles.second_text}`}>{eventData.participations}</p>
                            </div>
                            <div className={`${styles.card} ${styles.red}`}>
                                <p className={styles.tip}>Total Amount Collected</p>
                                <p className={`${styles.second_text}`}>{eventData.amount}</p>
                            </div>
                        </div>
                    </DetailLeft>
                    <DetailRight>
                        <PieChart>
                            <PieC data={data}/>
                        </PieChart>
                    </DetailRight>
                </DetailContainer>
            </MainContainer>
        </AppContainer>
        </>
    );
}

export default Analytics;