import React, { useEffect, useState } from "react";
import StyledChart from "../Templates/StyledChart";
import { Row, Col, Space, Button } from "antd";
import FixedTable from "../Templates/FixedTable";
import NumberCard from "../Templates/NumberCard";
import axios from "axios";
import "../../Dashboard.css";

function Dashboard() {
    const [numUsers, setNumUsers] = useState(0);
    const [numMeals, setNumMeals] = useState(0);
    const [numExercises, setNumExercises] = useState(0);

    const [dataUsersChart, setDataUsersChart] = useState([]);
    const [dataMealsChart, setDataMealsChart] = useState([]);
    const [dataExercisesChart, setDataExercisesChart] = useState([]);
    const [dataUsersTable, setDataUsersTable] = useState([]);
    const [loadingUsersTable, setLoadingUsersTable] = useState(true);

    const [currentChart, setCurrentChart] = useState(0); // Estado para la gráfica actual

    async function getCardData() {
        axios({
            url: "https://ms-people.onrender.com/api/v1/people/ui/data?type=numberCard",
            method: "GET",
        })
        .then((response) => {
            setNumUsers(response.data.users);
            setNumMeals(response.data.meals);
            setNumExercises(response.data.exercises);
        });
    }

    async function getGenericData(chartType, dataSetter, responseTitle, loadingSetter=undefined) {
        if (loadingSetter !== undefined) {
            setLoadingUsersTable(true);
        }

        axios({
            url: `https://ms-people.onrender.com/api/v1/people/ui/data?type=${chartType}`,
            method: "GET",
        })
        .then((response) => {
            dataSetter(response.data[responseTitle]);
            if (loadingSetter !== undefined) {
                setLoadingUsersTable(false);
            }
        });
    }

    useEffect(() => {
        getCardData();
        getGenericData("usersChart", setDataUsersChart, "timeseries");
        getGenericData("mealsChart", setDataMealsChart, "timeseries");
        getGenericData("exercisesChart", setDataExercisesChart, "timeseries");
        getGenericData("usersTable", setDataUsersTable, "users", setLoadingUsersTable);
    }, []);

    const charts = [
        { title: "Usuarios", data: dataUsersChart, yTitle: "Usuarios" },
        { title: "Comidas Registradas", data: dataMealsChart, yTitle: "Comidas Registradas" },
        { title: "Ejercicios Registrados", data: dataExercisesChart, yTitle: "Ejercicios Registrados" }
    ];

    const handlePrev = () => {
        setCurrentChart((prev) => (prev === 0 ? charts.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentChart((prev) => (prev === charts.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center" }}>
                <Col span={22}>
                    <Row>
                        <h1 style={{ fontWeight: "normal" }}>Estadísticas&nbsp;</h1>
                        <h1>Usuarios</h1>
                    </Row>
                </Col>
            </Row>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center" }}>
                <Col className="gutter-row number-cards-container" span={4}>
                    <Space direction="vertical" size="middle" className="number-cards">
                        <NumberCard title="Total Usuarios" value={numUsers} />
                        <NumberCard title="Total Comidas" value={numMeals} />
                        <NumberCard title="Total Ejercicios" value={numExercises} />
                    </Space>
                </Col>
                <Col span={18} className="responsive-chart-container">
                    <Button className="chart-nav-button" onClick={handlePrev}>◀</Button>
                    <StyledChart 
                        xTitle="Días" 
                        yTitle={charts[currentChart].yTitle} 
                        width={700} 
                        height={400} 
                        data={charts[currentChart].data} 
                        maxRange={Math.max(numUsers, numMeals, numExercises) * 1.5} 
                    />
                    <Button className="chart-nav-button" onClick={handleNext}>▶</Button>
                </Col>
            </Row>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center" }}>
                <Col span={22}>
                    <FixedTable loading={loadingUsersTable} data={dataUsersTable} />
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;