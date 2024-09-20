import { TextField } from '@mui/material';

const numberField = ({id, setId} : {id?: number, setId: (id?: number) => void}) => {

    const numFilter = (input: string) => {
        return input.replace(/\D/g, '');
    }

    return (
        <TextField 
            variant="outlined" 
            label="Search post by user id" 
            value={id || ''} 
            onChange={(e) => { 

                if(numFilter(e.target.value) != '' ) { 
                    setId(parseInt(numFilter(e.target.value)));
                }
                else {
                    setId(undefined)
                }
            }}
        />
    )
}

export default numberField