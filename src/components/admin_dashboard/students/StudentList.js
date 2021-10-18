import { Box, Grid } from "@mui/material";
import GroupedStudentFilterInput from "./GroupStudentFilterInput";
import Student from "./Student";

export default function StudentList({students, allStudents, setStudents}) {

   
    return (
        <>

        
        <Box p={1} width="100%" sx={{display: {sm: "flex"}}} justifyContent="flex-end">
            <GroupedStudentFilterInput setStudents={setStudents} allStudents={allStudents} />
        </Box>
        
        <Box maxHeight="calc(87vh - 200px)" sx={{overflow: "auto"}}>
            <Grid container >
                {
                    students.map((student) => {

                        return (
                            <Grid key={student.id} item xs={12} s={6} md={4} >
                                <Student student={student} />
                            </Grid>
                        )
                    })
                }
                
              

            </Grid>
        </Box>
        </>
    )
}