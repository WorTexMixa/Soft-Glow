import './Main.css'

function MasterCard(props) {
    const {name, profession, experience} = props;

    return (
    <div className='master-card'>
        <h3>{name}</h3>
        <p>{profession}</p>
        <p>{experience}</p>
    </div>
    )
}

export default MasterCard;