import React from 'react';
import styles from '@/styles/createMeetingPopup.module.scss'
import PopupItem from './PopupItem';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
const linkData=[
    {
        icon:<InsertLinkOutlinedIcon/>,
        text:"Create a meeting for later",
    },
    {
        icon:<AddOutlinedIcon/>,
        text:"Start an instance meeting",
    },
    {
        icon:<CalendarTodayOutlinedIcon/>,
        text:"Schedule in Calender",
    }
]
const CreateMeetingPopup = () => {
    return (
        <ol className={styles.popup_body}>
            {linkData.map(item=><PopupItem icon={item.icon} text={item.text}/>)}
        </ol>
    );
}

export default CreateMeetingPopup;
