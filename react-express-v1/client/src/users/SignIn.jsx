import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({onLogin}) => {
    const [formData, setFormData] = useState({
        username: "",  //id
        password: ""   //password
    })

    // 로그인 결과 상태 관리
    const [loginResult, setLoginResult] = useState("");

    const navigate = useNavigate();

    //입력값 변경 함수
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({...formData, [name]: value})
    }

    // 폼 제출 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 입력된 데이터 가져오기
        const {username, password} = formData;

        // 유효성 검사
        if(!username.trim() || !password.trim()){
            alert("모든 항목을 입력하세요");
            return;
        }

        try{
            const response = await api.get(`/users/${username}`);
            const user = response.data;

            if(user.password === password){
                setLoginResult("success");
                onLogin(user.username);
                alert("로그인 되었습니다.");
                navigate('/');
            }else{
                setLoginResult("fail");
            }
        }catch(error){
            setLoginResult("fail");
        }
    }

    return(
        <div className="sign-in">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="아이디 입력"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                 </div> 
                 <div> 
                    <input 
                        type="password" 
                        name="password"
                        placeholder="비밀번호 입력"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                 </div>  
                 <div>
                    <button type="submit">로그인</button>
                </div>
            </form>

            {/* 회원 가입 링크 */}
            <p className="signup-link">
                아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </p>

            {/* 결과 메시지 출력 */}
            {loginResult === "fail" && (
                <p style={{color: "red"}}>아이디 또는 비밀번호가 일치하지 않습니다.</p>
            )}
        </div>
    )
}

export default SignIn;