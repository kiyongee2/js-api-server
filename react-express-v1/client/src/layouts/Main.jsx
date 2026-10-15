
import mainPhoto from '../assets/hero.png';

const Main = () => {
  return (
    <main className="main">
        <h2>컴퓨터 주변 기기 판매</h2>
        <section>
            <p>최신 컴퓨터 주변 기기를 만나보세요!</p>
            <div>
                <img src={mainPhoto} alt="메인 이미지" />
            </div>
        </section>
    </main>
  )
}

export default Main;

