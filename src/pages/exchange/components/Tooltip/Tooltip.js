import { 
    OverlayTrigger, 
    Tooltip 
} from "react-bootstrap";

//TODO: Start function
export default function Tooltips({title, content}){
    const  isTooltip= (title) => {
        if (title === 'Exchange'){
            return 'Back to Exchange';
        } 
    }
    return (
        <OverlayTrigger
            placement='bottom'
            overlay={
                <Tooltip id='tooltip-bottom'>
                    {/* TODO: Call isTooltip function */}
                    {isTooltip(title)}
                </Tooltip>
            }
        > 
        {content} 
        </OverlayTrigger>
    );
}
