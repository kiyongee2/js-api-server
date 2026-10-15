import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 회원 가입 폼 컴포넌트 정의
const SignUp = () => {
    // 폼 데이터 상태 관리
    // name, age, job, memo 전체 객체로 관리
    const [formData, setFormData] = useState({
        name: "",       //이름
        job: "회사원",   //직업
        gender: "male",  //성별
        memo: ""         //자기 소개
    })

    const navigate = useNavigate();

    // 모든 필드 입력값 변경 함수
    const handleInputChange = (e) => {
        const {name, value} = e.target;    //e.target.value, e.target.name

        setFormData({...formData, [name]: value}); // 기존 배열에 [name]: value} 추가
    }

    // 폼을 제출하는 처리 함수
    const handleSubmit = (e) => {
        e.preventDefault(); //기본 동작 막는 코드
        console.log("제출 데이터: ", formData);

        // 입력값 검증
        if(!formData.name.trim() || !formData.job.trim() ||
            !formData.gender.trim() || !formData.memo.trim()){
                alert("모든 필드를 입력하세요");
                return;  //즉시 종료
            }

        alert("회원가입이 등록되었습니다.");
        navigate("/signin");  //회원가입 후 로그인 페이지로 이동
    }

    // 취소 버튼 클릭 함수
    const handleCancel = () => {
        // 입력값 초기화
        setFormData({
            name: "",
            job: "회사원",
            gender: "male",
            memo: ""
        })
    }

    return(
        <div className="sign-up">
            <h2>회원 가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>직업</label>
                    <select 
                        name="job"
                        value={formData.job}
                        onChange={handleInputChange}
                    >
                        <option value="employee">회사원</option>
                        <option value="student">학생</option>
                        <option value="freelancer">프리랜서</option>
                    </select>
                </div>
                <div>
                    <label className="gender-title">성별</label>
                    <div className="gender-options">
                        <label><input 
                            type="radio" 
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleInputChange}
                        />남자</label>
                        <label><input 
                            type="radio" 
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleInputChange}
                        />여자</label>
                    </div>
                </div>
                <div>
                    <label>자기소개</label>
                    <textarea 
                        name="memo" 
                        rows={5}
                        cols={20}
                        value={formData.memo}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div>
                    {/* 서버에 전송이 됨으로 "submit" 필수 */}
                    <button type="submit">가입</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;