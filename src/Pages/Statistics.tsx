interface Props{
    onBackToHome: () => void
    url: string
}
const Statistics:React.FC<Props> = ({onBackToHome}) => {
    return (
        <div>
             <h1>Statistik</h1>
             <button onClick={onBackToHome} className="backButton">Back to Home</button>

        </div>
       

    )

}
export default Statistics