import { Box, Grid } from "@mui/material";
import GroupedTeacherFilterInput from "./GroupTeacherFilterInput";
import Teacher from "./Teacher";

export default function TeacherList({teachers, allTeachers, setTeachers}) {

   
    return (
        <>

        
        <Box p={1} width="100%" sx={{display: {sm: "flex"}}} justifyContent="flex-end">
            <GroupedTeacherFilterInput setTeachers={setTeachers} allTeachers={allTeachers} />
        </Box>
        
        <Box maxHeight="calc(87vh - 200px)" sx={{overflow: "auto"}}>
            <Grid container >
                {
                    teachers.map((teacher) => {

                        return (
                            <Grid key={teacher.id} item xs={12} sm={6} md={4} >
                                <Teacher teacher={teacher} />
                            </Grid>
                        )
                    })
                }
                
              

            </Grid>
        </Box>
        </>
    )
}