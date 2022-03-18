import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Canvas Paint</h1>
      <Link to="/paint">Paint</Link>
    </div>
  );
}

export default Home;
