export interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const roles: Role[] = [
  {
    company: 'Cognizant (Meta Contract)',
    title: 'Tech Lead',
    location: 'Austin, TX',
    start: 'Jun 2024',
    end: 'Present',
    summary: 'Lead Java development for data-platform services on Meta’s global infrastructure.',
    highlights: [
      'Built a distributed Presto connector in Java that exposes Apache Kafka topics as SQL tables, so teams run filters, aggregations, and joins over streaming events without a custom consumer or a warehouse copy.',
      'Implemented the connector against the Presto Connector SPI with Google Guice and Airlift: topic-to-table mapping, partition discovery, offset-range scans, and pluggable row decoders and encoders.',
      'Developed read and write paths with KafkaConsumer and KafkaProducer, encoding output rows back to Kafka topics to support round-trip SQL pipelines.',
      'Led code reviews for a team of 5 engineers, raising code quality and first-contact resolution by 18%.',
    ],
    tech: ['Java', 'Presto', 'Apache Kafka', 'Google Guice', 'Airlift'],
  },
  {
    company: 'Cognizant (Meta Contract)',
    title: 'Senior Systems Engineer',
    location: 'Austin, TX',
    start: 'Jun 2022',
    end: 'Jun 2024',
    summary: 'Built backend integrations and automation tooling for 10k+ users.',
    highlights: [
      'Built a profile-based authentication integration in Java and Chef that automated role detection and access-policy assignment from Active Directory groups, cutting new-hire onboarding time by 30%.',
      'Developed Ruby-based Chef recipes and Python tooling to automate configuration and provisioning across global environments, reducing manual errors.',
      'Authored technical documentation and mentored 6+ engineers, increasing knowledge-base utilization by 25%.',
    ],
    tech: ['Java', 'Chef', 'Ruby', 'Python', 'Active Directory'],
  },
  {
    company: 'Tsunami Tsolutions',
    title: 'Software Developer',
    location: 'Melbourne, FL',
    start: 'Jan 2022',
    end: 'Apr 2022',
    summary: 'Developed FAA-compliant aerospace applications in a fast-paced Agile environment.',
    highlights: [
      'Enhanced Java/Spring microservices and raised test coverage to 85% with JUnit and Mockito, reducing defect rates in QA.',
      'Built CI pipelines enabling weekly releases, and converted regulatory requirements into user stories and technical tasks.',
      'Authored system design documents that passed first-round customer acceptance without revisions.',
    ],
    tech: ['Java', 'Spring', 'JUnit', 'Mockito', 'CI/CD'],
  },
  {
    company: 'Northrop Grumman',
    title: 'Junior Software Engineer',
    location: 'Melbourne, FL',
    start: 'May 2019',
    end: 'Oct 2019',
    summary: 'Contributed to radar simulation tools for USAF platforms (SECRET cleared).',
    highlights: [
      'Refactored 2,500+ lines of C++/Java, reducing cyclomatic complexity by 35% and removing 1,000+ lines of dead code.',
      'Developed an automated unit-test harness, raising regression coverage from 18% to 60% and surfacing 12 defects pre-deployment.',
    ],
    tech: ['C++', 'Java', 'Unit testing'],
  },
];
