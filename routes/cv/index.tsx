import { PageProps } from "fresh";
import { H1 } from "../../components/h1.tsx";
import { asset } from "fresh/runtime";

export default function CV(props: PageProps) {
  return (
    <>
      <H1 gradientColor animate>Paul Jacks</H1>
      <address>
        Stresemannstr. 36<br />
        53840 Troisdorf, Germany<br />
        <a href="tel:+491758857490">+491758857490</a>
        <br />
        <a href="mailto:paul@jacks.se">paul@jacks.se</a> /{" "}
        <a href="https://jacks.se" target="_blank">jacks.se</a>
      </address>

      <h2>Quick Links</h2>
      <div className="cv-quick-links">
        <a href="https://github.com/rebstorm" target="_blank">GitHub</a>
        <a href="https://jacks.se/blog" target="_blank">Blog</a>
      </div>

      <h2>Jump to</h2>
      <nav className={"cv-register"}>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#languages">Languages</a>
        <a href="#passions">Passions</a>
      </nav>

      <h2 id="experience">Experience</h2>

      <section className={"card"}>
        <img
          width={128}
          src={asset("../../companies/sap.svg")}
          alt={"sap"}
        />
        <h3>Lead Developer, SAP, Walldorf/s-Hertogenbosch, Germany/Netherlands (Remote)</h3>
        <p>September 2025 - Present</p>
        <ul>
          <li>
            Leading a small team inside of the BTP Trials Automation platform,
            creating and maintaining a solution which allows end users to try out
            several parts of the SAP software for free.
          </li>
          <li>
            Responsible for leading and developing the platform, grooming
            backlogs, making priorities, speaking to stakeholders and mentoring
            junior developers.
          </li>
          <li>
            Driving technical decisions across a polyglot stack, balancing
            feature delivery with platform reliability and developer experience
            improvements.
          </li>
          <li>
            Technologies: Python, Terraform, Next.js, TypeScript, CSS, Angular,
            NestJS, Kubernetes.
          </li>
        </ul>
      </section>

      <section className={"card"}>
        <img
          width={128}
          src={asset("../../companies/tibber.png")}
          alt={"tibber"}
        />
        <h3>Tech Lead/Software Engineer, Tibber, Stockholm, Sweden (Remote)</h3>
        <p>February 2023 - September 2025</p>
        <ul>
          <li>
            Guided and implemented technical and architectural decisions to
            ensure the sustainability and functionality of Tibber's platforms.
            This included strategic planning and architectural reviews to support
            scalable and efficient system designs.
          </li>
          <li>
            Led a team of 8 software developers in establishing and maintaining
            Tibber's ecosystem. Managed project timelines, coordinated
            development tasks, and ensured delivery of high-quality software
            solutions.
          </li>
          <li>
            Conducted educational initiatives such as talks and workshops, led
            refinement sessions, and facilitated communication with stakeholders
            to align project goals and deliverables.
          </li>
          <li>
            <b>Developer productivity</b>
            <ul>
              <li>
                Built common libraries to re-use across teams for a better DX.
              </li>
              <li>
                Built ephemeral preview environments on Kubernetes, which shrank
                review cycles by 40% and let multiple teams test in parallel.
              </li>
            </ul>
          </li>
          <li>
            <b>Customer impact</b>
            <ul>
              <li>
                Introduced LLM-driven (AI) support bots that now handle 60% of
                routine inquiries, freeing up agents and maintaining &ge; 80%
                CSAT.
              </li>
              <li>Helped introduce the ECU of Homevolt.</li>
              <li>
                Re-implemented tibber.com &mdash; improving overall Frontend
                Performance Score by 53%.
              </li>
            </ul>
          </li>
          <li>
            <b>Team &amp; leadership</b>
            <ul>
              <li>
                Guided a cross-functional squad of 8 engineers through planning,
                code reviews and stakeholder workshops &mdash; delivering each
                quarter's roadmap on time.
              </li>
              <li>
                Hosted regular talks and hands-on workshops (GraphQL, a11y,
                design tokens, coding paradigms and much more) to share best
                practices and boost team skill levels.
              </li>
            </ul>
          </li>
          <li>
            Technologies: Python, C, Rust, Go, Java, TypeScript, CSS, GraphQL,
            Kubernetes, Linux.
          </li>
        </ul>
      </section>

      <section className={"card"}>
        <img
          width={128}
          src={asset("../../companies/volvo.png")}
          alt={"volvo"}
        />
        <h3>Tech Lead, Volvo Cars, Goteborg, Sweden (Remote)</h3>
        <p>August 2021 - February 2023</p>
        <ul>
          <li>
            Led a development team at volvocars.com that was responsible for the
            Learn domain, serving over 1,000,000 page views a day. Main workload
            was teaching, planning &amp; building the domain.
          </li>
          <li>
            Practiced the "You build it, you run it" mentality, instilling
            ownership in their products. Held several seminars on different
            topics, from how to use certain technology, data-driven decision
            making, to how to organize your work in an agile workplace.
          </li>
          <li>
            Was a multiplier by improving shared frameworks, among other things,
            creating the first typed versions of the shared component library to
            improve developer acceptance.
          </li>
          <li>
            Spearheaded the development of API endpoints that would make
            development of gathering data easier for the Tribe. Creating "Hero"
            APIs which could be applied to speed up development time.
          </li>
          <li>
            Onboarded 50+ engineers onto the common monorepo, was a part of the
            employment and interview board.
          </li>
          <li>Drove SLI &amp; SLA adoption among the teams.</li>
          <li>
            Technologies: React, Next.js, Kubernetes, Go, TypeScript, Linux.
          </li>
        </ul>
      </section>

      <section className={"card"}>
        <img
          width={128}
          src={asset("../../companies/rd.png")}
          alt={"rewe digital"}
        />
        <h3>Software Engineer, REWE Digital, Cologne, Germany</h3>
        <p>August 2018 - July 2021</p>
        <ul>
          <li>
            Microservices Development: Played a key role in the Fulfillment
            Tribe by developing microservices that streamlined the fulfillment
            process, creating a highly fault tolerant fulfillment process.
          </li>
          <li>
            Educational Initiatives: Initiated and led workshops on Progressive
            Web Apps, raising development standards and enhancing team skills.
          </li>
          <li>
            Crisis Management: Acted as a critical first responder for service
            breakdowns, minimizing downtime and maintaining system reliability
            under pressure.
          </li>
          <li>
            Technologies: Spring, Spring Boot, Angular, Java, TypeScript,
            Kotlin, PostgreSQL.
          </li>
        </ul>
      </section>

      <section className={"card"}>
        <h3>Software Developer, Scopevisio AG, Bonn, Germany</h3>
        <p>February 2016 - July 2018</p>
        <ul>
          <li>
            Full Stack Development: Developed comprehensive backend modules and
            dynamic front-end interfaces, enhancing user experience and
            operational efficiency.
          </li>
          <li>
            Linux and DevOps: Demonstrated expertise in Linux systems,
            contributing to robust DevOps practices that improved deployment
            workflows and system reliability.
          </li>
          <li>
            Technologies: Java, zsh, JavaScript/NodeJS, Python, Jetty, JAX-WS,
            jQuery, Bootstrap.
          </li>
        </ul>
      </section>

      <section className={"card"}>
        <h3>Software Developer, Neonred, Cologne, Germany</h3>
        <p>June 2014 - January 2016</p>
        <ul>
          <li>
            Innovation and Prototyping: Developed multiple prototypes and
            products for high-profile clients such as Mercedes-Benz and Bosch,
            driving innovation and client satisfaction through high-tech
            solutions.
          </li>
          <li>
            Technologies: C, Java, C#, .NET, Python, JavaScript.
          </li>
        </ul>
      </section>

      <h2 id="education">Education</h2>
      <section className={"card"}>
        <h3>Bachelor of Science in Computer Science (MKV)</h3>
        <p>
          University of Goteborg &amp; Lulea Institute of Technology (LTU)
          <br />
          2009 - 2013
        </p>
        <ul>
          <li>
            Completed undergraduate studies in Computer Science at the
            University of Goteborg and LTU.
          </li>
          <li>
            Participated in an exchange program at MCI Innsbruck, broadening
            academic and cultural perspectives.
          </li>
        </ul>
      </section>

      <h2 id="languages">Languages</h2>
      <section className={"card"}>
        <p>English - First Language</p>
        <p>Swedish - Fluent</p>
        <p>German - Fluent</p>
      </section>

      <h2 id="passions">Passions</h2>
      <section className={"card"}>
        <h3>Softwerkskammer Cologne - Organizer</h3>
        <p>
          I have a profound passion for software and the exploration of new
          ideas. My enthusiasm extends to both internal and external
          presentations within various organizations.{" "}
          <a
            href={"https://www.meetup.com/Softwerkskammer-Koln/"}
            target="_blank"
          >
            As an active organizer of Softwerkskammer Cologne
          </a>, which I run with friends and former colleagues, we've recently
          reached a significant milestone of 1800 members. I'm currently
          engaged in delivering talks on topics like Deno, Island Architecture
          &amp; Parallelism/Concurrency.
        </p>
      </section>
      <section className={"card"}>
        <h3>Open Source Contributor</h3>
        <p>
          My contributions to open source projects are a core part of my
          professional identity. My primary interests lie in Web standards,
          Rust, Tokio, Design Systems, Deno, and Tailwind. My{" "}
          <a
            href={"https://github.com/Rebstorm"}
            target="_blank"
          >
            GitHub profile
          </a>
          {" "}showcases a wide range of contributions across different projects.
        </p>
      </section>
      <section className={"card"}>
        <h3>Linux Advocate</h3>
        <p>
          While I acknowledge the elusive 'year of the Linux desktop', my
          preference strongly leans towards the KDE desktop environment. I
          believe the tech world could benefit from exploring beyond the
          prevalent Mac-dominated landscape in development, embracing the
          diversity and potential that Linux offers.
        </p>
      </section>
    </>
  );
}
