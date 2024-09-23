import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Dashboard({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>
                Dashboard content for {pathname}
            </Typography>
        </Box>
    );
}

Dashboard.propTypes = {
    pathname: PropTypes.string.isRequired,
};

export default Dashboard;
