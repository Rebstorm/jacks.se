import { PageProps } from "$fresh/server.ts";
import { H1 } from "../../../components/h1.tsx";

export default function CV(props: PageProps) {
  return (
      <>
          <H1 gradientColor animate>Paul Jacks</H1>
          <address>
              Stresemannstr. 36<br/>
              53840 Troisdorf, Germany<br/>
              <a href="tel:+491758857490">+491758857490</a><br/>
              <a href="mailto:paul@jacks.se">paul@jacks.se</a> / <a href="https://jacks.se" target="_blank">jacks.se</a>
          </address>

          <h2>Quick Links</h2>
          <div>
              <div><a href="https://github.com/rebstorm" target="_blank">Github</a></div>
              <div><a href="https://jacks.se/blog" target="_blank">My Engineering Blog</a></div>
              <div><a href="https://www.meetup.com/Softwerkskammer-Koln/" target="_blank">Softwerkammer Köln</a></div>
          </div>


          <h2>Recent Experience</h2>
          <section>
              <h3>Tech Lead, Tibber, Stockholm, Sweden (Remote)</h3>
              <p>February 2023 - Present</p>
              <ul>
                  <li>Guided technical and architectural decisions to ensure the sustainability and functionality of
                      Tibber’s platforms. This included strategic planning and architectural reviews to support
                      scalable and efficient system designs.
                  </li>
                  <li>Led a team of 8 software developers in establishing and maintaining Tibber's web presence
                      at tibber.com. Managed project timelines, coordinated development tasks, and ensured
                      delivery of high-quality software solutions. Based upon TypeScript, CSS, Next.js, React and
                      other web technologies.
                  </li>
                  <li>Created and deployed Tibber’s own design system, enhancing user interface consistency
                      and improving development efficiency across digital products.
                  </li>
                  <li>Conducted educational initiatives such as talks and workshops, led refinement sessions, and
                      facilitated communication with stakeholders to align project goals and deliverables.
                  </li>
                  <li>
                      Spearheaded innovative projects including Ephemeral (Preview) Environments, a Common
                      Gateway for all clients using GraphQL, Design Tokens, and the migration of platforms to
                      Kubernetes, optimizing operational workflows and infrastructure management.
                  </li>

                  <li>
                      Technologies: Proficient in Rust,TypeScript, CSS; extensively worked with web
                      technologies and cloud infrastructure including GraphQL and Kubernetes. Led diverse
                      software development initiatives, contributing to system architectures and internal frameworks.
                  </li>
              </ul>
          </section>

          <section>
              <h3>Tech Lead, Volvo Cars, Göteborg, Sweden (Remote)</h3>
              <p>August 2021 - February 2023</p>
              <ul>
                  <li>Led a small team (4 developers) at volvocars.com that was responsible for the Learn domain,
                      serving 1,000,000 page views a day. Main workload was teaching, planning & building the domain.
                  </li>
                  <li> Practiced the “You build it, you run it mentality” instilling ownership in their products. Held
                      several seminars on different topics, all from, how to use certain technology, data-driven
                      decision making,, to how to organize your work in an agile workplace.
                  </li>
                  <li>Aimed to be a multiplier by improving shared frameworks, among other things, creating the first
                      typed versions of our shared component library, to improve developer acceptance.
                  </li>
                  <li>I spearheaded the development of creating API endpoints that would make development of gathering
                      data easier for the Tribe as well. Creating “Hero” APIs which could be applied to speed up the
                      development time.
                  </li>
                  <li>Onboarded 50&gt; engineers onto our common monorepo, was a part of the employment and interview
                      board.
                  </li>
                  <li>Drove SLI & SLA adoption among the teams.</li>
                  <li> Technologies: Employed React, Next.js, Kubernetes, Go, and TypeScript among other tools.</li>
              </ul>
          </section>
          <section>
              <h3>Software Engineer, REWE Digital, Cologne, Germany</h3>
              <p>August 2018 - July 2021</p>
              <ul>
                  <li> Microservices Development: Played a key role in the Fulfillment Tribe by developing microservices that streamlined the fulfillment process, creating a highly fault tolerant fulfillment process.
                  </li>
                  <li>Educational Initiatives: Initiated and led workshops on Progressive Web Apps, raising development standards
                      and enhancing team skills.
                  </li>
                  <li>Crisis Management: Acted as a critical first responder for service breakdowns, minimizing downtime and
                      maintaining system reliability under pressure.</li>
                  <li>Technologies: Specialized in Spring Boot, Angular, Java, TypeScript, Kotlin, and PostgreSQL.
                  </li>
              </ul>
          </section>


          <h2>Hobbies & Passions</h2>
          <section>
              <h3>Softwerkskammer Cologne - Organizer</h3>
              <p>I have a profound passion for software and the exploration of new ideas. I enjoy engaging in both
                  internal and external presentations across various organizations. <a
                      href={"https://www.meetup.com/Softwerkskammer-Koln/"} target="_blank">As an active organizer of
                      Softwerkskammer Cologne</a>, which I run with friends and former colleagues, we've recently
                  celebrated
                  reaching 1800 members. I am currently engaged in delivering talks on cutting-edge topics like Deno,
                  Island Architecture, and Parallelism/Concurrency.</p>
          </section>
          <section>
              <h3>Open Source Contributor</h3>
              <p>My contributions to open source projects are a core part of my professional identity. My primary
                  interests lie in Web standards, Rust, Tokio, Design Systems, Deno, and Tailwind. My <a
                      href={"https://github.com/Rebstorm"} target="_blank"> GitHub profile </a>
                  showcases a wide range of contributions across different projects.</p>
          </section>
          <section>
              <h3>Linux Advocate</h3>
              <p>While I acknowledge the elusive 'year of the Linux desktop', my preference strongly leans towards the
                  KDE desktop environment. I believe the tech world could benefit from exploring beyond the prevalent
                  Mac-dominated landscape in development, embracing the diversity and potential that Linux offers.</p>
          </section>
      </>
  );
}

