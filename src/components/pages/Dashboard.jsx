import { Row, Col, Space, Skeleton } from "antd"
import { React, useEffect, useState } from "react";
import StyledChart from "../Templates/StyledChart";
import FixedTable from "../Templates/FixedTable";
import NumberCard from "../Templates/NumberCard";
import axios from "axios";

function Dashboard(){

    const [numUsers, setNumUsers] = useState(0)
    const [numMeals, setNumMeals] = useState(0)
    const [numExercises, setNumExercises] = useState(0)

    const [dataUsersChart, setDataUsersChart] = useState([])
    const [dataMealsChart, setDataMealsChart] = useState([])
    const [dataExerciseChart, setDataExerciseChart] = useState([])
    const [dataUsersTable, setDataUsersTable] = useState([])

    const [loadingUsersTable, setLoadingUsersTable] = useState(true)

    async function getCardData(){
        axios({
            url: "http://localhost:5001/api/v1/people/ui/data?type=numberCard",
            method: "GET",
        })
        .then((response) => {
            setNumUsers(response.data.users)
            setNumMeals(response.data.meals)
            setNumExercises(response.data.meals)
        })
    }

    async function getGenericData(chartType, dataSetter, responseTitle, loadingSetter=undefined){
        if(loadingSetter != undefined){
            setLoadingUsersTable(true)
        }

        axios({
            url: `http://localhost:5001/api/v1/people/ui/data?type=${chartType}`,
            method: "GET",
        })
        .then((response) => {
            dataSetter(response.data[responseTitle])
            if(loadingSetter != undefined){
                setLoadingUsersTable(false)
            }
        })
    }

    useEffect(() => {
        getCardData()
        getGenericData("usersChart", setDataUsersChart, "timeseries")
        getGenericData("mealsChart", setDataMealsChart, "timeseries")
        getGenericData("mealsChart", setDataExerciseChart, "timeseries")
        getGenericData("usersTable", setDataUsersTable, "users", loadingUsersTable)
    },[])

    return(
        <>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center"}}>
                <Col span={22}>
                    <Row>
                        <h1 style={{ fontWeight: "normal" }}>Bienvenido&nbsp;</h1>
                        <h1>Ricardo</h1>
                    </Row>
                </Col>
            </Row>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center"}}>
                <Col className="gutter-row" span={4}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex', }} >
                        <NumberCard title="Usuarios" value={numUsers} />
                        <NumberCard title="Comidas" value={numMeals} />
                        <NumberCard title="Ejercicios" value={numExercises} />
                    </Space>
                </Col>
                <Col className="gutter-row" span={9}>
                    <StyledChart xTitle="Dias" yTitle="Usuarios" width={625} height={325} data={dataUsersChart} maxRange={numUsers*1.5} />
                </Col>
                <Col className="gutter-row" span={9}>
                    <StyledChart xTitle="Dias" yTitle="Comidas Registradas" width={625} height={162.5} data={dataMealsChart} maxRange={numMeals*1.5} />
                    <StyledChart xTitle="Dias" yTitle="Ejercicios Registrados" width={625} height={162.5} data={dataExerciseChart} maxRange={numExercises*1.5}/>
                </Col>
            </Row>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center"}}>
                <Col span={22}>
                    <FixedTable loading={loadingUsersTable} data={dataUsersTable} />
                </Col>
            </Row>
        </>
    )
}

export default Dashboard