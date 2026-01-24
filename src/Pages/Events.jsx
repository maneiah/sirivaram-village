import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UserLayout from "../layouts/UserLayout";

import {
  SimpleGrid,
  Card,
  Text,
  Badge,
  Group,
  Title,
  Loader,
  Alert,
  Button,
  Stack,
} from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.get(
        "https://sirivaram-backed.onrender.com/api/events",
      );
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err?.message || "Unable to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <UserLayout>
      <Group justify="space-between" mb="md">
        <Title order={2}>Upcoming Events</Title>
        <Button
          leftSection={<IconRefresh size={16} />}
          variant="light"
          onClick={loadEvents}
        >
          Refresh
        </Button>
      </Group>

      {loading && (
        <Group justify="center" mt="xl">
          <Loader size="lg" />
        </Group>
      )}

      {!loading && error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          mb="md"
        >
          {error}
        </Alert>
      )}

      {!loading && !error && events.length === 0 && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Info"
          color="blue"
          mb="md"
        >
          No events found
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {events.map((e) => (
          <Card key={e.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap={8}>
              <Group justify="space-between" align="start">
                <Text fw={700} size="lg" lineClamp={2}>
                  {e.title}
                </Text>
                <Badge color={e.isPublic ? "green" : "red"} variant="light">
                  {e.isPublic ? "Public" : "Private"}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={3}>
                {e.description || "-"}
              </Text>

              <Text size="sm">
                <b>Venue:</b> {e.venue || "-"}
              </Text>

              <Text size="sm">
                <b>Date:</b> {dayjs(e.startDate).format("DD MMM YYYY")}
                {e.endDate
                  ? ` - ${dayjs(e.endDate).format("DD MMM YYYY")}`
                  : ""}
              </Text>

              <Text size="sm">
                <b>Ticket:</b> ₹{e.ticketPrice}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </UserLayout>
  );
}
