import api from "../api/api"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { imageMap, type Product } from "./ProductList";

const ProductInfo = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [notFound, setNotFound] = useState(false);

    // 서버 api를 통해 상품 상세 정보 조회
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get<Product>(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setNotFound(true);
            }
        };
        fetchProduct();
    }, [id]);

    if(notFound){
        return <p>상품을 찾을 수 없습니다.</p>
    }

    if(!product){
        return null;
    }

    return(
        <div className="product-info">
            <h3>{product.name}</h3>
            <div className="product-details">
                <img 
                    src={imageMap[product.image]} 
                    alt={product.name} 
                />
                <div className="product-content">
                    <p>{product.description}</p>
                    <p className="price">가격: {product.price}원</p>
                    <div className="product-buttons">
                        <button
                           onClick={() => navigate('/products')} 
                           className="btn-list"
                        >
                            목록으로
                        </button>
                        <button className="btn-cart">장바구니에 추가</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;