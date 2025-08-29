import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SamplePage } from "./pages/SamplePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import ConversationsPage from "./pages/ConversationsPage";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";
import { Navbar } from './ui/components';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/components" element={<SamplePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ConversationsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2/>} />
      </Routes>
    </BrowserRouter>
  );
}
