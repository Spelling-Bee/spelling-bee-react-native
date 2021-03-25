import * as React from 'react';
import produce from 'immer';
export type SpellingBeeSetting = {
  dictionary: Array<string>;
  letters: Array<string>;
  pivotLetter: string;
  min: number;
};

export type SpellingBeeGame = {
  id: string;
  words: Array<string>;
  guessedWords: Array<string>;
} & SpellingBeeSetting;

import SpellingBee from '../../SpellingBee';
import {shuffle} from 'helpers';

type State = {
  game: {
    state: SpellingBeeGame;
    makeGuess: (guess: string) => void;
  };
  guess: string;
  error: string | null;
  success: boolean;
};

type Actions = {
  type: string;
  setting?: SpellingBeeSetting;
  guess?: string;
  message?: string;
  letters?: Array<string>;
};

type Reducer = (state: State, action: Actions) => State;

type Dispatch = React.Dispatch<Actions>;

function createStore(): Reducer {
  const reducer = produce((state: State, action) => {
    switch (action.type) {
      case 'CREATE_GAME':
        state.game.state = SpellingBee.createGame(action.setting);
        break;
      case 'ADD_GUESS':
        state.game.state.guessedWords.push(action.guess);
        break;
      case 'WRONG_GUESS':
        state.error = action.message;
        break;
      case 'UPDATE_GUESS':
        state.guess = action.guess;
        break;
      case 'SHUFFLE_LETTERS':
        state.game.state.letters = [
          state.game.state.pivotLetter,
          ...shuffle(
            state.game.state.letters.filter(
              letter => letter !== state.game.state.pivotLetter,
            ),
          ),
        ];
        break;
      case 'FINISHED_ERROR_ANIMATION':
        state.guess = '';
        state.error = null;
        break;
      default:
        throw 'Invalid Action';
    }
  });
  return reducer;
}
export const Store = React.createContext<State | undefined>(undefined);
export const Dispatch = React.createContext<Dispatch | undefined>(undefined);

export default function Provider({children}: {children: React.ReactNode}) {
  const initialState = {
    game: {
      state: {
        id: '',
        dictionary: [],
        letters: [],
        pivotLetter: '',
        min: 0,
        guessedWords: [],
        words: [],
      },
      makeGuess: (guess: string) => guess,
    },
    guess: '',
    error: null,
    success: false,
  };
  const [state, dispatch] = React.useReducer<Reducer>(
    createStore(),
    initialState,
  );

  return (
    <Store.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Store.Provider>
  );
}

export function useStore() {
  const state = React.useContext(Store);

  if (!state) {
    throw new Error('useStore must be used within a Provider');
  }

  return state;
}

export function useDispatch() {
  const dispatch = React.useContext(Dispatch);

  if (!dispatch) {
    throw new Error('useDispatch must be used within a Provider');
  }

  return dispatch;
}
