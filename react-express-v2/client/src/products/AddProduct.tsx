import api from "../api/api"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 상품 추가 폼 데이터 인터페이스 정의
interface FormData {
    name: string,
    price: number,
    description: string,
    image: File | null  //파일을 선택하지 않으면 null
}

const AddProduct = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        price: 0,
        description: '',
        image: null
    });

    const navigate = useNavigate();

    // 필드 입력값 변경
    const handleChange = (e: React.ChangeEvent<HTMLInputElement |
        HTMLTextAreaElement>) => {
        const { name, value } = e.target; //파일이 없는 경우
        const files = (e.target as HTMLInputElement).files;  //파일이 있는 경우

        if (name === "image" && files) { //파일이 있는 경우
            setFormData({ ...formData, image: files[0] });
        } else { //파일이 없는 경우
            setFormData({ ...formData, [name]: value });
        }
    }

    // 폼 제출 핸들러 함수
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //폼 데이터 구조분해 할당
        const { name, price, description, image } = formData;

        //유효성 검사
        if (!name || !price || !description) {
            alert("모든 항목을 입력해주세요");
            return;
        }

        try {
            // 서버 api를 통해 상품 등록
            await api.post("/products", {
                name,
                price,
                description,
                image: image ? image.name : ""
            });
            alert("상품이 등록되었습니다.");
            navigate('/products'); //상품 등록후 상품목록 페이지로 이동
        } catch (error) {
            alert("상품 등록에 실패했습니다.");
        }
    }

    return (
        <div className="add-product">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">상품명</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="상품명을 입력하세요"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">가격</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="가격을 입력하세요"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">설명</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="설명을 입력하세요"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">이미지</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    )
}

export default AddProduct;