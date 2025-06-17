import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import chackIcon from "../../assets/check-icon.svg";
import jobMonitoringImg from "../../assets/job-monitoring-img.svg";
import { API_URL } from "../../constants";
import { Chart as ChartType } from "chart.js";
import { Button, ButtonProps } from "@mui/material";
import { styled } from '@mui/system';
import { useAuth } from "../../hooks/useAuth";
import axiosInstance from "../../services/axiosInstance";

type CustomButtonProps = ButtonProps & {
    component?: React.ElementType;
    href?: string;
    target?: string;
};

const CustomButtonFilled = styled(Button)<CustomButtonProps>(({ theme }) => ({
    background: "linear-gradient(90deg, #00AEEF 0%, #16D3F0 100%)",
    width: "100%",
    borderRadius: "4px",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "100%",
    letterSpacing: "3%",
    textTransform: "capitalize",
    height: "29px"
}));

export default function Dashboard() {
    // Type the ref for the canvas element
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    // Type the ref for the chart instance
    const chartInstanceRef = useRef<ChartType | null>(null);
    const [usageData, setUsageData] = useState<{ date: string, count: number }[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchUsageData = async () => {
            try {
                const { status, data } = await axiosInstance.get("/api/v1/history/usage/last7days");
                if (status === 200) {
                    setUsageData(data);
                }
            } catch (error) {
                console.error("Failed to fetch usage data", error);
            }
        };
        fetchUsageData();
    }, []);

    useEffect(() => {
        if (chartRef.current && usageData.length > 0) {
            const ctx = chartRef.current.getContext("2d");

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            if (ctx) {
                chartInstanceRef.current = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: usageData.map(d => d.date.slice(5)), // e.g. "03-23"
                        datasets: [
                            {
                                label: "Recommended",
                                type: 'line',
                                data: [5, 5, 5, 5, 5, 5, 5],
                                borderColor: "#00AEEF",
                                backgroundColor: "#00AEEF",
                                fill: false,
                                borderDash: [14, 14],
                                pointRadius: 0,
                            },
                            {
                                label: "Proposals Submitted",
                                data: usageData.map(d => d.count),
                                backgroundColor: "#00AEEF",
                                borderColor: "#00AEEF",
                                order: 2,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            x: { display: false },
                            y: { beginAtZero: false, max: 6 },
                        },
                    },
                });
            }
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [usageData]);

    return (
        <>
            <div>
                <div className="dashboardPageHeader">
                    <h1 className="dashboardPageTitle">Dashboard</h1>
                    <div className="proposalLeftWrapper">
                        <p className="proposalLeftText">{user?.proposalLeft} proposals left</p>
                    </div>
                </div>
                <div className="sectionWrapper">
                    <h2 className="secondHeading">Proposals Usage</h2>
                    <p className="secondHeadingPara">Proposals used in cover letters in the last 7 days.</p>
                    <canvas ref={chartRef} id="proposalsChart"></canvas>
                    <p className="secondHeadingPara text-center mb-3">Dashed line shows recommended activity</p>
                    <CustomButtonFilled target="_blank" href={`${API_URL}/history`} variant="contained" className="dashboardButton">
                        View Proposals
                    </CustomButtonFilled>
                </div>
                <div className="sectionWrapper">
                    <h2 className="secondHeading">Update Your AI Profile</h2>
                    <p className="secondHeadingPara">Make sure you add as much detail as possible to your profile in PouncerAi. It will make your proposal better.</p>
                    <ul className="dashboardList">
                        <li className="dashboardListItem">
                            <div className="dashboardListIcon">
                                <img src={chackIcon} alt="check icon" />
                            </div>
                            Add Profile Overview
                        </li>
                        <li className="dashboardListItem">
                            <div className="dashboardListIcon">
                                <img src={chackIcon} alt="check icon" />
                            </div>
                            Add Project Experience
                        </li>
                        <li className="dashboardListItem">
                            <div className="dashboardListIcon">
                                <img src={chackIcon} alt="check icon" />
                            </div>
                            Add Portfolio Links
                        </li>
                    </ul>
                    <CustomButtonFilled target="_blank" href={`${API_URL}/profiles`} variant="contained" className="dashboardButton">
                        Update Profile Now
                    </CustomButtonFilled>
                </div>
                <div className="sectionWrapper">
                    <h2 className="secondHeading">Start Job Monitoring</h2>
                    <p className="secondHeadingPara">Start monitoring jobs and get notified when new jobs are posted.</p>
                    <img src={jobMonitoringImg} alt="job monitoring" className="jobMonitoringImg" />
                    <CustomButtonFilled variant="contained">
                        Start Monitoring Jobs
                    </CustomButtonFilled>
                </div>
            </div>
        </>
    );
}