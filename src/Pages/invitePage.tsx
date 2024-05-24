interface Props{
    onBackToHome: () => void
    url: string
}
const InvitePage:React.FC<Props> = ({onBackToHome}) => {
   
    return (
        <div>
           <h1>Bjuda in</h1>
           <button onClick={onBackToHome} className="backButton">Back to Home</button>
        </div>
    )
}
export default InvitePage