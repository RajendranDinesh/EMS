import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SweetAlert } from "./SweetAlert";
import Cookies from "js-cookie";
import axios from "axios";

const PaymentSuccessUser = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { id } = useParams();
    const authToken = Cookies.get('authToken');

    useEffect(() => {
    async function intimatePayment() {
        try{
        const response = await axios.get(`${API_URL}/event/user/payment/success/${id}`,
        { headers: {'Bypass-Tunnel-Reminder': 'eventaz', Authorization: `Bearer ${authToken}`} }
        );
        if (response.status === 200)
        {
            window.location.href = `/event/${id}`;
        }
        } catch (error) {
            await SweetAlert({
                title: "Error",
                children: error.response.data.message,
                icon: "error"
            });
        }
    }
    intimatePayment();
}, [API_URL, id, authToken]);
    return (
        <>
        </>
    )
}

const PaymentSuccessTeam = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { id, teamname } = useParams();
    const authToken = Cookies.get('authToken');

    useEffect(() => {
        async function intimatePayment () {
            try{
        const response = await axios.get(`${API_URL}/event/team/payment/success/${id}/${teamname}`,
        { headers: {'Bypass-Tunnel-Reminder': 'eventaz', Authorization: `Bearer ${authToken}`} }
        );
        console.log(response)
        if (response.status === 200)
        {
            window.location.href = `/event/${id}`;
        }
        } catch (error) {
            await SweetAlert({
                title: "Error",
                children: error.response.data.message,
                icon: "error"
            });
        }}

        intimatePayment();
    }, [API_URL, id, authToken]);
    return (
        <>
        </>
    )
}

const PaymentCancelled = () => {
    const { id } = useParams();

    useEffect(async () => {
        await SweetAlert({
            title: "Payment Cancelled",
            children: "The Payment was Cancelled. You will be redirected to the event page.",
            icon: "error"
        }).then(() => {
            window.location.href = `/event/${id}`;
        });
    });
    return (
        <>
        </>
    )
}

export { PaymentSuccessUser, PaymentCancelled, PaymentSuccessTeam };