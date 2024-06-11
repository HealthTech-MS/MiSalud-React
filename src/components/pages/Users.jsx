import axios from "axios";
import { Row, Col, Card, Avatar, Modal, Input, Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import '../../App.css';
import { useSpring, animated } from '@react-spring/web';
import NumberCard from '../Templates/NumberCard';
import MealsTable from '../Templates/MealsTable';
import StyledChart from '../Templates/StyledChart';
import SatisfactionChart from '../Templates/SatisfactionChart';

const { Meta } = Card;   // https://ms-people.vercel.app , http://localhost:5001

function Users() {
    const [dataUsersTable, setDataUsersTable] = useState([]);
    const [filteredDataUsersTable, setFilteredDataUsersTable] = useState([]);
    const [loadingUsersTable, setLoadingUsersTable] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [newDescription, setNewDescription] = useState("");
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUserPhone, setSelectedUserPhone] = useState("");
    const [userAverageScore, setUserAverageScore] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUserMeals, setSelectedUserMeals] = useState([]);
    const [userMealsChartData, setUserMealsChartData] = useState([]);

    async function getGenericData(chartType, dataSetter, responseTitle, loadingSetter=undefined) {
        if (loadingSetter !== undefined) {
            setLoadingUsersTable(true);
        }

        axios({
            url: `http://localhost:5001/api/v1/people/ui/data/dashboard?type=${chartType}`, 

            method: "GET",
        })
        .then((response) => {
            const users = response.data[responseTitle];
            const savedDescriptions = JSON.parse(localStorage.getItem('userDescriptions')) || {};
            const usersWithDescriptions = users.map(user => ({
                ...user,
                description: savedDescriptions[user.id] || "This is the description"
            }));
            dataSetter(usersWithDescriptions);
            setFilteredDataUsersTable(usersWithDescriptions);
            if (loadingSetter !== undefined) {
                setLoadingUsersTable(false);
            }
        });
    }

    useEffect(() => {
        getGenericData("usersTable", setDataUsersTable, "users", setLoadingUsersTable);
        const savedShowWelcomeMessage = localStorage.getItem('showWelcomeMessage');
        setShowWelcomeMessage(savedShowWelcomeMessage === 'true');
        if (savedShowWelcomeMessage === 'true') {
            const savedSelectedUserName = localStorage.getItem('selectedUserName');
            const savedSelectedUserId = localStorage.getItem('selectedUserId');
            const savedSelectedUserPhone = localStorage.getItem('selectedUserPhone');
            setSelectedUserName(savedSelectedUserName || "");
            setSelectedUserId(savedSelectedUserId || "");
            setSelectedUserPhone(savedSelectedUserPhone || "");
        }
    }, []);

    const showEditModal = (user) => {
        setCurrentUser(user);
        setNewDescription(user.description || ""); 
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const updatedUsers = dataUsersTable.map(user =>
            user.id === currentUser.id ? { ...user, description: newDescription } : user
        );
        setDataUsersTable(updatedUsers);
        setFilteredDataUsersTable(updatedUsers);
        setIsModalVisible(false);

        const savedDescriptions = JSON.parse(localStorage.getItem('userDescriptions')) || {};
        savedDescriptions[currentUser.id] = newDescription;
        localStorage.setItem('userDescriptions', JSON.stringify(savedDescriptions));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUserClick = async (user) => {
        setShowWelcomeMessage(true);
        setSelectedUserName(`${user.firstName} ${user.lastName}`);
        setSelectedUserId(user.id);
        setSelectedUserPhone(user.phoneNumber);
    
        try {
            const mealsResponse = await axios.get(`http://localhost:5001/api/v1/people/ui/data/dashboard?type=userMeal&userId=${user.id}`);
            setSelectedUserMeals(mealsResponse.data.meals);
    
            const chartResponse = await axios.get(`http://localhost:5001/api/v1/people/ui/data/userMealsChart?userId=${user.id}`);
            setUserMealsChartData(chartResponse.data.meals);
    
            const averageScoreResponse = await axios.get(`http://localhost:5001/api/v1/people/ui/data/userAverageScore?userId=${user.id}`);
            setUserAverageScore(averageScoreResponse.data.averageScore);
        } catch (error) {
            console.error("Error fetching user meals or chart data", error);
        }
    
        localStorage.setItem('showWelcomeMessage', 'true');
        localStorage.setItem('selectedUserName', `${user.firstName} ${user.lastName}`);
        localStorage.setItem('selectedUserId', user.id);
        localStorage.setItem('selectedUserPhone', user.phoneNumber);
    };

    const handleBackToCards = () => {
        setShowWelcomeMessage(false);
        setSelectedUserName("");
        setSelectedUserId("");
        setSelectedUserPhone("");
        setSelectedUserMeals([]);
        setUserMealsChartData([]); 
        localStorage.setItem('showWelcomeMessage', 'false');
        localStorage.removeItem('selectedUserName');
        localStorage.removeItem('selectedUserId');
        localStorage.removeItem('selectedUserPhone');
    };

    const cardsAnimation = useSpring({
        opacity: showWelcomeMessage ? 0 : 1,
        transform: showWelcomeMessage ? 'translateY(20px)' : 'translateY(0px)',
        config: { duration: 500 }
    });

    const messageAnimation = useSpring({
        opacity: showWelcomeMessage ? 1 : 0,
        transform: showWelcomeMessage ? 'translateY(0px)' : 'translateY(-20px)',
        config: { duration: 500 }
    });

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filteredUsers = dataUsersTable.filter(user =>
            user.firstName.toLowerCase().includes(term) ||
            user.lastName.toLowerCase().includes(term)
        );
        setFilteredDataUsersTable(filteredUsers);
    };

    return (
        <>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
                <Col span={22}>
                    <Row align="middle" style={{ width: '100%' }}>
                        {showWelcomeMessage && (
                            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBackToCards} />
                        )}
                        <h1 style={{ fontWeight: "normal" }}>Bienvenido&nbsp;</h1>
                        <h1>Doctor</h1>
                        <div className="search-bar">
                            <Input
                                placeholder="Buscar usuario"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-bar-input"
                            />
                        </div>
                    </Row>
                </Col>
            </Row>

            {showWelcomeMessage && (
                <>
                    <animated.div style={{ ...messageAnimation, textAlign: 'center', marginTop: '-30px' }}>
                        <h2>{selectedUserName}</h2>
                    </animated.div>
                    <Row gutter={20} className="user-info-container">
                        <Col span={4} className="user-number-cards-container">
                            <animated.div style={messageAnimation} className="user-number-cards">
                                <NumberCard title="ID" value={selectedUserId} />
                                <NumberCard title="Phone" value={selectedUserPhone} />
                                {userAverageScore !== null && <NumberCard title="Promedio de percepción" value={userAverageScore.toFixed(2)} />}
                            </animated.div>
                        </Col>
                        <Col span={16} className="graph-wrapper">
                            <SatisfactionChart
                                width={700}
                                height={300}
                                data={userMealsChartData}
                            />
                        </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>  
                        <Col span={20}>
                            <MealsTable meals={selectedUserMeals} />
                        </Col>
                    </Row>
                </>
            )}

            <animated.div style={cardsAnimation}>
                <Row gutter={20} className="users-card-container" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
                    {filteredDataUsersTable.map(user => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id} className="user-card">
                            <Card
                                className="custom-card"
                                actions={[
                                    <EditOutlined key="edit" onClick={() => showEditModal(user)} />
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`} />}
                                    title={<a onClick={() => handleUserClick(user)} style={{ color: 'black'}}>{`${user.firstName} ${user.lastName}`}</a>}
                                    description={user.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </animated.div>

            <Modal title="Editar Descripción" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Nueva descripción"
                />
            </Modal>
        </>
    );
}


export default Users;