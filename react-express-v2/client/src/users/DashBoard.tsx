import api from "../api/api"
import { useEffect, useState } from "react"

interface Order {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
    total_price: number;
    order_date: string;
}

const DashBoard = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    // 서버 api를 통해 주문 목록 조회
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await api.get<Order[]>("/orders");
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return(
        <div>
            <h2>관리자 대시보드</h2>
            <h3>주문 내역</h3>
            <div className="order-table-wrap">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>주문 ID</th>
                            <th>사용자 ID</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>총액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user_id}</td>
                                <td>{order.product_id}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashBoard;