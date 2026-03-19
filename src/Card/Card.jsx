import defaultIcon from "../assets/OIP.webp"
import styles from "./Card.module.css"

function Card({name = 'User', desc = 'No description!'}) {
    /*
        props = {
            name: "Maria",
            desc: "Software Engineer"
        }
    */

    return (
        <div className={styles.card}>
            <img className={styles["card-image"]} src={defaultIcon} alt="User Icon" />
            <h2>{name}</h2>
            <p>{desc}</p>
        </div>
    )
}

export default Card