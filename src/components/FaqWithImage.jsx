import React from "react";
import { Accordion, Container, Grid, Image, Title } from "@mantine/core";
import image from "../assets/image.b0c2306b.png";

export default function FaqWithImage() {
  return (
    <>
      {/* INLINE CSS */}
      <style>{`
        .faq-wrapper {
          padding-top: calc(var(--mantine-spacing-xl) * 2);
          padding-bottom: calc(var(--mantine-spacing-xl) * 2);
        }

        .faq-title {
          margin-bottom: var(--mantine-spacing-md);
          padding-left: var(--mantine-spacing-md);
          color: light-dark(var(--mantine-color-black), var(--mantine-color-white));
          font-family: Outfit, var(--mantine-font-family);
          font-weight: 500;
        }

        .faq-item {
          font-size: var(--mantine-font-size-sm);
          color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1));
        }
      `}</style>

      {/* FAQ SECTION */}
      <div className="faq-wrapper">
        <Container size="lg">
          <Grid gutter={50}>
            {/* Left Image */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image src={image} alt="Sirivaram FAQ" />
            </Grid.Col>

            {/* Right FAQ */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} ta="left" className="faq-title">
                Frequently Asked Questions (Sirivaram)
              </Title>

              <Accordion
                chevronPosition="right"
                defaultValue="location"
                variant="separated"
              >
                {/* Q1 */}
                <Accordion.Item className="faq-item" value="location">
                  <Accordion.Control>
                    Where is Sirivaram located?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Sirivaram village is located in Penagalur Mandal, YSR
                    district, Andhra Pradesh.
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Q2 */}
                <Accordion.Item className="faq-item" value="pincode">
                  <Accordion.Control>
                    What is the pincode of Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
                    The pincode for Sirivaram village is <b>516271</b>.
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Q3 */}
                <Accordion.Item className="faq-item" value="population">
                  <Accordion.Control>
                    What is the population of Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
                    As per the 2011 Census, Sirivaram has a population of{" "}
                    <b>720</b> people.
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Q4 */}
                <Accordion.Item className="faq-item" value="literacy">
                  <Accordion.Control>
                    What is the literacy rate in Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
                    The overall literacy rate in Sirivaram is <b>41.39%</b>,
                    based on 2011 Census data.
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
}
