// src/components/FaqWithImage.jsx
import React, { useEffect } from "react";
import {
  Accordion,
  Container,
  Grid,
  Image,
  Title,
  Text,
  Box,
  Badge,
  Button,
  Stack,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import image from "../assets/image.b0c2306b.png";

export default function FaqWithImage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#faq") return;

    const el = document.querySelector("#faq");
    if (!el) return;

    setTimeout(() => {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  }, [location.hash]);

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions about Sirivaram Village"
      className="py-16 md:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <Container size="lg">
        <Grid gutter={{ base: 28, md: 50 }} align="center">
          {/* Left Image */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              className="rounded-2xl overflow-hidden border border-amber-200 shadow-sm bg-white"
              aria-label="FAQ illustration image"
            >
              {/* ✅ NO CROP on mobile: contain + auto height */}
              <Image
                src={image}
                alt="Sirivaram Village FAQs"
                radius={0}
                fit="contain"
                w="100%"
                fallbackSrc="https://placehold.co/800x600?text=Sirivaram+FAQ"
                styles={{
                  root: { background: "white" },
                  image: {
                    width: "100%",
                    height: "auto",
                    maxHeight: 420, // desktop max height
                    objectFit: "contain",
                  },
                }}
              />
            </Box>

            <Box className="mt-4 rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
              <Text fw={700} c="rgb(120,53,15)">
                Need more help?
              </Text>
              <Text size="sm" c="dimmed" mt={6}>
                If you have any questions about Sirivaram or the temple events,
                feel free to contact us.
              </Text>
              <Button
                mt={12}
                radius="xl"
                size="sm"
                className="bg-amber-800 hover:bg-amber-900"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) {
                    const yOffset = -90;
                    const y =
                      el.getBoundingClientRect().top +
                      window.pageYOffset +
                      yOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Grid.Col>

          {/* Right FAQ */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="sm">
              <Badge color="yellow" variant="light" radius="xl" w="fit-content">
                FAQ
              </Badge>

              <Title
                order={2}
                className="text-3xl sm:text-4xl font-extrabold text-amber-900"
              >
                Frequently Asked Questions
              </Title>

              <Text className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Quick answers about Sirivaram village location, pincode,
                population, literacy, and temples.
              </Text>

              <Accordion
                chevronPosition="right"
                defaultValue="location"
                variant="separated"
                radius="lg"
                styles={{
                  item: {
                    border: "1px solid #fde68a",
                    backgroundColor: "white",
                  },
                  control: {
                    fontWeight: 700,
                    color: "#78350f",
                  },
                  panel: {
                    color: "#374151",
                    lineHeight: 1.6,
                  },
                }}
              >
                <Accordion.Item value="location">
                  <Accordion.Control>
                    Where is Sirivaram located?
                  </Accordion.Control>
                 <Accordion.Panel>
  Sirivaram village is located in <b>Penagalur Mandal</b>, <b>Tirupati District</b> (formerly part of YSR Kadapa District), Andhra Pradesh. It falls under <b>Kondur Gram Panchayat</b> and the <b>Kodur (Railway Kodur) Assembly Constituency</b>, near the town of <b>Rajampet</b>.
</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="pincode">
                  <Accordion.Control>
                    What is the pincode of Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
                    The pincode for Sirivaram village is <b>516127</b>.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="population">
                  <Accordion.Control>
                    What is the population of Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
                    As per the 2026 Census, Sirivaram has a population of{" "}
                    <b>1000+</b> people.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="literacy">
                  <Accordion.Control>
                    What is the literacy rate in Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
                    The overall literacy rate in Sirivaram is <b>71.39%</b>{" "}
                    according to 2026 Census data.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="temple">
                  <Accordion.Control>
                    What temples are there in Sirivaram?
                  </Accordion.Control>
                  <Accordion.Panel>
  Sirivaram is renowned for its ancient <b>Ramalayam</b> (Sri Rama Temple) and <b>Sri Anjaneya Swamy</b> Temple, along with shrines dedicated to Goddesses Gangamma Talli, Maramma, Yellamma, Ankalamma, Lord Shiva, Sri Krishna, and several other small local temples. These sacred sites come alive during various vibrant festivals such as [e.g., Sri Rama Navami, Hanuman Jayanti, Gangamma Jatara, village car festivals, etc.].
</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
