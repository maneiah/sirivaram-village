import React, { useEffect } from "react";
import { Accordion, Container, Grid, Image, Title } from "@mantine/core";
import { useLocation } from "react-router-dom";
import image from "../assets/image.b0c2306b.png";

export default function FaqWithImage() {
  const location = useLocation();

  // ✅ Auto-scroll when URL is "/#faq"
  useEffect(() => {
    if (location.hash !== "#faq") return;

    const el = document.querySelector("#faq");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90; // header offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions about Sirivaram Village"
      className="py-16 bg-gray-50"
    >
      <Container size="lg">
        <Grid gutter={50}>
          {/* Left Image */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src={image}
              alt="Sirivaram Village FAQs"
              radius="md"
              withPlaceholder
            />
          </Grid.Col>

          {/* Right FAQ */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title
              order={2}
              className="mb-6 text-2xl font-semibold text-amber-900"
            >
              Frequently Asked Questions (Sirivaram Village)
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="location"
              variant="separated"
            >
              <Accordion.Item value="location">
                <Accordion.Control>
                  Where is Sirivaram located?
                </Accordion.Control>
                <Accordion.Panel>
                  Sirivaram village is located in <b>Penagalur Mandal</b>,{" "}
                  <b>Kadapa District</b>, Andhra Pradesh. It falls under{" "}
                  <b>Kodur Panchayathi</b> and is near the town of{" "}
                  <b>Rajampet</b>.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="pincode">
                <Accordion.Control>
                  What is the pincode of Sirivaram?
                </Accordion.Control>
                <Accordion.Panel>
                  The pincode for Sirivaram village is <b>516271</b>.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="population">
                <Accordion.Control>
                  What is the population of Sirivaram?
                </Accordion.Control>
                <Accordion.Panel>
                  As per the 2011 Census, Sirivaram has a population of{" "}
                  <b>720</b> people.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="literacy">
                <Accordion.Control>
                  What is the literacy rate in Sirivaram?
                </Accordion.Control>
                <Accordion.Panel>
                  The overall literacy rate in Sirivaram is <b>41.39%</b>{" "}
                  according to 2011 Census data.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="temple">
                <Accordion.Control>
                  What temples are there in Sirivaram?
                </Accordion.Control>
                <Accordion.Panel>
                  Sirivaram is famous for its <b>ancient Lord Shiva Temple</b>{" "}
                  and other small local temples. These temples host festivals
                  like <b>Shivaratri</b> and <b>Deepavali</b>.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
