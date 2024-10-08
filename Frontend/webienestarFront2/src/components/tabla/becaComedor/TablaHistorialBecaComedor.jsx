import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody, CardFooter, Button, Typography } from "@material-tailwind/react";

import TableHeader from '../TableHeader';
import TableRowHistorialBecaComedor from './TableRowHistorialBeca';
import CardHeaderContent from '../CardHeaderContent';

const TablaHistorialBecaComedor = ({ titulo = "Ejemplo", descripcion = "Esta es una descripción", cabeceras = [], datos = [], cabecerasPersonalizadas = [], onRefresh = () => {} }) => {

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <CardHeaderContent title={titulo} description={descripcion} buttons={false} />
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <TableHeader headers={cabecerasPersonalizadas.length != 0 ? cabecerasPersonalizadas : cabeceras} />
                    {datos.length != 0 ? (
                        <tbody>
                            {datos.map((dato) => (
                                <TableRowHistorialBecaComedor key={dato.id} data={dato} columns={cabeceras} onRefresh={onRefresh} />
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={datos.length} className="text-center p-4">No hay datos, aún...</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">Page 1 of 10</Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">Anterior</Button>
                    <Button variant="outlined" size="sm">Siguiente</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

TablaHistorialBecaComedor.propTypes = {
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    cabeceras: PropTypes.arrayOf(PropTypes.string),
    cabecerasPersonalizadas: PropTypes.arrayOf(PropTypes.string),
    datos: PropTypes.arrayOf(PropTypes.object),
    onRefresh: PropTypes.func
};

export default TablaHistorialBecaComedor;
