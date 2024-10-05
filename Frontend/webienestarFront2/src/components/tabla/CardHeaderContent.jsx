import PropTypes from "prop-types";
import { Button, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const CardHeaderContent = ({ title, description, buttons = true, search = true }) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-8">
      <div>
        <Typography variant="h5" color="blue-gray">
          {title}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {description}
        </Typography>
      </div>
      {buttons ? (
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outlined" size="sm">
            Todos
          </Button>
          <Button className="flex items-center gap-3" size="sm">
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Crear
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* <Tabs value="all" className="w-full md:w-max">
                    <TabsHeader>
                        {tabs.map(({ label, value }) => (
                            <Tab key={value} value={value}>&nbsp;&nbsp;{label}&nbsp;&nbsp;</Tab>
                        ))}
                    </TabsHeader>
                </Tabs>  */}

        {search ? (
          <div className="w-full md:w-72">
            <Input
              label="Buscar"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

CardHeaderContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.bool,
  search: PropTypes.bool
};

export default CardHeaderContent;
