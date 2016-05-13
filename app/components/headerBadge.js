import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const HeaderBadge = () => (
  <div>
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="You have some things to do!">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
);

export default HeaderBadge;