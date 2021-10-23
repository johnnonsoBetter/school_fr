import { Box, Button } from "@mui/material"
import { useContext, useState } from "react"
import { FetchContext } from "../../../context/FetchContext"



export default function NewImage() {

    const {authAxios} = useContext(FetchContext)

    const [image, setImage] = useState(null)
    const [img, setImg] = useState('')

    const handleUploadImage = (formData) => {

        authAxios.post('api/v1/photos', formData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setImage(e.target.files[0])
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //create a FormData object
       const formData = new FormData()
       // Add the file to the AJAX request
       formData.append('image', image)
       formData.append('caption', "please this is the same typical caption that i want ")
       handleUploadImage(formData)
        
    }


    return (

        <Box>

            <img src="http://res.cloudinary.com/confamgroup/image/upload/v1634905211/jalhf7nzuugxgueg5kdz.png" />     
            <form onSubmit={handleSubmit}>
                <input type='file' name='image' accept='image/*' onChange={handleChange}/>
                <Button type='submit' > Submit  </Button>
            </form>
    
        </Box>
         

    )
}



