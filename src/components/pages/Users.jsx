import axios from "axios";
import { Row, Col, Card, Avatar, Modal, Input, Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import '../../App.css';
import { useSpring, animated } from '@react-spring/web';
import NumberCard from '../Templates/NumberCard';
import MealsTable from '../Templates/MealsTable';

const { Meta } = Card;

function Users() {
    const [dataUsersTable, setDataUsersTable] = useState([]);
    const [loadingUsersTable, setLoadingUsersTable] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [newDescription, setNewDescription] = useState("");
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUserPhone, setSelectedUserPhone] = useState("");
    const [selectedUserMeals, setSelectedUserMeals] = useState(0);

    async function getGenericData(chartType, dataSetter, responseTitle, loadingSetter=undefined) {
        if (loadingSetter !== undefined) {
            setLoadingUsersTable(true);
        }

        axios({
            url: `https://ms-people.onrender.com/api/v1/people/ui/data?type=${chartType}`,
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
            if (loadingSetter !== undefined) {
                setLoadingUsersTable(false);
            }
        });
    }

    async function getUserMeals(userId) {
        return axios({
            url: `https://ms-people.onrender.com/api/v1/people/ui/data?type=userMeals&userId=${userId}`,
            method: "GET",
        })
        .then((response) => {
            return response.data.meals;
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
            const savedSelectedUserMeals = localStorage.getItem('selectedUserMeals');
            setSelectedUserName(savedSelectedUserName || "");
            setSelectedUserId(savedSelectedUserId || "");
            setSelectedUserPhone(savedSelectedUserPhone || "");
            setSelectedUserMeals(savedSelectedUserMeals || 0);
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
        const mealsCount = await getUserMeals(user.id);
        setSelectedUserMeals(mealsCount);
        localStorage.setItem('showWelcomeMessage', 'true');
        localStorage.setItem('selectedUserName', `${user.firstName} ${user.lastName}`);
        localStorage.setItem('selectedUserId', user.id);
        localStorage.setItem('selectedUserPhone', user.phoneNumber);
        localStorage.setItem('selectedUserMeals', mealsCount);
    };

    const handleBackToCards = () => {
        setShowWelcomeMessage(false);
        setSelectedUserName("");
        setSelectedUserId("");
        setSelectedUserPhone("");
        setSelectedUserMeals(0);
        localStorage.setItem('showWelcomeMessage', 'false');
        localStorage.removeItem('selectedUserName');
        localStorage.removeItem('selectedUserId');
        localStorage.removeItem('selectedUserPhone');
        localStorage.removeItem('selectedUserMeals');
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

    return (
        <>
            <Row gutter={20} style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
                <Col span={22}>
                    <Row align="middle">
                        {showWelcomeMessage && (
                            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBackToCards} />
                        )}
                        <h1 style={{ fontWeight: "normal" }}>Bienvenido&nbsp;</h1>
                        <h1>Ricardo</h1>
                    </Row>
                </Col>
            </Row>

            {showWelcomeMessage && (
                <>
                    <animated.div style={{ ...messageAnimation, textAlign: 'center', marginTop: '-30px' }}>
                        <h2>{selectedUserName}</h2>
                    </animated.div>
                    <Row gutter={20} style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
                        <Col span={22} className="number-cards-container">
                            <animated.div style={messageAnimation}>
                                <Space direction="vertical" size="middle" className="number-cards">
                                    <NumberCard title="ID" value={selectedUserId} />
                                    <NumberCard title="Phone" value={selectedUserPhone} />
                                    <NumberCard title="Meals" value={selectedUserMeals} />
                                </Space>
                            </animated.div>
                        </Col>
                    </Row>
                </>
            )}

            <animated.div style={cardsAnimation}>
                <Row gutter={20} className="users-card-container" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
                    {dataUsersTable.map(user => (
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