interface Props{
    onBackToHome: () => void}
const StartProject:React.FC<Props> = ({onBackToHome}) => {
    return (
        <div>
            <h1>Starta projekt</h1>
        <button onClick={onBackToHome} className="backButton">Back to Home</button>
        </div>
        
    )
}
export default StartProject