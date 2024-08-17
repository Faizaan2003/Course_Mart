import { useNavigate } from "react-router-dom";
import styles from "./selection.module.css";
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.coursera}>
          <img src="/vite.svg" alt="Coursera Logo" />
          <div className={styles.courseraText}>
            <h2>Coursera</h2>
            <p>Learn, Earn, and Grow!</p>
          </div>
        </div>
        <div className={styles.header}>
          <h1>Welcome! Please Choose Your Role</h1>
        </div>
        <div className={styles.cardContainer}>
          <div
            className={`${styles.card} ${styles.adminCard}`}
            onClick={() => navigate("/admin")}
          >
            <h2>Admin</h2>
            <p>
              Create and sell courses, enabling others to learn and gain new
              skills.
            </p>
          </div>
          <div
            className={`${styles.card} ${styles.userCard}`}
            onClick={() => navigate("/user")}
          >
            <h2>User</h2>
            <p>Browse courses and manage your learning.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
