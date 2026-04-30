import { AboutCallToAction } from "./components/about-call-to-action/AboutCallToAction";
import { AboutHeader } from "./components/about-header/AboutHeader";
import { AboutOperatingModelSection } from "./components/about-operating-model-section/AboutOperatingModelSection";
import { AboutTransformationSection } from "./components/about-transformation-section/AboutTransformationSection";

export const AboutPage = () => {
  return (
    <div className="my-container space-y-6 py-6 lg:space-y-8 lg:py-12">
      <AboutHeader />
      <AboutTransformationSection />
      <AboutOperatingModelSection />
      <AboutCallToAction />
    </div>
  );
};
