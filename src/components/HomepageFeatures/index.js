import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';

const FeatureList = [
  {
    title: translate({
      id: 'homepage.feature.seamlessIntegration.title',
      message: 'Seamless Integration',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        {translate({
          id: 'homepage.feature.seamlessIntegration.description',
          message: 'Enable event tracking and user behavior insights with just a few lines of code.',
        })}
      </>
    ),
  },
  {
    title: translate({
      id: 'homepage.feature.robustReliable.title',
      message: 'Robust and Reliable',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        {translate({
          id: 'homepage.feature.robustReliable.description',
          message: 'Ensure robust and reliable event tracking with strict type checks and autocompletion to avoid errors and maintain accurate, consistent analytics data.',
        })}
      </>
    ),
  },
  {
    title: translate({
      id: 'homepage.feature.customizableFlexible.title',
      message: 'Customizable and Flexible',
    }),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        {translate({
          id: 'homepage.feature.customizableFlexible.description',
          message: 'Tailor to your needs with the flexibility to track custom events or modify existing ones, and effortlessly customize your analytics setup.',
        })}
      </>
    ),
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4', styles.featureMargin)}>
      <div className={styles.featureCard}>
        <div className="text--left">
          <Svg className={styles.featureIcon} role="img" />
        </div>
        <div className="text--left">
          <Heading as="h4">{title}</Heading>
          <p className="text--justify">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({title, Svg, link}) {
  return (
    <div className={clsx('col col--4')}>
      <a href={link}>
        <div className={styles.productCard}>
          <Svg className={styles.productIcon} role="img" />
        </div>
        <div className="text--left padding-horiz--md">
          <Heading as="h3" className={styles.title}>{title}</Heading>
        </div>
      </a>
    </div>
  );
}

function CodelabsCard() {
  return (
    <div className={clsx('row', styles.productCard, styles.codelabsCardMargin)}>
      <div className="card__body">
        <div className="text--center">
          <p className="text--left">
            {translate({
              id: 'homepage.codelabsCard.description',
              message: "Rakuten Analytics Tutorials offer practical guidance for developers to utilize Rakuten's tools and SDKs to create data-driven applications and enhance business efficiency.",
            })}
          </p>
          <button className="button button--primary" style={{ float: 'left' }} onClick={() => window.location.href = 'docs/codelabs'}>
            {translate({
              id: 'homepage.codelabsCard.button',
              message: 'Learn More',
            })}
          </button>
        </div>
      </div>
    </div>
  );
}

const AnalyticsList = [
  {
    Svg: require('@site/static/img/analytics-logo.svg').default,
    link: 'docs/analytics-sdks',
  }
];

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
        <div className="container">
        <h1 className={styles.title}>
          {translate({
            id: 'homepage.analyticsTracking.title',
            message: 'Analytics and Geofence Tracking',
          })}
        </h1>
        <div className="row">
          {AnalyticsList.map((props, idx) => (
            <ProductCard key={idx} {...props} />
          ))}
        </div>
        <h1 className={styles.title}>
          {translate({
            id: 'homepage.advancedGuides.title',
            message: 'Advanced Guides and Tutorials',
          })}
        </h1>
        <div className="row">
            <CodelabsCard />
        </div>
        <h1 className={styles.title}>
          {translate({
            id: 'homepage.keyFeatures.title',
            message: 'Key Features of Our Analytics Solutions',
          })}
        </h1>
        <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        </div>
        <p className={styles.text}>
          {translate({
            id: 'homepage.contactSupport',
            message: 'Get in touch with our ',
          })}
          <a href="https://confluence.rakuten-it.com/confluence/pages/viewpage.action?pageId=3701045924" target="_blank">
            {translate({
              id: 'homepage.customerSupport',
              message: 'Customer Support team',
            })}
          </a>
          {translate({
            id: 'homepage.learnMore',
            message: ' to learn more.',
          })}
        </p>
      </div>
    </section>
  );
}
