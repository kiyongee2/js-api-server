import api from "../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// 폼 데이터 객체
interface SignUpForm{
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp = () => {
    //폼 데이터 상태 관리
    const [formData, setFormData] = useState<SignUpForm>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    // 입력값 변경 핸들러 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value});
    }

    // 폼 제출 핸들러 함수
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {username, email, password, confirmPassword} = formData;

        // 유효성 검사
        if(!username || !email || !password || !confirmPassword){
            alert("모든 항목을 입력해주세요");
            return;
        }

        // 비밀번호 일치 여부 확인
        if(password !== confirmPassword){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 서버 api를 통해 회원가입
            await api.post("/users", { username, password, email });
            alert("회원가입이 완료 되었습니다.");
            navigate('/signin'); //가입후 로그인 페이지로 이동
        } catch (error) {
            alert("이미 존재하는 아이디이거나 회원가입에 실패했습니다.");
        }
    }

    return(
        <div className="signup">
            <h2>회원 가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        placeholder="아이디를 입력하세요"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="text" 
                        id="email"
                        name="email"
                        placeholder="이메일을 입력하세요"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="비밀번호를 입력하세요"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    )
}

export default SignUp;