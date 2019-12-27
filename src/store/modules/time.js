import { createAction, handleActions } from "redux-actions";
import produce from 'immer';

const LOOP = "TimeTracker/LOOP";
const START_AUTOPLAY = "TimeTracker/START_AUTOPLAY";
const STOP_AUTOPLAY = "TimeTracker/STOP_AUTOPLAY";
// const TOGGLE_AUTOPLAY = "TimeTracker/TOGGLE_AUTOPLAY";
const REWIND_TO_START = "TimeTracker/REWIND_TO_START";
const SKIP_30S_FORWARD = "TimeTracker/SKIP_30S_FORWARD";
const SKIP_30S_REVERSE = "TimeTracker/SKIP_30S_REVERSE";
const SKIP_TO = "TimeTracker/SKIP_TO";

// createAction 으로 액션 생성함수 정의
export const startAutoplay = createAction(START_AUTOPLAY)
export const stopAutoplay = createAction(STOP_AUTOPLAY)
// export const toggleAutoplay = createAction(TOGGLE_AUTOPLAY)
export const rewindToStart = createAction(REWIND_TO_START)
export const skip30sForward = createAction(SKIP_30S_FORWARD)
export const skip30sReverse = createAction(SKIP_30S_REVERSE)
export const skipTo = createAction(SKIP_TO, msSinceEpoch => msSinceEpoch)

// **** 초기 상태 정의
const initialState = {
  autoplaySpeed: 10,
  msSinceEpoch: 1000,
  autoplay: false,
}

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [START_AUTOPLAY]: (state, action) => produce(state, draft => {
      draft.autoplay = true;
    }),
    [STOP_AUTOPLAY]: (state, action) => produce(state, draft => {
      draft.autoplay = false;
    }),
    [REWIND_TO_START]: (state, action) => produce(state, draft => {
      draft.msSinceEpoch = 1000;
    }),
    [SKIP_30S_FORWARD]: (state, action) => produce(state, draft => {
      draft.msSinceEpoch = state.msSinceEpoch + 30000;
    }),
    [SKIP_30S_REVERSE]: (state, action) => produce(state, draft => {
      draft.msSinceEpoch = state.msSinceEpoch - 30000;
    }),
    [SKIP_TO]: (state, action) => produce(state, draft => {
      draft.msSinceEpoch = action.payload;
    }),
  },
  initialState
);
