import './Square.css';

const Square = (props) => {
    return (
        <button className={props.className} onClick={props.onClick} disabled={props.disabled}>
            {props.text}
        </button>
    );
}

export default Square;