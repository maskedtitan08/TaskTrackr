'use server';

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import AccessDenied from "@/components/views/AccessDenied"

export default async function BoardPage(props) {
  const boardId = props.params.boardId;
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes('room:write');
  if (!hasAccess) {
    return (
      // <div>Access denied</div>
      <div>
        <AccessDenied />
      </div>
       
    );
  }
  return (
    <div>
      <Board
        name={boardInfo.metadata.boardName.toString()}
        id={boardId} />
    </div>
  );
}
