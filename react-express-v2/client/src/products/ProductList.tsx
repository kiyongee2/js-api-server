
import api from "../api/api"
import mouse from "../assets/mouse.png"
import keyboard from "../assets/keyboard.png"
import usb from "../assets/usb.png"
import monitor from "../assets/monitor.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export const imageMap: Record<string, string> = {
    "mouse.png": mouse,
    "keyboard.png": keyboard,
    "usb.png": usb,
    "monitor.png": monitor,
}

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

const ProductList = () => {
    // 상품 목록 상태
    const [products, setProducts] = useState<Product[]>([]);
    // 검색어 상태를 관리하기 위한 useState 훅
    const [keyword, setKeyword] = useState<string>("");

    // 서버 api를 통해 상품 목록 조회
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get<Product[]>("/products");
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    // 상품명에 검색어가 포함된 상품만 필터링
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()));

    return(
        <div className="product-list">
            {/* 검색 기능 구현 */}
            <div className="search-area">
                <input 
                    type="text" 
                    placeholder="상품명을 검색하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            {filteredProducts.length === 0 ? (
                <p className="no-result">검색 결과가 없습니다.</p>
            ) : (
            <div className="card-container">
                {filteredProducts.map((product) => (
                //상품을 클릭하면 상세 정보 페이지로 이동}
                <Link to={`/products/${product.id}`} key={product.id}>
                    <div className="card">
                        <img 
                            src={imageMap[product.image]} 
                            alt={product.name}
                            className="card-image"
                        />
                        <div className="card-body">
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">가격: {product.price}원</p>
                        </div>
                    </div>
                </Link>
                ))}
            </div>
            )}
        </div>
    )
}

export default ProductList;