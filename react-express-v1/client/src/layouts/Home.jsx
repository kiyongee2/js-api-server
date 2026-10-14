
import mainImage from '../assets/hero.png';

const Home = () => {
  return (
    <main className="main">
        <h2>컴퓨터 주변 기기 판매</h2>
        <section>
            <p>최신 컴퓨터 주변 기기를 만나보세요!</p>
            <div>
                <img src={mainImage} alt="컴퓨터 주변 기기" />
            </div>
        </section>
    </main>
  )
}

export default Home

