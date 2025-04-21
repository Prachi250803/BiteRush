import { useRouteError } from "react-router"
const Error = () => {
    const errormsg = useRouteError()
    console.log(errormsg)
    return (
        <div className="Errorclass">
            <h1>Oppsss!!!</h1>
            <h2>Something went Wrong</h2>
            <h3>{errormsg.status} {errormsg.statusText}</h3>
        </div>
    )
}
export default Error
