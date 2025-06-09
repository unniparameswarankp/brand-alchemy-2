import Header from './components/Header';
import Footer from './components/Footer';
import InteractiveHomeSection from './components/InteractiveHomeSection';
import OurStory from './components/OurStory';
import CaseStudiesSection from './components/CaseStudiesSection';
import VideoScrollSection from './components/VideoScrollSection';
import ScrollSteps from './components/ScrollSteps';
import Logo3D from './components/Logo3D';
export default function Home() {
  return (
    <div className="ba-wrapper">
    <Header />
    <VideoScrollSection />
    <InteractiveHomeSection />
    <CaseStudiesSection />
    <ScrollSteps />
    <OurStory />
    <Footer />
    <Logo3D />
    </div>
  );
}
