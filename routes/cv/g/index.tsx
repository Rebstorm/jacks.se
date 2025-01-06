import { PageProps } from "$fresh/server.ts";
import { H1 } from "../../../components/h1.tsx";
import { asset } from "$fresh/runtime.ts";


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
          <div style={{display: "flex", gap: "1rem"}}>
              <a href="https://github.com/rebstorm" target="_blank">
                  <img src="/github-icon.svg" alt="GitHub" width="30"/>
              </a>
              <a href="https://jacks.se/blog" target="_blank">
                  <img src="/blog-icon.svg" alt="Blog" width="30"/>
              </a>
              <a href="https://www.meetup.com/Softwerkskammer-Koln/" target="_blank">
                  <img src="/meetup-icon.svg" alt="Meetup" width="30"/>
              </a>
          </div>


          <h2>Recent Experience</h2>
          <section className={'card'}>
              <img width={128} src={asset("../../companies/google.png")} alt={'google'}/>
              <h3>Software Engineer L3, Google, Munich, Germany (Remote)</h3>
              <p>February 2023 - Present</p>
              <ul>
                  <li>Developed, maintained and improved some of Google's server code for client applications. This
                      includes, but is not limited to technologies like TypeScript, Rust, Go, Python, CSS . It also
                      includes helping with DevOps tasks like k8 orchestration, CI/CD and much more.
                  </li>
                  <li>Wrote RFCs for upcoming web standards as a part of the Aurora Team. Helped formulate the needs of
                      Google to organizations like the W3C to help finalize new web APIs like the new Navigation API.
                  </li>
                  <li>Helped several external clients with their architectural structure. Everything from consulting on
                      how to build a maintainable landscape, to actual feats like improving page rankings, to page
                      insights, producing 30-50% quicker page loads.
                  </li>
                  <li>Technologies: Advanced proficiency in TypeScript, C, Go, Python & Rust. Developed complex
                      applications using Deno, Lit, Polymer.js, CSS; and managed databases and backend operations with
                      PostgreSQL, NoSQL, Redis, and Kubernetes
                  </li>
              </ul>
          </section>

          <section className={'card'}>
              <img width={128} src={asset("../../companies/volvo.png")} alt={'volvo'}/>
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
          <section className={'card'}>
              <img width={128} src={asset("../../companies/rd.png")} alt={'rewe digital'}/>
              <h3>Software Engineer, REWE Digital, Cologne, Germany</h3>
              <p>August 2018 - July 2021</p>
              <ul>
                  <li> Microservices Development: Played a key role in the Fulfillment Tribe by developing microservices
                      that streamlined the fulfillment process, creating a highly fault tolerant fulfillment process.
                  </li>
                  <li>Educational Initiatives: Initiated and led workshops on Progressive Web Apps, raising development
                      standards
                      and enhancing team skills.
                  </li>
                  <li>Crisis Management: Acted as a critical first responder for service breakdowns, minimizing downtime
                      and
                      maintaining system reliability under pressure.
                  </li>
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

