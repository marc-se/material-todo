import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const HeaderBadge = (props) => (
  <div>
    <Badge
      badgeContent={ props.count }
      secondary={ true }
      badgeStyle={ {top: 12, right: 12} }
      style={ {position: 'absolute', top: -25, right: -20} }
    >
      <IconButton tooltip="You have some things to do!">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
);

export default HeaderBadge;