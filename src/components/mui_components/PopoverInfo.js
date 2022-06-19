
MUI stands in solidarity with the Ukrainian people against the Russian invasion.Find out how you can help.
CONTENTS

Basic Popover
Anchor playground
Mouse over interaction
Complementary projects
PopupState helper
API
Popover
A Popover can be used to display some content on top of another.
ads via Carbon
SMS, WhatsApp, Email, Voice and more. APIs for any communications channel.
ads via Carbon

Things to know when using the Popover component:

The component is built on top of the Modal component.
The scroll and click away are blocked unlike with the Popper component.
Basic Popover
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}