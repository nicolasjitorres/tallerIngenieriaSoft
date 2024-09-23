import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
];

function BarraNavegacion() {
    return (
        <List>
            {NAVIGATION.map((item) => (
                <ListItem key={item.segment} sx={{ color: 'red' }}>
                    {item.icon}
                    <ListItemText primary={item.title} sx={{ color: 'red' }} />
                </ListItem>
            ))}
        </List>
    );
}

export default BarraNavegacion;
