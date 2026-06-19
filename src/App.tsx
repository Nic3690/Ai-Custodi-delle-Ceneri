import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Bio from "./pages/Bio";
import Stories from "./pages/Stories";
import Secret from "./pages/Secret";
import Gallery from "./pages/Gallery";
import StoryGallery from "./pages/StoryGallery";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:slug" element={<StoryGallery />} />
        <Route path="/contacts" element={<Contacts />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
