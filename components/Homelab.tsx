import { FadeInSection } from '@/components/FadeInSection';
import { HomelabTopology } from '@/components/HomelabTopology';
import { SectionHeading } from '@/components/SectionHeading';

export function Homelab() {
  return (
    <FadeInSection id="homelab">
      <div className="section-container">
        <SectionHeading
          index="06"
          label="Homelab"
          title="Personal Infrastructure"
          subtitle="A containerized Linux service network I run at home. Hover or focus a card to trace its path back to the gateway."
        />
        <HomelabTopology />
      </div>
    </FadeInSection>
  );
}
