import {  useParams } from "react-router-dom"
import Form from "../components/Form";


const FormPage = () => {
    const {id} = useParams();
  return (
    <div className=" container m-auto w-[30vw] ">
      <Form id={id} />
    </div>
  )
}

export default FormPage
