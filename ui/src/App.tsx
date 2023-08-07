import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import subWeeks from 'date-fns/subWeeks'
import addWeeks from 'date-fns/addWeeks'

import {
    FluentProvider,
    webLightTheme,
} from "@fluentui/react-components";
import { MainBoard } from "./features/mainBoard/mainBoard";
import { WeekSelector } from "./features/weekSelector/weekSelector";


function App() {
    const [selectedWeek, setSelectedWeek] = useState(new Date());
  return (
      <FluentProvider theme={webLightTheme}>

      <div className="App">
      <header className="App-header">
          <WeekSelector
              currentWeek={selectedWeek}
              onNextWeek={() => setSelectedWeek(addWeeks(selectedWeek, 1))}
              onPrevWeek={() => setSelectedWeek(subWeeks(selectedWeek, 1))}
          />
          <MainBoard selectedWeek={selectedWeek} />

      </header>
    </div>
      </FluentProvider>
  );
}

export default App;
