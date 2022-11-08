import './Square.css';

type ButtonProps = {
    className: string;
    disabled: boolean;
    text: number | string;
    onClick: () => void;
};

const Square = (props: ButtonProps) => {
    const { className, onClick, disabled, text } = props;
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Square;