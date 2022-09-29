import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openBoardCell, selectProxx } from "./proxxSlice";
import './Proxx.css';

/*
Part 5: minimal UI to render the board. 
*/

const Proxx: FC = () => {
    const proxx = useAppSelector(selectProxx);
    const dispatch = useAppDispatch();
    return <div className="container">
        {proxx.board.map((cell) => 
            <div data-testid={cell.id.toString()} onClick={()=> dispatch(openBoardCell(cell.id))}>
                {cell.isOpen ? cell.isBlackHole ? 'H' : cell.countOfAdjacentBlackHoles : ' '}
            </div>)}
    </div>;
}

export default Proxx;