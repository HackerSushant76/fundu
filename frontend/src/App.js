import styles from './App.module.css';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Allroutes from './Routes/Allroutes';

function App() {
  return (
    <div className={styles.body}>
      <Navbar />
      <Allroutes />
    </div>
  );
}

export default App;
