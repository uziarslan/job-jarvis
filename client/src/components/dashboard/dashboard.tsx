import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import chackIcon from "../../assets/check-icon.svg";
import jobMonitoringImg from "../../assets/job-monitoring-img.svg";
import { API_URL } from "../../constants";
import { Chart as ChartType } from "chart.js";
import { Button } from "@mui/material";

export default function Dashboard() {
    // Type the ref for the canvas element
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    // Type the ref for the chart instance
    const chartInstanceRef = useRef<ChartType | null>(null);

    useEffect(() => {
        // Ensure the canvas element exists
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            // Destroy the previous chart instance if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Initialize the new chart
            if (ctx) {
                chartInstanceRef.current = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: ["1", "2", "3", "4", "5", "6", "7"],
                        datasets: [
                            {
                                label: "",
                                data: [5, 5, 5, 5, 5, 5, 5],
                                borderColor: "rgb(0, 128, 0)",
                                backgroundColor: "rgba(0, 128, 0, 0.2)",
                                fill: false,
                                borderDash: [5, 5],
                                tension: 0.1,
                            },
                            {
                                label: "",
                                data: [1, 2, 3, 4, 2, 3, 5],
                                borderColor: "rgba(0, 128, 0, 0.5)",
                                fill: false,
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false, // Hide the legend
                            },
                        },
                        scales: {
                            x: {
                                display: false, // Hide x-axis labels since we removed the days array
                            },
                            y: {
                                beginAtZero: false,
                                max: 6,
                            },
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
    }, []);

    return (
        <>
            <div>
                <div className="dashboardPageHeader">
                    <h1 className="dashboardPageTitle">Dashboard</h1>
                    <div className="proposalLeftWrapper">
                        <p className="proposalLeftText">10 proposals left</p>
                    </div>
                </div>
                <div className="p-2 mb-3">
                    <h2 className="secondHeading">Proposals Usage</h2>
                    <p className="secondHeadingPara">Proposals used in cover letters in the last 7 days.</p>
                    <canvas ref={chartRef} id="proposalsChart"></canvas>
                    <p className="secondHeadingPara text-center mb-3">Dashed line shows recommended activity</p>
                    <Button target="_blank" href={`${API_URL}/history`} variant="contained" className="dashboardButton">
                        View Proposals
                    </Button>
                </div>
                <div className="p-2 mb-3">
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
                    <Button target="_blank" href={`${API_URL}/profiles`} variant="contained" className="dashboardButton">
                        Update Profile Now
                    </Button>
                </div>
                <div className="p-2">
                    <h2 className="secondHeading">Start Job Monitoring</h2>
                    <p className="secondHeadingPara">Start monitoring jobs and get notified when new jobs are posted.</p>
                    <img src={jobMonitoringImg} alt="job monitoring" className="jobMonitoringImg" />
                    <Button variant="contained" className="dashboardButton">
                        Start Monitoring Jobs
                    </Button>
                </div>
            </div>
        </>
    );
}