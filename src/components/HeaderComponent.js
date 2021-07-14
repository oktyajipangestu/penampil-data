import React from 'react';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

function HeaderComponent() {
    return (
        <div>
            <Grid container style={{marginBottom:"30px", margin:"auto"}}>
                <GridRow  style={{backgroundColor:"orange", padding:"20px", margin:"auto"}}>
                    <GridColumn textAlign="center">
                        <h2 style={{color:"white"}}>Aplikasi Penampil Data</h2>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    )
}

export default HeaderComponent;
