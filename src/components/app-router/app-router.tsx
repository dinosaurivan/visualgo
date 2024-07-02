// libraries 
import React, { JSX } from "react";
import { Route, Routes } from "react-router-dom";

// pages
import { 
  MainPage,
  QueuePage,
  StackPage,
  StringPage,
  SortingPage,
  FibonacciPage,
  LinkedListPage,
} from "../../pages";



export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/queue" element={<QueuePage />} />
      <Route path="/stack" element={<StackPage />} />
      <Route path="/string" element={<StringPage />} />
      <Route path="/sorting" element={<SortingPage />} />
      <Route path="/fibonacci" element={<FibonacciPage />} />
      <Route path="/linked-list" element={<LinkedListPage />} />
    </Routes>    
  );
};
